window.addEventListener("load", function () {
  let listedPlanets;
  let listedPlanetsResponse = myFetch(
    "https://handlers.education.launchcode.org/static/planets.json"
  );
  listedPlanetsResponse
    .then(function (result) {
      listedPlanets = result;
    })
    .then(function () {
      let planet = pickPlanet(listedPlanets);
      console.log(planet);
      addDestinationInfo(
        document,
        planet.name,
        planet.diameter,
        planet.star,
        planet.distance,
        planet.moons,
        planet.image
      );
    });

  const form = document.getElementById("launchForm");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const pilotName = document.getElementById("pilotName").value;
    const copilotName = document.querySelector(`[name="copilotName"]`).value;
    const fuelLevel = document.querySelector('[name="fuelLevel"]').value;
    const cargoMass = document.querySelector('[name="cargoMass"]').value;
    console.log(pilotName, copilotName, fuelLevel, cargoMass);

    formSubmission(
      document,
      document.getElementById("faultyItems"),
      pilotName,
      copilotName,
      fuelLevel,
      cargoMass
    );
  });
});
