// IPFS Service for file storage
// Using Pinata as IPFS provider (has free tier)

const PINATA_API_KEY = import.meta.env.VITE_PINATA_API_KEY || "";
const PINATA_SECRET_KEY = import.meta.env.VITE_PINATA_SECRET_KEY || "";

class IPFSService {
  constructor() {
    this.pinataUrl = "https://api.pinata.cloud";
  }

  // Upload file to IPFS via Pinata
  async uploadFile(file) {
    try {
      if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
        throw new Error(
          "Pinata API keys not configured. Add VITE_PINATA_API_KEY and VITE_PINATA_SECRET_KEY to .env"
        );
      }

      const formData = new FormData();
      formData.append("file", file);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      const response = await fetch(
        `${this.pinataUrl}/pinning/pinFileToIPFS`,
        {
          method: "POST",
          headers: {
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_KEY,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`IPFS upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        hash: data.IpfsHash,
        url: `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`,
      };
    } catch (error) {
      console.error("IPFS upload error:", error);
      throw error;
    }
  }

  // Upload JSON data to IPFS
  async uploadJSON(jsonData) {
    try {
      if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
        throw new Error("Pinata API keys not configured");
      }

      const options = JSON.stringify({
        cidVersion: 0,
      });

      const body = JSON.stringify({
        pinataContent: jsonData,
        pinataOptions: options,
      });

      const response = await fetch(
        `${this.pinataUrl}/pinning/pinJSONToIPFS`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_KEY,
          },
          body: body,
        }
      );

      if (!response.ok) {
        throw new Error(`IPFS upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        hash: data.IpfsHash,
        url: `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`,
      };
    } catch (error) {
      console.error("IPFS upload error:", error);
      throw error;
    }
  }

  // Get file from IPFS
  async getFile(ipfsHash) {
    try {
      const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to retrieve file from IPFS");
      }

      return await response.blob();
    } catch (error) {
      console.error("IPFS retrieval error:", error);
      throw error;
    }
  }

  // Get JSON from IPFS
  async getJSON(ipfsHash) {
    try {
      const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to retrieve JSON from IPFS");
      }

      return await response.json();
    } catch (error) {
      console.error("IPFS retrieval error:", error);
      throw error;
    }
  }
}

export default new IPFSService();
