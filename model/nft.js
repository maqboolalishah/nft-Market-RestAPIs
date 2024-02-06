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
}
module.exports = nft;
