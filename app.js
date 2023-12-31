import { blurryLoadingScreen } from "./scripts/blurryLoading";
import { createAndFillPersonCard } from "./scripts/generatePeopleCard";
import { createElementsForPlanetsDisplay } from "./scripts/planetMenuLogic";
import { differentStatus } from "./scripts/errorHandling";
import { displayProperMachineInformationCard } from "./scripts/generateOrbsService";
import { displayButton } from "./scripts/planetMenuLogic";
import { updateLocaleStorage, getLocateStorageitems } from "./scripts/localtorageService";
import { deletePresentObject } from "./scripts/objectDelete";
import { generatePeopleData, getHomeworldNameForSpecificPerson } from "./scripts/newPersoneElementGenerator";
import { compareFirstGeneratedElementCounter } from "./scripts/searchingElementService";
import { generateSearchingPersonCard } from "./scripts/searchingElementService";

const url = "https://swapi.dev/api/";
const planetsUrl = url + "planets";
const peopleUrl = url + "people";
export const searchingPlanetUrl = planetsUrl + "/?search=";

const searchElement = document.getElementById("searchFiled");
const container = document.querySelector("article.container");
const mainEl = document.querySelector("main");
const buttons = document.querySelectorAll("article.container button");
const backToMainMenu = document.querySelector("section.goBackToMainView");
const machineNames = ["vehicles", "starships"];
let firstElement = 1;
let maxItemOnPage = firstElement + 2;
let aElementCounter = 0;

// Display first data package
blurryLoadingScreen();
const lastNumbers = getLocateStorageitems();
let wasSearchUsed;
let getLocateStorageitemsLng;
let prevNextbtnClickCounter = 0;
let searchingInProgress = { enterPushed: false, searching: false };

if (lastNumbers[0] === null) {
  firstElement = 1;
  wasSearchUsed = false;
} else {
  getLocateStorageitemsLng = getLocateStorageitems()[0].length;
  wasSearchUsed = getLocateStorageitems()[1];
  firstElement = lastNumbers[0][0];
  compareFirstGeneratedElementCounter(backToMainMenu);
}

runScriptsForGeneratePersons();

backToMainMenu.addEventListener("click", (e) => {
  e.preventDefault();
  returnToMainManu();
  compareFirstGeneratedElementCounter(backToMainMenu, firstElement);
});
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (prevNextbtnClickCounter === 0) {
      prevNextbtnClickCounter++;
      if (btn.id === "prev") {
        firstElement -= 2;
      } else {
        firstElement += 2;
      }
      wasSearchUsed = false;
      maxItemOnPage += 2;
      compareFirstGeneratedElementCounter(backToMainMenu, firstElement);
      deletePresentObject();
      setTimeout(async () => {
        await runScriptsForGeneratePersons(true);
        prevNextbtnClickCounter = 0;
      }, 2000);
    }
  });
});

searchElement.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchingInProgress.enterPushed = true;
    if (searchElement.value !== "" && searchingInProgress.searching === false) {
      searchingInProgress.searching = true;
      deletePresentObject();
      setTimeout(async () => {
        const elementsForPersonCard = { currentCounter: aElementCounter, personUrl: peopleUrl, searchElement: searchElement, container: container, searchingPlanetUrl: searchingPlanetUrl, buttons: buttons, firstElement: firstElement, backToMainMenu: backToMainMenu };
        await generateSearchingPersonCard(elementsForPersonCard);
        searchingInProgress.enterPushed = false;
        searchingInProgress.searching = false;
        machineNames.forEach((machineName) => {
          displayProperMachineInformationCard(machineName, mainEl);
        });

        compareFirstGeneratedElementCounter(backToMainMenu);
      }, 2000);
    } else if (searchingInProgress.enterPushed === true) {
    } else {
      searchingInProgress.enterPushed = false;
      differentStatus(["Not able to start searching", "Your searching group is empty", "Select some category"]);
    }
  }
});

// Functions that display the person's cards
async function runScriptsForGeneratePersons(buttonClicked = false) {
  try {
    aElementCounter = 0;
    let personData;
    let personUrl = [];
    for (let i = 0; i < 2; i++) {
      displayButton(buttons, firstElement);
      if (lastNumbers[0] !== null && !buttonClicked) {
        if (lastNumbers[0][i] === undefined) {
          break;
        }
      }
      const elementForGenerating = { iteration: i, wasSearchUsed: wasSearchUsed, peopleUrl: peopleUrl, firstElement: firstElement, lastNumbers: lastNumbers, currentCounter: aElementCounter, buttons: buttons, searchingPlanetUrl: searchingPlanetUrl };
      personData = await generatePeopleData(elementForGenerating);
      personUrl[i] = personData.url;
      await getHomeworldNameForSpecificPerson(personData);
      createAndFillPersonCard(personData, container);
      createElementsForPlanetsDisplay(elementForGenerating);

      updateLocaleStorage(personUrl, wasSearchUsed);
      aElementCounter++;
    }
    machineNames.forEach((machineName) => {
      displayProperMachineInformationCard(machineName, mainEl);
    });
  } catch (err) {
    differentStatus(String(err).split(","));
  }
}

async function returnToMainManu() {
  prevNextbtnClickCounter++;
  firstElement = 1;
  wasSearchUsed = false;
  displayButton(buttons, firstElement);
  deletePresentObject();
  if (prevNextbtnClickCounter === 1) {
    setTimeout(async () => {
      await runScriptsForGeneratePersons(true);
      prevNextbtnClickCounter = 0;
    }, 2000);
  }
}
