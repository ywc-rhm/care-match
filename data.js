// ===== 長照服務媒合平台 - 共享資料 =====

// 照服員資料
const caregivers = [
  {
    id: 1,
    name: '陳雅惠',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop',
    gender: '女',
    age: 42,
    location: '新北市',
    services: ['home', 'respite'],
    serviceNames: ['居家服務', '喘息服務'],
    price: 350,
    rating: 4.9,
    reviews: 127,
    experience: 8,
    certified: true,
    intro: '具備護理師背景，擅長術後照護與慢性病個案管理，待人親切有耐心。',
    availability: {
      weekdays: ['09:00-12:00', '14:00-18:00'],
      weekends: ['10:00-14:00']
    }
  },
  {
    id: 2,
    name: '林志偉',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop',
    gender: '男',
    age: 38,
    location: '台北市',
    services: ['daycare', 'medical'],
    serviceNames: ['日間照顧', '醫療陪同'],
    price: 400,
    rating: 4.8,
    reviews: 89,
    experience: 6,
    certified: true,
    intro: '專長老人陪伴與復健運動指導，持有物理治療師資格，可指導居家復健。',
    availability: {
      weekdays: ['08:00-17:00'],
      weekends: []
    }
  },
  {
    id: 3,
    name: '黃淑芬',
    avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop',
    gender: '女',
    age: 45,
    location: '桃園市',
    services: ['respite', 'home'],
    serviceNames: ['喘息服務', '居家服務'],
    price: 320,
    rating: 4.9,
    reviews: 156,
    experience: 10,
    certified: true,
    intro: '十年以上長照經驗，專精失智症照護與認知訓練，家屬口碑極佳。',
    availability: {
      weekdays: ['09:00-18:00'],
      weekends: ['09:00-12:00']
    }
  },
  {
    id: 4,
    name: '王明華',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&h=200&fit=crop',
    gender: '男',
    age: 50,
    location: '台中市',
    services: ['home', 'daycare', 'respite', 'medical'],
    serviceNames: ['居家服務', '日間照顧', '喘息服務', '醫療陪同'],
    price: 380,
    rating: 5.0,
    reviews: 203,
    experience: 15,
    certified: true,
    intro: '全方位照服員，涵蓋所有長照項目，特別適合複雜照護需求個案。',
    availability: {
      weekdays: ['07:00-19:00'],
      weekends: ['08:00-16:00']
    }
  },
  {
    id: 5,
    name: '李雅琪',
    avatar: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=200&h=200&fit=crop',
    gender: '女',
    age: 35,
    location: '高雄市',
    services: ['home', 'daycare'],
    serviceNames: ['居家服務', '日間照顧'],
    price: 330,
    rating: 4.7,
    reviews: 72,
    experience: 5,
    certified: true,
    intro: '年輕活潑，善於溝通，特別受年長者喜愛，專長日常生活協助與陪伴。',
    availability: {
      weekdays: ['10:00-19:00'],
      weekends: ['10:00-17:00']
    }
  },
  {
    id: 6,
    name: '張美雲',
    avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop',
    gender: '女',
    age: 48,
    location: '台北市',
    services: ['home', 'respite'],
    serviceNames: ['居家服務', '喘息服務'],
    price: 360,
    rating: 4.8,
    reviews: 94,
    experience: 9,
    certified: true,
    intro: '原為醫院護理師，專精末期照護與安寧緩和醫療，家屬高度信任。',
    availability: {
      weekdays: ['08:00-16:00'],
      weekends: []
    }
  }
];

