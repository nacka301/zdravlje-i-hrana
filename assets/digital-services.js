// Digital Services Specific Enhancements

// Training Session Booking Counter
function updateSessionBookings() {
  const sessionCounter = document.querySelector('.session-bookings');
  if (sessionCounter) {
    const bookingsToday = 15 + Math.floor(Math.random() * 10);
    sessionCounter.innerHTML = `🔥 ${bookingsToday} osoba je rezerviralo sesije danas!`;
  }
}

// Personal Trainer Availability
function showTrainerAvailability() {
  const availabilityEl = document.querySelector('.trainer-availability');
  if (availabilityEl) {
    const trainers = [
      'Marko (fitness trener)',
      'Ana (nutricionistica)', 
      'Petar (wellness coach)',
      'Ivana (yoga instruktor)'
    ];
    
    const onlineTrainers = Math.floor(Math.random() * 3) + 2;
    availabilityEl.innerHTML = `
      <div class="trainer-status">
        <span class="online-dot"></span>
        <strong>${onlineTrainers} trenera online</strong> - dostupno za razgovor
      </div>
    `;
  }
}

// Program Progress Tracker
class ProgramProgressTracker {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 5;
    this.steps = [
      'Besplatna konsultacija',
      'Personalizirani plan',
      'Prvi trening',
      'Praćenje napretka',
      'Postizanje ciljeva'
    ];
  }
  
  showProgress() {
    const progressEl = document.querySelector('.program-progress');
    if (progressEl) {
      const progressHtml = `
        <div class="progress-steps">
          <h4>Vaš put do transformacije:</h4>
          ${this.steps.map((step, index) => `
            <div class="step ${index < this.currentStep ? 'completed' : index === this.currentStep ? 'current' : ''}">
              <span class="step-number">${index + 1}</span>
              <span class="step-text">${step}</span>
            </div>
          `).join('')}
        </div>
      `;
      progressEl.innerHTML = progressHtml;
    }
  }
}

