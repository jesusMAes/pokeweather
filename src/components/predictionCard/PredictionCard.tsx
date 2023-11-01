
import { useSelector } from 'react-redux';
import './PredictionCard.scss';
import { selectCity } from '../../store/citySlice';
import { useEffect, useState } from 'react';
import { getCityDailyPrediction, getCityWeeklyPrediction } from '../../services/apiService';
import { dailyPrediction } from '../../models/apiModels';
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import { format } from 'date-fns';
import { FaTemperatureArrowUp, FaTemperatureArrowDown } from 'react-icons/fa6';
import { LiaCloudRainSolid } from 'react-icons/lia';
import PokemonPredictionPreview from '../pokemonPredictionPreview/PokemonPredictionPreview';

function PredictionCard(){

  const [loading, setLoading] = useState<boolean>(true);
  const [predictionData, setPredictionData] = useState<dailyPrediction>();
  const [weeklyPrediction, setWeeklyPrediction] = useState<dailyPrediction[]>();
  const [selectedPrediction, setSelectedPrediction] = useState<dailyPrediction>();
  const selectedCity = useSelector(selectCity) || "";
  const loadingImage = "https://i.gifer.com/origin/28/2860d2d8c3a1e402e0fc8913cd92cd7a_w200.gif";

  useEffect( () => {
    if(selectedCity.key){
      obtainPrediction();
    }
  }, [selectedCity])

  const obtainPrediction = () => {
    const cityCode = selectedCity.key;
    setLoading(true);
    getCityDailyPrediction(cityCode).subscribe(prediction => {
      setPredictionData(prediction);
      setSelectedPrediction(prediction);
      setLoading(false)
    })
    getCityWeeklyPrediction(cityCode).subscribe(predictionArr => {
      let parsedWeeklyPrediction:dailyPrediction[] = [];
      for(let i = 0; i< predictionArr.dates.length; i++){
        parsedWeeklyPrediction.push ( { date: predictionArr.dates[i], max: predictionArr.max[i], min: predictionArr.min[i], precipitation_prob: predictionArr.precipitation_prob[i], sunrise: predictionArr.sunrise[i], sunset:predictionArr.sunset[i], temperatureImage: predictionArr.temperatureImages[i], weatherCode:predictionArr.weatherCode[i], weatherCodeImage: predictionArr.weatherCodeImages[i]} )
      }
      setWeeklyPrediction(parsedWeeklyPrediction);
    })
  }

  const getPredictionDate = () => {
    const fecha = format(new Date(selectedPrediction!.date), 'dd/MM/yyyy ')
    return  fecha;
  }

  const getPredictionImage = () => {
    const image = selectedPrediction ? selectedPrediction.weatherCodeImage.image : loadingImage;
    return image;
  }

  const getMiniImage = () => {
    const image = selectedPrediction ? selectedPrediction.temperatureImage.image : '';
    return image;
  }

  const getMiniTitle = (type:string) => {
    switch(type){
      case 'temp':
        return selectedPrediction ? selectedPrediction.temperatureImage.label : '';
      case 'weather':
        return selectedPrediction ? selectedPrediction.weatherCodeImage.label : '';
      default: return '';
    }
  }

  function handlePokemonClick(prediction:any){
    if(prediction && prediction.date){
      setSelectedPrediction(prediction)
    }
  }

  function getPrimaryClassNames(prediction:any){
    let baseClases = 'mainPokemon pokemon-background place-self-end';
    if(prediction && selectedPrediction && prediction.date == selectedPrediction.date){
      baseClases += ' selected'
    }
    return baseClases;
  }

  function getSecondaryClassNames(prediction:any){
    let baseClases = 'secondaryPokemon pokemon-background place-self-end';
    if(prediction && selectedPrediction && prediction.date == selectedPrediction.date){
      baseClases += ' selected'
    }
    return baseClases;
  }

  function getSecondaryClassNamesRight(prediction:any){
    let baseClases = 'secondaryPokemon pokemon-background place-self-start';
    if(prediction && selectedPrediction && prediction.date == selectedPrediction.date){
      baseClases += ' selected'
    }
    return baseClases;
  }

  return (
    <>
    <div className='my-2 w-screen y-screen flex justify-center colorfondo'>
      <Card className='my-2 py-2 card-width card-border'>
      <CardHeader className=" pt-2 px-4 flex-row items-start justify-between">
        <div className='city-data'>
          <p className="text-tiny uppercase font-bold">{selectedCity.value}</p>
          {selectedPrediction?.date ?  <small className="text-default-500">{getPredictionDate()}</small> : null}
        </div>
        <div className='temperature-gif'  title={getMiniTitle('temp')}>
          <Image src={getMiniImage()} className='mini-gif'></Image>
        </div>
      </CardHeader>
      <CardBody className='flex-col justify-center mb-0 pb-1' title={getMiniTitle('weather')}>
        <div className='min-w-full flex justify-center'><Image src={getPredictionImage()} className='poke-gif'></Image></div>
        <div className='datacolumn flex-row mt-1'>
          { selectedPrediction ?
          <ul className='flex justify-center gap-x-5'>
            <li className='flex gap-x-1'><FaTemperatureArrowUp className='temp-icon'></FaTemperatureArrowUp>{selectedPrediction.max}º</li>
            <li className='flex gap-x-1'><FaTemperatureArrowDown className='temp-icon'></FaTemperatureArrowDown>{selectedPrediction.min}º</li>
            <li className='flex gap-x-1'><LiaCloudRainSolid className='temp-icon'></LiaCloudRainSolid>{selectedPrediction.precipitation_prob}%</li>
          </ul> : <span></span>
          }
        </div>
      </CardBody>
      </Card>
    </div>
  
    <div  className='my-10 w-screen y-screen grid md:grid-cols-2 md:gap-5 sm:grid-cols-1 gap-2'>
      <div className='flex flex-col md:justify-end sm:justify-start gap-2'>
          <div className={ getPrimaryClassNames( weeklyPrediction? weeklyPrediction[0]:undefined)}
           onClick={ () => { handlePokemonClick(weeklyPrediction ? weeklyPrediction[0]:undefined)} }>
            <PokemonPredictionPreview prediction={weeklyPrediction ? weeklyPrediction[0]:{}} key={weeklyPrediction ? weeklyPrediction[0].sunrise : 1}
              ></PokemonPredictionPreview>

          </div>
          <div className={ getSecondaryClassNames(weeklyPrediction ? weeklyPrediction[1]:undefined)} onClick={ () => { handlePokemonClick(weeklyPrediction ? weeklyPrediction[1]:undefined)} } >
            <PokemonPredictionPreview  prediction={weeklyPrediction ? weeklyPrediction[1]:{}} key={weeklyPrediction ?weeklyPrediction[1].sunrise : 2} 
            ></PokemonPredictionPreview>
          </div>
          <div className={ getSecondaryClassNames(weeklyPrediction ? weeklyPrediction[2]:undefined)}  onClick={ () => { handlePokemonClick(weeklyPrediction ? weeklyPrediction[2]:undefined)}}>
            <PokemonPredictionPreview  prediction={weeklyPrediction ? weeklyPrediction[2]:{}} key={weeklyPrediction ?weeklyPrediction[2].sunrise : 3}></PokemonPredictionPreview>
            </div>
      </div>
    
      <div className='flex flex-col justify-end gap-2'>
          <div className={getSecondaryClassNamesRight(weeklyPrediction ? weeklyPrediction[3]:undefined)}  onClick={ () => { handlePokemonClick(weeklyPrediction ? weeklyPrediction[3]:undefined)}}>
            <PokemonPredictionPreview  prediction={weeklyPrediction ? weeklyPrediction[3]:{}}  key={weeklyPrediction ?weeklyPrediction[3].sunrise : 4}></PokemonPredictionPreview>
          </div>
          <div className={getSecondaryClassNamesRight(weeklyPrediction ? weeklyPrediction[4]:undefined)}  onClick={ () => { handlePokemonClick(weeklyPrediction ? weeklyPrediction[4]:undefined)}}>
            <PokemonPredictionPreview  prediction={weeklyPrediction ? weeklyPrediction[4]:{}}  key={weeklyPrediction ?weeklyPrediction[4].sunrise : 5}></PokemonPredictionPreview>
          </div>
          <div className={getSecondaryClassNamesRight(weeklyPrediction ? weeklyPrediction[5]:undefined)}  onClick={ () => { handlePokemonClick(weeklyPrediction ? weeklyPrediction[5]:undefined)}}>
            <PokemonPredictionPreview  prediction={weeklyPrediction ? weeklyPrediction[5]:{}} key={weeklyPrediction ?weeklyPrediction[5].sunrise : 6}></PokemonPredictionPreview>
          </div>
      </div>
    </div>
    </>
  )
}

export default PredictionCard;