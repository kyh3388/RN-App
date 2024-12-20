package com.example.backend.image;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ImageMapper {

    // 이미지 저장 및 업데이트
    void UpdateImage(@Param("boardNo") int boardNo, @Param("boardImg") byte[] boardImg);

    // 이미지 조회
    byte[] SearchImage(@Param("boardNo") int boardNo);
}
