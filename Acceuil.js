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
// NOUVELLE FONCTIONNALITÉ : ENVOI EMAIL AVEC INFORMATIONS DU FORMULAIRE
// =================================================================

// Fonction pour récupérer toutes les données du formulaire
function getFormData() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    return {
        name,
        email,
        phone,
        service,
        message
    };
}

// Fonction pour formater le message email
function formatEmailMessage(formData) {
    const services = {
        'immobilier': 'Immobilier',
        'btp': 'Bâtiment et Travaux Publics',
        'vente': 'Vente',
        'parcelles': 'Achat de Parcelles',
        'voitures': 'Voitures'
    };
    
    const serviceLabel = services[formData.service] || 'Non spécifié';
    
    let emailMessage = `Nouveau message de contact - Cabinet Crouz\n\n`;
    emailMessage += `🔹 *Informations du client:*\n`;
    emailMessage += `• Nom complet: ${formData.name}\n`;
    emailMessage += `• Email: ${formData.email}\n`;
    emailMessage += `• Téléphone: ${formData.phone || 'Non renseigné'}\n`;
    emailMessage += `• Service concerné: ${serviceLabel}\n\n`;
    emailMessage += `🔹 *Message:*\n${formData.message}\n\n`;
    emailMessage += `📅 *Date d'envoi:* ${new Date().toLocaleString('fr-FR')}\n`;
    emailMessage += `---\n*Message envoyé via le formulaire de contact du site Cabinet Crouz*`;
    
    return emailMessage;
}

// Fonction pour ouvrir le client email avec les données pré-remplies
function sendViaEmail(formData) {
    const emailMessage = formatEmailMessage(formData);
    const subject = `Nouveau message de ${formData.name} - Service ${formData.service || 'Général'}`;
    
    // Encoder le sujet et le message pour l'URL
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(emailMessage);
    
    // Créer l'URL mailto
    const mailtoUrl = `mailto:crouzimmo@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
    
    // Ouvrir le client email
    window.location.href = mailtoUrl;
}

// =================================================================
// FIN DE LA NOUVELLE FONCTIONNALITÉ
// =================================================================

// Form validation - MODIFIÉ POUR INTÉGRER L'ENVOI EMAIL
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (name && email && message) {
        // Récupérer toutes les données du formulaire
        const formData = getFormData();
        
        // Ouvrir le client email avec les données pré-remplies
        sendViaEmail(formData);
        
        // Message de confirmation
        alert('Merci pour votre message! Votre client email va s\'ouvrir avec votre message pré-rempli. Il ne vous reste plus qu\'à cliquer sur "Envoyer".');
        contactForm.reset();
    } else {
        alert('Veuillez remplir tous les champs obligatoires (Nom, Email, Message).');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});