# SeSAC 3nd PROEJCT | Ah-Whew

### Next.js + Spring Boot를 이용한 신세 한탄 AI 그림 일기 서비스

![ahwhew_main](https://github.com/sessac-3rd-team-A/FE/assets/139740067/8df0b2fb-4f20-4da0-8ad1-77cd517edd80)

## 🌬️ About Project

> ### 당신이 느끼는 모든 감정을 아휴에 풀어주세요. 들려준 당신의 하루로 그림 일기를 그려드려요. <br /> 하루 하루의 그림 일기를 저장해 기분 달력을 완성해 보세요. 맞춤 추천 상점도 준비되어 있습니다.
>
> ### 개발기간: 2023.12.11~ 2023.12.29

### 📎[프로젝트 배포 주소](http://ahwhew.site/)

### 💜[팀노션](https://even-taurus-17e.notion.site/Ah-whew-1c7815da1532435c81c35ff4a476c917?pvs=4)

### 📎[피그마](https://www.figma.com/community/file/1322241717698834138/ah-whew)

## 📦주요 기능

### ⭐️ 글 작성 및 감정 분석

- AI가 사용자 입력한 텍스트의 감정 분석 수행

### ⭐️ 감정에 기반한 그림 생성 및 짤 추천

- 감정 분석 결과를 기반으로 AI가 해당 감정에 어울리는 그림 출력 및 해당 감정과 어울리는 밈 추천

### ⭐️ 결과값 공유

- 링크를 통해 AI가 생성한 그림 공유 가능

### ⭐️ 통계 및 분석 결과 제공

- 감정 분석 결과에 대한 감정에 대한 성별/연령별 등의 통계 제공

### ⭐️ 프로필

- 사용자의 통계, 감정 분석 결과, 그림 및 밈 통계 제공
- 감정 분석 결과에 따른 사용자별 상품 추천

## ▶️ 시작 가이드

#### Backend

```bash
$ ./gradlew bootRun
```

#### Frontend

```bash
$ git clone https://github.com/sessac-3rd-team-A/FE.git
$ npm install
$ npm run dev
```

## 🤝 웹개발팀 소개

### FRONTEND

|                                      김상우                                       |                                      김지형                                       |                                      김태훈                                      |                                      이재욱                                      |                                      전수현                                      |
| :-------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------: | :------------------------------------------------------------------------------: | :------------------------------------------------------------------------------: | :------------------------------------------------------------------------------: |
| <img  width="100px" src="https://avatars.githubusercontent.com/u/43949061?v=4" /> | <img width="100px" src="https://avatars.githubusercontent.com/u/113359008?v=4" /> | <img width="100px" src="https://avatars.githubusercontent.com/u/123625444?v=4"/> | <img width="100px" src="https://avatars.githubusercontent.com/u/100843910?v=4"/> | <img width="100px" src="https://avatars.githubusercontent.com/u/139740067?v=4"/> |
|                    [@Sangwoo97](https://github.com/Sangwoo97)                     |                      [@sy33002](https://github.com/sy33002)                       |                     [@hoonsdev](https://github.com/hoonsdev)                     |                       [@22-JWL](https://github.com/22-JWL)                       |                       [@jjsh03](https://github.com/jjsh03)                       |
|                          메인화면 <br /> 회원가입/로그인                          |                          회원 정보 수정<br /> 추천 상점                           |                                유저 감정 & 캘린더                                |                           감정 트렌드 & 사진 추천 순위                           |                       일기 작성 & 결과 <br /> 에러 & 로딩                        |

### BACKEND

|                                         김세은                                          |                                      김정윤                                      |                                        김효중                                        |                                         홍민영                                          |
| :-------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: |
| <img  width="100px" src="https://avatars.githubusercontent.com/u/139741006?s=60&v=4" /> | <img width="100px" src="https://avatars.githubusercontent.com/u/95032287?v=4" /> | <img width="100px" src="https://avatars.githubusercontent.com/u/71661011?s=60&v=4"/> |     <img width="100px" src="https://avatars.githubusercontent.com/u/65701100?v=4"/>     |
|                       [@seeun0210](https://github.com/seeun0210)                        |           [@pipi-shortstocking](https://github.com/pipi-shortstocking)           |                      [@rlagywnd4](https://github.com/rlagywnd4)                      |                    [@HongMinYeong](https://github.com/HongMinYeong)                     |
| 그림일기 AI 관련 기능 <br /> 프로필 대시보드 및 <br /> 추천상점 기능 <br /> docker 배포 |            회원정보 수정 <br /> 유효성 검사 <br /> 자동 별명생성 기능            |                       로그인 기능 <br /> 사용자 인증 관련 기능                       | 전체 유저 및 카테고리별 <br /> 평균값, 밈 랭킹 <br /> 통계 관련 기능 <br /> docker 배포 |

## 🖱 사용 기술

### Front-end

- 언어: <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white"/>
- 프레임워크 및 라이브러리: <img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=Next.js&logoColor=white"/> ![image](https://github.com/sesac-ydp5-2nd-C/2nd-project-beatbay-back/assets/63192543/6e39c358-8bdc-43b7-90b4-562ed01caf3d) <img src="https://img.shields.io/badge/Recoil-3578E5?style=flat&logo=Recoil&logoColor=white"/> <img src="https://img.shields.io/badge/AmCharts 5-007396?style=flat-square&logo=AmCharts 5&logoColor=white" />
  <img src="https://img.shields.io/badge/Chart.js-FF6384?style=flat&logo=Chart.js&logoColor=white"/> <img src="https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=Sass&logoColor=white" />
- Open API : <img src="https://img.shields.io/badge/네이버 쇼핑검색 API-03C75A?style=flat-square&logo=Naver&logoColor=white" />

### Back-end

- 언어: <img src="https://img.shields.io/badge/Java-007396?style=flat-square&logo=Java&logoColor=white" />
- 프레임워크 및 라이브러리: <img src="https://img.shields.io/badge/Spring-6DB33F?style=flat&logo=Spring&logoColor=white"/> <img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=flat&logo=Spring Boot&logoColor=white"/> <img src="https://img.shields.io/badge/Spring Security-6DB33F?style=flat&logo=Spring Security&logoColor=white"/> <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=MySQL&logoColor=white"/> <img src="https://img.shields.io/badge/Jpa-6DB33F?style=flat-square&logo=Java&logoColor=white" /> <img src="https://img.shields.io/badge/JSON-000000?style=flat-square&logo=JSON&logoColor=white" /> <img src="https://img.shields.io/badge/Amazon s3-569A31?style=flat-square&logo=Amazon s3&logoColor=white" /> <img src="https://img.shields.io/badge/KOMORAN-007396?style=flat-square&logo=KOMORAN&logoColor=white" />
- Open API : <img src="https://img.shields.io/badge/CLOVA Sentiment-03C75A?style=flat-square&logo=Naver&logoColor=white" /> <img src="https://img.shields.io/badge/Papago Translation-03C75A?style=flat-square&logo=Naver&logoColor=white" /> <img src="https://img.shields.io/badge/Karlo-007396?style=flat-square&logo=&logoColor=white" /> <img src="https://img.shields.io/badge/한국어 별명 생성기-007396?style=flat-square&logo=&logoColor=white" />

## 🖥️ ERD

![image](https://github.com/sesac-ydp5-2nd-C/2nd-project-beatbay-back/assets/95032287/415b6411-dfe1-48e2-9fb3-e06b42e3c6eb)

## 📑 페이지 상세 내역

<img alt="image" src="https://github.com/sesac-ydp5-2nd-C/2nd-project-beatbay-back/assets/95032287/7db2bd8a-2340-47d9-b5da-adcb9ad822af">

## 🌟 화면 구성

| 메인                                                                                                      | 로그인 & 회원가입                                                                                         |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| ![ahwhew8](https://github.com/sessac-3rd-team-A/FE/assets/139740067/ce4807f0-1cd2-47bd-9a4a-66db8a7e2628) | ![ahwhew1](https://github.com/sessac-3rd-team-A/FE/assets/139740067/d4593599-e537-420f-b079-746605296ff5) |

| 일기 작성                                                                                                 | 작성 결과                                                                                                 |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| ![ahwhew2](https://github.com/sessac-3rd-team-A/FE/assets/139740067/d93cf879-03c6-473c-9195-5c770436dd7e) | ![ahwhew3](https://github.com/sessac-3rd-team-A/FE/assets/139740067/696eb8b1-2af5-4ca6-8bd3-210a9d54ecde) |

| 감정 트렌드                                                                                               | 회원 정보 수정                                                                                            |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| ![ahwhew4](https://github.com/sessac-3rd-team-A/FE/assets/139740067/72d04b6b-a392-4522-8c85-ef381fada80e) | ![ahwhew7](https://github.com/sessac-3rd-team-A/FE/assets/139740067/41075a07-c7a5-4f85-b1d3-dd2013c26d32) |

| 프로필 대시보드                                                                                           | 프로필 추천상점                                                                                           |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| ![ahwhew5](https://github.com/sessac-3rd-team-A/FE/assets/139740067/a2cedde1-a939-45ce-b583-2caa5c14cf79) | ![ahwhew6](https://github.com/sessac-3rd-team-A/FE/assets/139740067/60e03b02-0b02-4c6c-a859-5b99e9a27d7e) |
