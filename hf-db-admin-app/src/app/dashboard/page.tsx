import React from "react";

export default function Dashboard() {
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
            Dashboard
          </h1>
          <p
            style={{
              color: "#4b5563",
              marginBottom: "1.5rem",
            }}
          >
            Welcome to the HF DB Admin Dashboard. This is where you can manage
            your database operations.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "1.5rem",
                borderRadius: "0.5rem",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: "0.5rem",
                }}
              >
                Database Status
              </h3>
              <p style={{ color: "#4b5563" }}>
                Monitor your database health and performance.
              </p>
            </div>

            <div
              style={{
                backgroundColor: "white",
                padding: "1.5rem",
                borderRadius: "0.5rem",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: "0.5rem",
                }}
              >
                User Management
              </h3>
              <p style={{ color: "#4b5563" }}>
                Manage user accounts and permissions.
              </p>
            </div>

            <div
              style={{
                backgroundColor: "white",
                padding: "1.5rem",
                borderRadius: "0.5rem",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: "0.5rem",
                }}
              >
                Analytics
              </h3>
              <p style={{ color: "#4b5563" }}>
                View usage statistics and reports.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
