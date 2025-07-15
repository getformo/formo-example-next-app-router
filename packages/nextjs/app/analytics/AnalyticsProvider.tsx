"use client";

import React, { FC } from "react";
import { FormoAnalyticsProvider, FormoAnalyticsProviderProps } from "@formo/analytics";

// The provider component that only runs on the client side
export const AnalyticsProvider: FC<FormoAnalyticsProviderProps> = props => {
  return <FormoAnalyticsProvider {...props} />;
};

export default AnalyticsProvider;
