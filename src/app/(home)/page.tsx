import ProthomAloHomePage from "@/components/prothomalo/ProthomaloHomePage";
import HomePage from "@/components/specific/HomePage/HomePage";
import { getBaseUrl } from "@/utils/getBaseUrl";

export default async function Home() {
  const baseURL = getBaseUrl();
  const res = await fetch(baseURL+"/api/settings", { cache: 'no-store' });
  const data = await res?.json();
  const selectedTheme = data[0]?.value === '1' ? 'somokal' : 'prothomalo';
  return (
    <>
      {selectedTheme === 'prothomalo' ? <ProthomAloHomePage /> : <HomePage />}
    </>
  );
}
