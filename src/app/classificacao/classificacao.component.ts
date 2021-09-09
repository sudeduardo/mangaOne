import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Ng7DynamicBreadcrumbService} from "ng7-dynamic-breadcrumb";

@Component({
  selector: 'app-classificacao',
  templateUrl: './classificacao.component.html',
  styleUrls: ['./classificacao.component.sass']
})
export class ClassificacaoComponent implements OnInit {
  rating: any = null
  mangas: any = null
  constructor(private route: ActivatedRoute, private firestore: AngularFirestore,private ng7DynamicBreadcrumbService: Ng7DynamicBreadcrumbService) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.firestore.collection('ratings', ref => ref.where('slug', '==', params.path)).snapshotChanges().subscribe(value => {
        this.rating = value[0].payload.doc.data()
        if (this.rating) {
          this.firestore.collection('mangas', ref => ref.where('categories', "array-contains", this.rating.slug)).snapshotChanges().subscribe(mangas => {
            this.mangas = mangas.map(e => e.payload.doc.data())
            const breadcrumb =  this.rating;
            this.ng7DynamicBreadcrumbService.updateBreadcrumbLabels(breadcrumb);
          })
        }
      });

    });

  }

}
