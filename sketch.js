// There is a lot of things I can improve on this project like adding the simon say game mode, but I really don't feel like it especially since this is not on Bracket. So this is probably the final work.
// This mean that the button is reworked.

var dragObjects = [];
var soundArea = { x: 0, y: 80, width: 700, height: 80, };

var setting = { mode: "sandbox", style: "sine", volume: 80, };
var settingObjects = {
	volume: { x: 625, y: 284, width: 55, height: 96, color: "red", },
	styleSawtooth: { x1: 295, y1: 370, x2: 355, y2: 310, x3: 355, y3: 370, color: "orange", },
	styleSine: { x: 400, y: 340, radius: 60, color: "purple", },
	styleTriangle: { x1: 445, y1: 370, x2: 475, y2: 310, x3: 505, y3: 370, color: "yellow", },
	styleSquare: { x: 520, y: 310, width: 60, height: 60, color: "blue", },
	modeSandbox: { x: 20, y: 310, width: 60, height: 60, color: "black", },
	modeMemory: { x: 80, y: 310, width: 60, height: 60, color: "green", },
}

var icon = { data: [], width: 28, height: 64, }

var imageSrc = {};
function preload() {
  imageSrc["musicBlack"] = loadImage("Images/Icons/Music Black.png");
  imageSrc["musicGreen"] = loadImage("Images/Icons/Music Green.png");
  imageSrc["musicRed"] = loadImage("Images/Icons/Music Red.png");
  imageSrc["musicYellow"] = loadImage("Images/Icons/Music Yellow.png");
  imageSrc["whiteBackground"] = loadImage("Images/Background/White Background.jpg");
}

function drawSettings(){
	var volume = settingObjects.volume;
  	fill("white");
  	rect(625, 260, 55, 120);
  	fill(volume.color);
  	rect(volume.x, volume.y, volume.width, volume.height);

	var styleSawtooth = settingObjects.styleSawtooth;
	  if (setting.style == "sawtooth"){
	    fill(styleSawtooth.color);
		}
	  else{
	    fill("white");
		}
	  triangle(styleSawtooth.x1, styleSawtooth.y1, styleSawtooth.x2, styleSawtooth.y2, styleSawtooth.x3, styleSawtooth.y3);


	var styleSine = settingObjects.styleSine;
	  if (setting.style == "sine"){
	    fill(styleSine.color);
		}
	  else{
	    fill("white");
		}
	  ellipse(styleSine.x, styleSine.y, styleSine.radius, styleSine.radius);
	
	var styleTriangle = settingObjects.styleTriangle;
	  if (setting.style == "triangle"){
	    fill(styleTriangle.color);
		}
	  else{
	    fill("white");
		}
	  triangle(styleTriangle.x1, styleTriangle.y1, styleTriangle.x2, styleTriangle.y2, styleTriangle.x3, styleTriangle.y3);
	
	var styleSquare = settingObjects.styleSquare;
	  if (setting.style == "square"){
	    fill(styleSquare.color);
		}
	  else{
	    fill("white");
		}
  	rect(styleSquare.x, styleSquare.y, styleSquare.width, styleSquare.height);
	
	var modeSandbox = settingObjects.modeSandbox;
	  if (setting.mode == "sandbox"){
	    fill(modeSandbox.color);
		}
	  else{
	    fill("white");
		}
  	rect(modeSandbox.x, modeSandbox.y, modeSandbox.width, modeSandbox.height);
	
	var modeMemory = settingObjects.modeMemory;
	  if (setting.mode == "memory"){
	    fill(modeMemory.color);
		}
	  else{
	    fill("white");
		}
  	rect(modeMemory.x, modeMemory.y, modeMemory.width, modeMemory.height);
	
}

function setup() {
  var myCanvas = createCanvas(700, 400);
	myCanvas.id("canvas1")
  document.getElementById("canvas1").addEventListener('mouseleave', endDrag);
  document.getElementById("canvas1").addEventListener('mouseenter', restartDrag);
  dragObjects.push(new DragObject(680, 20, 15, "black"))
  dragObjects.push(new DragObject(660, 20, 15, "black"))
  dragObjects.push(new DragObject(630, 20, 15, "black"))
	strokeWeight(2)
  textSize(18);
}

