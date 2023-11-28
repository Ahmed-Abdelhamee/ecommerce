import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mycurrency'
})
export class MycurrencyPipe implements PipeTransform {

  transform( val:number ): string {
    return `${val}.00 د.ك `;
  }

}
