// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title NORWA Coin (ERC-20)
 * @notice 1,000,000,000 NORWA minted to deployer on Ethereum.
 */
contract NORWA is ERC20, Ownable {
    constructor() ERC20("NORWA Coin", "NORWA") Ownable(msg.sender) {
        _mint(msg.sender, 1_000_000_000 * 10 ** decimals());
    }
}
