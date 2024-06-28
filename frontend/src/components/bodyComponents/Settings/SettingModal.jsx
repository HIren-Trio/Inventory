import React from 'react';
import { Modal, Box, Typography, List, ListItemButton, ListItemText, ListItemIcon, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import BrushIcon from '@mui/icons-material/Brush';
import LanguageIcon from '@mui/icons-material/Language';
import InfoIcon from '@mui/icons-material/Info';

const SettingsModal = () => {
    return (
        <Box sx={{
            left: "50%",
            top: "50%",
            width: "100%",
            bgcolor: "white",
            p: 4,
        }}>

            <List component="nav">
                <ListItemButton component="a" href="#account">
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Account" />
                </ListItemButton>
                <ListItemButton component="a" href="#notifications">
                    <ListItemIcon>
                        <NotificationsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Notifications" />
                </ListItemButton>
                <ListItemButton component="a" href="#privacy">
                    <ListItemIcon>
                        <PrivacyTipIcon />
                    </ListItemIcon>
                    <ListItemText primary="Privacy" />
                </ListItemButton>
                <ListItemButton component="a" href="#security">
                    <ListItemIcon>
                        <SecurityIcon />
                    </ListItemIcon>
                    <ListItemText primary="Security" />
                </ListItemButton>
                <ListItemButton component="a" href="#general">
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="General" />
                </ListItemButton>
                <ListItemButton component="a" href="#appearance">
                    <ListItemIcon>
                        <BrushIcon />
                    </ListItemIcon>
                    <ListItemText primary="Appearance" />
                </ListItemButton>
                <ListItemButton component="a" href="#language">
                    <ListItemIcon>
                        <LanguageIcon />
                    </ListItemIcon>
                    <ListItemText primary="Language" />
                </ListItemButton>
                <ListItemButton component="a" href="#about">
                    <ListItemIcon>
                        <InfoIcon />
                    </ListItemIcon>
                    <ListItemText primary="About" />
                </ListItemButton>
            </List>
        </Box>
    );
};

export default SettingsModal;
