import axios from "axios";
import { createReturningValue, differentStatus } from "./errorHandling";
import { getHomeworldNameForSpecificPerson } from "./newPersoneElementGenerator";
import { createAndFillPersonCard } from "./generatePeopleCard";
import { createElementsForPlanetsDisplay } from "./planetMenuLogic";
import { displayButton } from "./planetMenuLogic";
import { updateLocaleStorage } from "./localtorageService";

export async function generateSearchingPersonCard(object) {
  object.currentCounter = 0;

  let peopleUrls = [];
  const searchingForCharacterUrl = object.personUrl + "/?search=" + object.searchElement.value;

  try {
    const searchingResults = await axios.get(searchingForCharacterUrl);
    const dataResultsCounter = searchingResults.data.count;
    if (dataResultsCounter === 0) {
      throw new Error(createReturningValue(searchingResults.data.status, "You pass a data which not exist", searchingForCharacterUrl));
    }
    generateInformationAboutSearching(object.searchElement);
    object.searchElement.value = "";
    object.searchElement.innerText = "";
    for (let i = 0; i < dataResultsCounter; i++) {
      peopleUrls[i] = searchingResults.data.results[i].url;
    }
    for (let i = 0; i < dataResultsCounter; i++) {
      const currentResult = searchingResults.data.results[i];
      await getHomeworldNameForSpecificPerson(currentResult);
      createAndFillPersonCard(currentResult, object.container);
      const elementsForPlanetDisplay = { currentCounter: object.currentCounter, searchingPlanetUrl: object.searchingPlanetUrl, buttons: object.buttons, firstElement: object.firstElement };
      createElementsForPlanetsDisplay(elementsForPlanetDisplay);
      if (i >= 1) {
        break;
      }
    }

    updateLocaleStorage(peopleUrls, true);
    displayButton(object.buttons, 1000);
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
