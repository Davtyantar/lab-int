
export const loader = () => {
  var loader = document.querySelector(".loader");
  var spinner = loader.querySelector(".spinner");

  if (loader) {
    loader.style.transition = "opacity 1s ease";
    loader.style.opacity = "0";
    setTimeout(function() {
      loader.style.display = "none";
    }, 500);
  }

  if (loader) {
    spinner.style.display = "block";
  }
};



window.addEventListener("load", loader);