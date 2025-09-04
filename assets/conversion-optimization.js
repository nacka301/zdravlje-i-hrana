// CONVERSION OPTIMIZATION JAVASCRIPT

// Countdown Timer
class CountdownTimer {
  constructor(targetDate, elementId) {
    this.targetDate = new Date(targetDate).getTime();
    this.element = document.getElementById(elementId);
    this.interval = setInterval(() => this.updateTimer(), 1000);
  }

  updateTimer() {
    const now = new Date().getTime();
    const distance = this.targetDate - now;

    if (distance < 0) {
      clearInterval(this.interval);
      this.element.innerHTML = "PONUDA JE ZAVRŠENA!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.element.innerHTML = `
      <div class="countdown-box">
        <div>${hours.toString().padStart(2, '0')}</div>
        <span class="countdown-label">SATI</span>
      </div>
      <div class="countdown-separator">:</div>
      <div class="countdown-box">
        <div>${minutes.toString().padStart(2, '0')}</div>
        <span class="countdown-label">MINUTA</span>
      </div>
      <div class="countdown-separator">:</div>
      <div class="countdown-box">
        <div>${seconds.toString().padStart(2, '0')}</div>
        <span class="countdown-label">SEKUNDI</span>
      </div>
    `;
  }
}

// Initialize countdown (48 hours from now)
document.addEventListener('DOMContentLoaded', function() {
  const tomorrow = new Date();
  tomorrow.setTime(tomorrow.getTime() + (48 * 60 * 60 * 1000));
  
  const timerElement = document.querySelector('.countdown-timer');
  if (timerElement) {
    timerElement.id = 'countdown';
    new CountdownTimer(tomorrow, 'countdown');
  }
});

// Stock Level Animation (adapted for digital services)
function updateAvailabilityLevels() {
  const stockIndicators = document.querySelectorAll('.stock-indicator');
  
  stockIndicators.forEach(indicator => {
    const spotsLeft = Math.floor(Math.random() * 8) + 1; // Random spots 1-8
    
    if (spotsLeft <= 2) {
      indicator.classList.add('low-stock');
      indicator.innerHTML = `⚠️ SAMO ${spotsLeft} MJESTA OSTALO OVAJ MJESEC!`;
    } else if (spotsLeft <= 4) {
      indicator.innerHTML = `� ${spotsLeft} mjesta dostupno za personal training`;
    } else {
      indicator.innerHTML = `✅ ${spotsLeft} mjesta dostupno`;
    }
  });
}

// Social Proof Counter
let visitorsCount = 127 + Math.floor(Math.random() * 50);
let recentPurchases = [
  "Marija iz Zagreba se upravo upisala u Personal Training program",
  "Petar iz Splita je započeo Digital Wellness program", 
  "Ana iz Rijeke se upisala u Kompletni paket",
  "Tomislav iz Osijeka je rezervirao sesije s trenerom",
  "Ivana iz Zadra je preuzela Energijski program",
  "Marko iz Varaždina je započeo 30-dnevni challenge"
];

function showSocialProof() {
  // Update visitors counter
  visitorsCount += Math.floor(Math.random() * 3) + 1;
  const visitorsElement = document.querySelector('.visitors-count');
  if (visitorsElement) {
    visitorsElement.textContent = visitorsCount;
  }

  // Show recent purchase notifications
  const notification = document.createElement('div');
  notification.className = 'social-proof-notification';
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">🛒</span>
      <span class="notification-text">${recentPurchases[Math.floor(Math.random() * recentPurchases.length)]}</span>
      <span class="notification-close">×</span>
    </div>
  `;
  
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    background: white;
    border: 2px solid #28a745;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    z-index: 1001;
    max-width: 300px;
    animation: slideInLeft 0.5s ease-out;
  `;

  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification && notification.parentNode) {
      notification.style.animation = 'slideOutLeft 0.5s ease-in';
      setTimeout(() => {
        if (notification && notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 500);
    }
  }, 5000);

  // Manual close
  notification.querySelector('.notification-close').addEventListener('click', () => {
    notification.style.animation = 'slideOutLeft 0.5s ease-in';
    setTimeout(() => {
      if (notification && notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 500);
  });
}

// Exit Intent Popup
let exitIntentShown = false;

function showExitIntentPopup() {
  if (exitIntentShown) return;
  
  exitIntentShown = true;
  const popup = document.createElement('div');
  popup.className = 'exit-intent-popup';
  popup.innerHTML = `
    <div class="exit-popup-overlay">
      <div class="exit-popup-content">
        <button class="exit-popup-close">×</button>
        <h2>PRIČEKAJTE! 🛑</h2>
        <h3>Prije nego što odete, iskoristite našu EKSKLUZIVNU ponudu:</h3>
        <div class="exit-offer">
          <div class="exit-offer-badge">EKSKLUZIVNO ZA VAS!</div>
          <h4>50% POPUST + GRATIS PERSONAL SESIJE</h4>
          <p>+ GRATIS pristup svim digitalnim programima (vrijedi 10€)</p>
          <div class="exit-countdown">
            <p>Ponuda ističe za: <span id="exit-timer">10:00</span></p>
          </div>
          <button class="exit-cta">PRIHVATI PONUDU ODMAH</button>
        </div>
        <p class="exit-guarantee">✅ 30 dana garancije povrata novca</p>
      </div>
    </div>
  `;

  popup.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  document.body.appendChild(popup);
  document.body.style.overflow = 'hidden';

  // Exit countdown
  let exitTimeLeft = 600; // 10 minutes
  const exitTimerEl = document.getElementById('exit-timer');
  
  const exitInterval = setInterval(() => {
    exitTimeLeft--;
    const minutes = Math.floor(exitTimeLeft / 60);
    const seconds = exitTimeLeft % 60;
    exitTimerEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    if (exitTimeLeft <= 0) {
      clearInterval(exitInterval);
      exitTimerEl.textContent = "PONUDA ISTEKLA!";
    }
  }, 1000);

  // Close popup
  function closePopup() {
    document.body.removeChild(popup);
    document.body.style.overflow = 'auto';
    clearInterval(exitInterval);
  }

  popup.querySelector('.exit-popup-close').addEventListener('click', closePopup);
  popup.querySelector('.exit-popup-overlay').addEventListener('click', (e) => {
    if (e.target === popup.querySelector('.exit-popup-overlay')) {
      closePopup();
    }
  });
  
  popup.querySelector('.exit-cta').addEventListener('click', () => {
    window.location.href = '/collections/all?discount=EXIT30';
  });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
  // Update availability levels periodically
  updateAvailabilityLevels();
  setInterval(updateAvailabilityLevels, 30000); // Every 30 seconds

  // Show social proof periodically
  setInterval(showSocialProof, 45000); // Every 45 seconds
  setTimeout(showSocialProof, 5000); // First one after 5 seconds

  // Exit intent detection
  let mouseY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseY = e.clientY;
  });

  document.addEventListener('mouseout', (e) => {
    if (mouseY < 50 && !exitIntentShown) {
      showExitIntentPopup();
    }
  });

  // Mobile scroll exit intent
  let scrolled = false;
  window.addEventListener('scroll', () => {
    if (!scrolled && window.scrollY > window.innerHeight * 0.5) {
      scrolled = true;
      setTimeout(() => {
        if (!exitIntentShown && Math.random() > 0.7) { // 30% chance
          showExitIntentPopup();
        }
      }, 3000);
    }
  });

  // Enhance CTA buttons
  const ctaButtons = document.querySelectorAll('a[href*="collections"], button[data-action="add-to-cart"]');
  ctaButtons.forEach(button => {
    button.classList.add('cta-enhanced');
    
    // Add click tracking
    button.addEventListener('click', (e) => {
      // Track conversion attempts
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
          event_category: 'CTA',
          event_label: button.textContent.trim(),
          value: 1
        });
      }
    });
  });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
@keyframes slideInLeft {
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOutLeft {
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(-100%); opacity: 0; }
}

.exit-popup-overlay {
  background: rgba(0,0,0,0.8);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-out;
}

.exit-popup-content {
  background: white;
  padding: 40px;
  border-radius: 20px;
  max-width: 500px;
  text-align: center;
  position: relative;
  animation: popIn 0.4s ease-out;
}

.exit-popup-close {
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: #999;
}

.exit-offer {
  background: linear-gradient(45deg, #ff6b6b, #ee5a52);
  color: white;
  padding: 30px;
  border-radius: 15px;
  margin: 20px 0;
}

.exit-offer-badge {
  background: #fff;
  color: #ff6b6b;
  padding: 5px 15px;
  border-radius: 20px;
  font-weight: bold;
  display: inline-block;
  margin-bottom: 15px;
}

.exit-cta {
  background: #28a745;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin: 15px 0;
  transition: all 0.3s ease;
}

.exit-cta:hover {
  background: #218838;
  transform: scale(1.05);
}

.exit-countdown {
  font-size: 20px;
  font-weight: bold;
  margin: 15px 0;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes popIn {
  from { transform: scale(0.7); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.social-proof-notification {
  animation: slideInLeft 0.5s ease-out;
}

.notification-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.notification-icon {
  font-size: 20px;
}

.notification-close {
  cursor: pointer;
  font-size: 20px;
  margin-left: auto;
  color: #999;
}

.notification-close:hover {
  color: #333;
}
`;
document.head.appendChild(style);
