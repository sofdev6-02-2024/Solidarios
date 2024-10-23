import type { Metadata } from "next";
import "../styles/globals.css";
import ThemeRegistry from "./ThemeProvider";
import Header from "@/components/Header";
import ReduxProvider from "@/redux/redux-provider";

export const metadata: Metadata = {
  title: "CEvent",
  description: "CEvent is a platform for creating and managing events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-inter">
        <ReduxProvider>
          <ThemeRegistry>
            <Header />
            {children}
          </ThemeRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
