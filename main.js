document.addEventListener('DOMContentLoaded', () => {
    
    const modal = document.getElementById('auth-modal');
    const closeBtn = document.getElementById('close-modal');
    const loginForm = document.getElementById('login-form');
    const errorMsg = document.getElementById('error-msg');
    const modalDesc = document.getElementById('modal-desc');
    
    // Кнопки, открывающие авторизацию
    const authTriggers = document.querySelectorAll('.open-auth');
    
    // Тексты модалки по ролям
    const modalTexts = {
        'volunteer': {
            title: 'Вход для волонтёров',
            desc: 'Авторизуйтесь, чтобы начать помогать'
        },
        'parent': {
            title: 'Вход для родственников',
            desc: 'Авторизуйтесь, чтобы подключить близкого'
        },
        'senior': {
            title: 'Вход для получения помощи',
            desc: 'Введите номер телефона, чтобы мы могли с вами связаться'
        }
    };

    // Открытие модалки
    authTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Определяем роль по data-target или data-role
            const target = btn.getAttribute('data-target');
            let role = btn.getAttribute('data-role');
            
            if (!role) {
                if (target?.includes('teen')) role = 'volunteer';
                else if (target?.includes('parent')) role = 'parent';
                else if (target?.includes('grand')) role = 'senior';
            }
            
            const texts = modalTexts[role] || modalTexts.volunteer;
            
            if (modal) {
                document.querySelector('.modal-header h3').textContent = texts.title;
                if (modalDesc) modalDesc.textContent = texts.desc;
                modal.classList.add('active');
                if (errorMsg) errorMsg.textContent = '';
                if (loginForm) loginForm.reset();
            }
        });
    });

    // Закрытие модалки
    const closeModal = () => {
        if (modal) modal.classList.remove('active');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('active')) {
            closeModal();
        }
    });

    // Обработка формы
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const phone = document.getElementById('email')?.value.trim();
            const password = document.getElementById('password')?.value.trim();

            if (!email || !password) {
                if (errorMsg) {
                    errorMsg.textContent = 'Пожалуйста, заполните все поля';
                    errorMsg.style.color = '#D32F2F';
                }
                if (loginForm) {
                    loginForm.style.animation = 'shake 0.3s';
                    setTimeout(() => loginForm.style.animation = '', 300);
                }
                return;
            }
            
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Загрузка...';
            }

            setTimeout(() => {
                // Находим целевую страницу из data-target ближайшей кнопки
                const targetBtn = document.querySelector('.open-auth[data-target]');
                const targetPage = targetBtn?.getAttribute('data-target') || 'index.html';
                
                // Для демо показываем успех и редиректим
                alert('✅ Авторизация успешна! Добро пожаловать в Tatani.');
                if (targetPage) {
                    window.location.href = targetPage;
                }
            }, 1000);
        });
    }
});