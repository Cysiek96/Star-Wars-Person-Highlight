export function blurryLoadingScreen() {
  const loadTxt = document.querySelector(".loading-text");
  const bg = document.querySelector("main");

  let load = 0;
  let int = setInterval(blurring, 30);

  function blurring() {
    load++;
    if (load > 99) {
      clearInterval(int);
      loadTxt.remove();
    }
    loadTxt.innerText = `Leaving interstellar space: \n${load}%`;
    loadTxt.style.opacity = scale(load, 0, 100, 1, 0);
    bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
  }

  function scale(number, inMin, inMax, outMin, outMax) {
    return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }
}
