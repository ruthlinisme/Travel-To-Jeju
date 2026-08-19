# Jeju Trip Web App

單頁式 Vue.js + Tailwind CSS 行程 Web App。

## 檔案
- `index.html`：Vue App 與功能邏輯
- `styles.css`：濟州海島風 UI
- `Jeju-banner.png`：頁首 Banner

## 使用方式
直接放到 GitHub Pages 即可。資料會存在瀏覽器 `localStorage`。

## 外部服務
- NAVER Maps：使用官方 `nmap://` URL Scheme 開啟 NAVER Map，失敗時回退到 NAVER Map 網頁搜尋。
- Open‑Meteo：讀取濟州市即時氣溫、體感溫度與天氣代碼。
- Frankfurter：KRW → TWD 每日匯率。

## 注意
這是純前端版本，因此沒有多人同步資料庫。不同裝置、不同瀏覽器的資料不會自動同步。
