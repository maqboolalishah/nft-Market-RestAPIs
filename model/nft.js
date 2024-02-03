const db = require("../config/database");

class nft {
  constructor() {
    this.table = "nftt";
  }

  nftMint(
    title,
    image,
    description,
    ownerWalletAddress,
    creatorWalletAddress,
    token,
    transectionHash
  ) {
    return db.execute(
      `INSERT INTO ${this.table} SET title="${title}" , description="${description}" , ownerWalletAddress="${ownerWalletAddress}" , creatorWalletAddress="${creatorWalletAddress}",token="${token}", transectionHash="${transectionHash}"`
    );
  }
}
