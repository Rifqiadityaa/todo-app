import { useTodoContext } from "@/shared/context/todoContext";
import {
  Box,
  Button,
  FormLabel,
  Icon,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
} from "@chakra-ui/react";
import { FaCalendar } from "react-icons/fa6";

const FilterByDatePopover = () => {
  const { setStartDate, setEndDate, getItemsData } = useTodoContext();

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant={"ghost"}
          _hover={{
            bg: "#D5CCFF",
          }}
        >
          <Icon as={FaCalendar} color={"white"} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Filter By Date</PopoverHeader>
        <PopoverBody>
          <Stack spacing={"1.5rem"}>
            <Box>
              <FormLabel>Start Date</FormLabel>
              <Input
                type="date"
                onChange={(e) => {
                  setStartDate(new Date(e.target.value));
                }}
              />
            </Box>
            <Box>
              <FormLabel>End Date</FormLabel>
              <Input
                type="date"
                onChange={(e) => {
                  setEndDate(new Date(e.target.value));
                }}
              />
            </Box>
            <Button bg={"#D5CCFF"} onClick={getItemsData}>
              Filter
            </Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default FilterByDatePopover;
