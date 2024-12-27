import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigation = useNavigation();

  // 로그인 버튼 클릭 처리
  const handleLogin = () => {
    axios
      .post("http://192.172.136.121:8080/api/login", { userId: id, userPw: password }) // Api 요청
      .then(response => {
        if (response.data.message === "로그인에 성공했습니다.") {
          navigation.navigate('ListPage', { userId: id }); // 아이디 전달
        } else {
          setMessage(response.data.message || '아이디 또는 비밀번호가 잘못되었습니다.');
        }
      })
      .catch(error => {
        setMessage('로그인 실패: ' + (error.response?.data?.error || error.message)); // 에러 처리
      }); 
  };



  return (
    <View style={styles.container}>

      {/* 아이디 입력 */}
      <TextInput
        style={styles.input}
        placeholder="아이디"
        placeholderTextColor="#000"

        value={id}
        onChangeText={setId}
      />

      {/* 암호 입력 */}
      <TextInput
        style={styles.input}
        placeholder="암호"
        placeholderTextColor="#000"
        secureTextEntry

        value={password}
        onChangeText={setPassword}
      />

      {/* 로그인 버튼 */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>

      {/* 로그인 결과 메시지 */}
      {message ? <Text style={styles.message}>{message}</Text> : null}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // 배경색(회색)
  },
  input: {
    width: '95%', // 화면 너비의 95%
    height: 75, // 높이 70px
    backgroundColor: '#fff', // 흰색 배경
    borderRadius: 5, // 둥근 모서리
    paddingHorizontal: 10, // 좌우 내부 여백

    fontSize: 45, // 폰트 크기
    fontWeight: 'bold',

    marginBottom: 80, // 아래 여백
    borderWidth: 1, // 테두리 두께
    borderColor: '#ddd', // 테두리 색상
  },
  button: {
    width: '90%',
    height: 75,
    backgroundColor: '#009688', // 버튼 색상
    borderRadius: 5, // 둥근 모서리
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 45,
    fontWeight: 'bold',
  },
    message: {
      marginTop: 20,
      fontSize: 20,
      color: 'red',
      fontWeight: 'bold',
  },
});

export default LoginPage;

