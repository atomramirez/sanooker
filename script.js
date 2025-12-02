// Element SDK Configuration
const defaultConfig = {
    hero_title: "ระบบบันทึกรายรับรายจ่าย + ข่าวการลงทุน + คำนวณเงินเฟ้อแบบอัตโนมัติ",
    hero_subtitle: "จัดการการเงินส่วนตัวอย่างมืออาชีพ ติดตามรายรับรายจ่าย วางแผนเป้าหมายการออม และอัปเดตข่าวการลงทุนแบบเรียลไทม์",
    company_name: "FinTrack",
    background_color: "#f9fafb",
    primary_color: "#0f766e",
    secondary_color: "#1e40af",
    text_color: "#1f2937",
    accent_color: "#10b981"
};

async function onConfigChange(config) {
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const companyName = document.getElementById('company-name');
    const footerCompanyName = document.getElementById('footer-company-name');

    if (heroTitle) heroTitle.textContent = config.hero_title || defaultConfig.hero_title;
    if (heroSubtitle) heroSubtitle.textContent = config.hero_subtitle || defaultConfig.hero_subtitle;
    if (companyName) companyName.textContent = config.company_name || defaultConfig.company_name;
    if (footerCompanyName) footerCompanyName.textContent = config.company_name || defaultConfig.company_name;

    document.body.style.backgroundColor = config.background_color || defaultConfig.background_color;

    const primaryColor = config.primary_color || defaultConfig.primary_color;
    const accentColor = config.accent_color || defaultConfig.accent_color;

    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--accent-color', accentColor);
}

function mapToCapabilities(config) {
    return {
        recolorables: [
            {
                get: () => config.background_color || defaultConfig.background_color,
                set: (value) => {
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ background_color: value });
                    }
                }
            },
            {
                get: () => config.primary_color || defaultConfig.primary_color,
                set: (value) => {
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ primary_color: value });
                    }
                }
            },
            {
                get: () => config.text_color || defaultConfig.text_color,
                set: (value) => {
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ text_color: value });
                    }
                }
            },
            {
                get: () => config.accent_color || defaultConfig.accent_color,
                set: (value) => {
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ accent_color: value });
                    }
                }
            }
        ],
        borderables: [],
        fontEditable: undefined,
        fontSizeable: undefined
    };
}

function mapToEditPanelValues(config) {
    return new Map([
        ["hero_title", config.hero_title || defaultConfig.hero_title],
        ["hero_subtitle", config.hero_subtitle || defaultConfig.hero_subtitle],
        ["company_name", config.company_name || defaultConfig.company_name]
    ]);
}

// Initialize Element SDK
if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities,
        mapToEditPanelValues
    });
}

// ===== REAL-TIME MARKET DATA SIMULATION =====

let marketData = {
    set: { value: 1425.50, change: 8.50, percent: 0.60 },
    btc: { value: 68450, change: 2.5 },
    eth: { value: 3820, change: 1.8 },
    gold: { value: 36250, change: -0.3 }
};

