import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RaidData, raidInfos } from "../../data/raidLevel";
import { RootState } from "../store";

type ContentsType = {
  raidName: string;
  raidData: {
    difficulty?: string;
    reward: number;
  };
  isDone: boolean;
};

type CharacterType = {
  name: string;
  isLimitedSixTime: boolean;
  contents: ContentsType[];
};

type CharacterInitialState = {
  characters: CharacterType[];
};

type AddCharacter = {
  name: string;
  level: number;
};

type AddRaidList = {
  characterIdx: number;
  raidName: string;
};

type UpdateReward = {
  characterIdx: number;
  raidListIdx: number;
  gold: number;
};

type UpdateSixTimeLimit = {
  characterIdx: number;
};

type UpdateRaidIsDone = {
  characterIdx: number;
  raidListIdx: number;
  isDone: boolean;
};

type DeleteCharacter = {
  characterName: string;
};

type DeleteRaidList = {
  characterIdx: number;
  raidListIdx: number;
};

type ReorderRaidList = {
  fromIdx: number;
  toIdx: number;
  characterIdx: number;
};

type ReorderCharacter = {
  fromIdx: number;
  toIdx: number;
  move: "before" | "after";
};

const initialState: CharacterInitialState = {
  characters: [],
};

const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    addCharacter: (state, action: PayloadAction<AddCharacter>) => {
      const { name, level } = action.payload;
      const sixTimeCheck =
        state.characters.filter((ch) => ch.isLimitedSixTime).length < 6;
      const newCharacter: CharacterType = {
        name,
        isLimitedSixTime: sixTimeCheck,
        contents: [],
      };

      // abled raid list
      raidInfos.forEach((raid) => {
        const { raidName, info } = raid;
        let maxLevelRaid: RaidData | undefined;

        info.forEach((info) => {
          const { minLevel, maxLevel } = info;
          if (maxLevel && maxLevel <= level) return;
          if (minLevel > level) return;
          if (!maxLevelRaid) {
            maxLevelRaid = info;
          } else {
            maxLevelRaid =
              maxLevelRaid.minLevel < minLevel ? info : maxLevelRaid;
          }
        });

        if (!maxLevelRaid) return;
        newCharacter.contents.push({
          raidName,
          raidData: {
            difficulty: maxLevelRaid.difficulty,
            reward: maxLevelRaid.reward,
          },
          isDone: false,
        });
      });

      state.characters.push(newCharacter);
    },
    addRaidList: (state, action: PayloadAction<AddRaidList>) => {
      const { characterIdx, raidName } = action.payload;
      state.characters[characterIdx].contents.push({
        raidName,
        raidData: {
          reward: 0,
        },
        isDone: false,
      });
    },
    updateReward: (state, action: PayloadAction<UpdateReward>) => {
      const { characterIdx, raidListIdx, gold } = action.payload;
      state.characters[characterIdx].contents[raidListIdx].raidData.reward =
        gold;
    },
    updateSixTimeLimit: (state, action: PayloadAction<UpdateSixTimeLimit>) => {
      const { characterIdx } = action.payload;
      const isLimitedSixTime = state.characters[characterIdx].isLimitedSixTime;

      if (isLimitedSixTime) {
        state.characters[characterIdx].isLimitedSixTime = false;
      } else {
        const sixTimeCheck =
          state.characters.filter((ch) => ch.isLimitedSixTime).length < 6;
        if (!sixTimeCheck) return;
        state.characters[characterIdx].isLimitedSixTime = true;
      }
    },
    updateRaidIsDone: (state, action: PayloadAction<UpdateRaidIsDone>) => {
      const { characterIdx, raidListIdx, isDone } = action.payload;
      state.characters[characterIdx].contents[raidListIdx].isDone = isDone;
    },
    deleteCharacter: (state, action: PayloadAction<DeleteCharacter>) => {
      state.characters = state.characters.filter((character) => {
        return character.name !== action.payload.characterName;
      });
    },
    deleteRaidList: (state, action: PayloadAction<DeleteRaidList>) => {
      const { characterIdx, raidListIdx } = action.payload;
      const target = state.characters[characterIdx].contents;
      state.characters[characterIdx].contents = target.filter(
        (_, idx) => idx !== raidListIdx
      );
    },
    reorderRaidList: (state, action: PayloadAction<ReorderRaidList>) => {
      const { characterIdx, fromIdx, toIdx } = action.payload;
      const slice = state.characters[characterIdx].contents.splice(fromIdx, 1);
      state.characters[characterIdx].contents.splice(toIdx, 0, slice[0]);
    },
    reorderCharacter: (state, action: PayloadAction<ReorderCharacter>) => {
      let { fromIdx, toIdx, move } = action.payload;
      let goto = move === "after" ? 1 : 0;

      state.characters.splice(toIdx + goto, 0, state.characters[fromIdx]);
      if (fromIdx > toIdx) {
        fromIdx += 1;
      }
      state.characters.splice(fromIdx, 1);
    },
    initRaidList: (state) => {
      state.characters = state.characters.map((ch) => {
        const { contents } = ch;
        const initContents = contents.map((raid) => {
          return {
            ...raid,
            isDone: false,
          };
        });
        return {
          ...ch,
          contents: initContents,
        };
      });
    },
  },
});

export type {
  ContentsType,
  CharacterType,
  CharacterInitialState,
  ReorderCharacter,
  ReorderRaidList,
};
export { characterSlice, initialState };
export const {
  addCharacter,
  addRaidList,
  updateReward,
  updateSixTimeLimit,
  updateRaidIsDone,
  deleteCharacter,
  deleteRaidList,
  reorderRaidList,
  reorderCharacter,
  initRaidList,
} = characterSlice.actions;
export default characterSlice.reducer;
