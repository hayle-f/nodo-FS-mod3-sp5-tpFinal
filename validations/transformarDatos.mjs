// validations/transformarDatosPais.mjs

function transformarStringAArray(campo) {
  if (typeof campo === 'string' && campo.length > 0) {
    return campo.split(',').map(p => p.trim()).filter(p => p.length > 0);
  }
  return Array.isArray(campo) ? campo : [];
}

export function transformarDatosPais(req, res, next) {
  const datos = req.body;

  datos.capital = transformarStringAArray(datos.capital);
  datos.languages = transformarStringAArray(datos.languages);
  datos.borders = transformarStringAArray(datos.borders).map(c => c.toUpperCase());
  datos.latlng = transformarStringAArray(datos.latlng).map(Number); 
  datos.timezones = transformarStringAArray(datos.timezones);

  req.body = datos;
  next();
}
