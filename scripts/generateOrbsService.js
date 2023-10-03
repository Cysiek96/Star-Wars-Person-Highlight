import axios from "axios";
import { differentStatus } from "./errorHandling";
import { createReturningValue } from "./errorHandling";

export function displayProperMachineInformationCard(machineType, parentElement) {
  const divEls = document.querySelectorAll(`div.person-data>div.${machineType}`);
  divEls.forEach((div) => {
    let preventDisplayMoreThanOneVehicelInfoElement = 0;
    div.addEventListener("click", async (e) => {
      preventDisplayMoreThanOneVehicelInfoElement++;
      e.preventDefault();
      const collectElements = { personDataCard: document.querySelectorAll("div.person-data"), vehicles: document.querySelectorAll(`div.person-data>div>a>span`), vehicleInfoCard: document.querySelector("article.machineSection") };
      if (e.target.nodeName === "SPAN") {
        if (!collectElements.vehicleInfoCard && !e.target.classList.contains("clickedVehicle")) {
          assignProperAnimation(e.target, "none", "add");
          try {
            const url = e.target.parentNode.href;
            if (preventDisplayMoreThanOneVehicelInfoElement === 1) {
              await generateMachineResults(url, parentElement, machineType, e.target, collectElements.personDataCard);
              classVeryficationAtVehiclesObj(e.target, collectElements.vehicles, "add");
            }
          } catch (err) {
            classVeryficationAtVehiclesObj(e.target, collectElements.vehicles, "add");
            preventDisplayMoreThanOneVehicelInfoElement = 0;
            assignProperAnimation(e.target, collectElements.vehicleInfoCard, " ");
            differentStatus(String(err).split(","));
          }
        } else if (collectElements.vehicleInfoCard && e.target.classList.contains("clickedVehicle")) {
          setTimeout(() => {
            classVeryficationAtVehiclesObj(e.target, collectElements.vehicles);
            e.target.classList.remove("clickedVehicle");
            collectElements.vehicleInfoCard.remove();
          }, 2000);
          preventDisplayMoreThanOneVehicelInfoElement = 0;
          assignProperAnimation(e.target, collectElements.vehicleInfoCard);
        } else {
          preventDisplayMoreThanOneVehicelInfoElement = 0;
          classVeryficationAtVehiclesObj(e.target, collectElements.vehicles);
        }
      }
    });
    div.addEventListener("dbclick", async (e) => {
      e.preventDefault();
    });
  });
}

async function generateMachineResults(url, parentElement, machineType, clickedElement, personDataCard) {
  try {
    const { data } = await axios.get(url);
    createAndFillMachineElement(data, parentElement, machineType, clickedElement, personDataCard);
  } catch (err) {
    throw new Error(createReturningValue(err.response.status, err.name, url));
  }
}

export function createAndFillMachineElement(data, parentElement, machineType, clickedElement, personDataCard) {
  const dictrionary = { vehicles: "directions_boat", starships: "rocket" };
  const createElementsObj = { articleEl: document.createElement("article"), h3El: document.createElement("h3"), spanEl: document.createElement("span"), divEl: document.createElement("div"), h4El: document.createElement("h4") };
  createElementsObj.h3El.innerText = data.name;
  createElementsObj.spanEl.innerText = dictrionary[machineType];
  createElementsObj.articleEl.classList.add("machineSection");
  createElementsObj.spanEl.classList.add("material-symbols-outlined");
  createElementsObj.divEl.classList.add(machineType);

  for (let i = 0; i < 3; i++) {
    const pEl = createPAndFillWithInformation(data, i);
    createElementsObj.divEl.appendChild(pEl);
  }

  createElementsObj.h4El.innerHTML = `Cost: <b>${Number(data.cost_in_credits).toLocaleString()} $$</b>`;

  for (let element in createElementsObj) {
    if (element !== "articleEl") {
      createElementsObj.articleEl.appendChild(createElementsObj[element]);
    }
  }

  const leftPercentage = compareWhichSideIsClicked(clickedElement, personDataCard);
  createElementsObj.articleEl.style.left = leftPercentage;
  parentElement.appendChild(createElementsObj.articleEl);
}
function createPAndFillWithInformation(data, i) {
  const pEl = document.createElement("p");
  let value = "";
  switch (i) {
    case 0:
      value = `Type: <b>${data.model}</b>`;
      break;
    case 1:
      value = `Manufacturer: <b>${data.manufacturer}</b>`;
      break;
    case 2:
      value = `Max Speed: <b>${data.max_atmosphering_speed}[KM/H]</b>`;
      break;
  }
  pEl.innerHTML = value;
  return pEl;
}

function classVeryficationAtVehiclesObj(clickedElement, allVehiclesOrbs, operation = "remove") {
  allVehiclesOrbs.forEach((orb) => {
    if (orb === clickedElement) {
      if (operation === "add") {
        orb.classList.add("clickedVehicle");
      } else {
        orb.classList.remove("clickedVehicle");
      }
    } else {
      if (operation === "add") {
        orb.setAttribute("disabled", "");
        orb.setAttribute("disabled", "");
      } else {
        orb.setAttribute("disabled", "false");
      }
    }
  });
}

function compareWhichSideIsClicked(clickedElement, personDataCard) {
  if (personDataCard.length === 1) {
    return "35%";
  } else {
    if (personDataCard[0].contains(clickedElement)) {
      return "20.5%";
    } else {
      return "50%";
    }
  }
}

function assignProperAnimation(clickedElement, machineCard, operation = "remove") {
  const animationDictionary = ["none", "disappear 2s", "fillOutTheBubble 2s forwards", "fillTheBubble 2s forwards"];
  if (operation === "remove") {
    if (machineCard !== "none") {
      machineCard.style.animation = animationDictionary[0];
      machineCard.style.animation = animationDictionary[1];
    }
    clickedElement.style.animation = animationDictionary[0];
    clickedElement.style.animation = animationDictionary[2];
  } else {
    clickedElement.style.animation = animationDictionary[0];
    clickedElement.style.animation = animationDictionary[3];
  }
}
