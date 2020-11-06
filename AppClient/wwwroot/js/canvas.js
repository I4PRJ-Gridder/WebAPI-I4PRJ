//"use strict";

//var connection = new signalR.HubConnectionBuilder().withUrl("/gridhub").build();


//connection.on("SetPixel",
//    function(x, y, color) {
//        //here goes the binding from the client, to call an x and y and color pick
//        //Maybe seperated in its own file
//        //The Client calls a method on the server
//    });



var Gitter = function Gitter(color = "lime") {
    this.canvas = document.querySelector("#canvas");
    this.ctx = canvas.getContext("2d");
    this.canvasPos = canvas.getBoundingClientRect();
    this.color = color;
    this.canvasElement = document.getElementById("canvas");
    this.canvasHolder = document.getElementById("canvasholder");
    this.scrollY = 0;
    this.scrollX = 0;
    this.canvasStyleSize = this.canvasElement.width;
    this.ctx.imageSmoothingEnabled = false;

    // Set canvas holder size equal to window size.
    this.canvasHolder.style.height = (window.innerHeight - 50) + "px";
    this.canvasHolder.style.width = (window.innerWidth - 50) + "px";


    this.resize(200, 200);

    this.pixelData = this.createMatrix(canvas.width, canvas.height);

    this.redraw();





    window.addEventListener("click", this.placePixel.bind(this), false);
    window.addEventListener("mousewheel", this.zoom, false);
    window.addEventListener("DOMMouseScroll", this.zoom, false);
    window.addEventListener("keydown", this.dispatchKeydown.bind(this), false);


    this.canvasHolder.addEventListener("scroll", e =>
        this.logScroll(e));


    const intervalID = window.setInterval(myCallback, 1);

    function myCallback() {

        for (let i = 0; i < 10; i++) {
            gitter.setPixel(
                Math.floor(Math.random() * gitter.canvas.width),
                Math.floor(Math.random() * gitter.canvas.height),
                getRandomColor());
        }
    }
}

Gitter.prototype.logScroll = function (e) {
    // Save scroll
    console.log(e.target.scrollTop);
    this.scrollY = e.target.scrollTop;
    this.scrollX = e.target.scrollLeft;
}

Gitter.prototype.dispatchKeydown = function (e) {

    switch (e.keyCode) {
        case 107:
            // + button
            this.canvasStyleSize += 50;
            this.canvasElement.style.width = this.canvasStyleSize + "px";
            this.canvasElement.style.height = this.canvasStyleSize + "px";



            break;
        case 109:
            // - button
            this.canvasStyleSize -= 50;
            this.canvasElement.style.width = this.canvasStyleSize + "px";
            this.canvasElement.style.height = this.canvasStyleSize + "px";

    }

}

Gitter.prototype.placePixel = function (e) {
    this.setColor(this.color);
    //this.ctx.fillRect(e.pageX - canvas.offsetLeft - 3, e.pageY - canvas.offsetTop - 3, 3, 3);

    const styleDiff = this.canvas.width / this.canvasStyleSize;
    //console.log("canvas width: " + this.canvas.width);
    //console.log("style width: " + this.canvasStyleSize);
    console.log(styleDiff);

    //original
    this.setPixel(


        (Math.floor((e.pageX - canvas.offsetLeft + this.scrollX) * styleDiff)),
        (Math.floor((e.pageY - canvas.offsetTop + this.scrollY) * styleDiff)),
        this.color);

    console.log("X:" + Math.round((e.pageX - canvas.offsetLeft + this.scrollX) * styleDiff));
    console.log("Y:" + Math.round((e.pageY - canvas.offsetTop + this.scrollY) * styleDiff));
    //this.setPixel(e.pageX, e.pageY, this.color);

};

Gitter.prototype.setPixel = function (x, y, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, 1, 1);
};


// Create 2D matrix.
Gitter.prototype.createMatrix = function (columns, rows, valueDefault = null) {
    const a = [];

    for (let x = 0; x < columns; x++) {
        a[x] = [];
        for (let y = 0; y < rows; y++) {
            a[x][y] = valueDefault;
        }
    }

    return a;
}


// HANDLE SCROLL
Gitter.prototype.zoom = function (e) {
    const delta = e.wheelDelta ? e.wheelDelta / 40 : e.detail ? -e.detail : 0;
    if (delta) {
        const scaleFactor = 1.1;
        const factor = Math.pow(scaleFactor, delta);
        this.ctx.scale(factor, factor);
        console.log("handleScroll");

        this.redraw();
    }

    return e.preventDefault() && false;
}



Gitter.prototype.resize = function (x, y) {
    this.canvas.height = y;
    this.canvas.width = x;
};

Gitter.prototype.test = function () {
    this.ctx.strokeStyle = "green";
    this.ctx.strokeRect(20, 20, 50, 80);

    this.ctx.strokeRect(20, 20, 100, 60);




    this.addImage(image);
};

Gitter.prototype.setColor = function (color) {
    this.color = color;
    this.ctx.fillStyle = color;
};

Gitter.prototype.addImage = function (image) {

    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(image, 0, 0);
    console.log("hej");
}


var pixelData = twoD(200, 200, null);

function twoD(cols, rows, def = 0) { // create 2d matrix using a 1d array inside a 1d array. def=default values
    const a = [];

    for (let x = 0; x < cols; x++) {
        a[x] = [];
        for (let y = 0; y < rows; y++) {
            a[x][y] = def;
        }
    }

    return a;
}

Gitter.prototype.redraw = function () { // run this everytime a change occurs(zoom, pan, click), as elements has to be redrawn/rendered
    // Clear the entire canvas:

    console.log("Redraw called!")


    this.ctx.imageSmoothingEnabled = false;
    //this.ctx.drawImage(image, 0, 0);


    // zoom scope:
    // console.log(lastX, lastY);
    // console.log(p1.x, p1.y, " to ", p2.x, p2.y);

    // fill pixels by looping through 2d matrix
    for (let x = 0; x < this.canvas.height; x++) {
        for (let y = 0; y < this.canvas.width; y++) {
            if (this.pixelData[x][y] != null) { // if pixel is empty. skip

                this.setPixel(x, y, pixelData[x][y]);
                console.log(this.pixelData[x][y]);
            }
        }
    }
}

//kommenter ud for at undgå random placering af pixels

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    var color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


var image = new Image();

image.src = 'https://mdn.mozillademos.org/files/12640/cat.png';


var gitter = new Gitter();



//gitter.test();

