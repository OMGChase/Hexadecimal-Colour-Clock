let colhH, colmH, colsH, col, colhR, colmG, colsB;
let pColor, pTime, divMovingContent;


function setup() {
  
  createCanvas(windowWidth, windowHeight);

  divMovingContent = createDiv('');

  pTime = createP('pTime');
  pColor = createP('pCol');


}

function draw() {

  colhR = round(map(hour(), 0, 24, 0, 255));
  colmG = round(map(minute(), 0, 60, 0, 255));
  colsB = round(map(second(), 0, 60, 0, 255));

  colhH = hex(colhR, 2);
  colmH = hex(colmG, 2);
  colsH = hex(colsB, 2);
  col = ('#' + str(colhH) + str(colmH) + str(colsH));

  select('body').attribute('bgColor', col);
  
  divMovingContent.center(); 
  divMovingContent.style('color', correctColour());
  divMovingContent.style('font-family', 'Anton');
  divMovingContent.style('font-size', '400%');
  divMovingContent.style('text-align', 'center');
  divMovingContent.style('width', '300px');
  
  pTime.html(formatTime());
  pTime.parent(divMovingContent);
  pTime.style('margin', '0px');

  pColor.html(col);
  pColor.parent(divMovingContent);
  pColor.style('margin', '0px');
  pColor.mousePressed(downloadColor);
  pColor.mouseOver(colorHint);
  
  clear();
  
}


function formatTime() {

  let h = hour();
  let m = minute();
  let s = second();


  if (h <= 9) {

    h = '0' + h;

  }


  if (m <= 9) {

    m = '0' + m;

  }


  if (s <= 9) {

    s = '0' + s;

  }

  return str(h) + ':' + str(m) + ':' + str(s);

}

function correctColour() {

  if (brightness(col) >= 50) {

    return color(0, 0, 0);

  } else if (brightness(col) < 50) {

    return color(255, 255, 255);

  }

}

function windowResized() {

  resizeCanvas(windowWidth, windowHeight);

}

function downloadColor(){
 
  saveStrings(split(col, ' '), 'current-color.txt');
  
}

function colorHint(){
  
  fill(0, 50);
  noStroke();
  rect(mouseX, windowHeight/2+100, 245, 50, 10);
  fill(255);
  text('Click to download current color as .txt file', mouseX+10, windowHeight/2 + 128);
}