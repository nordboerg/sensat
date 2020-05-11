import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { ReadingsItem } from '../readings/readings.model';
import { SensorGroup } from './chart.model';
import { getSensorTypeGroups } from 'src/app/utils/series';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input() readings: ReadingsItem[];
  charts: Chart[];
  sensorGroupsByType: SensorGroup;

  ngOnInit(): void {
    this.sensorGroupsByType = getSensorTypeGroups(this.readings);
    this.charts = this.getCharts(this.sensorGroupsByType);
  }

  private getCharts(typeGroups: SensorGroup) {
    return Object.values(typeGroups).map((box) => new Chart({
      chart: {
        type: 'line',
        zoomType: 'x',
      },
      credits: {
        enabled: false,
      },
      title: {
        text:  Object.values(box)[0].data[0].name,
      },
      xAxis: {
        type: 'datetime',
        labels: {
          formatter() {
            return Highcharts.dateFormat('%d/%m %H:%M', this.value);
          },
        },
      },
      yAxis: {
        title: {
          text: Object.values(box)[0].unit,
        },
      },
      series: [...Object.values(box)],
    }));
  }
}
