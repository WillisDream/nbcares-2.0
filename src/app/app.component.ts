import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { Platform, IonRouterOutlet, ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(

    public platform: Platform,
    private toastController: ToastController,
    private router: Router,
    private auth : AuthService
  ) {

 
  }


  async ngOnInit() {
    this.auth.checkAuthState();
  }

}
