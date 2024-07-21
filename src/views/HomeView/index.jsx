"use client";

import DroppableContainer from "@/components/DroppableContainer";
import MenuDropdown from "@/components/MenuDropdown";
import ModalStatistics from "@/components/ModalStatistics";
import { TodoContext } from "@/shared/context/todoContext";
import useDebounce from "@/shared/hooks/useDebounce";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Icon,
  Input,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { FaChartPie } from "react-icons/fa6";

const HomeView = () => {
  const [todos, setTodos] = useState({});
  const [todosId, setTodosId] = useState({});
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  const findContainer = (id) => {
    if (id in todosId) {
      return id;
    }

    return Object.keys(todosId).find((key) => todosId[key].includes(id));
  };

  function handleDragOver(event) {
    const { active, over, draggingRect } = event;
    const { id } = active;

    // Find the containers
    const activeContainer = findContainer(id);
    const overContainer = findContainer(over?.id);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setTodosId((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.indexOf(id);
      const overIndex = overItems.indexOf(over?.id);

      let newIndex;
      if (over?.id in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          draggingRect?.offsetTop > over.rect.offsetTop + over.rect.height;
        const modifier = isBelowLastItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          todosId[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  }

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    const { id } = active;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(over?.id);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = todosId[activeContainer].indexOf(active.id);
    const overIndex = todosId[overContainer].indexOf(over?.id);

    if (activeIndex !== overIndex) {
      setTodosId((todoId) => ({
        ...todoId,
        [overContainer]: arrayMove(
          todoId[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }

    const todoToUpdate = todos.find((todo) => todo.id === active.id);

    await updateTodo(id, { ...todoToUpdate, status: overContainer });
  };

  const getItemsData = async (params) => {
    const response = await fetch(
      "http://localhost:8000/todos?" + new URLSearchParams(params).toString(),
      {
        method: "GET",
      }
    );

    const data = await response.json();

    if (data.length) {
      setTodos(data);

      setTodosId(() => {
        return {
          "To Do": data
            .filter((todo) => todo.status === "To Do")
            .map((todo) => todo.id),
          "In Progress": data
            .filter((todo) => todo.status === "In Progress")
            .map((todo) => todo.id),
          Completed: data
            .filter((todo) => todo.status === "Completed")
            .map((todo) => todo.id),
        };
      });
    }
  };

  const updateTodo = async (id, payload) => {
    await fetch(`http://localhost:8000/todos/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  };

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
  };

  const contextValue = {
    todos,
    todosId,
    getItemsData,
    selectedTodo,
    setSelectedTodo,
    updateTodo,
  };

  useEffect(() => {
    getItemsData();
  }, []);

  useEffect(() => {
    getItemsData({ name_like: debouncedSearchQuery });
  }, [debouncedSearchQuery]);

  return (
    <DndContext
      id="dndContext"
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      sensors={sensors}
    >
      <TodoContext.Provider value={contextValue}>
        <Stack spacing={"1rem"} mb={"2rem"} alignItems={"center"}>
          <Input
            type="tel"
            placeholder="Search todo"
            color={"white"}
            w={{ base: "100%", sm: "30%" }}
            onChange={handleSearch}
            textAlign={"center"}
            borderRadius={"0.5rem"}
          />
          <Box display={"flex"} gap={"0.5rem"}>
            <MenuDropdown />
            <ModalStatistics isOpen={isOpen} onClose={onClose} />
            <Button variant={"ghost"} onClick={onOpen}>
              <Icon as={FaChartPie} color={"white"} />
            </Button>
          </Box>
        </Stack>
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(3, 1fr)" }}
          gap={"2rem"}
        >
          {Object.keys(todosId).map((key) => (
            <GridItem key={key}>
              <DroppableContainer id={key} todosId={todosId[key]} />
            </GridItem>
          ))}
        </Grid>
      </TodoContext.Provider>
    </DndContext>
  );
};

export default HomeView;
