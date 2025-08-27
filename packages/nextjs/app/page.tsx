"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useFormo } from "@formo/analytics";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { SignMessage } from "~~/components/SignMessage";
import { SignTypedData } from "~~/components/SignTypedData";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = (): JSX.Element => {
  const { address } = useAccount();
  const analytics = useFormo();

  useEffect(() => {
    if (address && analytics) {
      analytics.identify({ address });
    }
  }, [address, analytics]);

  const [isValidJson, setIsValidJson] = useState(true);
  const [trackResult, setTrackResult] = useState<string | null>(null);
  const [trackError, setTrackError] = useState<string | null>(null);

  const validateJsonPayload = (payload: string): object | null => {
    try {
      const parsedPayload = JSON.parse(payload);
      setIsValidJson(true);
      return parsedPayload;
    } catch (e) {
      setIsValidJson(false);
      return null;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTrackResult(null);
    setTrackError(null);

    const formData = new FormData(event.target as HTMLFormElement);
    const eventName = formData.get("eventName") as string;
    const properties = formData.get("eventProperties") as string;

    if (eventName && properties && analytics) {
      try {
        if (validateJsonPayload(properties)) {
          analytics.track(eventName, JSON.parse(properties));
          setTrackResult(`Event "${eventName}" tracked`);
        } else {
          setTrackError("Invalid JSON payload");
        }
      } catch (err: any) {
        setTrackError(err.message || "Error tracking event");
      }
    }
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
          </h1>
          <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={address} />
          </div>

          <p className="text-center text-lg mt-8">
            Get started by editing{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/nextjs/app/page.tsx
            </code>
          </p>
          <p className="text-center text-lg">
            Edit your smart contract{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              YourContract.sol
            </code>{" "}
            in{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/hardhat/contracts
            </code>
          </p>
        </div>

        <div className="w-7/12">
          <SignMessage />
        </div>

        <div className="w-7/12 mt-12">
          <SignTypedData />
        </div>

        <div className="w-7/12 mt-12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="eventName" className="font-medium">
                Enter custom event name and payload
              </label>
              <input
                id="eventName"
                name="eventName"
                type="text"
                placeholder="button_clicked"
                defaultValue="button_clicked"
                className="w-full p-2 border rounded-md"
                required
              />
              <textarea
                id="eventProperties"
                name="eventProperties"
                placeholder='{"type": "track", "event": "Event Name", "properties": {}}'
                defaultValue='{"pool": "LINK/ETH", "revenue": "20.5", "currency": "USD", "points": "150.52"}'
                className={`w-full p-2 border rounded-md ${!isValidJson ? "border-red-500" : ""}`}
                onChange={e => validateJsonPayload(e.target.value)}
                required
              />
              {!isValidJson && <p className="text-sm text-red-500 mt-1">Invalid JSON format</p>}
            </div>

            <button
              type="submit"
              disabled={!isValidJson}
              className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              Track Custom Event
            </button>

            {trackResult && (
              <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md break-all">{trackResult}</div>
            )}

            {trackError && <div className="p-4 mt-4 text-red-700 bg-red-100 rounded-md">{trackError}</div>}
          </form>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contracts
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
