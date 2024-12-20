package com.example.backend.board;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface BoardMapper {
    List<BoardDomain> findBoards(@Param("userId") String userId);
}

