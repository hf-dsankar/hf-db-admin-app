"use client";

import { useState, useEffect } from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

interface ToastNotificationProps {
  open: boolean;
  message: string;
  severity: AlertColor;
  onClose: () => void;
  autoHideDuration?: number;
}

export default function ToastNotification({
  open,
  message,
  severity,
  onClose,
  autoHideDuration = 4000,
}: ToastNotificationProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

// Hook for easier toast management
export function useToast() {
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: "",
    severity: "info",
  });

  const showToast = (message: string, severity: AlertColor = "info") => {
    setToast({
      open: true,
      message,
      severity,
    });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  const showSuccess = (message: string) => showToast(message, "success");
  const showError = (message: string) => showToast(message, "error");
  const showWarning = (message: string) => showToast(message, "warning");
  const showInfo = (message: string) => showToast(message, "info");

  return {
    toast,
    showToast,
    hideToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
}
