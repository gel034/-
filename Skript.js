// ============================================
// script.js — полный JavaScript для Astral · Манга
// ============================================

// ===== ГЕНЕРАЦИЯ QR-КОДА =====
document.addEventListener('DOMContentLoaded', function() {
  const qrContainer = document.getElementById('qrcode');
  if (qrContainer) {
    new QRCode(qrContainer, {
      text: 'https://astral-manga.ru/app',
      width: 90,
      height: 90,
      colorDark: '#3d1a2b',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });
  }
});

// ===== ТАЙМЕР ДЛЯ БАННЕРА =====
let timerSeconds = 3 * 86400 + 12 * 3600; // 3 дня 12 часов

function updateTimer() {
  if (timerSeconds <= 0) {
    document.getElementById('timerDisplay').textContent = '0д 00ч 00м';
    return;
  }
  timerSeconds--;
  const days = Math.floor(timerSeconds / 86400);
  const hours = Math.floor((timerSeconds % 86400) / 3600);
  const mins = Math.floor((timerSeconds % 3600) / 60);
  document.getElementById('timerDisplay').textContent = 
    `${days}д ${hours.toString().padStart(2, '0')}ч ${mins.toString().padStart(2, '0')}м`;
}
setInterval(updateTimer, 1000);

// ===== ПЕРЕКЛЮЧЕНИЕ СТРАНИЦ =====
function switchPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.page-nav button').forEach(b => b.classList.remove('active'));
  
  if (page === 'catalog') {
    document.getElementById('pageCatalog').classList.add('active');
    document.querySelector('.page-nav button:nth-child(1)').classList.add('active');
    closeDetail();
  } else if (page === 'sale') {
    document.getElementById('pageSale').classList.add('active');
    document.querySelector('.page-nav button:nth-child(2)').classList.add('active');
    closeDetail();
  } else if (page === 'cart') {
    document.getElementById('pageCart').classList.add('active');
    document.querySelector('.page-nav button:nth-child(3)').classList.add('active');
    closeDetail();
  }
}

