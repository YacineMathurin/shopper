"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import Navbar from "./components/molecule/navbar";
import { Account } from "./contexts/account";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Account>
          <Navbar />
          <main className="container mt-8">{children}</main>
        </Account>
      </body>
    </html>
  );
}
