// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

contract Pmu {
    string public name = "PMU";
    uint256 public pmuCount = 0;

    struct Horse {
        uint256 id;
        uint256 step;
    }

    string public message;

    constructor(string memory initMessage) {
        message = initMessage;
    }

    // A public function that accepts a string argument and updates the `message` storage variable.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
