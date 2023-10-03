// import { createVehicleCard } from "./mchineAService";
export function createAndFillPersonCard(person, parentElement) {
  const mainDivEl = createPersonCard(person);
  parentElement.appendChild(mainDivEl);
  createOrbsElementsForMachines(person, mainDivEl);
}

function createPersonCard(person) {
  const pictureClasses = ["material-symbols-outlined", "personVisual"];
  const createElementsObj = { mainDivEl: document.createElement("div"), h3El: document.createElement("h3"), pictureByGenderEl: document.createElement("span"), sectionEl: document.createElement("section") };
  createElementsObj.mainDivEl.classList.add("person-data");
  createElementsObj.h3El.classList.add("personalInformation");
  createElementsObj.h3El.innerText = person.name;
  createElementsObj.pictureByGenderEl.classList.add(...pictureClasses);
  createElementsObj.pictureByGenderEl.innerText = getPicByGenderResponse(person.gender);
  createElementsObj.sectionEl.classList.add("firstInformation");
  for (let i = 0; i <= 5; i++) {
    createElementsObj.sectionEl.appendChild(createAndFillInfomationparagraphs(i, person));
  }
  for (let element in createElementsObj) {
    if (element !== "mainDivEl") {
      createElementsObj.mainDivEl.appendChild(createElementsObj[element]);
    }
  }

  return createElementsObj.mainDivEl;
}

function getPicByGenderResponse(gender) {
  switch (gender) {
    case "male":
      return "boy";
    case "female":
      return "girl";
    default:
      return "robot_2";
  }
}
function createAndFillInfomationparagraphs(i, jsonElement) {
  const pEl = document.createElement("p");
  let value = "";
  switch (i) {
    case 0:
      value = `Height:  <strong>${jsonElement.height}[cm]</strong>`;
      break;
    case 1:
      value = `Mass: <strong>${jsonElement.mass}[kg]</strong>`;
      break;
    case 2:
      value = `Hair Color: <strong>${jsonElement.hair_color}</strong>`;
      break;
    case 3:
      value = `Skin Color: <strong>${jsonElement.skin_color}</strong>`;
      break;
    case 4:
      value = `Eye Color: <strong>${jsonElement.eye_color}</strong>`;
      break;
    case 5:
      value = `Home: <strong><a href="" class="planetLink">${jsonElement.planetName}</a></strong>`;
      break;
  }
  pEl.innerHTML = value;
  return pEl;
}

// Orbs Element for Person Card
function createOrbsElementsForMachines(person, parentElement) {
  const machineNames = ["vehicles", "starships"];
  machineNames.forEach((machineName) => {
    let machineCounter = 0;
    machineCounter += person[machineName].length;
    createMachineOrbsForPerson(machineCounter, machineName, parentElement, person[machineName]);
  });
}

function createMachineOrbsForPerson(count, machineType, mainElement, machineObject) {
  const dictrionary = { vehicles: "directions_boat", starships: "rocket" };
  const createElementsObj = { divEl: document.createElement("div"), h5El: document.createElement("h5") };

  createElementsObj.divEl.classList.add(machineType);

  createElementsObj.h5El.innerText = machineType[0].toUpperCase() + machineType.substring(1);
  createElementsObj.divEl.appendChild(createElementsObj.h5El);

  generateOrbsWithProperValues(machineObject, dictrionary, machineType, count, createElementsObj.divEl);
  setProperDimensionsForGrid(count, createElementsObj.divEl);
  mainElement.appendChild(createElementsObj.divEl);
}
function generateOrbsWithProperValues(machineObject, dictrionary, machineType, count, divEl) {
  for (let i = 0; i < count; i++) {
    const aEl = document.createElement("a");
    aEl.href = machineObject[i];
    const spanEl = document.createElement("span");
    spanEl.innerText = dictrionary[machineType];
    spanEl.classList.add("material-symbols-outlined");
    setProperDimensionsForOrbs(count, spanEl);
    aEl.appendChild(spanEl);
    divEl.appendChild(aEl);
  }
  return divEl;
}
function setProperDimensionsForOrbs(count, spaneElement) {
  const percentageValueForSpanElements = {
    0: "0",
    1: ["30%", "50%"],
    2: ["60%", "50%"],
    3: ["80%", "50%"],
    4: ["80%", "80%"],
  };
  let properNum;
  if (percentageValueForSpanElements[count]) {
    properNum = count;
  } else {
    properNum = 4;
    spaneElement.style.fontSize = "20px";
  }
  spaneElement.style.width = `${percentageValueForSpanElements[properNum][0]}`;
  spaneElement.style.height = `${percentageValueForSpanElements[properNum][1]}`;
}
function setProperDimensionsForGrid(count, divEl) {
  let gridValue = "";
  for (let i = 1; i <= count; i++) {
    gridValue += ` ${100 / count}%`;
  }
  if (count === 1) {
    divEl.style.gridTemplateColumns = "100%";
  } else if (count > 3) {
    divEl.style.gridTemplateRows = "20% 40% 40%";
    divEl.style.gridTemplateColumns = "33% 33% 33%";
  } else {
    divEl.style.gridTemplateColumns = gridValue;
  }
}
