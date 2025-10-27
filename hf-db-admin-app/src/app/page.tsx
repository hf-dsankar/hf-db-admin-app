export default function Home() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "1.5rem 0" }}>
        <div style={{ padding: "0 1rem" }}>
          <div style={{ textAlign: "center" }}>
            <h1
              style={{
                fontSize: "2.25rem",
                fontWeight: "bold",
                color: "var(--color-primary)",
                marginBottom: "1rem",
              }}
            >
              Welcome to HF DB Admin
            </h1>
            <p
              style={{
                fontSize: "1.25rem",
                color: "#4b5563",
                marginBottom: "2rem",
              }}
            >
              Your comprehensive database administration platform
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "1.5rem",
                marginTop: "3rem",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  padding: "2rem",
                  borderRadius: "0.5rem",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      margin: "0 auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "3rem",
                      width: "3rem",
                      borderRadius: "0.375rem",
                      backgroundColor: "#6366f1",
                      color: "white",
                      marginBottom: "1rem",
                    }}
                  >
                    <svg
                      style={{ height: "1.5rem", width: "1.5rem" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h3
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Database Management
                  </h3>
                  <p style={{ color: "#4b5563" }}>
                    Efficiently manage your database operations with our
                    intuitive interface.
                  </p>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "white",
                  padding: "2rem",
                  borderRadius: "0.5rem",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      margin: "0 auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "3rem",
                      width: "3rem",
                      borderRadius: "0.375rem",
                      backgroundColor: "#10b981",
                      color: "white",
                      marginBottom: "1rem",
                    }}
                  >
                    <svg
                      style={{ height: "1.5rem", width: "1.5rem" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                      />
                    </svg>
                  </div>
                  <h3
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "0.5rem",
                    }}
                  >
                    User Administration
                  </h3>
                  <p style={{ color: "#4b5563" }}>
                    Control user access and permissions with granular security
                    settings.
                  </p>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "white",
                  padding: "2rem",
                  borderRadius: "0.5rem",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      margin: "0 auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "3rem",
                      width: "3rem",
                      borderRadius: "0.375rem",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      marginBottom: "1rem",
                    }}
                  >
                    <svg
                      style={{ height: "1.5rem", width: "1.5rem" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h3
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Analytics & Reports
                  </h3>
                  <p style={{ color: "#4b5563" }}>
                    Get insights into your database performance with detailed
                    analytics.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "3rem" }}>
              <p style={{ color: "#6b7280" }}>
                Use the navigation dropdown above to access different sections
                of the admin panel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
