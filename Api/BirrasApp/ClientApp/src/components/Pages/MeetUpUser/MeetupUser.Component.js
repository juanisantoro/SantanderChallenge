import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import "date-fns";
import {
  Column,
  DataGrid,
  Editing,
  Paging,
  RequiredRule,
} from "devextreme-react/data-grid";
import React, { useEffect, useState } from "react";
import "whatwg-fetch";

export default function MaterialUIPickers() {
  // The first commit of Material-UI
  const [meetings, setMeetings] = useState([]);
  const [validate, setValidate] = useState(false);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("meetings")) !== null) {
      var listOfMeetings = JSON.parse(localStorage.getItem("meetings"));

      setMeetings(listOfMeetings);
    }
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

  const validateUpdate = (data) => {
    // if (
    //   data.newData["inscripto"] === undefined &&
    //   data.newData["asistio"] === undefined
    // ) {
    //   setValidate(false);
    //   return;
    // }

    if (data.newData.inscripto !== undefined) {
      if (data.newData.inscripto.toLowerCase() !== "si") {
        data.newData.inscripto = data.oldData.inscripto;
        return;
      } else {
        data.newData.inscripto = "Si";
      }
    }

    if (data.newData.asistio !== undefined) {
      if (data.newData.asistio.toLowerCase() !== "si") {
        data.newData.asistio = data.oldData.asistio;
        return;
      } else {
        data.newData.asistio = "Si";
      }
    }

    if (data.newData.nombre !== undefined) {
      data.newData.nombre = data.oldData.nombre;
      return;
    }

    if (data.newData.fecha !== undefined) {
      data.newData.fecha = data.oldData.fecha;
      return;
    }
  };

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
    if (validate) {
      var listMeeting = meetings.filter((x) => x.__KEY__ !== data.data.__KEY__);

      var newMeeting = {
        fecha: new Date(data.data.fecha).toISOString(),
        nombre: data.data.nombre,
        __KEY__: data.data.__KEY__,
        inscripto: data.data.inscripto,
        asistio: data.data.asistio,
      };

      listMeeting.push(newMeeting);
      localStorage.setItem("meetings", JSON.stringify(listMeeting));

      setMeetings(listMeeting);
    }
  };

  return (
    <Card width='100%' variant='outlined'>
      <CardContent width='100%'>
        <Grid container justify='space-around'>
          <Grid xs={3}></Grid>
          <Grid item xs={9}>
            <Typography variant='h5' component='h2' gutterBottom>
              Administración de meetups
            </Typography>
          </Grid>

          <Grid xs={3}></Grid>
          <Grid item xs={9}>
            <Typography color='textSecondary' gutterBottom>
              Ingrese "si" para Inscribirse
            </Typography>
          </Grid>

          <Grid xs={3}></Grid>
          <Grid item xs={9}>
            <Typography color='textSecondary' gutterBottom>
              Ingrese "si" para Marcar que asistió
            </Typography>
          </Grid>

          <Grid item xs={3}></Grid>
          <Grid item xs={9}>
            <DataGrid
              onRowRemoved={(data) => {
                onDelete(data);
              }}
              onRowUpdating={(data) => {
                validateUpdate(data);
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
                // allowAdding={true}
                // allowDeleting={true}
                // deleteRow={true}
                allowUpdating={true}
              />
              <Paging defaultPageSize={8}></Paging>
              <Column width={150} required dataField='nombre' caption='Nombre'>
                <RequiredRule message='Es obligatorio' />
              </Column>

              <Column
                width={75}
                dataField='inscripto'
                caption='Inscripto'></Column>
              <Column width={75} dataField='asistio' caption='Asistió'></Column>

              <Column
                width={150}
                required
                dataField='fecha'
                caption='Fecha'
                dataType='date'>
                <RequiredRule message='Es obligatorio' />
              </Column>

              {/* <Column
                caption='Inscribirse - Asistió'
                type='buttons'
                width={170}
                buttons={[
                  {
                    hint: "",
                    icon: "add",
                    visible: true,
                    tooltip: "Inscribirse",
                    onClick: (e) => {},
                  },

                  {
                    hint: "",
                    icon: "aaa",

                    visible: true,
                    onClick: (e) => {
                       
                    },
                  },
                  {
                    hint: "",
                    icon: "check",
                    tooltip: "Asistió",
                    onClick: (e) => {
                       
                    },
                  },
                ]}
              /> */}

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
        </Grid>
      </CardContent>
    </Card>
  );
}
