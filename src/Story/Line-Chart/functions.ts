import {GewerkSettings} from "../config";
import {AllData} from "./interfaces";


export const buildDataLinear = (_countPoints: number, _workPackages: GewerkSettings[]): AllData[] => {

  const workPackagesBe = _workPackages.find(w => w.nameShort === 'BE').value;
  const workPackagesFAE = _workPackages.find(w => w.nameShort === 'FAE').value;
  const workPackagesUI = _workPackages.find(w => w.nameShort === 'UI').value;

  return Array.from({length: _countPoints})
    .reduce<AllData[]>((array: AllData[], _: undefined, index: number) => {
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
        }
      ];
    }, []);
}

export const buildDataNonLinear = (_countPoints: number, _workPackages: GewerkSettings[]): AllData[] => {

  const workPackagesBe = _workPackages.find(w => w.nameShort === 'BE').value;
  const workPackagesFAE = _workPackages.find(w => w.nameShort === 'FAE').value;
  const workPackagesUI = _workPackages.find(w => w.nameShort === 'UI').value;

  return Array.from({length: _countPoints})
    .reduce<AllData[]>((array: AllData[], _: undefined, index: number) => {
      const before: AllData | undefined = array[index - 1];

      // be
      const beforeBe = before && before.be ? before.be : 0;
      const doingBe: number = workPackagesBe / _countPoints;
      const valBe: number = beforeBe + doingBe;

      // fae
      const beforeFae = before && before.fae ? before.fae : 0;
      const left = workPackagesFAE - beforeFae;
      const doingFae: number = left / 20;
      const valFe: number = beforeFae + doingFae;

      // ui
      const beforeUi = before && before.ui ? before.ui : 0;
      const leftUi = workPackagesUI - beforeUi;
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
