const Web3 = require('web3');
const voteContractABI = require('./abis/VoteContract.json');

const web3 = new Web3('YOUR_BLOCKCHAIN_NODE_URL');
const voteContractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract's address
const voteContract = new web3.eth.Contract(voteContractABI, voteContractAddress);

async function castVote(candidateId, voterAddress) {
    const voteTx = voteContract.methods.vote(candidateId);
    // Send transaction using the voter's address
    // Add logic for signing and sending the transaction
}

async function getVoteCount(candidateId) {
    const votes = await voteContract.methods.getVotes(candidateId).call();
    return votes;
}

module.exports = { castVote, getVoteCount };
