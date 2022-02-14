/* eslint-disable no-catch-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'
import {
  Alert,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'

import { IWeather } from '~/@types/entities/Weather.types'
import { formatDateUTC } from '~/libs/dateFormat'
import { getLocation } from '~/libs/geolocation'
import HomeScreenStyle from '~/screens/Home/HomeScreen.styles'
import OpenWeatherMapService from '~/services/OpenWeatherMap/OpenWeatherMapService'

export const HomeScreen: React.FC = () => {
  const styles = HomeScreenStyle()

  const { getWeather } = new OpenWeatherMapService()

  const [location, setLocation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [dataWeather, setDataWeather] = useState<IWeather>({} as IWeather)
  const [updatedWeather, setUpdatedWeather] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState('')

  const handleLoadingLocation = useCallback(async () => {
    const infoLocation = await getLocation()

    if (!infoLocation) {
      Alert.alert('Não foi possível buscar sua localização')
      return
    }

    setLocation(infoLocation)
  }, [])

  const fetchDataWeather = useCallback(async () => {
    if (!location) {
      return
    }

    setError('')
    setLoading(true)
    try {
      const response = await getWeather({
        lat: location?.latitude,
        lon: location?.longitude,
      })

      setDataWeather(response.data)
      setUpdatedWeather(
        `Atualizado às ${formatDateUTC(new Date(), 'HH:mm:ss')}`,
      )
      setDate(formatDateUTC(new Date(), 'EEEE , dd MMMM yyyy'))
      setLoading(false)
    } catch (error) {
      console.log('Error', error)

      setError('Não foi possível buscar as informações.')
      setLoading(false)
    }
  }, [getWeather, location])

  useEffect(() => {
    handleLoadingLocation()
  }, [])

  useEffect(() => {
    fetchDataWeather()
  }, [location])

  if (loading) {
    return (
      <View style={styles.homeScreen__loadingView}>
        <ActivityIndicator />
      </View>
    )
  }

  console.log(dataWeather)

  return (
    <ScrollView
      style={styles.homeScreen__containerView}
      contentContainerStyle={styles.homeScreen__contentContainerScrollView}
    >
      <View style={styles.homeScreen__headerView}>
        <Text style={styles.homeScreen__titleText}>
          {dataWeather?.name}, {dataWeather?.sys?.country}
        </Text>
      </View>

      <View style={styles.homeScreen__containerWeatherView}>
        {error ? (
          <Text style={styles.homeScreen__lightText}>{error}°</Text>
        ) : (
          <View style={styles.homeScreen__containerTempView}>
            <Text style={styles.homeScreen__weatherText}>
              {dataWeather?.main?.temp}°
            </Text>

            <View style={styles.homeScreen__divider} />

            <View>
              <Text style={styles.homeScreen__lightText}>
                {dataWeather?.main?.temp_max}°
              </Text>
              <Text style={styles.homeScreen__lightText}>
                {dataWeather?.main?.temp_min}°
              </Text>
            </View>
          </View>
        )}

        <Text style={styles.homeScreen__regularText}>
          {dataWeather?.weather?.length > 0 && dataWeather?.weather[0]?.main}
        </Text>
        <Text style={styles.homeScreen__regularText}>
          Sensação termica {dataWeather?.main?.feels_like}°
        </Text>
        <Text style={styles.homeScreen__regularText}>
          Humidade do ar: {dataWeather?.main?.humidity}
        </Text>
      </View>

      <View style={styles.homeScreen__footerView}>
        <View style={styles.homeScreen__containerDateView}>
          <Text style={styles.homeScreen__mediumText}>{date}</Text>
          <Text style={styles.homeScreen__lightText}>{updatedWeather}</Text>
        </View>

        <TouchableOpacity
          style={styles.homeScreen__button}
          onPress={fetchDataWeather}
        >
          <Text style={styles.homeScreen__mediumText}>
            Atualizar informações
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
