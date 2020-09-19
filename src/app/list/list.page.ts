import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { EmployeeService } from 'src/services/employee.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit, AfterViewInit {
  employees: any[] = [];
  idSearch = '';

  private subs = new SubSink();
  constructor(
    private service: EmployeeService,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.service.employees$.subscribe(res => {
      this.employees = res.map(employee => {
        return { ...employee, isMoreVisible: false };
      });
    });

    this.subs.sink = this.service.error$.subscribe(res => {
      this.showErrorToast(res);
    });
  }
  ngAfterViewInit(): void {
    this.service.getAllEmployees();
  }

  ionViewDidLeave() {
    this.subs.unsubscribe();
  }

  delete(index: number) {
    this.service.deleteEmployee(index);
  }

  edit(index?: number) {
    const params = index ? { index } : undefined;
    this.navCtrl.navigateRoot('add', { queryParams: params });
  }
  showErrorToast(message: string) {
    this.toastCtrl.create({ message, color: 'danger', duration: 4000 })
      .then(res => { res.present(); });
  }

}
