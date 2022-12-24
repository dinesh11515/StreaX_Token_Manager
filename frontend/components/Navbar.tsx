import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar() {
  return (
    <div className="flex flex-row-reverse py-8 justify-between px-40 bg-[#FCFFE7]">
      <ConnectButton />
      <span className="text-2xl font-bold font-poppins">StreaX</span>
    </div>
  );
}
