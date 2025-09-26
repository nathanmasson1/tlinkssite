// JavaScript principal para o site TLinks

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para links internos
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animação de fade-in para elementos quando entram na viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animação aos elementos
    const animatedElements = document.querySelectorAll('.feature-item, .solution-item, .testimonial-item, .stat-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Contador animado para estatísticas
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Formatação especial para diferentes tipos de números
            if (target >= 1000) {
                element.textContent = Math.floor(current / 1000) + 'K+';
            } else if (element.textContent.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    }

    // Iniciar animação dos contadores quando visíveis
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                let target = parseInt(text.replace(/[^\d]/g, ''));
                
                // Ajustar valores baseado no texto original
                if (text.includes('2000+')) target = 2000;
                else if (text.includes('500K+')) target = 500000;
                else if (text.includes('300%')) target = 300;
                else if (text.includes('1,445+')) target = 1445;
                else if (text.includes('48k+')) target = 48000;
                else if (text.includes('92%')) target = 92;
                
                animateCounter(element, target);
                statsObserver.unobserve(element);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Menu mobile (se necessário)
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Fechar menu mobile ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (navToggle) navToggle.classList.remove('active');
            }
        });
    });

    // Scroll para destacar link ativo no menu
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);

    // Efeito parallax suave no hero
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Lazy loading para imagens
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
});

// Função para mostrar mensagens de sucesso/erro
function showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

// Função para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para formatar telefone
function formatPhone(phone) {
    return phone.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}



// Funcionalidade de toggle de preços para a Home
document.addEventListener('DOMContentLoaded', function() {
    const billingToggle = document.querySelectorAll('input[name="billing"]');
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    if (billingToggle.length > 0 && pricingCards.length > 0) {
        // Configurar toggle de preços
        billingToggle.forEach(toggle => {
            toggle.addEventListener('change', function() {
                updatePricingHome(this.value);
            });
        });
        
        // Adicionar eventos aos botões de planos
        const planButtons = document.querySelectorAll('.plan-button');
        planButtons.forEach(button => {
            button.addEventListener('click', function() {
                const card = this.closest('.pricing-card');
                const planName = card.querySelector('.plan-name').textContent;
                const planPrice = card.querySelector('.amount').textContent;
                const billingType = document.querySelector('input[name="billing"]:checked').value;
                
                selectPlanHome(planName, planPrice, billingType);
            });
        });
        
        // Animação de entrada dos cards (se não for tratada pelo observer principal)
        const pricingObserver = new IntersectionObserver(function(entries) {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 200);
                }
            });
        }, { threshold: 0.1 });
        
        pricingCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            pricingObserver.observe(card);
        });

        // Adicionar efeito hover nos cards de preços
        pricingCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = this.classList.contains('featured') 
                    ? 'scale(1.05) translateY(-10px)' 
                    : 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = this.classList.contains('featured') 
                    ? 'scale(1.05) translateY(-5px)' 
                    : 'translateY(0)';
            });
        });
    }
});

function updatePricingHome(billingType) {
    const amountElements = document.querySelectorAll('.pricing-section .amount');
    const periodElements = document.querySelectorAll('.pricing-section .period');
    const pricingCards = document.querySelectorAll('.pricing-section .pricing-card');
    
    amountElements.forEach(amount => {
        const monthlyPrice = parseFloat(amount.dataset.monthly);
        const yearlyPrice = parseFloat(amount.dataset.yearly);
        
        if (billingType === 'yearly') {
            amount.textContent = yearlyPrice;
        } else {
            amount.textContent = monthlyPrice;
        }
        
        // Adicionar animação de mudança
        amount.style.transform = 'scale(1.1)';
        setTimeout(() => {
            amount.style.transform = 'scale(1)';
        }, 200);
    });
    
    periodElements.forEach(period => {
        period.textContent = billingType === 'yearly' ? '/ano' : '/mês';
    });
    
    // Mostrar badge de desconto para plano anual
    const discountBadges = document.querySelectorAll('.pricing-section .discount-badge');
    discountBadges.forEach(badge => badge.remove());
    
    if (billingType === 'yearly') {
        pricingCards.forEach(card => {
            if (!card.querySelector('.popular-badge')) {
                const discountBadge = document.createElement('div');
                discountBadge.className = 'discount-badge';
                discountBadge.textContent = '2 meses grátis';
                discountBadge.style.cssText = `
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: #10b981;
                    color: white;
                    padding: 0.25rem 0.75rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 600;
                `;
                card.style.position = 'relative';
                card.appendChild(discountBadge);
            }
        });
    }
}





