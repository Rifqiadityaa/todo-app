import { Box } from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TodoCard from "../TodoCard";

const DraggableItem = (props) => {
  const { id, item, isOverlay } = props;

  if (isOverlay) {
    return <TodoCard item={item} />;
  }

  const { setNodeRef, listeners, attributes, transform, transition } =
    useSortable({
      id: id,
    });

  return (
    <Box
      ref={setNodeRef}
      bg={"#F4F2FF"}
      borderRadius={"0.3rem"}
      p={5}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...listeners}
      {...attributes}
    >
      <TodoCard item={item} />
    </Box>
  );
};

export default DraggableItem;
