
import './cityform.scss';
import {Select, SelectSection, SelectItem} from "@nextui-org/react";
import { useState, useEffect } from 'react';
import { getApiCities } from '../../services/apiService';
import { apiCities } from '../../models/apiModels';
import { changeCity, selectCity } from '../../store/citySlice';
import { useSelector, useDispatch } from 'react-redux';

function Cityform(){
  const [cities, setCities] = useState<apiCities[]>([]);
  const ciudad = useSelector(selectCity);
  const dispatch = useDispatch();

  useEffect( () => {//se llama en cada actualización
    //if cities está vacio
    if(cities.length == 0){
      obtainCities();
    }
  },[ciudad])

  function handleCitySelectionChange(e:any){
    const value = e.target.value;
    const ciudadAction = cities.find(city => city.key == value) || {key:'', value:''};
    //actualizamos store con la ciudad
    dispatch(changeCity(ciudadAction))
  }

  function obtainCities(){
    getApiCities().subscribe(cities => {
      let citiesArr :apiCities[] = [];
      Object.keys(cities).forEach(key => {
        citiesArr.push({key:key, value:cities[key]})
      })
      setCities(citiesArr);
    })
  }

  return (
    <>
    <div className='h-10' id="select-wrapper">
        <Select label="Selecciona una ciudad" onChange={handleCitySelectionChange}
         className='py-0' classNames={ {mainWrapper: "h-12 blanco", base:""} } id="select"  variant='bordered'>
          {cities.map( (city) => (
            <SelectItem key={city.key} className='' >{city.value}</SelectItem>
            ))}
      </Select>
    </div>
    </>
  );
}

export default Cityform;