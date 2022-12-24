import React, { useState } from "react";
import { NFTStorage } from "nft.storage";
import { useContract, useSigner } from "wagmi";
import { abi, contractAddress } from "../constants/index";
import { ToastContainer, toast } from "react-toastify";
import { ethers } from "ethers";
import "react-toastify/dist/ReactToastify.css";

export default function Form() {
  const [tokenType, setTokenType] = useState("erc20");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: signer, isError, isLoading } = useSigner();

  const contract = useContract({
    address: contractAddress,
    abi: abi,
    signerOrProvider: signer,
  });

  const tokenTypeInputHandler = (event: any) => {
    setTokenType(event.target.value);
  };

  const imageInputHandler = async (event: any) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const uploadMetadata = async () => {
    const img = new Blob([image], { type: "image/png" });
    const nft = {
      image: img, // use image Blob as `image` field
      name: (document.getElementById("name") as HTMLInputElement).value,
      description: (
        document.getElementById("description") as HTMLTextAreaElement
      ).value,
    };

    const client = new NFTStorage({
      token: process.env.NEXT_PUBLIC_NFT_STORAGE_KEY || "",
    });
    const metadata = await client.store(nft);

    console.log("NFT data stored!");
    return metadata.url;
  };

  const mint = async () => {
    try {
      setLoading(true);
      const address = (document.getElementById("address") as HTMLInputElement)
        .value;

      if (tokenType === "erc20") {
        const amount = (document.getElementById("amount") as HTMLInputElement)
          .value;
        console.log(amount);
        const tx = await contract?.mintTokens(
          address,
          ethers.utils.parseEther(amount)
        );
        await tx?.wait();
        toast.success("Tokens minted successful");
      } else if (tokenType === "erc721") {
        const metadata = await uploadMetadata();
        const tx = await contract?.mintNFT(address, metadata);
        await tx?.wait();
        toast.success("NFT created successful");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
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
            htmlFor="address"
          >
            Wallet Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
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
              id="amount"
              type="number"
              placeholder="0"
            />
          </div>
        ) : (
          <div>
            <div className="mb-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="name"
              />
            </div>
            <div className="mb-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                placeholder="description"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="file_input"
              >
                Upload file
              </label>
              <input
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
                id="file_input"
                type="file"
                accept=".gif,.jpg,.jpeg,.png,.svg"
                onChange={imageInputHandler}
              />
              <p className="ml-1 text-sm text-gray-700" id="file_input_help">
                SVG, PNG, JPG or GIF
              </p>
            </div>
          </div>
        )}
        <div className="flex flex-col items-center">
          {loading ? (
            <img src="/loading.gif" width={25} height={35} />
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={mint}
            >
              Mint
            </button>
          )}
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
