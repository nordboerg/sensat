export enum SensorType {
  OZONE = 'O3',
  NITROGEN_DIOXIDE = 'NO2',
  CARBON_MONOXIDE = 'CO',
  TEMPERATURE = 'TEMP',
  HUMIDITY = 'RH',
}

export interface ChartDataPoint {
  name: string;
  x: Date;
  y: number;
}

export interface BoxData {
  name: string;
  unit: string;
  data: ChartDataPoint[];
}

export interface SensorGroup {
  [key: string]: BoxData;
}
