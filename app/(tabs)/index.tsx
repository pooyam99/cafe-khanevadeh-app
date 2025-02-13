import React from 'react'
import { Surface } from 'react-native-paper'

import MenuList from '@/components/menu/list'
import { styles } from '@/lib'

const Menu = () => (
  <Surface style={styles.screen}>
    <MenuList />
  </Surface>
)

export default Menu
