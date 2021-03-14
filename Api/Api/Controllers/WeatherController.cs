using ApiBirras.Business.Interfaces;
using ApiBirras.Business.Modelos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    
     [ApiController]
    public class WeatherController : ControllerBase
    {

        private readonly IWeatherAppService _weatherAppService;
        public WeatherController(IWeatherAppService weatherAppService)
        {
            _weatherAppService = weatherAppService;
        }

      
        [HttpGet("getWeather")]
        public async Task<WeatherModel> getWeatherAsync()
        {
            var resp = await _weatherAppService.GetTemperatureAsync();

            return resp;
        }


        [HttpGet("getWeatherByDate/{fecha}")]
        public async Task<WeatherModel> getWeatherByDateAsync([FromRoute] string fecha)
        {
            DateTime dateToSearch = DateTime.Parse(fecha);

            var resp = await _weatherAppService.GetTemperatureByDateAsync(dateToSearch);

            return resp;
        }


        [HttpGet("getBoxBeer/{cantidadPersonas}/{fecha}")]

        public async Task<double> GetBoxBeerAsync([FromRoute] int cantidadPersonas, [FromRoute] string fecha)
        {
            DateTime dateToSearch = DateTime.Parse(fecha);
            var resp = await _weatherAppService.GetUnitsBeerForMeeting(cantidadPersonas, dateToSearch);

            return resp;
        }

        [HttpPost("login")]

        public async Task<LoginModel> Login([FromBody] LoginModel model)
        
        {
            if (model.user.ToLower() == "user" && model.pass == "123456")
            {
                model.isUser = true;
                model.isAdmin = false;
                model.isAuthenticated = true;
            }
            else if (model.user.ToLower() == "admin" && model.pass == "123456")
            {
                model.isAdmin = true;
                model.isUser = false;
                model.isAuthenticated = true;
            }
            
           // DateTime dateToSearch = DateTime.Parse(fecha);
            //var resp = await _weatherAppService.GetUnitsBeerForMeeting(cantidadPersonas, dateToSearch);

            return model;
        }

             
    }
}
