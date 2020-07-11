import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Student } from '../models/student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  collection: AngularFirestoreCollection<Student>;
  collection$: Observable<any>;
  Students: Observable<Student[]>;
  public students: Student[];
  StudentDoc: AngularFirestoreDocument<Student>;

  constructor(private db: AngularFirestore, private router: Router) {
    this.collection = this.db.collection<Student>('Students');
    // this.collection$ = this.collection.valueChanges();
    // sconsole.log(this.collection$);
  }

  ngOnInit() {
    this.Students = this.collection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Student;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

    this.Students.subscribe(student => { this.students = student; });

  }
  addStudent() {
    this.router.navigate(['addStudent']);
  }
  deleteStudent(event, student: Student) {
    const response = confirm('are you sure you want to delete?');
    if (response) {
      this.StudentDoc = this.db.doc(`Students/${student.id}`);
      this.StudentDoc.delete();
    }
    return;
  }

}
