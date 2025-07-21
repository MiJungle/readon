# ReadOn - Multi Step Form

이 프로젝트는 Next.js와 TypeScript, Jotai, React Hook Form을 활용한 **도서 리뷰 작성 웹앱**입니다.  
사용자는 단계별 폼을 통해 도서 정보를 입력하고, 리뷰를 작성할 수 있습니다.

---

## 🛠️ 기술 스택

- **Next.js** (Page Router)
- **TypeScript**
- **Jotai** (상태 관리, localStorage 연동)
- **React Hook Form** (폼 관리 및 검증)
- **Emotion** (스타일링)

---

## 📁 주요 폴더 구조

```
src/
  components/
    Step1Form/
    Step2Form/
    StepIndicator/
  atoms/
    bookFormData.ts
  pages/
    book-review/
      [step].tsx
    index.tsx
  styles/
```

---


## 🚀 실행 방법

1. **패키지 설치**

   ```bash
   npm install
   # 또는
   yarn install
   ```

2. **개발 서버 실행**

   ```bash
   npm run dev
   # 또는
   yarn dev
   ```

3. **브라우저에서 접속**
   ```
   http://localhost:3000
   ```

---

## 📝 주요 기능

- `/book-review/step-1` : 도서 기본 정보 입력


각 단계는 URL로 직접 접근하거나, StepIndicator를 통해 이동할 수 있습니다.

---

## 🗂️ 상태 관리 및 데이터 저장

- **Jotai**의 `atomWithStorage`를 사용하여 폼 데이터가 localStorage에 자동 저장됩니다.
- 새로고침/브라우저 재접속 시에도 입력값이 유지됩니다.


---
