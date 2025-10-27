"use client";

import React, { useState } from "react";
import RecordForm from "../components/RecordForm";
import LoadingScreen from "../components/LoadingScreen";
import ToastNotification, { useToast } from "../components/ToastNotification";
import ConfirmationDialog from "../components/ConfirmationDialog";
import ExistingRecordsTable from "../components/ExistingRecordsTable";

const brandsSchema = [
  {
    name: "Vendor",
    type: "string" as const,
    required: true,
    label: "Vendor",
  },
  {
    name: "ActiveVendor",
    type: "boolean" as const,
    required: false,
    label: "Active Vendor",
  },
  {
    name: "Vendor_ID",
    type: "number" as const,
    required: true,
    label: "Vendor ID",
  },
];

export default function Vendors() {
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

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // TODO: Replace with actual API call
      // const response = await fetch('/api/brands', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(pendingRecords)
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to submit brands');
      // }

      // Simulate success/failure for demo
      const isSuccess = Math.random() > 0.3; // 70% success rate for demo

      if (isSuccess) {
        showSuccess(
          `Successfully submitted ${pendingRecords.length} brand record(s)!`
        );
      } else {
        throw new Error("Simulated submission failure");
      }
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
            Vendors
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
