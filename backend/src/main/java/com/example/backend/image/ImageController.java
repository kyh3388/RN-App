package com.example.backend.image;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/image")
public class ImageController {

    @Autowired
    private ImageService imageService;

    // 이미지 업로드 및 업데이트
    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(
            @RequestParam("boardNo") int boardNo,
            @RequestPart("boardImg") MultipartFile boardImg
            ) throws IOException {

                System.out.println("boardNo: " + boardNo);
                System.out.println("boardImg: " + boardImg); // boardImg가 null인지 확인
                System.out.println("boardImg Original Filename: " + boardImg.getOriginalFilename()); // 파일 이름 확인
                
            

        if (boardImg == null) {
            return ResponseEntity.badRequest().body("boardImg 필드가 누락되었습니다.");
        }

        imageService.saveOrUpdateImage(boardNo, boardImg);
        return ResponseEntity.ok("이미지 저장 완료");
    }


    // 이미지 조회
    @GetMapping("/{boardNo}")
    public ResponseEntity<byte[]> getImage(@PathVariable("boardNo") int boardNo) {
        try {
            byte[] imageData = imageService.getImageByBoardNo(boardNo);

            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-Type", "image/jpeg");
            return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