function draw() {
  background(255, 255, 255);
  //console.log("jdklwejkl")
	image(imageSrc["whiteBackground"], 0, 0, 700, 400);
	//fill("white")
	//stroke("white")
	//rect(soundArea.x, soundArea.y, soundArea.width, soundArea.height);	
	stroke("black")
	strokeWeight(7)
  line(soundArea.x, (soundArea.y+(soundArea.height/2)), (soundArea.x+soundArea.width), (soundArea.y+(soundArea.height/2)));
  strokeWeight(2)
	
	drawSettings();
	for(var circle of dragObjects) {
		fill(circle.fillColor);
		ellipse(circle.x, circle.y, circle.radius, circle.radius)
	}
	strokeWeight(0);
	fill("black")
	//text((Math.round(mouseX/3.5)+200), mouseX-7, mouseY-10)

	if(collidePointRect(mouseX, mouseY, soundArea.x, soundArea.y, soundArea.width, soundArea.height)) {
		image(imageSrc["musicBlack"], mouseX-icon.width/2, soundArea.y+(soundArea.height/2)-icon.height/2, icon.width, icon.height);
		text("Frequency: "+(Math.round(mouseX/3.5)+200) + " Hz", 20, 60, 500);
	}
	else if (collidePointRect(mouseX, mouseY, 625, 260, 55, 120)){
		text("Volume: "+Math.round((380 - mouseY)/1.2), 20, 60, 500)
	}	
	else if (collidePointTriangle(mouseX, mouseY, 295, 370, 355, 310, 355, 370)){
		text("Frequency Type: Sawtooth", 20, 60, 500);
	}	
	else if (collidePointCircle(mouseX, mouseY, 400, 340, 60)){
		text("Frequency Type: Sine", 20, 60, 500);
	}	
	else if (collidePointTriangle(mouseX, mouseY, 445, 370, 475, 310, 505, 370)){
		text("Frequency Type: Triangle", 20, 60, 500);
	}	
	else if (collidePointRect(mouseX, mouseY, 520, 310, 60, 60)){
		text("Frequency Type: Square", 20, 60, 500);
	}	
	else if (collidePointRect(mouseX, mouseY, 20, 310, 60, 60)){
		text("Color: Yellow", 20, 60, 500);
	}	
	else if (collidePointRect(mouseX, mouseY, 80, 310, 60, 60)){
		text("Color: Green", 20, 60, 500);
	}	
	strokeWeight(2);
  
  for(var i=0, length=icon.data.length; i<length; i++){
    if(icon.data[i].wait.current == icon.data[i].wait.need){
      icon.data.splice(i, 1);
      i -= 1;
      length -= 1;
    }
    else{
      icon.data[i].wait.current += 1;
      image(icon.data[i].src, icon.data[i].x, icon.data[i].y, icon.width, icon.height)
    }
  }
}
  

var selectedElement = null;
var placeHolder = null;

function mousePressed() {
  for(var object of dragObjects){
    if(collidePointCircle(mouseX, mouseY, object.x, object.y, object.radius)){
      selectedElement = object;
    }
  }
  if(collidePointRect(mouseX, mouseY, soundArea.x, soundArea.y, soundArea.width, soundArea.height)){
    playNote((mouseX/3.5)+200, setting.style, setting.volume, 100);
    icon.data[icon.data.length] = new Object;
    var temporaryVar = icon.data[icon.data.length-1]
      temporaryVar.x = mouseX-icon.width/2;
      temporaryVar.y = soundArea.y+(soundArea.height/2)-icon.height/2;
    if(setting.mode == "sandbox") {
      temporaryVar.src = imageSrc["musicYellow"];
    }
    else {
      temporaryVar.src = imageSrc["musicGreen"];
    }
    temporaryVar.wait = { current: 0, need: 20, }
  }
	else if (collidePointRect(mouseX, mouseY, 625, 260, 55, 120)){
		settingObjects.volume.y = mouseY;
		settingObjects.volume.height = (380 - mouseY);
		setting.volume = (380 - mouseY)/1.2;
	}	
	else if (collidePointTriangle(mouseX, mouseY, 295, 370, 355, 310, 355, 370)){
		setting.style = "sawtooth";
	}	
	else if (collidePointCircle(mouseX, mouseY, 400, 340, 60)){
		setting.style = "sine";
	}	
	else if (collidePointTriangle(mouseX, mouseY, 445, 370, 475, 310, 505, 370)){
		setting.style = "triangle";
	}	
	else if (collidePointRect(mouseX, mouseY, 520, 310, 60, 60)){
		setting.style = "square";
	}	
	else if (collidePointRect(mouseX, mouseY, 20, 310, 60, 60)){
		setting.mode = "sandbox";
	}	
	else if (collidePointRect(mouseX, mouseY, 80, 310, 60, 60)){
		setting.mode = "memory";
	}	
}

function mouseDragged() {
  if (selectedElement) {
    selectedElement.x = mouseX;
    //selectedElement.y = mouseY;
 	}
	else if (collidePointRect(mouseX, mouseY, 625, 260, 55, 120)){
		settingObjects.volume.y = mouseY;
		settingObjects.volume.height = (380 - mouseY);
		setting.volume = (380 - mouseY)/1.2;
	}	
}

function mouseReleased() {
 	selectedElement = null;
	placeHolder = null;
}

function endDrag() {
	placeHolder = selectedElement;
 	selectedElement = null;
	mouseX = -10;
	mouseY = -10;
}

function restartDrag() {
 	selectedElement = placeHolder;
	placeHolder = null;
}

function DragObject(x, y, radius, fillColor){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.fillColor = fillColor;
	this.draggable = true;
}

function playNote(note, type, volume, duration) {
  var osc = new p5.Oscillator()
  osc.setType(type)
  osc.freq(note) 
  osc.start()
  osc.amp((volume/100), 0.2) 
  osc.amp(0, 0.2, (duration-50)/1000)
}