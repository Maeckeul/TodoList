/**
 * Todolist
 */

/* 
Objectif : construire une todolist intéractive
- constuire l'ui
  - construire un form
    - créer un élement form
    - le configurer (lui mettre une classe ...)
    - l'insérer dans le DOM
      - cibler un parent
      - insèrer le form dans le parent
    - constuire un input
      - créer
      - configurer
      - insérer dans un parent
    - le styler (écrire du css)
  - construire un compteur
  - construire une liste
- gérer les intréractions
*/


const app = {
  init: function() {
    app.todoElement = document.getElementById('todo');
    // construire un form
    app.createForm();
    // constuire un compteur
    app.createCounter();
  },
  createForm: function() {
    // - créer un élement form
    const formElement = document.createElement('form');
    // - le configurer (lui mettre une classe ...)
    formElement.classList.add('form');
    // - l'insérer dans le DOM
    //   - insèrer le form dans le parent
    app.todoElement.appendChild(formElement);

    //  - constuire un input
    //  - créer
    const inputElement = document.createElement('input');
    //  - configurer
    inputElement.classList.add('form-input');
    // inputElement.placeholder = 'Ajouter une tâche';
    // inputElement.type = 'text';
    inputElement.setAttribute('type', 'text');
    inputElement.setAttribute('placeholder', 'Ajouter une tâche');
    //  - insérer dans un parent
    formElement.appendChild(inputElement);
  },
  createCounter: function() {
    // créer
    const counterElement = document.createElement('p');
    // configurer
    counterElement.classList.add('counter');
    counterElement.textContent = 'Aucune tâche en cours';
    // insérer dans un parent
    app.todoElement.appendChild(counterElement);
  },
};


// Chargement du DOM
document.addEventListener('DOMContentLoaded', app.init);
