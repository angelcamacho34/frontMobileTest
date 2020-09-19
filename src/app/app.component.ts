import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      url: '/add',
    },
    {
      url: '/list',
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    private router: Router
  ) {
    this.initializeApp();
  }
  name = 'Agregar';
  icon = 'person-add-outline';

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.router.events.subscribe(res => {

      if (res instanceof NavigationEnd) {
        const url = res.url.split('?');
        if (res.url.indexOf('?') > -1) {
          this.name = 'Editar';
          this.icon = 'create-outline';
        } else {
          this.name = 'Agregar';
          this.icon = 'person-add-outline';
        }

        this.selectedIndex = this.appPages.findIndex(page => page.url === url[0]);
      }
    });

  }
  selectItem(index: number) {
    if (index !== this.selectedIndex) {
      this.selectedIndex = index;
      this.navCtrl.navigateRoot(this.appPages[index].url);
    }
  }
}
