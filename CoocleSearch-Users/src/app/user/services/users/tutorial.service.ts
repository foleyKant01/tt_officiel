import { Injectable } from '@angular/core';
import introJs from 'intro.js';

@Injectable({ providedIn: 'root' })
export class TutorialService {
  private storageKey = 'coocle_tutorial_seen';

  constructor() {}

  hasSeenTutorial(): boolean {
    return localStorage.getItem(this.storageKey) === 'true';
  }

  markAsSeen() {
    localStorage.setItem(this.storageKey, 'true');
  }

  startTutorial() {
    const intro = introJs();

    intro.setOptions({
      steps: [
        {
          element: '#searchBar',
          intro: '<strong>Entrez un mot-clé</strong> pour commencer votre recherche.<br><small>Ex. : restaurants italiens</small>',
          position: 'bottom'
        },
        {
          element: '#filterBtn',
          intro: '<strong>Affinez</strong> vos résultats avec le filtre par proximité.',
          position: 'left'
        },
        {
          element: '#resultsSection',
          intro: '<strong>Cliquez</strong> sur un résultat pour voir les détails (horaires, avis, itinéraire).',
          position: 'top'
        }
      ],
      nextLabel: 'Suivant',
      prevLabel: 'Précédent',
      doneLabel: 'Terminer',
      skipLabel: 'Passer'
    });

    intro.oncomplete(() => this.markAsSeen());
    intro.onexit(() => this.markAsSeen()); // si l'utilisateur quitte le tuto
    intro.start();
  }
}
