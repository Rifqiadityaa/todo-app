import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

const ModalTaskDetail = (props) => {
  const { isOpen, onClose } = props;

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskPriority, setTaskPriority] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const payload = {
      taskName,
      taskDescription,
      taskDueDate,
      taskPriority,
    };

    console.log(payload);

    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleFormSubmit}>
              <Stack spacing={6}>
                <FormControl>
                  <FormLabel>Task Name</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Task Description</FormLabel>
                  <Textarea
                    onChange={(e) => setTaskDescription(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Task Due Date</FormLabel>
                  <Input
                    type="date"
                    onChange={(e) => setTaskDueDate(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Task Priority</FormLabel>
                  <Select
                    placeholder="Select priority"
                    onChange={(e) => setTaskPriority(e.target.value)}
                  >
                    <option value="high">High</option>
                    <option value="med">Medium</option>
                    <option value="low">Low</option>
                  </Select>
                </FormControl>

                <Button mt={4} colorScheme="teal" type="submit">
                  Submit
                </Button>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalTaskDetail;
