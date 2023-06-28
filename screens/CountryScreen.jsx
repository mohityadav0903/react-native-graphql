import { View, Text, FlatList, TouchableOpacity,Image,Form ,Icon, TextInput,Keyboard,KeyboardAvoidingView} from "react-native";
import styles from "../styles";
import React, { useEffect, useState } from "react";


import { useQuery } from "@apollo/client";
import { GETALLCOUNTRIES } from "../queries";
import { ActivityIndicator } from "react-native";


const CountryScreen = () => {
  const { data, loading, error } = useQuery(GETALLCOUNTRIES);
  const [selectedValue, setSelectedValue] = useState();
 const [inputValue, setInputValue] = useState();
 const [country, setCountry] = useState();
 const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
      setSelectedValue(data?.countries[0].code)
       setInputValue(data?.countries[0].name)
  }, [data]);
  useEffect(() => {
    if(data){
      const selectedCountry = data?.countries.find((item) => item?.code == selectedValue);
      setCountry(selectedCountry);
    }
  }, [selectedValue]);
  if (loading) return <View style={styles.loading}><ActivityIndicator size={50} color="red" /></View>;
    if (error) return <Text>{error.message}</Text>;
  return (
    <>
     <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      >
      <View style={styles.container}>
        <View >
          <Text style={styles.heading}>Country Details</Text>
        </View>
             <View>
                    <View 
                    style={styles.inputContainer}
                    >
                      <Text
                      style={styles.inputText}
                       >Search Country</Text>
                    </View>
                    <TextInput
                      style={styles.input}
                      onChangeText={(text) => {
                        setInputValue(text);
                        setModalVisible(true);
                      }}
                      value={inputValue}
                     
                    />
                    </View>
                    {modalVisible && (
                      <View style={styles.modal}>
                        <FlatList
                          data={data?.countries.filter((item) =>
                            item.name.includes(inputValue)
                          )}
                          renderItem={({ item }) => (
                            <TouchableOpacity
                              style={styles.modalItem}
                              onPress={() => {
                                Keyboard.dismiss();
                                setInputValue(item.name);
                                setSelectedValue(item.code);
                                setModalVisible(false);
                              }}
                            >
                              <Text
                               style={styles.modalItemText} 
                              >{item.name}</Text>
                            </TouchableOpacity>
                          )}
                          ListEmptyComponent={() => (
                            <Text style={styles.error}>No Country Found</Text>
                          )}
                          keyExtractor={(item) => item.code}
                          keyboardShouldPersistTaps="handled"
                          
                        />
                      </View>
                    )}
                    <View style={styles.containerCard}>
      <Text style={styles.containerCardHeader}>{country?.name}</Text>
       <Text style={styles.containerCardContent}>Country Code : {country?.code}</Text>
      <Text style={styles.containerCardContent}>Continent : {country?.continent.name}</Text>
      <Text style={styles.containerCardContent}>Capital : {country?.capital}</Text>
      <Text style={styles.containerCardContent}>Flag: {country?.emoji}</Text>
      <Text style={styles.containerCardContent}>Phone : {country?.phone}</Text>
      <Text style={styles.containerCardContent}>Currency : {country?.currency}</Text>
      <Text style={styles.containerCardContent}>Languages : {country?.languages.map((item) => item.name).join(", ")}</Text>
       
      
     
    </View>
      </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default CountryScreen;
