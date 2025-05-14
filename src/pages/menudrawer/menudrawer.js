import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ViewListIcon from "@mui/icons-material/ViewList";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import ReportIcon from "@mui/icons-material/Report";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupIcon from "@mui/icons-material/Group";
import DoorbellIcon from "@mui/icons-material/Doorbell";
import Dashboard from "../dashboard/dashboard";
import Addcomplaint from "../addcomplaint/addcomplaint";
import Searchviewcomplaint from "../searchandviewcomplaint/searchviewcomplaint";
import "./menudrawer.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

const drawerWidth = 320;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));
export default function Menudrawer({onLogout, onInitialState}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [screenName, setScreenName] = React.useState("dashboard");
  const [manageComplaint, setManageComplaint] = React.useState(false);
  const [manageMaster, setManageMaster] = React.useState(false);
  const [manageConfigurations, setManageConfigurations] = React.useState(false);
  const [managePermission, setManagePermission] = React.useState(false);
  const [manageUsers, setManageUsers] = React.useState(false);
  const [manageRoles, setManageRoles] = React.useState(false);
  const [reports, setReports] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [auth] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChangeMenu = (name) => {
    setScreenName(name);
  };

  const handleManageCompalintsClick = () => {
    setManageComplaint(!manageComplaint);
  };

  const handleManageMastersClick = () => {
    setManageMaster(!manageMaster);
  };

  const handleManageConfigurationsClick = () => {
    setManageConfigurations(!manageConfigurations);
  };

  const handleManagePermissionClick = () => {
    setManagePermission(!managePermission);
  };

  const handleManageUsersClick = () => {
    setManageUsers(!manageUsers);
  };

  const handleManageRolesClick = () => {
    setManageRoles(!manageRoles);
  };

  const handleReportsClick = () => {
    setReports(!reports);
  };

  const handleClose = () => {
    setAnchorEl(null);
    onLogout()
    onInitialState()
    localStorage.setItem("loggedIn", "false");

  };
  const handleClose1 = () => {
    setAnchorEl(null);
  };



  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <Box sx={{ display: "flex", bgcolor: "#f0f3f9", height: "100vh" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[
                {
                  marginRight: 5,
                },
                open && { display: "none" },
              ]}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box sx={{ display: "flex" , marginTop:"10px"}}>
                <Typography variant="h6" noWrap component="div">
                  Complaint Management System
                </Typography>
                <Typography
                  variant="caption"
                  gutterBottom
                  sx={{
                    display: "block",
                    paddingTop: "9px",
                    marginLeft: "4px",
                  }}
                >
                  v2.0.0s.R9
                </Typography>
              </Box>
              <Box sx={{ display: "flex"}}>
                <Typography sx={{marginTop:"10px"}}>Home{" |"}</Typography>
                <Typography sx={{ marginLeft: "5px", marginTop:"10px"}}>
                  cmsintegra(admin)
                </Typography>
               {auth && (
                  <>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <AccountCircleIcon />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose1}
                    >
                      <MenuItem onClick={handleClose} onHide={handleClose1}>Logout</MenuItem>
                    </Menu>
                  </>
                )}
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "80px",
            }}
          >
            <Typography
              sx={{ fontWeight: "600", color: "#2e289f" }}
              variant="h5"
            >
              INTEGRA
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItemButton
              className={screenName === "dashboard" ? "active-menu" : ""}
              onClick={() => handleChangeMenu("dashboard")}
            >
              <ListItemIcon>
                <DashboardIcon
                  className={
                    screenName === "dashboard" ? "active-icon" : "icon-color"
                  }
                />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>

            <ListItemButton onClick={handleManageCompalintsClick}>
              <ListItemIcon>
                <ReportGmailerrorredIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Manage Compalints" />
              {manageComplaint ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={manageComplaint} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  className={screenName === "addcomplaint" ? "active-menu" : ""}
                  onClick={() => handleChangeMenu("addcomplaint")}
                >
                  <ListItemIcon>
                    <AddBoxIcon
                      className={
                        screenName === "addcomplaint"
                          ? "active-icon"
                          : "icon-color"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Add Complaint" />
                </ListItemButton>
              </List>
            </Collapse>
            <Collapse in={manageComplaint} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  className={
                    screenName === "searchviewcomplaint" ? "active-menu" : ""
                  }
                  onClick={() => handleChangeMenu("searchviewcomplaint")}
                >
                  <ListItemIcon>
                    <ViewListIcon
                      className={
                        screenName === "searchviewcomplaint"
                          ? "active-icon"
                          : "icon-color"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Search and View Complaints" />
                </ListItemButton>
              </List>
            </Collapse>
            <Collapse in={manageComplaint} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  className={
                    screenName === "complaintsummary" ? "active-menu" : ""
                  }
                  onClick={() => handleChangeMenu("complaintsummary")}
                >
                  <ListItemIcon>
                    <SummarizeIcon
                      className={
                        screenName === "complaintsummary"
                          ? "active-icon"
                          : "icon-color"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Complaint Summary" />
                </ListItemButton>
              </List>
            </Collapse>
            <Collapse in={manageComplaint} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  className={
                    screenName === "agentlogindetailsreport"
                      ? "active-menu"
                      : ""
                  }
                  onClick={() => handleChangeMenu("agentlogindetailsreport")}
                >
                  <ListItemIcon>
                    <ReportIcon
                      className={
                        screenName === "agentlogindetailsreport"
                          ? "active-icon"
                          : "icon-color"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Agent Login Details Report" />
                </ListItemButton>
              </List>
            </Collapse>
            <Collapse in={manageComplaint} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  className={
                    screenName === "agentengagementstatus" ? "active-menu" : ""
                  }
                  onClick={() => handleChangeMenu("agentengagementstatus")}
                >
                  <ListItemIcon>
                    <SummarizeIcon
                      className={
                        screenName === "agentengagementstatus"
                          ? "active-icon"
                          : "icon-color"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Agent Engagement Status" />
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton onClick={handleManageMastersClick}>
              <ListItemIcon>
                <SpaceDashboardIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Manage Masters" />
              {manageMaster ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={manageMaster} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  className={
                    screenName === "managemasters1" ? "active-menu" : ""
                  }
                  onClick={() => handleChangeMenu("managemasters1")}
                >
                  <ListItemIcon>
                    <AddBoxIcon
                      className={
                        screenName === "managemasters1"
                          ? "active-icon"
                          : "icon-color"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Add Complaint" />
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton onClick={handleManageConfigurationsClick}>
              <ListItemIcon>
                <SettingsIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Manage Configurations" />
              {manageConfigurations ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={manageConfigurations} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  className={
                    screenName === "manageconfigurations1" ? "active-menu" : ""
                  }
                  onClick={() => handleChangeMenu("manageconfigurations1")}
                >
                  <ListItemIcon>
                    <AddBoxIcon
                      className={
                        screenName === "manageconfigurations1"
                          ? "active-icon"
                          : "icon-color"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Add Complaint" />
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton onClick={handleManagePermissionClick}>
              <ListItemIcon>
                <GroupIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Manage Permission" />
              {managePermission ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={managePermission} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  className={
                    screenName === "managepermission1" ? "active-menu" : ""
                  }
                  onClick={() => handleChangeMenu("managepermission1")}
                >
                  <ListItemIcon>
                    <AddBoxIcon
                      className={
                        screenName === "managepermission1"
                          ? "active-icon"
                          : "icon-color"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Add Complaint" />
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton onClick={handleManageUsersClick}>
              <ListItemIcon>
                <SpaceDashboardIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Manage Users" />
              {manageUsers ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={manageUsers} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  className={screenName === "manageusers1" ? "active-menu" : ""}
                  onClick={() => handleChangeMenu("manageusers1")}
                >
                  <ListItemIcon>
                    <AddBoxIcon
                      className={
                        screenName === "manageusers1"
                          ? "active-icon"
                          : "icon-color"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Add Complaint" />
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton onClick={handleManageRolesClick}>
              <ListItemIcon>
                <GroupIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Manage Roles" />
              {manageRoles ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={manageRoles} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  className={screenName === "manageroles1" ? "active-menu" : ""}
                  onClick={() => handleChangeMenu("manageroles1")}
                >
                  <ListItemIcon>
                    <AddBoxIcon
                      className={
                        screenName === "manageroles1"
                          ? "active-icon"
                          : "icon-color"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Add Complaint" />
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton onClick={handleReportsClick}>
              <ListItemIcon>
                <SummarizeIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Reports" />
              {reports ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={reports} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  className={screenName === "reports1" ? "active-menu" : ""}
                  onClick={() => handleChangeMenu("reports1")}
                >
                  <ListItemIcon>
                    <AddBoxIcon
                      className={
                        screenName === "reports1" ? "active-icon" : "icon-color"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Add Complaint" />
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton>
              <ListItemIcon>
                <DoorbellIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Escalate Tickets" />
            </ListItemButton>
          </List>
        </Drawer>
        <Box width={"65%"} component="main" sx={{ flexGrow: 1, p: 1 }}>
          <DrawerHeader />
          {screenName === "dashboard" && (
            <>
              <Dashboard />
            </>
          )}
          {screenName === "addcomplaint" && (
            <>
              <Addcomplaint />
            </>
          )}
          {screenName === "searchviewcomplaint" && (
            <>
              <Searchviewcomplaint />
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
