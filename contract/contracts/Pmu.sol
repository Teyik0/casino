// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract Pmu is VRFConsumerBaseV2, ConfirmedOwner {
    event RequestSent(uint256 requestId, uint32 numWords);
    event RequestFulfilled(uint256 requestId, uint256[] randomWords);

    struct RequestStatus {
        bool fulfilled; // whether the request has been successfully fulfilled
        bool exists; // whether a requestId exists
        uint256[] randomWords;
    }
    mapping(uint256 => RequestStatus)
        public s_requests; /* requestId --> requestStatus */
    VRFCoordinatorV2Interface COORDINATOR;

    // Your subscription ID.
    uint64 s_subscriptionId;
    // past requests Id.
    uint256[] public requestIds;
    uint256 public lastRequestId;

    bytes32 keyHash =
        0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c;
    uint32 callbackGasLimit = 100000;
    uint16 requestConfirmations = 3;
    uint32 numWords = 2;

    constructor(
        uint64 subscriptionId
    )
        VRFConsumerBaseV2(0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625)
        ConfirmedOwner(msg.sender)
    {
        COORDINATOR = VRFCoordinatorV2Interface(
            0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625
        );
        s_subscriptionId = subscriptionId;
    }

    // Assumes the subscription is funded sufficiently.
    function requestRandomWords() public onlyOwner returns (uint256 requestId) {
        // Will revert if subscription is not set and funded.
        requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
        s_requests[requestId] = RequestStatus({
            randomWords: new uint256[](0),
            exists: true,
            fulfilled: false
        });
        requestIds.push(requestId);
        lastRequestId = requestId;
        emit RequestSent(requestId, numWords);
        return requestId;
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
        require(s_requests[_requestId].exists, "request not found");
        s_requests[_requestId].fulfilled = true;
        s_requests[_requestId].randomWords = _randomWords;
        emit RequestFulfilled(_requestId, _randomWords);
        //PMU instruction
        winnerHorse = uint8(_randomWords[0] % 4); //Renvoie le cheval gagnant
    }

    function getRequestStatus(
        uint256 _requestId
    ) external view returns (bool fulfilled, uint256[] memory randomWords) {
        require(s_requests[_requestId].exists, "request not found");
        RequestStatus memory request = s_requests[_requestId];
        return (request.fulfilled, request.randomWords);
    }

    //PMU contract
    uint8 public winnerHorse = 0;
    uint256 public prixParticipation = 1000000000000000; // 0,001 ETH en wei
    uint256 public cagnotte = 0;
    uint256 public playersNumber;
    address[] private lastWinners;
    Player[] private players;

    struct Player {
        uint256 id;
        address playerAddress;
        uint256 horse;
    }

    function getPlayers() public view returns (Player[] memory) {
        return players;
    }

    function getWinners() public view returns (address[] memory) {
        return lastWinners;
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function enter(uint256 _horse) public payable {
        require(
            msg.value == prixParticipation,
            "Prix de participation incorrect"
        );
        cagnotte += msg.value;
        players.push(Player(playersNumber, msg.sender, _horse));
        playersNumber++;
    }

    function startHorse(
        uint8 _winnerHorse
    ) public onlyOwner returns (address[] memory) {
        require(playersNumber > 0, "Pas assez de joueurs");

        uint256 winnerCount = 0;
        address[] memory winners;

        for (uint256 i = 0; i < playersNumber; i++) {
            if (players[i].horse == _winnerHorse) {
                winners[winnerCount] = players[i].playerAddress;
                winnerCount++;
            }
        }

        if (winners.length > 0) {
            for (uint256 i = 0; i < winnerCount; i++) {
                payable(winners[i]).transfer(
                    address(this).balance / winnerCount
                );
            }
        }

        //reset complet
        delete players;
        cagnotte = 0;
        playersNumber = 0;
        winnerHorse = 0;

        return winners;
    }
}
