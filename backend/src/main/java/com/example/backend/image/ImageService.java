package com.example.backend.image;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImageService {

    @Autowired
    private ImageMapper imageMapper;

    // 이미지 저장 또는 업데이트
    public void saveOrUpdateImage(int boardNo, MultipartFile boardImg) throws IOException {
        byte[] imageData = boardImg.getBytes();
        imageMapper.UpdateImage(boardNo, imageData);
    }

    // 이미지 조회
    public byte[] getImageByBoardNo(int boardNo) {
        return imageMapper.SearchImage(boardNo);
    }
}
