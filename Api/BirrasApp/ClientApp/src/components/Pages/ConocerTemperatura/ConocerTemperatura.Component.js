import 'date-fns';
import React, {useState,useEffect} from 'react';
import Lottie from 'lottie-react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import animationData from '../../../lotties/min-max.json';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Thermometer from 'react-thermometer-component'
import wheatherService from '../../../services/weatherService'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { CircularProgress, Button } from '@material-ui/core';
import './ConocerTemperatura.scss'
import esLocale from 'date-fns/locale/es';

export default function MaterialUIPickers() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const[loading,setLoading] = useState(false);
  
  const[fechaMax,setFechaMax] = useState();
  const[temperatura,setTemperatura] = useState([]);
  useEffect(() =>{
    var d = new Date();
    
    setFechaMax(sumarDias(d,5));
  },[])

  const getWheatherNow = async ()=>{
  
   var data= await wheatherService.getByDateNow();


  var temperatura= data;
  
  setTemperatura(data);
  }
  useEffect(() =>{
    getWheatherNow();
  },[])


  const handleDateChange = async (date) => {
    setSelectedDate(date);
 
   

  };

  const searchWeather= async () =>{
    if(selectedDate !== null){
      if(selectedDate.toDateString() !== "Invalid Date"){
       
        setLoading(true);
            var data= await wheatherService.getByDateToSearch(selectedDate);
            setLoading(false);
            setTemperatura(data)
      }
    }
  }


  function sumarDias(fecha, dias){
    fecha.setDate(fecha.getDate() + dias);
    return fecha.toISOString().substring(0,10);
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    height:50,
    width:50,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    },
    style:{
      width:50,
      height:50
    },
    isStopped:false,
    isPaused:false
  };



  return (
    <Card variant="outlined">
    <CardContent>
      <MuiPickersUtilsProvider  locale={esLocale} utils={DateFnsUtils}>
      <Grid container justify="space-around">
      <Grid item xs={12}>
      <Typography  color="textSecondary" gutterBottom>
          Conozca la temperatura promedio del dia de su meetup
      </Typography>
      <Typography variant="h5" component="h2">
        Seleccione una fecha
      </Typography>
      </Grid>
        <Grid item xs={12} >
        <KeyboardDatePicker
         InputProps={{ readOnly: true }}
          maxDate={fechaMax} 
          initialFocusedDate={Date.now()}
          lang=""
          margin="normal"
          id="date-picker-dialog"
          label="Fecha de la meetup"
          format="dd/MM/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'seleccione fecha',
          }}
          maxDateMessage="Fecha maxima 5 dias a la fecha de hoy"
        />
        </Grid>
        <Grid item xs={6}> 
   <Button
  pending
  pendingPosition="start"
 onClick={searchWeather}
    margin="normal"
        variant="contained"
        color="primary"       
      >
         Consultar
         {loading && <CircularProgress color="secondary"  size={25} />}
        
      
      </Button></Grid>
 <Grid item xs={6}></Grid>
 <Grid item xs={6}>
 <Card variant="outlined">
          <CardContent>
        <Grid item xs={12}>

          <Grid container>
          <Grid item xs={4}>
          </Grid>
          <Grid item xs={8}>
              <Lottie 
                options={defaultOptions}        
                  animationData={animationData}
                  style={{width:150, height:150}}
                />
              </Grid> 
                <Grid item xs={6}>
                <Typography color="textSecondary" gutterBottom>
                Temperatura minima:  {temperatura.min_temp}
            </Typography>
                  </Grid>
                  <Grid item xs={6}>
                  <Typography  color="textSecondary" gutterBottom>
                Temperatura maxima: {temperatura.max_temp}
            </Typography>
                </Grid>
                </Grid>
           
        
        </Grid>
        <Divider light />

        <Grid container>
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={8}>
        <Typography color="textSecondary" gutterBottom>
                Temperatura Promedio
            </Typography>
            <Thermometer           
              theme="light"             
              value={temperatura.the_temp}
              max="50"
              steps="5"
              format="°C" 
              size="large"
              height="200"
             
            />
        </Grid>
        </Grid>
        </CardContent>

      </Card>


 </Grid>
 

            </Grid>
    </MuiPickersUtilsProvider>
    </CardContent>

  </Card>




   
  );
}