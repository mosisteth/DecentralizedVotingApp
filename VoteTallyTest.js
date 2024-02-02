const { expect } = require('chai');
const { ethers } = require('hardhat');

describe("VoteContract", function () {
  let voteContract;
  let accounts;

  beforeEach(async function () {
    const VoteContract = await ethers.getContractFactory("VoteContract");
    voteContract = await VoteContract.deploy();
    await voteContract.deployed();
    accounts = await ethers.getSigners();
  });

  it("should tally votes correctly", async function () {
    // Cast votes for candidate 1
    await voteContract.connect(accounts[1]).vote(1);
    await voteContract.connect(accounts[2]).vote(1);

    // Verify that candidate 1 received 2 votes
    expect(await voteContract.getVotes(1)).to.equal(2);
  });

  it("should not allow double voting", async function () {
    // Account 1 votes for candidate 1
    await voteContract.connect(accounts[1]).vote(1);

    // Try to vote again
    await expect(voteContract.connect(accounts[1]).vote(1)).to.be.revertedWith("Already voted.");
  });
});
