// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

contract DxIotOperation {
    uint256 public totalOperations;
    uint256 public totalTags;
    uint256 public totalTransfers;
    uint256 public totalLogs;
    mapping(string => Tag) public tags;
    mapping(string => Transfer) public transfers;
    mapping(string => Log) public logs;
    address owner;
    constructor() {
       owner = msg.sender;
       totalOperations = 0;
       totalTags = 0;
       totalLogs = 0;
    }

    struct Tag {
        string id;
        string rawData;
        string remoteHash;
        uint256 instantTime;
        address createdBy;
    }
    struct Log {
        string Id;
        string rawData;
        uint256 instantTime;
        address createdBy;
    }
    struct Transfer {
        string id;
        string from;
        string to;
        string remoteHash;
        uint256 instantTime;
        address createdBy;
    }
     event eventCreateLog(
        string Id,
        string rawData,
        uint256 instantTime,
        address createdBy
    );
    event eventCreateTag(
        string Id,
        string rawData,
        string remoteHash,
        uint256 instantTime,
        address createdBy
    );
     event eventCreateTransfer(
        string Id,
        string from,
        string to,
        string remoteHash,
        uint256 instantTime,
        address createdBy
    );
    
     function createLog(
        string memory _id,
        string memory _rawData
    ) public {
        require(msg.sender == owner);
        require(bytes(_id).length > 0);

        totalOperations++;
        totalLogs++;

        logs[_id] = Log(
            _id,
            _rawData,
            block.timestamp,
            msg.sender
        );

        emit eventCreateLog (
             _id,
            _rawData,
            block.timestamp,
            msg.sender
        );
    }

    function createTag(
        string memory _id,
        string memory _rawData,
        string memory _remoteHash
    ) public {
       
        require(msg.sender == owner);
        require(bytes(_id).length > 0);
        require(bytes(_rawData).length > 0);
        require(bytes(_remoteHash).length > 0);
        require(bytes(tags[_id].id).length == 0);
        totalOperations++;
        totalTags++;

        tags[_id] = Tag(
            _id,
            _rawData,
            _remoteHash,
            block.timestamp,
            msg.sender
        );

        emit eventCreateTag (
             _id,
            _rawData,
            _remoteHash,
            block.timestamp,
            msg.sender
        );
    }
    function createTransfer(
        string memory _id,
        string memory _from,
        string memory _to,
        string memory _remoteHash
    ) public {
        require(msg.sender == owner);
        require(bytes(_id).length > 0);
        require(bytes(_from).length > 0);
        require(bytes(_to).length > 0);
        require(bytes(transfers[_id].id).length == 0);

        totalOperations++;
        totalTransfers++;

        transfers[_id] = Transfer(
             _id,
            _from,
            _to,
             _remoteHash,
            block.timestamp,
            msg.sender
        );

        emit eventCreateTransfer (
            _id,
            _from,
            _to,
             _remoteHash,
            block.timestamp,
            msg.sender
        );
    }

}
