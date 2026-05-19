// ===== 智慧照護Match - 共享函式 =====

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
    if (confirm('請先登入會員，是否前往登入頁？')) {
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

// 顯示通知訊息
function showNotification(message, type = 'success') {
  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-orange-500',
    info: 'bg-blue-500'
  };

  const notification = document.createElement('div');
  notification.className = `fixed top-20 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all transform translate-x-full`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.remove('translate-x-full');
  }, 10);

  setTimeout(() => {
    notification.classList.add('translate-x-full');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// 載入會員頭像（NAV）
function loadUserNav() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  if (currentUser) {
    const userSection = `
      <div class="flex items-center gap-3">
        <div class="relative group">
          <button class="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
            <img src="${currentUser.avatar || 'https://via.placeholder.com/32'}" class="w-8 h-8 rounded-full object-cover">
            <span class="hidden md:inline text-sm font-medium">${currentUser.name}</span>
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border hidden group-hover:block">
            <a href="dashboard.html" class="block px-4 py-2 text-sm hover:bg-gray-50">我的專區</a>
            <a href="profile.html" class="block px-4 py-2 text-sm hover:bg-gray-50">個人檔案</a>
            <hr class="my-1">
            <button onclick="logout()" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">登出</button>
          </div>
        </div>
      </div>
    `;
    // 替換登入按鈕
    const loginBtn = nav.querySelector('a[href="login.html"]');
    if (loginBtn) {
      loginBtn.outerHTML = userSection;
    }
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
});

// 匯出給全域使用
window.getUrlParams = getUrlParams;
window.formatDate = formatDate;
window.formatDateTime = formatDateTime;
window.getWeekday = getWeekday;
window.checkLogin = checkLogin;
window.logout = logout;
window.showNotification = showNotification;
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