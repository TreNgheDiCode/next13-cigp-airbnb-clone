import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import Navbar from "@/components/navbar/navbar";
import ClientOnly from "@/components/client-only";
import RegisterModal from "@/components/modal/register-modal";
import ToasterProvider from "@/components/providers/toaster-provider";
const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CIGP Airbnb Clone",
  description: "Đặt nhà nghỉ khách sạn trực tuyến ngay hôm nay",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