// 輔具商品資料
const products = [
  {
    id: 1,
    name: '輕量鋁合金輪椅',
    category: 'mobility',
    categoryName: '行動輔具',
    price: 5800,
    originalPrice: 6800,
    image: 'https://images.unsplash.com/photo-1576697193315-e8468db73e9e?w=400&h=300&fit=crop',
    stock: 15,
    sold: 89,
    rating: 4.8,
    description: '鋁合金骨架僅重9公斤，雙手把煞車設計，適用醫院、家庭、戶外。',
    features: ['車重9kg', '摺疊設計', '前後煞車', '透氣座墊', '固定扶手']
  },
  {
    id: 2,
    name: '四腳折疊式助行器',
    category: 'mobility',
    categoryName: '行動輔具',
    price: 1680,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=400&h=300&fit=crop',
    stock: 28,
    sold: 156,
    rating: 4.6,
    description: '鋁合金材質，穩固四腳設計，可調整高度，摺疊收納不佔空間。',
    features: ['可調高度', '防滑腳墊', '摺疊收納', '扶手泡棉', '承重150kg']
  },
  {
    id: 3,
    name: '浴室安全扶手組',
    category: 'bathroom',
    categoryName: '衛浴輔具',
    price: 2280,
    originalPrice: 2680,
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop',
    stock: 20,
    sold: 67,
    rating: 4.9,
    description: '不鏽鋼材質，吸盤式安裝免施工，適用馬桶、浴缸、淋浴間。',
    features: ['免施工安裝', '304不鏽鋼', '吸盤固定', '多場景適用', '承重200kg']
  },
  {
    id: 4,
    name: 'LED感應夜燈（2入）',
    category: 'safety',
    categoryName: '居家安全',
    price: 590,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&h=300&fit=crop',
    stock: 50,
    sold: 234,
    rating: 4.7,
    description: '人體紅外線感應，黑暗中自動亮起，臥室、走廊、浴室必備。',
    features: ['紅外線感應', '180度範圍', 'LED節能', '磁吸式安裝', 'USB充電']
  },
  {
    id: 5,
    name: '起身扶手（床邊用）',
    category: 'safety',
    categoryName: '居家安全',
    price: 3280,
    originalPrice: 3880,
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=300&fit=crop',
    stock: 12,
    sold: 45,
    rating: 4.8,
    description: '床邊起身輔助扶手，適用術後復健、年長者起身，厚重底座穩固安全。',
    features: ['厚重底座', 'PU扶手', '床墊下置入', '高低可調', '防滑墊']
  },
  {
    id: 6,
    name: '便盆椅（附輪）',
    category: 'bathroom',
    categoryName: '衛浴輔具',
    price: 2450,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=400&h=300&fit=crop',
    stock: 18,
    sold: 78,
    rating: 4.5,
    description: '鋁合金骨架，附輪設計方便推移，可當馬桶椅或洗澡椅使用。',
    features: ['附輪設計', '可拆卸便盆', '防水椅墊', '腳踏板', '剎車固定']
  },
  {
    id: 7,
    name: '記憶棉護腰枕',
    category: 'comfort',
    categoryName: '舒壓輔具',
    price: 890,
    originalPrice: 1200,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
    stock: 35,
    sold: 189,
    rating: 4.6,
    description: '慢回彈記憶棉，支撐腰部舒緩疲勞，適用輪椅、汽車、辦公椅。',
    features: ['記憶棉填充', '可調綁帶', '透氣網布', '水洗外罩', '人體工學']
  },
  {
    id: 8,
    name: '攜帶式氧氣偵測器',
    category: 'medical',
    categoryName: '健康監測',
    price: 1680,
    originalPrice: 1980,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
    stock: 8,
    sold: 34,
    rating: 4.9,
    description: '指尖式血氧機，小巧輕便，快速測量血氧與脈搏，附語音播報。',
    features: ['1秒測量', 'OLED顯示', '語音播報', '自動關機', '收納盒']
  }
];

// 評價資料
const reviews = [
  { id: 1, caregiverId: 1, userName: '林先生', rating: 5, date: '2026-04-15', content: '陳小姐非常專業，媽媽術後照護做得很好，很細心也很耐心。' },
  { id: 2, caregiverId: 1, userName: '黃女士', rating: 5, date: '2026-04-10', content: '推薦！家父臥床照護經驗豐富，溝通良好，相處融洽。' },
  { id: 3, caregiverId: 3, userName: '張太太', rating: 5, date: '2026-04-18', content: '淑芬對失智症的照顧真的很專業，父親脾氣變穩定了許多。' },
  { id: 4, caregiverId: 4, userName: '王先生', rating: 5, date: '2026-04-20', content: '王大哥經驗豐富，處理父親的鼻胃管照護很熟練，非常放心。' },
  { id: 5, caregiverId: 2, userName: '李女士', rating: 4, date: '2026-04-12', content: '林先生復健指導很專業，帶媽媽做運動很有耐心。' },
];

// 訂單資料
const orders = {
  bookings: [],
  products: []
};

// 當前登入使用者
let currentUser = null;

// 讀取 LocalStorage
function loadFromStorage() {
  try {
    const stored = localStorage.getItem('careMatchData');
    if (stored) {
      const data = JSON.parse(stored);
      if (data.orders) {
        orders.bookings = data.orders.bookings || [];
        orders.products = data.orders.products || [];
      }
      if (data.currentUser) {
        currentUser = data.currentUser;
      }
    }
  } catch (e) {
    console.log('初始化 LocalStorage');
  }
}

// 儲存 LocalStorage
function saveToStorage() {
  localStorage.setItem('careMatchData', JSON.stringify({
    orders: orders,
    currentUser: currentUser
  }));
}

