import { PersistState, createMigrate } from "redux-persist";
import { AccountInitialState } from "../slice/accountSlice";
import { CharacterInitialState } from "../slice/characterSlice";
import { MemoInitialState } from "../slice/memoBoardSlice";
import { ThemeInitialState } from "../slice/themeSlice";

type Root = {
  memoBoardReducer: MemoInitialState;
  themeReducer: ThemeInitialState;
  characterReducer: CharacterInitialState;
  accountReducer: AccountInitialState;
} & {
  _persist: PersistState;
};

type V3 = Omit<Root, "themeReducer"> & {
  themeReducer: ThemeInitialState;
};

const migrate = createMigrate({
  3: (state): Root | undefined => {
    if (!state) {
      return state;
    }
    const { themeReducer, ...others } = state as V3;
    return {
      ...others,
      themeReducer,
    };
  },
});

const VERSION = 3;

export { migrate, VERSION };
