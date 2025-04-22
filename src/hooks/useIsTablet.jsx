import { useEffect, useState } from "react";

function useIsTablet(breakpoint = 1024) {
  const [isTabletOrSmaller, setIsTabletOrSmaller] = useState(
    window.innerWidth <= breakpoint
  );

  useEffect(() => {
    const handleResize = () => {
      setIsTabletOrSmaller(window.innerWidth <= breakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isTabletOrSmaller;
}

export {useIsTablet}
