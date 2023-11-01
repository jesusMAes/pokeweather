import { Observable } from "rxjs";
import  {ajax} from "rxjs/ajax";
import { of, map, tap } from "rxjs";
import { apiCities, dailyPrediction, weeklyPrediction } from "../models/apiModels";


//conjunto de metodos que llaman a la api del poketiempo
const urlBase = `https://poketiempoapi.onrender.com`;//puerto de la app react, TODO:cambiar para deploy

export function getApiCities():Observable<any>{
  const url = `${urlBase}/cities/`
  return ajax<any>({method:'GET', url:url}).pipe(map(res => res.response));
}

export function getCityDailyPrediction(cityCode:string):Observable<dailyPrediction>{
  const url = `${urlBase}/prediction/daily/city/${cityCode}`;
  return ajax<dailyPrediction>({method:'GET', url:url}).pipe(map(res => res.response))
}

export function getCityWeeklyPrediction(cityCode:string):Observable<weeklyPrediction>{
  const url = `${urlBase}/prediction/weekly/city/${cityCode}`;
  return ajax<weeklyPrediction>({method:'GET', url:url}).pipe(map(res => res.response))
}