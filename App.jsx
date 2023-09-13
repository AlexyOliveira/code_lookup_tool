import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import React, {useRef, useState} from 'react';
import api from './src/services/api';

const App = () => {
  const [cep, setCep] = useState('');
  const [loading, setLoading] = useState(false);
  const [cepUser, setCepUser] = useState(null);
  const inputRef = useRef(null);

  const clean = () => {
    setCep('');
    setCepUser(null);
    inputRef.current.focus();
  };
  const search = async () => {
    if (cep === '') {
      alert('Digite um cep válido');
      setCep('');
      return;
    }
    try {
      setLoading(true)
      const response = await api.get(`/${cep}/json`);
      setLoading(false)
      setCepUser(response.data);
      Keyboard.dismiss();
    } catch (error) {
      console.log('Error: ' + error);
      alert('Cep inválido');
      setLoading(false)
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.text}>Digite o Cep desejado</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 95590000"
          value={cep}
          onChangeText={text => {
            if (text === '') {
              setCepUser(null);
            }
            setCep(text);
          }}
          keyboardType="numeric"
          ref={inputRef}
        />
      </View>
      <View style={styles.areaBtn}>
        <TouchableOpacity
          onPress={search}
          style={[styles.btn, {backgroundColor: '#1d75cd'}]}>
          <Text style={styles.btnText}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={clean}
          style={[styles.btn, {backgroundColor: '#cd3e1d'}]}>
          <Text style={styles.btnText}>Limpar</Text>
        </TouchableOpacity>
      </View>
      {cepUser && cep !== '' && (
        <View style={styles.result}>
          {loading ? (
            <ActivityIndicator size={50} />
          ) : (
            <>
              <Text style={styles.itemText}>CEP: {cepUser.cep}</Text>
              <Text style={styles.itemText}>
                LOGRADOURO: {cepUser.logradouro}
              </Text>
              <Text style={styles.itemText}>BAIRRO: {cepUser.bairro}</Text>
              <Text style={styles.itemText}>CIDADE: {cepUser.localidade}</Text>
              <Text style={styles.itemText}>ESTADO: {cepUser.uf}</Text>
            </>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    color: '#000',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18,
  },
  areaBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around',
  },
  btn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
    borderRadius: 5,
    backgroundColor: '#ff0000',
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
  },
  result: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 22,
    color: '#000',
  },
});
export default App;
