export function updateLocaleStorage(personUrl, searchWasUsed = false) {
  const personNumber = [];
  personUrl.forEach((url, i) => {
    personNumber[i] = Number(url.split("/")[5]);
  });
  localStorage.setItem("lastGeneratedPersonNum", JSON.stringify(personNumber));
  localStorage.setItem("searchWasUsed", searchWasUsed);
}
export function getLocateStorageitems() {
  const lastNumbers = localStorage.getItem("lastGeneratedPersonNum");
  const wasSearchUsed = localStorage.getItem("searchWasUsed");
  return [JSON.parse(lastNumbers), wasSearchUsed];
}
