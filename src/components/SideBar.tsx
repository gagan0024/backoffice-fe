import { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { Home, LocationOn, Apartment } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CategoryIcon from "@mui/icons-material/Category";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import HouseIcon from "@mui/icons-material/House";
import InventoryIcon from "@mui/icons-material/Inventory";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";

const SideBar = () => {
  const [selectedItem, setSelectedItem] = useState<string>("Home");
  const navigate = useNavigate();

  // Define the menu items with icons and routes
  const menuItems = [
    { name: "Home", icon: <Home />, route: "/" },
    { name: "Locations", icon: <LocationOn />, route: "/locations" },
    { name: "Buildings", icon: <Apartment />, route: "/buildings" },
    { name: "Sub-Buildings", icon: <CategoryIcon />, route: "/sub-buildings" },
    { name: "Levels", icon: <ViewStreamIcon />, route: "/levels" },
    { name: "Rooms", icon: <HouseIcon />, route: "/rooms" },
    { name: "Products", icon: <InventoryIcon />, route: "/product" },
    {
      name: "Final Design Form",
      icon: <DynamicFormIcon />,
      route: "/final-design-form",
    },
  ];

  return (
    <Box
      sx={{
        width: "270px",
        height: "100vh",
        backgroundColor: "black",
        color: "white",
      }}
      style={{ height: "calc(100vh - 65px)" }}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{
              marginBottom: "2px",
              "&:hover": { backgroundColor: "#333" },
            }}
          >
            <ListItemButton
              onClick={() => {
                setSelectedItem(item.name);
                navigate(item.route);
              }}
              sx={{
                backgroundColor:
                  selectedItem === item.name ? "#555" : "transparent",
                borderRadius: "4px",
              }}
            >
              <ListItemIcon
                sx={{
                  color: selectedItem === item.name ? "cyan" : "white",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                sx={{
                  color: selectedItem === item.name ? "cyan" : "white",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SideBar;
