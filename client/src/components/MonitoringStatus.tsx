import React, { forwardRef, useEffect, useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../redux/store";
import CircleProgress from "./monitoring/CircleProgress";

type Percent = {
  name: string;
  percent: number;
};

const MonitoringStatus = forwardRef<HTMLDivElement>((props, ref) => {
  const [percentArr, setPercentArr] = useState<Percent[]>([]);
  const { characters } = useAppSelector((state) => state.characterReducer);

  useEffect(() => {
    setPercentArr(() => {
      return characters.map((ch) => {
        let percent = 100;
        const { contents, name } = ch;
        if (contents.length > 0) {
          const done = contents.filter((c) => c.isDone).length;
          percent = (done / contents.length) * 100;
        }
        return {
          name,
          percent,
        };
      });
    });
  }, [characters]);

  return (
    <MonitoringContainer ref={ref}>
      <div className="monitoring-title">
        <span>전체 현황</span>
      </div>

      <div className="monitoring-progress-box">
        <div className="monitoring-progress">
          <CircleProgress
            percent={
              percentArr.length === 0
                ? 100
                : percentArr.reduce((acc, el) => (acc += el.percent), 0) /
                  percentArr.length
            }
            overall={true}
          />
          <span>전체</span>
        </div>
        {percentArr.map((el, idx) => (
          <div className="monitoring-progress" key={el.name}>
            <CircleProgress percent={el.percent} />
            <span>{el.name}</span>
          </div>
        ))}
      </div>
    </MonitoringContainer>
  );
});

const MonitoringContainer = styled.div`
  > * {
    margin: 1em;
  }
  .monitoring-title {
    margin-left: 0;
    font-size: 1.5em;
    color: ${({ theme }) => theme.color.fontColor};
  }
  .monitoring-progress-box {
    display: flex;
    border: 2px solid ${({ theme }) => theme.color.borderColor};
    border-radius: 10px;
    padding: 0.5em;
    flex-wrap: wrap;
    background-color: rgb(240, 248, 255, 0.8);
    .monitoring-progress {
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

export default MonitoringStatus;
