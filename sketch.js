let spriteWomen1;
let sprites = [];
function preload()
{
	spriteWomen1 = loadImage('assets/sprites/obesewomandoingcartwheels.png'); 
}

function setup() {
	createCanvas(window.screen.width, window.screen.height-100);
	sprites.push(new Sprite(spriteWomen1, 200, 200, 3, false))
  }
  
  function keyPressed() {	
	console.log(keyCode);
	if (key == 'z' || key == 'Z') {
		gSpace = !gSpace;
	}
  }


  function draw() {
	for (let lSprite of sprites) {
		lSprite.show();
		lSprite.animate();
	}
	
  }