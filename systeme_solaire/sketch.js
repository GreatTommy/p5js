let astres = [];

function setup() {
  angleMode(DEGREES);

  createCanvas(600, 600);

  soleil = new Astre(27, 1390, '#E68C00', 0);
  astres.push(soleil);
  mercure = new Astre(88, 4.8, '#606685', 57.9);
  astres.push(mercure);
  venus = new Astre(225, 12.1, '#C0BDB3', 108.2);
  astres.push(venus);
  terre = new Astre(365, 12.7, '#2C838C', 149.6);
  astres.push(terre);
  mars = new Astre(686, 6.8, '#BB5E28', 227.9);
  astres.push(mars);


}

function draw() {
  translate(width / 2, height / 2);
  background(0, 10, 80);
  for (let astre of astres) {
    astre.rotation();
    astre.afficher();
    pop();
  }
}


class Astre {
  constructor(revolution, diametre, couleur, distance) {
    this.x = 0;
    this.y = distance;
    this.revolution = revolution;
    this.diametre = diametre;
    this.couleur = couleur;
    this.angle = 0;
    stroke(255);
  }
  afficher() {
    noStroke();
    fill(this.couleur);
    circle(this.x, this.y * 1.2, log(this.diametre) * 10);
    stroke(255);
  }
  rotation() {
    this.angle += 100 / this.revolution;
    push();
    rotate(this.angle);
  }
}
