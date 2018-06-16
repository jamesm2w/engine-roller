
var handleWindowClick = function (e) {
  if (event.target.classList.contains("modal")) {
    closeModal(e);
  }
}

var closeBtns = document.getElementsByClassName("modalClose");
for (var element of closeBtns) {
  element.addEventListener("click", closeModal);
}