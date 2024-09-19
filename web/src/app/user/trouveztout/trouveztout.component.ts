import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-trouveztout',
  templateUrl: './trouveztout.component.html',
  styleUrls: ['./trouveztout.component.scss']
})
export class TrouveztoutComponent implements OnInit {

  // Variables Geo
  latitude: number | undefined;
  longitude: number | undefined;
  error: string | undefined;

  category: any;
  item: any;
  searchCategories: string[] = [];
  searchItems: any[] = [];
  searchIterms: string = '';
  filteredItems: string[] = [];
  filteredCategories: string[] = [];
  showError: boolean = false;
  data: any;
  positions: any;

  constructor(private router: Router, private http: ApiService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.getLocation(); // Initialisation de la géolocalisation lors du chargement du composant
  }

  // Fonction pour obtenir la position de l'utilisateur
  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          console.log(`Latitude: ${this.latitude}, Longitude: ${this.longitude}`);

          // Envoi des coordonnées au backend
          const positionData = {
            latitude: this.latitude,
            longitude: this.longitude
          };
          this.http.SaveLocation(positionData)?.subscribe({
            next: (response: any) => {
              console.log('Coordonnées enregistrées avec succès:', response);
            },
            error: (error: any) => {
              console.error('Erreur lors de l\'enregistrement des coordonnées:', error);
            }
          });
        },
        (error) => {
          this.error = `Erreur de géolocalisation : ${error.message}`;
          console.error(this.error);
        }
      );
    } else {
      this.error = "La géolocalisation n'est pas supportée par ce navigateur.";
      console.log(this.error);
    }
  }

  // Fonction pour charger les catégories
  loadCategories() {
    this.http.ReadAllCategories()?.subscribe({
      next: (response: any) => {
        this.data = response?.categories;
        this.searchCategories = this.data.map((category: any) => category?.name);
        console.log(this.searchCategories);
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement des catégories:', error);
      }
    });
  }

  // Fonction pour filtrer les éléments en fonction de la recherche
  filterItems() {
    this.filteredItems = this.searchCategories.filter((category: string) =>
      category.toLowerCase().includes(this.searchIterms.toLowerCase())
    );
  }

  // Fonction pour sélectionner un élément de la liste des catégories
  selectItems(category: string) {
    this.searchIterms = category;
    this.filteredItems = [];
    this.showError = false;
  }

  // Fonction pour soumettre le formulaire
  submitForm() {
    if (!this.searchCategories.includes(this.searchIterms)) {
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 5000);
    } else {
      this.showError = false;
    }
  }
}
