const form = document.getElementById("locationForm");
const input = document.getElementById("locationInput");
const weatherData = document.getElementById("weatherData");
const loadingMessage = document.getElementById("loadingMessage");

async function getWeather(location) {
  loadingMessage.style.display = "block";
  weatherData.innerHTML = "";

  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=9BHRYLKGR7M29QPLN6UWSXHM6&contentType=json`
    );

    if (!response.ok) {
      throw new Error(`Error al buscar la ubicación: ${response.status}`);
    }

    const data = await response.json();

    const temp = data.currentConditions.temp;
    const conditions = data.currentConditions.conditions;
    const iconName = data.currentConditions.icon;

    const iconUrl = `images/${iconName}.png`;

    weatherData.innerHTML = `
            <h2>${data.resolvedAddress}</h2>
            <img src="${iconUrl}" alt="${conditions}">
            <p>Temperatura: ${temp}°C</p>
            <p>Condiciones: ${conditions}</p>
        `;
  } catch (error) {
    weatherData.textContent = `Error: No se pudo obtener el clima. Por favor, revisa la ubicación.`;
    console.error(error);
  } finally {
    loadingMessage.style.display = "none";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = input.value;
  getWeather(location);
});
