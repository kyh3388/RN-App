import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // 아이콘 라이브러리 추가가

// ListPage 컴포넌트: 목록 화면을 렌더링하는 함수형 컴포넌트
const ListPage = ({ route, navigation }) => {
  const { userId } = route.params; // 전달된 ID 가져오기
  const [items, setItems] = useState([]); // 게시물 상태 관리

  // 백앤드에서 게시물 데이터 가져오기
  useEffect(() => {
    axios
      .get(`http://192.172.136.121:8080/api/board/${userId}`) // 백앤드 API 호출
      .then(response => {

        const filterItems = response.data.filter(
          item => item.boardType === 'A' || item.boardType === 'D'
        );
        
        setItems(filterItems); // 가져온 데이터 저장
      })
      .catch(error => {
        console.error('게시물 가져오기 실패', error);
      });
  }, [userId]);

  const handleLogout = () => {
    navigation.reset({
      index: 0, // 초기 화면의 인덱스 (LoginPage)
      routes: [{ name: 'LoginPage' }], // 이동할 화면 설정
    });
  };



  // 게시물 렌더링 함수
  const renderItem = ({ item }) => {
    const formatDate = item.creDt ? item.creDt.substring(0, 16) : '날짜 없음';
    const backgroundColor = item.boardType === 'A' ? '#ffffff' : '#cccccc'; // A: 하얀색, D: 진한 회색색

    return (
      <TouchableOpacity
        onPress={() => {
          if (item.boardType === 'A') {
            navigation.navigate('DetailPage', {
              boardNo: item.boardNo,
              boardTitle: item.boardTitle,
              boardContent: item.boardContent,
              userId: item.userId,
              crtDt: formatDate,
            });
          }
        }}
      >
        <View style={[styles.item, {backgroundColor }]}>
          <Text>제목: {item.boardTitle}</Text>
          <Text>내용: {item.boardContent}</Text>
          <Text>작성자: {item.userId}</Text>
          <Text>작성일자: {formatDate}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}> 

      {/* head */}
      <View style={styles.head}>
        
        <View style={styles.head_center}>
         <Text style={styles.head_userid}>{userId}</Text>
         <Text style={styles.head_title}>목록화면</Text>
        </View>

         {/* 로그아웃 버튼 */}
         <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Icon name="logout" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      {/* FlatList를 사용한 게시물 렌더링링 */}
      <FlatList
        data={items} // 데이터
        keyExtractor={(item, index) => index.toString()} // 고유 키
        renderItem={renderItem} // 렌더링 함수
      />
    </View>
  );
};















/******************* 디자인 구간 ********************/
/*** 전체 ***/
const styles = StyleSheet.create({
  container: {
    flex: 1, // 화면 전체를 차지
    backgroundColor: '#f0f0f0', // 배경색: 밝은 회색
  },

/*** 헤드 ***/
  head: {
    backgroundColor: '#009688', // 헤더 배경색: 청록색
    paddingHorizontal: 20, // 좌우 여백
    paddingVertical: 15, // 상하 여백
    flexDirection: 'row', // 요소를 가로로 배치
    justifyContent: 'space-between', // 양 끝에 배치
    alignItems: 'center', // 수직 중앙 정렬
  },

  head_center: {
    flex: 1, // 중앙 공간 확장
    alignItems: 'center', // 수평 중앙 정렬
    justifyContent: 'center', // 수직 중앙 정렬
  },

  head_userid: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },

  head_title: {
    color: '#fff', // 텍스트 색상: 흰색
    fontSize: 24, // 폰트 크기
    fontWeight: 'bold', // 텍스트 굵게
  },

  logoutButton: {
  },


/*** 바디 ***/
  item: {
    backgroundColor: '#ffffff', // 카드 배경색: 흰색
    marginHorizontal: 10, // 좌우 여백
    marginVertical: 5, // 상하 여백
    padding: 10, // 내부 여백
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  }
});

export default ListPage; // ListPage 컴포넌트 내보내기
