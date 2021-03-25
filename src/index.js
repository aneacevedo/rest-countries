//Variables
const shows = document.getElementById('shows');
const template = document.getElementById('showTemplate').content;
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
                        //Buscar etiqueta para crear un hijo dentro con la información
                        template.querySelector('h3').textContent = element.name;
                        template.querySelector('img').src = element.flag;
                        template.querySelector('p.capital').textContent = 'Capital: ' + element.capital;
                        template.querySelector('p.region').textContent = 'Región: ' + element.region;
                        template.querySelector('p.limits').textContent = 'Países limítrofes: ' + element.borders;
                        template.querySelector('p.languages').textContent = 'Lengua: ' + element.languages[0].nativeName;
                        template.querySelector('p.currencies').textContent = 'Moneda: ' + element.currencies[0].name;
                        template.querySelector('p.symbol').textContent = 'Símbolo: ' + element.currencies[0].symbol;


                        //Crear clon del nodo
                        let cloneTemplate = document.importNode(template, true);
                        fragment.appendChild(cloneTemplate);
                    });
                    //Limpiar
                    shows.innerHTML = '';
                    //Agregar nodo hijo a shows
                    shows.appendChild(fragment);
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