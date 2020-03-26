// Write your JavaScript code here!

window.addEventListener("load", function() {
   let form = document.querySelector("form");
   let pilotName = document.querySelector("input[name=pilotName]");
   let copilotName = document.querySelector("input[name=copilotName]");
   let fuelLevel = document.querySelector("input[name=fuelLevel]");
   let cargoMass = document.querySelector("input[name=cargoMass]");
   let cargoStatus = document.getElementById("cargoStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let faultyItems = document.getElementById("faultyItems");
   let launchStatus = document.getElementById("launchStatus");

   this.fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
      response.json().then(function (json) {
         const missionTarget = document.getElementById("missionTarget");
         const index = Math.floor(Math.random() * json.length);

         missionTarget.innerHTML += `
            <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[index].name}</li>
               <li>Diameter: ${json[index].diameter}</li>
               <li>Star: ${json[index].star}</li>
               <li>Distance from Earth: ${json[index].distance}</li>
               <li>Number of Moons: ${json[index].moons}</li>
            </ol>
            <img src="${json[index].image}"></img>
         `
      });
   });

   form.addEventListener("submit", function(event) {
      event.preventDefault();

      if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
         alert("All fields are required.");
      } else if (isNaN(pilotName.value) === false || isNaN(copilotName.value) === false || isNaN(fuelLevel.value) === true || isNaN(cargoMass.value) === true) {
         alert("Enter valid data types.");
      } else {
         checkForFaultyItems();
      }
   });

   function checkForFaultyItems() {
      let html = `
      <ol>
         <li id="pilotStatus">${pilotName.value} is ready for launch.</li>
         <li id="copilotStatus">${copilotName.value} is ready for launch.</li>
      `;
      if (fuelLevel.value < 10000 && cargoMass.value > 10000) {
         html += `\n
               <li id="fuelStatus">There is not enough fuel for the journey.</li>
               <li id="cargoStatus">There is too much mass for the shuttle to take off.</li>
            </ol>
         `;
         faultyItems.style.visibility = "visible";
         launchStatus.html = `<h2 id="launchStatus">Shuttle not ready for launch.</h2>`;
         launchStatus.style.color = "red";
      } else if (fuelLevel.value < 10000) {
         html += `\n
            <li id="fuelStatus">There is not enough fuel for the journey.</li>
            <li id="cargoStatus">Cargo mass low enough for launch.</li>
         </ol>
         `;
         faultyItems.style.visibility = "visible";
         launchStatus.innerHTML = `<h2 id="launchStatus">Shuttle not ready for launch.</h2>`;
         launchStatus.style.color = "red";
      } else if (cargoMass.value > 10000) {
         html += `\n
            <li id="fuelStatus">Fuel level high enough for launch.</li>
            <li id="cargoStatus">There is too much mass for the shuttle to take off.</li>
         </ol>
         `;
         faultyItems.style.visibility = "visible";
         launchStatus.innerHTML = `<h2 id="launchStatus">Shuttle not ready for launch.</h2>`;
         launchStatus.style.color = "red";
      } else {
         faultyItems.style.visibility = "hidden";
         launchStatus.innerHTML = `<h2 id="launchStatus">Shuttle is ready for launch.</h2>`;
         launchStatus.style.color = "green";
      }
      faultyItems.innerHTML = html
   }
});