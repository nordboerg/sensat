import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { bufferCount, map } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { ReadingsItem } from './readings.model';

/**
 * Data source for the Readings view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ReadingsDataSource extends DataSource<ReadingsItem> {
  private webSocketSubject: WebSocketSubject<ReadingsItem>;
  isLoading$: BehaviorSubject<boolean>;
  filter$: BehaviorSubject<string>;
  readings: ReadingsItem[];
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
    this.webSocketSubject = webSocket('ws://localhost:8081');
    this.isLoading$ = new BehaviorSubject(true);
    this.filter$ = new BehaviorSubject('');
    this.readings = [];
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ReadingsItem[]> {
    const dataMutations = [
      of(this.readings),
      this.paginator.page,
      this.sort.sortChange,
    ];

    return merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData(this.getSortedData([...this.readings]));
      }),
    );
  }

  disconnect() {
    this.webSocketSubject.unsubscribe();
  }

  fetchReadings() {
    this.webSocketSubject.pipe(bufferCount(200)).subscribe(
      (data) => {
        this.readings = [...this.readings, ...data];
      },
      (err) => console.log(err),
      () => {
        console.log('stream complete');
        this.isLoading$.next(false);
      },
    );
  }

  private getPagedData(data: ReadingsItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: ReadingsItem[]) {
    const { active, direction } = this.sort;

    if (!active || direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = direction === 'asc';

      switch (active) {
        case 'name':
        case 'id':
        case 'sensor_type':
        case 'unit':
        case 'reading_ts':
          return compare(a[active], b[active], isAsc);
        case 'reading':
          return compare(+a[active], +b[active], isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
