require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: { optimizer: { enabled: true, runs: 200 } },
  },
  networks: {
    localhost: { url: "http://127.0.0.1:8545" },
    // Add a testnet (e.g. Sepolia) here for a public demo:
    // sepolia: { url: process.env.SEPOLIA_RPC, accounts: [process.env.PRIVATE_KEY] },
  },
};
