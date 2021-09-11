/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-pascal-case */
import './App.css';
import image from './assest/paper-1074131_1920.jpg'
import { CssBaseline, Container } from '@material-ui/core';
import Search_bar from './component/search.jsx';
import Footer from './component/footer.jsx';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Progress from './component/progress.jsx';
import TodayWeather from './component/todayWeather.jsx';
import ThreeDaysWeather from './component/threeDaysWeather.jsx';
import NotFound from './component/notfound.jsx';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
  },
  bg:{
    backgroundImage:`url(${image})`
  }
}));

const env = {
  appName: 'Edsolabs 5-Day Forecast',
  author: 'VinhNT',
  base: 'http://api.weatherapi.com/v1/',
  key: '065ab399ee1445c092d42238211009',
};

function App() {
  const classes = useStyles();
  const [text, setText] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [locationName, setLocationName] = useState('');
  const [loading, setLoading] = useState(3);
  function handleChange(newValue) {
    setText(newValue);
  }
  function handleSubmit() {
    fetchAPI();
  }
  async function fetchAPI() {
    try {
      setLoading(2);
      const requestURL = env.base;
      const response = await fetch(
        `${requestURL}forecast.json?key=${env.key}&q=${text}&days=3&aqi=no&alerts=no`
      );
      const responseJSON = await response.json();
      const newWeatherData = responseJSON.forecast.forecastday;
      const locationName = responseJSON.location.name;
      setLocationName(locationName);
      setWeatherData(newWeatherData);
      setLoading(1);
    } catch {
      setLoading(4);
    }
  }
  return (
    <React.Fragment >
      <CssBaseline />
      <div className={classes.bg} >

      <Container maxWidth="md"  className={classes.root}>
        <Search_bar
          text={text}
          onSubmit={handleSubmit}
          onChange={handleChange}
          appName={env.appName}
        />
        {loading === 1 && (
          <>
            <TodayWeather location={locationName} data={weatherData} />
            <ThreeDaysWeather data={weatherData} />
          </>
        )}
        {loading === 2 && <Progress />}
        {loading === 4 && <NotFound />}

        <Footer author={env.author} />
      </Container>
      </div>

    </React.Fragment>
  );
}

export default App;
