import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { ChartModule } from 'angular-highcharts';

import { AppComponent } from './app.component';
import { ReadingsComponent } from './components/readings/readings.component';
import { ChartComponent } from './components/chart/chart.component';
import { ReadingsTableComponent } from './components/readings-table/readings-table.component';
import { MediansTableComponent } from './components/medians-table/medians-table.component';

@NgModule({
  declarations: [
    AppComponent,
    ReadingsComponent,
    ChartComponent,
    ReadingsTableComponent,
    MediansTableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ChartModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    LayoutModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
