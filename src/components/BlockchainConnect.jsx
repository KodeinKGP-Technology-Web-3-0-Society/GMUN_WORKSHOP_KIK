import React, { useState } from "react";
import { Wallet, Check, AlertCircle } from "lucide-react";

export default function BlockchainConnect({ onConnected }) {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [networkInfo, setNetworkInfo] = useState(null);

  const connectWallet = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed. Please install MetaMask.");
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setWalletAddress(accounts[0]);

      // Switch to Polygon Mumbai if not already on it
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x13881" }], // Polygon Mumbai
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          // Chain not added, add it
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x13881",
                chainName: "Polygon Mumbai",
                nativeCurrency: {
                  name: "MATIC",
                  symbol: "MATIC",
                  decimals: 18,
                },
                rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
                blockExplorerUrls: ["https://mumbai.polygonscan.com"],
              },
            ],
          });
        }
      }

      onConnected && onConnected(accounts[0]);
    } catch (err) {
      setError(err.message || "Failed to connect wallet");
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setNetworkInfo(null);
    setError(null);
  };

  return (
    <div className="flex items-center gap-4">
      {!walletAddress ? (
        <button
          onClick={connectWallet}
          disabled={isLoading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition"
        >
          <Wallet size={18} />
          {isLoading ? "Connecting..." : "Connect Wallet"}
        </button>
      ) : (
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-green-600">
              <Check size={18} />
              <span className="text-sm font-medium">Wallet Connected</span>
            </div>
            <span className="text-xs text-gray-600">
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </span>
          </div>
          <button
            onClick={disconnectWallet}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Disconnect
          </button>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle size={16} />
          {error}
        </div>
      )}
    </div>
  );
}
