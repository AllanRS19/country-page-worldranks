import type { Metadata } from "next";
import locaFont from "next/font/local";
import Image from "next/image";
import "./globals.css";
import Link from "next/link";

const vietnamePro = locaFont({
  src: [
    {
      path: '../public/fonts/BeVietnamPro-Light.ttf',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../public/fonts/BeVietnamPro-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../public/fonts/BeVietnamPro-Medium.ttf',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../public/fonts/BeVietnamPro-SemiBold.ttf',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../public/fonts/BeVietnamPro-Bold.ttf',
      weight: '700',
      style: 'normal'
    }
  ]
})

export const metadata: Metadata = {
  title: "Country Page WorldRanks - Allan Romero",
  description: "Challenge by devChallenges for Country Page WorldRanks",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${vietnamePro.className} antialiased`}
      >
        <main className="page-container">
          <div className="hero-image-container flex-center">
            <Link href="/">
              <Image
                src="/icons/Logo.svg"
                alt="Logo"
                width={200}
                height={200}
                className="relative size-auto object-cover -top-28 md:-top-6 z-50"
              />
            </Link>
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
