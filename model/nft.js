const db = require("../config/database");

class nft {
  constructor() {
    this.table = "nftt";
  }

  nftMint(
    { title, description, ownerWalletAddress, token, transectionHash },
    image
  ) {
    return db.execute(
      `INSERT INTO ${this.table} SET title="${title}" , description="${description}" , ownerWalletAddress="${ownerWalletAddress}" , creatorWalletAddress="${ownerWalletAddress}",token="${token}", transectionHash="${transectionHash}", image="${image}"`
    );
  }
  addAuction({
    tokenId,
    owner,
    startingPrice,
    endTime,
    heighestBidder,
    heighestBid,
  }) {
    return db.execute(
      `INSERT INTO auction SET 
      tokenId='${tokenId}', 
      owner='${owner}', 
      startingPrice=${startingPrice}, 
      endTime='${endTime}', 
      heighestBidder='${heighestBidder}', 
      heighestBid=${heighestBid}`
    );
  }
  addOnFixedPrice({ tokenId, owner, price, transectionHash }) {
    return db.execute(
      `INSERT INTO fixedPrice SET 
      tokenId='${tokenId}', 
      owner='${owner}', 
      price=${price}, 
      transectionHash='${transectionHash}'`
    );
  }
}
module.exports = nft;
