"use client";

import React, { useState } from "react";
import RecordForm from "../components/RecordForm";
import LoadingScreen from "../components/LoadingScreen";
import ToastNotification, { useToast } from "../components/ToastNotification";
import ConfirmationDialog from "../components/ConfirmationDialog";
import ExistingRecordsTable from "../components/ExistingRecordsTable";

const brandsSchema = [
  {
    name: "Brand",
    type: "string" as const,
    required: true,
    label: "Brand",
  },
  {
    name: "ActiveBrand",
    type: "boolean" as const,
    required: false,
    label: "Active Brand",
  },
  {
    name: "Analytics",
    type: "boolean" as const,
    required: false,
    label: "Analytics",
  },
  {
    name: "WFM_Name",
    type: "string" as const,
    required: false,
    label: "WFM Name",
  },
  {
    name: "Vendor_ID",
    type: "number" as const,
    required: true,
    label: "Vendor ID",
  },
  {
    name: "Key_Account",
    type: "boolean" as const,
    required: false,
    label: "Key Account",
  },
  {
    name: "Category_Review",
    type: "boolean" as const,
    required: false,
    label: "Category Review",
  },
  {
    name: "Natural",
    type: "boolean" as const,
    required: false,
    label: "Natural",
  },
];

export default function Brands() {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingRecords, setPendingRecords] = useState<any[]>([]);
  const { toast, hideToast, showSuccess, showError } = useToast();

  const handleSubmit = (records: any[]) => {
    setPendingRecords(records);
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmation(false);
    setIsLoading(true);

    try {
      console.log("Submitting brands:", pendingRecords);

      // Call Azure Functions endpoint
      const response = await fetch(
        "https://functions-db-admin-app-f9fseqbzdmakhxeb.centralus-01.azurewebsites.net/api/brands",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pendingRecords),
        }
      );

      if (!response.ok) {
        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);

        let errorMessage = "Failed to submit brands";
        try {
          // Get text first, then try to parse as JSON
          const textResponse = await response.text();
          console.log("Response text:", textResponse);

          try {
            const errorData = JSON.parse(textResponse);
            errorMessage = errorData.message || errorData.error || errorMessage;
          } catch (parseError) {
            // Not JSON, use the text as error message
            errorMessage =
              textResponse || `HTTP ${response.status}: ${response.statusText}`;
          }
        } catch (textError) {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      showSuccess(
        result.message ||
          `Successfully submitted ${pendingRecords.length} brand record(s)!`
      );
    } catch (error) {
      console.error("Error submitting brands:", error);
      showError("Failed to submit brands. Please try again.");
    } finally {
      setIsLoading(false);
      setPendingRecords([]);
    }
  };

  const handleCancelSubmit = () => {
    setShowConfirmation(false);
    setPendingRecords([]);
  };
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "1.5rem 0" }}>
        <div style={{ padding: "0 1rem" }}>
          <h1
            style={{
              fontSize: "1.875rem",
              fontWeight: "bold",
              color: "var(--color-primary)",
              marginBottom: "1rem",
            }}
          >
            Brands
          </h1>

          <RecordForm schema={brandsSchema} onSubmit={handleSubmit} />

          <ExistingRecordsTable
            schema={brandsSchema}
            dataSource="/test-brands.json"
          />
        </div>
      </div>

      {isLoading && <LoadingScreen message="Submitting brands..." />}

      <ConfirmationDialog
        open={showConfirmation}
        title="Confirm Brand Submission"
        message="Are you sure you want to submit these brand records? This action cannot be undone."
        confirmText="Submit"
        cancelText="Cancel"
        onConfirm={handleConfirmSubmit}
        onCancel={handleCancelSubmit}
        recordCount={pendingRecords.length}
      />

      <ToastNotification
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={hideToast}
      />
    </div>
  );
}
