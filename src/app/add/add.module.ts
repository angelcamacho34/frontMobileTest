import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EmployeeRepository } from 'src/repositories/employee.repository';
import { EmployeeService } from 'src/services/employee.service';
import { EmployeeWrapper } from 'src/wrappers/employee.wrapper';

import { AddPageRoutingModule } from './add-routing.module';
import { AddPage } from './add.page';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    AddPageRoutingModule,
    HttpClientModule
  ],
  declarations: [AddPage],
  providers: [
    EmployeeService,
    EmployeeRepository,
    EmployeeWrapper
  ]
})
export class AddPageModule { }
