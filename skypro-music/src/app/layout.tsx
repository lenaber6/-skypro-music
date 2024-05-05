import type { Metadata } from "next";
import { Montserrat  } from "next/font/google";
import "./globals.css";
import ReduxProvider from "../store/ReduxProvider";

const montserrat  = Montserrat ({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "Лучший музыкальный сервис",
  description: "Поиск любимой музыки",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <ReduxProvider>  {/* После создания компонента ReduxProvider , последний шаг — 
      это обернуть ваше приложение в этот провайдер, чтобы состояние из Redux стало 
      доступно во всех компонентах вашего приложения.*/}
      <body className={montserrat.className}>{children}</body>
      </ReduxProvider>
    </html>
  );
}

