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
  - gérer la soumission du form pour créer une tâche
  - cocher les cases
  - gérer le compteur
*/

const tasks = [
  {
    title: 'Coder une todolist en javascript vanilla',
    done: true,
  },
  {
    title: 'Coder une todolist avec React',
    done: false,
  },
  {
    title: 'Coder facebook',
    done: false,
  },
];

const app = {
  init: function() {
    app.todoElement = document.getElementById('todo');
    // construire un form
    app.createForm();
    // constuire un compteur
    app.createCounter();
    // construire une liste
    app.createList();
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
  createList: function() {
    // créer un ul
    app.listElement = document.createElement('ul');
    // la configurer
    app.listElement.classList.add('list');
    // ajouter des tâches initiales
    tasks.forEach(app.createTask);
    // l'insérer
    app.todoElement.appendChild(app.listElement);
  },
  createTask: function(task) {
    // créer un li
    const taskElement = document.createElement('li');
    // créer un input
    const checkboxElement = document.createElement('input');
    // créer un label
    const labelElement = document.createElement('label');
    // on ajoute uen classe sur le li
    taskElement.classList.add('list-item');
    // si task.done est vrai (si la tâche est finie)
    if (task.done) {
      // alors j'applique une class pour différencier les styles
      taskElement.classList.add('list-item--done');
    }
    // on écrit dans le label
    labelElement.textContent = task.title;
    // on change le type de champ pour avoir une checkbox
    checkboxElement.type = 'checkbox';
    // la propriété checked permet de choisir si oui ou non l'input sera cochée par défaut
    checkboxElement.checked = task.done;
    // je mets la checkbox au début du label
    labelElement.prepend(checkboxElement);
    // je mets le label à la fin du li
    taskElement.appendChild(labelElement);
    // je mets le li dans ul
    app.listElement.appendChild(taskElement);
  }
};


// Chargement du DOM
document.addEventListener('DOMContentLoaded', app.init);
