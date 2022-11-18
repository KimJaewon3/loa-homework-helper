import "styled-components";
import { ThemeInfo } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme extends ThemeInfo {}
}
