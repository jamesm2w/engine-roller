var showModal = function (modalID) {
  document.getElementById(modalID + "Modal").style.display = "block";
  document.getElementById("LoadEngineModal").getElementsByClassName("modal-body")[0].innerHTML = "";
  buildLoaderUI();
}

var closeModal = function (e) {
  var modals = document.getElementsByClassName("modal");
  for (var modal of modals) {
    if (modal.style.display == "block") {
      modal.style.display = "none";
    }
  }
}

var handleWindowClick = function (e) {
  if (event.target.classList.contains("modal")) {
    closeModal(e);
  }
}

var closeBtns = document.getElementsByClassName("modalClose");
for (var element of closeBtns) {
  element.addEventListener("click", closeModal);
}