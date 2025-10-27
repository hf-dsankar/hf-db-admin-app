"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Checkbox,
  Button,
  Box,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
// Using text-based icons instead of @mui/icons-material

interface FieldSchema {
  name: string;
  type: "string" | "number" | "email" | "date" | "boolean";
  required?: boolean;
  label?: string;
}

interface RecordFormProps {
  schema: FieldSchema[];
  onSubmit: (records: any[]) => void;
  initialData?: any[];
}

export default function RecordForm({
  schema,
  onSubmit,
  initialData = [],
}: RecordFormProps) {
  const [records, setRecords] = useState<any[]>(
    initialData.length > 0 ? initialData : [{}]
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addRecord = () => {
    setRecords([...records, {}]);
  };

  const removeRecord = (index: number) => {
    if (records.length > 1) {
      setRecords(records.filter((_, i) => i !== index));
    }
  };

  const updateRecord = (index: number, field: string, value: any) => {
    const updatedRecords = [...records];
    updatedRecords[index] = { ...updatedRecords[index], [field]: value };
    setRecords(updatedRecords);
  };

  const validateRecord = (record: any, index: number): boolean => {
    const recordErrors: Record<string, string> = {};

    schema.forEach((field) => {
      if (
        field.required &&
        (!record[field.name] || record[field.name] === "")
      ) {
        recordErrors[`${index}-${field.name}`] = `${
          field.label || field.name
        } is required`;
      }
    });

    setErrors((prev) => ({ ...prev, ...recordErrors }));
    return Object.keys(recordErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;
    const newErrors: Record<string, string> = {};

    records.forEach((record, index) => {
      if (!validateRecord(record, index)) {
        isValid = false;
      }
    });

    if (isValid) {
      onSubmit(records);
      setRecords([{}]);
      setErrors({});
    }
  };

  const getInputType = (fieldType: string) => {
    switch (fieldType) {
      case "number":
        return "number";
      case "email":
        return "email";
      case "date":
        return "date";
      case "boolean":
        return "checkbox";
      default:
        return "text";
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: "1200px", margin: "0 auto", p: 2 }}
    >
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "grey.50" }}>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "text.primary",
                  py: 1,
                  px: 1,
                }}
              >
                #
              </TableCell>
              {schema.map((field) => (
                <TableCell
                  key={field.name}
                  sx={{
                    fontWeight: "bold",
                    color: "text.primary",
                    minWidth: "120px",
                    py: 1,
                    px: 1,
                  }}
                >
                  {field.label || field.name}
                  {field.required && (
                    <Typography
                      component="span"
                      sx={{ color: "error.main", ml: 0.5 }}
                    >
                      *
                    </Typography>
                  )}
                </TableCell>
              ))}
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "text.primary",
                  textAlign: "center",
                  width: "80px",
                  py: 1,
                  px: 1,
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record, recordIndex) => (
              <TableRow key={recordIndex}>
                <TableCell
                  sx={{
                    textAlign: "center",
                    color: "text.secondary",
                    py: 0.5,
                    px: 1,
                  }}
                >
                  {recordIndex + 1}
                </TableCell>
                {schema.map((field) => (
                  <TableCell
                    key={field.name}
                    sx={{
                      verticalAlign: "top",
                      py: 0.5,
                      px: 1,
                    }}
                  >
                    {field.type === "boolean" ? (
                      <Checkbox
                        checked={record[field.name] || false}
                        onChange={(e) =>
                          updateRecord(
                            recordIndex,
                            field.name,
                            e.target.checked
                          )
                        }
                        color="primary"
                        size="small"
                      />
                    ) : (
                      <TextField
                        type={getInputType(field.type)}
                        value={record[field.name] || ""}
                        onChange={(e) =>
                          updateRecord(recordIndex, field.name, e.target.value)
                        }
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={!!errors[`${recordIndex}-${field.name}`]}
                        helperText={errors[`${recordIndex}-${field.name}`]}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            fontSize: "0.8rem",
                            height: "32px",
                          },
                          "& .MuiFormHelperText-root": {
                            fontSize: "0.7rem",
                            marginTop: 0.5,
                          },
                        }}
                      />
                    )}
                  </TableCell>
                ))}
                <TableCell
                  sx={{
                    textAlign: "center",
                    py: 0.5,
                    px: 1,
                  }}
                >
                  {records.length > 1 && (
                    <Tooltip title="Remove record">
                      <IconButton
                        onClick={() => removeRecord(recordIndex)}
                        color="error"
                        size="small"
                        sx={{ p: 0.5 }}
                      >
                        ✕
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{ display: "flex", gap: 1.5, justifyContent: "flex-start", mt: 1 }}
      >
        <Button
          variant="contained"
          onClick={addRecord}
          color="primary"
          size="small"
        >
          + Add Record
        </Button>

        <Button type="submit" variant="contained" color="success" size="small">
          Submit All
        </Button>
      </Box>
    </Box>
  );
}
