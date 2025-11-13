// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav');

mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuBtn.innerHTML = nav.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const listingCards = document.querySelectorAll('.listing-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        listingCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Scroll animations
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    observer.observe(element);
});

// =================================================================
// NOUVELLE FONCTIONNALITÉ : ENVOI WHATSAPP AVEC INFORMATIONS DE LA CARTE
// =================================================================

// Fonction pour récupérer toutes les informations d'une carte
function getCardInfo(card) {
    const title = card.querySelector('.listing-title').textContent;
    const price = card.querySelector('.listing-price').textContent;
    const location = card.querySelector('.listing-location span').textContent;
    const description = card.querySelector('.listing-description').textContent;
    const badge = card.querySelector('.listing-badge').textContent;
    
    // Récupérer les caractéristiques
    const features = [];
    card.querySelectorAll('.listing-features .feature').forEach(feature => {
        features.push(feature.textContent.trim());
    });
    
    // Récupérer la catégorie
    const category = card.getAttribute('data-category');
    
    return {
        title,
        price,
        location,
        description,
        badge,
        features,
        category
    };
}

// Fonction pour formater le message WhatsApp
function formatWhatsAppMessage(cardInfo) {
    const emojis = {
        'parcelle': '🏞️',
        'voiture': '🚗',
        'maison': '🏠',
        'chambre': '🛏️'
    };
    
    const categoryEmoji = emojis[cardInfo.category] || '📋';
    
    let message = `${categoryEmoji} *${cardInfo.title}* ${categoryEmoji}\n\n`;
    message += `💰 *Prix:* ${cardInfo.price}\n`;
    message += `📍 *Localisation:* ${cardInfo.location}\n`;
    message += `🏷️ *Statut:* ${cardInfo.badge}\n\n`;
    message += `📝 *Description:*\n${cardInfo.description}\n\n`;
    
    if (cardInfo.features.length > 0) {
        message += `✨ *Caractéristiques:*\n`;
        cardInfo.features.forEach(feature => {
            message += `• ${feature}\n`;
        });
        message += `\n`;
    }
    
    message += `📞 *Je suis intéressé(e) par cette offre!*\n`;
    message += `_Message envoyé via Cabinet Crouz_`;
    
    return encodeURIComponent(message);
}

// Fonction pour ouvrir WhatsApp avec les informations de la carte
function shareOnWhatsApp(card) {
    const cardInfo = getCardInfo(card);
    const message = formatWhatsAppMessage(cardInfo);
    const whatsappUrl = `https://wa.me/2290190732004?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// Ajouter les événements aux boutons "Contacter"
document.addEventListener('DOMContentLoaded', function() {
    const contactButtons = document.querySelectorAll('.action-btn.primary');
    
    contactButtons.forEach(button => {
        // Supprimer le lien existant
        const link = button.querySelector('a');
        if (link) {
            link.remove();
        }
        
        // Ajouter le texte "Contacter" si nécessaire
        if (!button.textContent.includes('Contacter')) {
            button.textContent = 'Contacter';
        }
        
        // Ajouter l'événement click
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Trouver la carte parente
            const card = this.closest('.listing-card');
            if (card) {
                shareOnWhatsApp(card);
            }
        });
    });
});

// =================================================================
// FIN DE LA NOUVELLE FONCTIONNALITÉ
// =================================================================