import { AnalyticsProvider } from "./analytics";
import "@rainbow-me/rainbowkit/styles.css";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Scaffold-ETH 2 App",
  description: "Built with 🏗 Scaffold-ETH 2",
});

const API_KEY = "YOUR_API_KEY";
const PROJECT_ID = "YOUR_PROJECT_ID";

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  if (!API_KEY || !PROJECT_ID) {
    console.error("API key or Project ID is missing");
    return null;
  }

  return (
    <html suppressHydrationWarning>
      <body>
        <AnalyticsProvider apiKey={API_KEY} projectId={PROJECT_ID}>
          <ThemeProvider enableSystem>
            <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
          </ThemeProvider>
        </AnalyticsProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
