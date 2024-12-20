package com.example.backend.user;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController // 이 클래스가 RESTful 컨트롤러임을 나타냄
@RequestMapping("/api") // API 요청 경로의 기본 경로를 설정
public class UserController {

    @Autowired
    private UserService userService; //
    
    @PostMapping("/login") // "/api/login" 경로로 POST 요청이 들어오면 실행
    public Map<String, String> login(@RequestBody Map<String, String> loginRequest) {
        // 클라이언트 요청에서 ID와 비밀번호 추출
        String userId = loginRequest.get("userId");
        String userPw = loginRequest.get("userPw");

        // 데이터베이스에서 ID로 사용자 정보 조회
        UserDomain user = userService.login(userId, userPw);

        // 응답 메시지를 담을 Map 생성
        Map<String, String> response = new HashMap<>();

        // 사용자가 존재하고 비밀번호가 일치하면 성공 메시지 반환
        if (user != null) {
            response.put("message", "로그인에 성공했습니다.");
        } else {
            // 사용자 정보가 없거나 비밀번호가 틀리면 실패 메시지 반환
            response.put("message", "아이디 또는 암호가 잘못되었습니다.");
        }

        return response; // 클라이언트로 응답 반환
    }
}
