import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, Events } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { FindWorkPage } from '../pages/findwork/findwork';

import { Customer } from '../models/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = LoginPage;
  pages: Array<{title: string, component: any}>;
  customer: Customer;

  constructor(public platform: Platform,
              public menu: MenuController,
              public events: Events,
              public splashScreen: SplashScreen)
  {
    // menu navigation pages
    this.pages = [
      { title: 'Pedir trabajo', component: FindWorkPage },
      { title: 'Próximos servicios', component: 'NextServicesPage' },
      { title: 'Historial servicios', component: 'ServiceHistoricalPage' },
      { title: 'Configuraciones', component: FindWorkPage },
      { title: 'Cerrar sesión', component: null }
    ];
    this.listenToCustomerLogged();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //StatusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  
  openPage(page) {
    if(page.title == 'Cerrar sesión') {
      localStorage.clear();
      this.nav.setRoot(LoginPage);
    } else if(page.title == 'Pedir trabajo') {
      if(this.nav.getActive() != page.component)
        this.nav.setRoot(page.component);
    } else {
      this.nav.push(page.component);
    }
  }

  listenToCustomerLogged() {
    this.events.subscribe('customer:logged', 
      (customer) => {
        this.customer = customer;
      });
  }
}

