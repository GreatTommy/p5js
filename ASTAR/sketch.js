//programme non rédigé en POO

const width = 400;
const height = 400;

let murailles = [];
let departPlace = false;
let arriveePlace = false;
let cheminTrouve = false;
let compteur = 0;

let chemins = [];
let cheminFinal = [];
let cheminActuel = [];

function preload() {
  muraille = loadImage('muraille.png');
  depart = loadImage('depart.png');
  arrivee = loadImage('arrivee.png');
}

function setup() {
  createCanvas(width, height);
  for (let i = 0; i < 256; i++) {
    murailles[i] = 0;
  }
}

function draw() {
  mouseCenterClicked();
  background(134, 215, 16);
  quadrillage();
  afficherMuraille();
  afficherCheminActuel();
  if (arriveePlace && !cheminTrouve && compteur < 50000) {
    cheminer();
    compteur++;
  }
  if (cheminTrouve) {
    afficherCheminFinal();
  }
}

function cheminer() {
  print("rép : ");
  for (let elt of chemins) {
    print(elt[1]);
  }
  if (chemins.length == 0) {
    let depart = murailles.indexOf(-1);
    chemins.push([heuristique(depart), [depart]]);
  }
  ajouterCheminsAccessibles();
}

function heuristique(index) {
  let arrivee = murailles.indexOf(-2);
  let xD = (index % 16);
  let yD = floor(index / 16);
  let xA = (arrivee % 16);
  let yA = floor(arrivee / 16);
  return abs(xD - xA) + abs(yD - yA);
}

function cheminMinimal() {
  let mini = 0;
  for (let i = 0; i < chemins.length; i++) {
    if (chemins[i][0] + chemins[i][1].length < chemins[mini][0] + chemins[mini][1].length) {
      mini = i;
    }
  }
  //print(chemins[mini][1]);
  return mini;
}

function ajouterCheminsAccessibles() {
  let m = cheminMinimal();
  let mini = chemins[m];
  cheminActuel = mini[1];
  chemins.splice(m,1);
  casesAccessibles = accessibles(mini[1][mini[1].length - 1]);
  for (let i = 0; i < casesAccessibles.length; i++) {
    let nouvTuple = Array.from(mini); //copie du tuple
    let nouvChemin = Array.from(mini[1]); //copie du tuple imbriqué
    if (!nouvChemin.includes(casesAccessibles[i])) {
      nouvChemin.push(casesAccessibles[i]);
      nouvTuple[0] = heuristique(casesAccessibles[i]);
      nouvTuple[1] = nouvChemin;
      //print(nouvTuple[1]);
      if (verifInsertion(nouvTuple)) {
        chemins.unshift(nouvTuple);
      }
      if (casesAccessibles[i] == murailles.indexOf(-2)) {
        cheminTrouve = true;
        print("Trouvé!!!");
        print(nouvChemin);
        cheminFinal = nouvChemin;
        break;
      }
    }
  }
}

function accessibles(i) {
  let res = [];
  let valeurs = [];
  if (floor((i - 1) / 16) != floor(i / 16)) {
    valeurs = [-16, 1, 16];
  }
  else if (floor((i + 1) / 16) != floor(i / 16)) {
    valeurs = [-16, -1, 16];
  }
  else {
    valeurs = [-16, -1, 1, 16];
  }
  for (j = 0; j < valeurs.length; j++) {
    if (0 <= i + valeurs[j] && i + valeurs[j] <= 255 && (murailles[i + valeurs[j]] == 0 ||
    murailles[i + valeurs[j]] == -2)) {
      res.push(i + valeurs[j]);
    }
  }
  return res;
}

function verifInsertion(chemin) {
  let inserer = true;
  let pos = chemin[1][chemin[1].length - 1]; //la dernière case du chemin
  for (let i = 0; i < chemins.length; i++) {
    if (chemins[i][1][chemins[i][1].length - 1] == pos) {
      if (chemins[i][1].length <= chemin[1].length) {
        inserer = false;
        break;
      }
      else {
        chemins.splice(i, 1);
        break;
      }
    }
  }
  return inserer;
}

function quadrillage() {
  for (let i = 25; i < width; i += 25) {
    line(i, 0, i, height);
  }
  for (let j = 25; j < height; j += 25) {
    line(0, j, width, j);
  }
}

function afficherMuraille() {
  for (let i = 0; i < 256; i++) {
    if (murailles[i] == 1) {
      let x = (i % 16) * 25;
      let y = floor(i / 16) * 25;
      image(muraille, x, y, 25, 25);
    } else if (murailles[i] == -1) {
      let x = (i % 16) * 25;
      let y = floor(i / 16) * 25;
      image(depart, x, y, 25, 25);
    } else if (murailles[i] == -2) {
      let x = (i % 16) * 25;
      let y = floor(i / 16) * 25;
      image(arrivee, x, y, 25, 25);
    }
  }
}

function afficherCheminFinal() {
  for (let i = 0; i < 256; i++) {
    if (murailles[i] == 0 && cheminFinal.includes(i)) {
      let x = (i % 16) * 25;
      let y = floor(i / 16) * 25;
      fill(255, 255, 0);
      rect(x,y,25,25);
    }
  }
}

function afficherCheminActuel() {
  for (let i = 0; i < 256; i++) {
    if (murailles[i] == 0 && cheminActuel.includes(i)) {
      let x = (i % 16) * 25;
      let y = floor(i / 16) * 25;
      fill(0, 255, 255);
      rect(x,y,25,25);
    }
  }
}

function quelleCase() {
  let x = floor(mouseX / 25);
  let y = floor(mouseY / 25);
  let position = x + y * 16;
  return (position);
}

function mouseClicked() {
  let position = quelleCase();
  if (murailles[position] == 0) {
    murailles[position] = 1;
  }
}

function mouseCenterClicked() {
  if (mouseIsPressed) {
    if (mouseButton === CENTER) {
      let position = quelleCase();
      if (murailles[position] == 0 && departPlace == false) {
        murailles[position] = -1;
        departPlace = true;
      } else if (murailles[position] == 0 && arriveePlace == false) {
        murailles[position] = -2;
        arriveePlace = true;
      }
    }
  }
}
