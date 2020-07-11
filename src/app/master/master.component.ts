import { Component, OnInit, createPlatformFactory } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  public Types: String[] = ['Subject', 'Section', 'Class', 'Group', 'Designation', 'Qualification', 'Sports', 'Acadamic Year'];

  MastersRef: AngularFirestoreCollection<any>;
  Masters: Observable<any[]>;
  public masters: any[];
  myMForm: FormGroup;
  public mastertype: String;
  MasterDoc: AngularFirestoreDocument<any>;

  constructor(private fb: FormBuilder, private db: AngularFirestore) {

    this.MastersRef = this.db.collection('masters', ref => ref.orderBy('type'));
    this.createform();
  }
  createform() {
    this.myMForm = this.fb.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  ngOnInit() {

    this.Masters = this.MastersRef.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as any;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    this.Masters.subscribe(master => { this.masters = master; });
  }
  saveMaster() {
    this.MastersRef.add({ type: this.myMForm.value.type, name: this.myMForm.value.name, active: 'Active' });
    this.myMForm.reset();
  }
  loadData(value: String) {
    this.mastertype = value;
  }
  changeStatus(event, master: any) {

    this.MasterDoc = this.db.doc(`masters/${master.id}`);
    let lActive: String = 'Active';
    if (lActive === master.active) {
      lActive = 'Not Active';
    } else { lActive = 'Active'; }

    this.MasterDoc.update({ active: lActive });
  }
  deleteMaster(event, master: any) {

    const response = confirm('are you sure you want to delete?');
    if (response) {
      this.MasterDoc = this.db.doc(`masters/${master.id}`);
      this.MasterDoc.delete();
    }
    return;
  }

}
