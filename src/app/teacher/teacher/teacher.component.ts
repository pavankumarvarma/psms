import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Teacher } from '../../models/teacher';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  collection: AngularFirestoreCollection<Teacher>;
  collection$: Observable<any>;
  Teachers: Observable<Teacher[]>;
  public teachers: Teacher[];
  teacherDoc: AngularFirestoreDocument<Teacher>;

  constructor(private db: AngularFirestore, private router: Router) {
    this.collection = this.db.collection<Teacher>('Teachers');

  }

  ngOnInit() {
    this.Teachers = this.collection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Teacher;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

    this.Teachers.subscribe(teacher => { this.teachers = teacher; });
  }

  addTeacher() {
    this.router.navigate(['addteacher']);
  }
  deleteTeacher(event, teacher: Teacher) {
    const response = confirm('are you sure you want to delete?');
    if (response) {
      this.teacherDoc = this.db.doc(`Teachers/${teacher.id}`);
      this.teacherDoc.delete();
    }
    return;
  }

}
