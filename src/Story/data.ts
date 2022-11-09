export type PackageNames = "BE" | "FAE" | "UI";

export interface GewerkSettings {
  name: string;
  nameShort: PackageNames;
  color: string;
  value: number;
}

export const gewerkSettings: GewerkSettings[] = [
  {
    name: "Backend",
    nameShort: "BE",
    color: "#ff6361",
    value: 140,
  },
  {
    name: "FAE",
    nameShort: "FAE",
    color: "#bc5090",
    value: 70,
  },
  {
    name: "UI",
    nameShort: "UI",
    color: "#003f5c",
    value: 30,
  },
];
