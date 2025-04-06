import { task, types } from "hardhat/config";

task("verify:deployments", "Verify deployments")
  .addParam("contract", "The name of the contract to verify", undefined, types.string, false)
  .setAction(async (taskArgs, hre) => {
    const { deployments, network } = hre;

    const contract = await deployments.get(taskArgs.contract);

    console.log(`Network: ${network.name}`);

    await hre.run("verify:verify", {
      address: contract.address,
      constructorArguments: contract.args,
    });
  });
