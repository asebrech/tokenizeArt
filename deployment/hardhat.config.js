require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
const path = require("path");
const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: "sepolia",
  paths: {
    sources: path.resolve(__dirname, "../code"),
    artifacts: path.resolve(__dirname, "./artifacts"),
    cache: path.resolve(__dirname, "./cache"),
    root: path.resolve(__dirname, ".."),
  },
  networks: {
    hardhat: {},
    sepolia: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};
