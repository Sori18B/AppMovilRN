import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  Animated,
} from 'react-native';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handelLogin = () => {
    if (!email.includes('@')) {
      Alert.alert('Error en el Login', 'Email Invalido');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error en el Login', 'Password Invalido');
      return;
    }
    navigation.replace('MainTabs');
  };

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

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/image/logo_remove_bg_preview.png')}
        style={[
          styles.Image,
          { opacity: fadeAnim, transform: [{ scale: bounceAnim }] },
        ]}
      />
      <Text style={styles.title}>Iniciar sesion</Text>
      <Animated.View
        style={[
          styles.FormContainer,
          { transform: [{ translateY: FormAnimate }] },
        ]}
      >
        <TextInput placeholder="Email" style={styles.TextLogin} />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={styles.TextLogin}
        />
        <TouchableOpacity
          onPress={() => navigation.replace('MainTabs')}
          style={styles.Button}
        >
          <Text style={styles.Text_Button}>Iniciar sesion</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Text style={styles.Text_Log}>¿Ya tienes una cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.replace('Register')}>
            <Text style={styles.Text_Registro}>Iniciar Sesión</Text>
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
    paddingTop: 200,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  TextLogin: {
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
  Text_Registro: {
    color: '#1E90FF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  Text_Log: {
    color: 'black',
    marginRight: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  Text_Button: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  Button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  Image: { width: 120, height: 120, marginBottom: 20, resizeMode: 'contain' },
  FormContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 50,
    width: '120%',
    height: '90%',
    alignItems: 'center',
  },
});
