// Desktop Environment Interactions
class DesktopEnvironment {
  constructor() {
    this.init();
  }

  init() {
    this.addShortcutListeners();
    this.addTaskbarListeners();
    this.addDesktopEffects();
  }

  addShortcutListeners() {
    const shortcuts = document.querySelectorAll('.shortcut');
    
    shortcuts.forEach(shortcut => {
      shortcut.addEventListener('click', (e) => {
        // If Shift is held, preserve previous output; otherwise clear
        if (!e.shiftKey) {
          commands['clear'].execute();
        }
        const command = shortcut.getAttribute('data-command');
        this.executeCommand(command);
        this.addClickEffect(shortcut);
      });

      // Add hover sound effect (optional)
      shortcut.addEventListener('mouseenter', () => {
        this.addHoverEffect(shortcut);
      });
    });
  }

  addTaskbarListeners() {
    const taskbarItems = document.querySelectorAll('.taskbar-item');
    
    taskbarItems.forEach(item => {
      item.addEventListener('click', (e) => {
        // Remove active class from all items
        taskbarItems.forEach(i => i.classList.remove('active'));
        
        // Add active class to clicked item
        item.classList.add('active');
        
        const command = item.getAttribute('data-command');
        this.executeCommand(command);
        this.addClickEffect(item);
      });
    });
  }

  executeCommand(command) {
    if (commands[command]) {
      // Clear visible output but keep history; preserve last input prompt only if desired
      commands['clear'].execute();
      
      // Add command to history
      if (!commandHistory.includes(command)) {
        commandHistory.push(command);
      }
      
      // Execute the command
      if (command === 'weather') {
        commands[command].execute();
      } else {
        commands[command].execute();
      }
      
      // Create new line for next input (avoid duplicate prompts)
      setTimeout(() => {
        const inputs = document.querySelectorAll('.type input');
        if (!inputs.length) new_line();
      }, 100);
    }
  }

  addClickEffect(element) {
    element.style.animation = 'clickPulse 0.3s ease-out';
    setTimeout(() => {
      element.style.animation = '';
    }, 300);
  }

  addHoverEffect(element) {
    element.style.transform = 'translateY(-5px) scale(1.05)';
    element.style.boxShadow = '0 15px 30px rgba(61, 90, 254, 0.4)';
  }

  addDesktopEffects() {
    // Add desktop wallpaper effect
    this.addWallpaperEffect();
    
    // Add desktop context menu
    this.addContextMenu();
  }

  addWallpaperEffect() {
    // Subtle gradient overlay for desktop wallpaper
    const wallpaper = document.createElement('div');
    wallpaper.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 100%);
      pointer-events: none;
      z-index: -1;
    `;
    document.body.appendChild(wallpaper);
  }



  addContextMenu() {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      
      // Create context menu
      const contextMenu = document.createElement('div');
      contextMenu.className = 'context-menu';
      contextMenu.style.cssText = `
        position: fixed;
        top: ${e.clientY}px;
        left: ${e.clientX}px;
        background: rgba(30, 30, 46, 0.95);
        border: 1px solid rgba(61, 90, 254, 0.3);
        border-radius: 8px;
        padding: 8px 0;
        backdrop-filter: blur(10px);
        z-index: 1000;
        min-width: 150px;
      `;
      
      const menuItems = [
        { text: 'Tyhjennä terminaali', command: 'clear' },
        { text: 'Näytä apua', command: 'help' },
        { text: 'Komentohistoria', command: 'history' }
      ];
      
      menuItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.textContent = item.text;
        menuItem.style.cssText = `
          padding: 8px 16px;
          cursor: pointer;
          color: #f8f8f2;
          transition: background 0.2s ease;
        `;
        
        menuItem.addEventListener('mouseenter', () => {
          menuItem.style.background = 'rgba(61, 90, 254, 0.2)';
        });
        
        menuItem.addEventListener('mouseleave', () => {
          menuItem.style.background = 'transparent';
        });
        
        menuItem.addEventListener('click', () => {
          this.executeCommand(item.command);
          document.body.removeChild(contextMenu);
        });
        
        contextMenu.appendChild(menuItem);
      });
      
      document.body.appendChild(contextMenu);
      
      // Remove context menu when clicking elsewhere
      setTimeout(() => {
        document.addEventListener('click', () => {
          if (document.body.contains(contextMenu)) {
            document.body.removeChild(contextMenu);
          }
        }, 100);
      }, 100);
    });
  }
}

// Initialize desktop environment when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new DesktopEnvironment();
});

// Add desktop-specific animations
const desktopStyle = document.createElement('style');
desktopStyle.textContent = `
  @keyframes clickPulse {
    0% { transform: scale(1); }
    50% { transform: scale(0.95); }
    100% { transform: scale(1); }
  }



  .shortcut {
    user-select: none;
  }

  .taskbar-item {
    user-select: none;
  }

  .context-menu {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }
`;
document.head.appendChild(desktopStyle);
