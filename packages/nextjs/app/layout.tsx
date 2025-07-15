import dynamic from "next/dynamic";
import "@rainbow-me/rainbowkit/styles.css";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Scaffold-ETH 2 App",
  description: "Built with 🏗 Scaffold-ETH 2",
});

const WRITE_KEY = process.env.FORMO_ANALYTICS_WRITE_KEY || "";

const AnalyticsProvider = dynamic(() => import("./analytics/AnalyticsProvider"), {
  ssr: false,
});

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body>
        <AnalyticsProvider
          writeKey={WRITE_KEY}
          options={{
            tracking: true,
            flushInterval: 1000 * 10, // 10 secs
            logger: {
              enabled: true,
              levels: ["error", "warn", "info"],
            },
          }}
        >
          <ThemeProvider enableSystem>
            <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
          </ThemeProvider>
        </AnalyticsProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
