'use client'

import { useState, useRef } from 'react'
import axios from 'axios'
import WeatherInfo from './components/WeatherInfo'
import WeatherInfo5Days from './components/WeatherInfo5Days'

function Page() {
  const [weather, setWeather] = useState()
  const [weather5Days, setWeather5Days] = useState()
  const inputRef = useRef<HTMLInputElement>(null)

  async function searchCity() {
    if (!inputRef.current) return
    const city = inputRef.current.value
    const key = "f964587f2ee18829d1d9b32a649c7163"

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`
    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`

    try {
      const [apiData, apiInfo5Day] = await Promise.all([
        axios.get(url),
        axios.get(url5Days)
      ])

      setWeather(apiData.data)
      setWeather5Days(apiInfo5Day.data)
    } catch (error) {
      console.error("Erro ao buscar dados do clima:", error)
    }
  }

  return (
    <div className="min-h-screen bg-[#1b2838] text-[#c7d5e0] font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#2a475e] rounded-xl p-8 shadow-lg text-center">
        <h1 className="text-4xl font-bold text-[#66c0f4] mb-6">Previsão do Tempo</h1>
        <div className="flex justify-center mb-6">
          <input
            ref={inputRef}
            type="text"
            placeholder="Digite o nome da cidade"
            className="p-2 rounded-l-full w-2/3 max-w-xs bg-gray-100 text-gray-800 focus:outline-none"
          />
          <button
            onClick={searchCity}
            className="bg-[#66c0f4] text-[#1b2838] font-bold px-4 rounded-r-full hover:bg-[#417a9b] transition"
          >
            Buscar
          </button>
        </div>
        {weather && <WeatherInfo weather={weather} />}
        {weather5Days && <WeatherInfo5Days weather5Days={weather5Days} />}
      </div>
    </div>
  )
}

export default Page
