import Footer from "@/components/specific/Footer/Footer";
import Header from "@/components/specific/Header/Header";
import ProfileSidebar from "@/components/specific/ProfileSidebar/ProfileSidebar";
import PrivateRouteProvider from "@/Provider/PrivateRouteProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <PrivateRouteProvider>
        <div className="custom_container w-full flex items-start gap-10 px-2 md:px-5">
          <ProfileSidebar />
          <div className="w-full">{children}</div>
        </div>
      </PrivateRouteProvider>
      <Footer />
    </div>
  );
}
