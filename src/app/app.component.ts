import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit  {
  categories:any = []
  ratings:any = []

  constructor(private firestore: AngularFirestore) {
  }

  async ngOnInit(){
    await this.firestore.collection('categories', ref => ref.orderBy('name')).snapshotChanges().subscribe(categories => {
      this.categories = categories.map(e => e.payload.doc.data())
    });
    await this.firestore.collection('ratings', ref => ref.orderBy('name')).snapshotChanges().subscribe(ratings => {
      this.ratings = ratings.map(e => e.payload.doc.data())
    });
  }
}
