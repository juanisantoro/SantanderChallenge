using System;
using System.Collections.Generic;
using System.Text;

namespace ApiBirras.Business.Modelos
{
    public class WeatherModel
    {
        public long id { get; set; }
        public DateTime created { get; set; }
        public float min_temp { get; set; }
        public float max_temp { get; set; }
        public float the_temp { get; set; }
    }
}
