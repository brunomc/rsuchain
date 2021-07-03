// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract BrunoMC is Initializable, ERC20Upgradeable, UUPSUpgradeable, OwnableUpgradeable {
   function initialize() public initializer  {
         __ERC20_init("BrunoMC", "BMC");
         __Ownable_init();
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
    function _authorizeUpgrade(address) internal override onlyOwner {}
}

contract BrunoMCV02 is BrunoMC {
    function getVersion() pure public returns(string memory) {
        return "V02";
    }
}
