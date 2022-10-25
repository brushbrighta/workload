
export interface GewerkSettings {
  name: string
  nameShort: string
  color: string
  value: number
}
export const gewerkOptions: GewerkSettings[] = [
  {
    name: 'Backend',
    nameShort: 'BE',
    color: '#8B1E3F',
    value: 100
  },
  {
    name: 'FAE',
    nameShort: 'FAE',
    color: '#89BD9E',
    value: 50
  },
  {
    name: 'UI/UX',
    nameShort: 'UI',
    color: '#F0C987',
    value: 50
  }
];
