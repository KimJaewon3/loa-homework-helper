import React, { forwardRef, useEffect, useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../redux/store";
import Status from "./Status";

const Monitor = styled.div`
  > * {
    margin: 1em;
  }
  .monitor-title {
    margin-left: 0;
    font-size: 1.5em;
    color: ${({ theme }) => theme.color.fontColor};
  }
  .monitor-progress {
    display: flex;
    border: 2px solid ${({ theme }) => theme.color.borderColor};
    border-radius: 10px;
    padding: 0.5em;
    flex-wrap: wrap;
    background-color: rgb(240, 248, 255, 0.8);
    > div {
      margin: 5px 20px 5px 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      > span {
        text-align: center;
        font-size: 0.8em;
      }
    }
  }
`;

const Monitoring = forwardRef<HTMLDivElement>(function Monitoring(props, ref) {
  const [percentArr, setPersentArr] = useState<
    { name: string; percent: number }[]
  >([]);
  const contents = useAppSelector((state) => state.contentsReducer.contents);

  useEffect(() => {
    setPersentArr(() => {
      return contents.map((character) => {
        let percent = 100;
        if (character.content.length > 0) {
          const done = character.content.filter((el) => {
            const key = Object.keys(el)[0];
            return el[key].isDone;
          }).length;
          percent = (done / character.content.length) * 100;
        }
        return {
          name: character.name,
          percent,
        };
      });
    });
  }, [contents]);

  return (
    <Monitor ref={ref}>
      <div className="monitor-title">
        <span>전체 현황</span>
      </div>

      <div className="monitor-progress">
        <div>
          <Status
            percent={
              percentArr.length === 0
                ? 100
                : percentArr.reduce((acc, el) => (acc += el.percent), 0) /
                  percentArr.length
            }
            overall={true}
          ></Status>
          <span>전체</span>
        </div>

        {percentArr.map((el, idx) => {
          return (
            <div key={idx}>
              <Status percent={el.percent} overall={false}></Status>
              <span>{el.name}</span>
            </div>
          );
        })}
      </div>
    </Monitor>
  );
});

export default Monitoring;
