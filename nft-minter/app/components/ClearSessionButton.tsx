"use client";

import { useDisconnect } from "wagmi";

export function ClearSessionButton() {
  const { disconnect } = useDisconnect();

  const handleClear = () => {
    // Disconnect wallet
    disconnect();

    // Clear WalletConnect sessions from localStorage
    if (typeof window !== "undefined") {
      try {
        const wcKeys = Object.keys(localStorage).filter(
          (key) => key.startsWith("wc@2") || key.startsWith("wagmi")
        );
        wcKeys.forEach((key) => localStorage.removeItem(key));
        console.log("Cleared WalletConnect sessions");

        // Reload page
        window.location.reload();
      } catch (error) {
        console.error("Error clearing sessions:", error);
      }
    }
  };

  return (
    <button
      onClick={handleClear}
      className="text-sm text-gray-500 hover:text-red-600 underline"
    >
      Clear WalletConnect Sessions
    </button>
  );
}
