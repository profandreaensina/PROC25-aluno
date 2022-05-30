class Boat {
  // 01) criar arquivo Boat.js e add ao index.html

  // 02) definir propriedades no constructor 
  constructor(x, y, width, height, boatPos){

    // 03) 5 prop: w, h, boatPos, body, image
    this.width = width;
    this.height = height;
    this.boatPos = boatPos;

    this.body = Bodies.rectangle(x, y, this.width, this.height);
    World.add(world, this.body);
    this.image = loadImage("assets/boat.png");
    

  }

  // 04) display
  display(){
    // 05) namespace angulo e posição
    const angle = this.body.angle;
    const pos = this.body.position;

    // 06) push e pop 
    push();
      // 07) movimentação do canva, rotação, image()
      translate(pos.x, pos.y);
      rotate(angle);
      imageMode(CENTER);
      image(this.image, 0, this.boatPos, this.width, this.height);
    pop();

    // 08) EM SKETCH -> criar obj
  }

}
