/**
 * Todolist
 */

/* 
  ici en v1 on a programmé de manière impérative
  on a décrit comment l'interface allait évoluer au fur et à mesure des intéractions
  - avantages : 
    - assez intuitif/naturel
    - performant : seul ce qui a été modifié est recalculé
  - inconvénients : 
    - peu évolutif : dès on ajoute une fonctionnalité il faut être vigilent pour ne pas casser l'existant, et il faut parfois adapter les fonctionnalités existantes

  ----

  Passage au déclaratif
  en déclaratif on se focalise sur le quoi, sur ce qu'on veut
  On aura une source de vérité, l'état de l'application / le state
  Cet état sera une donnée brut qui va vivre dans le temps
  Une intéraction ? -> on modifie l'état, la donnée brut, et on relance le calcul de l'interface
  - avantages : 
    - très évolutif, on va pouvoir ajouter des fonctionnalités sans casser l'existant, on limite les effets de bords
    - inconvénient : performances
  
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
    title: 'Faire une todo-list en JS',
    done: true,
  },
  {
    title: 'Faire une todo-list en React',
    done: false,
  },
  {
    title: 'Coder Facebook',
    done: false,
  }
];

const app = {
  init: function() {
    app.todoElement = document.getElementById('todo');

    app.todoElement.innerHTML = '';

    app.createForm();

    app.createCounter();

    app.createList();
  },

  handleSubmit: function(event) {
    event.preventDefault();
    if (event.target[0].value.trim() !== '') {
      tasks.push({
        done: false,
        title: event.target[0].value, 
      });
      app.init();
      event.target[0].value = ''; 
    }
  },

  updateCounter: function() {
    const undoneTasks = tasks.filter(function(task) {
      return !task.done;
    });

    if (undoneTasks.length === 0) {
      app.counterElement.textContent = 'Aucune tâche en cours';
    }

    else if (undoneTasks === 1) {
      app.counterElement.textContent = 'Une tâche en cours';
    }

    else {
      app.counterElement.textContent = `${undoneTasks.length} tâches en cours`;
    }
  },

  createForm: function() {
    const formElement = document.createElement('form');
    formElement.classList.add('form');
    formElement.addEventListener('submit', app.handleSubmit);
    app.todoElement.appendChild(formElement);

    const inputElement = document.createElement('input');
    inputElement.classList.add('form-input');
    inputElement.setAttribute('type', 'text');
    inputElement.setAttribute('placeholder', 'Ajouter une tâche');
    formElement.appendChild(inputElement);
    console.log(formElement);
  },

  createCounter: function() {
    app.counterElement = document.createElement('p');
    app.counterElement.classList.add('counter');
    app.updateCounter();
    app.todoElement.appendChild(app.counterElement);
  },

  createList: function() {
    app.listElement = document.createElement('ul');
    app.listElement.classList.add('list');
    tasks.forEach(app.createTask);
    app.todoElement.appendChild(app.listElement);
  }, 

  createTask: function(task) {
    const taskElement = document.createElement('li');
    const checkboxElement = document.createElement('input');
    const labelElement= document.createElement('label');
    taskElement.classList.add('list-item');

    if (task.done) {
      taskElement.classList.add('list-item--done');
    }

    labelElement.textContent = task.title;

    checkboxElement.type = 'checkbox';

    checkboxElement.addEventListener('change', function(event){
      task.done = !task.done;
      app.init();
    });

    checkboxElement.checked = task.done;

    labelElement.prepend(checkboxElement);

    taskElement.appendChild(labelElement);

    app.listElement.appendChild(taskElement);
  }
  
};





// Chargement du DOM
document.addEventListener('DOMContentLoaded', app.init);
