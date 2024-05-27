# 🧳TripVibe🧳


<br>


- 기간
  - Front-End : 2024-04-22 ~ 2024-04-24
  - Back-End :
- 팀원 구성 <br>
  - 지현주, 문태준, 원다희, 허수빈


<br>


## 프로젝트 소개
- 국내의 다양한 여행 지역 소개 및 의견 공유 커뮤니티입니다.
- 검색 및 정렬을 통해 다른 사용자의 리뷰를 좀 더 쉽게 검색하고 확인할 수 있습니다.
- 사진과 평점, 평가 글을 통해 자신의 여행 경험을 다른 사용자들과 공유할 수 있습니다.


<br>


## 개발 환경
+ Front-End : *React*
+ Back-End : *Spring Boot*, *SpringDataJPA*, *Gradle*
+ IDE : *Visual Studio Code*, *IntelliJ*
+ Database : *MySQL*


<br>


## 역할 분담


#### 문태준

- **UI**
  - 마이 페이지
- **기능**
  - 사진 등록, MBTI 수정 기능
    

#### 원다희

- **UI**
  - 로그인, 회원가입
- **기능**
  - 로그인 유효성 검사, 회원가입 유효성 검사, 이메일 검증, 프로필 정보 설정
    

#### 지현주

- **UI**
  - 로그인 페이지, 새 글쓰기 페이지, Header, Sidebar
- **기능**
  - 리뷰 제목, 평점, 작성 내용 및 사진 등록, Header 및 Sidebar 각 페이지 이동

#### 허수빈

- **UI**
  - 리뷰 페이지 상세글 목록 보기, 리뷰 수정, 리뷰 삭제
- **기능**
  - 리뷰 페이지 제목, 사진, 평점, 작성 내용 수정 및 완료, 상세 리뷰 삭제


<br>


## 플로차트

![flowchart](https://github.com/heo5620/trip-vibe/assets/167669944/8afb98fd-ff74-4369-b664-473a904f3104)

<br>


## 페이지 별 기능


### Main.js
    - 제일 먼저 보여주는 페이지
    - 여행 리뷰 리스트 보여주기
    - 검색 기능
    - 사이드바 클릭시 로그인, 마이 페이지 연결

### SignIn.js
    - 로그인 페이지
    - 아이디, 비번 입력하고 로그인 버튼 클릭하면 로그인

### SignUp.js
    - 회원 가입 페이지
    - 아이디, 비번, 성별 입력하고 회원 가입 버튼 클릭하면 회원 가입

### MyPage.js
    - 마이 페이지
    - 아이디, 성별, mbti, 사진 보여주기
    - 사진, mbti 수정 기능

### New.js
    - 여행 리뷰 등록 페이지
    - 사진, 제목, 내용, 평점 등록

### Detail.js
    - 상세 페이지
    - 사진, 제목, 내용, 날짜, 평점 보여주기

### Edit.js
    - 리뷰 수정 페이지
    - 사진, 제목, 내용, 평점 수정


메인
![image](https://github.com/heo5620/trip-vibe/assets/167669944/a9f3fa84-e477-405d-ad5d-a31cb933a432)

회원가입
![image](https://github.com/heo5620/trip-vibe/assets/167669944/231e3090-f457-4676-acad-89fd9ac8283b)

로그인 gif
![image](https://github.com/heo5620/trip-vibe/assets/167669944/3d29289b-2882-4b66-ab00-b2b1e567c600)

마이페이지
![image](https://github.com/heo5620/trip-vibe/assets/167669944/c10c7f2a-f050-4326-a2f7-25bc7ff1e9b2)

마이페이지 수정
![image](https://github.com/heo5620/trip-vibe/assets/167669944/d1d1e559-50e1-46d5-853e-9918ff8f3bc8)

내 글 목록
![image](https://github.com/heo5620/trip-vibe/assets/167669944/c00f2dd5-fbb5-4aec-94de-efff9743c31a)

리뷰 상세 페이지
![image](https://github.com/heo5620/trip-vibe/assets/167669944/c2f6c80e-6665-40de-abeb-a137e61433c2)

리뷰 수정 페이지
![image](https://github.com/heo5620/trip-vibe/assets/167669944/8cb5dc61-ff44-4e02-8bc6-b2b78c25c3bf)

로그인 했을 때 사이드바
![image](https://github.com/heo5620/trip-vibe/assets/167669944/1449d207-f15a-477f-a3d0-73ddd39d5041)

로그인 안했을 때 사이드바
![image](https://github.com/heo5620/trip-vibe/assets/167669944/6cf9fc44-de4c-4586-9222-0a8876d47e1d)

메인에서 새 글 추가
![image](https://github.com/heo5620/trip-vibe/assets/167669944/bf7b5c68-291d-4b58-ab1d-f975132624de)

Member API
![image](https://github.com/heo5620/trip-vibe/assets/167669944/c169c932-70e9-401c-ba25-56031f7ec3f4)

Review API
![image](https://github.com/heo5620/trip-vibe/assets/167669944/c9f28e05-6a9f-4c31-9b30-7594b03c992c)

erd
![image](https://github.com/heo5620/trip-vibe/assets/167669944/b9aa77f9-51bf-4890-8c21-aaced89962f8)



