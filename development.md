# 開發說明（Development）

> 群島生態系 — 照護服務媒合平台｜純靜態網站
> 最後更新：2026-10-14（專業照護版 + 海圖群島語彙）

---

## 1. 專案概述

| 項目 | 內容 |
|---|---|
| 類型 | 純靜態網站（無後端、無建置流程） |
| 技術 | HTML + Tailwind Play CDN + 原生 JavaScript |
| 資料 | 全部寫在前端 `data.js`（模擬資料，示範用途） |
| 狀態保存 | `localStorage['careMatchData']`（登入者、預約、購物車） |
| 部署 | GitHub Pages（`main` 分支） |
| 頁面數 | 12（含 1 頁法務聲明） |

設計目標：**照護產業的信賴感與可讀性**。以「海圖」為視覺語彙（見第 5 節），
服務對象包含高齡使用者，因此字級、對比、觸控目標都比一般網站寬鬆一級。

---

## 2. 檔案結構

```
care-match/
├── index.html              首頁（hero 群島預覽、服務群島、精選島主、輔具、FAQ）
├── caregivers.html         ★ 群島分布海圖（4 座群島 / 23 座島）+ 島主名單 modal
├── caregiver-profile.html  島主專頁（?id=）
├── booking.html            三步驟預約（?caregiverId=）
├── dashboard.html           會員專區
├── profile.html            個人檔案設定（四個分頁）
├── shop.html               群島補給（輔具商店，?category=）
├── product.html            商品詳情（?id=）
├── cart.html               購物車（優惠碼 ISLAND10）
├── login.html              登入 / 註冊（?redirect=，管理員導向 admin.html）
├── admin.html              管理後台（六個區塊，需 role=admin）
├── legal.html              服務條款 / 隱私權 / 無障礙聲明
├── theme.js                ★ Tailwind 設定（色票、字體、字級、圓角、陰影）
├── styles.css              ★ 設計系統（tokens + base + a11y + 全部元件）
├── icons.js                ★ Heroicons 24/outline + 自製島嶼／群島圖示（96 個）
├── islands.js              ★ 群島語彙（島形、島大小、群島排版）
├── app.js                  ★ 共用函式（toast、會員選單、reveal、購物車、預約）
├── data.js                 模擬資料（caregivers / products / reviews / orders / adminAccount）
├── SPEC-professional.md    現行設計規範
├── SPEC-island-theme.md    舊版規範（僅供回溯）
└── development.md / resume.md
```

★ = 共用檔。**原則：一次只改一頁；共用檔要改就全站重驗**（`theme.js` 的 `fontSize` /
`borderRadius` 是全域覆寫，動了每一頁版面都會變）。

---

## 3. 載入順序（不可顛倒）

```html
<head>
  <script src="https://cdn.tailwindcss.com"></script>   <!-- 1. Tailwind -->
  <script src="theme.js"></script>                       <!-- 2. 設定必須在 CDN 之後 -->
  <link rel="stylesheet" href="styles.css">               <!-- 3. 設計系統 -->
</head>
<body>
  ...內容...
  <script src="data.js"></script>    <!-- 資料 -->
  <script src="app.js"></script>     <!-- 共用函式 -->
  <script src="icons.js"></script>   <!-- 圖示（DOMContentLoaded 自動取代 [data-ic]） -->
  <script src="islands.js"></script> <!-- 需要群島語彙的頁面才載入 -->
  <script> ...該頁專屬邏輯... </script>
</body>
```

每一頁的 `<head>` 另外要有：`meta description`、`og:*`、`theme-color #0F5565`、SVG favicon。

---

## 4. 設計系統

### 4.1 色票（`theme.js`）

| Token | Hex | 用途 | 對比（白底） |
|---|---|---|---|
| `ocean` | `#0F5565` | 主色、按鈕、連結 | 8.2:1 |
| `ocean-dark` | `#0A3D49` | hover | 11.8:1 |
| `ocean-light` | `#4A8A97` | 次要線條、喘息服務群島 | 裝飾用 |
| `sand` / `paper` | `#F1EDE6` / `#FBFAF7` | 區塊底 / 頁面底 | — |
| `line` | `#DED9CF` | 分隔線、卡片邊 | — |
| `coral` | `#A9552A` | 價格、重點數字 | 5.1:1 |
| `island` | `#1A6E58` | 已認證、成功 | 6.1:1 |
| `night` | `#0A2A32` | 頁尾（全站唯一深色帶） | — |
| `ink` / `muted` | `#16333A` / `#5D6E72` | 主要 / 次要文字 | 12.7:1 / 5.3:1 |

