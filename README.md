# nexon-reward-yooseungmo

---

- MSA 기반으로 이벤트·보상 시스템을 구축하기 위한 백엔드 과제입니다.   
> Gateway Server: 인증·권한 검증 및 마이크로서비스 라우팅   
> Auth Server: 사용자 관리, JWT 발급     
> Event Server: 이벤트 생성·조회, 보상 정의, 보상 요청 처리     
 
---

## 기술 스택 (Tech Stack)

| 분야                | 상세 내용                                             |
| ------------------- | ----------------------------------------------------- |
| **Framework**       | NestJS                                                |
| **Node.js**        | 18 (LTS)                                            |
| **Database**        | MongoDB (mongoose)              |
| **인증**       | JWT                              |
| **배포/실행**     | Docker, Docker Compose                               |
| **언어** | TypeScript                             |
| **Code Style**        | Airbnb Style Guide                                  |


---



## 설치 및 실행 (Installation & Usage)

### GitHub
> Repository: https://github.com/yooseungmo/nexon-reward-yooseungmo

### 실행 방법 (Docker Compose)
```
# 프로젝트 루트에서
docker-compose up --build
```
각 서비스는 아래 포트로 기동됩니다:
> Gateway: 3000    
> Auth   : 3001   
> Event  : 3002      

---
### .env.example 복사
```
cp apps/auth/.env.example  apps/auth/.env
cp apps/event/.env.example apps/event/.env
cp apps/gateway/.env.example apps/gateway/.env
```

### Auth (apps/auth/.env)
```
PORT=3001
MONGODB_URI=mongodb://mongo:27017
auth
JWT_SECRET=nexon
JWT_EXPIRES_IN=3600s
REFRESH_TOKEN_SECRET=nexon
REFRESH_TOKEN_EXPIRES_IN=7d
```
### Event (apps/event/.env)
```
PORT=3002
MONGODB_URI=mongodb://mongo:27017
event
JWT_SECRET=nexon
JWT_EXPIRES_IN=3600s
REFRESH_TOKEN_SECRET=nexon
REFRESH_TOKEN_EXPIRES_IN=7d
```
### Gateway (apps/gateway/.env)
```
PORT=3000
JWT_SECRET=nexon
AUTH_SERVICE_URL=http://auth:3001
EVENT_SERVICE_URL=http://event:3002
```

### Swagger API 문서
> Auth Service: http://localhost:3001/docs#/     
> Event Service: http://localhost:3002/docs#/    
   
---

## API 목록

### 이벤트 (Event Service)
```
POST   /events                # 생성 (OPERATOR)
GET    /events                # 목록 (USER)
GET    /events/:id            # 상세 (USER)
PATCH  /events/:id            # 수정 (OPERATOR)
DELETE /events/:id            # 삭제 (OPERATOR)
```
### 보상 (Event Service)
```
POST   /events/:id/reward     # 보상 등록 (OPERATOR)
GET    /events/:id/reward     # 조회 (USER)
PATCH  /events/reward/:id     # 수정 (OPERATOR)
DELETE /events/reward/:id     # 삭제 (OPERATOR)
```
### 유저 보상 요청 (Event Service)
```
POST   /events/:eventId/receive  # 보상 받기 (USER)
```
### 요청 이력 (Receive Module)
```
GET    /receives/my             # 내 이력 (USER)
GET    /receives?eventId=       # 전체 이력 (AUDITOR)
```
### 개발용 테스트 API
```
POST   /test/activity-logs      # 개발용 유저 활동 로그 생성
GET    /health                  # 헬스 체크
```

---
## 이벤트 타입

```
MissionType    설명
FRIEND_INVITE  친구 초대 n명 완료
SOCIAL_SHARE   링크 공유 n회 완료
MONSTER_KILL   몬스터 n마리 처치
PARTY_QUEST    파티 퀘스트 n회 완료
MESO_SPEND     메소 n 이상 소비
```

## 전략 패턴 (Strategy Pattern)

AbstractMissionStrategy 추상 클래스로 미션 검증(performAction) 및 진행도 계산(performCount) 공통 로직 추상화    
Record<MissionType, AbstractMissionStrategy> 매핑을 통해 동적 디스패치 구현    
개방-폐쇄 원칙(OCP) 준수: 새로운 미션 타입 추가 시, 기존 코드 수정 없이 확장 가능     
책임 분리: EventService → MissionService → Strategy 계층으로 역할 명확화    

총 5가지 전략 구현:

> MonsterKillStrategy   
> PartyQuestStrategy   
> FriendInviteStrategy   
> SocialShareStrategy   
> MesoSpendStrategy   

---

## 추가 구현 API

전체 이력 조회: GET /receives?eventId= (감사자) — 기획에는 없으나 전략 패턴으로 쉽게 구현 가능   
테스트용 로그 생성: POST /test/activity-logs — 개발 시 시드 데이터 쌓기용   

---
## 코딩 컨벤션

Airbnb Style Guide 준수   
모든 리스트 조회 API에 페이지네이션 및 필터링 지원   
Swagger 문서 자동 생성 및 검증 (class-validator + ValidationPipe)   

---
