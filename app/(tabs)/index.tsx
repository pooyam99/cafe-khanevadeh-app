import React from 'react'
import { Surface } from 'react-native-paper'

import { styles } from '@/lib'
import MenuList from '@/components/menu/list'

const Menu = () => (
  <Surface style={styles.screen}>
    <MenuList />
  </Surface>
)

export default Menu
