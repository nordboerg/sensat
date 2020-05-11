import { Component, OnInit } from '@angular/core';
import { ReadingsDataSource } from './readings-datasource';

@Component({
  selector: 'app-readings',
  templateUrl: './readings.component.html',
  styleUrls: ['./readings.component.scss'],
})
export class ReadingsComponent implements OnInit {
  dataSource: ReadingsDataSource;

  ngOnInit(): void {
    this.dataSource = new ReadingsDataSource();
    this.dataSource.fetchReadings();
  }
}
