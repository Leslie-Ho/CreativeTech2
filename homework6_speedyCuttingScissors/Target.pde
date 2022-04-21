class Target {
  PVector position;
  PVector velocity;
  PVector size;
  color trgClr;
  
  Target(float posX, float posY) {
    position = new PVector(posX, posY);
    velocity = new PVector(0, targetSpeed);
    size = new PVector(8, 20);
    trgClr = color(45, 59, 208);
  }
  
  void display() {
    fill(trgClr);
    noStroke();
    rect(position.x, position.y, size.x, size.y);
  }
  
  void move() {
    if(scissor.isCutting) {
      position.add(velocity);
    }
     
  }
  
}
