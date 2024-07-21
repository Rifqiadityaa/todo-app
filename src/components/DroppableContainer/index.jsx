import { Box, Button, Icon, Text, useDisclosure } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FaPlus } from "react-icons/fa6";
import DraggableItem from "../DraggableItem";
import ModalTodoDetail from "../ModalTaskDetails";

const DroppableContainer = (props) => {
  const { id, todosId } = props;

  const isStatusTodo = id === "To Do";

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <>
      <ModalTodoDetail isOpen={isOpen} onClose={onClose} />
      <SortableContext
        id={id}
        items={todosId}
        strategy={verticalListSortingStrategy}
      >
        <Box
          ref={setNodeRef}
          w={"100%"}
          p={"1rem"}
          bgColor={"#D5CCFF"}
          borderRadius={"0.5rem"}
          h={"fit-content"}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            mb={"1rem"}
          >
            <Text fontWeight={"bold"}>{id}</Text>
            {isStatusTodo && (
              <Button variant={"ghost"} onClick={onOpen}>
                <Icon as={FaPlus} />
              </Button>
            )}
          </Box>
          {todosId.map((todoId) => (
            <DraggableItem key={todoId} id={todoId} onOpen={onOpen} />
          ))}
        </Box>
      </SortableContext>
    </>
  );
};

export default DroppableContainer;
