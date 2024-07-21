import { useTodoContext } from "@/shared/context/todoContext";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FaFilter } from "react-icons/fa6";

const MenuDropdown = () => {
  const { getItemsData } = useTodoContext();

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<FaFilter color="white" />}
        variant="ghost"
        _hover={{
          bg: "#D5CCFF",
        }}
        _active={{
          bg: "#D5CCFF",
        }}
      />
      <MenuList zIndex={999}>
        <MenuItem
          onClick={() => {
            getItemsData();
          }}
        >
          Show All
        </MenuItem>
        <MenuDivider />
        <MenuGroup title="Priority">
          <MenuItem
            onClick={() => {
              getItemsData({ priority: "High" });
            }}
          >
            High Priority
          </MenuItem>
          <MenuItem
            onClick={() => {
              getItemsData({ priority: "Medium" });
            }}
          >
            Medium Priority
          </MenuItem>
          <MenuItem
            onClick={() => {
              getItemsData({ priority: "Low" });
            }}
          >
            Low Priority
          </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Group">
          <MenuItem
            onClick={() => {
              getItemsData({ group: "Development" });
            }}
          >
            Development
          </MenuItem>
          <MenuItem
            onClick={() => {
              getItemsData({ group: "Testing" });
            }}
          >
            Testing
          </MenuItem>
          <MenuItem
            onClick={() => {
              getItemsData({ group: "Design" });
            }}
          >
            Design
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default MenuDropdown;
