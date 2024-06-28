import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  Drawer,
  useMediaQuery,
  IconButton,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
import {
  HomeOutlined,
  Inventory2Outlined,
  SettingsOutlined,
  DescriptionOutlined,
  MonetizationOnOutlined,
  CardTravelOutlined,
  TrendingUpOutlined,
  PeopleAltOutlined,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

export default function SideBarComponent() {
  const navigate = useNavigate();
  const navigateTo = (to) => {
    navigate(to);
  };
  const location = useLocation();
  const currentPage = location.pathname;

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const sideBarComponent = [
    {
      title: "Home",
      component: <HomeOutlined fontSize="medium" color="primary" />,
    },
    {
      title: "Inventory",
      component: <Inventory2Outlined fontSize="medium" color="primary" />,
    },
    {
      title: "Orders",
      component: <CardTravelOutlined fontSize="medium" color="primary" />,
    },
    {
      title: "Customers",
      component: <PeopleAltOutlined fontSize="medium" color="primary" />,
    },
    {
      title: "Revenue",
      component: <MonetizationOnOutlined fontSize="medium" color="primary" />,
    },
    {
      title: "Growth",
      component: <TrendingUpOutlined fontSize="medium" color="primary" />,
    },
    {
      title: "Reports",
      component: <DescriptionOutlined fontSize="medium" color="primary" />,
    },
    {
      title: "Settings",
      component: <SettingsOutlined fontSize="medium" color="primary" />,
    },
  ];

  const [selected, setSelected] = useState(0);
  const handleSelectedComponent = (event, index) => {
    setSelected(index);
    setDrawerOpen(false); // Close drawer on selection for mobile view
  };

  const drawerContent = (
    <List>
      {sideBarComponent.map((comp, index) => (
        <ListItem disablePadding dense={true} key={index}>
          <Box width="100%">
            <ListItemButton
              onClick={(event) => {
                handleSelectedComponent(event, index);
                navigateTo(comp.title.toLocaleLowerCase());
              }}
              selected={
                index === selected &&
                currentPage === "/" + comp.title.toLowerCase()
              }
              sx={{
                mb: 3,
                borderLeft: 0,
                borderColor: "primary.main",
                ml: 1,
              }}
            >
              <ListItemIcon>
                <IconButton>{comp.component}</IconButton>
              </ListItemIcon>
              <ListItemText
                primary={comp.title}
                primaryTypographyProps={{
                  fontSize: "medium",
                  fontWeight: selected === index ? "bold" : "",
                  color: selected === index ? "primary.main" : "inherit",
                }}
              />
            </ListItemButton>
          </Box>
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      {isMobile ? (
        <>
          <Toolbar style={{ marginTop: "-60px" }}>
            <IconButton
              edge="start"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
              style={{ color: "white" }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            {drawerContent}
          </Drawer>
        </>
      ) : (
        <Box sx={{ width: 250 }}>{drawerContent}</Box>
      )}
    </>
  );
}
