import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from 'src/core/models/employee';

@Pipe({
  name: 'filterEmployees'
})
export class FilterEmployeesPipe implements PipeTransform {

  transform(value: Employee[], filter: string): Employee[] {
    return filter.length ? value.filter(employee => employee.id === Number(filter)) : value;
  }
}
