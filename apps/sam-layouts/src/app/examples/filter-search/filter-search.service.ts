import { Injectable } from '@angular/core';
import { SearchParameters, SearchResult } from '@gsa-sam/layouts';
import { asyncScheduler, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FilterSearchService {
  public getData(search: SearchParameters): Observable<SearchResult> {
    return of({
      totalItems: 3,
      items: ['Lorem', 'Ipsum', 'Doler'],
    }, asyncScheduler).pipe(delay(1000));
  }
}
