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
    // construire un form
    app.createForm();
  },
  createForm: function() {
    // - créer un élement form
    const formElement = document.createElement('form');
    // - le configurer (lui mettre une classe ...)
    formElement.classList.add('form');
    // - l'insérer dans le DOM
    //   - cibler un parent
    const todoElement = document.getElementById('todo');
    //   - insèrer le form dans le parent
    todoElement.appendChild(formElement);

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
};


// Chargement du DOM
document.addEventListener('DOMContentLoaded', app.init);
