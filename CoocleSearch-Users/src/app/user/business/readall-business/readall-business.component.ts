import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BusinessService } from '../../services/users/business.service';
declare var $:any
@Component({
  selector: 'app-readall-business',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './readall-business.component.html',
  styleUrls: ['./readall-business.component.scss']
})
export class ReadallBusinessComponent implements OnInit{

  business: any[] = [];
  dataCategorie: any[] = [];
  deleteResult: any[] = [];
  dataBusiness: any[] = [];
  allBusiness: string[] = [];
  allCategories: string[] = [];
  tellerUid: string | undefined;



  constructor(private router: Router, private http: BusinessService){}

  ngOnInit(): void {
    // this.route.params.subscribe(params => {
    //   this.tellerUid = params['t_uid']; // (+) converts string 'id' to a number
    // });
    // console.log('hlkhjlh: ',this.tellerUid);

  }


  Readsinglebusiness(bu_uid: number): void {
    this.router.navigate(['/teller/business/readsingle-business', bu_uid]);
  }


  // Deleteproduct(bu_uid: any): void {
  //   console.log(bu_uid)
  //   if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
  //     this.http.DeleteBusiness(bu_uid).subscribe({
  //       next: (response: any) => {
  //         console.log('Product deleted successfully:', response);
  //         this.deleteResult = response?.status
  //         console.log(this.deleteResult)

  //         // Actualiser la liste des produits après la suppression
  //         // this.viewallProducts();
  //       },
  //       error: (error) => {
  //         console.error('Failed to delete product:', error);
  //       }
  //     });
  //   }
  // }





  // readsingleProducts(pr_uid: number, type: string): void {
  //   this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  //     this.router.navigate(['/user/read-single-product', pr_uid, type]));
  // }

}
