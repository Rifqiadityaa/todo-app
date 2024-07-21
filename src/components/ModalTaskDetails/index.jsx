import { useTodoContext } from "@/shared/context/todoContext";
import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa6";

const ModalTodoDetail = (props) => {
  const { isOpen, onClose } = props;

  const [todoName, setTodoName] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [todoDueDate, setTodoDueDate] = useState("");
  const [todoPriority, setTodoPriority] = useState("");
  const [todoGroup, setTodoGroup] = useState("");

  const { selectedTodo, getItemsData, updateTodo, setSelectedTodo } =
    useTodoContext();

  const createTodo = async (payload) => {
    await fetch("http://localhost:8000/todos", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(payload),
    });
  };

  const deleteTodo = async () => {
    if (!selectedTodo) return;

    await fetch(`http://localhost:8000/todos/${selectedTodo.id}`, {
      method: "DELETE",
    });

    await getItemsData();
    setSelectedTodo(null);
    onClose();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: todoName || selectedTodo?.name,
      description: todoDescription || selectedTodo?.description,
      dueDate: todoDueDate || selectedTodo?.dueDate,
      priority: todoPriority || selectedTodo?.priority,
      status: selectedTodo?.status || "To Do",
      group: todoGroup || selectedTodo?.group,
    };

    if (selectedTodo) {
      await updateTodo(selectedTodo.id, payload);
    } else {
      await createTodo(payload);
    }

    await getItemsData();
    setSelectedTodo(null);
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setSelectedTodo(null);
          onClose();
        }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={"flex"} gap={"1rem"} alignItems={"center"}>
            <Text>{selectedTodo ? "Update To Do" : "Create To Do"}</Text>
            {selectedTodo && (
              <Button variant={"ghost"} onClick={deleteTodo}>
                <Icon as={FaTrash} color={"red"} />
              </Button>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleFormSubmit}>
              <Stack spacing={6}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    defaultValue={selectedTodo?.name}
                    type="text"
                    onChange={(e) => setTodoName(e.target.value)}
                  />
                </FormControl>

                <FormControl defaultValue={selectedTodo?.description}>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    defaultValue={selectedTodo?.description}
                    onChange={(e) => setTodoDescription(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Due Date</FormLabel>
                  <Input
                    defaultValue={selectedTodo?.dueDate}
                    type="date"
                    onChange={(e) => setTodoDueDate(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    defaultValue={selectedTodo?.priority}
                    placeholder="Select priority"
                    onChange={(e) => setTodoPriority(e.target.value)}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Group</FormLabel>
                  <Select
                    defaultValue={selectedTodo?.group}
                    placeholder="Select Group"
                    onChange={(e) => setTodoGroup(e.target.value)}
                  >
                    <option value="Development">Development</option>
                    <option value="Testing">Testing</option>
                    <option value="Design">Design</option>
                  </Select>
                </FormControl>

                <Button
                  mt={4}
                  bgColor={"#D5CCFF"}
                  type="submit"
                  color={"#F4F2FF"}
                  isDisabled={!todoName}
                >
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

export default ModalTodoDetail;
