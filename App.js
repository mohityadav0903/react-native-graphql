import 'expo-dev-client';
import {ApolloProvider } from '@apollo/client';
import React from 'react';
import client from './config';
import CountryScreen from './screens/CountryScreen';
import { StatusBar } from 'expo-status-bar';
export default function App() {
  return (
    <ApolloProvider client={client}>
      <StatusBar style="light" />
      <CountryScreen />
    </ApolloProvider>
  );
}
