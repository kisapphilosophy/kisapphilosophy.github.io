# KISAP 웹사이트

한국분석철학대학생연합학회(KISAP) 홈페이지입니다. 빌드 도구 없이 HTML·CSS·JS만으로 되어 있어서, 폴더째 아무 정적 호스팅에 올리면 바로 동작합니다.

## 파일 구성

```
index.html      메인 (사다리 히어로)
about.html      학회 소개
activities.html 학술 활동
join.html       가입 안내
bylaws.html     회칙
archive.html    아카이브
gallery.html    갤러리
links.html      링크 모아보기
kisap.css       전체 스타일 (색, 글로우, 반응형)
kisap.js        메뉴·푸터·글로우 글자·사다리·필터 자동 생성
PretendardVariable.woff2   한글 서체 (OFL, Pretendard-OFL.txt)
images/         갤러리 사진 (참석자 얼굴 모자이크본)
```

영문 서체 Inter와 IBM Plex Mono는 Google Fonts에서 불러옵니다.

## 자주 고치는 곳

| 바꿀 것 | 위치 |
|---|---|
| 메뉴 이름·순서, 연락 이메일 | `kisap.js` 맨 위 `NAV`, `JOIN`, `EMAIL` |
| 메인 문구, 창립 연도, 다음 행사 | `index.html` |
| 구글폼 링크 | `join.html`의 `Apply via Google Form` 버튼 `href="#"` |
| 자료 링크 | `archive.html` 각 줄의 `href="#"` |
| 인스타·드라이브·디스코드 등 | `links.html` 각 줄의 `href="#"` |
| 갤러리 사진 | `gallery.html` 각 칸에서 `.aura` 줄을 지우고 `<img src="images/파일.jpg" alt="설명">` 넣기 |
| 회칙 본문 | `bylaws.html` 의 `.chapter` 블록 |

- 빛나는 글자를 새로 만들려면 `<span class="glow">Text</span>`를 쓰면 됩니다. 은은한 버전은 `class="glow soft"`입니다.
- 줄에 마우스를 올렸을 때 빛나게 하려면 `<a class="row">` 안에 `<span class="hov"></span>`을 넣으면 됩니다.
- 자료·갤러리 필터는 각 줄과 칸의 `data-tag` 값과 버튼의 `data-filter` 값이 같으면 동작합니다.

## 올리는 방법

- **Netlify**: app.netlify.com/drop 에 이 폴더를 끌어다 놓기
- **GitHub Pages**: 저장소에 폴더 내용을 올리고 Settings → Pages에서 배포
- **Vercel / Cloudflare Pages**: 이 폴더를 그대로 정적 사이트로 배포
