# StreaX_Token_Manager
## Testing

### Frontend :

You can directly go to [webiste](https://strea-x-token-manager.vercel.app/) and connect your wallet and start minting tokens it have two options ERC20 and ERC721.In ERC20 you can enter a wallet Address and amount of tokens and start minting the tokens to that wallet. In ERC721 you can mint a NFT by entering a Name,description ,Image and the wallet address and can mint a nft to that wallet.On top of that it have transfer section in which you can transfer tokens or a NFT from your wallet to a some other wallet.

Running in Localhost:

```
cd frontend
yarn 
yarn dev
```

### Contracts :

There are four contracts( StreaXManagerWithoutOwner,StreaXManager,StreaXToken,StreaXNFT) and Created this contracts by using Hardhat. StreaXManagerWithoutOwner and StreaXManager are basically same but StreaXManager have inbuilt ownership functions so that owner can only mint the tokens so i have created StreaXManagerWithoutOwner so that it becomes easy for you to test without deploying the contracts again.
StreaXToken was ERC20 Token contract for token and StreaXNFT was a ERC721 token contract for NFT's.
* added the tests script(hardhat/test/StreaXManager.ts) in it. You can directly test this in hardhat by running the below lines in terminal
```
cd hardhat
npx hardhat test
```



