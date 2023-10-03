import axios from "axios";
import { createReturningValue } from "./errorHandling";

export async function generatePeopleData(i, wasSearchUsed, peopleUrl, firstElement, lastNumbers) {
  let searchPeropleByUrl = peopleUrl + `/${firstElement + i}/ `;
  if (wasSearchUsed) {
    searchPeropleByUrl = peopleUrl + `/${lastNumbers[0][i]}/`;
  }
  try {
    const peopleResult = await axios.get(searchPeropleByUrl);
    const { data } = peopleResult;
    return data;
  } catch (err) {
    throw new Error(createReturningValue(err.response.status, err.name, searchPeropleByUrl));
  }
}

export async function getHomeworldNameForSpecificPerson(person) {
  const searchPlanetByPersonPlanetUrl = person?.homeworld === undefined ? "The person was not found" : person.homeworld;
  try {
    const { data } = await axios.get(searchPlanetByPersonPlanetUrl);
    person.planetName = data.name;
  } catch (err) {
    throw new Error(createReturningValue(err.response.status, err.name, searchPlanetByPersonPlanetUrl));
  }
}
