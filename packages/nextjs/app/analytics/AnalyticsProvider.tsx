"use client";

import React, { FC } from "react";
import { FormoAnalyticsProvider, FormoAnalyticsProviderProps } from "@formo/analytics";

// The provider component
export const AnalyticsProvider: FC<FormoAnalyticsProviderProps> = ({ apiKey, options, children }) => {
  return apiKey ? (
    <FormoAnalyticsProvider apiKey={apiKey} options={options}>
      {children}
    </FormoAnalyticsProvider>
  ) : (
    children
  );
};

export default AnalyticsProvider;
