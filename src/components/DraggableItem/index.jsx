import { useTodoContext } from "@/shared/context/todoContext";
import { Box } from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";
import TodoCard from "../TodoCard";

const DraggableItem = (props) => {
  const { todos } = useTodoContext();

  const { id, onOpen } = props;

  const todo = useMemo(() => todos.find((todo) => todo.id === id), [todos, id]);

  const { setNodeRef, listeners, attributes, transform, transition } =
    useSortable({
      id: id,
    });

  return (
    <Box
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...listeners}
      {...attributes}
    >
      <TodoCard todo={todo} onOpen={onOpen} />
    </Box>
  );
};

export default DraggableItem;
