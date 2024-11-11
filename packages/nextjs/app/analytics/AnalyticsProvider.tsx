"use client";

import React, { FC, useEffect, useState } from "react";
import { FormoAnalytics, FormoAnalyticsProvider } from "@formo/analytics";

type FormoAnalyticsProviderProps = {
  apiKey: string;
  projectId: string;
  children: React.ReactNode;
};

// The provider component
export const AnalyticsProvider: FC<FormoAnalyticsProviderProps> = ({ apiKey, projectId, children }) => {
  // Initialize the FormoAnalytics SDK inside useEffect
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        await FormoAnalytics.init(apiKey, projectId);
        console.log("FormoAnalytics SDK initialized");
        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to initialize FormoAnalytics SDK", error);
      }
    };

    initialize();
  }, [apiKey, projectId]);

  if (!isInitialized) {
    return (
      <FormoAnalyticsProvider apiKey={apiKey} projectId={projectId}>
        {null}
      </FormoAnalyticsProvider>
    );
  }

  return (
    <FormoAnalyticsProvider apiKey={apiKey} projectId={projectId}>
      {children}
    </FormoAnalyticsProvider>
  );
};

export default AnalyticsProvider;
