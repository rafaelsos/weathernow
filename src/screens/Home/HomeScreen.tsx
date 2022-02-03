/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'
import { Alert, ScrollView } from 'react-native'
import { View, Text, TouchableOpacity } from 'react-native'
import SplashScreen from 'react-native-splash-screen'

import { IWeather } from '~/@types/entities/Weather.types'
import { formatDateUTC } from '~/libs/dateFormat'
import { getLocation } from '~/libs/geolocation'
import HomeScreenStyle from '~/screens/Home/HomeScreen.styles'
import OpenWeatherMapService from '~/services/OpenWeatherMap/OpenWeatherMapService'

export const HomeScreen: React.FC = () => {
  const styles = HomeScreenStyle()

  const { getWeather } = new OpenWeatherMapService()

  const [location, setLocation] = useState(null)
  const [dataWeather, setDataWeather] = useState<IWeather>({} as IWeather)

  const handleLoadingLocation = useCallback(async () => {
    const infoLocation = await getLocation()

    if (!infoLocation) {
      Alert.alert('Não foi possível buscar sua localização')
      return
    }

    setLocation(infoLocation)
  }, [])

  useEffect(() => {
    SplashScreen.hide()
    handleLoadingLocation()
    fetchDataWeather()
  }, [handleLoadingLocation])

  const fetchDataWeather = useCallback(async () => {
    if (!location) {
      return
    }

    const response = await getWeather({
      lat: location?.latitude,
      lon: location?.longitude,
    })

    setDataWeather(response.data)
  }, [getWeather, location])

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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <Text style={styles.homeScreen__weatherText}>
            {dataWeather?.main?.temp}°
          </Text>

          <View
            style={{
              height: 60,
              width: 2,
              marginHorizontal: 8,
              borderWidth: 1,
            }}
          />

          <View>
            <Text style={styles.homeScreen__lightText}>
              {dataWeather?.main?.temp_max}°
            </Text>
            <Text style={styles.homeScreen__lightText}>
              {dataWeather?.main?.temp_min}°
            </Text>
          </View>
        </View>

        <Text style={styles.homeScreen__regularText}>
          {dataWeather?.weather?.length > 0 && dataWeather?.weather[0]?.main}
        </Text>
        <Text style={styles.homeScreen__regularText}>
          Sensção termica {dataWeather?.main?.feels_like}°
        </Text>
        <Text style={styles.homeScreen__regularText}>
          Humidade do ar: {dataWeather?.main?.humidity}
        </Text>
      </View>

      <View style={styles.homeScreen__footerView}>
        <View style={styles.homeScreen__containerDateView}>
          <Text style={styles.homeScreen__mediumText}>
            {formatDateUTC(new Date(), 'EEEE , dd MMMM yyyy')}
          </Text>
          <Text style={styles.homeScreen__lightText}>Atualizado às 23:38</Text>
        </View>

        <TouchableOpacity
          style={styles.homeScreen__button}
          onPress={fetchDataWeather}
        >
          <Text style={styles.homeScreen__mediumText}>
            Atualizar informações
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.homeScreen__button}
          onPress={handleLoadingLocation}
        >
          <Text style={styles.homeScreen__mediumText}>GET LOCATION</Text>
        </TouchableOpacity> */}

        {/* <View style={{ alignItems: 'center', marginTop: 16 }}>
          <Text>Latitude: {location?.latitude}</Text>
          <Text>Longitude: {location?.longitude}</Text>
        </View> */}
      </View>
    </ScrollView>
  )
}