// 評估星星顯示
function getStarRating(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

// 格式化價格
function formatPrice(price) {
  return `$${price.toLocaleString()}`;
}

// 建立照服員卡片 HTML
function createCaregiverCard(cg) {
  const servicesBadge = cg.services.map(s => 
    `<span class="bg-green-100 text-primary text-xs px-2 py-0.5 rounded">${s}</span>`
  ).join('');

  return `
    <div class="bg-white rounded-xl shadow-sm overflow-hidden card-hover">
      <div class="p-6">
        <div class="flex items-start gap-4">
          <img src="${cg.avatar}" alt="${cg.name}" class="w-20 h-20 rounded-full object-cover">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <h3 class="font-bold text-lg">${cg.name}</h3>
              ${cg.certified ? '<span class="bg-green-500 text-white text-xs px-2 py-0.5 rounded">已認證</span>' : ''}
            </div>
            <p class="text-gray-500 text-sm mb-2">${cg.location}｜${cg.age}歲｜${cg.gender}</p>
            <div class="flex items-center gap-1 mb-2">
              <span class="star-rating text-sm">${getStarRating(cg.rating)}</span>
              <span class="text-sm font-medium text-gray-700">${cg.rating}</span>
              <span class="text-sm text-gray-400">(${cg.reviews}則評價)</span>
            </div>
          </div>
        </div>
        <p class="text-gray-600 text-sm mt-4 line-clamp-2">${cg.intro}</p>
        <div class="flex flex-wrap gap-1 mt-3 mb-4">
          ${servicesBadge}
        </div>
        <div class="flex items-center justify-between pt-4 border-t">
          <div>
            <span class="text-2xl font-bold text-accent">${formatPrice(cg.price)}</span>
            <span class="text-gray-400 text-sm">/小時</span>
          </div>
          <div class="flex gap-2">
            <a href="caregiver-profile.html?id=${cg.id}" class="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-green-50 transition-colors text-sm font-medium">
              查看詳情
            </a>
            <a href="booking.html?caregiverId=${cg.id}" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
              立即預約
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 建立商品卡片 HTML
function createProductCard(prod, showAddToCart = true) {
  const discount = prod.originalPrice 
    ? Math.round((1 - prod.price / prod.originalPrice) * 100) 
    : null;

  return `
    <div class="bg-white rounded-xl shadow-sm overflow-hidden card-hover">
      <div class="relative">
        <img src="${prod.image}" alt="${prod.name}" class="w-full h-48 object-cover">
        ${discount ? `<span class="absolute top-2 right-2 bg-accent text-white text-xs px-2 py-1 rounded">-${discount}%</span>` : ''}
      </div>
      <div class="p-4">
        <span class="text-xs text-primary bg-green-50 px-2 py-0.5 rounded">${prod.categoryName}</span>
        <h3 class="font-bold mt-2 mb-1 line-clamp-2">${prod.name}</h3>
        <div class="flex items-center gap-1 mb-2">
          <span class="star-rating text-sm">★</span>
          <span class="text-sm text-gray-700">${prod.rating}</span>
          <span class="text-sm text-gray-400">已售${prod.sold}</span>
        </div>
        <div class="flex items-center gap-2 mb-3">
          <span class="text-xl font-bold text-accent">${formatPrice(prod.price)}</span>
          ${prod.originalPrice ? `<span class="text-sm text-gray-400 line-through">${formatPrice(prod.originalPrice)}</span>` : ''}
        </div>
        ${showAddToCart ? `
          <button onclick="addToCart(${prod.id})" class="w-full btn-secondary text-sm py-2 flex items-center justify-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            加入購物車
          </button>
        ` : `
          <a href="product.html?id=${prod.id}" class="w-full btn-secondary text-sm py-2 text-center block">查看詳情</a>
        `}
      </div>
    </div>
  `;
}

// 加入購物車
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = orders.products.find(p => p.id === productId);
  if (existing) {
    existing.quantity++;
  } else {
    orders.products.push({ ...product, quantity: 1 });
  }

  saveToStorage();
  updateCartCount();
  
  // 顯示提示
  const btn = event.target.closest('button');
  const originalText = btn.innerHTML;
  btn.innerHTML = '✓ 已加入';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.disabled = false;
  }, 1500);
}

// 更新購物車數量顯示
function updateCartCount() {
  const count = orders.products.reduce((sum, p) => sum + p.quantity, 0);
  const badge = document.getElementById('cartCount');
  if (badge) {
    if (count > 0) {
      badge.textContent = count;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }
}

// 管理員帳號
const adminAccount = {
  email: 'yth_Kj2mdU@alkmail.com',
  password: 'sekM0O!tn<eg3k(EG*',
  name: '系統管理員',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
};

// 驗證管理員登入
function validateAdmin(email, password) {
  if (email === adminAccount.email && password === adminAccount.password) {
    return { ...adminAccount };
  }
  return null;
}

// 初始化
loadFromStorage();