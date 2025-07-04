import { CategoriesService } from './../../../services/categories/categories.service';
import { BusinessService } from './../../../services/business/business.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-business',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-business.component.html',
  styleUrls: ['./create-business.component.scss']
})
export class CreateBusinessComponent implements OnInit{

  data: string[] = [];

  latitude: number | undefined;
  longitude: number | undefined;
  error: string | undefined;

  allBusiness: string[] = [];
  business: any;
  loading= false;
  delayDuration= 2000;
  success = false;
  teller_infos: any
  t_uid: any
  localisation: any
  coordonne: any
  city: any
  address: any
  allCategories: string[] = [];


  ngOnInit(): void {
    this.loadCategories();

    const user = sessionStorage.getItem('teller_infos');
    const datacoordonne = JSON.parse(sessionStorage.getItem('coordonne') || 'null');

    if (datacoordonne) {
      console.log('coordonne infos trouvé en session:', datacoordonne);
      this.coordonne = datacoordonne;
    } else {
      console.warn('Aucun coordonne trouvé dans sessionStorage');
    }
    this.teller_infos = user
    console.log(this.teller_infos);
    if (user) {
      this.teller_infos = JSON.parse(user);
      this.t_uid = this.teller_infos.t_uid
      this.createbusiness.patchValue({
        t_uid : this.t_uid,
        latitude : this.coordonne.latitude,
        longitude : this.coordonne.longitude
      })
      console.log('t_uid:', this.t_uid);
    }

    const datalocalisation = JSON.parse(sessionStorage.getItem('localisation') || 'null');
    if (datalocalisation) {
      console.log('localisation infos trouvé en session:', datalocalisation);
      this.localisation = datalocalisation;
      this.city = this.localisation.infos_maps.state + ', ' + this.localisation.infos_maps.city;
      this.address = this.localisation.infos_maps.neighbourhood + ', ' + this.localisation.infos_maps.road;
    } else {
      console.warn('Aucun localisation trouvé dans sessionStorage');
    }
  }

  constructor(private router: Router, private fb: FormBuilder, private http: BusinessService, private api: CategoriesService){}

  get typeValue(): string {
    return this.createbusiness.get('type')?.value;
  }

  useCurrentLocation(event: any) {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.city = this.localisation.infos_maps.state + ', ' + this.localisation.infos_maps.city;
      this.address = this.localisation.infos_maps.neighbourhood + ', ' + this.localisation.infos_maps.road;
      this.createbusiness.get('city')?.setValue(this.city);
      this.createbusiness.get('address')?.setValue(this.address);
    } else {
      this.createbusiness.get('city')?.setValue('');
      this.createbusiness.get('address')?.setValue('');
    }
  }

  loadCategories() {
    this.api.ReadAllCategories()?.subscribe({
      next: (response:any) =>{
        this.data = response?.categorie_name
        this.allCategories = this.data.map((category: any) => category?.name);
        console.log(this.allCategories)
      }
    });
  }

  createbusiness: FormGroup = new FormGroup(
    {
      categorie: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      mobile: new FormControl(null, Validators.required),
      image1: new FormControl(null, Validators.required),
      image2: new FormControl(null, Validators.required),
      t_uid: new FormControl(null, Validators.required),
      latitude: new FormControl(null, Validators.required),
      longitude: new FormControl(null, Validators.required),
    }
  )

  Createbusiness() {
    this.loading = true;
    let body = this.createbusiness?.value;

    this.http.CreateBusiness(body).subscribe({
      next: (reponse: any) => {
        console.log(reponse);
        if (reponse?.status === 'success') {
          this.data = reponse;
          Swal.fire({
            title: 'Succès !',
            text: 'L\'entité a été créée avec succès !',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#dda706'
          }).then(() => {
            window.location.reload();  // Recharger la page après 3 secondes
          });
        } else {
          Swal.fire({
            title: 'Erreur !',
            text: reponse?.error_description || 'Échec de création.',
            icon: 'error',
            confirmButtonText: 'Réessayer',
            confirmButtonColor: '#ff6c2f'
          });
        }
      },
      error: (error) => {
        console.error(error);
        setTimeout(() => {
          this.loading = false;
        }, this.delayDuration);
      }
    });
  }


  navigateToRead() {
    this.router.navigate(['/teller/business/readall-business']);
  }

  GetLocalisation(){
  }

}
