import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TellersService } from '../../../../services/tellers/tellers.service';

declare const bootstrap: any

@Component({
  selector: 'app-readall-tellers',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './readall-tellers.component.html',
  styleUrl: './readall-tellers.component.scss'
})
export class ReadallTellersComponent implements OnInit{

  dataTeller: any[] = [];
  dataRegisterTeller: any[] = [];
  allTeller: string[] = [];
  teller: any[] = [];

  constructor( private http: TellersService, private router: Router, ){}

  ngOnInit(): void {
    this.Readallteller()
  }

  Readallteller(){
    this.http.ReadAllTeller().subscribe({
      next: (response: any) => {
        this.allTeller = response || []; // Stocker les produits dans le tableau
        if(response?.teller)  {
          this.dataTeller = response?.teller
          console.log(this.dataTeller)
        }
      },
    })
  }


  Readsingleteller(t_uid: number): void {
    this.router.navigate(['/admin/users/tellers/readsingle-tellers', t_uid]);
  }


  register_teller_form: FormGroup = new FormGroup({
    t_fullname: new FormControl(null, Validators.required),
    t_username: new FormControl(null, Validators.required),
    t_mobile: new FormControl(null, Validators.required),
    t_address: new FormControl(null, Validators.required),
    t_email: new FormControl(null, Validators.required),
    t_password: new FormControl(null, Validators.required),
    t_city: new FormControl(null, Validators.required),

  });


  Createteller(){
    if (this.register_teller_form.value){
      let body = this.register_teller_form.value
      this.http.CreateTeller(body).subscribe({
        next:(res: any) =>{
          if (res?.status === 'Success') {
            this.dataRegisterTeller = res?.teller_infos;
            this.showSuccessToast('Teller created successfully!');
            this.register_teller_form.reset();
          } else {
            const errorMessage =
              res?.error_description || 'Failed to create teller.';
            this.showErrorToast(errorMessage);
          }
        },
      })
    }
  }

  // allSupervisors(){
  //   this.http.GetAllSupervisor({}).subscribe({
  //     next:(res: any) =>{
  //       this.supervisor_data = res?.supervisor
  //   },
  //   error:(err: any) =>{
  //     console.log(err);

  //   },
  //   complete() {
  //       console.log('complete');

