import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import "date-fns";
import {
  Column,
  DataGrid,
  Editing,
  RequiredRule,
} from "devextreme-react/data-grid";
import React, { useEffect, useState } from "react";
import "whatwg-fetch";
import "./AddMeetup.styles.scss";

export default function MaterialUIPickers() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [cantidadPersonas, setCantidad] = useState(1);
  const [fechaValida, setFechaValida] = useState(true);
  const [meetings, setMeetings] = useState([]);

  const [fechaMax, setFechaMax] = useState();
  const [temperatura, setTemperatura] = useState([]);
  const [cantidadBirras, setCantidadBirras] = useState(0);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("meetings")) !== null)
      setMeetings(JSON.parse(localStorage.getItem("meetings")));
  }, []);

  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   height: 50,
  //   width: 50,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  //   style: {
  //     width: 50,
  //     height: 50,
  //   },
  //   isStopped: false,
  //   isPaused: false,
  // };

  const meetingData = [];

  const onRowRemoved = (data) => {};

  const saveMeeting = (data) => {
    var listMeeting = meetings;

    localStorage.setItem("meetings", JSON.stringify(listMeeting));
  };

  const onDelete = (data) => {
    var listMeeting = meetings.filter((x) => x.__KEY__ !== data.__KEY__);

    localStorage.setItem("meetings", JSON.stringify(listMeeting));
  };

  const onUpdate = (data) => {
    var listMeeting = meetings.filter((x) => x.__KEY__ !== data.data.__KEY__);

    var newMeeting = {
      fecha: new Date(data.data.fecha).toISOString(),
      nombre: data.data.nombre.charAt(0).toUpperCase(),
      __KEY__: data.data.__KEY__,
      inscripto: data.data.inscripto,
      asistio: data.data.asistio,
    };

    listMeeting.push(newMeeting);
    localStorage.setItem("meetings", JSON.stringify(listMeeting));

    setMeetings(listMeeting);
  };

  return (
    <Card variant='outlined'>
      <CardContent>
        <Grid container justify='space-around'>
          <Grid item xs={6}>
            <Card variant='outlined'>
              <CardContent>
                <Grid container>
                  <Typography variant='h5' component='h2' gutterBottom>
                    Administración de meetups
                  </Typography>
                  <DataGrid
                    onRowRemoved={(data) => {
                      onDelete(data);
                    }}
                    onRowUpdated={(data) => {
                      onUpdate(data);
                    }}
                    locale={"es-ES"}
                    id='grid'
                    showBorders={true}
                    dataSource={meetings}
                    onRowInserted={saveMeeting}
                    repaintChangesOnly={true}>
                    <Editing
                      texts={{
                        addRow: "Agregar",
                        saveRowChanges: "Guardar",
                        cancelRowChanges: "Cancelar",
                        deleteRow: "eliminar",
                        confirmDeleteTitle: "Eliminar meetup",
                        confirmDeleteMessage: "¿Seguro que desea eliminar?",
                      }}
                      refreshMode={"reshape"}
                      mode='cell'
                      allowAdding={true}
                      allowDeleting={true}
                      deleteRow={true}
                      allowUpdating={true}
                    />

                    <Column required dataField='nombre' caption='Nombre'>
                      <RequiredRule message='Es obligatorio' />
                    </Column>

                    <Column
                      defaultVisible={false}
                      dataField='inscripto'
                      caption='inscripto'></Column>
                    <Column
                      defaultVisible={false}
                      dataField='asistio'
                      caption='inscripto'></Column>

                    <Column
                      required
                      dataField='fecha'
                      caption='Fecha'
                      dataType='date'>
                      <RequiredRule message='Es obligatorio' />
                    </Column>

                    {/* <Column
                      type='buttons'
                      width={200}
                      buttons={[
                        {
                          hint: "",
                          icon: "trash",
                          visible: true,
                          onClick: (e) => {
                            onDelete(e.row.key);
                          },
                        },
                      ]}
                    /> */}
                  </DataGrid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
