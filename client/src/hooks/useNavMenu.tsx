import { useRef } from "react";

export type SectionItemRef = {
  [key: string]: HTMLDivElement;
};

const useNavMenu = () => {
  const sectionItemsRef = useRef<SectionItemRef>({});

  const refCallback = (el: HTMLDivElement | null, key: string) => {
    if (!el) return;
    sectionItemsRef.current = {
      ...sectionItemsRef.current,
      [key]: el,
    };
  };

  const gotoTargetRef = (key: string) => {
    const pos = sectionItemsRef.current?.[key].offsetTop;
    if (typeof pos === "number") {
      window.scroll({
        top: pos - 70,
        behavior: "smooth",
      });
    }
  };

  return {
    refCallback,
    gotoTargetRef,
  };
};

export { useNavMenu };
