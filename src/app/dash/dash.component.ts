import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { StudentService } from '../shared/student.service';
import { CoreService } from '../shared/core.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  public sCount: any = 0;
  public tCount: any = 0;
  public qualifications: any[];
  constructor(private sService: StudentService, private core: CoreService, private db: AngularFirestore) {
    this.db.collection('Students').snapshotChanges().subscribe(student => { this.sCount = student.length; });
    this.db.collection('Teachers').snapshotChanges().subscribe(teacher => { this.tCount = teacher.length; });
    // alert(this.studentlenth);
    this.qualifications = this.core.qualifications;
  }

  ngOnInit() {
  }

  getCount() {
    this.sService.studentCount.subscribe((val) => { this.sCount = val; });
  }

}
