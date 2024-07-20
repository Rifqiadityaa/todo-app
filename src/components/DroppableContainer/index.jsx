import { Box, Stack, Text } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DraggableItem from "../DraggableItem";

const DroppableContainer = (props) => {
  const { id, items } = props;

  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <Box
        ref={setNodeRef}
        w={"100%"}
        p={10}
        bgColor={"#D5CCFF"}
        borderRadius={"0.5rem"}
        h={"fit-content"}
      >
        <Text fontWeight={"bold"} mb={"1rem"}>
          {id}
        </Text>
        <Stack gap={"1rem"}>
          {items.map((item) => (
            <DraggableItem key={item} id={item} item={item} />
          ))}
        </Stack>
      </Box>
    </SortableContext>
  );
};

export default DroppableContainer;
