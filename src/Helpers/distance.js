export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // Radio de la tierra en metros
  const φ1 = (lat1 * Math.PI) / 180; // convierte lat1 a radianes
  const φ2 = (lat2 * Math.PI) / 180; // convierte lat2 a radianes
  const Δφ = ((lat2 - lat1) * Math.PI) / 180; // calcula delta phi
  const Δλ = ((lon2 - lon1) * Math.PI) / 180; // calcula delta lambda
  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // distancia en metros
  return d;
};

// Radio de la tierra en metros, utilizado para calcular la distancia entre dos puntos geográficos utilizando la fórmula de Haversine.
// La fórmula de Haversine se basa en la ley de los cosenos para calcular la distancia entre dos puntos en una esfera, en este caso la Tierra. La fórmula toma en cuenta la curvatura de la Tierra para calcular una distancia más precisa.
