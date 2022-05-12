import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VitalSignsService {

  constructor(private afs: AngularFirestore) {}

    addSigns(uid, data){
      return new Observable<any>((observer) => {
        const docRef = this.afs
          .collection(`users/${uid}/tasks`)
          .add(data)
          .then(
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
}
