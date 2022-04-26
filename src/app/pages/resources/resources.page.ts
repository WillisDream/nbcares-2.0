import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.page.html',
  styleUrls: ['./resources.page.scss'],
})
export class ResourcesPage implements OnInit {

  constructor(private alertController : AlertController) { }

  ngOnInit() {
  }

  async goToWebsite(){
    const alert = await this.alertController.create({
      header: 'Warning',
      message: 'You will be redirected to an external website, Are you sure you want to continue?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {},
        },
        {
          text: 'Yes',
          handler: () => {
          window.open('https://jmkryzanski.pythonanywhere.com/resources')
          },
        },
      ],
    });
    await alert.present();
  }

}
