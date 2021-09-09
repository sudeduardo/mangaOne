import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-titulos',
  templateUrl: './titulos.component.html',
  styleUrls: ['./titulos.component.sass']
})
export class TitulosComponent implements OnInit {
  mangas:any = null
  constructor(private firestore: AngularFirestore) {
  }

  async ngOnInit(){
    await this.firestore.collection('mangas').snapshotChanges().subscribe(manga => {
      this.mangas = manga.map(e => e.payload.doc.data())
    });
  }

}
