import type { Metadata } from "next";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stock Insights",
  description: "Get insights on stocks.",
};

const RootLayout =({ children }: { children: React.ReactNode }) => {

  return (
    <html lang="en">
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
};

export default RootLayout;
