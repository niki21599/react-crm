import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { SwipeableDrawer } from "@mui/material";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppBar } from "@mui/material";
import { setOpenResponsiveDrawer } from "../store/slices/headerMenuSlice";

export default function ResponsiveHeader() {
  let { openResponsiveDrawer } = useSelector((state) => state.headerMenu);
  let dispatch = useDispatch();
  let toggleResponsiveDrawer = () => {
    dispatch(setOpenResponsiveDrawer(!openResponsiveDrawer));
  };

  return (
    <Box sx={{ flexGrow: 1 }} className="responsive">
      <AppBar position="static" sx={{ width: "100%", marginLeft: 0 }}>
        <Toolbar>
          <React.Fragment key="left">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleResponsiveDrawer}
            >
              <MenuIcon />
            </IconButton>
            <SwipeableDrawer
              anchor="left"
              open={openResponsiveDrawer}
              onClose={toggleResponsiveDrawer}
              onOpen={toggleResponsiveDrawer}
            >
              <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={toggleResponsiveDrawer}
                onKeyDown={toggleResponsiveDrawer}
              >
                <List>
                  <Typography variant="h5" align="center">
                    {" "}
                    My CRM
                  </Typography>
                  <Divider />
                  {[
                    {
                      text: "Dashboard",
                      icon: <DashboardIcon />,
                      site: "dashboard",
                    },
                    {
                      text: "Customers",
                      icon: <PeopleIcon />,
                      site: "customers",
                    },
                    {
                      text: "Sales",
                      icon: <ShoppingBasketIcon />,
                      site: "sales",
                    },
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
              </Box>
            </SwipeableDrawer>
          </React.Fragment>
          <Typography
            align="center"
            variant="h4"
            component="div"
            className="heading-responsive"
            sx={{ flexGrow: 1, fontFamily: "cursive" }}
          >
            MyCRM
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
