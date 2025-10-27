"use client";

import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({
  message = "Loading...",
}: LoadingScreenProps) {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          boxShadow: 3,
        }}
      >
        <CircularProgress size={40} />
        <Typography variant="h6" color="text.primary">
          {message}
        </Typography>
      </Box>
    </Box>
  );
}
