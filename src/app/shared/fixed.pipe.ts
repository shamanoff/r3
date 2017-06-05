import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fixed'
})
export class FixedPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
