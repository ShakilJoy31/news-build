import ProthonAloHeader from "@/components/prothomalo/ProthonAloHeader";
import Footer from "@/components/specific/Footer/Footer";
import Header from "@/components/specific/Header/Header";
import { getBaseUrl } from "@/utils/getBaseUrl";

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
    <>

      {
        selectedTheme === 'prothomalo' ? <ProthonAloHeader></ProthonAloHeader> : <Header />
      }
      {children}
      <Footer />
    </>
  );
}
