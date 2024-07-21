import {
  Box,
  Button,
  Icon,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FaPlus } from "react-icons/fa6";
import DraggableItem from "../DraggableItem";
import ModalTaskDetail from "../ModalTaskDetails";

const DroppableContainer = (props) => {
  const { id, items } = props;

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <>
      <ModalTaskDetail isOpen={isOpen} onClose={onClose} />
      <SortableContext
        id={id}
        items={items}
        strategy={verticalListSortingStrategy}
      >
        <Box
          ref={setNodeRef}
          w={"100%"}
          p={5}
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
            <Button variant={"ghost"} onClick={onOpen}>
              <Icon as={FaPlus} />
            </Button>
          </Box>
          <Stack gap={"1rem"}>
            {items.map((item) => (
              <DraggableItem key={item} id={item} item={item} />
            ))}
          </Stack>
        </Box>
      </SortableContext>
    </>
  );
};

export default DroppableContainer;
