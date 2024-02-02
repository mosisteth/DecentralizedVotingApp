// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VoteContract {
    mapping(address => bool) hasVoted;
    mapping(uint => uint) public votesReceived;

    event VoteReceived(address voter, uint candidateId);

    function vote(uint candidateId) public {
        require(!hasVoted[msg.sender], "Already voted.");
        votesReceived[candidateId] += 1;
        hasVoted[msg.sender] = true;
        emit VoteReceived(msg.sender, candidateId);
    }

    function getVotes(uint candidateId) public view returns (uint) {
        return votesReceived[candidateId];
    }
}
