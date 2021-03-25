//Llamar a la api
const url = 'https://restcountries.eu/rest/v2/all';

//Consumo de la api
fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
    .catch(err => console.log(err));