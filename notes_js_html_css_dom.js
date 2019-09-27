//https://p5js.org/reference/#/libraries/p5.dom documentation DOM

//Créer les élément HTML
createCanvas();
createP("Ma couleur préférée est le bleu");
createDiv();
// .... => voir documentation
createElement("h1", "Mes couleurs préférées"); //pour intégrer n'importe quel élément html

//Manipuler éléments DOM
//createCanvas, createP sont des objets
let paragraphe = createP("Hello world");
paragraphe.position(100, 200); //positionnement absolu par rapport à la page
canvas.position(100, 200);
paragraphe.html("Bye World") //change le contenu

//Manipulation des évènements DOM avec les rappels
function setup() {
  let bouton = createButton("Clique !"); //on stocke l'objet dans une variable
  bouton.mousePressed(couleur); //foncion mousePressed() du bouton rappelle la fonction couleur
  //couleur est le rappel (callback en anglais)
}

//Interagir avec le DOM (boutons, sliders, formulaires)
let slider = createSlider(min, max, valeur_defaut, pas); //création d'un slider
rect(100, 100, slider.value(), slider.value() * 2); //accès à la valeur du slider
let form = createInput("Ecrire le nom"); //création d'un formulaire
text(form.value, 10, 10); //accès à la valeur du formulaire

//Evenements supplémentaires
bouton.mouseOver(couleur); //quand la souris est au dessus
bouton.mouseOut(couleur); //quand la souris n'est pas au dessus
form.changed(majTexte); //quand on change le contenu du formulaire avec entrée
slider.input(changement); //a chqque fois qu'on déplace le curseur
//changed déclanché quand on a fini l'action, input déclancé en continu

//CSS
paragraphe.style("background-color", "pink"); //pour modifier le CSS du paragraphe en CSS

//select & selectall
var element = select('#blocPage'); // <=> à #blocPage {} en CSS
var element = select('.blocPage'); // <=> à .blocPage {} en CSS
element.mouseOver(couleur); //on peut ensuite appliquer les fonctions comme précédement
//Remarque : uniquement le premier bloc de la page avec la classe blocPage est concerné
var elements = selectall('.blocPage'); // pour sélectionner tous les blocs de classe blocPage
//Remarque : renvoie un tableau composé des blocs
for (var i = 0; i < elements.length; i++) { elements[i].style("font-size", "24px"); }

//les fonctions rappel
function couleur() {
  this.style("background-color", "black"); //this géré automatiquement : récupère la variable
}

//parent et enfant
<p id = "canvasParent"></p> //on veut mettre le canvas juste en dessous
function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("canvasParent");
}

var images = [];

function setup() {
  noCanvas(); //pas de toile
  for (var i = 0; i < 5; i++) {
    let p = createP("Voici un lien");

    let a = createA("#", "Lien");
    a.mousePressed(ajouterPhoto);
    a.parent(p);
  }
}

function ajouterPhoto() {
  let img = createImage("imagePomme.png");
  images.push(img); //on crée un tableau pour stocker les images afin de les supprimer plus tard
  let paragraphe = this.parent();
  //this correspond à la variable a, donc this.parent() fait référence à la variable p
  img.parent(paragraphe); //la variable paragraphe devient le parent de la variable img
}

let effacer = select("#effacer");
effacer.mousePressed(toutEffacer);

toutEffacer() {
  for (let i = 0; i < images.length; i++) {
    images[i].remove() //supprime l'image de la page | .hide() existe aussi
  }
}

//assigner une classe CSS dynamiquement
let p = createA("#", "fraise");
p.class("fraise");

function pomme() {
  this.removeClass("fraise");
  this.class("pomme");
}
