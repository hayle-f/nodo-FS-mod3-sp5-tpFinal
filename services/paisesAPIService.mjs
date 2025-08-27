import axios from "axios";

//Llamada a la API para obtener los paises, y utilizacion de fn para hacer la limpieza
export async function obtenerPaisesAPI() {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/region/america');
        const datos = response.data;
        /* console.log(Object.keys(datos[0])); */

        const paisesFiltradosES = filtrarPaisesEnEspañol(datos);
        /* console.log(paisesFiltradosES[4]); */

        const paisesFinal = limpiarPaises(paisesFiltradosES);

        return paisesFinal;

    } catch (error) {
        console.log('Error al obtener los paises:', error);
        return [];
    }
}



// fn para filtrar paises con idioma Español
function filtrarPaisesEnEspañol(paises) { 
   return paises.filter((pais) => 
        pais.languages && Object.keys(pais.languages).includes('spa')
    );
};

//fn para limpiar los datos y guardar solo los que queremos de cada pais
function limpiarPaises(paises) {
  return paises.map(pais => {
    return {
      name: pais.name?.nativeName?.spa?.official || pais.name?.official || pais.name?.common || "Desconocido",
      capital: pais.capital || [],
      region: pais.region || "Desconocida",
      subregion: pais.subregion || "Desconocida",
      languages: pais.languages ? Object.values(pais.languages) : [],
      latlng: pais.latlng || [],
      borders: pais.borders || [],
      area: pais.area || 0,
      population: pais.population || 0,
      gini: (pais.gini && Object.values(pais.gini).length > 0)
        ? Object.values(pais.gini).reduce((a, b) => a + b, 0) / Object.values(pais.gini).length
        : null,
      flags: pais.flags?.svg || pais.flags?.png || null,
      timezones: pais.timezones || [],
      continents: pais.continents || [],
      creator: "Haylén Ferrario"
    };
  });
}


