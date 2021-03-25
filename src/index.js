const shows = document.getElementById('show');
const template = document.getElementById('results').content;
const fragment = document.createDocumentFragment();

//Escuchar evento de la barra de búsuqueda (asíncrona)
document.addEventListener('keypress', async e => {
    if (e.target.matches('#searchBar')) {
        // console.log(e.key)
        if (e.key === 'Enter') {
            // console.log('escucho')

            //Consumo de la API
            try {
                shows.innerHTML = `<h3>Cargando...</h3>`;

                let query = e.target.value.toLowerCase(),
                    url = `https://restcountries.eu/rest/v2/name/${query}`,
                    response = await fetch(url),
                    json = await response.json();
                //console.log(url, response, json);

                //Enviar error con throw para ser capturado en el catch (código y mensaje)
                if (!response.ok) throw {
                    status: response.status,
                    statusText: response.statusText
                }

                if (json.lenght === 0) {
                    shows.innerHTML = `<p>No hay resultados que coincidan con tu búsqueda, inténtalo de nuevo.</p>`
                } else {
                    json.forEach(element => {
                        template.querySelector('h3').textContent = element.name;
                    });
                }



            } catch (err) {
                console.log(err);
                const message = err.statusText || "Hubo un error, intenta con una nueva búsqueda.";
                shows.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
                if (err.status === 404) {
                    shows.innerHTML = `<p>No hay resultados que coincidan con tu búsqueda, inténtalo de nuevo.</p>`
                }


            }
        }
    }
})

//URL api
// const url = 'https://restcountries.eu/rest/v2/name/chile?fullText=true';


// // Consumo de la api
// fetch(url)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data)
//     })
//     .catch(err => console.log(err));