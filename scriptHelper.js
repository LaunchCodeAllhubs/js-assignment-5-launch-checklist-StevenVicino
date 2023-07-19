// Write your helper functions here!
require("isomorphic-fetch");

function addDestinationInfo(
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) {
  const missionTarget = document.getElementById("missionTarget");
  missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: <${diameter}/li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src= "${imageUrl}">
  `;
}

function validateInput(testInput) {
  if (!testInput || testInput.length === 0) {
    return "Empty";
  } else if (isNaN(testInput)) {
    return "Not a Number";
  } else {
    return "Is a Number";
  }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  let warning = false;
  let launchStatus = document.getElementById("launchStatus");
  let fuelStatus = document.getElementById("fuelStatus");
  let cargoStatus = document.getElementById("cargoStatus");
  let fuelReady = false;
  let cargoReady = false;
  list.style.visibility = "hidden";
  if (validateInput(pilot) === "Not a Number") {
    let pilotStatus = document.getElementById("pilotStatus");
    pilotStatus.textContent = `Pilot ${pilot} is ready for launch`;
  } else {
    warning = true;
  }
  if (validateInput(copilot) === "Not a Number") {
    let copilotStatus = document.getElementById("copilotStatus");
    copilotStatus.textContent = `Co-pilot ${copilot} is ready for launch`;
  } else {
    warning = true;
  }

  if (validateInput(fuelLevel) === "Not a Number") {
    warning = true;
  } else if (fuelLevel < 10000) {
    fuelStatus.textContent = "Fuel level too low for launch";
    fuelReady = false;
  } else {
    fuelStatus.textContent = "Fuel level high enough for launch";
    fuelReady = true;
  }

  if (validateInput(cargoLevel) === "Not a Number") {
    warning = true;
  } else if (cargoLevel > 10000) {
    cargoStatus.textContent = "Cargo mass too heavy for launch";
    cargoReady = false;
  } else {
    cargoStatus.textContent = "Cargo mass low enough for launch";
    cargoReady = true;
  }

  if (warning === true) {
    alert("Make sure to enter valid information for each field!");
    return;
  }
  console.log(fuelReady, cargoReady);
  if (fuelReady !== true || cargoReady !== true) {
    launchStatus.textContent = "Shuttle Not Ready for Launch";
    launchStatus.style.color = "#C7254E";
    list.style.visibility = "visible";
  } else {
    launchStatus.textContent = "Shuttle is Ready for Launch";
    launchStatus.style.color = "#419F6A";
    list.style.visibility = "visible";
  }
}

async function myFetch(url) {
  let planetsReturned;

  planetsReturned = await fetch(url).then(function (response) {
    return response.json();
  });

  return planetsReturned;
}

function pickPlanet(planets) {
  return planets[Math.floor(Math.random() * planets.length)];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
