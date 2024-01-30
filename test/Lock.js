const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("NFTMarket", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.

  it("Should create and execute market sales", async function(){
    const Market=await ethers.getContractFactory("NFTMarket")
    const market=await Market.deploy()
    await market.deployed()
    const marketAddress=market.address;

    const NFT=await ethers.gerContractFactory("NFT")
    const nft=await NFT.deploy(marketAddress)
    await nft.deployed()
    const nftContractAddress=nft.address;

    let listingPrice=await market.getListingPrice()
    listingPrice=listingPrice.toString()

    const auctionPrice=ethers.utils.parseUnits('100','ether');

    await nft.createToken("https://www.mytokenlocation.com")
    await nft.createToken("https://www.mytokenlocation2.com")

    await market.createMarketItem(nftContractAddress,1,auctionPrice,{value: listingPrice});
    await market.createMarketItem(nftContractAddress,2,auctionPrice,{value: listingPrice});
    
    const[_, buyerAddress]=await ethers.getSigners();
    await market.connect(buyerAddress).createMarketSale(nftContractAddress,1,{value:auctionPrice});

    const items=await market.fetchMarketItems()

    console.log('items: ',items);

  });
})
