import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { EmployeeService } from 'src/services/employee.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage {
  private alphaRegEx = new RegExp(/^[ñÑÁÉÍÓÚáéíóúA-Za-z _]*[ñÑÁÉÍÓÚáéíóúA-Za-z][ñÑÁÉÍÓÚáéíóúA-Za-z _]*$/);
  private subs = new SubSink();

  employeeForm = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl('', [Validators.required, Validators.pattern(this.alphaRegEx)]),
    apellidoPaterno: new FormControl('', [Validators.required, Validators.pattern(this.alphaRegEx)]),
    apellidoMaterno: new FormControl('', [Validators.pattern(this.alphaRegEx)]),
    fechaNacimiento: new FormControl('', [Validators.required]),
    ingresos: new FormControl('', [Validators.pattern(/^[0-9]+\.?[0-9]*$/)]),
    codigoPostal: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{5}$/)])
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: EmployeeService,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) { }

  today = new Date().toLocaleDateString().split('/');
  todayISO = this.today[2].concat('-', this.today[1].length > 1 ? this.today[1] : '0' + this.today[1], '-', this.today[0]);


  ionViewDidEnter() {
    this.subs.sink = this.activatedRoute.queryParams.subscribe(res => {
      if (res.index) {
        this.service.getAnEmployee(res.index);
      }
    });
    this.subs.sink = this.service.employee$.subscribe(res => {
      this.employeeForm.setValue(res);
    });
  }

  ionViewDidLeave() {
    this.subs.unsubscribe();
  }

  save() {
    this.service.saveEmployee(this.employeeForm.value);
    this.toastCtrl.create({ message: 'Operación exitosa', duration: 4000, color: 'success' })
      .then(elem => {
        elem.present().then(_ => {
          this.navCtrl.navigateRoot('list');
        });
      });
  }
  back() {
    this.navCtrl.navigateRoot('list');
  }
}
