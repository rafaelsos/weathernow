/* eslint-disable @typescript-eslint/naming-convention */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const base_url = 'http://api.openweathermap.org/data/2.5/'

export const appid = '6b0eb70cf62c02be86090e51cb15a951'

export class ServiceConfig {
  public config: any

  constructor() {
    this.config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Connection: 'keep-alive',
        'Content-Type': 'application/json',
      },
    }
  }

  public async get<T, R = AxiosResponse<T>>(
    url: string,
    config: AxiosRequestConfig = this.config,
  ): Promise<R> {
    try {
      return await axios.get(base_url + url, config)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
