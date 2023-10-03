import axios from "axios";
import { createReturningValue, differentStatus } from "./errorHandling";
import { getHomeworldNameForSpecificPerson } from "./newPersoneElementGenerator";
import { createAndFillPersonCard } from "./generatePeopleCard";
import { createElementsForPlanetsDisplay } from "./planetMenuLogic";
import { displayButton } from "./planetMenuLogic";
import { updateLocaleStorage } from "./localtorageService";

export async function generateSearchingPersonCard(aElementCounter, peopleUrl, searchElement, container, searchingPlanetUrl, buttons, firstElement, backToMainMenu) {
  aElementCounter = 0;
  let peopleUrls = [];
  const searchingForCharacterUrl = peopleUrl + "/?search=" + searchElement.value;
  try {
    const searchingResults = await axios.get(searchingForCharacterUrl);
    const dataResultsCounter = searchingResults.data.count;
    if (dataResultsCounter === 0) {
      throw new Error(createReturningValue(searchingResults.data.status, "You pass a data which not exist", searchingForCharacterUrl));
    }
    generateInformationAboutSearching(searchElement);
    searchElement.value = "";
    searchElement.innerText = "";
    for (let i = 0; i < dataResultsCounter; i++) {
      peopleUrls[i] = searchingResults.data.results[i].url;
    }
    for (let i = 0; i < dataResultsCounter; i++) {
      const currentResult = searchingResults.data.results[i];
      await getHomeworldNameForSpecificPerson(currentResult);
      createAndFillPersonCard(currentResult, container);
      createElementsForPlanetsDisplay(aElementCounter, searchingPlanetUrl, buttons, firstElement);
      if (i >= 1) {
        break;
      }
    }

    updateLocaleStorage(peopleUrls, true);
    displayButton(buttons, 1000);
  } catch (err) {
    differentStatus(String(err).split(","));
  }
}

function generateInformationAboutSearching(searchElement) {
  const infomationElement = document.createElement("section");
  infomationElement.classList.add("information");
  infomationElement.innerText = `Searching for: ${searchElement.value}`;
  document.querySelector("body").appendChild(infomationElement);
  setTimeout(() => document.querySelector("section.information").remove(), 5000);
}

export function compareFirstGeneratedElementCounter(backToMainMenu, firstElement = 2) {
  backToMainMenu.style.animation = "";
  if (firstElement > 1) {
    backToMainMenu.style.animation = "appear 1.5s forwards";
    backToMainMenu.style.display = "flex";
  } else {
    backToMainMenu.style.animation = "disappear 1.5s forwards";
  }
}
