import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://localhost:44360/api/Weather/",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

// var api = axios.create({
//   baseURL: CONFIG.API_BASE_URL,
//   headers: {
//     'Access-Control-Allow-Origin' : '*',
//     'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
//     'Authorization': `JWT ${localStorage.getItem('token')}`
//     }
// })

// export default api

export const Login = async (user, pass) => {
  var modelLogin = {
    user: user,
    pass: pass,
  };
  try {
    debugger;
    const urlFilter = `login/`;
    const response = await axios.post(
      urlFilter,

      modelLogin,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return "[]";
  }
};

const getByDateNow = async () => {
  try {
    const urlFilterByDate = `getWeather/`;

    const response = await axios.get(urlFilterByDate);
    debugger;
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getByDateToSearch = async (date) => {
  try {
    const urlFilterByDate = `getWeatherByDate/${date.toISOString()}`;

    const response = await axios.get(urlFilterByDate);
    debugger;
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getBeersBox = async (date, cantidadPersonas) => {
  try {
    const urlFilterByDate = `getBoxBeer/${cantidadPersonas}/${date.toISOString()}`;

    const response = await axios.get(urlFilterByDate);
    debugger;
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getBeersBoxAndWheather = async (date, cantidadPersonas) => {
  try {
    debugger;
    const urlBeer = `https://localhost:44360/api/Weather/getBoxBeer/${cantidadPersonas}/${date.toISOString()}`;
    const urlWeather = `https://localhost:44360/api/Weather/getWeatherByDate/${date.toISOString()}`;

    return await Axios.all([Axios.get(urlBeer), Axios.get(urlWeather)]).then(
      function (data) {
        var beer = data[0].data;
        var weather = data[1].data;

        return {
          weather: weather,
          cantBeer: beer,
        };
      }
    );
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default {
  Login,
  getByDateNow,
  getByDateToSearch,
  getBeersBox,
  getBeersBoxAndWheather,
};
