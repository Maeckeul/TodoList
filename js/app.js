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

// on définit un état initial
const tasks = [
  {
    title: 'Coder une todolist en javascript vanilla',
    done: true,
  },
  {
    title: 'Coder une todolist avec React',
    done: true,
  },
  {
    title: 'Coder facebook',
    done: true,
  },
  {
    title: 'Comprendre le déclaratif',
    done: false,
  }
];

const app = {
  init: function() {
    app.todoElement = document.getElementById('todo');
    // à chaque appel de init on nettoie l'appli avant de la recalculer
    app.todoElement.innerHTML = '';
    // construire un form
    app.createForm();
    // constuire un compteur
    app.createCounter();
    // construire une liste
    app.createList();
  },
  handleSubmit: function(event) {
    event.preventDefault();
    if (event.target[0].value.trim() !== '') {
      // en réponse intéraction je modifie l'état
      tasks.push({
        done: false,
        title: event.target[0].value,
      });
      app.init();
      // vider le champ
      event.target[0].value = '';
    }
  },
  updateCounter: function() { 
    // autre approche possible, en lisant le dom
    // document.querySelectorAll('li:not(.list-item--done)').length;
    // j'utilise filter pour conserver uniquement certaines valeurs du tableau
    const undoneTasks = tasks.filter(function(task) {
      // je ne garde que les tâches non faites
      return !task.done;
    });

    if (undoneTasks.length === 0) {
      app.counterElement.textContent = 'Aucune tâche en cours';
    }
    // sinon s'il y en a une on met au singulier
    else if (undoneTasks.length === 1) {
      app.counterElement.textContent = 'Une tâche en cours';
    }
    // sinon on met au pluriel
    else {
      app.counterElement.textContent = `${undoneTasks.length} tâches en cours`;
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
    // je décris l'applications en fonction de mon état / je lis l'état
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
      task.done = !task.done;
      app.init();
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
