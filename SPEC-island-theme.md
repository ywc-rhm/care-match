# 群島生態系 SPEC (島嶼主題版)

> 當前主力分支 `main` 的設計規格

---

## 1. Concept & Vision

**島嶼生態系長照平台** — 每位照服員是一座島，整個平台是一片群島海洋。深藍色海洋背景襯托綠色小島，地圖式探索體驗，讓長照服務媒合變得直觀且富有溫度。

核心理念：照護關係就像島嶼間的互助網絡，每座島都有其獨特價值。

---

## 2. Design Language

### 色彩系統
| Token | Hex | 用途 |
|-------|-----|------|
| `ocean` | `#0891B2` | 主色，青色，深海/Header |
| `ocean-light` | `#22D3EE` | 副色，亮青 |
| `sand` | `#F5F0E8` | 沙灘，米色背景 |
| `coral` | `#F97316` | 強調，珊瑚橙，價格/CTA |
| `island` | `#059669` | 島嶼綠，主色 |
| `island-light` | `#34D399` | 淺綠 |
| `night` | `#0F172A` | 深色文字 |

### 字體
- **標題/Display**: `Nunito` (Google Fonts) — 800 weight
- **內文**: `Noto Sans TC` — 400/500/700

### 島嶼元素（島嶼樣式時使用）
- 草地：`linear-gradient(145deg, #86EFAC 0%, #22C55E 60%, #16A34A 100%)`
- 沙灘：`linear-gradient(145deg, #FCD34D 0%, #F59E0B 100%)`
- 島上樹林：深綠色圓點，分散放置
- 島嶼陰影：`radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%)`

---

## 3. Pages

### 3.1 首頁 (index.html)
- 深色海洋背景（`#0A1628` → `#16425B`）
- Hero 區：大標語「守護每座島嶼的幸福」
- 四大服務分類卡片（居家/日照/喘息/醫療陪同）
- 島嶼補給站商品展示（精選4項輔具）
- 頁尾：群島生態系 + 聯絡資訊

### 3.2 探索群島 (caregivers.html) ⭐ 核心頁面
**地圖式群島體驗**

- 深藍海洋背景 + 微弱經緯度格線 (`rgba(34, 211, 238, 0.03)`)
- **23座小島**散落在地圖四個區域（絕對定位 %）
- 每座島由 `<div class="island-land">` 構成：
  - `.island-beach` — 金色沙灘底
  - `.island-grass` — 綠色草地上層
  - `.island-tree` — 深綠色圓點樹林裝飾
  - `.island-shadow` — 底部陰影
- Hover：scale(1.15) 放大 + 顯示 `.island-name` 標籤
- 點擊島嶼 → `openZone(zone)` 開啟該群島 Modal

**群島分布：**
| 區域 | Zone Key | 島嶼數 | 位置 |
|------|----------|--------|------|
| 🏠 居家服務群島 | `homecare` | 8座 | 左上方 |
| ☀️ 日照中心群島 | `daycare` | 5座 | 右上方 |
| 🌙 喘息服務群島 | `respite` | 4座 | 左下方 |
| 🏥 醫療陪同群島 | `medical` | 6座 | 右下方 |

**Modal 結構：**
- 全螢幕 overlay (`rgba(10, 22, 40, 0.9)`)
- 面板：深色玻璃效果 (`bg-slate-900/95 backdrop-blur-xl`)
- Header：群島名稱 + Emoji + 島嶼數量
- 搜尋列
- 滾動式島嶼列表 `.island-list-card`

### 3.3 島主專頁 (caregiver-profile.html)
- 島嶼 Hero 區（漸層背景 + 島嶼俯視圖裝飾）
- 大頭貼 + 名稱 + 評分 + 服務區域
- 島嶼徽章（服務達人）
- 四大數據卡（服務經驗/個案數/滿意度/收費）
- 自我介紹 + 專長服務標籤
- 收費標準表（一般/特殊時段）
- 評價列表（3則）
- 底部固定「預約這座島嶼」按鈕

### 3.4 登入/註冊 (login.html)
- 海洋漸層背景
- 浮島裝飾（3個，飄浮動畫）
- Tab 切換：登入 / 加入群島
- 表單卡片（玻璃效果）
- 第三方登入（Google / LINE）
- 展示提示：本網站為展示用途

### 3.5 預約服務 (booking.html)
- 三步驟流程：選擇時間 → 填寫資料 → 完成
- Step 1：月曆選擇日期 + 時段選擇（上午/下午/晚間）
- Step 2：個案/聯絡人/地址/服務項目/特殊需求 表單
- Step 3：成功畫面 + 預約摘要

### 3.6 我的島嶼/儀表板 (dashboard.html)
- 海浪分隔線
- 歡迎訊息 + 島嶼視覺卡
- 四大數據卡（服務次數/時數/滿意度/收入）
- 「我的長照島嶼」資訊面板
- 即將到來的服務列表
- 快捷動作區塊（探索島嶼/補給站/設定）

