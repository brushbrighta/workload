import React from "react";
import { GewerkSettings } from "../data";
import { getWorkPackagesTotal, teamPerGewerk } from "../functions";

export const Team = ({
  workPackages,
  teamSize,
}: {
  workPackages: GewerkSettings[];
  teamSize: number;
}) => {
  const workPackagesTotal: number = getWorkPackagesTotal(workPackages);

  const workPackagesUi = workPackages.map((_package: GewerkSettings) => (
    <div key={_package.nameShort}>
      <span>{_package.nameShort}</span>
      <span style={{ color: _package.color }} key={_package.nameShort}>
        {Math.round(
          teamPerGewerk(teamSize, _package.value, workPackagesTotal)
        ) || "0"}
      </span>{" "}
      {/*<small>*/}
      {/*  (*/}
      {/*  {teamPerGewerk(*/}
      {/*    teamSize,*/}
      {/*    _package.value,*/}
      {/*    workPackagesTotal*/}
      {/*  ).toLocaleString(undefined, {*/}
      {/*    minimumFractionDigits: 2,*/}
      {/*    maximumFractionDigits: 2,*/}
      {/*  })}*/}
      {/*  )*/}
      {/*</small>*/}
    </div>
  ));

  return (
    <div>
      <div style={{ marginBottom: "1em" }}>
        <strong>Daraus resultierendes Team</strong>
      </div>
      <div className={"team"}>{workPackagesUi}</div>
    </div>
  );
};
