require("dotenv").config();

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with account:", deployer.address);

  // Grab the contract factory
  const UNSC42 = await ethers.getContractFactory("UNSC42");

  // Start deployment, returning a promise that resolves to a contract object
  const unsc42 = await UNSC42.deploy(deployer.address);

  await unsc42.waitForDeployment();

  const contractAddress = await unsc42.getAddress();
  console.log("\nContract deployed to address:", contractAddress);

  // Wait for a few block confirmations before verifying
  console.log("\nWaiting for block confirmations...");
  await unsc42.deploymentTransaction().wait(5);

  // Verify the contract
  console.log("\nVerifying contract on Etherscan...");
  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: [deployer.address],
    });
    console.log("Contract verified successfully!");
  } catch (error) {
    console.error("Error verifying contract:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
