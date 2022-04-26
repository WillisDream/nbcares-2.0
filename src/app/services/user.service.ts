import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../users/login/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth) {}

  // User related

  public getUserDetailsById(id): Observable<User> {
    return new Observable<User>((observer) => {
      const docRef = this.afs.doc(`users/${id}`);
      const userData = docRef.get().subscribe(
        (res: any) => {
          observer.next(res.data());
          observer.complete();
        },
        (err) => {
          observer.error(err);
        }
      );
    });
  }

  public updateUser(id: string, values: any): Observable<any> {
    return new Observable<any>((observer) => {
      const docRef = this.afs.doc(`users/${id}`);
      docRef.update(values).then(
        (res) => {
          observer.next(res);
          observer.complete();
        },
        (err) => {
          observer.error(err);
        }
      );
    });
  }

  public addUser(userDetails, id): Observable<any> {
    return new Observable<any>((observer) => {
      const docRef = this.afs.doc(`users/${id}`);
      docRef.set(userDetails).then(
        (res) => {
          observer.next(res);
          observer.complete();
        },
        (err) => {
          observer.error(err);
        }
      );
    });
  }

  deleteUser(id: string) {
    return new Observable<any>((observer) => {
      const docRef = this.afs.doc(`users/${id}`);
      docRef.delete().then(
        (res) => {
          observer.next(res);
          observer.complete();
        },
        (err) => {
          observer.error(err);
        }
      );
    });
  }

  public listenToCurrentUser(email) {
    return this.afs
      .doc(`users/${email}`)
      .snapshotChanges()
      .pipe(
        map((changes) => {
          let data = changes.payload.data();
          return data;
        })
      );
  }
}