禁止：漸層、emoji、裝飾動畫、純黑 `#000`、超過一個以上的強調色。

### 4.2 字級（`theme.js` 覆寫 Tailwind 預設）

`xs 13 → sm 15 → base 17 → lg 19 → xl 22 → 2xl 26 → 3xl 31 → 4xl 38 → 5xl 46`
字體：`Figtree`（數字／拉丁）＋ `Noto Sans TC`（中文）。數字元件加 `.num` 使用等寬數字。

### 4.3 常用元件（`styles.css`）

| 用途 | 類別 |
|---|---|
| 版面 | `.wrap` `.section--paper/--sand/--white` `.sec-head` `.eyebrow` `.sec-title` `.sec-lead` |
| 導覽 | `.site-nav` `.brand` `.nav-link[aria-current="page"]` `.nav-toggle` `.nav-mobile` `.user-menu` |
| 按鈕 | `.btn` `.btn--primary/--secondary/--ghost/--clay/--on-dark/--outline-light` `.btn--sm/--lg/--block` |
| 卡片 | `.card` `.card--interactive` `.stat` `.cg-card`（島主卡）`.prod-card`（商品卡） |
| 標記 | `.badge--verified/--info/--price/--warn/--danger/--neutral` `.tag` `.chip[aria-pressed]` `.rating` `.price` |
| 圖示 | `<i data-ic="home" data-ic-class="ic-20"></i>`；JS 用 `icon('home','ic-20')` + 之後呼叫 `renderIcons(el)` |
| 表單 | `.field` `.label` `.input` `.select` `.textarea` `.hint` `.error-text` `.check` `.qty` |
| 資料 | `.table-wrap` `.table` `.list-row` `.empty` `.alert--info/--warn/--success/--danger` `.toast-host` |
| 互動 | `.tabs` `.tab` `.cal` `.cal__day` `.slots` `.slot` `.modal` `.steps` |
| 海圖 | `.chart` `.archipelago` `.isle`（島）`.isle__tip`（島主資訊卡）`.chart__list`（手機清單） |

### 4.4 `islands.js` API

```js
Islands.shape('陳雅惠|新北市')        // → 有機島形（border-radius 8 值字串）
Islands.size(8, 18, 36)             // 服務年資 → 島的像素大小
Islands.layout(8, 'homecare', {w: 520, h: 200, minDist: 48})
                                    // → [{x, y}] 0–1 相對座標；像素空間鬆弛，保證觸控區不重疊
Islands.hash('seed')                // 決定性雜湊 0–1
```

排版的關鍵：**必須先量到欄位實際像素尺寸再排版**（`.chart__canvas` 在手機是隱藏的，
量到 0 會退化）。切換顯示模式時要重新 `renderChart()`。

---

## 5. 群島（海圖）語彙

| 隱喻 | 實體 | 實作 |
|---|---|---|
| 島 | 一位照護夥伴 | 島形由「姓名｜地區」決定（同一人永遠同一座島）；大小＝服務年資；顏色＝服務類型 |
| 群島 | 一類服務 | 主島置中＋兩圈環繞；虛線水域＋名稱標籤；點擊開啟該群島島主名單 |
| 海域 | 平台 | `.chart__grid` 經緯格 ＋ `.chart__contours` 細深度線 |

- 島是 `<button>`，`aria-label` 需含姓名、地區、年資、評分、時薪與「查看＜群島＞名單」。
- 點島 → `openZone(zone, key)`：開 modal、把該位島主標記為 `.cg-row--highlight` 並捲到中間。
- 響應式：≥768px 海圖；<768px 群島清單（每列 ≥56px）。切換用
  `matchMedia('(min-width: 768px)').addEventListener('change', syncChartMode)`。
- 用語分際：島主／群島只用在探索與導覽文案；**預約、時薪、收費、退換貨一律直述**。

---

## 6. 資料與函式契約（改頁面時不可破壞）

