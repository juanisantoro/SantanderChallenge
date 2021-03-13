using ApiBirras.Business.Interfaces;
using ApiBirras.Business.Modelos;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace ApiBirras.Business.Servicios
{
    public class WeatherAppService : IWeatherAppService
    {
        IMapper _mapper;

        string dateNow = DateTime.Now.ToString("yyyy/MM/dd");

        public WeatherAppService(IMapper mapper)
        {
            _mapper = mapper;
        }
        public async Task<WeatherModel> GetTemperatureAsync()
        {
            HttpClient client;
            HttpRequestMessage request;

            //realizao las configuraciones para la llamada a la api
            ClientConfiguration(out client, out request, dateNow);

            using (var response = await client.SendAsync(request))
            {
                response.EnsureSuccessStatusCode();
                var body = await response.Content.ReadAsStringAsync();

             
                var WeatherElement = ExtractWeather(body);

                // en el front end hacer un substring para que quede solo 1 decimal
                // despues de la coma
               // var jsonToReturn = JsonSerializer.Serialize(WeatherElement);

                return WeatherElement;
               
            }
        }

        public async Task<WeatherModel> GetTemperatureByDateAsync(DateTime dateToSearch)
        {
            HttpClient client;
            HttpRequestMessage request;

            //realizao las configuraciones para la llamada a la api
            ClientConfiguration(out client, out request, dateToSearch.ToString("yyyy/MM/dd"));

            using (var response = await client.SendAsync(request))
            {
                response.EnsureSuccessStatusCode();
                var body = await response.Content.ReadAsStringAsync();


                var WeatherElement = ExtractWeather(body);

                // en el front end hacer un substring para que quede solo 1 decimal
                // despues de la coma
                // var jsonToReturn = JsonSerializer.Serialize(WeatherElement);

                return WeatherElement;

            }
        }


        private static WeatherModel ExtractWeather(string body)
        {  //Mapeo los valores del json, al modelo de temperatura
            var jsonElement = JsonSerializer.Deserialize<List<WeatherModel>>(body);
            //obtengo el primer elemento, la lista siempre viene ordenada del mas actual al mas viejo
            //se retorna los valores de una semana desde la fecha y hora actual hacia atras
            return jsonElement[0];
        }

        private static void ClientConfiguration(out HttpClient client, out HttpRequestMessage request, string date)
        {
            client = new HttpClient();
          

            request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                // RequestUri = new Uri("https://community-open-weather-map.p.rapidapi.com/weather?q=Buenos%20Aires%2C%20AR%20&lat=0&lon=0&callback=test&id=2172797&lang=null&units=%22metric%22&mode=xml%2C%20html"),
                RequestUri = new Uri("https://www.metaweather.com/api/location/468739/"+ date +""),

            };
        }

        public async Task<double> GetUnitsBeerForMeeting(int cantidadPersonas, DateTime dateToSearch)
        {
            HttpClient client;
            HttpRequestMessage request;
          
            const int unidadesPorCaja = 6;
            double unidades=0;
            double cajas=0;

            //realizao las configuraciones para la llamada a la api
            ClientConfiguration(out client, out request, dateToSearch.ToString("yyyy/MM/dd"));


    // Tenemos un proveedor que nos vende cajas de 6 unidades de birras.
    //El problema es que: si hace entre 20 y 24 grados, se toma una birra por persona;
    // si hace menos de 20 grados,
    //se toma 0.75;
    // y si hace mucho calor(más de 24 grados), 
    //se toman 2 birras más por persona. 
    //Y siempre preferimos que sobre y no que falte.

            using (var response = await client.SendAsync(request))
            {
                response.EnsureSuccessStatusCode();
                var body = await response.Content.ReadAsStringAsync();


                var WeatherElement = ExtractWeather(body);

                if(WeatherElement.the_temp  < 20 )
                {
                    unidades = 0.75 * cantidadPersonas;
                }
                else if(WeatherElement.the_temp >= 20 && WeatherElement.the_temp <= 24)
                {
                    unidades = 1 * cantidadPersonas;
                }
                else if (WeatherElement.the_temp >= 24)
                {
                    unidades = 2 * cantidadPersonas;
                }

                cajas = unidades /unidadesPorCaja  ;

                cajas= Math.Ceiling(cajas);

                return cajas;

            }

           
        }
    }
}
