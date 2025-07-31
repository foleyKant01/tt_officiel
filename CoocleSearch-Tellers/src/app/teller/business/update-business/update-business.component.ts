import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BusinessService } from '../../../services/business/business.service';
import { CategoriesService } from '../../../services/categories/categories.service';

declare var bootstrap: any;


@Component({
  selector: 'app-update-business',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './update-business.component.html',
  styleUrls: ['./update-business.component.scss']
})

export class UpdateBusinessComponent implements OnInit{

  updatebusiness!: FormGroup;
  all_business: any  // charge depuis backendv
  allCategories: string[] = [];
  data: any  // charge depuis backendv
  businessId!: string;
  loading = false;
  isEditing: boolean = false;
  localisation: any
  coordonne: any
  city: any
  file: any
  type: any
  single_business: any
  selectedFile: File | null = null;
  bu_picture: string = '';
  address: any
  latitude: any
  longitude: any

  constructor( private http: BusinessService, private route: ActivatedRoute ) {}


  ngOnInit(): void {
    const storedData = JSON.parse(sessionStorage.getItem('single_business') || '{}');
    this.single_business = storedData
    this.type = this.single_business.bu_type
    console.log('single_business:', this.single_business);

    // this.bu_picture = storedData.bu_picture || 'assets/img/default.jpg';  // affichage image actuelle
    // console.log('bu_picture: ', this.bu_picture);

    this.updatebusiness = new FormGroup({
      bu_uid: new FormControl(storedData.bu_uid || ''),
      bu_type: new FormControl(storedData.bu_type || ''),
      bu_name: new FormControl(storedData.bu_name || ''),
      bu_description: new FormControl(storedData.bu_description || ''),
      bu_city: new FormControl(storedData.bu_city || ''),
      phone: new FormControl(storedData.phone || ''),
      bu_address: new FormControl(storedData.bu_address || ''),
      bu_website: new FormControl(storedData.bu_website || ''),
      latitude: new FormControl(storedData.latitude || ''),
      longitude: new FormControl(storedData.longitude || '')
    });

    const datalocalisation = JSON.parse(sessionStorage.getItem('localisation') || 'null');
    const datacoordonne = JSON.parse(sessionStorage.getItem('coordonne') || 'null');

    if (datalocalisation) {
      this.localisation = datalocalisation;
      const infos = this.localisation.infos_maps;

      this.city = [infos.state, infos.city].filter(Boolean).join(', ');
      this.address = [infos.suburb, infos.neighbourhood, infos.road].filter(Boolean).join(', ');
    }

    if (datacoordonne) {
      this.coordonne = datacoordonne;
      this.latitude = this.coordonne.latitude
      this.longitude = this.coordonne.longitude
    }

    this.updatebusiness.patchValue({
      latitude: this.latitude,
      longitude: this.longitude,
      });
    this.updatebusiness.get('bu_type')?.valueChanges.subscribe((value: string) => {
      if (value === 'physique') {
        this.updatebusiness.patchValue({
          bu_city: this.city,
          bu_address: this.address,
        });
      } else {
        this.updatebusiness.patchValue({
          bu_city: '',
          bu_address: ''
        });
      }
    });
  }

  get typeValue(): string {
    return this.updatebusiness.get('bu_type')?.value;
  }


  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Prévisualisation facultative
      const objectUrl = URL.createObjectURL(file);
      this.bu_picture = objectUrl;
    }
  }

  updateBusiness() {

    if (this.updatebusiness.valid) {
      this.loading = true;

      const formData: FormData = new FormData();
      formData.append('bu_uid', this.updatebusiness.get('bu_uid')?.value);
      formData.append('bu_type', this.updatebusiness.get('bu_type')?.value);
      formData.append('bu_name', this.updatebusiness.get('bu_name')?.value);
      formData.append('bu_description', this.updatebusiness.get('bu_description')?.value);
      formData.append('bu_city', this.updatebusiness.get('bu_city')?.value);
      formData.append('phone', this.updatebusiness.get('phone')?.value);
      formData.append('bu_address', this.updatebusiness.get('bu_address')?.value);
      // if (this.selectedFile) {
      //   formData.append('bu_picture', this.selectedFile);
      // }
      formData.append('latitude', this.updatebusiness.get('latitude')?.value);
      formData.append('longitude', this.updatebusiness.get('longitude')?.value);

      this.http.UpdateBusiness(formData).subscribe({
        next: (res: any) => {
          console.log('Response:', res);
          if (res?.status === 'success') {
            const updatedData = this.updatebusiness.value;
            console.log('Updated Business:', updatedData);
            sessionStorage.setItem('single_business', JSON.stringify(res.business));
            this.isEditing = false;
            this.data = res;
            if (res.business) {
              this.showSuccessToast('Mise à jour réussie');
            } else {
              this.showErrorToast("Erreur : données incomplètes");
            }
          } else {
            this.showErrorToast("Échec de la mise à jour. Veuillez réessayer.");
          }
        },
        error: (err) => {
          console.error('Erreur :', err);
          this.showErrorToast("Une erreur est survenue. Veuillez réessayer.");
        },
        complete: () => {
          this.loading = false; // Assure que le loading est désactivé à la fin
        }
      });
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.ngOnInit(); // Re-initialize form
  }

  showSuccessToast(message: string) {
    const toastBody = document.getElementById('successToastBody');
    if (toastBody) {
      toastBody.textContent = message;
    } else {
      console.warn('Success toast body element not found.');
    }
    const toastElement = document.getElementById('successToast');
    const toast = new bootstrap.Toast(toastElement, { delay: 2000 });
    toast.show();
  }

  showErrorToast(message: string) {
    const toastBody = document.getElementById('errorToastBody');
    if (toastBody) {
      toastBody.textContent = message;
    } else {
      console.warn('Error toast body element not found.');
    }
    const toastElement = document.getElementById('errorToast');
    const toast = new bootstrap.Toast(toastElement, { delay: 2000 });
    toast.show();
  }


}
