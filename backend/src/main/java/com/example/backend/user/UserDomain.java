package com.example.backend.user;

public class UserDomain {
    private String userId;  // USER_ID와 매핑
    private String userPw;  // USER_PW와 매핑

    // Getter와 Setter
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserPw() {
        return userPw;
    }

    public void setUserPw(String userPw) {
        this.userPw = userPw;
    }
}
