import type { Metadata } from "next";

import ReduxProvider from "@/Provider/Provider";
import { Inter } from "next/font/google";
import localfont from "next/font/local";
import "./globals.css";
import { getBaseUrl } from "@/utils/getBaseUrl";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const potroSansBangla = localfont({
  src: [
    {
      path: "../../public/fonts/PotroSansBangla-Medium.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/PotroSansBangla-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/PotroSansBangla-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/PotroSansBangla-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-potroSansBangla",
});

const solayman = localfont({
  src: "../../public/fonts/SolaimanLipi5e1f.ttf",
  variable: "--font-solayman",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseURL = getBaseUrl();
  const res = await fetch(baseURL+"/api/settings", { cache: 'no-store' });
  const data = await res?.json();
  const selectedTheme = data[0]?.value === '1' ? 'somokal' : 'prothomalo';
  return (
    <html
      lang="en"
      className={`${inter.variable} ${potroSansBangla.variable} ${solayman.variable}`}
    >
      {
        selectedTheme === 'prothomalo' ? <head>
        <title>Prothom alo</title>
        <link rel="icon" href="https://play-lh.googleusercontent.com/6fNfsfLg3ZTmdeV-268MO6X_oQm-s18ICennOFP62jtyHnqSVMJppXQ1j3IveehvO_Y" sizes="any" />
        <meta property="og:image" content="https://play-lh.googleusercontent.com/6fNfsfLg3ZTmdeV-268MO6X_oQm-s18ICennOFP62jtyHnqSVMJppXQ1j3IveehvO_Y" />
        <meta name="twitter:image" content="https://play-lh.googleusercontent.com/6fNfsfLg3ZTmdeV-268MO6X_oQm-s18ICennOFP62jtyHnqSVMJppXQ1j3IveehvO_Y" />
      </head> : <head>
        <title>Sangbadpatra</title>
        <link rel="icon" href="https://play-lh.googleusercontent.com/6fNfsfLg3ZTmdeV-268MO6X_oQm-s18ICennOFP62jtyHnqSVMJppXQ1j3IveehvO_Y" sizes="any" />
        <meta property="og:image" content="https://play-lh.googleusercontent.com/6fNfsfLg3ZTmdeV-268MO6X_oQm-s18ICennOFP62jtyHnqSVMJppXQ1j3IveehvO_Y" />
        <meta name="twitter:image" content="https://play-lh.googleusercontent.com/6fNfsfLg3ZTmdeV-268MO6X_oQm-s18ICennOFP62jtyHnqSVMJppXQ1j3IveehvO_Y" />
      </head>
      }

      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}

export async function generateMetadata() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/settings`,
      {
        cache: "no-store",
      }
    );

    const data = await response?.json();
    // console.log(data?.setting?.client?.site_title);

    let keywordsArray;

    if (data?.success && data?.settings) {
      const keywordsString =
        data?.setting?.client?.meta_keywords || "nextjs, starter, template";
      keywordsArray = keywordsString
        .split(",")
        .map((keyword: any) => keyword.trim());
    }

    let metadata: Metadata = {
      title: {
        template: `${data?.setting?.client?.site_title} | %s`,
        default: data?.setting?.client?.site_title,
      },
      description: data?.setting?.client?.meta_description,
      keywords: keywordsArray,
      icons: {
        icon: data?.setting?.client?.favicon,
      },
    };

    return metadata;
  } catch (error) {
    console.error("Failed to fetch metadata:", error);
  }
}
