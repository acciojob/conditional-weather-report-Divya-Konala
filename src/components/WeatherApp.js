import React, {useState } from 'react'
import Axios from 'axios'

const apik= "2f21fa30b1082fee9e850a9b52541b90";

const WeatherApp=()=>{
    const [location,setLocation]=useState();
    const [click,setClick]=useState(false);
    const [temp,setTemp]=useState();
    const [condition,setCondition]=useState();
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apik}`
    
    const generateWeatherReport=()=>{
        setClick(true);
        Axios.get(url)
        .then((res)=>{
            console.log(res);
            setTemp(Math.round(res.data.main.temp-273.15));
            setCondition(res.data.weather[0].description);
        })
        .catch((error)=>console.log(error.message))
    }
    function getBGColor(){
        if(temp==undefined) return "white";
        return (temp>20)?"#fe6347":"#3fe0d0";
    }
    return <div className='WeatherApp' style={{ backgroundColor:getBGColor()}}>
       <h1>Weather App</h1>
       <input onChange={(e)=>setLocation(e.target.value)} placeholder='Enter your location'/>
        {
            (click)
            ?<>
                {
                    ( temp!==undefined && condition!==undefined)
                    ?<h2>temperature: {temp} conditions: {condition}</h2>
                    :<p>Invalid location</p>
                }
            </>
            :""
        }
        <button onClick={generateWeatherReport}>Weather Report</button>
    </div>
}

export default WeatherApp