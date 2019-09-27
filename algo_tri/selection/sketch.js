const width = 600;
const height = 400;

const nMax = 100; //nombre de barres
const max = 100; //valeur maximale des barres

const large = width / nMax; //largeur des barres
const coeff = (height - 100) / max; //coeff multiplicateur en ordonnées !
let valeurs = [];
let rand;
let posX = 0;
let prog = 1;
let go = false;


function setup() {
  createCanvas(600, 400);
  for (let i = 0; i < nMax; i++) {
    rand = round(random(max));
    nouv = new valeur(rand, posX);
    valeurs.push(nouv);
    posX += large;
  }
}

function draw() {
  background(200, 200, 255);
  for (let val of valeurs) {
    val.afficher();
  }
  if (go) {
    trierTableau();
  }
}

function mouseClicked() { //on lance le tri au clic
  go = true;
}

function trierTableau() {
  if (prog < nMax) {
    inserer(prog);
  }
  prog++;
}

function inserer(fin) {
  let j = 0;
  while (valeurs[fin].val > valeurs[j].val) {
    j++;
  }
  temp = valeurs[fin].val;
  reorganiser(j, fin);
  valeurs[j].val = temp;

}

function reorganiser(deb, fin) {
  for (let c = fin; c > deb; c--) {
    valeurs[c].val = valeurs[c - 1].val;
  }
}

class valeur {
  constructor(val, x) { //fonction constructrice
    this.val = val;
    this.x = x;
    this.y = height;
  }
  afficher() {
    let couleur;
    couleur = map(this.val, 0, max, 255, 50);
    fill(couleur);
    rect(this.x, this.y, large, -this.val * coeff);
  }
}
