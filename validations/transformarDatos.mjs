//fn para transformar datos
function transformarStringAArray(campo) {
  //si es string y no esta vacio
  if (typeof campo === 'string' && campo.length > 0) {
    // separa por comas, recorre c/elem y saca espacios vacios al inicio y final,
    // elimina cualq string vacio
    return campo.split(',').map(p => p.trim()).filter(p => p.length > 0);
  }
  //comprueba si es array, si es devuelve el array sino [] 
  return Array.isArray(campo) ? campo : [];
}

//recibe datos que vienen del form
export function transformarDatosPais(req, res, next) {
  //guarda datos en variable
  const datos = req.body; 

  //transforma los datos con fnTransformarStringAArray
  datos.capital = transformarStringAArray(datos.capital);
  datos.continents = transformarStringAArray(datos.continents);
  datos.languages = transformarStringAArray(datos.languages);
  datos.borders = transformarStringAArray(datos.borders).map(c => c.toUpperCase());
  datos.latlng = transformarStringAArray(datos.latlng).map(Number); 
  datos.timezones = transformarStringAArray(datos.timezones).map(c => c.toUpperCase());

  //sobreescribe los datos 
  req.body = datos;

  //llama al sig middleware
  next();
}
