import { Box, Card, CardBody, Stack, Text } from "@chakra-ui/react";

const TodoCard = (props) => {
  const { item, isOverlay } = props;

  if (isOverlay) {
    <Card bgColor={"#F4F2FF"}>test</Card>;
  }

  return (
    <Card bgColor={"#F4F2FF"} style={{ touchAction: "none" }}>
      <CardBody>
        <Stack gap={"1rem"}>
          <Text pt="2" fontSize="smaller" fontWeight={"bold"}>
            {item}
          </Text>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"end"}
          >
            <Stack gap={"0.8rem"}>
              <Text fontSize="small" color={"#A09F9F"} maxW={"200px"}>
                Create wireframes for the new landing page
              </Text>
              <Box display={"flex"} gap={"1rem"}>
                <Text fontSize="small" color={"#A09F9F"}>
                  12/07/2021
                </Text>
                <Text fontSize="small" color={"#A09F9F"}>
                  High
                </Text>
              </Box>
            </Stack>
            <Text fontSize="small" color={"#A09F9F"}>
              Project
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default TodoCard;