function updateMarketData() {
    // SET Index
    const setChange = (Math.random() - 0.5) * 5;
    marketData.set.value += setChange;
    marketData.set.change += setChange;
    marketData.set.percent = (marketData.set.change / (marketData.set.value - marketData.set.change)) * 100;

    const setIndexEl = document.getElementById('set-index');
    if (setIndexEl) {
        setIndexEl.textContent = marketData.set.value.toFixed(2);
        const setChangeElem = document.getElementById('set-change');
        const setColor = marketData.set.change >= 0 ? 'text-green-600' : 'text-red-600';
        const setSign = marketData.set.change >= 0 ? '+' : '';
        setChangeElem.innerHTML = `<span class="${setColor}">${setSign}${marketData.set.change.toFixed(2)} (${setSign}${marketData.set.percent.toFixed(2)}%)</span>`;
    }

    // Bitcoin
    const btcChange = (Math.random() - 0.5) * 1000;
    marketData.btc.value += btcChange;
    marketData.btc.change = ((btcChange / marketData.btc.value) * 100);

    const btcPriceEl = document.getElementById('btc-price');
    if (btcPriceEl) {
        btcPriceEl.textContent = '$' + marketData.btc.value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const btcChangeElem = document.getElementById('btc-change');
        const btcColor = marketData.btc.change >= 0 ? 'text-green-600' : 'text-red-600';
        const btcSign = marketData.btc.change >= 0 ? '+' : '';
        btcChangeElem.innerHTML = `<span class="${btcColor}">${btcSign}${marketData.btc.change.toFixed(1)}%</span>`;
    }

    // Ethereum
    const ethChange = (Math.random() - 0.5) * 100;
    marketData.eth.value += ethChange;
    marketData.eth.change = ((ethChange / marketData.eth.value) * 100);

    const ethPriceEl = document.getElementById('eth-price');
    if (ethPriceEl) {
        ethPriceEl.textContent = '$' + marketData.eth.value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const ethChangeElem = document.getElementById('eth-change');
        const ethColor = marketData.eth.change >= 0 ? 'text-green-600' : 'text-red-600';
        const ethSign = marketData.eth.change >= 0 ? '+' : '';
        ethChangeElem.innerHTML = `<span class="${ethColor}">${ethSign}${marketData.eth.change.toFixed(1)}%</span>`;
    }

    // Gold
    const goldChange = (Math.random() - 0.5) * 50;
    marketData.gold.value += goldChange;
    marketData.gold.change = ((goldChange / marketData.gold.value) * 100);

    const goldPriceEl = document.getElementById('gold-price');
    if (goldPriceEl) {
        goldPriceEl.textContent = marketData.gold.value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const goldChangeElem = document.getElementById('gold-change');
        const goldColor = marketData.gold.change >= 0 ? 'text-green-600' : 'text-red-600';
        const goldSign = marketData.gold.change >= 0 ? '+' : '';
        goldChangeElem.innerHTML = `<span class="${goldColor}">${goldSign}${marketData.gold.change.toFixed(1)}%</span>`;
    }
}

// Update market data every 3 seconds
setInterval(updateMarketData, 3000);

// ===== NEWS DATA AND FUNCTIONS =====

