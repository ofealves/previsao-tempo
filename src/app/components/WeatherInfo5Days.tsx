interface WeatherForecast {
    dt: number
    main: {
      temp_min: number
      temp_max: number
    }
    weather: {
      description: string
      icon: string
    }[]
  }
  
  interface Weather5DaysData {
    list: WeatherForecast[]
  }
  
  function WeatherInfo5Days({ weather5Days }: { weather5Days: Weather5DaysData }) {
    const dailyForecast: Record<string, WeatherForecast> = {}
  
    for (let forecast of weather5Days.list) {
      const date = new Date(forecast.dt * 1000).toLocaleDateString()
      if (!dailyForecast[date]) {
        dailyForecast[date] = forecast
      }
    }
  
    const nextFiveDays = Object.values(dailyForecast).slice(1, 6)
  
    function convertDate(day: WeatherForecast) {
      return new Date(day.dt * 1000).toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
      })
    }
  
    return (
      <div className="bg-white/10 rounded-lg p-6 mt-6">
        <h3 className="text-xl font-semibold mb-4">Previsão Próximos 5 dias</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {nextFiveDays.map((day) => (
            <div key={day.dt} className="bg-white/10 p-4 rounded text-center">
              <p className="capitalize font-medium">{convertDate(day)}</p>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt={day.weather[0].description}
                className="mx-auto"
              />
              <p className="capitalize">{day.weather[0].description}</p>
              <p>{Math.round(day.main.temp_min)}ºC / {Math.round(day.main.temp_max)}ºC</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  export default WeatherInfo5Days
  