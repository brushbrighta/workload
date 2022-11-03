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
    color: "#8B1E3F",
    value: 160,
  },
  {
    name: "FAE",
    nameShort: "FAE",
    color: "#89BD9E",
    value: 60,
  },
  {
    name: "UI",
    nameShort: "UI",
    color: "#F0C987",
    value: 40,
  },
];
