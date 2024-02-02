import Web3 from 'web3';
import ElectionABI from './Election.json';

const web3 = new Web3(Web3.givenProvider); // Assumes MetaMask is used
const electionContractAddress = 'YOUR_CONTRACT_ADDRESS_HERE';
const electionContract = new web3.eth.Contract(ElectionABI.abi, electionContractAddress);

async function castVote(candidateId) {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    try {
        await electionContract.methods.vote(candidateId).send({ from: account });
        alert('Vote successfully cast!');
    } catch (error) {
        console.error('Error casting vote:', error);
        alert('Failed to cast vote. See console for details.');
    }
}

async function getResults() {
    const results = [];
    const candidatesCount = await electionContract.methods.candidatesCount().call();

    for (let i = 1; i <= candidatesCount; i++) {
        const candidate = await electionContract.methods.getCandidate(i).call();
        results.push({ id: candidate.id, name: candidate.name, voteCount: candidate.voteCount });
    }

    return results;
}

// Example usage
document.getElementById('voteButton').addEventListener('click', async function() {
    const candidateId = document.getElementById('candidateSelect').value;
    await castVote(candidateId);
});

document.getElementById('resultsButton').addEventListener('click', async function() {
    const results = await getResults();
    console.log('Election Results:', results);
    // Update the UI with these results
});

export { castVote, getResults };
