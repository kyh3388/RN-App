package com.example.backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service // Spring 서비스 빈으로 등록록
public class UserService {

    @Autowired
    private UserMapper userMapper;

    /**
     * 사용자 로그인 처리
     * @param userId 사용자 아이디
     * @param userPw 사용자 비밀번호
     * @return UserDomain 객체 (DB에서 조회된 사용자 정보)
     */

     @Transactional // Spring
     public UserDomain login(String userId, String userPw) {
        return userMapper.findIdPw(userId, userPw);
     }
     
}
