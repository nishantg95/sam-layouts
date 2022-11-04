import { Injectable } from '@angular/core';
import {
  SDSAutocompleteServiceInterface,
  SDSHiercarchicalServiceResult,
} from '@gsa-sam/components';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AutocompleteData } from './autocomplete.data';
import { KnowledgeBaseArticles } from '../../../header/SampleFsdData';

@Injectable()
export class AutocompleteService implements SDSAutocompleteServiceInterface {
  private _data  = KnowledgeBaseArticles;

  getDataByText(
    currentItems: number,
    searchValue?: string
  ): Observable<SDSHiercarchicalServiceResult> {
    const itemIncrease = 25;
    const data = of(this._data);
    let items$: Observable<Object[]>;

    if (searchValue) {
      items$ = data.pipe(
        map((items) =>
          items.filter(
            (item) =>
              // item.title.indexOf(searchValue) !== -1 ||
              // item.text.indexOf(searchValue) !== -1
              item.label.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 ||
              item.text.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
          )
        )
      );
    } else {
      items$ = data;
    }

    let items: object[];
    items$.subscribe((result) => {
      items = result;
    });
    const totalItemCount = items.length;

    let maxSectionPosition = currentItems + itemIncrease;
    if (maxSectionPosition > totalItemCount) {
      maxSectionPosition = totalItemCount;
    }
    const subItemsitems = items.slice(currentItems, maxSectionPosition);

    const returnItem = {
      items: subItemsitems,
      totalItems: totalItemCount,
    };
    return of(returnItem);
  }
  setData(newData:any){
    console.log(newData)
    if(newData.length > 0)
      this._data = newData;
  }
}
