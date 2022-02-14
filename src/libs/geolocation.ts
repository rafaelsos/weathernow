import {
  Alert,
  Linking,
  Platform,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native'
import Geolocation, { GeoPosition } from 'react-native-geolocation-service'

const handleOpenSetting = () =>
  Linking.openSettings().catch(() => {
    Alert.alert('Unable to open settings')
  })

const getCurrentPosition = (): Promise<GeoPosition> =>
  new Promise((resolve, reject) =>
    Geolocation.getCurrentPosition(resolve, reject),
  )

const handlePermissionIOS = async () => {
  const status = await Geolocation.requestAuthorization('always')

  if (status === 'granted') {
    return true
  }

  if (status === 'disabled' || status === 'denied') {
    Alert.alert(
      '"Ative os Serviços de Localização para permitir que o \'App Weather Now\' determine sua localização."',
      '',
      [
        { text: 'Ir para as configurações', onPress: handleOpenSetting },
        { text: 'Não use a localização', onPress: () => {} },
      ],
    )
  }

  return false
}

const handlePermissionANDROID = async () => {
  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  )

  if (hasPermission) {
    return true
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  )

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show(
      'Permissão de localização negada pelo usuário.',
      ToastAndroid.LONG,
    )
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show(
      'Permissão de localização revogada pelo usuário.',
      ToastAndroid.LONG,
    )
  }

  return false
}

export const handleLocationPermissionCheck = async () =>
  Platform.OS === 'ios' ? handlePermissionIOS() : handlePermissionANDROID()

export const getLocation = async () => {
  const hasPermission = await handleLocationPermissionCheck()

  if (!hasPermission) {
    return
  }

  const result = await getCurrentPosition()

  if (
    !result?.coords ||
    !result?.coords?.latitude ||
    !result?.coords?.longitude
  ) {
    return null
  }

  const { latitude, longitude } = result?.coords

  return { latitude, longitude }
}
