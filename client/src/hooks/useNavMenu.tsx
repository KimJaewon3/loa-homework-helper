import { useEffect, useRef, useState } from "react";
import { size } from "../style/display";

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

  return {
    sectionItemsRef,
    refCallback,
  };
};

export { useNavMenu };
