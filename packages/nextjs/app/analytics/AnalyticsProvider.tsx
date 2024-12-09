"use client";

import React, { FC } from "react";
import { FormoAnalyticsProvider, Options } from "@formo/analytics";

type FormoAnalyticsProviderProps = {
  apiKey: string;
  options: Options;
  children: React.ReactNode;
};

// The provider component
export const AnalyticsProvider: FC<FormoAnalyticsProviderProps> = ({ apiKey, options, children }) => {
  return (
    <FormoAnalyticsProvider apiKey={apiKey} options={options}>
      {children}
    </FormoAnalyticsProvider>
  );
};

export default AnalyticsProvider;
