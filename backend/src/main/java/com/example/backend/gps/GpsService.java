package com.example.backend.gps;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GpsService {

    private final RestTemplate restTemplate;
    private final String tmapApiKey;

    // 생성자를 통해 의존성 주입
    public GpsService(RestTemplate restTemplate, @Value("${tmap.api.key}") String tmapApiKey) { // application.yml에 저장된 API Key 사용
        this.restTemplate = restTemplate;
        this.tmapApiKey = tmapApiKey;
    }
    
    // TMAP API로부터 데이터를 가져오는 메서드
    public GpsDTO getAddressFromCoordinates(double latitude, double longitude) {
        String url = String.format(
            "https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version=1&lat=%f&lon=%f&appKey=%s",
            latitude, longitude, tmapApiKey
            );

            return restTemplate.getForObject(url, GpsDTO.class);
    }

    public String getFullAddress(double latitude, double longitude) {
        String url = String.format(
            "https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version=1&lat=%f&lon=%f&appKey=%s",
            latitude, longitude, tmapApiKey
        );

        GpsDTO response = restTemplate.getForObject(url, GpsDTO.class);
        if (response != null && response.getAddressInfo() != null) {
            return response.getAddressInfo().getFullAddress();
        }
        return "주소를 가져올 수 없습니다.";
    }
}