// Video Preview Modal
function createVideoPreview() {
  const videoButtons = document.querySelectorAll('.video-preview-btn');
  
  videoButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      const modal = document.createElement('div');
      modal.className = 'video-modal';
      modal.innerHTML = `
        <div class="video-modal-overlay">
          <div class="video-modal-content">
            <button class="video-close">×</button>
            <div class="video-wrapper">
              <iframe src="${button.dataset.videoUrl}" frameborder="0" allowfullscreen></iframe>
            </div>
            <div class="video-cta">
              <h3>Spreman za početak?</h3>
              <button class="video-cta-btn">REZERVIRAJ BESPLATNU KONSULTACIJU</button>
            </div>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      document.body.style.overflow = 'hidden';
      
      // Close modal functionality
      modal.querySelector('.video-close').addEventListener('click', closeVideoModal);
      modal.querySelector('.video-modal-overlay').addEventListener('click', (e) => {
        if (e.target === modal.querySelector('.video-modal-overlay')) {
          closeVideoModal();
        }
      });
      
      function closeVideoModal() {
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
      }
      
      // CTA functionality
      modal.querySelector('.video-cta-btn').addEventListener('click', () => {
        window.location.href = '/collections/all';
      });
    });
  });
}

// Success Stories Carousel
function initSuccessStories() {
  const stories = [
    {
      name: 'Marija, 45 godina',
      image: '/images/success-marija.jpg',
      story: 'Izgubila 15kg u 3 mjeseca s personal trenerom',
      metric: '-15kg'
    },
    {
      name: 'Petar, 52 godine', 
      image: '/images/success-petar.jpg',
      story: 'Povećao energiju i snagu uz digitalne programe',
      metric: '+200% energije'
    },
    {
      name: 'Ana, 48 godina',
      image: '/images/success-ana.jpg', 
      story: 'Potpuno promijenila životne navike',
      metric: '100% transformacija'
    }
  ];
  
  const carousel = document.querySelector('.success-carousel');
  if (carousel) {
    let currentStory = 0;
    
    function showStory(index) {
      const story = stories[index];
      carousel.innerHTML = `
        <div class="success-story">
          <div class="story-image">
            <img src="${story.image}" alt="${story.name}" onerror="this.style.display='none'">
          </div>
          <div class="story-content">
            <h4>${story.name}</h4>
            <p>"${story.story}"</p>
            <div class="story-metric">${story.metric}</div>
          </div>
        </div>
      `;
    }
    
    // Auto rotate stories
    setInterval(() => {
      currentStory = (currentStory + 1) % stories.length;
      showStory(currentStory);
    }, 5000);
    
    // Show first story
    showStory(0);
  }
}

// Free Consultation Form
function initConsultationForm() {
  const consultationBtns = document.querySelectorAll('.free-consultation-btn');
  
  consultationBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const formModal = document.createElement('div');
      formModal.className = 'consultation-modal';
      formModal.innerHTML = `
        <div class="consultation-overlay">
          <div class="consultation-form-container">
            <button class="consultation-close">×</button>
            <h2>🎯 BESPLATNA KONSULTACIJA</h2>
            <p>Rezervirajte svoj termin za besplatnu konsultaciju s našim trenerima</p>
            
            <form class="consultation-form" id="consultationForm">
              <div class="form-group">
                <input type="text" name="name" placeholder="Vaše ime *" required>
              </div>
              <div class="form-group">
                <input type="email" name="email" placeholder="Email adresa *" required>
              </div>
              <div class="form-group">
                <input type="tel" name="phone" placeholder="Broj telefona *" required>
              </div>
              <div class="form-group">
                <select name="goal" required>
                  <option value="">Odaberite svoj cilj *</option>
                  <option value="weight-loss">Mršavljenje</option>
                  <option value="muscle-gain">Povećanje mišićne mase</option>
                  <option value="energy">Povećanje energije</option>
                  <option value="health">Općenito zdravlje</option>
                  <option value="other">Ostalo</option>
                </select>
              </div>
              <div class="form-group">
                <select name="availability" required>
                  <option value="">Kada ste dostupni? *</option>
                  <option value="morning">Jutro (7-12h)</option>
                  <option value="afternoon">Popodne (12-17h)</option>
                  <option value="evening">Večer (17-21h)</option>
                  <option value="weekend">Vikend</option>
                </select>
              </div>
              
              <div class="consultation-benefits">
                <h4>Što ćete dobiti:</h4>
                <ul>
                  <li>✅ Besplatnu procjenu trenutnog stanja</li>
                  <li>✅ Personalizirani plan treninga</li>
                  <li>✅ Savjete o prehrani</li>
                  <li>✅ Preporuke za vaše ciljeve</li>
                </ul>
              </div>
              
              <button type="submit" class="consultation-submit">
                REZERVIRAJ BESPLATNU KONSULTACIJU
              </button>
            </form>
          </div>
        </div>
      `;
      
      document.body.appendChild(formModal);
      document.body.style.overflow = 'hidden';
      
      // Close modal
      formModal.querySelector('.consultation-close').addEventListener('click', closeConsultationModal);
      formModal.querySelector('.consultation-overlay').addEventListener('click', (e) => {
        if (e.target === formModal.querySelector('.consultation-overlay')) {
          closeConsultationModal();
        }
      });
      
      function closeConsultationModal() {
        document.body.removeChild(formModal);
        document.body.style.overflow = 'auto';
      }
      
      // Form submission
      formModal.querySelector('#consultationForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show success message
        const successModal = document.createElement('div');
        successModal.className = 'success-modal';
        successModal.innerHTML = `
          <div class="success-overlay">
            <div class="success-content">
              <div class="success-icon">🎉</div>
              <h2>USPJEŠNO REZERVIRANO!</h2>
              <p>Vaša konsultacija je rezervirana. Kontaktirat ćemo vas u roku od 24 sata za potvrdu termina.</p>
              <button class="success-close">ZATVORI</button>
            </div>
          </div>
        `;
        
        document.body.appendChild(successModal);
        closeConsultationModal();
        
        successModal.querySelector('.success-close').addEventListener('click', () => {
          document.body.removeChild(successModal);
        });
        
        // Auto close after 5 seconds
        setTimeout(() => {
          if (successModal && successModal.parentNode) {
            document.body.removeChild(successModal);
          }
        }, 5000);
        
        // Track conversion
        if (typeof gtag !== 'undefined') {
          gtag('event', 'generate_lead', {
            currency: 'EUR',
            value: 500, // Value of consultation
            event_category: 'Free Consultation',
            event_label: 'Form Submission'
          });
        }
      });
    });
  });
}

// Initialize all digital service features
document.addEventListener('DOMContentLoaded', function() {
  // Update session bookings periodically
  updateSessionBookings();
  setInterval(updateSessionBookings, 60000); // Every minute
  
  // Show trainer availability
  showTrainerAvailability();
  setInterval(showTrainerAvailability, 45000); // Every 45 seconds
  
  // Initialize program progress tracker
  const progressTracker = new ProgramProgressTracker();
  progressTracker.showProgress();
  
  // Initialize video previews
  createVideoPreview();
  
  // Initialize success stories carousel
  initSuccessStories();
  
  // Initialize consultation form
  initConsultationForm();
  
  // Add consultation buttons to existing CTAs
  const existingCTAs = document.querySelectorAll('a[href*="collections"]');
  existingCTAs.forEach(cta => {
    if (cta.textContent.includes('KONSULTACIJU') || cta.textContent.includes('BESPLATNU')) {
      cta.classList.add('free-consultation-btn');
      cta.href = '#consultation';
    }
  });
});

// Add styles for digital service elements
const digitalStyles = document.createElement('style');
digitalStyles.textContent = `
.trainer-availability {
  background: #e8f5e8;
  padding: 10px 15px;
  border-radius: 25px;
  display: inline-flex;
  align-items: center;
  margin: 10px 0;
  font-size: 14px;
}

.online-dot {
  width: 8px;
  height: 8px;
  background: #28a745;
  border-radius: 50%;
  margin-right: 8px;
  animation: pulse 2s infinite;
}

.program-progress {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  margin: 20px 0;
}

.progress-steps .step {
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
  border-radius: 8px;
}

.step.completed {
  background: #d4edda;
  color: #155724;
}

.step.current {
  background: #fff3cd;
  color: #856404;
  font-weight: bold;
}

.step-number {
  background: #28a745;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 12px;
  font-weight: bold;
}

.video-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.video-modal-content {
  background: white;
  border-radius: 15px;
  padding: 20px;
  max-width: 800px;
  width: 90%;
  position: relative;
}

.video-close {
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
}

.video-wrapper {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  margin-bottom: 20px;
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-cta {
  text-align: center;
}

.video-cta-btn {
  background: #28a745;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.consultation-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.consultation-form-container {
  background: white;
  border-radius: 15px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.consultation-close {
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
}

.consultation-form .form-group {
  margin-bottom: 15px;
}

.consultation-form input,
.consultation-form select {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
}

.consultation-form input:focus,
.consultation-form select:focus {
  border-color: #28a745;
  outline: none;
}

.consultation-benefits {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin: 20px 0;
}

.consultation-benefits ul {
  margin: 10px 0;
  padding-left: 0;
  list-style: none;
}

.consultation-benefits li {
  margin: 8px 0;
}

.consultation-submit {
  width: 100%;
  background: #28a745;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.success-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;
}

.success-content {
  background: white;
  border-radius: 15px;
  padding: 40px;
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.success-icon {
  font-size: 60px;
  margin-bottom: 20px;
}

.success-close {
  background: #28a745;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
}

.session-bookings {
  background: #fff3cd;
  color: #856404;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  display: inline-block;
  margin: 10px 0;
}

.success-carousel {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 20px;
  margin: 20px 0;
}

.success-story {
  display: flex;
  align-items: center;
  gap: 20px;
}

.story-image img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.story-content h4 {
  margin: 0 0 10px 0;
  color: #28a745;
}

.story-metric {
  background: #28a745;
  color: white;
  padding: 5px 12px;
  border-radius: 15px;
  font-weight: bold;
  display: inline-block;
  margin-top: 10px;
}

@media (max-width: 768px) {
  .consultation-form-container {
    padding: 20px;
    width: 95%;
  }
  
  .success-story {
    flex-direction: column;
    text-align: center;
  }
  
  .video-modal-content {
    width: 95%;
    padding: 15px;
  }
}
`;
document.head.appendChild(digitalStyles);
