import { Box, Typography } from "@mui/material";
import React, { Component } from "react";
import SettingsModal from "./SettingModal";

export default class Setting extends Component {
  render() {
    return  <Box
    sx={{
      margin: 3,
      bgcolor: "white",
      borderRadius: 2,
      padding: 3,
      height: "100%",
    }}
  >
      <Typography variant="h3" sx={{ m: 3, fontWeight: "bold" }}>
        Setting
      </Typography>
      <SettingsModal />
    </Box>;
  }
}
