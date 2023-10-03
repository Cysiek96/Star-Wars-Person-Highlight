export function deletePresentObject() {
  const card = document.querySelectorAll("article.container div.person-data");
  const vehicleCard = document.querySelector("article.machineSection");
  card.forEach((div) => {
    div.style.animation = "disapearPlanetSite 2s";
  });
  if (!(vehicleCard === null)) {
    vehicleCard.style.animation = "none";
    vehicleCard.style.animation = "disapearPlanetSite 2s";
  }

  setTimeout(() => {
    card.forEach((div) => div.remove());
    vehicleCard === null ? "" : vehicleCard.remove();
  }, 2000);
}
