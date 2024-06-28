// import {
//   Box,
//   Grid,
//   AppBar,
//   Container,
//   Typography,
//   Paper,
//   IconButton,
//   Avatar,
//   Badge,
//   Menu,
//   MenuItem,
//   Divider,
//   ListItemIcon,
//   Tooltip,
// } from "@mui/material";
// import {
//   NotificationsOutlined,
//   Settings,
//   Logout,
//   AccountCircleOutlined,
// } from "@mui/icons-material";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { logoutSuccess } from "../redux/action/authAction";
// import { getAllNotification } from "../redux/service/generalService";

// export default function NavBarComponent() {
//   const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
//   const [anchorEl, setAnchorEl] = useState(null);

//   const dispatch = useDispatch();
//   const { userData } = useSelector((state) => state?.persist);
//   // handleNotificationClicked
//   const open = Boolean(anchorEl);
//   const notificationOpen = Boolean(notificationAnchorEl);

//   const [notifications, setNotifications] = useState([]);

//   const fetchNotification = async () => {
//     try {
//       const res = await getAllNotification(userData?.id);
//       console.log(res);
//       setNotifications(res);
//     } catch (err) {
//       console.log(err);

//     }
//   }
//   useEffect(() => {
//     fetchNotification();
//   }, [])
//   const handleAvatarClicked = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleNotificationClicked = (event) => {
//     setNotificationAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const notificationHandleClose = () => {
//     setNotificationAnchorEl(null);
//   };

//   const handleLogout = () =>{
//     dispatch(logoutSuccess())
//   }

//   return (
//     <Grid container>
//       <Grid item md={12}>
//         <Paper elevation={4}>
//           <AppBar sx={{ padding: 2 }} position="static">
//             <Container maxWidth="xxl">
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography
//                   variant="h6"
//                   component="a"
//                   href="/"
//                   sx={{
//                     mx: 2,
//                     display: { xs: "none", md: "flex" },
//                     fontWeight: 700,
//                     letterSpacing: ".2rem",
//                     color: "inherit",
//                     textDecoration: "none",
//                   }}
//                 >
//                   Inventory 
//                 </Typography>

//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "right",
//                     alignItems: "center",
//                   }}
//                 >
//                   <IconButton color="inherit">
//                     <Badge variant="dot" color="error" invisible={false}>
//                       <NotificationsOutlined
//                         sx={{ width: 32, height: 32 }}
//                         onClick={handleNotificationClicked}
//                       />
//                     </Badge>
//                   </IconButton>
//                   <Menu
//                     open={notificationOpen}
//                     anchorEl={notificationAnchorEl}
//                     onClose={notificationHandleClose}
//                   >
//                     {notifications.map((notification, index) => (
//                       <div key={index}>
//                         <MenuItem>{notification.message}</MenuItem>
//                         {index !== notifications.length - 1 && <Divider />}
//                       </div>
//                     ))}
//                   </Menu>
//                   <IconButton
//                     onClick={handleAvatarClicked}
//                     size="small"
//                     sx={{ mx: 2 }}
//                     aria-haspopup="true"
//                   >
//                     <Tooltip title="account settings">
//                       <Avatar sx={{ width: 32, height: 32 }}>{userData?.username.charAt(0).toUpperCase()}</Avatar> 
//                     </Tooltip>
//                   </IconButton>
//                   <Typography fontFamily={"Inter"}>{userData?.username}</Typography>
//                 </Box>

//                 <Menu
//                   open={open}
//                   anchorEl={anchorEl}
//                   onClick={handleClose}
//                   onClose={handleClose}
//                 >
//                   <MenuItem>
//                     <ListItemIcon>
//                       <AccountCircleOutlined fontSize="small" />
//                     </ListItemIcon>
//                     Profile
//                   </MenuItem>
//                   <Divider />

//                   <MenuItem>
//                     <ListItemIcon>
//                       <Settings fontSize="small" />
//                     </ListItemIcon>
//                     Settings
//                   </MenuItem>
//                   <MenuItem onClick={handleLogout}>
//                     <ListItemIcon>
//                       <Logout fontSize="small" />
//                     </ListItemIcon>
//                     Logout
//                   </MenuItem>
//                 </Menu>
//               </Box>
//             </Container>
//           </AppBar>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// }

// {
//   /* <Grid item md={7}>
//                   <Paper
//                     component="form"
//                     sx={{
//                       p: "2px 4px",
//                       width: "50%",
//                       mx: "auto",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <InputBase
//                       sx={{ ml: 1, flex: 1 }}
//                       placeholder="Search "
//                       inputProps={{ "aria-label": "search" }}
//                     />
//                     <IconButton
//                       type="button"
//                       sx={{ p: "10px" }}
//                       aria-label="search"
//                     >
//                       <Search />
//                     </IconButton>
//                   </Paper>
//                 </Grid> */
// }
import React from 'react';
import {
  Box,
  Grid,
  AppBar,
  Container,
  Typography,
  Paper,
  IconButton,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  NotificationsOutlined,
  Settings,
  Logout,
  AccountCircleOutlined,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../redux/action/authAction';
import { getAllNotification } from '../redux/service/generalService';

export default function NavBarComponent() {
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state?.persist);
  // handleNotificationClicked
  const open = Boolean(anchorEl);
  const notificationOpen = Boolean(notificationAnchorEl);

  const [notifications, setNotifications] = useState([]);

  const fetchNotification = async () => {
    try {
      const res = await getAllNotification(userData?.id);
      console.log(res);
      setNotifications(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNotification();
  }, []);

  const handleAvatarClicked = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleNotificationClicked = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const notificationHandleClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutSuccess());
  };

  const theme = useTheme();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper elevation={4}>
          <AppBar sx={{ padding: 2 }} position="static">
            <Container maxWidth="xxl">
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="h6"
                  component="a"
                  href="/"
                  sx={{
                    mx: 5,
                    display: { xs: 'flex', md: 'flex' },
                    fontWeight: 700,
                    letterSpacing: '.2rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  Inventory
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'right',
                    alignItems: 'center',
                  }}
                >
                  <IconButton color="inherit">
                    <Badge variant="dot" color="error" invisible={false}>
                      <NotificationsOutlined
                        sx={{ width: 32, height: 32 }}
                        onClick={handleNotificationClicked}
                      />
                    </Badge>
                  </IconButton>
                  <Menu
                    open={notificationOpen}
                    anchorEl={notificationAnchorEl}
                    onClose={notificationHandleClose}
                  >
                    {notifications.map((notification, index) => (
                      <div key={index}>
                        <MenuItem>{notification.message}</MenuItem>
                        {index !== notifications.length - 1 && <Divider />}
                      </div>
                    ))}
                  </Menu>
                  <IconButton
                    onClick={handleAvatarClicked}
                    size="small"
                    sx={{ mx: 2 }}
                    aria-haspopup="true"
                  >
                    <Tooltip title="account settings">
                      <Avatar sx={{ width: 32, height: 32 }}>
                        {userData?.username.charAt(0).toUpperCase()}
                      </Avatar>
                    </Tooltip>
                  </IconButton>

                  <Typography fontFamily={'Inter'}>{userData?.username}</Typography>

                </Box>

                <Menu
                  open={open}
                  anchorEl={anchorEl}
                  onClick={handleClose}
                  onClose={handleClose}
                >
                  <MenuItem>
                    <ListItemIcon>
                      <AccountCircleOutlined fontSize="small" />
                    </ListItemIcon>
                    Profile
                  </MenuItem>
                  <Divider />

                  <MenuItem>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            </Container>
          </AppBar>
        </Paper>
      </Grid>
    </Grid>
  );
}
