// Логика для документов в футере
document.addEventListener('DOMContentLoaded', function() {
  const docModal = document.getElementById('documentModal');
  const docContent = document.getElementById('docContent');
  const docTitle = document.getElementById('docTitle');
  const docLoading = document.getElementById('docLoading');
  const docError = document.getElementById('docError');
  const closeBtn = document.getElementById('closeDocModal');
  
  // Заголовки для документов
  const docTitles = {
    'care.txt': 'Уход за одеждой',
    'delivery.txt': 'Доставка и оплата',
    'return.txt': 'Возврат и обмен',
    'support.txt': 'Поддержка клиентов'
  };
  
  // Обработчик для всех кнопок документов
  document.querySelectorAll('.doc-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      const filename = this.getAttribute('data-doc');
      const title = docTitles[filename] || 'Документ';
      
      // Показываем окно и устанавливаем заголовок
      docModal.style.display = 'block';
      docTitle.textContent = title;
      
      // Сбрасываем состояние
      docLoading.style.display = 'block';
      docContent.style.display = 'none';
      docError.style.display = 'none';
      
      // Загружаем документ
      fetch(`documents/${filename}`)
        .then(response => {
          if (!response.ok) throw new Error('Файл не найден');
          return response.text();
        })
        .then(text => {
          // Форматируем текст (сохраняем переносы строк)
          const formattedText = text.replace(/\n/g, '<br>');
          docContent.innerHTML = formattedText;
          docLoading.style.display = 'none';
          docContent.style.display = 'block';
        })
        .catch(error => {
          console.error('Ошибка загрузки документа:', error);
          docLoading.style.display = 'none';
          docError.style.display = 'block';
        });
    });
  });
  
  // Закрытие модального окна
  closeBtn.addEventListener('click', function() {
    docModal.style.display = 'none';
  });
  
  // Закрытие при клике вне окна
  window.addEventListener('click', function(e) {
    if (e.target === docModal) {
      docModal.style.display = 'none';
    }
  });
});

// Логика выбора цвета на странице cart.html
function initColorSelection() {
    const colorButtons = document.querySelectorAll('.color-btn');
    
    colorButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Убираем класс selected у всех кнопок в этой группе
            const parent = this.closest('.color-options');
            parent.querySelectorAll('.color-btn').forEach(b => {
                b.classList.remove('selected');
            });
            
            // Добавляем класс selected текущей кнопке
            this.classList.add('selected');
            
            // Можно также обновить данные в корзине
            const productCard = this.closest('.cart-product-card');
            const productId = productCard.dataset.productId; // если добавить data-атрибут
            const selectedColor = this.dataset.color;
            
            console.log(`Товар ID: ${productId}, выбран цвет: ${selectedColor}`);
            // Здесь можно добавить логику обновления корзины
        });
    });
}

// Инициализируем при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.cart-product-card')) {
        initColorSelection();
    }
});

