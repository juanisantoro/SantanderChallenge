import Grid from "@material-ui/core/Grid";
import Lottie from "lottie-react";
import React from "react";
import animationData from "../lotties/19713-six-pack-beer.json";
export default () => {
  const displayName = "Birras App";

  const defaultOptions = {
    loop: true,
    autoplay: true,
    height: 50,
    width: 50,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
    style: {
      width: 50,
      height: 50,
    },
    isStopped: false,
    isPaused: false,
  };

  return (
    <Grid container alignContent='center'>
      <Grid item xs={12}>
        <h1>Santander Tecnología</h1>
        <p>Bienvenido a santander meetups</p>
        <ul>
          En Santander Tecnología queremos armar las mejores meetups y para eso
          planeamos hacer una App que nos ayude a lograr que no falte lo
          fundamental... ¡Birras!
        </ul>
      </Grid>
      <Grid item xs={4} md={4}></Grid>
      <Grid item xs={8} md={8}>
        <Lottie
          options={defaultOptions}
          animationData={animationData}
          style={{ width: 300, height: 300 }}
        />
      </Grid>
    </Grid>
  );
};
