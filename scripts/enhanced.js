// Enhanced terminal features
class TerminalEnhancements {
  constructor() {
    this.suggestions = [];
    this.currentSuggestion = 0;
    this.isTyping = false;
    this.init();
  }

  init() {
    this.addTypingEffect();
    this.addCommandSuggestions();
    this.addKeyboardShortcuts();
    this.addTerminalEffects();
    this.addInteractiveElements();
  }

  addTypingEffect() {
    // Add typing sound effect (optional)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    function playTypingSound() {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    }

    // Add typing sound to input
    document.addEventListener('keydown', (e) => {
      const input = document.querySelector('input');
      if (input && document.activeElement === input && e.key.length === 1) {
        // Uncomment the next line to enable typing sounds
        // playTypingSound();
      }
    });
  }

  addCommandSuggestions() {
    const input = document.querySelector('input');
    if (!input) return;

    input.addEventListener('input', (e) => {
      const value = e.target.value.toLowerCase();
      const suggestions = Object.keys(commands).filter(cmd => 
        cmd.toLowerCase().startsWith(value) && value.length > 0
      );

      this.suggestions = suggestions;
      this.currentSuggestion = 0;
      this.showSuggestions(suggestions);
    });

    // Enhanced tab completion
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const value = input.value.toLowerCase();
        const suggestions = Object.keys(commands).filter(cmd => 
          cmd.toLowerCase().startsWith(value) && value.length > 0
        );
        
        if (suggestions.length > 0) {
          input.value = suggestions[0];
          this.showCompletionAnimation(input);
        }
      }
    });
  }

  showCompletionAnimation(element) {
    element.style.animation = 'completionGlow 0.5s ease-out';
    setTimeout(() => {
      element.style.animation = '';
    }, 500);
  }

  showSuggestions(suggestions) {
    // Remove existing suggestions
    const existing = document.querySelector('.suggestions');
    if (existing) existing.remove();

    if (suggestions.length === 0) return;

    const suggestionBox = document.createElement('div');
    suggestionBox.className = 'suggestions';
    suggestionBox.style.cssText = `
      position: absolute;
      background: rgba(30, 30, 46, 0.95);
      border: 1px solid rgba(61, 90, 254, 0.3);
      border-radius: 8px;
      padding: 8px;
      margin-top: 4px;
      z-index: 1000;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      animation: slideDown 0.3s ease-out;
    `;

    suggestions.forEach((suggestion, index) => {
      const item = document.createElement('div');
      item.textContent = suggestion;
      item.style.cssText = `
        color: ${index === 0 ? '#3d5afe' : '#ccc'};
        padding: 6px 10px;
        cursor: pointer;
        border-radius: 4px;
        transition: all 0.2s ease;
        font-weight: ${index === 0 ? '500' : 'normal'};
      `;
      
      item.addEventListener('mouseenter', () => {
        item.style.background = 'rgba(61, 90, 254, 0.2)';
        item.style.color = '#3d5afe';
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.background = 'transparent';
        item.style.color = index === 0 ? '#3d5afe' : '#ccc';
      });
      
      item.addEventListener('click', () => {
        document.querySelector('input').value = suggestion;
        suggestionBox.remove();
        this.showCompletionAnimation(document.querySelector('input'));
      });
      
      suggestionBox.appendChild(item);
    });

    const inputContainer = document.querySelector('.type');
    if (inputContainer) {
      inputContainer.style.position = 'relative';
      inputContainer.appendChild(suggestionBox);
    }
  }

  addKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl + L to clear terminal
      if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        commands['clear'].execute();
      }
      
      // Ctrl + K to clear input
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        const input = document.querySelector('input');
        if (input) input.value = '';
      }

      // Ctrl + Space for command suggestions
      if (e.ctrlKey && e.key === ' ') {
        e.preventDefault();
        const input = document.querySelector('input');
        if (input) {
          const value = input.value.toLowerCase();
          const suggestions = Object.keys(commands).filter(cmd => 
            cmd.toLowerCase().includes(value) && value.length > 0
          );
          this.showSuggestions(suggestions);
        }
      }
    });
  }

  addTerminalEffects() {
    // Add KDE Plasma-style background effect
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      opacity: 0.02;
      z-index: -1;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const plasma = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const plasmaArray = plasma.split("");

    const fontSize = 12;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    function draw() {
      ctx.fillStyle = 'rgba(30, 30, 46, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#3d5afe';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = plasmaArray[Math.floor(Math.random() * plasmaArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    setInterval(draw, 40);
  }

  addInteractiveElements() {
    // Add hover effects to command outputs
    document.addEventListener('mouseover', (e) => {
      if (e.target.tagName === 'P' && e.target.textContent.includes('•')) {
        e.target.style.transform = 'translateX(5px)';
        e.target.style.transition = 'transform 0.3s ease';
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.tagName === 'P') {
        e.target.style.transform = 'translateX(0)';
      }
    });

    // Add click effects to links
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        e.target.style.animation = 'clickPulse 0.3s ease-out';
        setTimeout(() => {
          e.target.style.animation = '';
        }, 300);
      }
    });
  }
}

// Initialize enhancements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new TerminalEnhancements();
});

// Add some fun Easter eggs
const easterEggs = {
  'matrix': () => {
    createText('🌐 Entering the Matrix...');
    createText('Loading simulation...');
    setTimeout(() => {
      createText('Welcome to the real world.');
    }, 2000);
  },
  'hack': () => {
    createText('🔓 Initiating hack sequence...');
    createText('Bypassing security...');
    createText('Access granted!');
  },
  'sudo': () => {
    createText('🔐 [sudo] password for root:');
    createText('(This is just a demo terminal)');
  },
  'kde': () => {
    createText('🎨 Welcome to KDE Plasma Terminal!');
    createText('  • Beautiful by default');
    createText('  • Highly customizable');
    createText('  • Open source and free');
    createText('  • Made with ❤️ by the KDE community');
  }
};

// Add Easter eggs to commands
Object.assign(commands, easterEggs);

// Add some additional utility functions
function addGlitchEffect(element) {
  element.style.animation = 'glitch 0.3s ease-in-out';
  setTimeout(() => {
    element.style.animation = '';
  }, 300);
}

// Add enhanced animations to CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
  }

  @keyframes completionGlow {
    0% { box-shadow: 0 0 0 0 rgba(61, 90, 254, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(61, 90, 254, 0); }
    100% { box-shadow: 0 0 0 0 rgba(61, 90, 254, 0); }
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes clickPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  .suggestions {
    border: 1px solid rgba(61, 90, 254, 0.3) !important;
    background: rgba(30, 30, 46, 0.95) !important;
    backdrop-filter: blur(10px) !important;
  }
`;
document.head.appendChild(style);
