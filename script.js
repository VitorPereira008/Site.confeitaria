// Otimização para toques em telas de celular (Touch Events)
document.addEventListener("DOMContentLoaded", () => {
    
    // Tratamento dos botões no mobile para feedback visual instantâneo
    const buttons = document.querySelectorAll('.btn-primario, .btn-secundario, .btn-whatsapp, .btn-principal');
    
    buttons.forEach(btn => {
        btn.addEventListener('touchstart', () => {
            btn.style.transform = 'scale(0.98)';
        }, { passive: true });
        
        btn.addEventListener('touchend', () => {
            btn.style.transform = 'scale(1)';
        }, { passive: true });
    });

    // Controle do Menu Mobile
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (mobileBtn && menu) {
        mobileBtn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });

        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add('hidden');
            });
        });
    }

    // Motion Graphics simplificado para scroll
    const motionElements = document.querySelectorAll('.motion-element');
    if (motionElements.length > 0) {
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, {
            threshold: 0.15, 
            rootMargin: "0px 0px -50px 0px"
        });

        motionElements.forEach(el => scrollObserver.observe(el));
    }
});

// Efeito de Rolagem na Navbar
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    const logoText = document.getElementById('logo-text');
    const logoContainer = document.getElementById('logo-container');
    const navLinks = document.querySelectorAll('#desktop-nav a');
    const mobileBtn = document.getElementById('mobile-menu-btn');

    if (window.scrollY > 80) {
        header.classList.remove('bg-transparent', 'border-transparent');
        header.classList.add('glass-header-scrolled');
        
        if(logoContainer) logoContainer.classList.remove('drop-shadow-video');
        if(logoText) {
            logoText.classList.remove('text-white', 'text-shadow-video');
            logoText.classList.add('text-brand-brown');
        }

        navLinks.forEach(link => {
            link.classList.remove('text-white', 'text-shadow-video');
            link.classList.add('text-brand-brown');
        });

        if(mobileBtn) {
            mobileBtn.classList.remove('text-white', 'drop-shadow-video');
            mobileBtn.classList.add('text-brand-brown');
        }
    } else {
        header.classList.add('bg-transparent', 'border-transparent');
        header.classList.remove('glass-header-scrolled');

        if(logoContainer) logoContainer.classList.add('drop-shadow-video');
        if(logoText) {
            logoText.classList.add('text-white', 'text-shadow-video');
            logoText.classList.remove('text-brand-brown');
        }

        navLinks.forEach(link => {
            link.classList.add('text-white', 'text-shadow-video');
            link.classList.remove('text-brand-brown');
        });

        if(mobileBtn) {
            mobileBtn.classList.add('text-white', 'drop-shadow-video');
            mobileBtn.classList.remove('text-brand-brown');
        }
    }
});

// Configuração do Swiper Carrossel
if (typeof Swiper !== 'undefined') {
    var swiper = new Swiper(".mySwiper", {
        effect: "coverflow", 
        grabCursor: true,    
        centeredSlides: true,
        slidesPerView: "auto",
        loop: true,          
        coverflowEffect: {
            rotate: 0,       
            stretch: 0,      
            depth: 150,      
            modifier: 1.5,   
            slideShadows: true, 
        },
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        }
    });
}

// Filtro Interativo do Cardápio
const filterBtns = document.querySelectorAll('.filter-btn');
const cardapioItems = document.querySelectorAll('.cardapio-item');

filterBtns.forEach(button => {
    button.addEventListener('click', () => {
        filterBtns.forEach(b => {
            b.classList.remove('active', 'bg-brand-brown', 'text-white');
            b.classList.add('bg-white', 'text-brand-brown');
        });

        button.classList.add('active', 'bg-brand-brown', 'text-white');
        button.classList.remove('bg-white', 'text-brand-brown');

        const filter = button.getAttribute('data-filter');

        cardapioItems.forEach(item => {
            if (filter === 'todos' || item.classList.contains(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Acordeão do FAQ com animação fluida
document.querySelectorAll('.faq-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
        const wrapper = toggle.nextElementSibling;
        const icon = toggle.querySelector('i');
        const isOpen = wrapper.style.maxHeight && wrapper.style.maxHeight !== '0px';

        document.querySelectorAll('.faq-answer-wrapper').forEach(w => w.style.maxHeight = '0px');
        document.querySelectorAll('.faq-toggle i').forEach(i => i.style.transform = 'rotate(0deg)');

        if (!isOpen) {
            wrapper.style.maxHeight = wrapper.scrollHeight + "px";
            icon.style.transform = 'rotate(180deg)';
        }
    });
});

// Envio do Formulário
const contactForm = document.getElementById('contactForm');
if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;

        button.innerHTML = '<i class="fa-solid fa-circle-check"></i> Enviado com Sucesso!';
        button.classList.remove('bg-brand-accent');
        button.classList.add('bg-green-700');

        setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('bg-green-700');
            button.classList.add('bg-brand-accent');
            this.reset();
        }, 3000);
    });
}

// Lógica dos Cards de Ocasiões (Mobile Hover Fix)
const occasionCards = document.querySelectorAll('.ocasions-card');

occasionCards.forEach(card => {
    card.addEventListener('click', () => {
        occasionCards.forEach(c => c.classList.remove('force-hover'));
        card.classList.add('force-hover');
    });

    card.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            const bg = card.querySelector('.parallax-bg');
            if(!bg) return;
            
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left - (rect.width / 2)) / (rect.width / 2);
            const y = (e.clientY - rect.top - (rect.height / 2)) / (rect.height / 2);

            bg.style.transform = `translate(${x * -5}px, ${y * -5}px) scale(1.03)`;
        }
    });

    card.addEventListener('mouseleave', () => {
        const bg = card.querySelector('.parallax-bg');
        if(bg) {
            bg.style.transform = `translate(0px, 0px) scale(1)`;
        }
    });
});