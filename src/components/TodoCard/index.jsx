import { useTodoContext } from "@/shared/context/todoContext";
import { Box, Card, CardBody, Stack, Text } from "@chakra-ui/react";

const TodoCard = (props) => {
  const { setSelectedTodo } = useTodoContext();

  const { todo, onOpen } = props;

  if (!todo) return null;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "red";
      case "Medium":
        return "orange";
      case "Low":
        return "green";
    }
  };

  return (
    <Card
      bgColor={"#F4F2FF"}
      mb={"1rem"}
      style={{ touchAction: "none" }}
      onClick={() => {
        setSelectedTodo(todo);
        onOpen();
      }}
    >
      <CardBody>
        <Stack gap={"1rem"}>
          <Text pt="2" fontSize="smaller" fontWeight={"bold"}>
            {todo.name}
          </Text>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"end"}
          >
            <Stack gap={"0.8rem"}>
              <Text fontSize="small" color={"#A09F9F"} maxW={"200px"}>
                {todo.description}
              </Text>
              <Text fontSize="small" color={"#A09F9F"}>
                {todo.dueDate && <Text> Due {todo.dueDate}</Text>}
              </Text>
              <Text fontSize="small" color={getPriorityColor(todo.priority)}>
                {todo.priority}
              </Text>
            </Stack>
            <Text fontSize="small" color={"#A09F9F"}>
              {todo.group}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default TodoCard;
