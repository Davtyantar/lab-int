


export const loader = () => {
	window.addEventListener("load", function() {
        var loaderWrapper = document.querySelector(".loader");
        var loader = document.querySelector(".spinner");
      
        if (loaderWrapper) {
          loaderWrapper.style.transition = "opacity 1s ease";
          loaderWrapper.style.opacity = "0";
          setTimeout(function() {
            loaderWrapper.style.display = "none";
          }, 500);
        }
      
        if (loader) {
          loader.style.display = "block";
        }
    });
};

