import { GewerkSettings } from "./data";

export interface AllData {
  x: number;
  ui: number;
  fae: number;
  be: number;
}

export interface AllDataExtended {
  x: number;
  ui: { val: number; doing: number };
  fae: { val: number; doing: number };
  be: { val: number; doing: number };
}

export const getWorkPackagesTotal = (_workPackages: GewerkSettings[]): number =>
  _workPackages.reduce((prev: number, curr: GewerkSettings) => {
    return prev + curr.value;
  }, 0);

export const teamPerGewerk = (teamSize, value, workPackagesTotal) =>
  Math.round((teamSize * value) / workPackagesTotal) || 1;

export const buildDataLinear = (
  _countPoints: number,
  _workPackages: GewerkSettings[]
): AllData[] => {
  const workPackagesBe = _workPackages.find((w) => w.nameShort === "BE").value;
  const workPackagesFAE = _workPackages.find(
    (w) => w.nameShort === "FAE"
  ).value;
  const workPackagesUI = _workPackages.find((w) => w.nameShort === "UI").value;

  return Array.from({ length: _countPoints }).reduce<AllData[]>(
    (array: AllData[], _: undefined, index: number) => {
      const before: AllData | undefined = array[index - 1];

      // be
      const beforeBe = before && before.be ? before.be : 0;
      const doingBe: number = workPackagesBe / _countPoints;
      const valBe: number = beforeBe + doingBe;

      // fae
      const beforeFae = before && before.fae ? before.fae : 0;
      const doingFe: number = workPackagesFAE / _countPoints;
      const valFe: number = beforeFae + doingFe;

      // ui
      const beforeUi = before && before.ui ? before.ui : 0;
      const doingUi: number = workPackagesUI / _countPoints;
      const valUi: number = beforeUi + doingUi;

      return [
        ...array,
        {
          x: index,
          fae: valFe,
          be: valBe,
          ui: valUi,
        },
      ];
    },
    []
  );
};

const speedAlgos = (gewerk: "fae" | "be" | "ui", factorDone: number) => {
  const f = {
    fae: () => {
      const res = 1 + 2 * (1 - factorDone);
      return res;
    },
    // slow down from 6 => 1
    ui: () => {
      const res = 1 + 5 * (1 - factorDone);
      return res;
    },
    // speed up to X
    be: () => {
      const res = 0.3 + 0.7 * factorDone;
      // return 0.7;
      return res;
    },
  };
  return f[gewerk]();
};

const wpValue = (
  gewerk: "fae" | "be" | "ui",
  _workPackages: GewerkSettings[]
) => {
  const f = {
    fae: () => _workPackages.find((w) => w.nameShort === "FAE").value,
    ui: () => _workPackages.find((w) => w.nameShort === "UI").value,
    be: () => _workPackages.find((w) => w.nameShort === "BE").value,
  };
  return f[gewerk]();
};

const getDoing = (
  gewerk: "fae" | "be" | "ui",
  factorDone: number,
  left: number,
  stepsLeft: number,
  totalWorkLoad: number
): number => {
  const normalizedLeft = left / stepsLeft;
  // const precLeft = totalWorkLoad * factorDone;
  const speed = speedAlgos(gewerk, factorDone);
  const doInthIStep = normalizedLeft * speed;
  // let retVal: number;
  // if (gewerk === "be") {
  //   retVal = doInthIStep > normalizedLeft ? normalizedLeft : doInthIStep;
  // } else {
  //   retVal = doInthIStep < 1 ? 1 : doInthIStep;
  // }

  return doInthIStep;
};

const getVal = (
  gewerk: "fae" | "be" | "ui",
  totalWorkLoad: number,
  before: AllDataExtended,
  factorDone: number,
  stepsLeft: number
): { val: number; doing: number } => {
  const _before = before && before[gewerk] ? before[gewerk].val : 0;
  const left = totalWorkLoad - _before;
  const doing = getDoing(gewerk, factorDone, left, stepsLeft, totalWorkLoad);
  return {
    val: _before + doing,
    doing: doing,
  };
};

export const buildDataNonLinear = (
  _countPoints: number,
  _workPackages: GewerkSettings[],
  prop: "val" | "doing" = "val"
): AllData[] => {
  const workPackagesBe = wpValue("be", _workPackages);
  const workPackagesFAE = wpValue("fae", _workPackages);
  const workPackagesUI = wpValue("ui", _workPackages);

  return Array.from({ length: _countPoints })
    .reduce<AllDataExtended[]>(
      (array: AllDataExtended[], _: undefined, index: number) => {
        const before: AllDataExtended | undefined = array[index - 1];
        const factorDone = index / _countPoints;
        const stepsLeft = _countPoints - index;

        const valBe = getVal(
          "be",
          workPackagesBe,
          before,
          factorDone,
          stepsLeft
        );
        const valFae = getVal(
          "fae",
          workPackagesFAE,
          before,
          factorDone,
          stepsLeft
        );
        const valUi = getVal(
          "ui",
          workPackagesUI,
          before,
          factorDone,
          stepsLeft
        );

        return [
          ...array,
          {
            x: index,
            fae: valFae,
            be: valBe,
            ui: valUi,
          },
        ];
      },
      []
    )
    .map(
      (v): AllData => ({
        x: v.x,
        ui: v.ui[prop],
        fae: v.fae[prop],
        be: v.be[prop],
      })
    );
};

export const buildDataNonLinearPerPerson = (
  _countPoints: number,
  _workPackages: GewerkSettings[],
  _teamSize: number
): AllData[] =>
  buildDataNonLinear(_countPoints, _workPackages, "doing").map((allData) => {
    return {
      ...allData,
      ui:
        allData.ui /
        teamPerGewerk(
          _teamSize,
          wpValue("ui", _workPackages),
          getWorkPackagesTotal(_workPackages)
        ),
      fae:
        allData.fae /
        teamPerGewerk(
          _teamSize,
          wpValue("fae", _workPackages),
          getWorkPackagesTotal(_workPackages)
        ),
      be:
        allData.be /
        teamPerGewerk(
          _teamSize,
          wpValue("be", _workPackages),
          getWorkPackagesTotal(_workPackages)
        ),
    };
  });
