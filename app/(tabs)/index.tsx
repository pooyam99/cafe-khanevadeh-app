import React from 'react'
import { Surface } from 'react-native-paper'

import { Locales, ScreenInfo, styles } from '@/lib'

const Menu = () => (
  <Surface style={styles.screen}>
    <ScreenInfo title={Locales.t('tabs.menu')} path="app/(tabs)/index.tsx" />
  </Surface>
)

export default Menu
