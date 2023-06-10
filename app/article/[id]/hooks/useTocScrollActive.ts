import { useEffect, useState } from "react";
import { throttle } from "lodash";

export function useTocScrollActive({
  titleClassName,
  spacing = 40,
  time = 200,
}: {
  titleClassName: string;
  spacing?: number;
  time?: number;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  useEffect(() => {
    const scrollHandler = () => {
      const selectorList = document.querySelectorAll(`.${titleClassName}`);
      const len = selectorList.length;
      if (!len) return;
      let res: string = "";
      for (let i = 0; i < len - 1; i++) {
        const currentSelector = selectorList[i];
        const { top } = currentSelector.getBoundingClientRect();
        if (top > spacing && i === 0) {
          res = currentSelector.getAttribute("id") || "";
          break;
        } else if (top < spacing) {
          res = currentSelector.getAttribute("id") || "";
        }
      }
      if (!res) {
        res = selectorList[0].getAttribute("id") || "";
      }
      setActiveId(res);
    };
    scrollHandler();
    window.addEventListener("scroll", throttle(scrollHandler, time));

    return () => {
      window.removeEventListener("scroll", throttle(scrollHandler, time));
    };
  }, [titleClassName, spacing, time]);

  return {
    activeId,
  };
}
