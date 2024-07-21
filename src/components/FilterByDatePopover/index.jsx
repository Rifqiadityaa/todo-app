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
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import { useRef } from "react";
import { FaCalendar } from "react-icons/fa6";

const FilterByDatePopover = () => {
  const { setStartDate, setEndDate, getItemsData, startDate, endDate } =
    useTodoContext();

  const { isOpen, onToggle, onClose } = useDisclosure();
  const popoverRef = useRef(null);
  useOutsideClick({
    ref: popoverRef,
    handler: onClose,
  });

  return (
    <Box ref={popoverRef}>
      <Popover isOpen={isOpen} autoFocus={false}>
        <PopoverTrigger>
          <Button
            variant={"ghost"}
            _hover={{
              bg: "#D5CCFF",
            }}
            onClick={onToggle}
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
                  value={startDate}
                  type="date"
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                />
              </Box>
              <Box>
                <FormLabel>End Date</FormLabel>
                <Input
                  value={endDate}
                  type="date"
                  onChange={(e) => {
                    setEndDate(e.target.value);
                  }}
                />
              </Box>
              <Button
                bg={"#D5CCFF"}
                onClick={async () => {
                  await getItemsData();
                  onClose();
                }}
                isDisabled={!startDate || !endDate}
              >
                Filter
              </Button>
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default FilterByDatePopover;
