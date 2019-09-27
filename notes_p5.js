//documentation : https://p5js.org/reference/

//Le bazar
print("Helle World"); //afficher sur la console
println("Hello World à la ligne"); //afficher sur la console et passe une ligne

4 % 2 //modulo
ceil(4.3) //arrondi au supérieur => 5
floor(4.7) //arrondi à l'inférieur => 4
round(4.5) //arrondi scientifique => 5

//LET vs VAR
var x = 100; //au niveau de la fonction => on peut déclarer n'importe ou
let x = 100; //au niveau du bloc => on ne peut déclarer qu'AVANT
const x = 100; //constante au niveau du bloc

//Fonctions, formes et dessin
function setup() { //la fonction setup déroule une seule fois
  createCanvas(400, 400); //créer la toile, en pixels
}
function draw() { //la fonction draw déroule à l'infini
  background(100, 100, 100); //couleur de l'arrière plan
  rect(0, 0, 100, 200); //(X, Y, longueur, largeur, ...)
  /* arc(), ellipse(), circle(), line(), point(), quad(), rect(), square(), triangle() */
  //l'ordre importe dans les couches : une forme définie en dessous dans le code apparait dessus
  rectMode(CENTER) //par défaut, référence de (X,Y) est le coin haut gauche => CENTER
}

//Couleurs
//Les couleurs sont exprimées en RGB (0 => 255)
fill(0, 0, 255); //remplissage ; à placer avant l'obje tconcerné
stroke(0, 255, 0); //contour ; à placer avant l'objet concerné
rect(0, 0, 100, 200);
noFill();
noStroke(); //ni contour ni remplissage
stroke(0, 255, 0, 125); //le dernier paramètre est la transparence (0 => 255)
strokeWeight(5); //épaisseur du contour en pixels

//Variables souris
ellipse(mouseX, mouseY, 100, 100);

function mousePressed() { //déroule quand l'utilisateur appuie sur la souris ; interrompt draw
  background(100, 100, 100); //paint
}

//Variables perso
let circleX; //initialisation ; à écrire au dessus de la fonction setup()
function setup() {
  circleX = 50; //assignement
}
let circleX = 50; //initialisation && assignement

//Les objets
let circle = {
  x: 0,
  y: 100,
  diametre: 50
};
circle.x //accéder à la variable x de l'objet circle

//La fonction map : permet de translater une variable d'un intervalle dans un autre intervalle
res = map(valeur, start1, stop1, start2, stop2);
//valeur va de start1 à stop1 ; on la map de start2 à stop2 dans la variable res

//La fonction random
random(min, max);

//Instructions conditionnelles
if (mouseX > width) {} // >=, <=, == ; width est une variable built-in
else if ((true && false) || (false && true)) {} else {}

//Variables booléennes
if (mouseIsPressed) {} //si on clique sur la souris => mouseIsPressed est un booléen
if (!mouseIsPressed) {} //si on ne clique pas sur la souris grâce à l'opérateur NOT

//Les boucles while et for
while (true) {}
for (let x = 0; x < 50; x++) {}

//Les fonctions
function rebondir(x, y) {} //définition de la fonction rebondir
rebondir(10, 20);
function multiplier(a, b) {
  let c = a * b;
  return c;
}
let res = multiplier(2, 3);

//Programmation orientée objet
class Bulle { //création de la classe Bulle
  constructor(rayon) { //fonction constructrice
    this.rayon = rayon;
    this.x = 100; //this est la référence à l'objet actuel
  }
  bouger() {
    this.x += 5;
  }
}
petiteBulle = new Bulle(10) //nouvelle instance de la classe Bubble
petiteBulle.move()

//Organisations en fichiers séparés
//ajouter <script src="nom_fichier.js"></script> dans index.html

//Les tableaux
let numeros = [1, 2, 4, 5] //déclaration d'un tableau d'index 0 à 3*
let num = numeros[3]; //num = 5
let mots = ["Hello", "World", "Bonjour", "Monde"];
numeros.push(2); //on ajoute à la fin du tableau

//Tableaux d'objets
let bulles = [];
bulles[0] = new Bulle(5);
bulles[1] = new Bulle(10);

//La boucle for...of
for (let elt of bulles) {
  elt.bouger();
} // <=> for (let i = 0; i < bulles.length; i++)

//La boucle for...in
for (let i in [1,2,3]) { /* instructions */ }

//Interaction avec la souris
function mousePressed() { //se déclanche automatiquement au clic souris
  petiteBulle.clique(mouseX, mouseY); //on appelle la fonction clique de l'objet bulle
}
clique(px, py) {
  let distance = dist(px, py, this.x, this.y) //dist calcule la distance à vol d'oiseau
  if (d < this.r) {}
}

//Retirer un objet d'un tableau
bulles.pop() //supprime le dernier objet du tableau
bulles.shift() //supprime le premier élément
bulles.splice(i, n) //supprime les n éléments à partir de l'index i
