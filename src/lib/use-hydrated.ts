import { useEffect, useState } from "react";

/** False on the server and the first client paint — avoids auth/session hydration mismatches. */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
}
