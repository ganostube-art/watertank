# WATERTANK RENOVATION 홈페이지

정적 HTML 기반의 물탱크 리노베이션 무료상담 랜딩페이지입니다. 서버 빌드 없이 `index.html`과 `assets` 폴더를 그대로 업로드하면 됩니다.

## 파일 구성

- `index.html`: 홈페이지 본문, 스타일, 상담 폼
- `assets/hero-1.png` - `assets/hero-5.png`: 히어로 순환 배경 이미지
- `assets/hero-development.png`: 메인 대표 이미지
- `assets/tank-site.jpg`: 본사 자료 기반 물탱크 현장 이미지
- `assets/consult-phone.jpg`: 상담 접수 이미지
- `assets/estimate-check.jpg`: 견적 확인 이미지
- `assets/tank-frp-smc.png`: FRP/SMC 물탱크 카드 이미지
- `assets/tank-sts-concrete.png`: STS/콘크리트 물탱크 카드 이미지
- `assets/favicon.svg`: 브라우저 탭 아이콘
- `ref/시안A 인쇄.dc.html`: 참고용 원본 시안

## 나중에 교체할 주요 항목

- 사이트명: `WATERTANK RENOVATION`
- 무료상담: `010-4920-4270`
- 메일상담: `maniayoung@hanmail.net`
- 개선 가능 물탱크: FRP, SMC, STS, 콘크리트
- 개선 항목: 볼탑 고장·교체, 누수 개선, 부분·올 라이닝, 지지대 보강, 인장대 교체
- 본사 신뢰 요소: 전국 출장 시공, 제조사 다이렉트 수급, 꼼꼼한 시공, 사후관리
- 상담 폼 항목: 지역, 물탱크 종류, 개선 항목, 누수 위치, 희망 일정
- 대표 이미지: `assets/hero-development.png`

## 상담 폼 운영 메모

현재 상담 폼은 입력 내용을 정리해 `maniayoung@hanmail.net` 메일 작성창으로 연결합니다.

구글시트 또는 CRM 자동 접수를 사용할 때는 `index.html`의 상담 폼에 있는 `data-endpoint` 값에 접수용 Web App URL을 입력하면 됩니다.

```html
<form class="form" id="consultForm" data-endpoint="https://script.google.com/macros/s/.../exec">
```

자동 접수 연동 시 저장 권장 항목은 접수일시, 유입 URL, 이름, 연락처, 지역, 물탱크 종류, 개선 항목, 누수 위치, 상담 희망 시간, 희망 일정, 문의 내용입니다.
