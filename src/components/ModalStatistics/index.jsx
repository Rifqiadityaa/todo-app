import { useTodoContext } from "@/shared/context/todoContext";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

const ModalStatistics = (props) => {
  const { isOpen, onClose } = props;

  const { todosId } = useTodoContext();

  const totalCompleted = todosId["Completed"]?.length || 0;
  const totalInProgress = todosId["In Progress"]?.length || 0;
  const totalToDo = todosId["To Do"]?.length || 0;
  const totalTodos = totalCompleted + totalInProgress + totalToDo;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Statistics</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} justifyContent={"space-between"}>
            <Box w={"fit-content"} textAlign={"center"}>
              <CircularProgress
                value={(totalToDo / totalTodos) * 100}
                color="green.400"
                size={"100px"}
                mb={"0.5rem"}
              >
                <CircularProgressLabel>
                  {(totalToDo / totalTodos) * 100}%
                </CircularProgressLabel>
              </CircularProgress>
              <Text>To Do</Text>
            </Box>
            <Box w={"fit-content"} textAlign={"center"}>
              <CircularProgress
                value={(totalInProgress / totalTodos) * 100}
                color="green.400"
                size={"100px"}
                mb={"0.5rem"}
              >
                <CircularProgressLabel>
                  {(totalInProgress / totalTodos) * 100}%
                </CircularProgressLabel>
              </CircularProgress>
              <Text>In Progress</Text>
            </Box>
            <Box w={"fit-content"} textAlign={"center"}>
              <CircularProgress
                value={(totalCompleted / totalTodos) * 100}
                color="green.400"
                size={"100px"}
                mb={"0.5rem"}
              >
                <CircularProgressLabel>
                  {(totalCompleted / totalTodos) * 100}%
                </CircularProgressLabel>
              </CircularProgress>
              <Text>Completed</Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalStatistics;
