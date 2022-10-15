const { network, ethers } = require("hardhat")

module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()

  const args = []
  args.push(["Yashwant", "Sakshi"])
  const rewardValue = await ethers.utils.parseEther(".1")
  console.log("chainid", network.config.chainId)
  const voting = await deploy("Voting", {
    from: deployer,
    args: args,
    log: true,
    value: rewardValue,
    waitConfirmations: network.config.blockConfirmations || 1,
  })
}
module.exports.tags = ["all"]
