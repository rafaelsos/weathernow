import React from 'react';
import { View, Text } from 'react-native'

import HomeScreenStyle from '~/screens/Home/HomeScreen.styles'

export const HomeScreen: React.FC = () => {
  const styles = HomeScreenStyle()

  return (
    <View style={styles.homeScreen__containerView}>
      <Text>Home Weather Now</Text>      
    </View>
  )
}