  //   },
  //   })
  // }


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
    const toast = new bootstrap.Toast(toastElement, { delay: 5000 });
    toast.show();
  }

  resetForms() {
    this.register_teller_form.reset();
  }

  closeUserModal() {
    this.resetForms();
  }

  flagIcons = [
    { className: "flag-icon flag-icon-ad", countryCode: "AD", countryIsoCode: "+376", countryName: "Andorre" },
    { className: "flag-icon flag-icon-ae", countryCode: "AE", countryIsoCode: "+971", countryName: "Émirats arabes unis" },
    { className: "flag-icon flag-icon-af", countryCode: "AF", countryIsoCode: "+93", countryName: "Afghanistan" },
    { className: "flag-icon flag-icon-ag", countryCode: "AG", countryIsoCode: "+1-268", countryName: "Antigua-et-Barbuda" },
    { className: "flag-icon flag-icon-ai", countryCode: "AI", countryIsoCode: "+1-264", countryName: "Anguilla" },
    { className: "flag-icon flag-icon-al", countryCode: "AL", countryIsoCode: "+355", countryName: "Albanie" },
    { className: "flag-icon flag-icon-am", countryCode: "AM", countryIsoCode: "+374", countryName: "Arménie" },
    { className: "flag-icon flag-icon-ao", countryCode: "AO", countryIsoCode: "+244", countryName: "Angola" },
    { className: "flag-icon flag-icon-aq", countryCode: "AQ", countryIsoCode: "+672", countryName: "Antarctique" },
    { className: "flag-icon flag-icon-ar", countryCode: "AR", countryIsoCode: "+54", countryName: "Argentine" },
    { className: "flag-icon flag-icon-as", countryCode: "AS", countryIsoCode: "+1-684", countryName: "Samoa américaines" },
    { className: "flag-icon flag-icon-at", countryCode: "AT", countryIsoCode: "+43", countryName: "Autriche" },
    { className: "flag-icon flag-icon-au", countryCode: "AU", countryIsoCode: "+61", countryName: "Australie" },
    { className: "flag-icon flag-icon-aw", countryCode: "AW", countryIsoCode: "+297", countryName: "Aruba" },
    { className: "flag-icon flag-icon-ax", countryCode: "AX", countryIsoCode: "+358-18", countryName: "Îles Åland" },
    { className: "flag-icon flag-icon-az", countryCode: "AZ", countryIsoCode: "+994", countryName: "Azerbaïdjan" },
    { className: "flag-icon flag-icon-ba", countryCode: "BA", countryIsoCode: "+387", countryName: "Bosnie-Herzégovine" },
    { className: "flag-icon flag-icon-bb", countryCode: "BB", countryIsoCode: "+1-246", countryName: "Barbade" },
    { className: "flag-icon flag-icon-bd", countryCode: "BD", countryIsoCode: "+880", countryName: "Bangladesh" },
    { className: "flag-icon flag-icon-be", countryCode: "BE", countryIsoCode: "+32", countryName: "Belgique" },
    { className: "flag-icon flag-icon-bf", countryCode: "BF", countryIsoCode: "+226", countryName: "Burkina Faso" },
    { className: "flag-icon flag-icon-bg", countryCode: "BG", countryIsoCode: "+359", countryName: "Bulgarie" },
    { className: "flag-icon flag-icon-bh", countryCode: "BH", countryIsoCode: "+973", countryName: "Bahreïn" },
    { className: "flag-icon flag-icon-bi", countryCode: "BI", countryIsoCode: "+257", countryName: "Burundi" },
    { className: "flag-icon flag-icon-bj", countryCode: "BJ", countryIsoCode: "+229", countryName: "Bénin" },
    { className: "flag-icon flag-icon-bl", countryCode: "BL", countryIsoCode: "+590", countryName: "Saint-Barthélemy" },
    { className: "flag-icon flag-icon-bm", countryCode: "BM", countryIsoCode: "+1-441", countryName: "Bermudes" },
    { className: "flag-icon flag-icon-bn", countryCode: "BN", countryIsoCode: "+673", countryName: "Brunei Darussalam" },
    { className: "flag-icon flag-icon-bo", countryCode: "BO", countryIsoCode: "+591", countryName: "Bolivie" },
    { className: "flag-icon flag-icon-bq", countryCode: "BQ", countryIsoCode: "+599", countryName: "Bonaire, Saint-Eustache et Saba" },
    { className: "flag-icon flag-icon-br", countryCode: "BR", countryIsoCode: "+55", countryName: "Brésil" },
    { className: "flag-icon flag-icon-bs", countryCode: "BS", countryIsoCode: "+1-242", countryName: "Bahamas" },
    { className: "flag-icon flag-icon-bt", countryCode: "BT", countryIsoCode: "+975", countryName: "Bhoutan" },
    { className: "flag-icon flag-icon-bv", countryCode: "BV", countryIsoCode: "+47", countryName: "Île Bouvet" },
    { className: "flag-icon flag-icon-bw", countryCode: "BW", countryIsoCode: "+267", countryName: "Botswana" },
    { className: "flag-icon flag-icon-by", countryCode: "BY", countryIsoCode: "+375", countryName: "Biélorussie" },
    { className: "flag-icon flag-icon-bz", countryCode: "BZ", countryIsoCode: "+501", countryName: "Belize" },
    { className: "flag-icon flag-icon-ca", countryCode: "CA", countryIsoCode: "+1", countryName: "Canada" },
    { className: "flag-icon flag-icon-cc", countryCode: "CC", countryIsoCode: "+61", countryName: "Îles Cocos" },
    { className: "flag-icon flag-icon-cd", countryCode: "CD", countryIsoCode: "+243", countryName: "République démocratique du Congo" },
    { className: "flag-icon flag-icon-cf", countryCode: "CF", countryIsoCode: "+236", countryName: "République centrafricaine" },
    { className: "flag-icon flag-icon-cg", countryCode: "CG", countryIsoCode: "+242", countryName: "Congo" },
    { className: "flag-icon flag-icon-ch", countryCode: "CH", countryIsoCode: "+41", countryName: "Suisse" },
    { className: "flag-icon flag-icon-ci", countryCode: "CI", countryIsoCode: "+225", countryName: "Côte d'Ivoire" },
    { className: "flag-icon flag-icon-ck", countryCode: "CK", countryIsoCode: "+682", countryName: "Îles Cook" },
    { className: "flag-icon flag-icon-cl", countryCode: "CL", countryIsoCode: "+56", countryName: "Chili" },
    { className: "flag-icon flag-icon-cm", countryCode: "CM", countryIsoCode: "+237", countryName: "Cameroun" },
    { className: "flag-icon flag-icon-cn", countryCode: "CN", countryIsoCode: "+86", countryName: "Chine" },
    { className: "flag-icon flag-icon-co", countryCode: "CO", countryIsoCode: "+57", countryName: "Colombie" },
    { className: "flag-icon flag-icon-cr", countryCode: "CR", countryIsoCode: "+506", countryName: "Costa Rica" },
    { className: "flag-icon flag-icon-cu", countryCode: "CU", countryIsoCode: "+53", countryName: "Cuba" },
    { className: "flag-icon flag-icon-cv", countryCode: "CV", countryIsoCode: "+238", countryName: "Cap-Vert" },
    { className: "flag-icon flag-icon-cw", countryCode: "CW", countryIsoCode: "+599", countryName: "Curaçao" },
    { className: "flag-icon flag-icon-cx", countryCode: "CX", countryIsoCode: "+61", countryName: "Île Christmas" },
    { className: "flag-icon flag-icon-cy", countryCode: "CY", countryIsoCode: "+357", countryName: "Chypre" },
    { className: "flag-icon flag-icon-cz", countryCode: "CZ", countryIsoCode: "+420", countryName: "République tchèque" },
    { className: "flag-icon flag-icon-de", countryCode: "DE", countryIsoCode: "+49", countryName: "Allemagne" },
    { className: "flag-icon flag-icon-dj", countryCode: "DJ", countryIsoCode: "+253", countryName: "Djibouti" },
    { className: "flag-icon flag-icon-dk", countryCode: "DK", countryIsoCode: "+45", countryName: "Danemark" },
    { className: "flag-icon flag-icon-dm", countryCode: "DM", countryIsoCode: "+1-767", countryName: "Dominique" },
    { className: "flag-icon flag-icon-do", countryCode: "DO", countryIsoCode: "+1-809", countryName: "République dominicaine" },
    { className: "flag-icon flag-icon-dz", countryCode: "DZ", countryIsoCode: "+213", countryName: "Algérie" },
    { className: "flag-icon flag-icon-ec", countryCode: "EC", countryIsoCode: "+593", countryName: "Équateur" },
    { className: "flag-icon flag-icon-ee", countryCode: "EE", countryIsoCode: "+372", countryName: "Estonie" },
    { className: "flag-icon flag-icon-eg", countryCode: "EG", countryIsoCode: "+20", countryName: "Égypte" },
    { className: "flag-icon flag-icon-eh", countryCode: "EH", countryIsoCode: "+212", countryName: "Sahara occidental" },
    { className: "flag-icon flag-icon-er", countryCode: "ER", countryIsoCode: "+291", countryName: "Érythrée" },
    { className: "flag-icon flag-icon-es", countryCode: "ES", countryIsoCode: "+34", countryName: "Espagne" },
    { className: "flag-icon flag-icon-et", countryCode: "ET", countryIsoCode: "+251", countryName: "Éthiopie" },
    { className: "flag-icon flag-icon-fi", countryCode: "FI", countryIsoCode: "+358", countryName: "Finlande" },
    { className: "flag-icon flag-icon-fj", countryCode: "FJ", countryIsoCode: "+679", countryName: "Fidji" },
    { className: "flag-icon flag-icon-fk", countryCode: "FK", countryIsoCode: "+500", countryName: "Îles Falkland" },
    { className: "flag-icon flag-icon-fm", countryCode: "FM", countryIsoCode: "+691", countryName: "Micronésie" },
    { className: "flag-icon flag-icon-fo", countryCode: "FO", countryIsoCode: "+298", countryName: "Îles Féroé" },
    { className: "flag-icon flag-icon-fr", countryCode: "FR", countryIsoCode: "+33", countryName: "France" },
    { className: "flag-icon flag-icon-ga", countryCode: "GA", countryIsoCode: "+241", countryName: "Gabon" },
    { className: "flag-icon flag-icon-gb", countryCode: "GB", countryIsoCode: "+44", countryName: "Royaume-Uni" },
    { className: "flag-icon flag-icon-gd", countryCode: "GD", countryIsoCode: "+1-473", countryName: "Grenade" },
    { className: "flag-icon flag-icon-ge", countryCode: "GE", countryIsoCode: "+995", countryName: "Géorgie" },
    { className: "flag-icon flag-icon-gf", countryCode: "GF", countryIsoCode: "+594", countryName: "Guyane française" },
    { className: "flag-icon flag-icon-gg", countryCode: "GG", countryIsoCode: "+44-1481", countryName: "Guernesey" },
    { className: "flag-icon flag-icon-gh", countryCode: "GH", countryIsoCode: "+233", countryName: "Ghana" },
    { className: "flag-icon flag-icon-gi", countryCode: "GI", countryIsoCode: "+350", countryName: "Gibraltar" },
    { className: "flag-icon flag-icon-gl", countryCode: "GL", countryIsoCode: "+299", countryName: "Groenland" },
    { className: "flag-icon flag-icon-gm", countryCode: "GM", countryIsoCode: "+220", countryName: "Gambie" },
    { className: "flag-icon flag-icon-gn", countryCode: "GN", countryIsoCode: "+224", countryName: "Guinée" },
    { className: "flag-icon flag-icon-gp", countryCode: "GP", countryIsoCode: "+590", countryName: "Guadeloupe" },
    { className: "flag-icon flag-icon-gq", countryCode: "GQ", countryIsoCode: "+240", countryName: "Guinée équatoriale" },
    { className: "flag-icon flag-icon-gr", countryCode: "GR", countryIsoCode: "+30", countryName: "Grèce" },
    { className: "flag-icon flag-icon-gs", countryCode: "GS", countryIsoCode: "+500", countryName: "Géorgie du Sud-et-les îles Sandwich du Sud" },
    { className: "flag-icon flag-icon-gt", countryCode: "GT", countryIsoCode: "+502", countryName: "Guatemala" },
    { className: "flag-icon flag-icon-gu", countryCode: "GU", countryIsoCode: "+1-671", countryName: "Guam" },
    { className: "flag-icon flag-icon-gw", countryCode: "GW", countryIsoCode: "+245", countryName: "Guinée-Bissau" },
    { className: "flag-icon flag-icon-gy", countryCode: "GY", countryIsoCode: "+592", countryName: "Guyana" },
    { className: "flag-icon flag-icon-hk", countryCode: "HK", countryIsoCode: "+852", countryName: "Hong Kong" },
    { className: "flag-icon flag-icon-hm", countryCode: "HM", countryIsoCode: "+672", countryName: "Îles Heard-et-MacDonald" },
    { className: "flag-icon flag-icon-hn", countryCode: "HN", countryIsoCode: "+504", countryName: "Honduras" },
    { className: "flag-icon flag-icon-hr", countryCode: "HR", countryIsoCode: "+385", countryName: "Croatie" },
    { className: "flag-icon flag-icon-ht", countryCode: "HT", countryIsoCode: "+509", countryName: "Haïti" },
    { className: "flag-icon flag-icon-hu", countryCode: "HU", countryIsoCode: "+36", countryName: "Hongrie" },
    { className: "flag-icon flag-icon-id", countryCode: "ID", countryIsoCode: "+62", countryName: "Indonésie" },
    { className: "flag-icon flag-icon-ie", countryCode: "IE", countryIsoCode: "+353", countryName: "Irlande" },
    { className: "flag-icon flag-icon-il", countryCode: "IL", countryIsoCode: "+972", countryName: "Israël" },
    { className: "flag-icon flag-icon-im", countryCode: "IM", countryIsoCode: "+44-1624", countryName: "Île de Man" },
    { className: "flag-icon flag-icon-in", countryCode: "IN", countryIsoCode: "+91", countryName: "Inde" },
    { className: "flag-icon flag-icon-io", countryCode: "IO", countryIsoCode: "+246", countryName: "Territoire britannique de l'océan Indien" },
    { className: "flag-icon flag-icon-iq", countryCode: "IQ", countryIsoCode: "+964", countryName: "Irak" },
    { className: "flag-icon flag-icon-ir", countryCode: "IR", countryIsoCode: "+98", countryName: "Iran" },
    { className: "flag-icon flag-icon-is", countryCode: "IS", countryIsoCode: "+354", countryName: "Islande" },
    { className: "flag-icon flag-icon-it", countryCode: "IT", countryIsoCode: "+39", countryName: "Italie" },
    { className: "flag-icon flag-icon-je", countryCode: "JE", countryIsoCode: "+44-1534", countryName: "Jersey" },
    { className: "flag-icon flag-icon-jm", countryCode: "JM", countryIsoCode: "+1-876", countryName: "Jamaïque" },
    { className: "flag-icon flag-icon-jo", countryCode: "JO", countryIsoCode: "+962", countryName: "Jordanie" },
    { className: "flag-icon flag-icon-jp", countryCode: "JP", countryIsoCode: "+81", countryName: "Japon" },
    { className: "flag-icon flag-icon-ke", countryCode: "KE", countryIsoCode: "+254", countryName: "Kenya" },
    { className: "flag-icon flag-icon-kg", countryCode: "KG", countryIsoCode: "+996", countryName: "Kirghizistan" },
    { className: "flag-icon flag-icon-kh", countryCode: "KH", countryIsoCode: "+855", countryName: "Cambodge" },
    { className: "flag-icon flag-icon-ki", countryCode: "KI", countryIsoCode: "+686", countryName: "Kiribati" },
    { className: "flag-icon flag-icon-km", countryCode: "KM", countryIsoCode: "+269", countryName: "Comores" },
    { className: "flag-icon flag-icon-kn", countryCode: "KN", countryIsoCode: "+1-869", countryName: "Saint-Christophe-et-Niévès" },
    { className: "flag-icon flag-icon-kp", countryCode: "KP", countryIsoCode: "+850", countryName: "Corée du Nord" },
    { className: "flag-icon flag-icon-kr", countryCode: "KR", countryIsoCode: "+82", countryName: "Corée du Sud" },
    { className: "flag-icon flag-icon-kw", countryCode: "KW", countryIsoCode: "+965", countryName: "Koweït" },
    { className: "flag-icon flag-icon-ky", countryCode: "KY", countryIsoCode: "+1-345", countryName: "Îles Caïmans" },
    { className: "flag-icon flag-icon-kz", countryCode: "KZ", countryIsoCode: "+7", countryName: "Kazakhstan" },
    { className: "flag-icon flag-icon-la", countryCode: "LA", countryIsoCode: "+856", countryName: "Laos" },
    { className: "flag-icon flag-icon-lb", countryCode: "LB", countryIsoCode: "+961", countryName: "Liban" },
    { className: "flag-icon flag-icon-lc", countryCode: "LC", countryIsoCode: "+1-758", countryName: "Sainte-Lucie" },
    { className: "flag-icon flag-icon-li", countryCode: "LI", countryIsoCode: "+423", countryName: "Liechtenstein" },
    { className: "flag-icon flag-icon-lk", countryCode: "LK", countryIsoCode: "+94", countryName: "Sri Lanka" },
    { className: "flag-icon flag-icon-lr", countryCode: "LR", countryIsoCode: "+231", countryName: "Libéria" },
    { className: "flag-icon flag-icon-ls", countryCode: "LS", countryIsoCode: "+266", countryName: "Lesotho" },
    { className: "flag-icon flag-icon-lt", countryCode: "LT", countryIsoCode: "+370", countryName: "Lituanie" },
    { className: "flag-icon flag-icon-lu", countryCode: "LU", countryIsoCode: "+352", countryName: "Luxembourg" },
    { className: "flag-icon flag-icon-lv", countryCode: "LV", countryIsoCode: "+371", countryName: "Lettonie" },
    { className: "flag-icon flag-icon-ly", countryCode: "LY", countryIsoCode: "+218", countryName: "Libye" },
    { className: "flag-icon flag-icon-ma", countryCode: "MA", countryIsoCode: "+212", countryName: "Maroc" },
    { className: "flag-icon flag-icon-mc", countryCode: "MC", countryIsoCode: "+377", countryName: "Monaco" },
    { className: "flag-icon flag-icon-md", countryCode: "MD", countryIsoCode: "+373", countryName: "Moldavie" },
    { className: "flag-icon flag-icon-me", countryCode: "ME", countryIsoCode: "+382", countryName: "Monténégro" },
    { className: "flag-icon flag-icon-mf", countryCode: "MF", countryIsoCode: "+590", countryName: "Saint-Martin (partie française" },
    { className: "flag-icon flag-icon-mg", countryCode: "MG", countryIsoCode: "+261", countryName: "Madagascar" },
    { className: "flag-icon flag-icon-mh", countryCode: "MH", countryIsoCode: "+692", countryName: "Îles Marshall" },
    { className: "flag-icon flag-icon-mk", countryCode: "MK", countryIsoCode: "+389", countryName: "Macédoine du Nord" },
    { className: "flag-icon flag-icon-ml", countryCode: "ML", countryIsoCode: "+223", countryName: "Mali" },
    { className: "flag-icon flag-icon-mm", countryCode: "MM", countryIsoCode: "+95", countryName: "Myanmar" },
    { className: "flag-icon flag-icon-mn", countryCode: "MN", countryIsoCode: "+976", countryName: "Mongolie" },
    { className: "flag-icon flag-icon-mo", countryCode: "MO", countryIsoCode: "+853", countryName: "Macao" },
    { className: "flag-icon flag-icon-mp", countryCode: "MP", countryIsoCode: "+1-670", countryName: "Îles Mariannes du Nord" },
    { className: "flag-icon flag-icon-mq", countryCode: "MQ", countryIsoCode: "+596", countryName: "Martinique" },
    { className: "flag-icon flag-icon-mr", countryCode: "MR", countryIsoCode: "+222", countryName: "Mauritanie" },
    { className: "flag-icon flag-icon-ms", countryCode: "MS", countryIsoCode: "+1-664", countryName: "Montserrat" },
    { className: "flag-icon flag-icon-mt", countryCode: "MT", countryIsoCode: "+356", countryName: "Malte" },
    { className: "flag-icon flag-icon-mu", countryCode: "MU", countryIsoCode: "+230", countryName: "Maurice" },
    { className: "flag-icon flag-icon-mv", countryCode: "MV", countryIsoCode: "+960", countryName: "Maldives" },
    { className: "flag-icon flag-icon-mw", countryCode: "MW", countryIsoCode: "+265", countryName: "Malawi" },
    { className: "flag-icon flag-icon-mx", countryCode: "MX", countryIsoCode: "+52", countryName: "Mexique" },
    { className: "flag-icon flag-icon-my", countryCode: "MY", countryIsoCode: "+60", countryName: "Malaisie" },
    { className: "flag-icon flag-icon-mz", countryCode: "MZ", countryIsoCode: "+258", countryName: "Mozambique" },
    { className: "flag-icon flag-icon-na", countryCode: "NA", countryIsoCode: "+264", countryName: "Namibie" },
    { className: "flag-icon flag-icon-nc", countryCode: "NC", countryIsoCode: "+687", countryName: "Nouvelle-Calédonie" },
    { className: "flag-icon flag-icon-ne", countryCode: "NE", countryIsoCode: "+227", countryName: "Niger" },
    { className: "flag-icon flag-icon-nf", countryCode: "NF", countryIsoCode: "+672", countryName: "Île Norfolk" },
    { className: "flag-icon flag-icon-ng", countryCode: "NG", countryIsoCode: "+234", countryName: "Nigeria" },
    { className: "flag-icon flag-icon-ni", countryCode: "NI", countryIsoCode: "+505", countryName: "Nicaragua" },
    { className: "flag-icon flag-icon-nl", countryCode: "NL", countryIsoCode: "+31", countryName: "Pays-Bas" },
    { className: "flag-icon flag-icon-no", countryCode: "NO", countryIsoCode: "+47", countryName: "Norvège" },
    { className: "flag-icon flag-icon-np", countryCode: "NP", countryIsoCode: "+977", countryName: "Népal" },
    { className: "flag-icon flag-icon-nr", countryCode: "NR", countryIsoCode: "+674", countryName: "Nauru" },
    { className: "flag-icon flag-icon-nu", countryCode: "NU", countryIsoCode: "+683", countryName: "Niue" },
    { className: "flag-icon flag-icon-nz", countryCode: "NZ", countryIsoCode: "+64", countryName: "Nouvelle-Zélande" },
    { className: "flag-icon flag-icon-om", countryCode: "OM", countryIsoCode: "+968", countryName: "Oman" },
    { className: "flag-icon flag-icon-pa", countryCode: "PA", countryIsoCode: "+507", countryName: "Panama" },
    { className: "flag-icon flag-icon-pe", countryCode: "PE", countryIsoCode: "+51", countryName: "Pérou" },
    { className: "flag-icon flag-icon-pf", countryCode: "PF", countryIsoCode: "+689", countryName: "Polynésie française" },
    { className: "flag-icon flag-icon-pg", countryCode: "PG", countryIsoCode: "+675", countryName: "Papouasie-Nouvelle-Guinée" },
    { className: "flag-icon flag-icon-ph", countryCode: "PH", countryIsoCode: "+63", countryName: "Philippines" },
    { className: "flag-icon flag-icon-pk", countryCode: "PK", countryIsoCode: "+92", countryName: "Pakistan" },
    { className: "flag-icon flag-icon-pl", countryCode: "PL", countryIsoCode: "+48", countryName: "Pologne" },
    { className: "flag-icon flag-icon-pm", countryCode: "PM", countryIsoCode: "+508", countryName: "Saint-Pierre-et-Miquelon" },
    { className: "flag-icon flag-icon-pn", countryCode: "PN", countryIsoCode: "+870", countryName: "Pitcairn" },
    { className: "flag-icon flag-icon-pr", countryCode: "PR", countryIsoCode: "+1-787", countryName: "Porto Rico" },
    { className: "flag-icon flag-icon-ps", countryCode: "PS", countryIsoCode: "+970", countryName: "Palestine, État de" },
    { className: "flag-icon flag-icon-pt", countryCode: "PT", countryIsoCode: "+351", countryName: "Portugal" },
    { className: "flag-icon flag-icon-pw", countryCode: "PW", countryIsoCode: "+680", countryName: "Palaos" },
    { className: "flag-icon flag-icon-py", countryCode: "PY", countryIsoCode: "+595", countryName: "Paraguay" },
    { className: "flag-icon flag-icon-qa", countryCode: "QA", countryIsoCode: "+974", countryName: "Qatar" },
    { className: "flag-icon flag-icon-re", countryCode: "RE", countryIsoCode: "+262", countryName: "Réunion" },
    { className: "flag-icon flag-icon-ro", countryCode: "RO", countryIsoCode: "+40", countryName: "Roumanie" },
    { className: "flag-icon flag-icon-rs", countryCode: "RS", countryIsoCode: "+381", countryName: "Serbie" },
    { className: "flag-icon flag-icon-ru", countryCode: "RU", countryIsoCode: "+7", countryName: "Russie" },
    { className: "flag-icon flag-icon-rw", countryCode: "RW", countryIsoCode: "+250", countryName: "Rwanda" },
    { className: "flag-icon flag-icon-sa", countryCode: "SA", countryIsoCode: "+966", countryName: "Arabie saoudite" },
    { className: "flag-icon flag-icon-sb", countryCode: "SB", countryIsoCode: "+677", countryName: "Îles Salomon" },
    { className: "flag-icon flag-icon-sc", countryCode: "SC", countryIsoCode: "+248", countryName: "Seychelles" },
    { className: "flag-icon flag-icon-sd", countryCode: "SD", countryIsoCode: "+249", countryName: "Soudan" },
    { className: "flag-icon flag-icon-se", countryCode: "SE", countryIsoCode: "+46", countryName: "Suède" },
    { className: "flag-icon flag-icon-sg", countryCode: "SG", countryIsoCode: "+65", countryName: "Singapour" },
    { className: "flag-icon flag-icon-sh", countryCode: "SH", countryIsoCode: "+290", countryName: "Sainte-Hélène, Ascension et Tristan da Cunha" },
    { className: "flag-icon flag-icon-si", countryCode: "SI", countryIsoCode: "+386", countryName: "Slovénie" },
    { className: "flag-icon flag-icon-sj", countryCode: "SJ", countryIsoCode: "+47", countryName: "Svalbard et Île Jan Mayen" },
    { className: "flag-icon flag-icon-sk", countryCode: "SK", countryIsoCode: "+421", countryName: "Slovaquie" },
    { className: "flag-icon flag-icon-sl", countryCode: "SL", countryIsoCode: "+232", countryName: "Sierra Leone" },
    { className: "flag-icon flag-icon-sm", countryCode: "SM", countryIsoCode: "+378", countryName: "Saint-Marin" },
    { className: "flag-icon flag-icon-sn", countryCode: "SN", countryIsoCode: "+221", countryName: "Sénégal" },
    { className: "flag-icon flag-icon-so", countryCode: "SO", countryIsoCode: "+252", countryName: "Somalie" },
    { className: "flag-icon flag-icon-sr", countryCode: "SR", countryIsoCode: "+597", countryName: "Suriname" },
    { className: "flag-icon flag-icon-ss", countryCode: "SS", countryIsoCode: "+211", countryName: "Soudan du Sud" },
    { className: "flag-icon flag-icon-st", countryCode: "ST", countryIsoCode: "+239", countryName: "Sao Tomé-et-Principe" },
    { className: "flag-icon flag-icon-sv", countryCode: "SV", countryIsoCode: "+503", countryName: "El Salvador" },
    { className: "flag-icon flag-icon-sx", countryCode: "SX", countryIsoCode: "+1-721", countryName: "Sint Maarten (partie néerlandaise" },
    { className: "flag-icon flag-icon-sy", countryCode: "SY", countryIsoCode: "+963", countryName: "Syrie" },
    { className: "flag-icon flag-icon-sz", countryCode: "SZ", countryIsoCode: "+268", countryName: "Eswatini" },
    { className: "flag-icon flag-icon-tc", countryCode: "TC", countryIsoCode: "+1-649", countryName: "Îles Turques-et-Caïques" },
    { className: "flag-icon flag-icon-td", countryCode: "TD", countryIsoCode: "+235", countryName: "Tchad" },
    { className: "flag-icon flag-icon-tf", countryCode: "TF", countryIsoCode: "+262", countryName: "Terres australes françaises" },
    { className: "flag-icon flag-icon-tg", countryCode: "TG", countryIsoCode: "+228", countryName: "Togo" },
    { className: "flag-icon flag-icon-th", countryCode: "TH", countryIsoCode: "+66", countryName: "Thaïlande" },
    { className: "flag-icon flag-icon-tj", countryCode: "TJ", countryIsoCode: "+992", countryName: "Tadjikistan" },
    { className: "flag-icon flag-icon-tk", countryCode: "TK", countryIsoCode: "+690", countryName: "Tokelau" },
    { className: "flag-icon flag-icon-tl", countryCode: "TL", countryIsoCode: "+670", countryName: "Timor-Leste" },
    { className: "flag-icon flag-icon-tm", countryCode: "TM", countryIsoCode: "+993", countryName: "Turkménistan" },
    { className: "flag-icon flag-icon-tn", countryCode: "TN", countryIsoCode: "+216", countryName: "Tunisie" },
    { className: "flag-icon flag-icon-to", countryCode: "TO", countryIsoCode: "+676", countryName: "Tonga" },
    { className: "flag-icon flag-icon-tr", countryCode: "TR", countryIsoCode: "+90", countryName: "Turquie" },
    { className: "flag-icon flag-icon-tt", countryCode: "TT", countryIsoCode: "+1-868", countryName: "Trinité-et-Tobago" },
    { className: "flag-icon flag-icon-tv", countryCode: "TV", countryIsoCode: "+688", countryName: "Tuvalu" },
    { className: "flag-icon flag-icon-tw", countryCode: "TW", countryIsoCode: "+886", countryName: "Taïwan" },
    { className: "flag-icon flag-icon-tz", countryCode: "TZ", countryIsoCode: "+255", countryName: "Tanzanie" },
    { className: "flag-icon flag-icon-ua", countryCode: "UA", countryIsoCode: "+380", countryName: "Ukraine" },
    { className: "flag-icon flag-icon-ug", countryCode: "UG", countryIsoCode: "+256", countryName: "Ouganda" },
    { className: "flag-icon flag-icon-um", countryCode: "UM", countryIsoCode: "+1", countryName: "Îles mineures éloignées des États-Unis" },
    { className: "flag-icon flag-icon-us", countryCode: "US", countryIsoCode: "+1", countryName: "États-Unis" },
    { className: "flag-icon flag-icon-uy", countryCode: "UY", countryIsoCode: "+598", countryName: "Uruguay" },
    { className: "flag-icon flag-icon-uz", countryCode: "UZ", countryIsoCode: "+998", countryName: "Ouzbékistan" },
    { className: "flag-icon flag-icon-va", countryCode: "VA", countryIsoCode: "+39-06", countryName: "Saint-Siège" },
    { className: "flag-icon flag-icon-vc", countryCode: "VC", countryIsoCode: "+1-784", countryName: "Saint-Vincent-et-les-Grenadines" },
    { className: "flag-icon flag-icon-ve", countryCode: "VE", countryIsoCode: "+58", countryName: "Venezuela" },
    { className: "flag-icon flag-icon-vg", countryCode: "VG", countryIsoCode: "+1-284", countryName: "Îles Vierges britanniques" },
    { className: "flag-icon flag-icon-vi", countryCode: "VI", countryIsoCode: "+1-340", countryName: "Îles Vierges des États-Unis" },
    { className: "flag-icon flag-icon-vn", countryCode: "VN", countryIsoCode: "+84", countryName: "Vietnam" },
    { className: "flag-icon flag-icon-vu", countryCode: "VU", countryIsoCode: "+678", countryName: "Vanuatu" },
    { className: "flag-icon flag-icon-wf", countryCode: "WF", countryIsoCode: "+681", countryName: "Wallis-et-Futuna" },
    { className: "flag-icon flag-icon-ws", countryCode: "WS", countryIsoCode: "+685", countryName: "Samoa" },
    { className: "flag-icon flag-icon-xk", countryCode: "XK", countryIsoCode: "+383", countryName: "Kosovo" },
    { className: "flag-icon flag-icon-ye", countryCode: "YE", countryIsoCode: "+967", countryName: "Yémen" },
    { className: "flag-icon flag-icon-yt", countryCode: "YT", countryIsoCode: "+262", countryName: "Mayotte" },
    { className: "flag-icon flag-icon-za", countryCode: "ZA", countryIsoCode: "+27", countryName: "Afrique du Sud" },
    { className: "flag-icon flag-icon-zm", countryCode: "ZM", countryIsoCode: "+260", countryName: "Zambie" },
    { className: "flag-icon flag-icon-zw", countryCode: "ZW", countryIsoCode: "+263", countryName: "Zimbabwe" }
  ];





}
