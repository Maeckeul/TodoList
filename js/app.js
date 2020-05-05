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
  counter: 2,
  init: function() {
    app.todoElement = document.getElementById('todo');
    // construire un form
    app.createForm();
    // constuire un compteur
    app.createCounter();
    // construire une liste
    app.createList();
  },
  handleSubmit: function(event) {
    // j'empeche la soumission par défaut du formulaire
    event.preventDefault();
    // on vérifie que la valeur du champ n'est pas vide
    // trim() retirer les espaces en début et en fin d'une chaine de caractère 
    if (event.target[0].value.trim() !== '') {
      // appel de la méthode qui crée la tâche
      // je dois transmettre en argument un objet représentant la tâche à ajouter
      // event.target[0] représente l'input
      console.log(event);
      app.createTask({
        done: false,
        title: event.target[0].value,
      });
      // vider le champ
      event.target[0].value = '';
      // mettre à jour le compteur
      app.counter++;
      app.updateCounter();
    }
  },
  updateCounter: function() { 
    // autre approche possible, en lisant le dom
    // document.querySelectorAll('li:not(.list-item--done)').length;
    if (app.counter === 0) {
      app.counterElement.textContent = 'Aucune tâche en cours';
    }
    // sinon s'il y en a une on met au singulier
    else if (app.counter === 1) {
      app.counterElement.textContent = 'Une tâche en cours';
    }
    // sinon on met au pluriel
    else {
      app.counterElement.textContent = `${app.counter} tâches en cours`;
    }
  },
  createForm: function() {
    // - créer un élement form
    const formElement = document.createElement('form');
    // - le configurer (lui mettre une classe ...)
    formElement.classList.add('form');
    // ajouter un écouteur pour savoir quand l'utilisateur cherche à soumettre le form 
    formElement.addEventListener('submit', app.handleSubmit);
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
    app.counterElement = document.createElement('p');
    // configurer
    app.counterElement.classList.add('counter');
    // si le nombre de tâche en cours est 0
    app.updateCounter();
    // insérer dans un parent
    app.todoElement.appendChild(app.counterElement);
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
    // on écoute le fait que la case soit cochée ou décochée
    checkboxElement.addEventListener('change', function(event) {
      // on veut ajouter ou supprimer la classe 'list-item--done' sur le li
      // element.classList.toggle('unclasse'); ajouter la classe s'il n'est y est pas sinon elle sera supprimée
      // event.target.closest('li').classList.toggle('list-item--done');
      taskElement.classList.toggle('list-item--done');
      // si on coche la case :
      // element.classList.contains() retourne true ou false suivant si la class est présente
      if (taskElement.classList.contains('list-item--done')) {
        app.counter--;
      }
      // sinon c'est qu'on la décoche
      else {
        app.counter++;
      }
      app.updateCounter();
    });
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
