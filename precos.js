// JavaScript específico para a página de preços

document.addEventListener('DOMContentLoaded', function() {
    const billingToggle = document.querySelectorAll('input[name="billing"]');
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    // Configurar toggle de preços
    billingToggle.forEach(toggle => {
        toggle.addEventListener('change', function() {
            updatePricing(this.value);
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
            
            selectPlan(planName, planPrice, billingType);
        });
    });
    
    // Animação de entrada dos cards
    const observer = new IntersectionObserver(function(entries) {
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
        observer.observe(card);
    });
});

function updatePricing(billingType) {
    const amountElements = document.querySelectorAll('.amount');
    const periodElements = document.querySelectorAll('.period');
    
    amountElements.forEach(amount => {
        const monthlyPrice = amount.dataset.monthly;
        const yearlyPrice = amount.dataset.yearly;
        
        if (billingType === 'yearly') {
            // Calcular desconto anual (10 meses pelo preço de 12)
            const discountedPrice = Math.floor(monthlyPrice * 10);
            amount.textContent = discountedPrice;
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
    const discountBadges = document.querySelectorAll('.discount-badge');
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

function selectPlan(planName, planPrice, billingType) {
    // Mostrar modal de confirmação ou redirecionar para checkout
    const confirmMessage = `
        Você selecionou o plano ${planName}
        Valor: R$ ${planPrice} ${billingType === 'yearly' ? 'por ano' : 'por mês'}
        
        Deseja continuar para o checkout?
    `;
    
    if (confirm(confirmMessage)) {
        // Em um projeto real, aqui seria feito o redirecionamento para o sistema de pagamento
        showMessage(`Plano ${planName} selecionado! Redirecionando para o checkout...`, 'success');
        
        // Simular redirecionamento
        setTimeout(() => {
            // window.location.href = '/checkout?plan=' + encodeURIComponent(planName);
            console.log('Redirecionando para checkout...');
        }, 2000);
    }
}

// Adicionar efeito hover nos cards de preços
document.addEventListener('DOMContentLoaded', function() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
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
});

// Comparação de planos (funcionalidade adicional)
function showPlanComparison() {
    const comparisonModal = document.createElement('div');
    comparisonModal.className = 'comparison-modal';
    comparisonModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Comparação de Planos</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="comparison-table">
                <table>
                    <thead>
                        <tr>
                            <th>Recursos</th>
                            <th>Starter</th>
                            <th>Professional</th>
                            <th>Enterprise</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Links por mês</td>
                            <td>50</td>
                            <td>200</td>
                            <td>Ilimitados</td>
                        </tr>
                        <tr>
                            <td>Domain Authority mínimo</td>
                            <td>DA 25+</td>
                            <td>DA 30+</td>
                            <td>DA 40+</td>
                        </tr>
                        <tr>
                            <td>Relatórios</td>
                            <td>Básicos</td>
                            <td>Avançados</td>
                            <td>Personalizados</td>
                        </tr>
                        <tr>
                            <td>Suporte</td>
                            <td>Email</td>
                            <td>Prioritário</td>
                            <td>24/7 + Gerente</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    comparisonModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    document.body.appendChild(comparisonModal);
    
    // Fechar modal
    const closeBtn = comparisonModal.querySelector('.close-modal');
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(comparisonModal);
    });
    
    comparisonModal.addEventListener('click', function(e) {
        if (e.target === comparisonModal) {
            document.body.removeChild(comparisonModal);
        }
    });
}

