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

const API_KEY = "";

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  if (!API_KEY) {
    console.log("API key is missing! Create a .env file based on .env.example and add your API key.");
  }

  return (
    <html suppressHydrationWarning>
      <body>
        <AnalyticsProvider apiKey={API_KEY} options={{}}>
          <ThemeProvider enableSystem>
            <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
          </ThemeProvider>
        </AnalyticsProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
