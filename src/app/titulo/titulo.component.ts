import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Ng7DynamicBreadcrumbService} from "ng7-dynamic-breadcrumb";
import {Location} from '@angular/common';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.sass']
})
export class TituloComponent implements OnInit {
  manga: any = null
  item: any = null;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private ng7DynamicBreadcrumbService: Ng7DynamicBreadcrumbService, private Location: Location) {
  }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      let name = this.Location.path().includes('classificao') ? 'ratings' : this.Location.path().includes('categoria') ? 'categories' : null

      if (name) {
        this.firestore.collection(name, ref => ref.where('slug', '==', params.path)).snapshotChanges().subscribe(value => {
          this.item = value[0].payload.doc.data()
          this.firestore.collection('mangas', ref => ref.where('slug', "==", params.slug)).snapshotChanges().subscribe(mangas => {
            this.manga = mangas[0].payload.doc.data()
            const breadcrumb = {item_name: this.item.name, manga_name: this.manga.name};
            this.ng7DynamicBreadcrumbService.updateBreadcrumbLabels(breadcrumb);
          })
        });
      } else {
        this.firestore.collection('mangas', ref => ref.where('slug', "==", params.path)).snapshotChanges().subscribe(mangas => {
          this.manga = mangas[0].payload.doc.data()
          const breadcrumb = {manga_name: this.manga.name};
          this.ng7DynamicBreadcrumbService.updateBreadcrumbLabels(breadcrumb);
        })
      }

    });
  }

}