### 3.7 島嶼設定/個人資料 (profile.html)
- 島嶼 Banner 背景
- 大頭貼上傳
- 四個 Tab：基本資料 / 服務設定 / 可預約時段 / 密碼設定
- 時段設定：週一至日 × 三個時段（矩陣式勾選）
- 服務項目標籤（點擊切換選取）

### 3.8 島嶼補給站 (shop.html)
- Hero Banner（漸層 + 浮島裝飾）
- 分類標籤列（全部/行動輔具/日常照護/醫護用品/安全防護/復健器材）
- 商品網格（4欄）
- 商品卡片：Emoji 大圖 / 分類 / 名稱 / 原價+優惠價 / 加入按鈕
- 折扣標籤（絕對定位）

### 3.9 購物船艙 (cart.html)
- 船艙主題（綠色背景）
- 空狀態提示
- 商品清單（圖+名+價+數量+/-）
- 費用明細（商品小計/運費/折扣/總計）
- 優惠碼輸入（展示碼：ISLAND10）
- 結帳按鈕 + 配送資訊提示

### 3.10 商品詳情 (product.html)
- 雙欄佈局（圖/資訊）
- Emoji 大圖展示區
- 規格標籤
- 數量選擇器
- 加入購物船艙 / 立即購買 雙按鈕
- 商品詳情（特色/適用對象/注意事項）

### 3.11 管理後台 (admin.html)
- 側邊導航列（深綠色漸層）
- 6個區塊：儀表板/會員管理/預約管理/商品管理/照服員管理/系統設定
- 儀表板：4個數據卡 + 最新預約表格
- 表格樣式：灰線分隔 + hover 效果
- 狀態徽章（待確認/已確認/已完成）

---

## 4. Component Inventory

### Island (島嶼本體)
```
.island (position: absolute)
  .island-name (opacity: 0 → hover時 1)
  .island-land
    .island-beach (金色沙灘)
    .island-grass (綠色草地 + trees + emoji)
    .island-shadow (底部陰影)
```
States: default / hover (scale 1.15 + name visible) / active

### ZoneModal (群島彈出視窗)
- Overlay: `rgba(10, 22, 40, 0.9)` + backdrop blur
- Panel: 玻璃效果深色卡片，最大高度 85vh
- Header: 漸層背景色（每區不同）+ 關閉按鈕
- Search: 輸入框 + 搜尋圖示
- List: 滾動區域，`.island-list-card` 為每筆資料

### CaregiverCard (照服員卡片，列表用)
- Mini 島嶼圖（固定寬度）
- 名稱 + 評分 + 服務標籤 + 價格
- Hover: translateX(4px) + 邊框變色

### ProductCard (商品卡片)
- 1:1 圖片區（漸層背景）
- 折扣標籤（絕對定位）
- Emoji 展示
- 名稱/描述/價格
- 加入購物車按鈕

### BookingCalendar (預約月曆)
- 7欄 grid（日至六）
- `.calendar-day`: default / today / selected / disabled
- 週末紅色標示

---

## 5. Technical Approach

- **Framework**: Vanilla HTML + Tailwind CSS (CDN)
- **Fonts**: Google Fonts (Noto Sans TC + Nunito)
- **State**: localStorage (cart, currentUser)
- **No backend**: 純前端展示，資料寫在 JS 陣列
- **Routing**: 靠 HTML 檔案跳轉，URL params 傳遞狀態（如 `booking.html?caregiver=吳佩蓉`）

### key functions (app.js + inline)
- `openZone(zone)` — 開啟群島 Modal
- `closeZone()` — 關閉 Modal
- `addToCart(name, price)` — 加入購物車
- `changeQty(idx, delta)` — 修改數量
- `applyPromo()` — 套用優惠碼
- `renderCalendar()` / `selectDate()` / `selectTime()` — 預約月曆

### 資料結構
```js
currentUser = { id, email, name, role, avatar, phone, createdAt }
cart = [{ name, price, qty }]
```

---

## 6. File Structure

```
care-match/
├── index.html              # 首頁
├── caregivers.html         # 探索群島（地圖）
├── caregiver-profile.html  # 島主專頁
├── booking.html            # 預約服務
├── dashboard.html          # 我的島嶼
├── profile.html            # 島嶼設定
├── shop.html               # 島嶼補給站
├── product.html             # 商品詳情
├── cart.html               # 購物船艙
├── login.html              # 登入/註冊
├── admin.html              # 管理後台
├── data.js                 # Mock 資料 + admin 帳號
└── app.js                  # 共用工具函式
```

---

## 7. Git & Deployment

- **Repository**: `git@github.com:ywc-rhm/care-match.git`
- **Main branch**: `main`（島嶼主題，活躍開發）
- **Backup branch**: `original-design`（舊版綠色主題）
- **GitHub Pages**: https://ywc-rhm.github.io/care-match/
- **最終部署**: NAS (`192.168.50.1`)
- **SSH Key**: `~/.ssh/id_rsa`（無密碼，已加入 GitHub）

---

## 8. Admin Credentials

> ⚠️ 勿外洩，僅存放於 data.js client-side

- **Email**: `yth_Kj2mdU@alkmail.com`
- **Password**: `sekM0O!tn<eg3k(EG*`

---