


//DEBUT DU PROGRAMME
const width = 630;
const height = 420;
const coteCase = 70; //nombre de barres

let motMystere = "";
let motEssai = "";
let lignes = [];
let dico = [];

function preload() {
  monaco = loadFont('monaco.ttf');
  //CHARGEMENT DU DICTIONNAIRE
  const requestURL = 'dico.json';
  const request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    for(var i in request.response)
        dico.push(request.response[i]);
  }
}


function setup() {
  createCanvas(width, height);
  motMystere = saisirMot();
  lignes[0] = [motMystere[0] + "........", "!*******"];
  affinerDico();
}

function draw() {
  background(15, 193, 240);
  afficherQuadrillage();
  afficherGrille();

  afficherLignes();
  testerMot();
  affinerDico();
}

function afficherGrille() {
  for (let i = 1; i < (lignes.length); i++) {
    afficherCase(i - 1, lignes[i][1]);
    afficherMot(i - 1, lignes[i][0]);

  }
}

function afficherMot(ligne, mot) {
  textFont(monaco);
  textSize(58.2);
  fill(255);
  let chaineModifiee = "";
  for (const lettre of mot) {
    chaineModifiee += lettre;
    chaineModifiee += " "
  }
  text(chaineModifiee, 18, 57 + ligne * coteCase);
}

function afficherCase(ligne, mot) {
  for (let i = 0; i < mot.length; i++) {
    if (mot[i] == "!") {
      afficherCarre(ligne * 9 + i)
    }
    else if (mot[i] == "?") {
      afficherCercle(ligne * 9 + i)
    }
  }
}

function afficherQuadrillage() {
  for (let i = coteCase; i < width; i += coteCase) {
    line(i, 0, i, height);
  }
  for (let j = coteCase; j < height; j += coteCase) {
    line(0, j, width, j);
  }
}

function positionCase(nCase) {
  x = (nCase % 9)  * (coteCase) + coteCase / 2;
  y = floor(nCase / 9) * (coteCase) + coteCase / 2;
  return [x, y];
}

function afficherCercle(nCase) {
  fill(243, 173, 5);
  circle(positionCase(nCase)[0], positionCase(nCase)[1], coteCase / 1.1);
}

function afficherCarre(nCase) {
  rectMode(CENTER);
  fill(202, 33, 35);
  square(positionCase(nCase)[0], positionCase(nCase)[1], coteCase / 1.1);
}

function saisirMot() {
  while(1) {
    let res = prompt("Veuillez saisir un mot de 9 lettres");
    if (dico.includes(res)) {
      return res;
    }
  }
}

function afficherLignes() {
  nl = 0;
  for (let i = 1; i < lignes.length; i++) {
    afficherMot(nl, lignes[i][0]);
    nl++;
  }
}


function affinerDico() {
  let i = 0;
  while (i < dico.length) {
    let continuer = true;
    let listeAttente = [];
    dicoTemp = dico[i].split("");
    objectifTemp = lignes[lignes.length - 1][0].split("");
    progressionTemp = lignes[lignes.length - 1][1].split("");
    for (let j = 0; j < 9; j++) {
      if (progressionTemp[j] == "!") {
        if (objectifTemp[j] != dicoTemp[j]) {
          dico.splice(i, 1);
          continuer = false;
          break;
        }
        else {
          objectifTemp[j] = ".";
          dicoTemp[j] = ".";
        }
      }
      else if (progressionTemp[j] == ".") {
        if (objectifTemp[j] == dicoTemp[j] && listeAttente.indexOf(objectifTemp[j]) == -1) {
          dico.splice(i, 1);
          continuer = false;
          break;
        }
        else {
          if (objectifTemp[j] == dicoTemp[j]) {
            listeAttente.splice(listeAttente.indexOf(objectifTemp[j], 1));
          }
          objectifTemp[j] = ".";
        }
      }
      else {
        if (progressionTemp[j] == "?") {
          let index = dicoTemp.indexOf(objectifTemp[j])
          if (index != -1 && index != j && lignes[lignes.length - 1][0][j] != dico[i][j]) {
            objectifTemp[j] = ".";
            dicoTemp[index] = ".";
            listeAttente.push(lignes[lignes.length - 1][0][j]);
          }
          else {
            dico.splice(i, 1);
            continuer = false;
            break;
          }
        }
      }
    }
    if (continuer == true) {
      i++;
    }
  }
}

function testerMot() {
  let test = dico[0];
  dico.shift();
  let temp = [test, calculerProgression(test, motMystere)]
  lignes.push(temp);
}

function calculerProgression(motTest, motObjectif) {
  let progression = [];
  motTest = motTest.split("");
  let motObjectifTemp = motObjectif.split("");
  for (let i = 0; i < motTest.length; i++) {
    if (motTest[i] == motObjectifTemp[i]) {
      motObjectifTemp[motObjectifTemp.indexOf(motTest[i])] = ".";
      progression[i] = "!";
    }
  }
  for (let i = 0; i < motTest.length; i++) {
    if (motObjectifTemp.includes(motTest[i])) {
      if (progression[i] != "!") {
        motObjectifTemp[motObjectifTemp.indexOf(motTest[i])] = ".";

        progression[i] = "?";
      }
    }
  }
  for (let i = 0; i < motTest.length; i++) {
    if (progression[i] != "!" && progression[i] != "?") {
      progression[i] = ".";
    }
  }
  return progression.join("");
}
