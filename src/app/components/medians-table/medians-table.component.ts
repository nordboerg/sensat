import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ReadingsDataSource } from '../readings/readings-datasource';
import { getSensorTypeGroups } from 'src/app/utils/series';
import { getMedian } from 'src/app/utils/median';
import { MatTable } from '@angular/material/table';
import { MedianItem } from '../readings/readings.model';
import { BoxData, SensorGroup } from '../chart/chart.model';

@Component({
  selector: 'app-medians-table',
  templateUrl: './medians-table.component.html',
  styleUrls: ['./medians-table.component.scss'],
})
export class MediansTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatTable) table: MatTable<MedianItem>;
  @Input() dataSource: ReadingsDataSource;
  sensorGroupsByType: SensorGroup;

  displayedColumns = ['name', 'type', 'median', 'unit'];

  ngOnInit(): void {
    this.sensorGroupsByType = getSensorTypeGroups(this.dataSource.readings);
  }

  ngAfterViewInit(): void {
    this.table.dataSource = this.getMedianData(this.sensorGroupsByType);
  }

  private getMedianData(typeGroups: SensorGroup): MedianItem[] {
    return Object.values(typeGroups)
      .map((type) =>
        Object.values(type).map((box: BoxData) => ({
          name: box.name,
          type: box.data[0].name,
          median: getMedian(box.data.map((item) => item.y)),
          unit: box.unit,
        })),
      )
      .flat();
  }
}
