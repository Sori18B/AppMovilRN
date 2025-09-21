import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Animated,
} from 'react-native';

export default function RegisterScreen({ navigation }: any) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(bounceAnim, {
        toValue: 1,
        friction: 3,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const FormAnimate = useRef(new Animated.Value(500)).current;

  useEffect(() => {
    Animated.timing(FormAnimate, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const [formData, setFormdata] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  const handleRegistrer = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.phoneNumber
    ) {
      Alert.alert('Campos vacios', 'Favor de llenar los campos');
      navigation.replace('Login');
      return;
    }
    if (!formData.email.includes('@')) {
      Alert.alert('Error en el Registro', 'Email Invalido');
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      Alert.alert(
        'Error al registrar contraseña, la contraseña debe tener al menos 6 caracteres',
      );
      return;
    }
    if (formData.phoneNumber.length < 10) {
      Alert.alert('Error en el Registro', 'Numero telefonico Invalido');
      return;
    }
    if (!/\+\d{2,15}$/.test(formData.phoneNumber)) {
      Alert.alert(
        'Telefono invalido',
        'El telefono debe de tener codigo de pais, ejemplo: +52',
      );
      return;
    }

    Alert.alert('Registro exitoso', 'Usuario registrado corretamente');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/image/logo_remove_bg_preview.png')}
        style={[
          styles.Image,
          { opacity: fadeAnim, transform: [{ scale: bounceAnim }] },
        ]}
      />
      <Text style={styles.title}>Registrate</Text>
      <Animated.View
        style={[
          styles.FormContainer,
          { transform: [{ translateY: FormAnimate }] },
        ]}
      >
        <TextInput
          style={styles.TextRegister}
          placeholder="First Name"
          placeholderTextColor="#ccc"
          value={formData.firstName}
          onChangeText={text => setFormdata({ ...formData, firstName: text })}
        />
        <TextInput
          style={styles.TextRegister}
          placeholder="Last Name"
          placeholderTextColor="#ccc"
          value={formData.lastName}
          onChangeText={text => setFormdata({ ...formData, lastName: text })}
        />
        <TextInput
          style={styles.TextRegister}
          placeholder="Email"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={text => setFormdata({ ...formData, email: text })}
        />
        <TextInput
          style={styles.TextRegister}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry={true}
          value={formData.password}
          onChangeText={text => setFormdata({ ...formData, password: text })}
        />
        <TextInput
          style={styles.TextRegister}
          placeholder="Phone Number Example: +52 "
          placeholderTextColor="#ccc"
          keyboardType="phone-pad"
          value={formData.phoneNumber}
          onChangeText={text => setFormdata({ ...formData, phoneNumber: text })}
        />
        <TouchableOpacity
          onPress={() => navigation.replace('Login')}
          style={styles.button}
        >
          <Text style={styles.TextButton}>Registrate</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Text style={styles.TextReg}>¿Ya tienes una cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.replace('Login')}>
            <Text style={styles.TextSesion}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 150,
  },
  FormContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 50,
    width: '120%',
    height: '90%',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  Image: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  TextRegister: {
    width: '90%',
    height: 40,
    borderColor: 'black',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    shadowColor: '#000',
  },
  TextReg: {
    color: 'black',
    marginRight: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  TextSesion: {
    color: '#1E90FF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  TextButton: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain',
  },
});
