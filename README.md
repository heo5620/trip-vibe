# 🧳TripVibe🧳

<br>

![MainPage](https://github.com/heo5620/trip-vibe/assets/135632902/ac0a2d8e-cc21-4d95-bf4f-884ac5df11e1)

## 기간

- Front-End : 2024-04-22 ~ 2024-04-24
- Back-End : 2024-05-20 ~ 2024-05-24

## 팀원 구성 <br>

|                   지현주(팀장)                    |                      문태준                       |                   원다희                    |                허수빈                 |
| :-----------------------------------------------: | :-----------------------------------------------: | :-----------------------------------------: | :-----------------------------------: |
| [jihyunjoo2023](https://github.com/jihyunjoo2023) | [OnePackPerDay](https://github.com/onePackPerDay) | [daaaaaahee](https://github.com/daaaaaahee) | [heo5026](https://github.com/heo5620) |

<br>

## 프로젝트 소개

- 국내의 다양한 여행 지역 소개 및 의견 공유 커뮤니티입니다.
- 검색 및 정렬을 통해 다른 사용자의 리뷰를 좀 더 쉽게 검색하고 확인할 수 있습니다.
- 사진과 평점, 평가 글을 통해 자신의 여행 경험을 다른 사용자들과 공유할 수 있습니다.

<br>

## 개발 환경

- Programming Language : _JavaScript_, _Java_
- Library : _React_, _Lombok_
- Framework : _JPA, Spring Boot_
- Tools : _Visual Studio Code_, _IntelliJ_, _Postman_, _Figma_, _GitHub_
- Database : _MySQL_
- Build : _Gradle_

<br>

## 역할 분담

#### 문태준

- **Front-End**
  - 마이 페이지 전체 기능(MBTI 수정 등)
  - 마이페이지 css
- **Back-End**
  - 회원가입
  - 로그인

#### 원다희

- **Front-End**
  - 로그인과 회원가입 유효성 검사
  - 이메일 검증
  - 프로필 정보 설정
  - 마이페이지 css
- **Back-End**
  - 마이페이지 정보 수정
  - 리뷰 삭제

#### 지현주

- **Front-End**
  - 메인, 로그인 css
  - 새 글쓰기 페이지 전체 기능
  - Header와 Sidebar
- **Back-End**
  - 리뷰 수정
  - 로그인
  - 메인 페이지 정보 바로 출력

#### 허수빈

- **Front-End**
  - 리뷰 페이지 상세글 목록 보기
  - 리뷰 수정 및 삭제 전체 기능
  - 메인 페이지 검색 및 정렬
- **Back-End**
  - 로그인
  - 메인 페이지 정보 출력
  - 리뷰 작성, 수정, 삭제
  - 메인 페이지

<br>

## 플로차트

![flowchart](https://github.com/heo5620/trip-vibe/assets/167669944/8afb98fd-ff74-4369-b664-473a904f3104)

<br>

## 주요 기능

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

회원가입 gif
![signup](https://github.com/heo5620/trip-vibe/assets/167669944/83c41fc3-0710-4b07-8712-14c5f5ae8fd5)

로그인 gif
![login](https://github.com/heo5620/trip-vibe/assets/167669944/d46d51fe-53d5-41c4-887c-60f7531ceaca)

로그아웃 gif
![signout](https://github.com/heo5620/trip-vibe/assets/167669944/bb9c3ec9-8668-4ff0-ad3c-02ea33921c89)

마이페이지 수정 gif
![mypage_edit](https://github.com/heo5620/trip-vibe/assets/167669944/7ee23c00-b73e-4e14-8d8f-b9e578578dfe)

내 글 목록 글 있을 때 gif
![mypage_myreviews](https://github.com/heo5620/trip-vibe/assets/167669944/8a82ff8f-6e5c-4ac3-85c5-bd0aca6ee451)

리뷰 검색 gif
![review_search](https://github.com/heo5620/trip-vibe/assets/167669944/0dac8253-9833-4ea2-9380-b1b2081954c7)

리뷰 쓰기 gif
![review_write](https://github.com/heo5620/trip-vibe/assets/167669944/dc44613f-3dab-417d-987f-34e28be33096)

리뷰 상세 페이지
![image](https://github.com/heo5620/trip-vibe/assets/167669944/c2f6c80e-6665-40de-abeb-a137e61433c2)

리뷰 수정 gif
![review_edit](https://github.com/heo5620/trip-vibe/assets/167669944/d58b757b-eb94-42f4-9ef8-8a5f0a7f4ec6)

리뷰 삭제 gif
![review_delete](https://github.com/heo5620/trip-vibe/assets/167669944/88b8ed53-a1ee-4fd8-bf66-828634ab80c8)

Member API
![image](https://github.com/heo5620/trip-vibe/assets/167669944/c169c932-70e9-401c-ba25-56031f7ec3f4)

Review API
![image](https://github.com/heo5620/trip-vibe/assets/167669944/c9f28e05-6a9f-4c31-9b30-7594b03c992c)

erd
![image](https://github.com/heo5620/trip-vibe/assets/167669944/b9aa77f9-51bf-4890-8c21-aaced89962f8)
