import React, {useContext} from 'react';

import {
  AnimatedAxis, // any of these can be non-animated equivalents
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
  DataProvider, DataContext
} from '@visx/xychart';

import {LegendOrdinal} from '@visx/legend';
import {AllData, Data, WorkPackages} from "./interfaces";



const buildData = (_countPoints: number, _workPackages: WorkPackages): AllData[] => {
  return Array.from({length: _countPoints})
    .reduce<AllData[]>((array: AllData[], _: undefined, index: number) => {
      const before: AllData | undefined = array[index - 1];

      // be
      const beforeBe = before && before.be ? before.be : 0;
      const doingBe: number = _workPackages.be / _countPoints;
      const valBe: number = beforeBe + doingBe;

      // fae
      const beforeFae = before && before.fae ? before.fae : 0;
      const left = _workPackages.fae - beforeFae;
      const doingFae: number = left / 20;
      const valFe: number = beforeFae + doingFae;

      // ui
      const beforeUi = before && before.ui ? before.ui : 0;
      const leftUi = _workPackages.ui - beforeUi;
      const doingUi: number = leftUi / 5;
      const valUi: number = beforeUi + doingUi;

      return [
        ...array,
        {
          x: index,
          fae: valFe,
          be: valBe,
          ui: valUi,
        }
      ];
    }, []);
}

const accessors = {
  xAccessor: (d) => d.x,
  yAccessor: (d) => d.y,
};

const ChartLegend = () => {
  const { colorScale, theme, margin } = useContext(DataContext);
  return (
    <LegendOrdinal
      direction="row"
      itemMargin="8px 8px 8px 0"
      scale={colorScale}
      // labelFormat={(label) => label.replace("-", " ")}
      legendLabelProps={{ color: "white" }}
      shape="line"
      style={{
        backgroundColor: theme.backgroundColor,
        marginBottom: -24,
        paddingLeft: margin.left,
        display: 'flex', // requir
      }}
    />
  );
};

export const LineChart = ({countPoints, workPackages}) => {



  const DATA = buildData(countPoints, workPackages);

  const UI_DATA: Data[] = DATA.map(d => ({
    x: d.x,
    y: d.ui
  }))

  const FAE_DATA: Data[] = DATA.map(d => ({
    x: d.x,
    y: d.fae
  }))

  const BE_DATA: Data[] = DATA.map(d => ({
    x: d.x,
    y: d.be
  }))

  return (
    <DataProvider
      // these props have been moved from XYChart to DataProvider
      // this allows us to move DataContext up a level such that we can
      // render an HTML legend that uses DataContext and an SVG chart
      // without doing this you would have to render XYChart as a child
      // of XYChart, which would then require the legend to be SVG-based
      // because HTML cannot be a child of SVG
      xScale={{ type: "band", paddingInner: 0.5 }}
      yScale={{ type: "linear" }}

    >
      <ChartLegend />
      <XYChart height={500} >
        <AnimatedAxis orientation="bottom" />
        <AnimatedAxis orientation="left" />
        <AnimatedGrid columns={false} numTicks={4} />
        <AnimatedLineSeries dataKey="BE" data={BE_DATA} {...accessors} />
        <AnimatedLineSeries dataKey="FAE" data={FAE_DATA} {...accessors} />
        <AnimatedLineSeries dataKey="UI" data={UI_DATA} {...accessors} />


        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showVerticalCrosshair
          showSeriesGlyphs
          renderTooltip={({ tooltipData, colorScale }) => {
            return (
              <div>
                {tooltipData.datumByKey['BE'] &&
                    <div style={{ color: colorScale(tooltipData.datumByKey['BE'].key) }}>
                        BE: {Math.round((tooltipData.datumByKey['BE'].datum as Data).y)}
                    </div>
                }
                {tooltipData.datumByKey['FAE'] &&
                    <div style={{color: colorScale(tooltipData.datumByKey['FAE'].key)}}>
                        FAE: {Math.round((tooltipData.datumByKey['FAE'].datum as Data).y)}
                    </div>
                }
                {tooltipData.datumByKey['UI'] &&
                    <div style={{color: colorScale(tooltipData.datumByKey['UI'].key)}}>
                        UI: {Math.round((tooltipData.datumByKey['UI'].datum as Data).y)}
                    </div>
                }
              </div>
            )
          }}
        />
      </XYChart>
    </DataProvider>
  )
};
