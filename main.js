song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload() {
    song = loadSound("music.mp3");
    
}

function setup() {
    canvas = createCanvas(650, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);

}

function modelLoaded() {
    console.log("MODEL IS LOADED");
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        
        RightWristScore = results[0].pose.keypoints[10].score;
        LeftWristScore = results[0].pose.keypoints[9].score;
        console.log(LeftWristScore);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("LEFT WRIST X = " + leftWristX + " | LEFT WRIST Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("RIGHT WRIST X = " + rightWristX + " | RIGHT WRIST Y = " + rightWristY);
    }

}

function draw() {
    image(video, 0, 0, 650, 500);

    fill("red");
    stroke("red");

    if(LeftWristScore > 0.2) {

    circle(leftWristX, leftWristY, 30);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("disc_volume").innerHTML = "VOLUME = " + volume;
    song.setVolume(volume);
    }

    if(RightWristScore > 0.2) {

    circle(rightWristX, rightWristY, 30);

    if(rightWristY > 0 && rightWristY <= 100) {
        document.getElementById("disc_speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }

    else if(rightWristY > 100 && rightWristY <= 200) {
        document.getElementById("disc_speed").innerHTML = "Speed = 1.0x"
        song.rate(1);
    }

    else if(rightWristY > 200 && rightWristY <= 300) {
        document.getElementById("disc_speed").innerHTML = "Speed = 1.5x"
        song.rate(1.5);
    }

    else if(rightWristY > 300 && rightWristY <= 400) {
        document.getElementById("disc_speed").innerHTML = "Speed = 2.0x"
        song.rate(2);
    }

    else if(rightWristY > 400 && rightWristY <= 500) {
        document.getElementById("disc_speed").innerHTML = "Speed = 2.5x"
        song.rate(2.5);
    }

    }

}

function play() {
    song.play();
}