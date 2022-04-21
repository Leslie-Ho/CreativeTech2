import processing.serial.*;

Serial mySerial;
String serVal="";
float magnet = 0;
float bend = 0;
float pval, cval;

Scissor scissor;
ArrayList<Target> targets = new ArrayList<Target>();
PImage backgroundImg;

int counter;
float score;
int currentFrame;
Boolean gameStart;
Boolean gameEnd;
Boolean gamePlayed;
float targetSpeed;
float totalTargetsShot;
float xoff = 0.0;
float xincrement = 0.01;
float finalScore = 0;
float finalAccuracy = 0;

void setup() {
  size(600, 800);
  backgroundImg = loadImage("scissorBackground.png");
  mySerial = new Serial(this, Serial.list()[2], 115200);
  mySerial.bufferUntil('\n');
  
  gameStart = false;
  gameEnd = false;
  
  scissor = new Scissor(width/2, height - 10);
  
  targetSpeed = 10;
  pval = width / 2;
  cval = 0;
  totalTargetsShot = 0;
  
  gameRestart();
  //check if game has been played for displaying results
  gamePlayed = false;
}

void draw() {
  background(143, 197, 255);
  image(backgroundImg, 0, 0);
  scissor.display();
  moveScissors();
  gameBegin();
  showText();  
  
  pval = bend;
  
  //when game ends, display final score and restart game
  if(gameStart) {
   if (((counter / 60) - (currentFrame / 60)) <= 0) {
     finalScore = score;
     finalAccuracy = round((score*100) / totalTargetsShot);
     gameStart = false;
     gameRestart(); 
   }
  }
}

void gameRestart() {
  counter = 1800;
  score = 0;
  currentFrame = 0;
  totalTargetsShot = 0;
  xincrement = 0.01;
  if(targets.size() > 0) {
    for(int i = targets.size() -1; i >=0; i--) {
      targets.remove(i);
    }
  }
}

void moveScissors() {
  //game starts when scissor is centered
  scissor.position.x = bend;
  if(dist(bend, height, width/2, height) < 15 && !gameStart) {
    gameStart = true;
    gamePlayed = true;
  }
  if (magnet == 0) {
    scissor.isCutting = true;   
  } else {
    scissor.isCutting = false;
  }
}

void gameBegin() {
  if (gameStart) {
    currentFrame += 1;
    float n = noise(xoff)*width;
    xoff += xincrement;
    
    //increase increment
    if (score > 30 && score <= 50){
        xincrement = 0.05;
      } else if (score > 50 && score <=100){
        xincrement = 0.1;
      } else if (score > 100){
        xincrement = 0.2;
    } 
   
    //add new targets and change speed based on score
    if (scissor.isCutting) {
      if (currentFrame % 10 == 1) {
        targets.add(new Target(n, -20));
        totalTargetsShot ++;
      }
      if (score > 10) {
        targetSpeed = 10 + (score/5);
      } else {
        targetSpeed = 10;
      }
     } else {
       targetSpeed = 0;
     }    
       
    //rm target   
    for(int i = targets.size() -1; i >=0; i--) {
      Target t = targets.get(i);
      t.display();
      t.move();
      if (dist(t.position.x, t.position.y, scissor.position.x, scissor.position.y) < 80) {
        targets.remove(i);
        score += 1;
      } else if (t.position.x > height) {
        targets.remove(i);
      }
    }
  }
}

void showText() {
  fill(0);
  textSize(24);
  textAlign(LEFT); 
  if(gameStart){
    text("Score: " + round(score), 20, 60);
    text("Countdown: " + ((counter / 60) - (currentFrame / 60)), 20, 30);
    if (score == 0 || totalTargetsShot == 0) {
      text("Accuracy: 100%", 20, 90);
    } else {
      text("Accuracy: " + round((score*100) / totalTargetsShot) + "%", 20, 90);
    }
  } else {
    textAlign(CENTER);
    text("center scissor to begin", width / 2, 60);
    text("Game Over", width/2, 30);
  }
  if(gamePlayed && !gameStart) {
    textAlign(CENTER);
    text("FINAL SCORE: " + round(finalScore), width / 2, height / 2);
    text("FINAL ACCURACY: " + round(finalAccuracy) + "%", width / 2, height / 2 + 30);
  }
}


void serialEvent(Serial p) {  
  String tran = p.readString();
  String updatedTran = trim(tran);
  float[] values = float(split(updatedTran, ','));
  
  if (values.length == 2) {
    cval = int(map(values[1], 400, 80, 0, width));
    //average out prev with curr to smooth movement
    bend = (pval + cval)/2;    
    magnet = values[0];
  }
}
