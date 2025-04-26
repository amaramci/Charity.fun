import { AnchorProvider, Program, Idl } from "@project-serum/anchor";
import { Connection, PublicKey, SystemProgram } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import idl from "../idl.json"; // Putanja ka tvom IDL-u

const RPC_URL = "https://api.devnet.solana.com"; // ili testnet

export const useTestamentProgram = () => {
  const wallet = useAnchorWallet();
  const connection = new Connection(RPC_URL);

  // Dodajte uslov za wallet pre nego što kreirate provider
  if (!wallet) {
    throw new Error("Wallet is not connected");
  }

  const provider = new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());
  const programId = new PublicKey("35jLfs4yGWVVqAJC3HrABNS8FUrSVEJ7ycKDbxXSXDpt");
  
  const program = new Program(idl as Idl, programId, provider);

  // Dodajte logiku za kreiranje ili učitavanje testamenta
  const testamentAccount = new PublicKey("EY2J81xG625vjkjcX2QZojkijCiWAi8DgDD6ZtbHs1gC"); // Ovo je samo primer, treba da dođe iz prethodnih podataka korisnika ili da se kreira

  return { program, wallet, testamentAccount, provider }; // Vraćamo program, wallet i testamentAccount
};
