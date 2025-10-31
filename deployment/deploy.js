require("dotenv").config();

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with account:", deployer.address);

  // Grab the contract factory
  const MyNFT = await ethers.getContractFactory("MyNFT");

  // Start deployment, returning a promise that resolves to a contract object
  const myNFT = await MyNFT.deploy(deployer.address);

  await myNFT.waitForDeployment();

  const contractAddress = await myNFT.getAddress();
  console.log("Contract deployed to address:", contractAddress);
  console.log("\nSave this address to your .env file as CONTRACT_ADDRESS");

  // Wait for a few block confirmations before verifying
  console.log("\nWaiting for block confirmations...");
  await myNFT.deploymentTransaction().wait(5);

  // Verify the contract
  console.log("\nVerifying contract on Etherscan...");
  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: [deployer.address],
    });
    console.log("Contract verified successfully!");
  } catch (error) {
    if (error.message.includes("Already Verified")) {
      console.log("Contract is already verified!");
    } else {
      console.error("Error verifying contract:", error.message);
      console.log("\nYou can verify manually later using:");
      console.log(`CONTRACT_ADDRESS=${contractAddress} npx hardhat verify --network sepolia ${contractAddress} ${deployer.address}`);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
