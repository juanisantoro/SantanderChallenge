using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ApiBirras.Business.Interfaces
{
    public interface IWeatherAppService
    {
       Task<string> GetTemperatureAsync();
        
       Task<double> GetUnitsBeerForMeeting(int cantidadPersonas);
    }
}
