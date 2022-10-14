const { getNamedAccounts, deployments, ethers } = require("hardhat")

describe("Voting", () => {
  let deployer
  let voting
  const sendValue = ethers.utils.parseEther("1")
  console.log("sendValue", sendValue)
  beforeEach(async () => {
    deployer = (await getNamedAccounts()).deployer
    const { deploy } = deployments
  })
  it("voting constructer", async () => {
    await deployments.fixture("all")
    const voting = await ethers.getContract("Voting", deployer)
  })
})
