import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Employee } from 'src/core/models/employee';
import { EmployeeWrapper } from 'src/wrappers/employee.wrapper';


export interface EmployeStateInterface {
    employees: Employee[];
    currentEmployee: Employee;
}

@Injectable()
export class EmployeeService {

    constructor(
        private wrapper: EmployeeWrapper
    ) { }
    private allEmployees$: Subject<Employee[]> = new Subject();
    private currentEmployee$: Subject<Employee> = new Subject();
    private errorS$: Subject<string> = new Subject();

    // selectors
    get employees$() {
        return this.allEmployees$.asObservable();
    }
    get employee$() {
        return this.currentEmployee$.asObservable();
    }
    get error$() {
        return this.errorS$.asObservable();
    }

    getAllEmployees() {
        this.wrapper.getAllEmployees().subscribe(res => {
            this.allEmployees$.next(res);
        }, () => {
            this.allEmployees$.next([]);
            this.errorS$.next('No se encontraron registros');
        });
    }

    getAnEmployee(id: number) {
        this.wrapper.getAnEmployee(id).subscribe(res => {
            this.currentEmployee$.next(res);
        }, (error) => {
            this.errorS$.next(error);
        });
    }

    deleteEmployee(id: number) {
        this.wrapper.deleteEmployee(id).subscribe(res => {
            this.currentEmployee$.next(res);
            this.getAllEmployees(); // updates when a deletion happens
        }, (error) => {
            this.errorS$.next(error);
        });
    }

    saveEmployee(employee: Employee) {
        this.wrapper.saveEmployee(employee).subscribe(_ => { }, (error) => {
            this.errorS$.next(error);
        });
    }
}
