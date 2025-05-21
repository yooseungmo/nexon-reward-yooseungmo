# nexon-reward-yooseungmo

NestJS 기반 MSA 아키텍처로 구현된 이벤트/보상 관리 시스템입니다.   
실무에서 자주 쓰이는 패턴(Strategy Pattern)과 역할 기반 권한 제어(RBAC)를 적용하여,      
확장성과 유지보수성을 고려한 설계입니다.

---
## 주요 기능
> Gateway Server: 모든 API 진입점, JWT 인증, RBAC 권한 검사, 요청 프록시      
> Auth Server: 사용자 관리, 로그인/회원가입, 역할(role) 관리, JWT 발급      
> Event Server: 이벤트·보상 CRUD, 보상 요청 처리, 미션 검증 및 진행도 계산      
 
---

## 기술 스택 (Tech Stack)

| 분야                | 상세 내용                                             |
| ------------------- | ----------------------------------------------------- |
| **Framework**       | NestJS                                                |
| **Node.js**        | 18 (LTS)                                            |
| **Database**        | MongoDB (mongoose)              |
| **인증/인가**       | JWT, RBAC(Role-Based Access Control) 적용                             |
| **배포/실행**     | Docker, Docker Compose                               |
| **언어** | TypeScript                             |
| **Code Style**        | Airbnb Style Guide                                  |


---



## 설치 및 실행 (Installation & Usage)

### 1. Repository Clone
```
git clone https://github.com/yooseungmo/nexon-reward-yooseungmo.git
cd nexon-reward-yooseungmo
```
### 2. env 생성
- Auth (apps/auth/.env)
```
PORT=3001
MONGODB_URI=mongodb://mongo:27017
MONGODB_DB=auth
JWT_SECRET=nexon
JWT_EXPIRES_IN=3600s
REFRESH_TOKEN_SECRET=nexon
REFRESH_TOKEN_EXPIRES_IN=7d
```
- Event (apps/event/.env)
```
PORT=3002
MONGODB_URI=mongodb://mongo:27017
MONGODB_DB=event
JWT_SECRET=nexon
JWT_EXPIRES_IN=3600s
REFRESH_TOKEN_SECRET=nexon
REFRESH_TOKEN_EXPIRES_IN=7d
```
- Gateway (apps/gateway/.env)
```
PORT=3000
JWT_SECRET=nexon
AUTH_SERVICE_URL=http://auth:3001
EVENT_SERVICE_URL=http://event:3002
```
### 3. Docker Compose 실행
```
docker-compose up --build
```
각 서비스는 아래 포트로 기동됩니다:
> Gateway: 3000    
> Auth   : 3001   
> Event  : 3002      

---

### Swagger API 문서
> Auth Service: http://localhost:3001/docs#/     
> Event Service: http://localhost:3002/docs#/    
   
---

## API 목록
### 계정 (Auth Service)
```
POST   /auth/signup           # 회원가입 (Public)
POST   /auth/login            # 로그인 (Public)
POST   /auth/logout           # 로그아웃 (Public)
POST   /auth/refresh          # 로그인 연장 (Public)
```
### 사용자 (User Service)
```
GET    /users                 # 목록 조회 (ADMIN)
GET    /users/:id             # 상세 조회 (ADMIN)
POST   /users/:id/role        # 역할 변경 (ADMIN)
```
### 이벤트 (Event Service)
```
POST   /events                # 생성 (OPERATOR|ADMIN)
GET    /events                # 목록 (USER|OPERATOR|AUDITOR|ADMIN)
GET    /events/:id            # 상세 (USER|OPERATOR|AUDITOR|ADMIN)
PATCH  /events/:id            # 수정 (OPERATOR|ADMIN)
DELETE /events/:id            # 삭제 (OPERATOR|ADMIN)
```
### 보상 (Event Service)
```
POST   /events/:id/reward     # 보상 등록 (OPERATOR|ADMIN)
PATCH  /events/reward/:id     # 수정 (OPERATOR|ADMIN)
DELETE /events/reward/:id     # 삭제 (OPERATOR|ADMIN)
```
### 유저 보상 요청 (Event Service)
```
POST   /events/:eventId/receive  # 보상 요청 (USER|OPERATOR|AUDITOR|ADMIN)
```
### 요청 이력 (Receive Module)
```
GET    /receives/my             # 내 이력 (USER|OPERATOR|AUDITOR|ADMIN)
GET    /receives?eventId=       # 전체 이력 (OPERATOR|AUDITOR|ADMIN)
```
### 전체 미션 진행도 일괄 조회 API (Event Service)
```
GET    /event/progress/all      # 전체 미션 진행도 일괄 조회 (USER|OPERATOR|AUDITOR|ADMIN)
```
### 개발용 테스트 API
```
POST   /test/activity-logs      # 개발용 유저 활동 로그 생성
GET    /health                  # 헬스 체크
```

---
### 이벤트 타입

| MissionType                | 설명                                         |
| ------------------- | ----------------------------------------------------- |
| **FRIEND_INVITE**        | 링크 공유 n회 완료                                           |
| **SOCIAL_SHARE**        | 링크 공유 n회 완료                                           |
| **MONSTER_KILL**        | 몬스터 n마리 처치                                        |
| **PARTY_QUEST**        | 파티 퀘스트 n회 완료                                          |
| **MESO_SPEND**       | 메소 n 이상 소비                                                |

## 전략 패턴 (Strategy Pattern)

> - AbstractMissionStrategy 추상 클래스로 미션 검증(performAction) 및 진행도 계산(performCount) 공통 로직 추상화    
> - Record<MissionType, AbstractMissionStrategy> 매핑을 통해 동적 디스패치 구현     
> - 개방-폐쇄 원칙(OCP) 준수: 새로운 미션 타입 추가 시, 기존 코드 수정 없이 확장 가능      
> - 책임 분리: EventService → MissionService → Strategy 계층으로 역할 명확화     
> - 총 5가지 전략 구현: MonsterKillStrategy|PartyQuestStrategy|FriendInviteStrategy|SocialShareStrategy|MesoSpendStrategy   

---

## 추가 구현 API

> 전체 미션 진행도 일괄 조회: GET /event/progress/all    
> (기획에는 없으나 전략 패턴 적용으로 쉽게 구현 가능)
> 
> 테스트용 로그 생성: POST /test/activity-logs         
> (개발 시 활동 로그 시드 데이터 생성)     

---
## 코딩 컨벤션

> Airbnb Style Guide 준수    
> 모든 리스트 조회 API에 페이지네이션 및 필터 기능 지원   

---
