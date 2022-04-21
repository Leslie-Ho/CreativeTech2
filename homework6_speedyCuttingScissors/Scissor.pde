class Scissor {
 PVector position;
 color scissorClrCut;
 color scissorClrOpen;
 Boolean isCutting;
 PVector size;
 PImage scissorCloseImg;
 PImage scissorOpenImg;
 
 Scissor(float posX, float posY) {
   position = new PVector(posX, posY);
   scissorClrCut = color(100, 200, 0);
   scissorClrOpen = color(250, 50, 00);
   isCutting = false;
   size = new PVector(20, 50);
   scissorCloseImg = loadImage("scissorClose.png");
   scissorOpenImg = loadImage("scissorOpen.png");
 }
 
 void display() {
  if (isCutting) {
    image(scissorOpenImg, position.x - 30, position.y - 100, 100, 100);
  } else {
    image(scissorCloseImg, position.x - 30, position.y - 100, 100, 100);
  }
 } 
}