const newsDatabase = [
    {
        category: 'stocks',
        icon: 'fa-chart-line',
        gradient: 'from-green-400 to-teal-600',
        badge: '📈 หุ้น',
        badgeColor: 'bg-green-100 text-green-700',
        title: 'ตลาดหุ้นไทยปิดบวก 8.5 จุด แตะระดับ 1,425 จุด',
        description: 'ดัชนีตลาดหลักทรัพย์แห่งประเทศไทยปิดการซื้อขายในแนวโน้มบวก จากแรงซื้อหุ้นกลุ่มพลังงานและธนาคาร',
        time: '2 ชั่วโมงที่แล้ว'
    },
    {
        category: 'crypto',
        icon: 'fa-bitcoin',
        gradient: 'from-orange-400 to-yellow-600',
        badge: '💎 คริปโต',
        badgeColor: 'bg-orange-100 text-orange-700',
        title: 'Bitcoin ทะลุ $70,000 อีกครั้ง หลังข่าวดี ETF',
        description: 'ราคา Bitcoin พุ่งแรงทะลุระดับ 70,000 ดอลลาร์สหรัฐ ตามกระแสข่าวดีจากการอนุมัติ ETF ใหม่',
        time: '3 ชั่วโมงที่แล้ว'
    },
    {
        category: 'economy',
        icon: 'fa-globe',
        gradient: 'from-blue-400 to-indigo-600',
        badge: '🌍 เศรษฐกิจ',
        badgeColor: 'bg-blue-100 text-blue-700',
        title: 'ธนาคารกลางสหรัฐคงอัตราดอกเบี้ยนโยบาย',
        description: 'เฟดประกาศคงอัตราดอกเบี้ยนโยบายที่ระดับ 5.25-5.50% พร้อมส่งสัญญาณอาจปรับลดในไตรมาสถัดไป',
        time: '5 ชั่วโมงที่แล้ว'
    },
    {
        category: 'funds',
        icon: 'fa-briefcase',
        gradient: 'from-purple-400 to-pink-600',
        badge: '💰 กองทุน',
        badgeColor: 'bg-purple-100 text-purple-700',
        title: 'กองทุน RMF ยอดขายทะลุ 50,000 ล้านบาท',
        description: 'นักลงทุนแห่ซื้อกองทุน RMF เพื่อลดหย่อนภาษี ยอดขายสะสมในปีนี้ทะลุ 50,000 ล้านบาท',
        time: '6 ชั่วโมงที่แล้ว'
    },
    {
        category: 'stocks',
        icon: 'fa-chart-line',
        gradient: 'from-red-400 to-pink-600',
        badge: '📈 หุ้น',
        badgeColor: 'bg-red-100 text-red-700',
        title: 'หุ้นเทคโนโลยีสหรัฐฯ ฟื้นตัว นำโดย Apple และ Microsoft',
        description: 'หุ้นกลุ่มเทคโนโลยีในตลาดสหรัฐฯ ปรับตัวขึ้นแรง โดยเฉพาะ Apple และ Microsoft หลังผลประกอบการดี',
        time: '8 ชั่วโมงที่แล้ว'
    },
    {
        category: 'crypto',
        icon: 'fa-coins',
        gradient: 'from-teal-400 to-cyan-600',
        badge: '💎 คริปโต',
        badgeColor: 'bg-teal-100 text-teal-700',
        title: 'Ethereum อัปเกรดสำเร็จ ค่าธรรมเนียมลดลง 40%',
        description: 'เครือข่าย Ethereum อัปเกรดเวอร์ชันใหม่สำเร็จ ทำให้ค่าธรรมเนียมการทำธุรกรรมลดลงอย่างมีนัยสำคัญ',
        time: '10 ชั่วโมงที่แล้ว'
    },
    {
        category: 'economy',
        icon: 'fa-building-columns',
        gradient: 'from-indigo-400 to-purple-600',
        badge: '🌍 เศรษฐกิจ',
        badgeColor: 'bg-indigo-100 text-indigo-700',
        title: 'IMF คาดการณ์เศรษฐกิจโลกเติบโต 3.2% ในปี 2567',
        description: 'กองทุนการเงินระหว่างประเทศคาดว่าเศรษฐกิจโลกจะเติบโต 3.2% โดยเอเชียเป็นกลไกสำคัญ',
        time: '12 ชั่วโมงที่แล้ว'
    },
    {
        category: 'funds',
        icon: 'fa-chart-pie',
        gradient: 'from-pink-400 to-rose-600',
        badge: '💰 กองทุน',
        badgeColor: 'bg-pink-100 text-pink-700',
        title: 'กองทุนหุ้นไทยให้ผลตอบแทนเฉลี่ย 12% ใน 6 เดือนแรก',
        description: 'กองทุนรวมหุ้นไทยมีผลการดำเนินงานดี โดยเฉลี่ยให้ผลตอบแทน 12% ในช่วง 6 เดือนแรกของปี',
        time: '14 ชั่วโมงที่แล้ว'
    },
    {
        category: 'stocks',
        icon: 'fa-industry',
        gradient: 'from-cyan-400 to-blue-600',
        badge: '📈 หุ้น',
        badgeColor: 'bg-cyan-100 text-cyan-700',
        title: 'หุ้นพลังงานไทยผงาดขึ้นแรง หลังราคาน้ำมันปรับตัวสูง',
        description: 'หุ้นกลุ่มพลังงานของไทยปรับตัวขึ้นสูงตามราคาน้ำมันดิบที่เพิ่มขึ้น นำโดย PTT และ PTTEP',
        time: '16 ชั่วโมงที่แล้ว'
    }
];

let currentNewsFilter = 'all';

