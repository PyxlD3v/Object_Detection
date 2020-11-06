img = "";
status = "";
objects = [];

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function preload() {
    img = loadImage('Bed_Room.jpg');
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(img, 0, 0, 380, 380);
    
    if (status != "") 
    {
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(img, gotResult);

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects Dtetected are : " + objects.length;
            
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            textSize(20);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x - 80, objects[i].y - 30, objects[i].width, objects[i].height);
        }
    }
}