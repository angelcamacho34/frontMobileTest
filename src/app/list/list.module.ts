import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EmployeeRepository } from 'src/repositories/employee.repository';
import { EmployeeService } from 'src/services/employee.service';
import { EmployeeWrapper } from 'src/wrappers/employee.wrapper';

import { FilterEmployeesPipe } from '../pipes/filter-employees.pipe';
import { ListPageRoutingModule } from './list-routing.module';
import { ListPage } from './list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ListPage, FilterEmployeesPipe],
  providers: [
    EmployeeService,
    EmployeeRepository,
    EmployeeWrapper
  ]
})
export class ListPageModule { }