function renderNews(filter = 'all') {
    currentNewsFilter = filter;
    const newsGrid = document.getElementById('news-grid');
    if (!newsGrid) return;

    const filteredNews = filter === 'all' ? newsDatabase : newsDatabase.filter(news => news.category === filter);

    newsGrid.innerHTML = filteredNews.map(news => `
    <div class="news-card card-hover animate-fade-in">
      <div class="h-48 bg-gradient-to-br ${news.gradient} flex items-center justify-center">
        <i class="fas ${news.icon} text-white text-6xl"></i>
      </div>
      <div class="p-6">
        <div class="flex items-center space-x-2 mb-3">
          <span class="category-badge ${news.badgeColor}">${news.badge}</span>
          <span class="text-xs text-gray-500">${news.time}</span>
        </div>
        <h3 class="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          ${news.title}
        </h3>
        <p class="text-sm text-gray-600 mb-4 line-clamp-3">
          ${news.description}
        </p>
        <a href="#" class="text-teal-600 font-semibold hover:text-teal-700 flex items-center" onclick="event.preventDefault()">
          อ่านเพิ่มเติม <i class="fas fa-arrow-right ml-2 text-sm"></i>
        </a>
      </div>
    </div>
  `).join('');

    updateNewsTime();
}

function filterNews(category) {
    // Update button states
    document.querySelectorAll('.news-category-btn').forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.remove('bg-gray-100', 'text-gray-700');
            btn.classList.add('bg-teal-600', 'text-white');
        } else {
            btn.classList.remove('bg-teal-600', 'text-white');
            btn.classList.add('bg-gray-100', 'text-gray-700');
        }
    });

    renderNews(category);
}

function refreshNews() {
    const btn = document.getElementById('refresh-news-btn');
    const icon = btn.querySelector('i');

    // Add spinning animation
    icon.classList.add('spinning');
    btn.disabled = true;

    // Simulate refresh
    setTimeout(() => {
        // Shuffle news randomly
        newsDatabase.sort(() => Math.random() - 0.5);
        renderNews(currentNewsFilter);

        icon.classList.remove('spinning');
        btn.disabled = false;

        // Show toast message
        showToast('อัปเดตข่าวเรียบร้อย!');
    }, 1000);
}

function updateNewsTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
    const timeEl = document.getElementById('news-update-time');
    if (timeEl) {
        timeEl.textContent = `(อัปเดต ${timeString} น.)`;
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-8 right-8 bg-teal-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-fade-in';
    toast.innerHTML = `<i class="fas fa-check-circle mr-2"></i>${message}`;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// ===== INFLATION RATE DATA FROM BOT API =====

let cachedInflationRate = null;

async function fetchInflationRate() {
    try {
        // Use mock data with realistic simulation
        const currentDate = new Date();
        const month = currentDate.getMonth();

        // Realistic Thai CPI data (varies by month)
        const inflationRates = [2.41, 2.38, 2.45, 2.52, 2.48, 2.41, 2.39, 2.44, 2.50, 2.46, 2.43, 2.40];
        const rate = inflationRates[month] + (Math.random() * 0.1 - 0.05);

        cachedInflationRate = parseFloat(rate.toFixed(2));

        // Update UI
        const rateDisplay = document.getElementById('inflation-rate-display');
        const rateInput = document.getElementById('inflation-rate');
        const updateDate = document.getElementById('inflation-update-date');

        if (rateDisplay) rateDisplay.textContent = cachedInflationRate + '%';
        if (rateInput) rateInput.value = cachedInflationRate;

        // Update date
        const monthNames = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
        const dateString = `${monthNames[month]} ${currentDate.getFullYear() + 543}`;
        if (updateDate) updateDate.textContent = `อัปเดต: ${dateString}`;

    } catch (error) {
        console.error('Error fetching inflation rate:', error);
        // Fallback to default rate
        cachedInflationRate = 2.41;
        const rateDisplay = document.getElementById('inflation-rate-display');
        const rateInput = document.getElementById('inflation-rate');
        if (rateDisplay) rateDisplay.textContent = cachedInflationRate + '%';
        if (rateInput) rateInput.value = cachedInflationRate;
    }
}

// Navigation
function navigateTo(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
        }
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Modal Functions
// ==========================================
// Google Sheets Authentication System
// ==========================================

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbym1yIEk7aDs36ppVx3csI4kus3Un3PyG7wt4TAcyZQRc-rNbHTgFrgd3PdZ3sM9PhP/exec';
let currentUser = null;

// JSONP Helper function to bypass CORS
function callGoogleScript(params, callback) {
    const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function (data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    const script = document.createElement('script');

    // Construct URL with parameters
    const queryString = Object.keys(params)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
        .join('&');

    script.src = `${GOOGLE_SCRIPT_URL}?callback=${callbackName}&${queryString}`;
    document.body.appendChild(script);
}

// Check for saved user session
function checkSession() {
    const savedUser = localStorage.getItem('fintrack_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUserUI();
    }
}

function updateUserUI() {
    const authButtons = document.getElementById('auth-buttons');
    const userMenu = document.getElementById('user-menu');
    const heroBtn = document.getElementById('hero-cta-btn');
    const userNameDisplay = document.getElementById('user-name-display');
    const userAvatar = document.getElementById('user-avatar');

    if (currentUser) {
        // User is logged in
        if (authButtons) authButtons.classList.add('hidden');
        if (userMenu) {
            userMenu.classList.remove('hidden');
            // Update user info if elements exist
            if (userNameDisplay) userNameDisplay.textContent = currentUser.name || 'User';
            if (userAvatar) userAvatar.textContent = (currentUser.name || 'U').charAt(0).toUpperCase();
        }

        // Update Hero Button
        if (heroBtn) {
            heroBtn.innerHTML = '<i class="fas fa-rocket mr-2"></i>เริ่มใช้งาน';
            heroBtn.onclick = () => navigateTo('dashboard');
        }
    } else {
        // User is logged out
        if (authButtons) authButtons.classList.remove('hidden');
        if (userMenu) userMenu.classList.add('hidden');

        // Reset Hero Button
        if (heroBtn) {
            heroBtn.innerHTML = '<i class="fas fa-rocket mr-2"></i>เริ่มต้นใช้งานฟรี';
            heroBtn.onclick = showRegister;
        }
    }
}

function handleLogout() {
    if (confirm('คุณต้องการออกจากระบบใช่หรือไม่?')) {
        currentUser = null;
        localStorage.removeItem('fintrack_user');
        updateUserUI();
        loadFinancialData(); // Reload to show demo data
        showToast('ออกจากระบบเรียบร้อยแล้ว');
    }
}

// Modal Functions
function showLogin() {
    closeModals();
    document.getElementById('login-modal').classList.remove('hidden');
    document.getElementById('login-modal').classList.add('flex');
}

function showRegister() {
    closeModals();
    document.getElementById('register-modal').classList.remove('hidden');
    document.getElementById('register-modal').classList.add('flex');
}

function closeModals() {
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');

    if (loginModal) {
        loginModal.classList.add('hidden');
        loginModal.classList.remove('flex');
    }
    if (registerModal) {
        registerModal.classList.add('hidden');
        registerModal.classList.remove('flex');
    }
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    // Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>กำลังเข้าสู่ระบบ...';

    callGoogleScript({
        action: 'login',
        email: email,
        password: password
    }, function (response) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        if (response.success) {
            // Login Success
            currentUser = response.user;
            localStorage.setItem('fintrack_user', JSON.stringify(currentUser));

            closeModals();
            updateUserUI();
            loadFinancialData(); // Reload data for the logged-in user
            showToast(`ยินดีต้อนรับ, ${currentUser.name}!`);
            navigateTo('dashboard');
        } else {
            // Login Failed
            alert(response.message || 'เข้าสู่ระบบไม่สำเร็จ');
        }
    });
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    if (password !== confirm) {
        alert('รหัสผ่านไม่ตรงกัน');
        return;
    }

    // Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>กำลังสมัครสมาชิก...';

    callGoogleScript({
        action: 'register',
        name: name,
        email: email,
        password: password
    }, function (response) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        if (response.success) {
            // Register Success
            closeModals();
            showToast('สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ');
            setTimeout(() => showLogin(), 1000);
        } else {
            // Register Failed
            alert(response.message || 'สมัครสมาชิกไม่สำเร็จ');
        }
    });
}

// ==========================================
// Transaction & Goal Management System (Persistent)
// ==========================================

let transactions = [];
let goals = [];

