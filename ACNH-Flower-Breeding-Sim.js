var gridHeight = 5; /* Number of rows in the grid. */
var gridWidth = 5; /* Number of columns in the grid. */

var selectedFlower = 't';
var flowerColor = 'red';
var flowerColorIndex = 0;

const flowerColorMap = new Map();
flowerColorMap.set('t', 
{
   'name': 'tulip',
   'colors': ['red', 'yellow', 'orange', 'white', 'pink', 'purple', 'black']
});

flowerColorMap.set('w',
{
   'name': 'windflower',
   'colors': ['read', 'orange', 'white', 'blue', 'pink', 'purple']
});

flowerColorMap.set('l',
{
   'name': 'lily',
   'colors': ['red', 'orange', 'yellow', 'black', 'pink', 'white']
});

flowerColorMap.set('p',
{
   'name': 'pansy',
   'colors': ['red', 'orange', 'yellow', 'blue', 'white', 'purple']
});

flowerColorMap.set('h', 
{
   'name': 'hyacinth',
   'colors': ['red', 'orange', 'yellow', 'pink', 'white', 'blue', 'purple']
});

flowerColorMap.set('c', 
{
   'name': 'cosmos',
   'colors': ['red', 'orange', 'yellow', 'pink', 'white', 'black']
});

flowerColorMap.set('m', 
{
   'name': 'mum',
   'colors': ['red', 'yellow', 'pink', 'white', 'green', 'purple']
});

flowerColorMap.set('r', 
{
   'name': 'rose',
   'colors': ['red', 'orange', 'yellow', 'pink', 'blue', 'white', 'purple', 'black', 'gold']
});

function updateGridSize () {
   // TODO: Add titles for which input field is width/height

   // Get the new values and update the global variables.
   var newHeight = document.getElementById("grid-height-input").value;
   var newWidth = document.getElementById("grid-width-input").value;
   gridHeight = newHeight;
   gridWidth = newWidth;

   // Create and fill the grid.
   createGrid();
}

function createGrid () {
   var grid = document.getElementById("grid");
   grid.innerHTML = "";

   for (var row = 0; row < gridHeight; row++) {
      let newTableRow = document.createElement("tr");
      for (var col = 0; col < gridWidth; col++) {
         let newRowCell = document.createElement("td");
         newRowCell.innerHTML = "W";
         newTableRow.appendChild(newRowCell);
      }
      grid.appendChild(newTableRow);
   }
}

// Gets keyDown events and calls the appropriate function based on pressed key.
function keyUpHandler (event) {
   switch (event.key) {
      case 'ArrowLeft':
         cycleColor(-1);
         break;
      case 'ArrowRight':
         cycleColor(1);
         break;
      default:
         selectFlower(event.key);
   }
}

// Sets the currently selected flower if the given selection is a valid flower type.
function selectFlower (choice) {
   if (flowerColorMap.has(choice)) {
      selectedFlower = choice;
      flowerColorIndex = 0;
      console.log('New Flower Selected: ', flowerColorMap.get(selectedFlower).name); 
   }
}

// Cycles through the color list for the currently selected flower.
function cycleColor (direction) {
   let curFlowerColors = flowerColorMap.get(selectedFlower).colors;
   flowerColorIndex += direction;
   flowerColorIndex = (flowerColorIndex >= curFlowerColors.length)? 0 : flowerColorIndex;
   flowerColorIndex = (flowerColorIndex < 0)? curFlowerColors.length - 1 : flowerColorIndex;

   flowerColor = curFlowerColors[flowerColorIndex];

   // TODO: Remove later
   console.log(curFlowerColors);
   console.log(flowerColor);
}

/* JQuery Code */
$(document).ready(function () {
   
   $(document).keyup(keyUpHandler);

   $("table#grid").on("click", "td", function (event) {
      $(this).css("background-color", flowerColor);
      $(this).text(selectedFlower.toUpperCase());
   });

});