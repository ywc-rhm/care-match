// ===== 群島生態系 · 共享函式（專業照護版） =====

// 取得 URL 參數
function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return Object.fromEntries(params.entries());
}

// 格式化日期
function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// 取得星期幾
function getWeekday(dateStr) {
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const d = new Date(dateStr);
  return weekdays[d.getDay()];
}

// 格式化日期時間
function formatDateTime(dateStr) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')} ${getWeekday(dateStr)}`;
}

// 計算日期差異
function daysBetween(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diff = Math.abs(d2 - d1);
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// 檢查是否為今天或未來
function isTodayOrFuture(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  return target >= today;
}

// 檢查登入狀態
function checkLogin() {
  if (!currentUser) {
    if (confirm('此功能需要登入會員，是否前往登入頁？')) {
      window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.href);
    }
    return false;
  }
  return true;
}

// 登出
function logout() {
  if (confirm('確定要登出嗎？')) {
    currentUser = null;
    saveToStorage();
    window.location.href = 'index.html';
  }
}

// ---------------------------------------------------------------- 通知（Toast）
function showNotification(message, type = 'success') {
  const icMap = {
    success: 'check-circle',
    error: 'exclamation-circle',
    warning: 'exclamation-triangle',
    info: 'information-circle'
  };

  let host = document.querySelector('.toast-host');
  if (!host) {
    host = document.createElement('div');
    host.className = 'toast-host';
    host.setAttribute('role', 'status');
    host.setAttribute('aria-live', 'polite');
    document.body.appendChild(host);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  const mark = (typeof window.icon === 'function') ? window.icon(icMap[type] || 'information-circle', 'ic-20') : '';
  toast.innerHTML = `${mark}<span>${message}</span>`;
  host.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('is-in'));
  setTimeout(() => {
    toast.classList.remove('is-in');
    setTimeout(() => toast.remove(), 250);
  }, 3600);
}

// 捲動進場（僅在元素加上 .reveal 時生效）
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.04 });
  els.forEach(el => io.observe(el));
}

