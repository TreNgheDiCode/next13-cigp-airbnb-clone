import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import Navbar from "@/components/navbar/navbar";
import ClientOnly from "@/components/client-only";
import RegisterModal from "@/components/modal/register-modal";
import ToasterProvider from "@/components/providers/toaster-provider";
import LoginModal from "@/components/modal/login-modal";
import getCurrentUser from "@/actions/get-current-user";
import RentModal from "@/components/modal/rent-modal";
const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CIGP Airbnb Clone",
  description: "Đặt nhà nghỉ khách sạn trực tuyến ngay hôm nay",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
