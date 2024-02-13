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

  addOnFixedPrice({ tokenId, owner, price, transectionHash, orderId }) {
    return db.execute(
      `INSERT INTO fixedPrice SET 
      tokenId=${tokenId}, 
      orderId=${orderId}, 
      owner='${owner}', 
      price=${price}, 
      transactionHash='${transectionHash}'`
    );
  }
  fixedPriceNftTransfer({ transferFrom, transferTo, price, orderId, tokenId }) {
    return db.execute(
      `INSERT INTO transfer SET transferFrom="${transferFrom}", transferTo="${transferTo}", referenceId=${orderId}, tokenId=${tokenId}, transferType="directTransfer", price=${price}`
    );
  }
  upateFixedPriceForTrasfer(tokenId, orderId) {
    return db.execute(
      `UPDATE fixedPrice SET  status=0 WHERE tokenId=${tokenId} AND orderId=${orderId}`
    );
  }

  upateNftForFixedPriceTrasfer(tokenId, transferTo) {
    return db.execute(
      `UPDATE nftt SET ownerWalletAddress ="${transferTo}",isFixed=0 , isSale=0 WHERE tokenId=${tokenId}`
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

  fetchAllNfts() {
    return db.execute(`SELECT n.*, cr.username as creatorUsername, cr.walletAddress as creatorWallet,cr.Image as creatorImage,ow.username as ownerUsername, ow.walletAddress as ownerWallet,ow.Image as ownerImage,bd.username as bidderUsername, bd.walletAddress as bidderWallet, bd.Image as bidderImage,ac.startingPrice, ac.auctionId,ac.heighestBid as highestBid, fp.orderId, fp.price as fixedPirce
    FROM nftt n
    LEFT JOIN fixedprice fp
   ON
   (fp.tokenId = n.tokenId
     AND
     fp.status = 1)
      LEFT JOIN auction ac
     ON
     (
       ac.tokenId = n.tokenId
         AND
         ac.sale =1
     )
   JOIN creatorr cr 
   ON
   (cr.walletAddress = n.creatorWalletAddress)
   JOIN creatorr ow 
   ON
   (ow.walletAddress = n.ownerWalletAddress)
   LEFT JOIN creatorr bd
   ON
   (ac.heighestBidder = bd.walletAddress)
   
     WHERE 
     n.isSale = 1
    `);
  }

  fetchSingleNft(tokenId) {
    return db.execute(`SELECT n.*, cr.username as creatorUsername, cr.walletAddress as creatorWallet,cr.Image as creatorImage,ow.username as ownerUsername, ow.walletAddress as ownerWallet,ow.Image as ownerImage,bd.username as bidderUsername, bd.walletAddress as bidderWallet, bd.Image as bidderImage,ac.startingPrice, ac.auctionId,ac.heighestBid as highestBid, fp.orderId, fp.price as fixedPirce
    FROM nftt n
    LEFT JOIN fixedprice fp
   ON
   (fp.tokenId = n.tokenId)
      LEFT JOIN auction ac
     ON
     (
       ac.tokenId = n.tokenId
     )
   JOIN creatorr cr 
   ON
   (cr.walletAddress = n.creatorWalletAddress)
   JOIN creatorr ow 
   ON
   (ow.walletAddress = n.ownerWalletAddress)
   LEFT JOIN creatorr bd
   ON
   (ac.heighestBidder = bd.walletAddress)
   
     WHERE 
     n.isSale = 1 AND n.tokenId=${tokenId}
    `);
  }
}
module.exports = nft;
