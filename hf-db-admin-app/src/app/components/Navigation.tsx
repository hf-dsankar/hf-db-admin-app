"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface NavigationItem {
  label: string;
  path: string;
}

const navigationItems: NavigationItem[] = [
  { label: "Home", path: "/" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Brands", path: "/brands" },
  { label: "Vendors", path: "/vendors" },
];

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const currentPage =
    navigationItems.find((item) => item.path === pathname) ||
    navigationItems[0];

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  return (
    <nav
      style={{
        backgroundColor: "var(--color-primary)",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          maxWidth: "80rem",
          margin: "0 auto",
          padding: "0 1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "4rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ flexShrink: 0 }}>
              <h1
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "white",
                }}
              >
                HF DB Admin
              </h1>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "0.5rem 1rem",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.375rem",
                  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.1)";
                }}
                aria-haspopup="true"
                aria-expanded={isOpen}
              >
                <span>{currentPage.label}</span>
                <svg
                  style={{
                    marginLeft: "0.5rem",
                    marginRight: "-0.25rem",
                    height: "1.25rem",
                    width: "1.25rem",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {isOpen && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    zIndex: 10,
                    marginTop: "0.5rem",
                    width: "14rem",
                    backgroundColor: "white",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "0.375rem",
                    boxShadow:
                      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <div
                    style={{ padding: "0.25rem 0" }}
                    role="menu"
                    aria-orientation="vertical"
                  >
                    {navigationItems.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => handleNavigation(item.path)}
                        style={{
                          display: "block",
                          width: "100%",
                          textAlign: "left",
                          padding: "0.5rem 1rem",
                          fontSize: "0.875rem",
                          backgroundColor:
                            pathname === item.path
                              ? "var(--color-primary)"
                              : "transparent",
                          color: pathname === item.path ? "white" : "#374151",
                          fontWeight: pathname === item.path ? "500" : "normal",
                          cursor: "pointer",
                          border: "none",
                          transition: "background-color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          if (pathname !== item.path) {
                            e.currentTarget.style.backgroundColor = "#f3f4f6";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (pathname !== item.path) {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                          }
                        }}
                        role="menuitem"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
