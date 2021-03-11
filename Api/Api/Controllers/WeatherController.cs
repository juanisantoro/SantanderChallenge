﻿using ApiBirras.Business.Interfaces;
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
        public async Task<string> getWeatherAsync()
        {
            var resp = await _weatherAppService.GetTemperatureAsync();

            return resp;
        }

        [HttpGet("getBoxBeer/{cantidadPersonas}")]

        public async Task<double> getBoxBeerAsync([FromRoute] int cantidadPersonas)
        {
            var resp = await _weatherAppService.GetUnitsBeerForMeeting(cantidadPersonas);

            return resp;
        }

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
