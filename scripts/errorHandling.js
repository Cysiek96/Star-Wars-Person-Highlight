const dictionary = { statusCode: "", errorMessage: "", badUrl: "" };

export function createReturningValue(statusCode, errorMessage, failedUrl) {
  return [statusCode, errorMessage, failedUrl];
}

export function differentStatus(object) {
  const statusCode = object[0];
  const errorName = object[1];
  const failedUrl = object[2];
  displayError([statusCode, errorName, failedUrl]);
}

function displayError(err) {
  let i = 0;
  for (let element in dictionary) {
    dictionary[element] = err[i];
    i++;
  }
  messageLifting(dictionary.errorMessage);
  const infomationElement = document.createElement("section");
  infomationElement.classList.add("information");
  infomationElement.innerText = `${dictionary.statusCode}\n ${dictionary.errorMessage},\n Sent from:\t${dictionary.badUrl ?? "Try in another universe ;)"} `;
  infomationElement.style.background = `linear-gradient(90deg, rgba(214,12,45,0.8392857142857143) 0%, rgba(233,17,17,0.7580532212885154) 35%, rgba(191,21,210,0.7) 100%)`;
  document.querySelector("body").appendChild(infomationElement);

  setTimeout(() => document.querySelector("section.information").remove(), 5000);
}
function messageLifting(msg) {
  const contain = msg?.search("with status code");
  if (contain > -1) {
    dictionary.errorMessage = msg.substring(0, contain);
  }
}
