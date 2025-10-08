const apiKey = 'd9f9f96605858035ab65d6b04c34bb1a'; 

function getWeather() {
  const city = document.getElementById('cityInput').value;
  const resultDiv = document.getElementById('weatherResult');

  if (!city) {
    resultDiv.innerHTML = '<p>Please enter a city name.</p>';
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('City not found');
      return response.json();
    })
    .then(data => {
      const { name, main, weather } = data;
      const temperature = main.temp;
      const description = weather[0].description;
      const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

      resultDiv.innerHTML = `
        <h2>${name}</h2>
        <img src="${icon}" alt="${description}" class="weather-icon">
        <p><strong>${temperature}°C</strong></p>
        <p>${description}</p>
      `;
    })
    .catch(error => {
      resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}
