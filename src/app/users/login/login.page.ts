import { AuthService } from './../../services/auth.service';
import { AlertService } from './../../services/alert.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  showWarnings: boolean = false;

  constructor(
    private userService: UserService,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private auth: AuthService,
    private navCtrl: NavController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.minLength(6),
        Validators.maxLength(25),
      ]),
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.loadingCtrl.create({ keyboardClose: true }).then((loadingEl) => {
        loadingEl.present();
        let data = {
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
        };
        this.auth.loginUser(data).then(
          (data) => {
            this.userService.getUserDetailsById(data.user.uid).subscribe(
              (res: any) => {
                loadingEl.dismiss();
                if (res) {
                  res.email = data.user.email;
                  res.uid = data.user.uid;
                  localStorage.setItem('user', JSON.stringify(res));
                } else {
                  localStorage.setItem(
                    'user',
                    JSON.stringify({
                      email: data.user.email,
                      id: data.user.uid,
                    })
                  );
                }
                console.log(res);
                this.loginForm.reset();
                this.showWarnings = false;
                if (res && res.isFormFilled) {
                  localStorage.setItem('id', data.user.uid);
                  this.navCtrl.navigateRoot('/tabs/home');
                } else {
                  this.router.navigate(['/sign-form']);
                }
              },
              (err) => {
                console.log(err);
                loadingEl.dismiss();
                this.alertService.showFirebaseAlert(err);
              }
            );
          },
          (err) => {
            console.log(err);
            loadingEl.dismiss();
            this.alertService.showFirebaseAlert(err);
          }
        );
      });
    } else {
      this.showWarnings = true;
    }
  }
}
