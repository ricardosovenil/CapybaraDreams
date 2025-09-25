// JavaScript para funcionalidades interativas
document.addEventListener('DOMContentLoaded', function() {
    // Contador do carrinho
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');
    
    // Botões "Adicionar ao Carrinho"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            cartCount++;
            cartCountElement.textContent = cartCount;
            
            // Animação de feedback
            button.style.background = '#4CAF50';
            button.textContent = 'Adicionado!';
            
            setTimeout(() => {
                button.style.background = '#667eea';
                button.textContent = 'Adicionar ao Carrinho';
            }, 1500);
        });
    });
    
    // Smooth scroll para links de navegação
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Botão CTA do hero
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', function() {
        document.querySelector('#products').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
    
    // Efeito de parallax no hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Animação de entrada dos elementos
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
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.product-card, .category-card, .feature');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Simulação de processo de compra
    function simulatePurchase() {
        const steps = [
            '1. Selecionar produtos',
            '2. Adicionar ao carrinho',
            '3. Revisar pedido',
            '4. Preencher dados de entrega',
            '5. Escolher forma de pagamento',
            '6. Confirmar compra',
            '7. Processar pagamento',
            '8. Enviar confirmação por email',
            '9. Preparar envio',
            '10. Enviar produto',
            '11. Rastrear entrega',
            '12. Confirmar recebimento'
        ];
        
        let currentStep = 0;
        const modal = createPurchaseModal();
        document.body.appendChild(modal);
        
        const interval = setInterval(() => {
            if (currentStep < steps.length) {
                updatePurchaseStep(modal, steps[currentStep], currentStep + 1, steps.length);
                currentStep++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    modal.remove();
                    alert('Compra realizada com sucesso! 🎉');
                }, 2000);
            }
        }, 1000);
    }
    
    function createPurchaseModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;
        
        modal.innerHTML = `
            <div style="
                background: white;
                padding: 2rem;
                border-radius: 15px;
                max-width: 500px;
                width: 90%;
                text-align: center;
            ">
                <h3 style="margin-bottom: 1rem; color: #333;">Processo de Compra</h3>
                <div id="purchase-progress" style="margin-bottom: 1rem;"></div>
                <div id="purchase-step" style="font-size: 1.1rem; color: #667eea; font-weight: 600;"></div>
            </div>
        `;
        
        return modal;
    }
    
    function updatePurchaseStep(modal, step, current, total) {
        const progressElement = modal.querySelector('#purchase-progress');
        const stepElement = modal.querySelector('#purchase-step');
        
        const progress = (current / total) * 100;
        progressElement.innerHTML = `
            <div style="
                width: 100%;
                height: 10px;
                background: #f0f0f0;
                border-radius: 5px;
                overflow: hidden;
            ">
                <div style="
                    width: ${progress}%;
                    height: 100%;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    transition: width 0.3s ease;
                "></div>
            </div>
            <p style="margin-top: 0.5rem; color: #666;">${current}/${total}</p>
        `;
        
        stepElement.textContent = step;
    }
    
    // Adicionar evento de compra aos botões
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Simular processo de compra após 3 segundos
            setTimeout(() => {
                if (confirm('Deseja finalizar a compra agora?')) {
                    simulatePurchase();
                }
            }, 2000);
        });
    });
    
    // Efeito de hover nos cards de produto
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Contador de visitantes (simulado)
    let visitorCount = Math.floor(Math.random() * 1000) + 500;
    const visitorElement = document.createElement('div');
    visitorElement.innerHTML = `
        <div style="
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #667eea;
            color: white;
            padding: 10px 15px;
            border-radius: 25px;
            font-size: 0.9rem;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 1000;
        ">
            <i class="fas fa-users" style="margin-right: 5px;"></i>
            ${visitorCount} pessoas online
        </div>
    `;
    document.body.appendChild(visitorElement);
    
    // Simular aumento de visitantes
    setInterval(() => {
        visitorCount += Math.floor(Math.random() * 3);
        visitorElement.querySelector('div').innerHTML = `
            <i class="fas fa-users" style="margin-right: 5px;"></i>
            ${visitorCount} pessoas online
        `;
    }, 10000);
});
