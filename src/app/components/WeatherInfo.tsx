interface CurrentWeather {
    name: string
    dt: number
    main: {
      temp: number
      feels_like: number
      humidity: number
      pressure: number
    }
    weather: {
      description: string
      icon: string
    }[]
  }
  
  function WeatherInfo({ weather }: { weather: CurrentWeather }) {
    return (
      <div className="bg-white/10 rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-2">{weather.name}</h2>
        <div className="flex items-center justify-center gap-4 mb-2">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
          <p className="text-4xl font-bold">{Math.round(weather.main.temp)}ºC</p>
        </div>
        <p className="capitalize text-lg mb-2">{weather.weather[0].description}</p>
        <div className="flex justify-around text-sm text-[#c7d5e0]">
          <p>Sensação: {Math.round(weather.main.feels_like)}ºC</p>
          <p>Umidade: {weather.main.humidity}%</p>
          <p>Pressão: {weather.main.pressure} hPa</p>
        </div>
      </div>
    )
  }
  
  export default WeatherInfo
  