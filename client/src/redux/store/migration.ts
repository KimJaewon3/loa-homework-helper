import { PersistState, createMigrate } from "redux-persist";
import { initialState as AccountInit } from "../slice/accountSlice";
import { initialState as CharacterInit } from "../slice/characterSlice";
import { initialState as MemoInit } from "../slice/memoBoardSlice";
import { initialState as ThemeInit } from "../slice/themeSlice";

import type { AccountInitialState } from "../slice/accountSlice";
import type { CharacterInitialState } from "../slice/characterSlice";
import type { MemoInitialState } from "../slice/memoBoardSlice";
import type { ThemeInitialState } from "../slice/themeSlice";

type Root = {
  memoBoardReducer: MemoInitialState;
  themeReducer: ThemeInitialState;
  characterReducer: CharacterInitialState;
  accountReducer: AccountInitialState;
} & {
  _persist: PersistState;
};

const migrate = createMigrate({
  4: (state): Root | undefined => {
    if (!state) {
      return state;
    }
    const { ...others } = state as Root;
    return {
      ...others,
      memoBoardReducer: MemoInit,
      themeReducer: ThemeInit,
      characterReducer: CharacterInit,
      accountReducer: AccountInit,
    };
  },
});

const VERSION = 4;

export { migrate, VERSION };
