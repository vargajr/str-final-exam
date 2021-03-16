import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: null | any[] , phrase: string): any[] | null  {
    
    if (!Array.isArray(value) || !phrase) {
      return value;
    }

    phrase = ('' + phrase).toLowerCase();

    return value.filter( item => {
      const strItem:string = ('' + item.name).toLowerCase();
      return strItem.includes(phrase);
    });
    
  }

}