import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, flatMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-mappings',
  templateUrl: './mappings.component.html',
  styleUrls: ['./mappings.component.css']
})
export class MappingsComponent implements OnInit {
  public ayear: Observable<any[]>;
  public layear: any[];
  public classes: Observable<any[]>;
  public localclasses: any[];
  myMForm: FormGroup;
  MappingsRef: AngularFirestoreCollection<any>;
  MappingsRefs: AngularFirestoreCollection<any>;
  public acyear: String;
  isDuplicate: any = 0;
  AYear: Observable<any>;
  ayclasses: any[];
  public tabno: any;

  constructor(private fb: FormBuilder, private db: AngularFirestore, private router: Router) {
    this.ayear = this.db.collection<any>('masters', ref => ref.where('type', '==', 'Acadamic Year')).valueChanges();
    this.ayear.subscribe(ay => { this.layear = ay; });
    this.classes = this.db.collection<any>('masters', ref => ref.where('type', '==', 'Class')
                  .where('active', '==', 'Active'))
                  .valueChanges();
    this.classes.subscribe(myclass => { this.localclasses = myclass; });

    this.MappingsRef = this.db.collection('mappings');
    this.createForm();

  }
  createForm() {
    this.myMForm = this.fb.group({
      ayear: ['', Validators.required],
      ayclasses: ['', Validators.required],
    });
  }

  ngOnInit() {
  }
  loadData(val: String) {
    this.acyear = val;
    this.MappingsRefs = this.db.collection('mappings', ref => ref.where('ayear', '==', this.myMForm.value.ayear).limit(1));
    this.MappingsRefs.valueChanges().subscribe(res => { this.ayclasses = res; });
  }
  async saveMapping() {
    // tslint:disable-next-line:max-line-length
    this.MappingsRefs = await this.db.collection('mappings', ref => ref.where('ayear', '==', this.myMForm.value.ayear).limit(1));
    await this.MappingsRefs.snapshotChanges().subscribe(val => {
      //
      if (val.length === 0) {
        this.MappingsRef.add({ ayear: this.myMForm.value.ayear });
      } else {
        this.updateClasses();
      }
    });
  }
  updateClasses() {
    // tslint:disable-next-line:max-line-length
    this.db.collection('mappings', ref => ref.where('ayear', '==', this.myMForm.value.ayear).limit(1)).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as any;
        data.id = a.payload.doc.id;
        return data;
      });
    })).subscribe(items => {
      this.db.doc(`mappings/${items[0].id}`).update({ classes: this.myMForm.value.ayclasses });
    });
  }

  opentab(number) {
    this.tabno = number;
  }
}
