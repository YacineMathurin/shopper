"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import Navbar from "../views/components/molecule/navbar";
import { Account } from "../application/contexts/account";
import { Footer } from "@/views/components/organism/footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Account>
          <Navbar />
          <main className="container mt-8">{children}</main>
          <Footer />
        </Account>
      </body>
    </html>
  );
}
