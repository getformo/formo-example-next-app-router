"use client";

import React, { FC } from "react";
import { FormoAnalyticsProvider, FormoAnalyticsProviderProps } from "@formo/analytics";

// The provider component
export const AnalyticsProvider: FC<FormoAnalyticsProviderProps> = ({ apiKey, children }) => {
  return <FormoAnalyticsProvider apiKey={apiKey}>{children}</FormoAnalyticsProvider>;
};

export default AnalyticsProvider;
