import { useLayoutEffect, useState } from "react";

// TODO: Copy paste this: https://www.codegrepper.com/code-examples/javascript/react+get+window+width+on+resize
export const useIsMobile = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size[0] < 820;
};
