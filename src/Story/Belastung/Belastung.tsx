import React from "react";
import { GewerkSettings } from "../data";
import { BarGroup } from "@visx/shape";
import { Group } from "@visx/group";
import { AllData, buildDataNonLinear } from "../functions";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
export const Belastung = ({
  workPackages,
  teamSize,
  countPoints,
}: {
  workPackages: GewerkSettings[];
  teamSize: number;
  countPoints: number;
}) => {
  const DATA: AllData[] = buildDataNonLinear(countPoints, workPackages).filter(
    (_, i) => i % 5 === 0
  );

  const beColor = workPackages.find((w) => w.nameShort === "BE").color;
  const faeColor = workPackages.find((w) => w.nameShort === "FAE").color;
  const uiColor = workPackages.find((w) => w.nameShort === "UI").color;

  const keys = ["be", "fae", "ui"];

  const colorScale = scaleOrdinal<string, string>({
    domain: keys,
    range: [beColor, faeColor, uiColor],
  });

  const xAccess = (d: AllData) => d.x;

  const dateScale = scaleBand<number>({
    domain: DATA.map((d) => d.x),
    padding: 0.4,
  });

  const gewerkeScale = scaleBand<string>({
    domain: keys,
    padding: 0.1,
  });

  const valueScale = scaleLinear<number>({
    domain: [
      0,
      Math.max(
        ...DATA.map((d) => Math.max(...keys.map((key) => Number(d[key]))))
      ),
    ],
  });

  const width = 500;
  const height = 500;
  const xMax = width;
  const yMax = height;

  // update scale output dimensions
  dateScale.rangeRound([0, xMax]);
  gewerkeScale.rangeRound([0, dateScale.bandwidth()]);
  valueScale.range([yMax, 0]);

  return (
    <ParentSize>
      {({ width, height }) => (
        <svg width={width} height={500}>
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill={"#ffffff"}
            rx={14}
          />
          <Group top={0} left={0}>
            <BarGroup
              data={DATA}
              keys={keys}
              height={height}
              x0={xAccess}
              x0Scale={dateScale}
              x1Scale={gewerkeScale}
              yScale={valueScale}
              color={colorScale}
            >
              {(barGroups) =>
                barGroups.map((barGroup) => (
                  <Group
                    key={`bar-group-${barGroup.index}-${barGroup.x0}`}
                    left={barGroup.x0}
                  >
                    {barGroup.bars.map((bar, _index) => (
                      <rect
                        key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                        x={bar.x + _index}
                        y={bar.y}
                        width={bar.width}
                        height={bar.height}
                        fill={bar.color}
                        rx={4}
                      />
                    ))}
                  </Group>
                ))
              }
            </BarGroup>
          </Group>
        </svg>
      )}
    </ParentSize>
  );
};
