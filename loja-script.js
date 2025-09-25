// JavaScript para funcionalidades da loja virtual
document.addEventListener('DOMContentLoaded', function() {
    // Variáveis globais
    let carrinho = [];
    let totalCarrinho = 0;
    
    // Produtos disponíveis
    const produtos = {
        'camiseta-capybara-life': {
            nome: 'Camiseta "Capybara Life"',
            preco: 49.90,
            categoria: 'roupas'
        },
        'caneca-relaxing': {
            nome: 'Caneca Relaxing Capybara',
            preco: 29.90,
            categoria: 'acessorios'
        },
        'chaveiro-fofura': {
            nome: 'Chaveiro Fofura',
            preco: 15.90,
            categoria: 'acessorios'
        },
        'almofada-capybara': {
            nome: 'Almofada Capybara',
            preco: 79.90,
            categoria: 'decoracao'
        },
        'moletom-squad': {
            nome: 'Moletom "Capybara Squad"',
            preco: 89.90,
            categoria: 'roupas'
        },
        'pulseira-capybara': {
            nome: 'Pulseira Capybara',
            preco: 24.90,
            categoria: 'acessorios'
        }
    };
    
    // Elementos do DOM
    const carrinhoModal = document.getElementById('carrinho-modal');
    const finalizacaoModal = document.getElementById('finalizacao-modal');
    const carrinhoCount = document.querySelector('.cart-count');
    const carrinhoItens = document.getElementById('carrinho-itens');
    const totalCarrinhoElement = document.getElementById('total-carrinho');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const produtoCards = document.querySelectorAll('.produto-card');
    
    // Filtros de categoria
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const categoria = this.getAttribute('data-category');
            
            // Atualizar botão ativo
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar produtos
            produtoCards.forEach(card => {
                if (categoria === 'all' || card.getAttribute('data-category') === categoria) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Adicionar ao carrinho
    document.querySelectorAll('.btn-comprar').forEach(btn => {
        btn.addEventListener('click', function() {
            const produtoId = this.getAttribute('data-produto');
            const produto = produtos[produtoId];
            
            if (produto) {
                adicionarAoCarrinho(produtoId, produto);
                atualizarCarrinho();
                mostrarNotificacao(`${produto.nome} adicionado ao carrinho!`);
            }
        });
    });
    
    // Função para adicionar ao carrinho
    function adicionarAoCarrinho(produtoId, produto) {
        const itemExistente = carrinho.find(item => item.id === produtoId);
        
        if (itemExistente) {
            itemExistente.quantidade++;
        } else {
            carrinho.push({
                id: produtoId,
                nome: produto.nome,
                preco: produto.preco,
                quantidade: 1
            });
        }
        
        totalCarrinho = carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
    }
    
    // Atualizar carrinho
    function atualizarCarrinho() {
        carrinhoCount.textContent = carrinho.reduce((total, item) => total + item.quantidade, 0);
        
        if (carrinhoItens) {
            carrinhoItens.innerHTML = '';
            
            if (carrinho.length === 0) {
                carrinhoItens.innerHTML = '<p style="text-align: center; color: #666;">Carrinho vazio</p>';
            } else {
                carrinho.forEach(item => {
                    const itemElement = document.createElement('div');
                    itemElement.className = 'carrinho-item';
                    itemElement.innerHTML = `
                        <div class="carrinho-item-info">
                            <div class="carrinho-item-nome">${item.nome}</div>
                            <div class="carrinho-item-preco">R$ ${item.preco.toFixed(2)}</div>
                        </div>
                        <div class="carrinho-item-quantidade">
                            <button class="quantidade-btn" onclick="alterarQuantidade('${item.id}', -1)">-</button>
                            <span>${item.quantidade}</span>
                            <button class="quantidade-btn" onclick="alterarQuantidade('${item.id}', 1)">+</button>
                        </div>
                        <button class="quantidade-btn" onclick="removerItem('${item.id}')" style="background: #dc3545;">
                            <i class="fas fa-trash"></i>
                        </button>
                    `;
                    carrinhoItens.appendChild(itemElement);
                });
            }
        }
        
        if (totalCarrinhoElement) {
            totalCarrinhoElement.textContent = totalCarrinho.toFixed(2);
        }
    }
    
    // Alterar quantidade
    window.alterarQuantidade = function(produtoId, delta) {
        const item = carrinho.find(item => item.id === produtoId);
        if (item) {
            item.quantidade += delta;
            if (item.quantidade <= 0) {
                carrinho = carrinho.filter(item => item.id !== produtoId);
            }
            totalCarrinho = carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
            atualizarCarrinho();
        }
    };
    
    // Remover item
    window.removerItem = function(produtoId) {
        carrinho = carrinho.filter(item => item.id !== produtoId);
        totalCarrinho = carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
        atualizarCarrinho();
    };
    
    // Abrir carrinho
    document.querySelector('.nav-actions').addEventListener('click', function() {
        carrinhoModal.style.display = 'block';
        atualizarCarrinho();
    });
    
    // Fechar modais
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            carrinhoModal.style.display = 'none';
            finalizacaoModal.style.display = 'none';
        });
    });
    
    // Fechar modal clicando fora
    window.addEventListener('click', function(event) {
        if (event.target === carrinhoModal) {
            carrinhoModal.style.display = 'none';
        }
        if (event.target === finalizacaoModal) {
            finalizacaoModal.style.display = 'none';
        }
    });
    
    // Finalizar compra
    document.querySelector('.btn-finalizar-compra').addEventListener('click', function() {
        if (carrinho.length === 0) {
            alert('Carrinho vazio! Adicione produtos antes de finalizar.');
            return;
        }
        
        carrinhoModal.style.display = 'none';
        finalizacaoModal.style.display = 'block';
    });
    
    // Confirmar compra
    document.querySelector('.btn-confirmar-compra').addEventListener('click', function() {
        const form = document.getElementById('formulario-compra');
        const formData = new FormData(form);
        
        // Validar formulário
        const inputs = form.querySelectorAll('input[required], select[required]');
        let valido = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                valido = false;
                input.style.borderColor = '#dc3545';
            } else {
                input.style.borderColor = '#eee';
            }
        });
        
        if (!valido) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        // Simular processo de compra
        iniciarProcessoCompra();
    });
    
    // Processo de compra
    function iniciarProcessoCompra() {
        finalizacaoModal.style.display = 'none';
        
        // Criar modal de processo
        const processoModal = document.createElement('div');
        processoModal.className = 'modal';
        processoModal.style.display = 'block';
        processoModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-shopping-bag"></i> Processando Compra</h2>
                </div>
                <div class="modal-body">
                    <div class="processo-compra">
                        <h3 class="processo-titulo">Sua compra está sendo processada...</h3>
                        <div class="processo-passos" id="processo-passos">
                            <div class="passo" id="passo-1">
                                <i class="fas fa-check"></i>
                                <h4>1. Validando dados</h4>
                                <p>Verificando informações</p>
                            </div>
                            <div class="passo" id="passo-2">
                                <i class="fas fa-credit-card"></i>
                                <h4>2. Processando pagamento</h4>
                                <p>Confirmando transação</p>
                            </div>
                            <div class="passo" id="passo-3">
                                <i class="fas fa-box"></i>
                                <h4>3. Preparando envio</h4>
                                <p>Empacotando produtos</p>
                            </div>
                            <div class="passo" id="passo-4">
                                <i class="fas fa-truck"></i>
                                <h4>4. Enviando</h4>
                                <p>Produto a caminho</p>
                            </div>
                        </div>
                        <div id="progresso-texto" style="text-align: center; margin-top: 2rem; color: #667eea; font-weight: 600;"></div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(processoModal);
        
        // Simular progresso
        const passos = [
            { id: 'passo-1', texto: 'Dados validados com sucesso!' },
            { id: 'passo-2', texto: 'Pagamento aprovado!' },
            { id: 'passo-3', texto: 'Produtos empacotados!' },
            { id: 'passo-4', texto: 'Enviado para entrega!' }
        ];
        
        let passoAtual = 0;
        const progressoTexto = document.getElementById('progresso-texto');
        
        const interval = setInterval(() => {
            if (passoAtual < passos.length) {
                const passo = document.getElementById(passos[passoAtual].id);
                passo.classList.add('ativo');
                progressoTexto.textContent = passos[passoAtual].texto;
                passoAtual++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    processoModal.remove();
                    mostrarResumoCompra();
                }, 2000);
            }
        }, 1500);
    }
    
    // Mostrar resumo da compra
    function mostrarResumoCompra() {
        const resumoModal = document.createElement('div');
        resumoModal.className = 'modal';
        resumoModal.style.display = 'block';
        resumoModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-check-circle"></i> Compra Realizada!</h2>
                </div>
                <div class="modal-body">
                    <div style="text-align: center; padding: 2rem;">
                        <i class="fas fa-gift" style="font-size: 4rem; color: #28a745; margin-bottom: 1rem;"></i>
                        <h3 style="color: #333; margin-bottom: 1rem;">Obrigado pela sua compra!</h3>
                        <p style="color: #666; margin-bottom: 2rem;">
                            Seu pedido foi processado com sucesso. Você receberá um email de confirmação em breve.
                        </p>
                        <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem;">
                            <h4 style="color: #333; margin-bottom: 1rem;">Resumo do Pedido:</h4>
                            <div id="resumo-itens"></div>
                            <div style="border-top: 1px solid #ddd; padding-top: 1rem; margin-top: 1rem;">
                                <strong>Total: R$ ${totalCarrinho.toFixed(2)}</strong>
                            </div>
                        </div>
                        <button onclick="this.closest('.modal').remove(); limparCarrinho();" 
                                style="background: #667eea; color: white; border: none; padding: 12px 30px; border-radius: 25px; cursor: pointer; font-weight: 600;">
                            Continuar Comprando
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(resumoModal);
        
        // Preencher resumo dos itens
        const resumoItens = document.getElementById('resumo-itens');
        carrinho.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.style.display = 'flex';
            itemElement.style.justifyContent = 'space-between';
            itemElement.style.marginBottom = '0.5rem';
            itemElement.innerHTML = `
                <span>${item.nome} x${item.quantidade}</span>
                <span>R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
            `;
            resumoItens.appendChild(itemElement);
        });
    }
    
    // Limpar carrinho
    window.limparCarrinho = function() {
        carrinho = [];
        totalCarrinho = 0;
        atualizarCarrinho();
    };
    
    // Mostrar notificação
    function mostrarNotificacao(mensagem) {
        const notificacao = document.createElement('div');
        notificacao.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 10001;
            animation: slideIn 0.3s ease;
        `;
        notificacao.textContent = mensagem;
        document.body.appendChild(notificacao);
        
        setTimeout(() => {
            notificacao.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notificacao.remove(), 300);
        }, 3000);
    }
    
    // Adicionar estilos de animação
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); }
            to { transform: translateX(100%); }
        }
    `;
    document.head.appendChild(style);
    
    // Inicializar carrinho
    atualizarCarrinho();
});