// ===== МОДАЛЬНОЕ ОКНО РЕГИСТРАЦИИ =====
function openModal() {
  document.getElementById('registerModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('registerModal').classList.remove('active');
  document.body.style.overflow = '';
}

function handleRegister(e) {
  e.preventDefault();
  const phone = document.getElementById('phoneInput').value;
  const name = document.getElementById('nameInput').value;
  if (phone && name) {
    alert(`✅ Код подтверждения отправлен на ${phone}\nДобро пожаловать, ${name}!`);
    closeModal();
    document.getElementById('registerForm').reset();
  } else {
    alert('Пожалуйста, заполните все поля');
  }
}

// Закрытие по клику на фон
document.getElementById('registerModal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// Закрытие по Esc
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

// ===== ДАННЫЕ ТОВАРОВ =====
const productsData = [
  { 
    id: 1, 
    title: 'Атака титанов. Том 33, 34', 
    author: 'Хадзимэ Исаяма', 
    price: 1252, 
    oldPrice: 1474, 
    discount: '-15%', 
    type: 'Твердая обложка', 
    tags: ['Манга: психология', 'Манга: боевик', 'Манга: приключения'], 
    desc: 'Покинувшие Парадиз титаны, ведомые Эреном Йегером, уничтожают все живое на своем пути. Микаса, Армин и остальные плывут в Одиху в надежде подготовить самолет...',
    cover: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/attack-on-titan.png',
    onSale: true
  },
  { 
    id: 2, 
    title: 'Магическая битва. Том 11, 12', 
    author: 'Гэгэ Акутами', 
    price: 1159, 
    oldPrice: 1364, 
    discount: '-15%', 
    type: 'Твердая обложка', 
    tags: ['Манга: боевик', 'Манга: фэнтези'], 
    desc: 'Инцидент в Сибуе. Годзилла против Кинг-Конга в мире магии.',
    cover: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/jujutsu-kaisen.png',
    onSale: true
  },
  { 
    id: 3, 
    title: 'Токийский гуль. Том 1, 2', 
    author: 'Суи Исида', 
    price: 1499, 
    oldPrice: 1874, 
    discount: '-20%', 
    type: 'Твердая обложка', 
    tags: ['Манга: ужасы', 'Манга: драма'], 
    desc: 'Токийский гуль — культовая манга о мире, где люди живут в страхе перед гулями.',
    cover: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/tokyo-ghoul.png',
    onSale: false
  },
  { 
    id: 4, 
    title: 'Человек-бензопила. Том 15', 
    author: 'Тацки Фудзимото', 
    price: 1399, 
    oldPrice: 1896, 
    discount: '-15%', 
    type: 'Твердая обложка', 
    tags: ['Манга: боевик', 'Манга: ужасы'], 
    desc: 'Два ребенка и дьявол-бензопила. Битва за человечество.',
    cover: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/chainsaw-man.png',
    onSale: true
  },
  { 
    id: 5, 
    title: 'Катастрофа по соседству. Том 1', 
    author: 'Сугахара Кэйта', 
    price: 829, 
    oldPrice: 995, 
    discount: '-17%', 
    type: 'Мягкая обложка', 
    tags: ['Манга: драма', 'Манга: романтика'], 
    desc: 'История о том, как соседство может стать катастрофой.',
    cover: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/romance.png',
    onSale: false
  },
  { 
    id: 6, 
    title: 'Истребитель демонов. Том 11', 
    author: 'Коёхару Готогэ', 
    price: 970, 
    oldPrice: 1175, 
    discount: '-15%', 
    type: 'Мягкая обложка', 
    tags: ['Манга: боевик', 'Манга: фэнтези'], 
    desc: 'Demon Slayer: Kimetsu no Yaiba. Битва с демонами продолжается.',
    cover: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/demon-slayer.png',
    onSale: false
  },
  { 
    id: 7, 
    title: 'Ван-Пис. Том 1, 2, 3', 
    author: 'Эйитиро Ода', 
    price: 1600, 
    oldPrice: 1999, 
    discount: '-20%', 
    type: 'Твердая обложка', 
    tags: ['Манга: приключения', 'Манга: фэнтези'], 
    desc: 'На заре приключений. One Piece.',
    cover: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/one-piece.png',
    onSale: true
  },
  { 
    id: 8, 
    title: 'Магическая битва. Том 1, 2', 
    author: 'Гэгэ Акутами', 
    price: 1345, 
    oldPrice: 1569, 
    discount: '-20%', 
    type: 'Твердая обложка', 
    tags: ['Манга: боевик', 'Манга: фэнтези'], 
    desc: 'Двуликий Сукуна возвращается.',
    cover: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/jujutsu-kaisen.png',
    onSale: false
  }
];

// ===== СОСТОЯНИЕ =====
let cart = [];
let detailId = null;

// ===== РЕНДЕР ТОВАРОВ В КАТАЛОГЕ =====
function renderProducts() {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';
  productsData.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <div class="cover" style="position:relative;">
        ${p.onSale ? '<span class="sale-badge"><i class="fas fa-tag"></i> Акция</span>' : ''}
        <img src="${p.cover}" alt="${p.title}" onerror="this.parentElement.innerHTML='<div class=\\'placeholder\\'><i class=\\'fas fa-book-open\\'></i><span>${p.title.substring(0,15)}...</span></div>'">
      </div>
      <div class="type">${p.type}</div>
      <div class="title">${p.title}</div>
      <div class="author">${p.author}</div>
      <div class="prices">
        <span class="current">${p.price}₽</span>
        <span class="old">${p.oldPrice}₽</span>
        <span class="discount">${p.discount}</span>
      </div>
      <div class="actions">
        <button class="btn btn-primary" onclick="addToCart(${p.id})"><i class="fas fa-shopping-bag"></i> Купить</button>
        <button class="btn btn-outline" onclick="openDetail(${p.id})"><i class="fas fa-info"></i></button>
      </div>
    `;
    grid.appendChild(div);
  });
}

// ===== РЕНДЕР СТРАНИЦЫ АКЦИЙ =====
function renderSaleProducts() {
  const grid = document.getElementById('saleGrid');
  grid.innerHTML = '';
  const saleItems = productsData.filter(p => p.onSale === true);
  if (saleItems.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:60px 0; color:#b08898; font-size:18px;">
      <i class="fas fa-tags" style="font-size:48px; display:block; margin-bottom:16px; color:#e8c8d4;"></i>
      Нет товаров по акции
    </div>`;
    return;
  }
  saleItems.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <div class="cover" style="position:relative;">
        <span class="sale-badge"><i class="fas fa-tag"></i> Акция</span>
        <img src="${p.cover}" alt="${p.title}" onerror="this.parentElement.innerHTML='<div class=\\'placeholder\\'><i class=\\'fas fa-book-open\\'></i><span>${p.title.substring(0,15)}...</span></div>'">
      </div>
      <div class="type">${p.type}</div>
      <div class="title">${p.title}</div>
      <div class="author">${p.author}</div>
      <div class="prices">
        <span class="current">${p.price}₽</span>
        <span class="old">${p.oldPrice}₽</span>
        <span class="discount">${p.discount}</span>
      </div>
      <div class="actions">
        <button class="btn btn-primary" onclick="addToCart(${p.id})"><i class="fas fa-shopping-bag"></i> Купить</button>
        <button class="btn btn-outline" onclick="openDetail(${p.id})"><i class="fas fa-info"></i></button>
      </div>
    `;
    grid.appendChild(div);
  });
}

// ===== КОРЗИНА =====
function addToCart(id) {
  const product = productsData.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartUI();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();
}

function clearCart() {
  if (cart.length === 0) return;
  if (confirm('Очистить корзину?')) {
    cart = [];
    updateCartUI();
  }
}

function checkout() {
  if (cart.length === 0) {
    alert('Корзина пуста');
    return;
  }
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  alert(`✅ Заказ оформлен на сумму ${total} ₽\nСпасибо за покупку!`);
  cart = [];
  updateCartUI();
}

function updateCartUI() {
  const countEl = document.getElementById('cartCount');
  const navCountEl = document.getElementById('navCartCount');
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  countEl.textContent = totalItems;
  navCountEl.textContent = totalItems;

  const container = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <i class="fas fa-shopping-bag"></i>
        Ваша корзина сейчас пуста<br>
        <span style="font-size:14px; color:#b08898;">Добавьте товары из каталога</span>
      </div>
    `;
    totalEl.innerHTML = `<span>Итого: 0 ₽</span>
      <button class="btn-checkout" onclick="checkout()"><i class="fas fa-credit-card"></i> Оформить заказ</button>`;
    return;
  }
  let html = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    html += `
      <div class="cart-item">
        <div class="info">
          <i class="fas fa-book"></i>
          <span class="name">${item.title}</span>
          <span class="qty">×${item.quantity}</span>
        </div>
        <div class="right">
          <span class="price">${item.price * item.quantity}₽</span>
          <button class="remove" onclick="removeFromCart(${item.id})"><i class="fas fa-trash-alt"></i></button>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
  totalEl.innerHTML = `<span>Итого: ${total} ₽</span>
    <button class="btn-checkout" onclick="checkout()"><i class="fas fa-credit-card"></i> Оформить заказ</button>`;
}

// ===== ДЕТАЛЬНЫЙ ПРОСМОТР =====
function openDetail(id) {
  const p = productsData.find(item => item.id === id);
  if (!p) return;
  detailId = p.id;
  document.getElementById('dTitle').textContent = p.title;
  document.getElementById('dAuthor').textContent = p.author;
  document.getElementById('dDesc').textContent = p.desc;
  document.getElementById('dPrice').innerHTML = `${p.price}₽ <small>${p.oldPrice}₽</small>`;
  
  const coverEl = document.getElementById('dCover');
  coverEl.innerHTML = `<img src="${p.cover}" alt="${p.title}" onerror="this.parentElement.innerHTML='<i class=\\'fas fa-book-open\\'></i>'">`;
  
  const tagsContainer = document.getElementById('dTags');
  tagsContainer.innerHTML = p.tags.map(t => `<span>${t}</span>`).join('');
  document.getElementById('detailView').classList.add('active');
  document.getElementById('detailView').scrollIntoView({ behavior: 'smooth' });
}

function addFromDetail() {
  if (detailId) addToCart(detailId);
}

function closeDetail() {
  document.getElementById('detailView').classList.remove('active');
}

// ===== ПОИСК =====
document.getElementById('searchInput').addEventListener('input', function(e) {
  const query = e.target.value.toLowerCase().trim();
  const cards = document.querySelectorAll('#productGrid .product');
  cards.forEach((card, index) => {
    const p = productsData[index];
    if (!p) return;
    const match = p.title.toLowerCase().includes(query) || p.author.toLowerCase().includes(query);
    card.style.display = match ? '' : 'none';
  });
});

// ===== СОРТИРОВКА =====
document.querySelectorAll('.sort-tabs span').forEach(el => {
  el.addEventListener('click', function() {
    document.querySelectorAll('.sort-tabs span').forEach(s => s.classList.remove('active'));
    this.classList.add('active');
    const sortType = this.dataset.sort;
    const sorted = [...productsData];
    if (sortType === 'cheap') sorted.sort((a, b) => a.price - b.price);
    else if (sortType === 'expensive') sorted.sort((a, b) => b.price - a.price);
    else if (sortType === 'rating') sorted.sort((a, b) => b.id - a.id);
    else sorted.sort((a, b) => a.id - b.id);
    productsData.length = 0;
    productsData.push(...sorted);
    renderProducts();
    renderSaleProducts();
    updateCartUI();
    closeDetail();
  });
});

// ===== КЛИК ПО КАТАЛОГУ =====
document.querySelectorAll('.catalog ul li').forEach(li => {
  li.addEventListener('click', function() {
    alert(`Фильтр: ${this.textContent.trim()}`);
  });
});

// ===== СТАРТ =====
renderProducts();
renderSaleProducts();
updateCartUI();