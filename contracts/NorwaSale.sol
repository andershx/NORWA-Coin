// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title NorwaSale
 * @notice Simple ETH -> NORWA sale. Sends NORWA from this contract to buyer.
 * @dev Price is tokens per 1 ETH, scaled to 18 decimals (e.g., 10000 * 1e18).
 */
contract NorwaSale is Ownable {
    IERC20 public immutable norwa;
    uint256 public tokensPerEth; // e.g., 10000 * 1e18 for 1 ETH = 10,000 NORWA
    bool public paused;

    event Purchased(address indexed buyer, uint256 ethIn, uint256 norwaOut);
    event PriceUpdated(uint256 newTokensPerEth);
    event Paused(bool isPaused);
    event WithdrawnETH(uint256 amount);
    event WithdrawnTokens(uint256 amount);

    constructor(address _norwa, uint256 _tokensPerEth) Ownable(msg.sender) {
        require(_norwa != address(0), "NORWA addr zero");
        require(_tokensPerEth > 0, "price zero");
        norwa = IERC20(_norwa);
        tokensPerEth = _tokensPerEth;
        paused = false;
    }

    receive() external payable {
        _buy(msg.sender, msg.value);
    }

    function buy() external payable {
        _buy(msg.sender, msg.value);
    }

    function _buy(address buyer, uint256 ethAmount) internal {
        require(!paused, "paused");
        require(ethAmount > 0, "no ETH");

        // amount = (ETH * tokensPerEth) / 1e18
        uint256 amountOut = (ethAmount * tokensPerEth) / 1 ether;
        require(norwa.balanceOf(address(this)) >= amountOut, "insufficient NORWA liquidity");

        // transfer NORWA to buyer
        require(norwa.transfer(buyer, amountOut), "transfer failed");

        emit Purchased(buyer, ethAmount, amountOut);
    }

    // --- admin ---
    function setPrice(uint256 _tokensPerEth) external onlyOwner {
        require(_tokensPerEth > 0, "price zero");
        tokensPerEth = _tokensPerEth;
        emit PriceUpdated(_tokensPerEth);
    }

    function setPaused(bool _paused) external onlyOwner {
        paused = _paused;
        emit Paused(_paused);
    }

    function withdrawETH(uint256 amount) external onlyOwner {
        (bool ok, ) = owner().call{value: amount}("");
        require(ok, "withdraw fail");
        emit WithdrawnETH(amount);
    }

    function withdrawAllETH() external onlyOwner {
        uint256 bal = address(this).balance;
        (bool ok, ) = owner().call{value: bal}("");
        require(ok, "withdraw fail");
        emit WithdrawnETH(bal);
    }

    function withdrawTokens(uint256 amount) external onlyOwner {
        require(norwa.transfer(owner(), amount), "withdraw tokens fail");
        emit WithdrawnTokens(amount);
    }
}
