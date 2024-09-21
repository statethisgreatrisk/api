import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercase',
  standalone: true
})
export class UpperCasePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;
    return value.toUpperCase();
  }

}
