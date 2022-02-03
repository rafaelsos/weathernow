import { StyleSheet } from 'react-native'

import { theme } from '~/theme/variables'

export default () =>
  StyleSheet.create({
    homeScreen__contentContainerScrollView: {
      flex: 1,
    },
    homeScreen__containerView: {
      backgroundColor: theme.colors.primary,
      paddingTop: 80,
      flex: 1,
    },
    homeScreen__headerView: {
      paddingHorizontal: 16,
      marginTop: 24,
    },
    homeScreen__titleText: {
      fontSize: theme.typography.sizes.tertiary,
      fontWeight: '700',
      color: theme.colors.tertiary,
    },

    homeScreen__lightText: {
      fontSize: theme.typography.sizes.secondary,
      fontWeight: '200',
      color: theme.colors.tertiary,
      marginTop: 4,
    },
    homeScreen__regularText: {
      fontSize: theme.typography.sizes.secondary,
      fontWeight: '400',
      color: theme.colors.tertiary,
      paddingBottom: 6,
    },
    homeScreen__mediumText: {
      fontSize: theme.typography.sizes.tertiary,
      fontWeight: '500',
      color: theme.colors.tertiary,
    },

    homeScreen__containerWeatherView: {
      alignItems: 'center',
      marginTop: 72,
    },
    homeScreen__weatherText: {
      fontSize: theme.typography.sizes.quaternary,
      fontWeight: '200',
      color: theme.colors.tertiary,
    },

    homeScreen__containerDateView: {
      marginTop: 16,
      paddingHorizontal: 16,
    },

    homeScreen__View: {
      backgroundColor: theme.colors.primary,
      paddingTop: 80,
    },

    homeScreen__footerView: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 40,
    },

    homeScreen__button: {
      marginTop: 36,
      marginBottom: 16,
      borderRadius: 12,
      padding: 12,
      marginHorizontal: 16,
      alignItems: 'center',
      backgroundColor: theme.colors.fiventenary,
      shadowColor: theme.colors.fourentenary,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,

      elevation: 1,
    },
  })
