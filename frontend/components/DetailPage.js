import axios from 'axios';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Alert, Buffer, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';



const DetailPage = ({ navigation, route }) => {
    const { boardNo, boardTitle, boardContent, userId, crtDt } = route.params;
    const [imageUri, setImageUri] = useState(null);

    const handleLogout = () => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginPage' }],
        });
      };


    // 이미지 불러오기
    useEffect(() => {
        axios
            .get(`http://192.172.136.121:8080/api/image/${boardNo}`, { responseType: 'arraybuffer' })
            .then((response) => {
                console.log('이미지 응답 데이터:', response.data); // 응답 데이터 출력
                if (!response.data || response.data.byteLength === 0) {
                    throw new Error('이미지 데이터가 비어 있습니다!');
                }
                const base64 = `data:image/jpeg;base64,${Buffer.from(response.data, 'binary').toString('base64')}`;
                setImageUri(base64);
            })
            .catch((error) => {
                // 에러 메시지 출력
                if (error.message === '이미지 데이터가 비어 있습니다!') {
                    console.log('이미지가 없음');
                } else {
                    console.error('이미지 로드 실패:', error.message);
                }
            });
    }, [boardNo]);



/******************************** 이미지 업로드 ********************************/
    const handleImageUpload = () => {
        launchImageLibrary(
            { mediaType: 'photo' },
            async (response) => {
                if (response.didCancel) {
                    Alert.alert('취소', '이미지 선택이 취소되었습니다.');
                } else if (response.errorCode) {
                    Alert.alert('오류', `이미지 선택 중 오류 발생: ${response.errorMessage}`);
                } else if (response.assets && response.assets.length > 0) {
                    const image = response.assets[0];

                    // 선택된 이미지 정보 출력 (디버깅용)
                    console.log('이미지 정보:', image);

                    // FormData 생성
                    const formData = new FormData();

                    formData.append('boardNo', String(boardNo)); // boardNo를 문자열로 변환하여 전달
                    formData.append('boardImg', {
                        uri: image.uri.startsWith('file://') ? image.url : `file://${image.uri}`,
                        type: image.type || 'image/jpeg', // 기본값 설정
                        name: image.fileName || `photo_${Date.now()}.jpg`, // 파일 이름이 없을 경우 기본 이름 설정
                   });
                   // FormData 확인
                   console.log('FormData 내용 (key-value):');
                   for (let [key, value] of formData.entries()) {
                       console.log(`${key}:`, value);
                   }

                   // 이미지 업로드 요청
                   axios
                    .post('http://192.172.136.121:8080/api/image/upload', formData, {
                        headers: { "Content-Type": "multipart/form-data" },
                    })
                    
                    .then(() => {
                        Alert.alert('성공', '이미지가 성공적으로 업로드되었습니다.');

                        // 업로드된 이미지 다시 가져오기
                        return axios.get(`http://192.172.136.121:8080/api/image/${boardNo}`, {
                        responseType: 'arraybuffer',
                        });
                    })

                    .then((response) => {
                        const base64 = `data:image/jpeg;base64,${Buffer.from(response.data, 'binary').toString('base64')}`;
                        setImageUri(base64); // 이미지 상태 업데이트
                    })
                    .catch((error) => {
                        if (error.response) {
                        // 서버 응답에서 오류 발생
                        console.error('서버 응답 오류:', error.response.data);
                        } else if (error.request) {
                        // 서버로부터 응답이 없을 때
                        console.error('요청 오류:', error.request);
                        } else {
                        // 요청 설정 오류
                        console.error('설정 오류:', error.message);
                        }
                    
                        Alert.alert('오류', `작업 실패: ${error.message}`);
                   });
            }
        });
    };
/******************************************************************************/

