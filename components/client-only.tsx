"use client";

import { useEffect, useState } from "react";

const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMoounted] = useState(false);

  useEffect(() => {
    setIsMoounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <>{children}</>;
};

export default ClientOnly;
