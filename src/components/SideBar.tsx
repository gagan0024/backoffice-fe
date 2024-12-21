import { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { Home, LocationOn, Apartment } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import CategoryIcon from "@mui/icons-material/Category";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import HouseIcon from "@mui/icons-material/House";
import InventoryIcon from "@mui/icons-material/Inventory";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route
  const [selectedItem, setSelectedItem] = useState<string>("");

  // Define the menu items with icons and routes
  const menuItems = [
    { name: "Home", icon: <Home />, route: "/" },
    { name: "Locations", icon: <LocationOn />, route: "/locations" },
    { name: "Buildings", icon: <Apartment />, route: "/buildings" },
    { name: "Sub-Buildings", icon: <CategoryIcon />, route: "/sub-buildings" },
    { name: "Levels", icon: <ViewStreamIcon />, route: "/levels" },
    { name: "Rooms", icon: <HouseIcon />, route: "/rooms" },
    { name: "Services", icon: <SettingsIcon />, route: "/services" },
    {
      name: "Sub-Services",
      icon: <SettingsSuggestIcon />,
      route: "/sub-services",
    },
    { name: "Products", icon: <InventoryIcon />, route: "/product" },
    {
      name: "Final Design Form",
      icon: <DynamicFormIcon />,
      route: "/final-design-form",
    },
  ];

  // Update selected item based on the current route
  useEffect(() => {
    const currentMenuItem = menuItems.find(
      (item) => item.route === location.pathname
    );
    if (currentMenuItem) {
      setSelectedItem(currentMenuItem.name);
    }
  }, [location.pathname]); // Runs whenever the path changes

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
