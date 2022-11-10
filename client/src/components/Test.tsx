import { useEffect } from "react";
import {
  addCharacter,
  addRaidList,
  deleteChracter,
  deleteRaidList,
  initRaidList,
  reorderCharacter,
  reorderRaidList,
  updateRaidIsDone,
  updateReward,
  updateSixTimeLimit,
} from "../redux/slice/FcharacterSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

const Test = () => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector(
    (state) => state.characterReducer.characters
  );

  useEffect(() => {
    console.log(characters);
  }, [characters]);

  const func = () => {
    // dispatch(addCharacter({ name: "new7", level: 1550 }));
    // dispatch(deleteChracter({ name: "new1" }));
    // dispatch(updateReward({ characterIdx: 1, raidListIdx: 2, gold: 1 }));
    // dispatch(updateSixTimeLimit({ characterIdx: 6 }));
    //dispatch(
    //  updateRaidIsDone({ characterIdx: 1, raidListIdx: 0, isDone: true })
    //);
    // dispatch(addRaidList({ characterIdx: 7, raidName: "new raid" }));
    // dispatch(deleteRaidList({ characterIdx: 0, raidListIdx: 4 }));
    // dispatch(reorderRaidList({ characterIdx: 7, fromIdx: 2, toIdx: 3 }));
    // dispatch(initRaidList());
    dispatch(reorderCharacter({ fromIdx: 0, toIdx: 3, behavior: "before" }));
  };

  return (
    <div>
      <button onClick={func}>test</button>
    </div>
  );
};

export { Test };