// ---------------------------------------------------------------- 會員選單
function bindUserMenu() {
  const btn = document.getElementById('userMenuBtn');
  const root = btn ? btn.closest('.user-menu') : null;
  if (!btn || !root) return;

  const close = () => {
    root.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
  };

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = root.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(open));
  });

  document.addEventListener('click', (e) => {
    if (!root.contains(e.target)) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

// 載入會員頭像（NAV）
function loadUserNav() {
  const nav = document.querySelector('nav') || document.querySelector('.site-nav');
  if (!nav || !currentUser) return;

  const mark = (name, cls) => (typeof window.icon === 'function' ? window.icon(name, cls || 'ic-16') : '');
  const menu = `
    <div class="user-menu">
      <button class="user-menu__btn" type="button" id="userMenuBtn" aria-expanded="false" aria-haspopup="true">
        <img class="avatar avatar--40" src="${currentUser.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'}" alt="">
        <span class="user-menu__name">${currentUser.name}</span>
        ${mark('chevron-down', 'ic-16')}
      </button>
      <div class="user-menu__panel" role="menu">
        <a role="menuitem" href="dashboard.html">${mark('chart-bar')}我的專區</a>
        <a role="menuitem" href="profile.html">${mark('user')}個人檔案</a>
        ${currentUser.role === 'admin' ? `<a role="menuitem" href="admin.html">${mark('cog-6-tooth')}管理後台</a>` : ''}
        <hr class="divider">
        <button type="button" role="menuitem" onclick="logout()">${mark('arrow-left-on-rectangle')}登出</button>
      </div>
    </div>`;

  const loginBtn = nav.querySelector('a[href="login.html"]');
  if (loginBtn) {
    loginBtn.outerHTML = menu;
    bindUserMenu();
  }
}

// 過濾照服員
function filterCaregivers(caregivers, filters) {
  return caregivers.filter(cg => {
    if (filters.type && filters.type !== 'all') {
      if (!cg.services.includes(filters.type)) return false;
    }
    if (filters.region && filters.region !== 'all') {
      if (!cg.location.includes(filters.region)) return false;
    }
    if (filters.minRating) {
      if (cg.rating < filters.minRating) return false;
    }
    if (filters.maxPrice) {
      if (cg.price > filters.maxPrice) return false;
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchName = cg.name.toLowerCase().includes(searchLower);
      const matchLocation = cg.location.toLowerCase().includes(searchLower);
      const matchServices = cg.services.some(s => s.toLowerCase().includes(searchLower));
      if (!matchName && !matchLocation && !matchServices) return false;
    }
    return true;
  });
}

// 過濾商品
function filterProducts(products, filters) {
  return products.filter(p => {
    if (filters.category && filters.category !== 'all') {
      if (p.category !== filters.category) return false;
    }
    if (filters.minPrice) {
      if (p.price < filters.minPrice) return false;
    }
    if (filters.maxPrice) {
      if (p.price > filters.maxPrice) return false;
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (!p.name.toLowerCase().includes(searchLower) && !p.description.toLowerCase().includes(searchLower)) {
        return false;
      }
    }
    return true;
  });
}

// 計算購物車總價
function getCartTotal() {
  return orders.products.reduce((sum, p) => sum + p.price * p.quantity, 0);
}

// 計算購物車總數量
function getCartCount() {
  return orders.products.reduce((sum, p) => sum + p.quantity, 0);
}

// 移除購物車商品
function removeFromCart(productId) {
  orders.products = orders.products.filter(p => p.id !== productId);
  saveToStorage();
  updateCartCount();
}

// 更新購物車商品數量
function updateCartQuantity(productId, change) {
  const item = orders.products.find(p => p.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveToStorage();
    }
    updateCartCount();
  }
}

// 取得照服員預約
function getBookingsForCaregiver(caregiverId) {
  return orders.bookings.filter(b => b.caregiverId === caregiverId);
}

// 取得使用者預約
function getUserBookings() {
  if (!currentUser) return [];
  return orders.bookings.filter(b => b.userId === currentUser.id);
}

// 取得使用者訂單（輔具）
function getUserOrders() {
  if (!currentUser) return [];
  return orders.products; // 示意：實際應有獨立訂單結構
}

// 建立預約
function createBooking(bookingData) {
  const booking = {
    id: Date.now(),
    userId: currentUser?.id || 'guest',
    userName: currentUser?.name || '訪客',
    caregiverId: bookingData.caregiverId,
    caregiverName: bookingData.caregiverName,
    service: bookingData.service,
    date: bookingData.date,
    time: bookingData.time,
    hours: bookingData.hours,
    totalPrice: bookingData.totalPrice,
    notes: bookingData.notes || '',
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  orders.bookings.push(booking);
  saveToStorage();

  return booking;
}

// 取消預約
function cancelBooking(bookingId) {
  const booking = orders.bookings.find(b => b.id === bookingId);
  if (booking) {
    booking.status = 'cancelled';
    saveToStorage();
  }
}

// 導航相關
function navigateTo(page) {
  window.location.href = page;
}

// 頁面載入時初始化
document.addEventListener('DOMContentLoaded', () => {
  loadUserNav();
  updateCartCount();
  initReveal();
});

// 匯出給全域使用
window.getUrlParams = getUrlParams;
window.formatDate = formatDate;
window.formatDateTime = formatDateTime;
window.getWeekday = getWeekday;
window.checkLogin = checkLogin;
window.logout = logout;
window.showNotification = showNotification;
window.initReveal = initReveal;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.getCartTotal = getCartTotal;
window.getCartCount = getCartCount;
window.updateCartCount = updateCartCount;
window.filterCaregivers = filterCaregivers;
window.filterProducts = filterProducts;
window.createBooking = createBooking;
window.cancelBooking = cancelBooking;
window.getUserBookings = getUserBookings;
window.navigateTo = navigateTo;
