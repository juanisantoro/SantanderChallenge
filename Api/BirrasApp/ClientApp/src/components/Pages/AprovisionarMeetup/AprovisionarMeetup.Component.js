import 'date-fns'
import React, { useState, useEffect } from 'react'
import Lottie from 'lottie-react'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import animationData from '../../../lotties/min-max.json'
import animationDataBeer from '../../../lotties/6889-happy-friday.json'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import Thermometer from 'react-thermometer-component'
import wheatherService from '../../../services/weatherService'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Icon from '@material-ui/core/Icon'
import { CircularProgress, Button } from '@material-ui/core'
import weatherService from '../../../services/weatherService'
import esLocale from 'date-fns/locale/es'

export default function MaterialUIPickers() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date())
  const [cantidadPersonas, setCantidad] = useState(1)
  const [fechaValida, setFechaValida] = useState(true)
  const [loading, setLoading] = useState(false)

  const [fechaMax, setFechaMax] = useState()
  const [temperatura, setTemperatura] = useState([])
  const [cantidadBirras, setCantidadBirras] = useState(0)
  useEffect(() => {
    var d = new Date()

    setFechaMax(sumarDias(d, 5))
  }, [])

  const getWheatherNow = async () => {
    var data = await wheatherService.getByDateNow()

    var temperatura = data

    setTemperatura(data)
  }
  useEffect(() => {
    getWheatherNow()
  }, [])

  const handleDateChange = async (date) => {
    setSelectedDate(date)
  }

  const handlePersonsChange = (value) => {
    setCantidad(value.valueOf().target.valueAsNumber)
  }

  const calculateBeer = () => {
    debugger
    setLoading(true)
    weatherService
      .getBeersBoxAndWheather(selectedDate, cantidadPersonas)
      .then((data) => {
        setLoading(false)
        debugger

        setCantidadBirras(data.cantBeer)
        setTemperatura(data.weather)
      })
  }

  function sumarDias(fecha, dias) {
    fecha.setDate(fecha.getDate() + dias)
    return fecha.toISOString().substring(0, 10)
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    height: 50,
    width: 50,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
    style: {
      width: 50,
      height: 50,
    },
    isStopped: false, 
    isPaused: false,
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <MuiPickersUtilsProvider locale={esLocale} utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <Grid item xs={12}>
              <Typography color="textSecondary" gutterBottom>
                Calcule la cantidad de cajas de cerveza a comprar
              </Typography>
              <Typography variant="h5" component="h2">
                Seleccione la fecha de su meetup e ingrese cantidad de personas
              </Typography>
            </Grid>
            <Grid container item xs={12}>
              <Grid item xs={3}>
                <KeyboardDatePicker
                  required
                  InputProps={{ readOnly: true }}
                  error={
                    selectedDate !== null &&
                    selectedDate.toDateString() !== 'Invalid Date'
                      ? false
                      : true
                  }
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

              <Grid item xs={2}>
                <TextField
                  defaultValue={cantidadPersonas}
                  error={cantidadPersonas > 0 ? false : true}
                  onChange={handlePersonsChange}
                  value={cantidadPersonas}
                  margin="normal"
                  id="standard-number"
                  label="Cantidad de personas"
                  type="number"
                  required={true}
                  inputProps={{
                    InputProps: { min: 0, max: 1000, pattern: '^[1-9]d*$' },
                  }}
                />
              </Grid>

              <Grid item xs={2}></Grid>
            </Grid>
            <Grid item xs={6}>
              <Button
                pending
                pendingPosition="start"
                onClick={calculateBeer}
                margin="normal"
                variant="contained"
                color="primary"
                disabled={
                  cantidadPersonas > 0 &&
                  selectedDate !== null &&
                  selectedDate.toDateString() !== 'Invalid Date'
                    ? false
                    : true
                }
                endIcon={<Icon></Icon>}
              >
                Calcular
                {loading && <CircularProgress color="secondary" size={25} />}
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Card variant="outlined">
                <CardContent>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography variant="h5" component="h2">
                        Cantidad de cajas recomendada: {cantidadBirras}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={8}>
                      <Lottie
                        options={defaultOptions}
                        animationData={animationDataBeer}
                        style={{ width: 150, height: 150 }}
                      />
                    </Grid>
                  </Grid>

                  <Divider></Divider>
                  <Grid item xs={12}>
                    <Grid container>
                      {selectedDate !== null &&
                      selectedDate.toDateString() !== 'Invalid Date' ? (
                        <Typography variant="h5" component="h2">
                          Temperatura para el dia{' '}
                          {selectedDate.toLocaleDateString()}
                        </Typography>
                      ) : (
                        ''
                      )}
                      <Grid item xs={12}></Grid>
                      <Grid item xs={4}></Grid>
                      <Grid item xs={8}>
                        <Lottie
                          options={defaultOptions}
                          animationData={animationData}
                          style={{ width: 150, height: 150 }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography color="textSecondary" gutterBottom>
                          Temperatura minima: {temperatura.min_temp}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography color="textSecondary" gutterBottom>
                          Temperatura maxima: {temperatura.max_temp}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider light />

                  <Grid container>
                    <Grid item xs={4}></Grid>
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

            <Grid item xs={6}>
              <Card variant="outlined">
                <CardContent>
                  <Grid container></Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </CardContent>
    </Card>
  )
}
