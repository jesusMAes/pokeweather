import { useSelector } from "react-redux";
import { dailyPrediction } from "../../models/apiModels";
import './PokemonPredictionPreview.scss';
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import { useState, useEffect } from 'react';
import { selectCity } from "../../store/citySlice";



function PokemonPredictionPreview (props:any){
  const [prediction, setPrediction] = useState<dailyPrediction>(props.prediction);
  const loadingImage = "https://i.gifer.com/origin/28/2860d2d8c3a1e402e0fc8913cd92cd7a_w200.gif";

  
  useEffect( () => {
    
  }, [prediction.max])


  function getPredictionImage(){
    return prediction && prediction.weatherCode ? prediction.weatherCodeImage.image: loadingImage;
  }

  function getFecha(prediction:any){
    let fecha:Date = new Date(prediction.date);
    let day = fecha.toLocaleString('es', {weekday: 'long'});
    let dayNumber = fecha.getDate() ;
    let month = fecha.toLocaleString('default', { month: 'long' });
    return `${day} ${dayNumber} de ${month}`;
  }

  return(
    <>
    <div className="w-full h-full prediction-wrapper flex flex-row items-center gap-5">
      <div className="imagenWrapper">
      <Image src={getPredictionImage()} className="tinyImagen" disableSkeleton={true}></Image>
      </div>
      <div className="flex flex-col mb-3 ml-5 grow">
        {prediction && prediction.date ? 
        <div className="mr-10">
          <span className="">{getFecha(prediction)}</span>
          <div className="" >
            <div className= "barrwraper">
              <div className="contentBarr"></div>
            </div>
          </div>
          <div className="temp_indicator">{Math.round(prediction.min)}º / {Math.round(prediction.max)}º </div>
        </div>
        : <span></span>
        }
      </div>
    </div>
    </>
  )

}

export default PokemonPredictionPreview;