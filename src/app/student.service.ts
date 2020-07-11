import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { Student } from './models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  public studentCount = new BehaviorSubject(0);
  studentlenth: number;

  constructor(private db: AngularFirestore) {
  }
  init() {
    this.db.collection('Students').snapshotChanges().subscribe(student => { this.studentlenth = student.length; });
   // alert(this.studentlenth);
    this.studentCount.next(this.studentlenth);
  }

}
