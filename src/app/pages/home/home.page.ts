import { AlertController } from '@ionic/angular';
import { ScoreService } from './../../services/score.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  totalScore;

  ionViewWillEnter() {
    this.totalScore = JSON.parse(localStorage.getItem('user')).points;
  }

  constructor(
    private scoreservice: ScoreService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private router : Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((param) => {
      this.totalScore = JSON.parse(localStorage.getItem('user')).points;
      console.log(this.totalScore);
    });
    var that = this;
    setTimeout(function() { that.showAlert(); }, 1000);
  }

  async showAlert(){
    const alert = await this.alertController.create({
      header: 'Alert',
      message:
        'Please navigate to settings tab. You will then be able to access vital signs page and further instructions',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {},
        },
        {
          text: 'Navigate',
          handler: () => {
            this.router.navigate(['tabs/settings']);
          },
        },
      ],
    });
    await alert.present();
  }

  async openZoom() {
    const alert = await this.alertController.create({
      header: 'Warning',
      message:
        'You will be redirected to zoom, Are you sure you want to continue?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {},
        },
        {
          text: 'Yes',
          handler: () => {
            window.open('https://us05web.zoom.us/j/3760490541?pwd=VmtrcHlnQTVnbnV3dnA0K3Vld0dYUT09');
          },
        },
      ],
    });
    await alert.present();
  }
}
