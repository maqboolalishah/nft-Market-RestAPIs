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
}
module.exports = nft;
