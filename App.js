import React, { useState, useEffect } from 'react';
import {Platform, StyleSheet, Text, View } from 'react-native';
// Cal instal·lar el paquet: > expo install expo-location
import * as Location from 'expo-location';

// Teniu exemple a: https://docs.expo.dev/versions/latest/sdk/location/

export default function App() {

  // useState és un React Hook que us permet afegir una variable d'estat al vostre component
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // useEffect: és un React Hook (ganxo) que permet sincronitzar un component amb un sistema extern. 
  useEffect(() => {
    
    // async: un booleà. Permet al navegador ajornar l'execució de l'script 
    // fins que s'hagi processat la resta del document: el comportament preferit per al rendiment
    (async () => {

      // await: és una paraula clau que s'utilitza en combinació amb funcions asíncrones 
      // per pausar l'execució de la funció fins que una Promesa es resol o rebutja
      // esperem que l'usuari doni permisos per accedir a les dades de localització
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // obtenim les dades de localització objecte: Location.LocationObject
      let coordenades = (await Location.getCurrentPositionAsync({}));
     
      setLocation(coordenades.coords);
    })();
  }, []);
  
  return (
    <View style={styles.container}>
      <Text> localització: </Text>
      <Text>Longitud: {location ? location.longitude : errorMsg}</Text>
      <Text>Latitud: {location ? location.latitude : errorMsg}</Text> 
      <Text>Altitud: {location ? location.altitude : errorMsg}</Text>   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});