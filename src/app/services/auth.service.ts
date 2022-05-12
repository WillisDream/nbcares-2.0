import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  emailVerified: boolean;
  userSubscription: Subscription = new Subscription();

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router,
    private ngZone: NgZone,
    private navCtrl: NavController,
    private userService: UserService
  ) {}

  public checkAuthState() {
    var that = this;
    this.afAuth.onAuthStateChanged(function (user) {
      if (user) {
        that.listenToUser(user.uid);
      } else {
        that.ngZone.run(() => {
          that.signOut();
        });
      }
    });
  }

  registerUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password).then(
        (res) => resolve(res),
        (err) => reject(err)
      );
    });
  }

  listenToUser(uid) {
    this.userSubscription = this.userService
      .listenToCurrentUser(uid)
      .subscribe((res) => {
        if (res) {
          localStorage.setItem('user', JSON.stringify(res));
        } else {
        }
      });
  }

  logoutUser() {
    return new Promise((resolve, reject) => {
      if (this.afAuth.currentUser) {
        this.afAuth
          .signOut()
          .then(() => {
            resolve(true);
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  }

  forgotPassword(email) {
    return new Promise((resolve, reject) => {
      this.afAuth.sendPasswordResetEmail(email).then(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  userDetails() {
    return this.afAuth.user;
  }

  async signOut() {
    await this.afAuth.signOut();
    this.userSubscription.unsubscribe();
    localStorage.clear();
    this.navCtrl.navigateRoot('/login');
  }
}
