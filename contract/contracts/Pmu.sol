// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@chainlink/contracts/src/v0.8/VRFV2WrapperConsumerBase.sol";

contract Pmu is VRFV2WrapperConsumerBase {
    address constant linkAddress = 0x779877A7B0D9E8603169DdbD7836e478b4624789;
    address constant vrfWrapperAddress =
        0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D;

    constructor() VRFV2WrapperConsumerBase(vrfWrapperAddress, linkAddress) {}

    uint256 public pmuGameCount = 0;

    struct Horse {
        uint256 id;
        uint256 step;
    }

    Horse[] public horses;

    function initialize() private {
        for (uint i = 0; i < 6; i++) {
            horses[i] = Horse(i, 0);
        }
        pmuGameCount++;
    }

    function participate() public {
        uint256 vrfSeed = uint256(keccak256(abi.encodePacked(msg.sender)));
    }

    function goForward(uint _id) public {
        Horse memory _horse = horses[_id];
        _horse.step += 1;
        horses[_id] = _horse;
    }
}
