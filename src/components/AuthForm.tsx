import { useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native'
import { Button, Text, TextInput, View } from './Themed'

import type {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js'

interface AuthFormProps {
  onSignUp: (credentials: SignUpWithPasswordCredentials) => void
  onLogin: (credentials: SignInWithPasswordCredentials) => void
  loading: boolean
}

export default function AuthForm({
  onSignUp,
  onLogin,
  loading,
}: AuthFormProps) {
  const [mode, setMode] = useState<'login' | 'signUp'>('login')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [successfulSignup, setSuccessfullSignup] = useState(false)

  const handleSubmit = () => {
    if (mode === 'login') {
      onLogin({ email, password })
      setEmail('')
      setPassword('')
    } else {
      onSignUp({ email, password, options: { data: { username } } })
      setSuccessfullSignup(true)
      setEmail('')
      setPassword('')
      setUsername('')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Text style={styles.title}>Plataforma Social</Text>
            {mode === 'signUp' && (
              <View style={styles.input}>
                <TextInput
                  placeholder="Nombre de usuario"
                  value={username}
                  onChangeText={setUsername}
                />
              </View>
            )}
            <View style={styles.input}>
              <TextInput
                placeholder="Correo"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.input}>
              <TextInput
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.input}>
              <Button
                title={mode === 'login' ? 'Iniciar sesión' : 'Registrarse'}
                onPress={handleSubmit}
                disabled={loading || !email || !password}
              />
            </View>
            <View style={styles.footer}>
              <Text style={{ marginBottom: 8 }}>
                {mode === 'login'
                  ? '¿No tienes una cuenta?'
                  : '¿Ya tienes una cuenta?'}
              </Text>
              <Button
                title={mode === 'login' ? 'Regístrate' : 'Inicia sesión'}
                onPress={() => {
                  setMode(mode === 'login' ? 'signUp' : 'login')
                  setSuccessfullSignup(false)
                }}
              />
            </View>

            {successfulSignup && mode === 'signUp' && (
              <Text style={styles.successText}>
                El registro ha salido genial. Inicia sesión.
              </Text>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 16,
  },
  input: {
    paddingVertical: 8,
    width: '100%',
  },
  footer: {
    paddingTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    color: 'green',
    marginTop: 8,
  },
})
