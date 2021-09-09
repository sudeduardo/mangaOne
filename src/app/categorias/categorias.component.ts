import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import { Ng7DynamicBreadcrumbService } from 'ng7-dynamic-breadcrumb';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.sass']
})
export class CategoriasComponent implements OnInit {

  category: any = null
  mangas: any = null

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore,private ng7DynamicBreadcrumbService: Ng7DynamicBreadcrumbService) {
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.firestore.collection('categories', ref => ref.where('slug', '==', params.path)).snapshotChanges().subscribe(value => {
        this.category = value[0].payload.doc.data()
        if (this.category) {
          this.firestore.collection('mangas', ref => ref.where('categories', "array-contains", this.category.slug)).snapshotChanges().subscribe(mangas => {
            this.mangas = mangas.map(e => e.payload.doc.data())
            const breadcrumb =  this.category;
            this.ng7DynamicBreadcrumbService.updateBreadcrumbLabels(breadcrumb);
          })
        }
      });

    });

  }

}
