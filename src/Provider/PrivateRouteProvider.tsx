"use client";

import Loader from "@/components/ui/Loader";
import { isAuthenticated } from "@/utils/isAuthenticated";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProviderProps {
  children: React.ReactNode;
}

export default function PrivateRouteProvider({ children }: ProviderProps) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const router = useRouter();

  useEffect(() => {
    const authStatus = isAuthenticated();

    if (!authStatus) {
      router.push(`/signin?redirect=${pathname}`);
    } else {
      setLoading(false);
    }
  }, [router, pathname]);

  if (loading) {
    return (
      <div className="min-h-[50vh] w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
}
