"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useDeployedContractInfo, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export const TestMultiEventTx = () => {
  const { address: connectedAddress } = useAccount();
  const [greetingInput, setGreetingInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data: deployedContractData } = useDeployedContractInfo("YourContract");

  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("YourContract");

  const handleTestMultiEvent = async () => {
    if (!writeYourContractAsync) return;

    try {
      setIsLoading(true);
      await writeYourContractAsync({
        functionName: "testMultiEventTx",
        args: [greetingInput || "Hello from multi-event test!"],
        value: BigInt("0"),
      });
    } catch (error) {
      console.error("Error calling testMultiEventTx:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!deployedContractData) {
    return null;
  }

  return (
    <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-md rounded-3xl">
      <div className="flex flex-col gap-4 w-full">
        <h3 className="text-xl font-bold">Test Multi-Event Transaction</h3>
        <p className="text-sm text-gray-600">Test emitting multiple events in a single transaction</p>

        <input
          type="text"
          placeholder="Enter greeting message"
          className="input input-bordered input-primary w-full"
          value={greetingInput}
          onChange={e => setGreetingInput(e.target.value)}
        />

        <button className="btn btn-primary" onClick={handleTestMultiEvent} disabled={!connectedAddress || isLoading}>
          {isLoading && <span className="loading loading-spinner loading-sm"></span>}
          {isLoading ? "Testing..." : "Test Multi-Event Tx 🎉"}
        </button>

        {!connectedAddress && <p className="text-sm text-orange-600">Connect your wallet to test</p>}
      </div>
    </div>
  );
};
