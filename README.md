# 우주공구
<img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=flat-square&logo=Spring Boot&logoColor=white"/> <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat-square&logo=Javascript&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/React Native-09D3AC?style=flat-square&logo=Create React App&logoColor=white"/> <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/> <img src="https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=Sass&logoColor=white"/> <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/> <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=white"/> 

> 우리 주변의 공동 구매, 공동 구매 중개 플랫폼



## 목차

- [프로젝트 소개](#프로젝트-소개)
- [프로젝트 주요 기능](#프로젝트-주요-기능)
- [개발 기간](#개발-기간)
- [개발 환경](#개발-환경)
- [업데이트 내역](#업데이트-내역)

### 프로젝트 소개

![](../header.png)

### 프로젝트 주요 기능
- 사이트 자체 회원가입시 문자 및 이메일 인증(Naver Cloud Platform Sens api, Java Mail api)
- jwt(Java Web Token)과 Password Encoder(Spring Security)를 이용해 보안 성능 향상
- 모바일(최대 767px)과 태블릿(최대 1023px) 환경에서도 편하게 사용 가능하도록 미디어 쿼리 적용
- 사용자 편의를 위한 게시글 12개 단위 조회(Sping JPA Paging) 및 페이지네이션(직접 구현)
- 각 공동구매를 카테고리별, 동네별, 추천순, 최신순, 마감임박순 등으로 확인 가능
- 공동구매 글 작성시 이미지 업로드(firebase) 및 지도 확인 가능(카카오 지도 api)
- 실시간 채팅 및 채팅 읽음 여부 알림(WebSocket) 시간 지남에 따라 세션 자동 종료(Java Timer)
- Admin 페이지에서 편리하게 각 공동구매와 회원을 관리

### 팀원
- 신은지
- 이희주
- 이한솔

### 개발 기간
- 기획 : 2022.11.21 - 2022.12.02
- 개발 : 2022.12.03 - 2022.12.23

### 개발 환경
- OS : Window 10
- IDE : VS Code, IntelliJ
- Language : Java, Javascript
- FrontEnd : HTML/CSS
- Library : ReactJS
- DB : mySql, Oracle
- Server : Tomcat

### 업데이트 내역
- 0.0.1 (2022.12.20)
  - 작업 진행 중
  
### 정보
- 

### 빌드

```sh
./gradlew build - test
```
```sh
java -jar build/libs/WooJoo09-0.0.1-SNAPSHOT.jar
```
터미널에서 테스트 제외하고 gradle 빌드 실행한 후 아래의 명령어로 파일 실행


