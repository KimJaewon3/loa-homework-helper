import styled from "styled-components";
import { updateTheme } from "../redux/slice/themeSlice";
import { useAppDispatch } from "../redux/store";
import { OpenedHeaderMenu } from "../style/styled";
import { themeInfo } from "../style/theme";

const ThemeInfoList = () => {
  const dispatch = useAppDispatch();

  return (
    <OpenedHeaderMenu>
      <ThemeSampleList>
        {themeInfo.map((theme, themeIdx) => (
          <svg
            key={themeIdx}
            onClick={() => dispatch(updateTheme({ themeIdx }))}
          >
            <rect fill={theme.color.backgroundColor} />
          </svg>
        ))}
      </ThemeSampleList>
    </OpenedHeaderMenu>
  );
};

const ThemeSampleList = styled.div`
  svg {
    margin-top: 0.5em;
    width: 100%;
    height: 15px;
    rect {
      width: 100%;
      height: 15px;
      stroke: black;
    }
  }
`;

export default ThemeInfoList;
