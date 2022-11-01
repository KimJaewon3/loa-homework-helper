import styled from "styled-components";
import { updateTheme } from "../redux/slice/themeSlice";
import { useAppDispatch } from "../redux/store";
import { OpenedHeaderMenu } from "../style/styled";
import { theme, ThemeType } from "../style/theme";

const ThemeSampleList = styled.div`
  svg {
    width: 100%;
    height: 12px;
    rect {
      width: 100%;
      height: 10px;
      stroke: black;
    }
  }
`;

export default function ThemeInfo() {
  const dispatch = useAppDispatch();

  function handleThemeUpdate(themeType: ThemeType) {
    dispatch(updateTheme({ value: themeType }));
  }

  return (
    <OpenedHeaderMenu>
      {(Object.keys(theme) as Array<keyof typeof theme>).map((themeType) => {
        return (
          <ThemeSampleList key={themeType} className="opened-list">
            <svg onClick={() => handleThemeUpdate(themeType)}>
              <rect fill={theme[themeType].color.backgroundColor}></rect>
            </svg>
          </ThemeSampleList>
        );
      })}
    </OpenedHeaderMenu>
  );
}
