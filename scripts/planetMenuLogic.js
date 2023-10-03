import axios from "axios";
import { differentStatus, createReturningValue } from "./errorHandling";

const planetSite = document.querySelector("article.planet-site");
const planetWindowBtn = document.querySelector("button.close-window-button");
const picturesDictionary = ["gas giant", "volcanoes", "marslike", "swamp", "water"];

export function createElementsForPlanetsDisplay(numeric, searchingPlanetUrl, buttons, firstElementCounter) {
  const planetLinks = document.querySelectorAll("a.planetLink");
  planetLinks[numeric].addEventListener("click", (e) => {
    e.preventDefault();
  });
  planetLinks[numeric].addEventListener("dblclick", async (e) => {
    e.preventDefault();
    planetSite.style.animation = "none";
    planetSite.style.display = "grid";
    planetSite.style.animation = "appear 2s";
    try {
      const data = await getPlanetInformation(e.target, searchingPlanetUrl);
      createPlanetContent(data, buttons);
      eventListenerForRemovePlanetCard(buttons, firstElementCounter);
    } catch (err) {
      eventListenerForRemovePlanetCard(buttons, firstElementCounter);
      differentStatus(String(err).split(","));
    }
  });
}

function createPlanetContent(planetData, buttons) {
  planetData = planetData.results[0];
  buttons.forEach((btn) => (btn.style.display = "none"));
  planetWindowBtn.style.display = "inline-block";
  const imageEl = document.querySelector("img");
  const htmlElementsToFill = [document.querySelector("strong.planetName"), document.querySelector("strong.population"), document.querySelector("strong.diameter"), document.querySelector("strong.climate"), document.querySelector("strong.gravity"), document.querySelector("strong.terrain")];
  const { name, population, diameter, climate, gravity, terrain } = planetData;
  const fillData = [name, Number(population).toLocaleString(), Number(diameter).toLocaleString(), climate[0].toUpperCase() + climate.slice(1), gravity[0].toUpperCase() + gravity.slice(1), terrain[0].toUpperCase() + terrain.slice(1)];
  htmlElementsToFill.forEach((element, i) => {
    if (element.classList.contains("terrain")) {
      const terrainSplited = terrain.split(",");
      for (let i = 0; i < terrainSplited.length; i++) {
        if (picturesDictionary.includes(terrain)) {
          imageEl.src = `../pictures/${terrain}.png`;
          break;
        } else {
          imageEl.src = `../pictures/unknow.png`;
        }
      }
    }
    element.innerText = fillData[i];
  });
}

function eventListenerForRemovePlanetCard(buttons, firstElementCounter) {
  planetWindowBtn.addEventListener("click", (e) => {
    e.preventDefault();
    displayButton(buttons, firstElementCounter);
    planetSite.style.animation = "none";
    planetSite.style.animation = "disapearPlanetSite 2.5s";
    setTimeout(() => {
      planetWindowBtn.style.display = "none";
      planetSite.style.display = "none";
    }, 2000);
  });
}
//  Display planet Information
async function getPlanetInformation(a, searchForPlaneUrl) {
  const planetUrl = searchForPlaneUrl + `${a.innerText}`;
  const response = await axios.get(planetUrl);
  if (response.data.results[0] === undefined) {
    throw new Error(createReturningValue(response.status, "Searching for planets not correctly", planetUrl));
  }
  return response.data;
}
export function displayButton(buttons, firstElementCounter) {
  if (firstElementCounter >= 2 && firstElementCounter < 80) {
    buttons.forEach((btn) => {
      btn.style.display = "flex";
    });
  } else if (firstElementCounter < 2) {
    buttons[1].style.display = "flex";
    buttons[0].style.display = "none";
  } else {
    buttons.forEach((btn) => {
      btn.style.display = "none";
    });
  }
}
