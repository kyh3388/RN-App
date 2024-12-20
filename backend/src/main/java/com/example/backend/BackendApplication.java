package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}

/* <개념 정리>

 * Controller: HTTP 요청과 응답을 처리
 * Service: 비즈니스 로직을 처리
 * Domain/Entity: 데이터와 테이블 구조를 표현
 * Repository/Mapper: 데이터베이스와 연결되어 SQL을 실행
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
