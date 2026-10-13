# 群島生態系 SPEC（專業照護版）

> 分支 `pro-v2` · 取代 `SPEC-island-theme.md`（島嶼主題版）
> 目標：把「兒童 App／卡通感」全面改為照護產業需要的信賴感與可讀性

---

## 1. 為什麼改版

原島嶼主題的卡通感來源（已全面移除）：

| 卡通感來源 | 專業版處理 |
|---|---|
| emoji 當 logo／圖示（共 361 處、70 種） | 全部換成 Heroicons 線性圖示（`icons.js`） |
| Nunito 圓體標題 | Figtree + Noto Sans TC |
| Q 彈放大、浮動小島、光暈 pulse | 移除；只留 180ms 顏色／位移過場 |
| 青綠→橘高彩漸層、裝飾波浪 | 移除；改單色深青藍 + 暖米白 |
| 全圓角膠囊按鈕 | 8–16px 圓角、48px 高按鈕 |
| 小字（12–14px）與低對比灰字 | 基準 17px、行高 1.75、文字對比 ≥ 4.5:1 |

**保留**：群島品牌意象（文案、命名、「服務區域」互動概念），只是把「卡通小島」換成專業的區域分布面板。

產業設計依據（ui-ux-pro-max 資料庫比對結果）：`Trust & Authority` 版型 + `Accessible & Ethical` 風格，冷靜藍 + 暖中性色、醫療級字體、無障礙優先。

---

## 2. 設計語彙

### 色彩（唯一來源：`theme.js` 與 `styles.css` 的 CSS 變數）

| Token | Hex | 用途 | 對比（白底） |
|---|---|---|---|
| `ocean` | `#0F5565` | 主色：按鈕、連結、強調 | 8.2:1 |
| `ocean-dark` | `#0A3D49` | hover／深色 | 11.8:1 |
| `ocean-light` | `#4A8A97` | 邊框、次要線條 | 3.4:1（僅裝飾） |
| `sand` | `#F1EDE6` | 暖色區塊底 | — |
| `paper` | `#FBFAF7` | 頁面底 | — |
| `line` | `#DED9CF` | 分隔線、卡片邊 | — |
| `coral` | `#A9552A` | 價格、重點數字 | 5.1:1 |
| `island` | `#1A6E58` | 已認證、成功、可預約 | 6.1:1 |
| `night` | `#0A2A32` | 頁尾、唯一深色帶 | — |
| `ink` | `#16333A` | 主要文字 | 12.7:1 |
| `muted` | `#5D6E72` | 次要文字 | 5.3:1 |
| `danger` / `warn` | `#A8332B` / `#8A5410` | 錯誤／警示 | 6.0:1 / 5.6:1 |

禁止：漸層、螢光色、超過一個以上的強調色、純黑 `#000`。

### 字體與字級

- Display／數字：`Figtree`；內文／中文：`Noto Sans TC`
- 字級（`theme.js` 覆寫）：`xs 13px` / `sm 15px` / `base 17px` / `lg 19px` / `xl 22px` / `2xl 26px` / `3xl 31px` / `4xl 38px` / `5xl 46px`
- 中文標題 sentence case、`letter-spacing: -0.01em`、行高 1.2–1.35
- 數字（價格、時數、統計）用 `.num` / `.tabular`（tabular-nums）

### 形狀與動效

- 圓角：卡片 12px、輸入／按鈕 8px、面板 16px；`rounded-full` 僅限頭像、狀態點、數量徽章
- 陰影：帶底色色調的 3 級（`--shadow-1/2/3`），不用純黑陰影
- 動效：180ms `cubic-bezier(.22,.61,.36,1)`，只動 color／background／border／transform(≤2px)；尊重 `prefers-reduced-motion`
- 禁止：bounce、pulse、float、無限迴圈裝飾動畫、scale 放大 hover

---

## 3. 檔案結構

```
care-match/
├── theme.js        # Tailwind 設定（色彩/字體/字級/圓角/陰影）— 唯一來源
├── styles.css      # 設計系統：tokens + base + a11y + 全部元件樣式
├── icons.js        # Heroicons 24/outline（90 個）+ 自製 star/archipelago 等
├── app.js          # 共用函式：toast、會員選單、reveal、購物車、預約
├── data.js         # 模擬資料（照護夥伴、商品、評價、訂單）
├── index.html      # 參考實作（新頁面照它的 head/nav/footer 結構）
├── caregivers.html / caregiver-profile.html / booking.html / dashboard.html
├── profile.html / shop.html / product.html / cart.html / login.html / admin.html
└── legal.html      # 服務條款／隱私權／無障礙聲明
```

