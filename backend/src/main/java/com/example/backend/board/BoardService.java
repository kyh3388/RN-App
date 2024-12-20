package com.example.backend.board;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BoardService {

    @Autowired
    private BoardMapper boardMapper;

    public List<BoardDomain> getBoards(String userId) {
        return boardMapper.findBoards(userId);
    }
}
