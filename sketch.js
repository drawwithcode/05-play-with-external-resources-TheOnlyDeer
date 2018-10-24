let img;
let music;
let analyzer;
let step;
let balls = [];
let volume;

function preload() {
    music = loadSound('./assets/orchid.mp3');
    img = loadImage('./assets/sky.jpg');
}

function setup() {
    music.loop();
    analyzer = new p5.Amplitude();
    createCanvas(windowWidth, windowHeight);
    step = width / (music.duration() * 60);
    push();
    translate(width / 2, height / 2);
    imageMode(CENTER);
    let scale = Math.max(width / img.width, height / img.height);
    image(img, 0, 0, img.width * scale, img.height * scale)
    pop();
    noStroke();
    ellipseMode(CENTER);
    let SoundBall = function () {
        this.x = random(0, width);
        this.y = random(0, height);
        this.fill = get(this.x,this.y)
        this.draw = function () {
            fill(lerpColor(color(this.fill),color('#901dd2'), volume*3));
            ellipse(this.x, this.y, map(volume, 0, 1, 0, height / 5))
        }
    }


    while (balls.length < 5000) {
        balls.push(new SoundBall());
    }
}



function draw() {
    volume = analyzer.getLevel();
        //stroke(lerpColor(color('#901dd2'), color('#00c770'), noise(frameCount/100)));

    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
    }
    //line(step * (frameCount % (music.duration() * 60)), height, step * (frameCount % (music.duration() * 60)), height - map(volume, 0, 1, 0, height * 2))
}
