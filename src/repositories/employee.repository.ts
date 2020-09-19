import { Injectable } from '@angular/core';
import { Repository } from './repository';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Employee } from 'src/core/models/employee';

@Injectable()
export class EmployeeRepository extends Repository {
  private port = environment.port;
  private baseUrl = environment.baseUrl;

  constructor(protected http: HttpClient) {
    super(http);
  }

  getAllEmployees() {
    return this.get(
      `${this.baseUrl}:${this.port}/api/intercam/employee`
    );
  }
  getAnEmployee(id: number) {
    return this.get(
      `${this.baseUrl}:${this.port}/api/intercam/employee/${id}`
    );
  }
  saveEmployee(employee: Employee) {
    const params = JSON.stringify(employee);
    return employee.id ? this.post(`${this.baseUrl}:${this.port}/api/intercam/employee/${employee.id}`, params) :
      this.post(`${this.baseUrl}:${this.port}/api/intercam/employee`, params);
  }
  deleteEmployee(id: number) {
    return this.delete(`${this.baseUrl}:${this.port}/api/intercam/employee/${id}`);
  }
}
