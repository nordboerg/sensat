import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ReadingsItem } from '../readings/readings.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ReadingsDataSource } from '../readings/readings-datasource';

@Component({
  selector: 'app-readings-table',
  templateUrl: './readings-table.component.html',
  styleUrls: ['./readings-table.component.scss'],
})
export class ReadingsTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ReadingsItem>;
  @Input() dataSource: ReadingsDataSource;

  displayedColumns = [
    'id',
    'sensor_type',
    'name',
    'reading',
    'unit',
    'reading_ts',
  ];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
