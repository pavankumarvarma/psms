import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from '../../models/student';



@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.css']
})
export class AddstudentComponent implements OnInit {

  myForm: FormGroup;
  public classes: Observable<any[]>;
  public localclasses: any[];
  studentsRef: AngularFirestoreCollection<Student>;
  public student = new Student();

  constructor(private db: AngularFirestore, private fb: FormBuilder, private router: Router) {
    this.classes = this.db.collection<any>('masters', ref => ref.where('type', '==' , 'Class')).valueChanges();
    this.classes.subscribe(myclass => { this.localclasses = myclass; });
    this.studentsRef = this.db.collection<Student>('Students');
    this.createForm();
  }
  createForm() {
    this.myForm = this.fb.group({
      name: ['', Validators.required ],
      fathername: ['', Validators.required ],
      mothername: ['', Validators.required ],
      dob: ['', Validators.required ],
      bgroup: ['']
   });
  }
  ngOnInit() {
  }
  SaveStudent() {
    if (this.myForm.valid) {
      this.studentsRef.add({name: this.myForm.value.name,
        fathername: this.myForm.value.fathername,
        mothername: this.myForm.value.mothername,
        dob: this.myForm.value.dob,
        bgroup: this.myForm.value.bgroup});
      this.myForm.reset();
      this.router.navigate(['students']);
    } else { alert('find some errors');  }


  }

}
