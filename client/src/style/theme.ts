export type ThemeInfo = {
  name: "spring" | "summer" | "autumn" | "winter";
  color: {
    backgroundColor: string;
    titleColor: string;
    fontColor: string;
    borderColor: string;
    goldBoxTitleColor: string;
  };
};

export const themeInfo: ThemeInfo[] = [
  {
    name: "spring",
    color: {
      backgroundColor: "#b0d099",
      titleColor: "#a9db76",
      fontColor: "black",
      borderColor: "white",
      goldBoxTitleColor: "#e3f0eb",
    },
  },
  {
    name: "summer",
    color: {
      backgroundColor: "#293e68",
      titleColor: "#7686db",
      fontColor: "white",
      borderColor: "white",
      goldBoxTitleColor: "#c8d2e1",
    },
  },
  {
    name: "autumn",
    color: {
      backgroundColor: "#dda651",
      titleColor: "#95531f",
      fontColor: "black",
      borderColor: "white",
      goldBoxTitleColor: "#ece7dc",
    },
  },
  {
    name: "winter",
    color: {
      backgroundColor: "#7cbbcc",
      titleColor: "#4fa1ca",
      fontColor: "black",
      borderColor: "white",
      goldBoxTitleColor: "#d9ebf5",
    },
  },
];
