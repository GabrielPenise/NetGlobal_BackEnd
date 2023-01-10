const Nominatim = require("nominatim-geocoder");

const getCoordinates = async (street, city, state, postalcode) => {
  const geocoder = new Nominatim();
  const response = await geocoder.search({
    street,
    city,
    country: "Argentina",
    state,
    postalcode,
  });
  return response.length ? [response[0].lat, response[0].lon] : response;
};

// distancia en kilómetros
const distanceCoordinates = (lat1, lon1, lat2, lon2) => {
  // convertir grados a radianes
  const rad = (x) => (x * Math.PI) / 180;

  // radio medio de la tierra
  const R = 6371;

  lat1 = rad(lat1);
  lat2 = rad(lat2);
  lon2 = rad(lon2);
  lon1 = rad(lon1);

  return (
    R *
    Math.acos(
      Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2) +
        Math.sin(lat1) * Math.sin(lat2)
    )
  );
};

module.exports = { getCoordinates, distanceCoordinates };
