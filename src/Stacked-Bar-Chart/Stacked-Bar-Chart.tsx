import React, {useContext} from 'react';

import {
  AnimatedAxis, // any of these can be non-animated equivalents
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,

  Tooltip,
  DataProvider, DataContext, BarStack, BarSeries
} from '@visx/xychart';

import {LegendOrdinal} from '@visx/legend';
import {BarStackHorizontal} from "@visx/shape";
import {PositionScale} from "@visx/shape/lib/types/base";

interface AllData {
  x: number,
  ui: number,
  fae: number,
  be: number,
}

interface Data {
  x: number,
  y: number
}


export interface WorkPackages {
  fae: number;
  be: number;
  ui: number;
}

// const buildData = (_countPoints: number, _workPackages: WorkPackages): AllData[] => {
//   return Array.from({length: _countPoints})
//     .reduce<AllData[]>((array: AllData[], _: undefined, index: number) => {
//       const before: AllData | undefined = array[index - 1];
//
//       // be
//       const beforeBe = before && before.be ? before.be : 0;
//       const doingBe: number = _workPackages.be / _countPoints;
//       const valBe: number = beforeBe + doingBe;
//
//       // fae
//       const beforeFae = before && before.fae ? before.fae : 0;
//       const left = _workPackages.fae - beforeFae;
//       const doingFae: number = left / 20;
//       const valFe: number = beforeFae + doingFae;
//
//       // ui
//       const beforeUi = before && before.ui ? before.ui : 0;
//       const leftUi = _workPackages.ui - beforeUi;
//       const doingUi: number = leftUi / 5;
//       const valUi: number = beforeUi + doingUi;
//
//       return [
//         ...array,
//         {
//           x: index,
//           fae: valFe,
//           be: valBe,
//           ui: valUi,
//         }
//       ];
//     }, []);
// }

const accessors = {
  xAccessor: (d) => 'Gesamt',
  yAccessor: (d) => d,
};

const ChartLegend = () => {
  const { colorScale, theme, margin } = useContext(DataContext);
  return (
    <LegendOrdinal
      direction="column"
      itemMargin="8px 8px 8px 0"
      scale={colorScale}
      legendLabelProps={{ color: "white" }}
      shape="line"
      style={{
        position: 'absolute',
        backgroundColor: theme.backgroundColor,
        marginBottom: -24,
        width: 100,
        paddingLeft: margin.left,
        display: 'flex', // requir
      }}
    />
  );
};



export const StackedBarChart = ({countPoints, workPackages}) => {


  const UI_DATA: number = workPackages.ui;
  const FAE_DATA: number = workPackages.fae;
  const BE_DATA: number = workPackages.be;

  const total = UI_DATA + FAE_DATA + BE_DATA;

  const getWidthPercent = (data): number => {
    const perc = (data * 100 ) / total;
    return perc;
  }
  // @ts-ignore
  return (
    <div className="animated-bar" style={{width: '100%', height: '2rem'}}>
      <div className="be" style={{width: `${getWidthPercent(BE_DATA)}%`, height: '100%'}}></div>
      <div className="fae" style={{width: `${getWidthPercent(FAE_DATA)}%`, left: `${getWidthPercent(BE_DATA)}%`, height: '100%'}}></div>
      <div className="ui" style={{width: `${getWidthPercent(UI_DATA)}%`, left: `${getWidthPercent(BE_DATA) + getWidthPercent(FAE_DATA)}%`, height: '100%'}}></div>
    </div>
  )
};