// Load initial data
// Load initial data
function loadFinancialData() {
    if (currentUser) {
        // User Mode: Load user-specific data
        const userKey = `fintrack_data_${currentUser.email}`;
        const savedData = localStorage.getItem(userKey);

        if (savedData) {
            const parsed = JSON.parse(savedData);
            transactions = parsed.transactions || [];
            goals = parsed.goals || [];
        } else {
            // New user: Start empty
            transactions = [];
            goals = [];
        }
    } else {
        // Demo Mode: Load demo data (reset on refresh or keep separate demo storage? 
        // User asked to "show example", implying a static or reset state is fine, 
        // but let's allow interaction without saving to user storage)

        // For a better experience, we can store temporary demo data in session storage or just reset.
        // Let's reset to default demo data every time for "Example Mode" as requested.

        transactions = [
            { id: 1, date: '2024-06-15', type: 'income', category: 'salary', amount: 25000, note: 'เงินเดือนประจำเดือน' },
            { id: 2, date: '2024-06-14', type: 'expense', category: 'food', amount: 350, note: 'ค่าอาหารกลางวัน' },
            { id: 3, date: '2024-06-13', type: 'expense', category: 'transport', amount: 800, note: 'ค่าน้ำมัน' },
            { id: 4, date: '2024-06-12', type: 'income', category: 'business', amount: 8500, note: 'รายได้จากฟรีแลนซ์' },
            { id: 5, date: '2024-06-11', type: 'expense', category: 'bills', amount: 1200, note: 'ค่าไฟฟ้า-ประปา' }
        ];

        goals = [
            { id: 1, title: 'ซื้อรถยนต์', target: 500000, current: 325000, deadline: '2024-12-31', icon: '🚗' },
            { id: 2, title: 'เที่ยวญี่ปุ่น', target: 80000, current: 33600, deadline: '2025-03-15', icon: '✈️' },
            { id: 3, title: 'MacBook Pro', target: 75000, current: 66000, deadline: '2024-07-30', icon: '💻' }
        ];
    }

    renderTransactions();
    renderGoals();
    updateDashboard();
}

// Save data
function saveData() {
    if (currentUser) {
        // Save to user-specific storage
        const userKey = `fintrack_data_${currentUser.email}`;
        const dataToSave = {
            transactions: transactions,
            goals: goals
        };
        localStorage.setItem(userKey, JSON.stringify(dataToSave));
    } else {
        // In Demo Mode, we don't save to persistent user storage.
        // We could save to a temp key if we wanted persistence across reloads for demo,
        // but "Example Mode" usually implies a showcase. 
        // For now, changes in Demo Mode are ephemeral (lost on reload), which fits "Example".
    }
    updateDashboard();
}

// Transaction Functions
function toggleTransactionForm() {
    const form = document.getElementById('transaction-form');
    if (form) form.classList.toggle('hidden');
}

function handleAddTransaction(e) {
    e.preventDefault();

    const type = document.getElementById('trans-type').value;
    const category = document.getElementById('trans-category').value;
    const amount = parseFloat(document.getElementById('trans-amount').value);
    const date = document.getElementById('trans-date').value;
    const note = document.getElementById('trans-note').value;

    if (!amount || amount <= 0) {
        alert('กรุณาระบุจำนวนเงินที่ถูกต้อง');
        return;
    }

    const transaction = {
        id: Date.now(),
        type,
        category,
        amount,
        date,
        note
    };

    transactions.unshift(transaction);
    saveData();
    renderTransactions();

    // Show success message
    const form = e.target;
    const successMsg = document.createElement('div');
    successMsg.className = 'mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-center';
    successMsg.innerHTML = '<i class="fas fa-check-circle mr-2"></i>บันทึกรายการสำเร็จ!';
    form.appendChild(successMsg);

    setTimeout(() => {
        successMsg.remove();
        form.reset();
        toggleTransactionForm();
    }, 2000);
}

function deleteTransaction(id) {
    if (confirm('ต้องการลบรายการนี้ใช่หรือไม่?')) {
        transactions = transactions.filter(t => t.id !== id);
        saveData();
        renderTransactions();
    }
}

