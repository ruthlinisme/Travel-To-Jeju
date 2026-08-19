# Jeju Road Trip Web App

## 檔案
- `index.html`：Vue.js 單頁 App
- `styles.css`：濟州海島風樣式
- `Jeju-banner.png`：1920×1280 頁首 Banner

## 技術
- Vue 3 CDN
- Tailwind CSS CDN
- SortableJS：iPad / 手機拖曳行程
- NAVER Maps URL Scheme：點行程卡開啟 NAVER Maps
- Open-Meteo：天氣
- Frankfurter：KRW → TWD 匯率
- localStorage：資料保存在目前瀏覽器

## 重要限制
此版本是純 GitHub Pages 靜態前端。NAVER Maps 的搜尋與導航跳轉可以直接使用，但「自動計算兩個韓文地址之間的真實交通分鐘數」需要另外串接可用的地理編碼與路線 API 憑證，因此目前交通分鐘數是可編輯的估算值。

相片會壓縮後保存在 localStorage；如果放大量照片，瀏覽器儲存空間仍可能不足。

## GitHub Pages
將三個檔案放在 repository 根目錄：
- index.html
- styles.css
- Jeju-banner.png

然後到 Settings → Pages → Deploy from a branch → main → /(root)。
