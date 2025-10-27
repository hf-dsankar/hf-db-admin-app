"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography,
} from "@mui/material";

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  recordCount?: number;
}

export default function ConfirmationDialog({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  recordCount,
}: ConfirmationDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="confirmation-dialog-title">
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="confirmation-dialog-description">
          {message}
        </DialogContentText>

        {recordCount && (
          <Box
            sx={{ mt: 2, p: 2, backgroundColor: "grey.50", borderRadius: 1 }}
          >
            <Typography variant="body2" color="text.secondary">
              <strong>Records to submit:</strong> {recordCount}
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onCancel} color="inherit">
          {cancelText}
        </Button>
        <Button onClick={onConfirm} color="primary" variant="contained">
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
