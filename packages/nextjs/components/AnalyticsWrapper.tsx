"use client";

import React from "react";
import { AnalyticsProvider } from "~~/app/analytics";

const API_KEY = "YOUR_API_KEY";
const PROJECT_ID = "YOUR_PROJECT_ID";

export const AnalyticsWrapper = ({ children }: { children: React.ReactNode }) => {
  // Only render AnalyticsProvider if both apiKey and projectId are provided
  if (!API_KEY || !PROJECT_ID) {
    console.error("API key or Project ID is missing");
    return null;
  }

  return (
    <AnalyticsProvider apiKey={API_KEY} projectId={PROJECT_ID}>
      {children}
    </AnalyticsProvider>
  );
};
