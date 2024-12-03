"use client";

import React, { FC } from "react";
import { FormoAnalyticsProvider } from "@formo/analytics";

type FormoAnalyticsProviderProps = {
  apiKey: string;
  projectId: string;
  children: React.ReactNode;
};

// The provider component
export const AnalyticsProvider: FC<FormoAnalyticsProviderProps> = ({ apiKey, projectId, children }) => {
  return (
    <FormoAnalyticsProvider apiKey={apiKey} projectId={projectId}>
      {children}
    </FormoAnalyticsProvider>
  );
};

export default AnalyticsProvider;