/******************************** GPS 처리 ********************************/
const [latitude, setLatitude] = useState(null); // 위도 상태
const [longitude, setLongitude] = useState(null); // 경도 상태
const [gpsAddress, setGpsAddress] = useState(''); // 주소 상태
const [errorMsg, setErrorMsg] = useState(null);


    useEffect(() => {
        (async () => {
            // 위치 권한 요청
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('위치 권한이 거부되었습니다.');
                return;
        }

            // 현재 위치 가져오기
            const location = await Location.getCurrentPositionAsync({});
            const newLatitude = location.coords.latitude;
            const newLongitude = location.coords.longitude;

            // 상태 업데이트 (지도 및 주소)
            setLatitude(newLatitude);
            setLongitude(newLongitude);

            // 서버로 위치 정보 요청하여 주소 가져오기
            axios
            .get(`http://192.172.136.121:8080/api/gps/address?latitude=${newLatitude}&longitude=${newLongitude}`)
            .then((response) => {
                setGpsAddress(response.data); // 주소 상태 업데이트
            })
            .catch((error) => {
                console.error('주소 가져오기 실패:', error.message);
                setGpsAddress('주소를 가져올 수 없습니다.');
            });
})();
}, []);

/**************************************************************************/






return (
    <View style={styles.container}>

        {/* head */}
        <View style={styles.head}>
            <View style={styles.head_center}>
             <Text style={styles.head_userid}>{userId}</Text>
             <Text style={styles.head_title}>상세화면</Text>
            </View>

             {/* 로그아웃 버튼 */}
             <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Icon name="logout" size={30} color="#000" />
            </TouchableOpacity>
        </View>



        {/* body */}
        <View style={styles.body}>

            {/* 게시글 내용 */}
            <View style={styles.section}>
                <Text>제목: {boardTitle}</Text>
                <Text>내용: {boardContent}</Text>
                <Text>작성자: {userId}</Text>
                <Text>작성일자: {crtDt}</Text>
            </View>

            {/* 이미지 영역 */}
            <View style={styles.section}>
                <TouchableOpacity style={styles.imageContainer} onPress={handleImageUpload}>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.image} />
                    ) : (
                        <Icon name="photo-camera" size={30} color="#aaa" />
                    )}
                </TouchableOpacity>
            </View>


            {/* GPS 영역 */}
<View style={styles.section}>
    {latitude && longitude ? (
        <>
            {/* 지도 영역 */}
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                scrollEnabled={true} // 지도 이동 활성화
                zoomEnabled={true}   // 줌 인/아웃 활성화
                rotateEnabled={false} // 회전 비활성화
            >
                {/* 현재 위치에 마커 표시 */}
                <Marker
                    coordinate={{ latitude: latitude, longitude: longitude }}
                    title="현재 위치"
                    description={gpsAddress || '주소를 가져오는 중...'}
                />
            </MapView>

                {/* 주소 영역 */}
                <View style={styles.addressContainer}>
                    <Text style={styles.addressText}>주소: {gpsAddress || '주소를 가져오는 중...'}</Text>
                </View>
            </>
        ) : (
            <Text style={styles.addressText}>위치 정보를 불러오는 중...</Text>
        )}
    </View>     
</View>
        {/* foot */}
        <View style={styles.foot}>
            {/* 상태변경 버튼 */}

            <TouchableOpacity style={styles.statusButton}>
                <Text style={styles.statusButtonText}>상태변경(A➤B)</Text>
            </TouchableOpacity>

        </View>
    </View>
  );
};










/******************* 디자인 구간 ********************/
/*** 전체 ***/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },

/*** 헤드 ***/
    head: {
        backgroundColor: '#009688', // 헤더 배경색: 청록색
        paddingHorizontal: 20, // 좌우 여백
        paddingVertical: 15, // 상하 여백
        flexDirection: 'row', // 요소를 가로로 배치
        justifyContent: 'space-between', // 양 끝에 배치
        alignItems: 'center', // 수직 중앙 정렬
        marginBottom: 10, // 아래쪽에 10px 간격 추가
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

/*** 바디 ***/
    body: {
        flex: 1,
        paddingHorizontal: 1, // 좌우 여백
        
    },

    section: {
        backgroundColor: '#fff', // 흰색 배경
        marginBottom: 10,        // 섹션 간의 하단 여백
        padding: 5,             // 섹션 내부의 여백
        marginHorizontal: 5,    // 섹션 좌우 여백 추가 (20px)
    },

/*** 이미지 영역 ***/
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9', // 기본 배경색
        width: '100%',
        height: 160,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    image: {
        width: '100%',
        height: '100%',
    },

/*** GPS 영역 ***/
    map: {
        width: '100%',
        height: 160, // 지도 높이 설정
    },

    addressContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#f9f9f9',
    },

    addressText: {
        fontSize: 14,
        color: '#333',
    },



/*** 풋 ***/



    })

export default DetailPage;