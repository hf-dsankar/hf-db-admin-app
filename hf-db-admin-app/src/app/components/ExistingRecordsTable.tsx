"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
  Button,
  Pagination,
} from "@mui/material";

interface FieldSchema {
  name: string;
  type: "string" | "number" | "email" | "date" | "boolean";
  required?: boolean;
  label?: string;
}

interface ExistingRecordsTableProps {
  schema: FieldSchema[];
  dataSource: string; // URL or path to the data source
}

export default function ExistingRecordsTable({
  schema,
  dataSource,
}: ExistingRecordsTableProps) {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true);
        const response = await fetch(dataSource);
        if (!response.ok) {
          throw new Error("Failed to fetch records");
        }
        const data = await response.json();
        // Sort records in descending order by the first field name
        const firstFieldName = schema[0]?.name;
        const sortedData = firstFieldName
          ? data.sort((a: any, b: any) => {
              const aVal = a[firstFieldName];
              const bVal = b[firstFieldName];
              if (typeof aVal === "string" && typeof bVal === "string") {
                return bVal.localeCompare(aVal);
              }
              return bVal > aVal ? -1 : bVal < aVal ? 1 : 0;
            })
          : data;
        setRecords(sortedData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  const formatValue = (value: any, fieldType: string) => {
    if (fieldType === "boolean") {
      return (
        <Chip
          label={value ? "Yes" : "No"}
          color={value ? "success" : "default"}
          size="small"
          variant="outlined"
        />
      );
    }
    return value?.toString() || "-";
  };

  // Calculate pagination
  const totalPages = Math.ceil(records.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = records.slice(startIndex, endIndex);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography>Loading existing records...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography color="error">Error loading records: {error}</Typography>
        <Button
          variant="outlined"
          onClick={() => window.location.reload()}
          sx={{ mt: 1 }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        Existing Records ({records.length})
      </Typography>

      <TableContainer component={Paper}>
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
            {currentRecords.map((record, index) => (
              <TableRow key={startIndex + index}>
                <TableCell
                  sx={{
                    textAlign: "center",
                    color: "text.secondary",
                    py: 0.5,
                    px: 1,
                  }}
                >
                  {startIndex + index + 1}
                </TableCell>
                {schema.map((field) => (
                  <TableCell
                    key={field.name}
                    sx={{
                      py: 0.5,
                      px: 1,
                    }}
                  >
                    {formatValue(record[field.name], field.type)}
                  </TableCell>
                ))}
                <TableCell
                  sx={{
                    textAlign: "center",
                    py: 0.5,
                    px: 1,
                  }}
                >
                  <Tooltip title="Edit record">
                    <IconButton size="small" color="primary">
                      ✏️
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="small"
          />
        </Box>
      )}
    </Box>
  );
}