每頁 `<head>` 固定順序：

```html
<script src="https://cdn.tailwindcss.com"></script>
<script src="theme.js"></script>
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&family=Noto+Sans+TC:wght@400;500;700;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
```

頁面骨幹（每頁一致）：

```html
<a class="skip-link" href="#main">跳至主要內容</a>
<header class="site-nav"> … 品牌 / nav-links / nav-utils / 手機選單 … </header>
<main id="main"> … </main>
<footer class="site-footer"> … 四欄 + legal … </footer>
```

---

## 4. 元件 API（`styles.css`）

| 用途 | 類別 |
|---|---|
| 版面 | `.wrap` `.wrap--narrow` `.section` `.section--paper/--sand/--white/--night` `.sec-head` `.eyebrow` `.sec-title` `.sec-lead` |
| 導覽 | `.site-nav` `.brand` `.nav-link[aria-current="page"]` `.nav-toggle` `.nav-mobile` `.cart-link` `.user-menu` |
| 按鈕 | `.btn` `.btn--primary/--secondary/--ghost/--clay/--on-dark/--outline-light` `.btn--sm/--lg/--block` `.icon-btn` |
| 卡片 | `.card` `.card--interactive` `.card--pad-lg` `.stat` `.stat__value` `.cg-card` `.prod-card` |
| 標記 | `.badge--verified/--info/--price/--warn/--danger/--neutral/--solid` `.tag` `.chip[aria-pressed]` `.rating` `.price` |
| 圖示 | `<i data-ic="home" data-ic-class="ic-20"></i>`、`.icon-tile` / `.icon-tile--green/--clay/--line` |
| 表單 | `.field` `.label` `.input` `.select` `.textarea` `.hint` `.error-text` `.check` `.qty` |
| 資料 | `.table-wrap` `.table` `.table-num` `.list-row` `.empty` `.skeleton` `.alert--*` |
| 互動 | `.tabs` `.tab[aria-selected]` `.cal` `.cal__day` `.slots` `.slot` `.modal` `.steps` `.step-card` |
| 服務區域 | `.zone-map` `.zone` `.zone__bar` `.cg-row` `.map-grid` `.map-pin` `.hero__map` |

圖示用法：靜態 HTML 用 `<i data-ic="名稱" data-ic-class="ic-20"></i>`；JS 樣板用 `icon('名稱','ic-20')`，插入後呼叫 `renderIcons(container)`。

---

## 5. 可及性要求（每頁必守）

- 對比 ≥ 4.5:1（大字 ≥ 3:1）；已選色票全部通過
- 所有互動元素 ≥ 44×44px；`:focus-visible` 3px 深青藍外框（系統已定義）
- 每頁 skip-link、`aria-current="page"`、section `aria-labelledby`
- 表單：可見 `<label>`、`aria-required`、行內 `.error-text`；不用 `window.alert`
- 圖片要有描述性 `alt`；裝飾元素 `aria-hidden="true"`
- 手機 390px 與桌機 1440px 皆不得出現水平捲動
- 尊重 `prefers-reduced-motion`

### 已知限制

- 月曆（`.cal`）在 390px 下為 7 欄，單格寬度約 41–43px（高度 48px）：寬度受限於七天欄位，
  已符合 WCAG 2.5.8 AA（≥24px）並以加大高度補償。若需 44px 方格，需改為橫向捲動或一次顯示 5 天。
- 頁尾連結、`.btn--sm`、`.chip` 等皆已補到 ≥44px 高。

---

## 6. 群島意象的處理原則

- 保留：品牌名「群島生態系」、區域命名（居家陪伴／日照中心／喘息服務／就醫陪同）、「服務區域分布」的互動概念、網址與電子郵件
- 移除：卡通小島圖形（`.island-*`）、沙灘／草地／樹木、漂浮動畫、波浪分隔線、emoji 島主頭像
- 轉譯：小島 → `.zone` 區域卡（區域名、人數、比例條）；地圖 → `.map-grid` 淡色經緯格線 + `.map-pin` 標記；島主 → `.cg-row` 專業人員列（頭像、年資、評分、服務標籤、價格）

---

## 7. Git 與部署

- 分支：`pro-v2`（改版）／`island-redesign`（島嶼版備份）／`original-design`（更早的綠色版）
- 遠端：`git@github.com:ywc-rhm/care-match.git`
- GitHub Pages：https://ywc-rhm.github.io/care-match/
- 本機驗證：`python3 -m http.server 8765` → http://127.0.0.1:8765/index.html
