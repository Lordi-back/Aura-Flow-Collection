// Модальное окно для документов
document.addEventListener('DOMContentLoaded', function() {
    // Элементы модального окна
    const modal = document.getElementById('documentModal');
    const modalClose = document.querySelector('.modal-close');
    const modalTitle = document.getElementById('modalDocTitle');
    const modalText = document.getElementById('modalDocText');
    const modalLoading = document.getElementById('modalLoading');
    const modalError = document.getElementById('modalError');
    
    // Соответствие кнопок и файлов
    const documentButtons = {
        'delivery-btn': { file: 'delivery.txt', title: 'Доставка' },
        'care-btn': { file: 'care.txt', title: 'Рекомендации по уходу' },
        'privacy-btn': { file: 'privacy.txt', title: 'Политика конфиденциальности' },
        'offer-btn': { file: 'offer.txt', title: 'Договор оферты' }
    };
    
    // Открытие модального окна при клике на кнопку
    document.querySelectorAll('[id^="delivery-btn"], [id^="care-btn"], [id^="privacy-btn"], [id^="offer-btn"]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Получаем ID кнопки (удаляем префикс, если он есть)
            let buttonId = this.id;
            const prefix = 'footer-';
            if (buttonId.startsWith(prefix)) {
                buttonId = buttonId.substring(prefix.length);
            }
            
            // Находим конфигурацию для этой кнопки
            const docConfig = documentButtons[buttonId];
            if (docConfig) {
                openDocumentModal(docConfig.file, docConfig.title);
            }
        });
    });
    
    // Закрытие модального окна
    modalClose.addEventListener('click', closeModal);
    
    // Закрытие при клике на фон
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Закрытие по клавише Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Функция открытия модального окна
    function openDocumentModal(filename, title) {
        // Сброс состояния
        modalLoading.style.display = 'block';
        modalText.style.display = 'none';
        modalError.style.display = 'none';
        
        // Установка заголовка
        modalTitle.textContent = title;
        
        // Показываем модальное окно
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
        
        // Загружаем документ
        fetch(`documents/${filename}`)
            .then(response => {
                if (!response.ok) throw new Error('Ошибка загрузки');
                return response.text();
            })
            .then(text => {
                // Заменяем переносы строк на HTML-теги
                const formattedText = text
                    .replace(/\n\n+/g, '</p><p>')
                    .replace(/\n/g, '<br>');
                
                modalText.innerHTML = `<p>${formattedText}</p>`;
                modalLoading.style.display = 'none';
                modalText.style.display = 'block';
            })
            .catch(error => {
                console.error('Ошибка загрузки документа:', error);
                modalLoading.style.display = 'none';
                modalError.style.display = 'block';
            });
    }
    
    // Функция закрытия модального окна
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Восстанавливаем прокрутку
    }
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