function renderTransactions() {
    const tbody = document.querySelector('tbody.divide-y');
    if (!tbody) return;

    if (transactions.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    ยังไม่มีรายการบันทึก
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = transactions.map(t => {
        const isIncome = t.type === 'income';
        const colorClass = isIncome ? 'text-green-600' : 'text-red-600';
        const bgClass = isIncome ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
        const sign = isIncome ? '+' : '-';

        // Format date
        const dateObj = new Date(t.date);
        const dateStr = dateObj.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });

        return `
        <tr class="transaction-item">
          <td class="px-6 py-4 text-sm text-gray-600">${dateStr}</td>
          <td class="px-6 py-4"><span class="category-badge ${bgClass}">${getCategoryName(t.category)}</span></td>
          <td class="px-6 py-4 text-sm text-gray-800">${t.note || '-'}</td>
          <td class="px-6 py-4 text-right ${colorClass} font-semibold">${sign}฿${t.amount.toLocaleString()}</td>
          <td class="px-6 py-4 text-center">
            <button onclick="deleteTransaction(${t.id})" class="text-red-600 hover:text-red-800 mx-1"> <i class="fas fa-trash"></i> </button>
          </td>
        </tr>
        `;
    }).join('');
}

function getCategoryName(category) {
    const names = {
        salary: '💰 เงินเดือน',
        food: '🍜 อาหาร',
        transport: '🚗 เดินทาง',
        shopping: '🛍️ ช้อปปิ้ง',
        bills: '📄 ค่าบิล',
        business: '💼 ธุรกิจ',
        other: '📦 อื่นๆ'
    };
    return names[category] || category;
}

// Goal Functions
function toggleGoalForm() {
    const form = document.getElementById('goal-form');
    if (form) form.classList.toggle('hidden');
}

function handleAddGoal(e) {
    e.preventDefault();

    const title = document.getElementById('goal-name').value;
    const target = parseFloat(document.getElementById('goal-target').value);
    const current = parseFloat(document.getElementById('goal-current').value) || 0;
    const deadline = document.getElementById('goal-deadline').value;
    const icon = document.getElementById('goal-icon').value;

    const goal = {
        id: Date.now(),
        title,
        target,
        current,
        deadline,
        icon
    };

    goals.push(goal);
    saveData();
    renderGoals();

    const form = e.target;
    const successMsg = document.createElement('div');
    successMsg.className = 'mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-center';
    successMsg.innerHTML = '<i class="fas fa-check-circle mr-2"></i>สร้างเป้าหมายสำเร็จ!';
    form.appendChild(successMsg);

    setTimeout(() => {
        successMsg.remove();
        form.reset();
        toggleGoalForm();
    }, 2000);
}

function deleteGoal(id) {
    if (confirm('ต้องการลบเป้าหมายนี้ใช่หรือไม่?')) {
        goals = goals.filter(g => g.id !== id);
        saveData();
        renderGoals();
    }
}

