import { ToastContainer, toast } from "react-toastify";
import { ethers } from "ethers";
import { Address } from "wagmi";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useContract, useSigner, useAccount } from "wagmi";
import { erc20ABI, erc721ABI } from "wagmi";
import { tokenAddress, nftAddress } from "../constants";
export default function Transfer() {
  const [tokenType, setTokenType] = useState("erc20");
  const [loading, setLoading] = useState(false);
  const { address, isConnecting, isDisconnected } = useAccount();

  const { data: signer, isError, isLoading } = useSigner();
  const contract20 = useContract({
    address: tokenAddress,
    abi: erc20ABI,
    signerOrProvider: signer,
  });

  const contract721 = useContract({
    address: nftAddress,
    abi: erc721ABI,
    signerOrProvider: signer,
  });

  const tokenTypeInputHandler = (event: any) => {
    setTokenType(event.target.value);
  };

  const transfer = async () => {
    try {
      setLoading(true);
      const to = (document.getElementById("toAddress") as HTMLInputElement)
        .value;
      if (tokenType === "erc20") {
        const amount = (
          document.getElementById("tokenAmount") as HTMLInputElement
        ).value;
        console.log(amount);
        const tx = await contract20?.transfer(
          to as Address,
          ethers.utils.parseEther(amount)
        );
        await tx?.wait();
        toast.success("Tokens transferred successfully!");
      } else {
        const tokenID = (document.getElementById("tokenID") as HTMLInputElement)
          .value;
        const tx = await contract721?.transferFrom(
          address as Address,
          to as Address,
          ethers.BigNumber.from("" + tokenID)
        );
        await tx?.wait();
        toast.success("NFT transferred successfully!");
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Token type"
            value={tokenType}
            onChange={tokenTypeInputHandler}
          >
            <option value={"erc20"}>ERC20 - StreaXToken</option>
            <option value={"erc721"}>ERC721 - StreaXNFT</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="toAddress"
          >
            Wallet Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="toAddress"
            type="text"
            placeholder="Address"
          ></input>
        </div>
        {tokenType === "erc20" ? (
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="amount"
            >
              Amount
            </label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="tokenAmount"
              type="number"
              placeholder="0"
            />
          </div>
        ) : (
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="tokenID"
            >
              Token ID
            </label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="tokenID"
              type="number"
              placeholder="0"
            />
          </div>
        )}
        <div className="flex flex-col items-center">
          {loading ? (
            <img src="/loading.gif" width={25} height={40} />
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded font:poppins focus:outline-none focus:shadow-outline"
              type="button"
              onClick={transfer}
            >
              Transfer
            </button>
          )}
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
