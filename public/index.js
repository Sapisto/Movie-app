Get the modal element
var modal = document.getElementById("add-movie-modal");

// Get the button that opens the modal
var btn = document.getElementById("add-movie-btn");

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on the close button or outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Get the modal element
var modal = document.getElementById("update-movie-modal");

// Get the button that opens the modal
var btn = document.getElementById("update-movie-btn");

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on the close button or outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}