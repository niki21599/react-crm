import React from "react";
import "./Header.css";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import { SwipeableDrawer } from "@mui/material";
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
import {
  setOpenDrawer,
  setOpenResponsiveDrawer,
} from "../../store/slices/headerMenuSlice";
import ResponsiveHeader from "../ResponsiveHeader";
import NormalHeader from "../NormalHeader/NormalHeader";

const drawerWidth = 240;

export default function Header(props) {
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
    <div>
      {/* Responsive Header */}
      <ResponsiveHeader />
      {/* Standard-Header */}
      <NormalHeader />
    </div>
  );
}
