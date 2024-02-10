const db = require("../config/database");

class nft {
  constructor() {
    this.table = "nftt";
  }

  nftMint(
    { title, description, ownerWalletAddress, tokenId, transectionHash },
    image
  ) {
    return db.execute(
      `INSERT INTO ${this.table} SET title="${title}" , description="${description}" , ownerWalletAddress="${ownerWalletAddress}" , creatorWalletAddress="${ownerWalletAddress}",tokenId=${tokenId}, transectionHash="${transectionHash}", image="${image}"`
    );
  }
  addAuction({ tokenId, auctionId, owner, startingPrice, endTime }) {
    return db.execute(
      `INSERT INTO auction SET 
      tokenId=${tokenId},
      auctionId= ${auctionId}, 
      owner='${owner}', 
      startingPrice=${startingPrice}, 
      endTime='${endTime}'`
    );
  }
  addOnFixedPrice({ tokenId, owner, price, transectionHash }) {
    return db.execute(
      `INSERT INTO fixedPrice SET 
      tokenId=${tokenId}, 
      owner='${owner}', 
      price=${price}, 
      transectionHash='${transectionHash}'`
    );
  }
  updatenft(tokenId) {
    return db.execute(
      `UPDATE nftt SET isAuction=1, isSale=1 WHERE tokenId=${tokenId}`
    );
  }
  bidding({ auctionId, bidderAddress, price }) {
    return db.execute(
      `INSERT INTO bidding SET auctionId=${auctionId}, bidderAddress="${bidderAddress}", price=${price}`
    );
  }
  updateAuction(bidderAddress, price) {
    return db.execute(
      `UPDATE auction SET heighestBidder="${bidderAddress}",heighestBid=${price}`
    );
  }

  auctionTransfer({ transferFrom, transferTo, price, auctionId, tokenId }) {
    return db.execute(
      `INSERT INTO transfer SET transferFrom="${transferFrom}", transferTo="${transferTo}", referenceId=${auctionId}, tokenId=${tokenId}, transferType="auctionWon", price=${price}`
    );
  }

  upateNftForAuctionTrasfer(tokenId, transferTo) {
    return db.execute(
      `UPDATE nftt SET ownerWalletAddress ="${transferTo}",isAuction=0 , isSale=0 WHERE tokenId=${tokenId}`
    );
  }

  upateAuctionForTrasfer(tokenId, auctionId) {
    return db.execute(
      `UPDATE auction SET  sale=0 WHERE tokenId=${tokenId} AND auctionId=${auctionId}`
    );
  }
}
module.exports = nft;
