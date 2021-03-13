using ApiBirras.Business.Modelos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ApiBirras.Business.Interfaces
{
    public interface IWeatherAppService
    {
       Task<WeatherModel> GetTemperatureAsync();

        Task<WeatherModel> GetTemperatureByDateAsync(DateTime dateToSearch);

        Task<double> GetUnitsBeerForMeeting(int cantidadPersonas, DateTime dateToSearch);
    }
}
