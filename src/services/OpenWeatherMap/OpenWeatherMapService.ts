import { AxiosResponse } from 'axios'

import { IWeather } from '~/@types/entities/Weather.types'
import { IOpenWeatherMapRequest } from '~/services/OpenWeatherMap/OpenWeatherMapService.types'
import { appid, ServiceConfig } from '~/services/ServiceConfig'

class OpenWeatherMapService extends ServiceConfig {
  constructor() {
    super()
  }

  getWeather = (
    weatherRequest: IOpenWeatherMapRequest,
  ): Promise<AxiosResponse<IWeather>> =>
    this.get(
      `weather?lat=${weatherRequest.lat}&lon=${weatherRequest.lon}&appid=${appid}`,
    )
}

export default OpenWeatherMapService
