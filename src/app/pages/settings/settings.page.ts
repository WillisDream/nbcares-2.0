import { AuthService } from './../../services/auth.service';
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  constructor(
    private alertController: AlertController,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  async logOut() {
    const alert = await this.alertController.create({
      header: 'Warning',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {},
        },
        {
          text: 'Yes',
          handler: () => {
            this.authService.signOut();
          },
        },
      ],
    });
    await alert.present();
  }
}
