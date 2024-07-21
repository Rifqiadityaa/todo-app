import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";

const MenuDropdown = () => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<BsThreeDotsVertical />}
        variant="ghost"
      />
      <MenuList zIndex={999}>
        <MenuItem>New Tab</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuDropdown;
