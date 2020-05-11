import { ReadingsItem } from '../components/readings/readings.model';
import { SensorGroup, ChartDataPoint } from '../components/chart/chart.model';

export const getSensorTypeGroups = (readings: ReadingsItem[]): SensorGroup => {
  return readings.reduce((acc, current) => {
    const { box_id, name, sensor_type, reading, unit, reading_ts } = current;

    const dataPoint: ChartDataPoint = {
      name,
      x: new Date(reading_ts),
      y: reading,
    };

    acc = {
      ...acc,
      [sensor_type]: {
        ...acc[sensor_type],
        [box_id]: {
          unit,
          name: box_id,
          data: acc[sensor_type] && acc[sensor_type][box_id]
            ? [...acc[sensor_type][box_id].data, dataPoint]
            : [dataPoint],
        },
      },
    };

    return acc;
  }, {});
};
