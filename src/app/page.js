"use client";

import DroppableContainer from "@/components/DroppableContainer";
import { Grid, GridItem } from "@chakra-ui/react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";

export default function Home() {
  const [items, setItems] = useState({
    "To Do": ["Create Wireframes", "Design Landing Page"],
    "In Progress": ["Develop Landing Page"],
    Completed: ["Launch Landing Page"],
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  const findContainer = (id) => {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key].includes(id));
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

    setItems((prev) => {
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
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  }

  const handleDragEnd = (event) => {
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

    const activeIndex = items[activeContainer].indexOf(active.id);
    const overIndex = items[overContainer].indexOf(over?.id);

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }
  };

  return (
    <DndContext
      id="dndContext"
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      sensors={sensors}
    >
      <Grid
        templateColumns={"repeat(3, 1fr)"}
        gap={"2rem"}
        bgColor={"#2B1887"}
        p={"10rem"}
        h={"100%"}
        overflow={"scroll"}
      >
        {Object.keys(items).map((key, i) => (
          <GridItem key={key}>
            <DroppableContainer id={key} items={items[key]} />
          </GridItem>
        ))}
      </Grid>
    </DndContext>
  );
}
