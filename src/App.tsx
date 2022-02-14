/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'
import Geolocation from 'react-native-geolocation-service'
import SplashScreen from 'react-native-splash-screen'

import { HomeScreen } from '~/screens/Home/HomeScreen'

export const App = () => {
  const [permission, setPermission] = useState(false)

  const checkPermission = useCallback(async () => {
    const permission = await Geolocation.requestAuthorization('always')

    if (permission === 'granted') {
      setPermission(true)
    }
  }, [])

  useEffect(() => {
    SplashScreen.hide()
    !permission && checkPermission()
  }, [permission])

  return <HomeScreen />
}
