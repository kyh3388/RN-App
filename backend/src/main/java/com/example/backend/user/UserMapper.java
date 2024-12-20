package com.example.backend.user;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper // 매퍼 인터페이스임을 명시
public interface UserMapper {
    UserDomain findIdPw(@Param("userId") String userId, @Param("userPw") String userPw);
}
