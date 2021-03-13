using System;
using System.Collections.Generic;
using System.Text;

namespace ApiBirras.Business.Modelos
{
   public  class LoginModel
    {
        public string user { get; set; }
        public string pass { get; set; }

        public bool? isUser { get; set; }
        public bool? isAdmin { get; set; }

        public bool? isAuthenticated { get; set; }

    }
}
