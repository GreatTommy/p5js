//Transformations
setup() { angleMode(DEGREES) }
push(); //sauvegarder
translate(50, 50); //déplace le point d'origine à (x, y) = (50, 50)
rotate(angle);
//rectMode(CENTER) pour faire tourner le rectangle sur lui même
rect(0, 0, 100, 50);
angle += 1;
pop(); //restorer : permet de confiner les transformations entre push() et pop()

scale(2); //la forme est deux fois plus grande
scale(2, -3); //pour différencier la direction x de la direction y
//un scale négatif peut servir à inverser le sens de rotation

//setTimeout() et setInterval()
setTimeout(boum, 2000); //la fonction boum() sera appelée 2 secondes après UNE FOIS
let intervalle = setInterval(boum, 2000); //boum() sera appelée INFINIEMENT toutes pes 2 secondes
clearInterval(intervalle); //pour stopper la répétition

//Fermetures : une fonction à l'intérieur d'une autre fonction
let timer1 = createP('timer 1');
let timer2 = createP('timer 2');
function creerTimer(elt, delai) {
  var compteur = 0;
  setInterval(incremente, delai);
  function increment() {
    elt.html(compteur);
    compteur++;
  }
}
creerTimer(timer1, 500);
creerTimer(timer2, 312);

//Dessiner la trace d'un objet
let v = createVector(this.x, this.y);
historique.push(v);

//Mode d'instance : pour créer plusieurs canvas, utiliser d'autre bibliothèques simultanément...
let sketch = function(p) { //création du template
  p.x = 100;
  p.y = 100;
  p.setup = function() {
    p.background(50);
    //...
  }
  p.draw = function() {
    p.noStroke();
    //...
  }
}
let monP5 = new p5(sketch); //objet p5 contenant tout les variables, fonctions etc.
let monP5v2 = new p5(sketch); //on duplique le canvas

function resetBackground() {
  monP5.background(50);
}