**照護夥伴（`caregivers`）**
`id / name / avatar / gender / age / location / services(['home','respite'...]) / serviceNames / price / rating / reviews / experience / certified / intro / availability`

**商品（`products`）**
`id / name / category / categoryName / price / originalPrice / image / stock / sold / rating / description / features`

**共用函式（`app.js`）**
`showNotification(msg,'success'|'error'|'warning'|'info')`（Toast，取代 `window.alert`）、
`loadUserNav()`、`initReveal()`、`addToCart(id)`、`removeFromCart`、`updateCartQuantity`、
`getCartTotal`、`updateCartCount()`（對應 `#cartCount`）、`createBooking`、`cancelBooking`、`checkLogin`。

**URL 參數**
`caregivers.html?type=home|daycare|respite|medical`（首頁卡片用 `type=home`，頁內區塊鍵是 `homecare`，兩者需對照）、
`caregiver-profile.html?id=`、`booking.html?caregiverId=`、`product.html?id=`、`shop.html?category=`、`login.html?redirect=`。

**localStorage**：key `careMatchData` = `{ orders: { bookings, products }, currentUser }`；
`profile.html` 另有 `careMatchProfile`（不含密碼）。

---

## 7. 無障礙規範（每頁必守）

- 文字對比 ≥4.5:1（大字 ≥3:1）；色票皆已驗證
- 互動元素 ≥44×44px（已知例外：手機月曆格寬 41px，見 resume.md）
- 每頁 skip-link、`aria-current="page"`、section 用 `aria-labelledby`
- 表單：可見 `<label>`、`aria-required`、行內 `.error-text`、`aria-invalid`
- 圖片描述性 `alt`、裝飾元素 `aria-hidden="true"`
- 尊重 `prefers-reduced-motion`（`.reveal` 會直接顯示）
- 390px 與 1440px 皆不得水平捲動

---

## 8. 本機開發與驗證

```bash
cd /Users/kunhanyang/care-match
python3 -m http.server 8765 --bind 127.0.0.1     # → http://127.0.0.1:8765/index.html
```

驗證清單（用瀏覽器工具逐項實測，別只看程式碼）：

1. emoji 殘留：`(document.body.innerText.match(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu)||[]).length` = 0
2. 水平捲動：390px 與 1440px 下 `document.documentElement.scrollWidth === window.innerWidth`
3. 行動選單：`aria-expanded` 正確、圖示切換成 x-mark、`#mobileMenu.is-open`
4. 觸控目標：`a,button,input,select,textarea,[role=tab]` 中高度 <40px 的數量（僅允許內文行內連結）
5. 該頁主要互動（選日期、開 modal、加入購物車、切分頁…）
6. 截圖看一遍（`Page.captureScreenshot` + `clip` 最穩），確認無破版

靜態全站掃描：用 `search_files` 掃 `[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]`，`output_mode=count` 即可看出哪一頁還有 emoji。

---

## 9. 部署

```bash
git push origin main          # GitHub Pages 會自動重建（約 1 分鐘）
```

- 線上：https://ywc-rhm.github.io/care-match/
- 分支：`main`（部署）、`island-redesign`（卡通島嶼版備份）、`original-design`（更早綠色版）、`pro-v2`（本次改版）
- 驗證部署：`curl -s -o /dev/null -w '%{http_code}' https://ywc-rhm.github.io/care-match/`，
  或抓頁面確認含 `theme.js` 且不含 emoji。

---

## 10. 常見修改

- **改色票**：只改 `theme.js` 的 `colors`（`styles.css` 的 CSS 變數也要同步，元件用的是變數）。
- **新增一類服務／群島**：`caregivers.html` 的 `zoneData` 加一個 key，`zoneMeta` 加名稱／顏色／座標，
  首頁 `zoneSummary` 同步；搜尋與篩選會自動套用。
- **新增照護夥伴／商品**：只改 `data.js`，各頁的卡片與清單都是從資料渲染。
- **新增頁面**：複製 `legal.html` 為骨架（head + nav + footer 都已符合規範），內容替換即可。
- **換圖示**：`icons.js` 的 `PATHS` 加一筆（Heroicons 24/outline 的 path 內容），即可 `data-ic="名稱"`。
