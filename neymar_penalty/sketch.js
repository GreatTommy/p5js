let maVideo;
let playing = false;
let arrow;
let choice;
let arrowLeft;
let arrowRight;
let neymarVideo;
let finalFrame;
let goalkeeperFrame;
let time;
let neymarFrame;
let lastMillis = 0;
let col;
let left_arrow;
let right_arrow;
let space;
let choiceDone;
let videoFinished;
let terminalFont;
let plotUpdated;
let wrongfoots = [];
let rightfoots = [];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function preload() {
    neymarVideo = createVideo("neymar_penalty_4_3.mp4").size(600, 450);
    finalFrame = loadImage("final_frame_4_3.jpg");
    goalkeeperFrame = loadImage("keeper.png");
    neymarFrame = loadImage("neymar.png");
    ballFrame = loadImage("ball.png");
    terminalFont = loadFont("terminal.otf");
}

function setup() {
    canvas = createCanvas(600, 450);
    canvas.parent("game-screen");
    neymarVideo.hide();
    gk = new goalkeeper();
    ney = new neymar();
    b = new ball();
    space = select("#space");
    left_arrow = select("#left_arrow");
    right_arrow = select("#right_arrow");
    displayPlot();

}

function draw() {
    background(255);
    image(neymarVideo.size(600, 450), 0, 0);
    if (!videoFinished) {
        if (neymarVideo.time() >= 3.584) {
            videoFinished = true;
            lastMillis = millis();
        }
    }
    if (videoFinished) {
        image(finalFrame, 0, 0, 600, 450);
        gk.deplacer();
        gk.afficher();
        b.afficher();
        ney.afficher();
        b.deplacer();
        textSize(400);
        textFont(terminalFont);
        fill(255);
        if (!choiceDone) {
            text("> Reaction time : " + round(millis() - lastMillis), 10, 437);
        } else {
            text("> Reaction time : " + time, 10, 437);
            if (!plotUpdated) {
                displayPlot();
                plotUpdated = true;
            }
        }
    }

}


function toggleVid() {
    gk = new goalkeeper();
    ney = new neymar();
    b = new ball();
    choiceDone = false;
    lastMillis = 0;
    time = 0;
    videoFinished = false;
    plotUpdated = false;
    left_arrow.style("filter", "brightness(100%)");
    right_arrow.style("filter", "brightness(100%)");
    neymarVideo.stop();
    neymarVideo.play();

}

function keyPressed() {
    // print(neymarVideo.time());

    if (keyCode === LEFT_ARROW) {
        processClick("left");
    } else if (keyCode === RIGHT_ARROW) {
        processClick("right");
    } else if (keyCode === 32) {
        processClick("space");
        space.style("filter", "brightness(75%)");
    }

}

function keyReleased() {
    if (keyCode === LEFT_ARROW) {
        // left_arrow.style("filter", "brightness(100%)");
    } else if (keyCode === RIGHT_ARROW) {
        // right_arrow.style("filter", "brightness(100%)");
    } else if (keyCode === 32) {
        space.style("filter", "brightness(100%)");
    }

}

function appendTime() {
    if (b.choice === gk.choice) {
        rightfoots.push(time);
    } else {
        wrongfoots.push(time);
    }
}

function printReaction() {
    if (videoFinished) {
        time = round(millis() - lastMillis);
        console.log(time);

    } else {
        console.log(time);
    }
    appendTime();
}

function processClick(key) {
    if (key === "space") {
        toggleVid();
    } else if (!choiceDone) {
        if (key === "left") {
            left_arrow.style("filter", "brightness(75%)");
            b.setChoice(0);
        } else if (key === "right") {
            right_arrow.style("filter", "brightness(75%)");
            b.setChoice(1);
        }
        printReaction();
        choiceDone = true;
    }

}

class goalkeeper {
    constructor() {
        this.x = 277;
        this.y = 97;
        this.vx = 0;
        this.choice = getRandomInt(2);
        this.shift = 0;
    }
    afficher() {
        image(goalkeeperFrame, this.x, this.y, 32, 70);

    }
    deplacer() {
        if (this.vx < 8) {
            this.vx += 0.3
        }
        if (this.shift < 100) {
            if (this.choice) {
                this.x += this.vx;
            } else {
                this.x -= this.vx;
            }
            this.shift += this.vx;

        }
    }
}

class neymar {
    constructor() {
        this.x = 257;
        this.y = 181;
    }
    afficher() {
        image(neymarFrame, this.x, this.y, 80, 107);

    }
}

class ball {
    constructor() {
        this.x = 319;
        this.y = 271;
        this.vx = 0;
        this.vy = 0;
        this.choice = -1;
        this.shiftx = 0;
        this.shifty = 0;
    }
    afficher() {
        image(ballFrame, this.x, this.y, 16, 16);
    }
    deplacer() {
        if (this.choice == -1) {
            return;
        }
        if (this.vx < [6, 3][this.choice]) {
            this.vx += 1
        }
        if (this.vy < 5) {
            this.vy += 0.9
        }
        if (this.shiftx < [135, 70][this.choice]) {
            if (this.choice) {
                this.x += this.vx;
            } else {
                this.x -= this.vx;
            }

            this.shiftx += this.vx;
        }
        if (this.shifty < 120) {
            this.y -= this.vy;
            this.shifty += this.vy;
        }
    }
    setChoice(choice) {
        this.choice = choice;
    }
}



function displayPlot() {
    var trace1 = {
        x: wrongfoots,
        y: Array(wrongfoots.length).fill(0),
        mode: "markers",
        type: "scatter",
        name: "Wrong-foot",
        marker: { size: 12 }
    };

    var trace2 = {
        x: rightfoots,
        y: Array(rightfoots.length).fill(0),
        mode: "markers",
        type: "scatter",
        name: "Right-foot",
        marker: { size: 12 }
    };

    var data = [trace1, trace2];

    var layout = {
        xaxis: {
            // range: [0, max(0, wrongfoots.concat(rightfoots)) + 10],
            rangemode: "tozero",
            title: {
                text: "Reaction time (ms)",
            },
        },
        yaxis: {
            range: [0, 0],
            showgrid: false,
            showticklabels: false,
            zeroline: true,
            zerolinecolor: "black",
            zerolinewidth: 3,
        },
        title: "Your reaction time",
        margin: {
            l: 50,
            r: 50,
            b: 70,
            t: 50,
        },
    };

    Plotly.newPlot("myPlot", data, layout, { displayModeBar: false }); //  {staticPlot: true}
}

window.onkeydown = function (e) {
    if (e.keyCode == 32 && e.target == document.body) {
        e.preventDefault();
        return false;
    }
};
