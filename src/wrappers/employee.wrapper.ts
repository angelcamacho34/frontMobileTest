import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Employee } from 'src/core/models/employee';
import { EmployeeRepository } from 'src/repositories/employee.repository';
import { IWrapper } from './wrapper';


export interface EmployeStateInterface {
    employees: Employee[];
    currentEmployee: Employee;
}

@Injectable()
export class EmployeeWrapper extends IWrapper {

    constructor(private repository: EmployeeRepository) { super(); }

    getAllEmployees(): Observable<Employee[]> {
        return this.repository.getAllEmployees()
            .pipe(map((res: any) => {
                return res.map(emp => {
                    const employee: Employee = {
                        id: emp.id,
                        nombre: emp.nombre,
                        apellidoPaterno: emp.apellidoPaterno,
                        apellidoMaterno: emp.apellidoMaterno,
                        fechaNacimiento: emp.fechaNacimiento,
                        ingresos: emp.ingresos,
                        codigoPostal: emp.codigoPostal
                    };
                    return employee;
                });
            }), catchError(async (ex) => {
                throw this.errorHandle(ex);
            }));
    }

    getAnEmployee(id: number): Observable<Employee> {
        return this.repository.getAnEmployee(id)
            .pipe(map((res: any) => {
                return res;
            }), catchError(async (ex) => {
                throw this.errorHandle(ex);
            }));
    }

    deleteEmployee(id: number): Observable<Employee> {
        return this.repository.deleteEmployee(id)
            .pipe(map((res: any) => {
                return res;
            }), catchError(async (ex) => {
                throw this.errorHandle(ex);
            }));
    }

    saveEmployee(employee: Employee): Observable<Employee> {
        return this.repository.saveEmployee(employee)
            .pipe(map((res: any) => {
                return res;
            }), catchError(async (ex) => {
                throw this.errorHandle(ex);
            }));
    }
}
