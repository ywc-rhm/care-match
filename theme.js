/* =========================================================================
   care-match · theme.js — 設計系統（唯一來源）
   Tailwind Play CDN 設定：色票、字體、字級、圓角、陰影
   專業照護版：冷靜深青藍 + 暖中性色，Swiss 極簡、大字級、高對比
   ========================================================================= */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        /* 主要（深青藍） */
        ocean: '#0F5565',
        'ocean-dark': '#0A3D49',
        'ocean-light': '#4A8A97',
        /* 暖中性底 */
        sand: '#F1EDE6',
        paper: '#FBFAF7',
        line: '#DED9CF',
        /* 次要強調：暖陶土（價格、重點數字） */
        coral: '#A9552A',
        /* 輔助綠（可預約、已認證、成功） */
        island: '#1A6E58',
        'island-light': '#45907A',
        /* 深色區塊（僅頁尾與單一 CTA 帶） */
        night: '#0A2A32',
        'night-light': '#123B45',
        /* 文字 */
        ink: '#16333A',
        muted: '#5D6E72',
        warn: '#8A5410',
        danger: '#A8332B'
      },
      fontFamily: {
        sans: ['Noto Sans TC', 'system-ui', '-apple-system', 'Helvetica Neue', 'sans-serif'],
        display: ['Figtree', 'Noto Sans TC', 'system-ui', 'sans-serif'],
        num: ['Figtree', 'Noto Sans TC', 'system-ui', 'sans-serif']
      },
      /* 銀髮可讀性：基準 17px、行高 1.75，最小字級 13px */
      fontSize: {
        xs: ['0.8125rem', { lineHeight: '1.65' }],
        sm: ['0.9375rem', { lineHeight: '1.7' }],
        base: ['1.0625rem', { lineHeight: '1.75' }],
        lg: ['1.1875rem', { lineHeight: '1.65' }],
        xl: ['1.375rem', { lineHeight: '1.5' }],
        '2xl': ['1.625rem', { lineHeight: '1.35' }],
        '3xl': ['1.9375rem', { lineHeight: '1.3' }],
        '4xl': ['2.375rem', { lineHeight: '1.22' }],
        '5xl': ['2.875rem', { lineHeight: '1.15' }],
        '6xl': ['3.375rem', { lineHeight: '1.1' }]
      },
      /* 收斂圓角：不再使用膠囊／泡泡感（rounded-full 僅保留頭像與狀態點） */
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.375rem',
        md: '0.5rem',
        lg: '0.625rem',
        xl: '0.75rem',
        '2xl': '0.875rem',
        '3xl': '1rem'
      },
      /* 陰影帶底色色調，不用純黑 */
      boxShadow: {
        none: 'none',
        sm: '0 1px 2px 0 rgba(10, 42, 50, 0.06)',
        DEFAULT: '0 1px 3px 0 rgba(10, 42, 50, 0.08), 0 1px 2px -1px rgba(10, 42, 50, 0.06)',
        md: '0 4px 12px -2px rgba(10, 42, 50, 0.10)',
        lg: '0 12px 28px -8px rgba(10, 42, 50, 0.14)',
        xl: '0 24px 48px -16px rgba(10, 42, 50, 0.18)'
      },
      maxWidth: { container: '1200px' },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }
  }
};
