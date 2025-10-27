"use client";
import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { useRouter } from '@bprogress/next';
import { usePathname, useRouter } from "next/navigation";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const [queryClient] = React.useState(() => new QueryClient());
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const handleBack = () => {
      router.push(pathname); // Keeps the user on the same page
    };

    // Push a new history state to prevent back navigation
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, [pathname, router]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
