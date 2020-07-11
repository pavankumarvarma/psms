import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Teacher } from '../../models/teacher';
import { CoreService } from '../../shared/core.service';



@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {
  public teacher = new Teacher();
  public qualifications: Observable<any[]>;
  public lqualifications: any[];
  myTForm: FormGroup;
  teachersRef: AngularFirestoreCollection<Teacher>;
  // teachers: Observable<Teacher[]>;
  constructor(private fb: FormBuilder, private db: AngularFirestore, private router: Router) {
    this.qualifications = this.db.collection<any>('masters', ref => ref.where('type', '==' , 'Qualification')).valueChanges();
    this.qualifications.subscribe(qual => { this.lqualifications = qual; });
    this.teachersRef = this.db.collection('Teachers');
    this.createForm();

   }

  ngOnInit() {
  }

  createForm() {
    this.myTForm = this.fb.group({
      name: ['', Validators.required ],
      fathername: ['', Validators.required ],
      qualification: ['', Validators.required ],
      experience: ['', Validators.required ],
      dob: ['', Validators.required ],
      bgroup: [''],
      contactno: ['', Validators.required],
      contactmail: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required]
   });
  }
  saveTeacher() {
    // this.teachersRef.add({name: this.teacher.name,
      //                fathername: this.teacher.fathername,
        //              qualification: this.teacher.qualification,
          //            dob: this.teacher.dob});
     this.router.navigate(['teachers']);
  }

}
