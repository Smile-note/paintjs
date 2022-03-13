const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const randomColor = document.querySelector(".jsRandomColor");
const range = document.getElementById("jsRange");
const saveBtn = document.getElementById("jsSave");
const clearBtn = document.getElementById("jsClear");
const brushIcon = document.getElementById("jsBrushIcon");
const fillIcon = document.getElementById("jsFillIcon");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;
const WHITE_COLOR = "white";
const CHANGE_GRAYICON_CLASSNAME = "icon-gray";

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = WHITE_COLOR;
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineCap = "round";
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRandomColorClick(event) {
  const randomHEX = Math.random().toString(16).substring(2, 8);
  randomColor.style = "background-color: #" + randomHEX;
  const randomColorrgb = event.target.style.backgroundColor;
  ctx.strokeStyle = randomColorrgb;
  ctx.fillStyle = randomColorrgb;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function fillIconClick() {
  filling = true;
  brushIcon.classList.add(CHANGE_GRAYICON_CLASSNAME);
  fillIcon.classList.remove(CHANGE_GRAYICON_CLASSNAME);
}

function brushIconClick() {
  filling = false;
  fillIcon.classList.add(CHANGE_GRAYICON_CLASSNAME);
  brushIcon.classList.remove(CHANGE_GRAYICON_CLASSNAME);
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[🎨]";
  link.click();
}

function handleClearClick() {
  ctx.fillStyle = WHITE_COLOR;
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (fillIcon) {
  fillIcon.addEventListener("click", fillIconClick);
}

if (brushIcon) {
  brushIcon.addEventListener("click", brushIconClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

if (randomColor) {
  randomColor.addEventListener("click", handleRandomColorClick);
}

if (clearBtn) {
  clearBtn.addEventListener("click", handleClearClick);
}
