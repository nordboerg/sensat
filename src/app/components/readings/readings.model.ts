export interface ReadingsItem {
  id: string;
  box_id: string;
  sensor_type: string;
  name: string;
  range_l: number;
  range_u: number;
  longitude: number;
  latitude: number;
  reading: number;
  unit: string;
  reading_ts: string;
}

export interface MedianItem {
  name: string;
  type: string;
  median: number;
  unit: string;
}
