import { Component } from '@angular/core';

@Component({
  selector: 'app-trouveztout',
  templateUrl: './trouveztout.component.html',
  styleUrls: ['./trouveztout.component.scss']
})
export class TrouveztoutComponent {
  items: string[] = ['John', 'Jane', 'Doe', 'Alice', 'Bob'];
  searchIterms: string = '';
  filteredItems: string[] = [];
  showError: boolean = false;

  filterItems() {
    this.filteredItems = this.items.filter(items =>
      items.toLowerCase().includes(this.searchIterms.toLowerCase())
    );
}

selectItems(items: string) {
  this.searchIterms = items;
  this.filteredItems = [];
  this.showError = false;

}

submitForm() {
  if (!this.filteredItems.includes(this.searchIterms)) {
    this.showError = true;
    setTimeout(() => {
      this.showError = false;
    }, 5000);
  } else {
    this.showError = false;
  }
}
}
