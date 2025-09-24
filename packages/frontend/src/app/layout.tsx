import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import AmplifyProvider from "./AmplifyProvider";
import Header from "@/components/ui/Header";
import AuthWrapper from "./AuthWrapper"; // 1. Import the new wrapper

const inter = Inter({ subsets: ["latin"] });

export const metadata = { /* ... */ };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AmplifyProvider>
          <AuthWrapper> {/* 2. Use the AuthWrapper here */}
            <Header />
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </AuthWrapper>
        </AmplifyProvider>
      </body>
    </html>
  );
}
