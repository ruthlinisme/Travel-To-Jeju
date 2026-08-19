# Jeju Girls Trip v8 — 四人共同編輯版

## Supabase 已寫入前端
Project URL:
`https://qpoqilvkvotqkhqnsart.supabase.co`

前端使用的是 Publishable key。Publishable key 可以放在瀏覽器端；真正的資料保護由 Supabase Auth + RLS 負責。

## 四人共同同步
- 每日行程
- 購物清單
- 景點
- 餐廳
- 預支費

## 個人資料（不分享）
- 個人花費

## 第一次設定
1. Supabase → SQL Editor → New query
2. 執行 `supabase-setup.sql`
3. Authentication → Users 建立四人的 Email / Password 帳號
4. 建議四個帳號建立完成後關閉公開 Sign Up
5. GitHub Pages 更新 `index.html`、`styles.css`、`Jeju-banner.png`
6. 四人登入同一網址，即可共同編輯

## 即時同步
共同資料使用 `shared_items` + Supabase Realtime。
其他人新增、修改、刪除後，開著 App 的成員會自動重新讀取。

## 目前旅行資訊
航班 / 住宿 / 租車資訊目前仍是大家看到同一份固定內容。下一版可再把「資訊」頁也做成可編輯並同步。

## v9 時間選單更新
- 「預計抵達時間」改成下拉式時間選單。
- 「預約時間」改成下拉式時間選單。
- 時間以 24 小時制呈現，每 15 分鐘一個選項，例如 09:00、09:15、09:30、09:45。
- 預約時間可選「無 / 尚未預約」。

## v10 每日行程版面
- 每日行程卡片之間的垂直距離加大。
- iPhone / iPad 窄版間距 20px。
- iPad 寬版間距 24px。
- 交通時間列保留在兩張卡片之間。

## v11 交通資訊調整
- 取消 v10 額外加大的行程卡片間距，恢復原本版面。
- 每兩張行程卡中間新增「公里數 km」欄位。
- 公里數可直接手動編輯，支援小數（例如 12.4 km）。
- 分鐘數改成可直接手動編輯。
- 交通方式、公里數、分鐘數修改後會同步到 Supabase。

## v12 UI 更新
- 頁首登入帳號移到 Banner 右上角。
- NAVER Map 按鈕圖示改為綠色圈圈 N。
- 每張每日行程卡左側加入圖片區塊。
- 新增 / 編輯行程可直接上傳景點或行程照片。
- 預支費頁面名稱改為「分帳費」。

## v13 更新
- 頁首右下方的單一 Tab 現在可用手指上下滑動，滑到哪一個 Tab 就會直接切換到該頁。
- 購物清單改成四人 Supabase 共編：新增、修改、刪除會同步。
- 個人花費仍維持私人，只保存在各自瀏覽器。
- 既有 Supabase 專案請再執行新版 `supabase-setup.sql`，讓 `shared_items` 可以儲存 `shopping`。

## v14 更新
- 每個頁面的卡片現在都會顯示備註（若有填寫）。
- 每日行程卡取消「點空白處直接跳 NAVER Map」；現在只會在點擊按鈕時才開地圖或編輯。
- 每日行程上傳圖片後，會把照片套用成整張行程卡的封面背景。
- 封面背景改成全幅顯示，並加上透明玻璃感內容層。

## v15 更新
- 每日行程卡移除透明玻璃感。
- 有照片的景點 / 餐廳 / 購物 / 住宿行程仍可使用整張卡片照片背景。
- 航班資訊完全不使用照片背景，恢復乾淨的航班卡樣式。

## v16 PWA / 桌面 App / 通知
- Web App 已改成可安裝的 PWA（像桌面 App 一樣）。
- 已加入：
  - `manifest.webmanifest`
  - `sw.js`
  - App icon（使用你提供的濟州石像橘子圖）
- App Icon 檔案：
  - `app-icon-192.png`
  - `app-icon-512.png`
  - `apple-touch-icon.png`
  - `favicon-64.png`

### 通知功能
- 已加入「開啟通知」與「測試通知」。
- 目前是 **本機通知 / 提醒通知**：
  - 可手動測試通知
  - App 開著時，會檢查當天 30 分鐘內即將開始的行程並發送提醒
- 這不是遠端推播（Push）。如果要做到關掉網站後仍由伺服器主動推播，之後還要再加 Push Server / VAPID。

### 安裝方式
- iPad / iPhone：Safari → 分享 → 加入主畫面
- Chrome / Edge：可直接使用「安裝 App」

### GitHub 更新
請一起上傳以下新檔案：
- index.html
- styles.css
- manifest.webmanifest
- sw.js
- app-icon-192.png
- app-icon-512.png
- apple-touch-icon.png
- favicon-64.png
