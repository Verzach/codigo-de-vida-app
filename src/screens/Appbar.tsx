import { View, Text } from 'react-native'
import React from 'react'
import { Appbar } from 'react-native-paper'
const AppbarComponent = () => {
  return (
   <Appbar style={{ backgroundColor: "#fff"}}>
        <Appbar.Action icon="menu" onPress={() => {}} />
        <Appbar.Content title="Nombre de app" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon="bell" onPress={() => {}} />
      </Appbar>    
  )
}

export default AppbarComponent