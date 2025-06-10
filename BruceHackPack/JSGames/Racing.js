var down = 0;
var Xcar = 47;
var yamaX = 0;
var yamaY = 0;
var hasyama = false;
var downspeed = 1;
var counts = 0;
var carspeed = 2;
var yamawidth = 20;
var yamaheight = 30;
var yamacolor = 0xFF0000;

function draw_road() {
    drawFillRect(43, 0, 2, 135, 0xFFFFFF);
    drawFillRect(193, 0, 2, 135, 0xFFFFFF);

    var dashes = [-145, -85, -25, 35, 95];
    for (var i = 0; i < dashes.length; i++) {
        drawFillRect(115, dashes[i] + down, 5, 40, 0xFFFFFF);
    }
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function draw_yama() {
    var colorOptions = [0xFF0000, 0xFFA500, 0xFFFF00, 0x00FF00, 0x0000FF, 0x800080, 0xFFFFFF];

    if (getRandomNumber(0, 20) == 11 && !hasyama) {
        hasyama = true;
        yamaY = -30;
        yamaX = getRandomNumber(48, 169);
        yamacolor = colorOptions[getRandomNumber(0, colorOptions.length - 1)];
    }
    if (hasyama) {
        yamaY += downspeed;
        if (yamaY > 135) hasyama = false;

        drawFillRect(yamaX, yamaY, yamawidth, yamaheight, yamacolor); // body
        drawFillRect(yamaX + 4, yamaY + 5, 12, 6, 0x0000FF); // windshield (blue)
    }
}

function draw_car(x) {
    drawFillRect(x, 85, 20, 30, 0xFFD700); // yellow body
    drawFillRect(x + 4, 90, 12, 6, 0x0000FF); // blue windshield
}

setTextSize(1);
drawString('Scroll CW - Right', 5, 0);
drawString('Scroll CCW - Left', 5, 15);
drawString('M5 - Pause/Quit', 5, 30);
drawString('Press M5 to start!', 5, 120);

while (!getSelPress()) {}

while (true) {
    fillScreen(0);

    draw_road();

    if (getNextPress() && Xcar < 165) Xcar += carspeed;
    if (getPrevPress() && Xcar > 45) Xcar -= carspeed;

    draw_yama();

    if (
        yamaY > 85 - yamaheight &&
        (yamaX < Xcar + 20 && yamaX + yamawidth > Xcar) &&
        yamaY < 115
    ) {
        dialogMessage('Game over! Score: ' + String(counts));
        delay(2000);
        break;
    }

    draw_car(Xcar);

    if (getSelPress()) {
        dialogMessage("Game Paused. Press OK to exit.");
        break;
    }

    down += downspeed;
    counts += 1;

    if (down > 135) down = 0;

    if (counts == 100) { downspeed = 2; carspeed = 3; }
    if (counts == 300) { downspeed = 3; }
    if (counts == 500) { downspeed = 4; carspeed = 4; }
    if (counts == 1000) { downspeed = 5; }
    if (counts == 2000) { downspeed = 7; carspeed = 5; }

    delay(30);
}