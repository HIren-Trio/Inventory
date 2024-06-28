import { Avatar, Typography } from "@mui/material";
import React from "react";

// Utility function to generate a random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default function Product({ productName }) {
  // Generate a random color for the avatar
  const avatarColor = getRandomColor();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: "100%" }}>
      <Avatar
        alt="Product"
        sx={{
          width: 30,
          height: 30,
          bgcolor: avatarColor
        }}
      >
        {productName.charAt(0).toUpperCase()}
      </Avatar>

      <Typography variant="subtitle2">
        {productName}
      </Typography>
    </div>
  );
}
