import Axios from 'axios';


const axios = Axios.create({
	baseURL: "https://localhost:44360/api/Weather/",
	headers:{
		'Content-Type':'application/json; charset=utf-8',
		
	}
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



export const post = async (monitoreo, hc, model) => {
	try {
		debugger;
		const urlFilter = `ehr/Monitor/SaveMonitoreo/${monitoreo}/${hc}`
		const response = await axios.post(urlFilter

			, model,
			{
				headers: { 'Content-Type': 'application/json' }
			},

		);
		return response.data;
	
	} catch (error) {
		console.error(error);
		return '[]';
	}
};

export const getFilterBeetwenDate = async (monitoreo, startDate, endDate, hc) => {
	try {
		const urlFilterBeetwenDate = `ehr/Monitor/getPeriodoMonitoreo/${monitoreo}/${startDate}/${endDate}/${hc}`;

		const response = await axios.get(urlFilterBeetwenDate);
		const { data } = response.data;
		return data;
	} catch (error) {
		console.error(error);
		return [];
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


const getByDateToSearch = async (date)=> {
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



export default { post, getFilterBeetwenDate, getByDateNow, getByDateToSearch };