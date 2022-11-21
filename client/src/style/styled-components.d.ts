import "styled-components";
import type { ThemeInfo } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme extends ThemeInfo {}
}
