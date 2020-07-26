const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const fillandPaintBtn = document.getElementById("jsFillBtn");

const DEFAULT_COLOR = "black";
const CANVAS_SIZE = 550;

const ctx = canvas.getContext("2d");

let painting = false;
let filling = false;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = DEFAULT_COLOR;
ctx.lineWidth = 2.5;

const stopPainting = () => {
  painting = false;
};

const startPainting = () => {
  painting = true;
};

function onMouseMove(event) {
  let x = event.offsetX;
  let y = event.offsetY;
  if (painting) {
    ctx.lineTo(x, y);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
}

ctx.fillRect(30, 50, 20, 100);

function onMouseDown(event) {
  startPainting();
}

function onMouseUp(event) {
  stopPainting();
  ctx.closePath();
}

function changeColor(e) {
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = `${color}`;
  ctx.fillStyle = `${color}`;
}

function handleRangeValue(e) {
  const value = e.target.value;
  ctx.lineWidth = value;
}

function resetClick() {
  Array.from(colors).forEach((color) => {
    color.classList.remove("clicked");
  });
}

function addClickedMotion(e) {
  resetClick();
  e.target.classList.add("clicked");
}

function handleFirstBtnClick() {
  if (filling == true) {
    filling = false;
    fillandPaintBtn.innerText = "FILL";
  } else {
    filling = true;
    fillandPaintBtn.innerText = "PAINT";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mouseleave", stopPainting);
  range.addEventListener("input", handleRangeValue);
  fillandPaintBtn.addEventListener("click", handleFirstBtnClick);
  canvas.addEventListener("click", handleCanvasClick);
}

Array.from(colors).forEach((color) => {
  const COLOR = color;
  COLOR.addEventListener("click", changeColor),
    COLOR.addEventListener("click", addClickedMotion);
});
