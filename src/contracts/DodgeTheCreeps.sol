// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/access/Ownable.sol";

contract DodgeTheCreeps is Ownable {
    struct Record {
        uint32 id;
        uint256 timestamp;
        uint32 score;
    }

    mapping(address => Record[]) private records;
    event RecordCreated(address indexed player, uint32 id, uint256 timestamp, uint32 score);

    constructor() Ownable(msg.sender) {}

    function createRecord(uint32 score) external {
        address player = msg.sender;
        uint32 id = uint32(records[msg.sender].length);
        uint256 timestamp = block.timestamp;

        Record memory newRecord = Record({
            id: id,
            timestamp: timestamp,
            score: score
        });

        records[player].push(newRecord);
        emit RecordCreated(player, id, timestamp, score);
    }

    function getRecords(address player) external view returns (Record[] memory) {
        return records[player];
    }
}
