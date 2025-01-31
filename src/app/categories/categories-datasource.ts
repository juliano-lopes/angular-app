import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { CategoryService } from './category.service';
import { CategoriesItem } from './category.dto';

// TODO: Replace this with your own data model type

// TODO: replace this with real data from your application
/*
const EXAMPLE_DATA: CategoriesItem[] = [
  {id: "a", name: 'Hydrogen'},
  {id: "b", name: 'Helium'},
  {id: "c", name: 'Lithium'},
];
*/

/**
 * Data source for the Categories view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class CategoriesDataSource extends DataSource<CategoriesItem> {
  data: CategoriesItem[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(categories: CategoriesItem[]) {
    super();
    this.data = categories;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<CategoriesItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: CategoriesItem[]): CategoriesItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: CategoriesItem[]): CategoriesItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'description': return compare(a.name, b.name, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return a && a.id && b && b.id ? compare(+a.id, +b.id, isAsc) : 0;
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
