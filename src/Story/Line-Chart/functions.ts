import { GewerkSettings } from "../data";
import { AllData } from "./interfaces";

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

export const buildDataNonLinear = (
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

      const factorDone = index / _countPoints;
      const stepsLeft = _countPoints - index;
      // be
      // const beforeBe = before && before.be ? before.be : 0;
      // const doingBe: number = workPackagesBe / _countPoints;
      // const valBe: number = beforeBe + doingBe;

      const beforeBe = before && before.be ? before.be : 0;
      const leftBE = workPackagesBe - beforeBe;
      // speed up from 0.4 => 1.6
      const speedBe = 0.4 + 1.2 * factorDone;
      const normalizedHereBe = leftBE / stepsLeft;
      const doingBe: number = normalizedHereBe * speedBe;
      const valBe: number = beforeBe + doingBe;

      // fae
      const beforeFae = before && before.fae ? before.fae : 0;
      // slow down from 6 => 1 until half ... then do it linear
      const speedFae = factorDone <= 0.5 ? 6 - 5 * factorDone : 1;
      const leftFae = workPackagesFAE - beforeFae;
      const normalizedHereFae = leftFae / stepsLeft;
      const doingFae: number = normalizedHereFae * speedFae;
      const valFe: number = beforeFae + doingFae;

      const beforeUi = before && before.ui ? before.ui : 0;
      // slow down from 20 => 0.1
      const speedUI = 20 - 19.9 * factorDone;
      const leftUi = workPackagesUI - beforeUi;
      const normalizedHereUi = leftUi / stepsLeft;
      const doingUi: number = normalizedHereUi * speedUI;
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
