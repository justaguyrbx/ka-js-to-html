const input = document.getElementById("jscode");
const button = document.getElementById("convertButton");
const output = document.getElementById("output");

button.addEventListener("click", function () {
    let code = input.value;

    // Convert Khan Academy's:
    // draw = function() {
    // into normal JavaScript:
    // function draw() {
    code = code.replace(
        /draw\s*=\s*function\s*\(\)\s*\{/,
        "function draw() {"
    );

    const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>My Khan Academy Game</title>

    <style>
        body {
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: #222;
        }

        canvas {
            border: 1px solid black;
        }
    </style>
</head>

<body>

<canvas id="canvas" width="400" height="400"></canvas>

<script>

// ============================================================
// CANVAS SETUP
// ============================================================

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// ============================================================
// KHAN ACADEMY DRAWING FUNCTIONS
// ============================================================

function rect(x, y, width, height) {
    ctx.fillRect(x, y, width, height);
}

function background(r, g, b) {
    // Support both:
    // background(0)
    // background(255, 0, 0)

    if (g === undefined && b === undefined) {
        g = r;
        b = r;
    }

    ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function fill(r, g, b) {
    ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
}

function ellipse(x, y, width, height) {
    // Draw an ellipse centered at x, y.
    ctx.save();

    ctx.translate(x, y);
    ctx.scale(width / 2, height / 2);

    ctx.beginPath();
    ctx.arc(0, 0, 1, 0, 2 * Math.PI);
    ctx.fill();

    ctx.restore();
}

function text(message, x, y) {
    ctx.fillText(message, x, y);
}

function textSize(size) {
    ctx.font = size + "px Arial";
}

// ============================================================
// KHAN ACADEMY MATH FUNCTIONS
// ============================================================

function floor(number) {
    return Math.floor(number);
}

function random(min, max) {
    // random() -> random number from 0 to 1
    if (min === undefined) {
        return Math.random();
    }

    // random(max) -> random number from 0 to max
    if (max === undefined) {
        return Math.random() * min;
    }

    // random(min, max)
    return Math.random() * (max - min) + min;
}

// ============================================================
// KHAN ACADEMY KEYBOARD INPUT
// ============================================================

const UP = 38;
const DOWN = 40;
const LEFT = 37;
const RIGHT = 39;

let keyCode = 0;

let keyPressed = function () {};
let keyReleased = function () {};

document.addEventListener("keydown", function (event) {
    keyCode = event.keyCode;
    keyPressed();
});

document.addEventListener("keyup", function (event) {
    keyCode = event.keyCode;
    keyReleased();
});

// ============================================================
// KHAN ACADEMY MOUSE INPUT
// ============================================================

let mouseX = 0;
let mouseY = 0;

let mouseClicked = function () {};

function updateMousePosition(event) {
    const rect = canvas.getBoundingClientRect();

    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
}

canvas.addEventListener("mousemove", function (event) {
    updateMousePosition(event);
});

canvas.addEventListener("click", function (event) {
    updateMousePosition(event);
    mouseClicked();
});

// ============================================================
// USER'S KHAN ACADEMY CODE
// ============================================================

${code}

// ============================================================
// GAME LOOP
// ============================================================

function gameLoop() {
    if (typeof draw === "function") {
        draw();
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();

</script>

</body>
</html>`;

    // Show the generated HTML
    output.textContent = html;

    // Create the downloadable file
    const blob = new Blob([html], {
        type: "text/html"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "my-ka-game.html";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Give the browser time to start the download
    setTimeout(function () {
        URL.revokeObjectURL(url);
    }, 1000);
});