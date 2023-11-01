


export interface apiCities{
  key:string,
  value:string
}

export interface apiImageObject{
  image:string,
  label:string
}

export interface dailyPrediction{
  date:string,
  max:number,
  min:number,
  precipitation_prob:number,
  sunrise:string,
  sunset:string,
  temperatureImage:apiImageObject,
  weatherCode:number,
  weatherCodeImage:apiImageObject
}

export interface weeklyPrediction{
  dates:string[],
  max:number[],
  min:number[],
  precipitation_prob:number[],
  sunrise:string[],
  sunset:string[],
  temperatureImages:apiImageObject[],
  weatherCode:number[],
  weatherCodeImages:apiImageObject[]
}