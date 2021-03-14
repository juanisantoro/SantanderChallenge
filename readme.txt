Santander meetups

A tener en cuenta para el uso de nuestra aplicación

-----------------------------------------------------BackEnd---------------------------------------------------------------
Pre-requisitos y definiciones generales 📋
Visual studio 2019 o version anterior que nos permita acceder a la solucion del proyecto.

Se desarrollo una rest api en .net core 2.2, asegurarse de tener instalado dicha version del framework o version que soporte la nombrada anteriormente.
Link descarga net core 2.2 :
https://dotnet.microsoft.com/download/dotnet/2.2

Se creo un swagger para documentar la Api Rest, tal cual pedido en la especificacion.

La api esta configurada dentro del archivo launchappsettings.json que corra en la direccion local
https://localhost:44360/

Dicha direccion es consumida desde el frontend, asegurarse que al correr la Api sea htpps y el mismo puerto, no modificar.

Posiblemente al correr la aplicacion por primera vez en "local host" con "https", visual studio nos pida instalar un certificado SSL, instalarlo.

-----------------------------------------------------FrontEnd---------------------------------------------------------------
Pre-requisitos y definiciones generales 📋
Se recomienda el uso del editor de codigo fuente Visual Studio Code

Lo primero es instalar las dependencias, configuradas en package-lock.json y package.json 

Para lo cual debemos ir hasta la ruta de la carpeta que contenga el la carpeta node_modules
ejemplo:

Debemos abrir la consola de Visual Studio Code (CTRL + Ñ), etc y ejecutar

cd C:\73a6f27b-2df2-40fe-a3ad-12e8d65348cf\Api\BirrasApp\ClientApp

una vez dentro de la carpeta ClientApp, tambien en consola de Visual Studio Code ejecutar:
npm install

este comando instalará todas las dependencias para que nuestro proyecto funcione correctamente.

En segundo lugar para poder probar el funcionamiento de la App, se debe tener la api corriendo en https://localhost:44360/

Acto seguido, parados en la misma raiz mencionada anteriormente con la consola de Visual Studio Code

Ejecutar npm start, para dar comienzo a nuestra aplicación

-----------------------------------------------------Aclaraciones funcionalidad---------------------------------------------------------------

Para todas las pantallas que utilizan temperatura, se establecio el concepto de "Temperatura promedio" la cual es el valor que devuelve la Api consumida
Pero la api devuelve la temperatura actual, segun la hora que se la este llamando, no se puede setear fecha y hora, siempre devuelve el ultimo registro
de temperatura.

----------------------------------------------------------Login-------------------------------------------------------------------------------
El login llama al backend, a su respectivo controller, pero se realizó un mock de la validacion

Existen dos perfiles llamados "user" y "admin", la contraseña para ambos perfiles es "123456" (En los placeholder de login esta tambien)
Posee validacion para campos vacios, si no se completan ambos no se permite el intento de login
No se realizo capa de acceso a datos por falta de tiempo. La aplicacion NO posee DB.

Según el usuario logeado, son las opciones de acceso que brinda la aplicación.

Los datos de login se guardan en sessionStorage del frontend.

----------------------------------------------------------Home--------------------------------------------------------------------------------

Descripcion inicial de la aplicacion, con una amigable animación.

----------------------------------------------------------Perfil admin--------------------------------------------------------------------------------
----------------------------------------------------------Pantalla Conocer Temperatura-----------------------------------------------------------------
Al iniciar, se carga por default la temperatura de la fecha de hoy, mostrando temperatura minima, maxima y "promedio".
Se establecio como maximo permitido 7(siete) dias posteriores a la fecha hoy para la consulta.
Seleccionar fecha con el date picker y presionar consultar.

----------------------------------------------------------Aprovisionar meetup-----------------------------------------------------------------
Al iniciar, se carga por default la temperatura de la fecha de hoy, mostrando temperatura minima, maxima y "promedio".
Se establecio como maximo permitido 7(siete) dias posteriores a la fecha hoy para la consulta.
Seleccionar fecha y cantidad de personas a asistir a la meeting, para el calculo de cajas a comprar, presionar calcular para hacer el calculo.

----------------------------------------------------------Crear meetup-----------------------------------------------------------------

La creacion de meetups es en local storage, no se posee DB, no son persistidos por no poseer capa de accedo a datos.
Se permite crear una nueva meetup, editar sus datos y eliminar.



----------------------------------------------------------Perfil user--------------------------------------------------------------------------------

----------------------------------------------------------Pantalla Conocer Temperatura-----------------------------------------------------------------
Al iniciar, se carga por default la temperatura de la fecha de hoy, mostrando temperatura minima, maxima y "promedio".
Se establecio como maximo permitido 7(siete) dias posteriores a la fecha hoy para la consulta.
Seleccionar fecha con el date picker y presionar consultar.

----------------------------------------------------------Pantalla Meetups-----------------------------------------------------------------
Se cargan todas las meetups creadas con el usuario "admin". Las mismas alojadas en LocalStorage, NO en DB.
Se puede inscribir a una ingresando "si" en la meeting que se desee, luego se puede marcar asistencia de la misma manera.