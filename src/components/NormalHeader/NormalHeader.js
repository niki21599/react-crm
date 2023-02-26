import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import MuiAppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOpenDrawer } from "../../store/slices/headerMenuSlice";

const drawerWidth = 240;
export default function NormalHeader() {
  let dispatch = useDispatch();
  let { openDrawer } = useSelector((state) => state.headerMenu);

  const toggleDrawer = () => {
    dispatch(setOpenDrawer(!openDrawer));
  };

  //Für Header der nach rechts schiebt
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(openDrawer && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <Box sx={{ flexGrow: 1 }} className="responsive-d-none">
      <AppBar position="static" open={openDrawer}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            {openDrawer ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, fontFamily: "cursive" }}
          >
            My CRM System
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={openDrawer}
      >
        <img src="/react-crm/customer_logo.png" alt="" className="img-logo" />
        <Divider />
        <List>
          {[
            { text: "Dashboard", icon: <DashboardIcon />, site: "dashboard" },
            { text: "Customers", icon: <PeopleIcon />, site: "customers" },
            { text: "Sales", icon: <ShoppingBasketIcon />, site: "sales" },
          ].map((menuPoint) => (
            <Link
              to={menuPoint.site}
              style={{ textDecoration: "none" }}
              key={menuPoint.site}
            >
              <ListItem key={menuPoint.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{menuPoint.icon}</ListItemIcon>
                  <ListItemText
                    primary={menuPoint.text}
                    sx={{ color: "#1a1a1a" }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
