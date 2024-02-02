<template>
    <div>
        <h2>Election Results</h2>
        <ul>
            <li v-for="candidate in candidates" :key="candidate.id">
                {{ candidate.name }}: {{ candidate.voteCount }} votes
            </li>
        </ul>
    </div>
</template>

<script>
import ElectionABI from '../abis/ElectionManager.json';
import Web3 from 'web3';

export default {
    data() {
        return {
            candidates: [],
            contract: null
        };
    },
    methods: {
        async fetchResults() {
            const web3 = new Web3(Web3.givenProvider);
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = ElectionABI.networks[networkId];
            this.contract = new web3.eth.Contract(
                ElectionABI.abi,
                deployedNetwork && deployedNetwork.address,
            );

            const candidatesCount = await this.contract.methods.candidatesCount().call();
            for (let i = 1; i <= candidatesCount; i++) {
                const candidate = await this.contract.methods.candidates(i).call();
                this.candidates.push({
                    id: candidate.id,
                    name: candidate.name,
                    voteCount: candidate.voteCount
                });
            }
        }
    },
    mounted() {
        this.fetchResults();
    }
}
</script>

<style scoped>
ul {
    list-style-type: none;
    padding: 0;
}
li {
    margin: 10px 0;
}
</style>
