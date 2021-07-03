// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradleable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradleable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradleable/proxy/utils/UUPSUpgradeable.sol";

contract BrunoMC is ERC20Upgradeable,Initializable, UUPSUpgradeable {
   function initialize() public initializer  {
         __ERC20_init("BrunoMC", "BMC");
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
   function _auhtorizeUpgrade(address newLogicContract) internal override onlyOwner {}
}

contract BrunoMCV02 is BrunoMC {
    function version() public view returns (string memory) {
      return "Version 02";  
    }
    
    //upgradeable logic
}x