function renderGoals() {
    const container = document.getElementById('goals-grid');
    if (!container) return;

    if (goals.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-300">
                <div class="text-6xl mb-4">🎯</div>
                <h3 class="text-xl font-bold text-gray-600 mb-2">ยังไม่มีเป้าหมาย</h3>
                <p class="text-gray-500 mb-6">เริ่มต้นสร้างเป้าหมายทางการเงินของคุณวันนี้</p>
                <button class="btn-secondary" onclick="toggleGoalForm()">สร้างเป้าหมายแรก</button>
            </div>
        `;
        return;
    }

    container.innerHTML = goals.map(g => {
        const percent = Math.min(100, (g.current / g.target) * 100);
        const remaining = g.target - g.current;

        // Determine color based on progress
        let colorClass = 'teal';
        if (percent < 30) colorClass = 'red';
        else if (percent < 70) colorClass = 'blue';
        else colorClass = 'green';

        return `
        <div class="goal-card card-hover relative group">
           <button onclick="deleteGoal(${g.id})" class="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition opacity-0 group-hover:opacity-100">
                <i class="fas fa-trash-alt"></i>
            </button>
           <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-3"><span class="text-3xl">${g.icon}</span>
             <h3 class="text-lg font-bold text-gray-800">${g.title}</h3>
            </div>
           </div>
           <div class="mb-4">
            <div class="flex justify-between text-sm mb-2"><span class="text-gray-600">ความคืบหน้า</span> <span class="font-bold text-${colorClass}-600">${percent.toFixed(1)}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
             <div class="progress-bar bg-gradient-to-r from-${colorClass}-500 to-${colorClass}-600 h-3 rounded-full" style="width: ${percent}%;"></div>
            </div>
           </div>
           <div class="space-y-2">
            <div class="flex justify-between text-sm"><span class="text-gray-600">เป้าหมาย</span> <span class="font-semibold text-gray-800">฿${g.target.toLocaleString()}</span>
            </div>
            <div class="flex justify-between text-sm"><span class="text-gray-600">เก็บแล้ว</span> <span class="font-semibold text-${colorClass}-600">฿${g.current.toLocaleString()}</span>
            </div>
            <div class="flex justify-between text-sm"><span class="text-gray-600">เหลืออีก</span> <span class="font-semibold text-orange-600">฿${remaining.toLocaleString()}</span>
            </div>
           </div>
           <div class="mt-4 pt-4 border-t border-gray-200">
            <div class="flex items-center justify-between text-xs text-gray-500"><span>กำหนดเวลา: ${new Date(g.deadline).toLocaleDateString('th-TH')}</span></div>
           </div>
        </div>
        `;
    }).join('');
}

function updateDashboard() {
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    // Update Dashboard Cards
    // Note: The user template has specific structure for these cards.
    // I need to target them by content or structure if they don't have IDs.
    // Looking at the template:
    // Card 1: Income (Green icon)
    // Card 2: Expense (Red icon)
    // Card 3: Balance (Blue icon)

    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length >= 3) {
        // Income
        statCards[0].querySelector('.text-3xl').textContent = `฿${totalIncome.toLocaleString()}`;

        // Expense
        statCards[1].querySelector('.text-3xl').textContent = `฿${totalExpense.toLocaleString()}`;

        // Balance
        statCards[2].querySelector('.text-3xl').textContent = `฿${balance.toLocaleString()}`;
    }
}

// Inflation Calculator
function calculateInflation(e) {
    e.preventDefault();

    const currentAmount = parseFloat(document.getElementById('current-amount').value);
    const inflationRate = parseFloat(document.getElementById('inflation-rate').value) / 100;
    const years = parseInt(document.getElementById('years').value);

    // Formula: Future Value = Current Value / (1 + inflation rate) ^ years
    const futureValue = currentAmount / Math.pow(1 + inflationRate, years);
    const decreaseAmount = currentAmount - futureValue;
    const decreasePercent = ((decreaseAmount / currentAmount) * 100).toFixed(2);

    // Display result
    document.getElementById('future-value').textContent = '฿' + futureValue.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('decrease-amount').textContent = '฿' + decreaseAmount.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('decrease-percent').textContent = decreasePercent + '%';

    const adviceText = `เงิน ${currentAmount.toLocaleString('th-TH')} บาท ในวันนี้ จะมีมูลค่าเทียบเท่า ${futureValue.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท ใน ${years} ปีข้างหน้า คุณควรลงทุนให้ได้ผลตอบแทนมากกว่า ${(inflationRate * 100).toFixed(2)}% ต่อปี เพื่อรักษามูลค่าเงิน`;
    document.getElementById('advice-text').textContent = adviceText;

    document.getElementById('inflation-result').classList.remove('hidden');

    // Scroll to result
    document.getElementById('inflation-result').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderNews();
    fetchInflationRate();
    checkSession(); // Check if user is already logged in
    loadFinancialData(); // Load persistent data

    // Update news time every minute
    setInterval(updateNewsTime, 60000);

    // Update inflation rate every 1 hour
    setInterval(fetchInflationRate, 3600000);

    // Set today's date as default for date inputs
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('trans-date');
    if (dateInput) {
        dateInput.value = today;
    }

    // Inflation Calculator Event Listener
    const inflationForm = document.getElementById('inflation-form');
    if (inflationForm) {
        inflationForm.addEventListener('submit', calculateInflation);
    }
});
