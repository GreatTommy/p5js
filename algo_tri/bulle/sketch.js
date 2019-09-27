const width = 600;
const height = 400;

const nMax = 100; //nombre de barres
const max = 100; //valeur maximale des barres

const large = width / nMax; //largeur des barres
const coeff = (height - 100) / max; //coeff multiplicateur en ordonnées !
let valeurs = [];
let rand;
let posX = 0;
let prog = nMax - 1;
let prog2 = 0;
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
  let trie = false;
  if (prog > 0 && trie == false) {
    trie = true;
    if (prog2 < prog) {
      if (valeurs[prog2 + 1].val < valeurs[prog2].val) {
        permuter(prog2 + 1, prog2);
        trie = false;
      }
      prog2++;
    }
    else {
      prog2 = 0;
      prog--;
    }
  }
}

function permuter(ind1, ind2) {
  let temp = valeurs[ind1].val;
  valeurs[ind1].val = valeurs[ind2].val;
  valeurs[ind2].val = temp;
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
