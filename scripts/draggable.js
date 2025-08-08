// Draggable Windows System
class DraggableWindows {
  constructor() {
    this.draggedElement = null;
    this.offsetX = 0;
    this.offsetY = 0;
    this.isDragging = false;
    this.init();
  }

  init() {
    this.makeDraggable('.hardware-stats');
    this.makeDraggable('.ml-training');
    // Terminal container is now non-moveable for better UX
    // this.makeDraggable('.terminal-container');
  }

  makeDraggable(selector) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
      // Add cursor style
      element.style.cursor = 'move';
      
      // Add drag handle if it doesn't exist
      if (!element.querySelector('.drag-handle')) {
        const dragHandle = document.createElement('div');
        dragHandle.className = 'drag-handle';
        dragHandle.innerHTML = '⋮⋮';
        dragHandle.style.cssText = `
          position: absolute;
          top: 8px;
          right: 8px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 12px;
          cursor: move;
          user-select: none;
          z-index: 1000;
          padding: 4px;
          border-radius: 4px;
          transition: color 0.2s ease;
        `;
        
        element.appendChild(dragHandle);
        
        // Make the entire element draggable
        this.addDragListeners(element);
      }
    });
  }

  addDragListeners(element) {
    const handleMouseDown = (e) => {
      // Don't start drag if clicking on input, buttons, or links
      if (e.target.tagName === 'INPUT' || 
          e.target.tagName === 'BUTTON' || 
          e.target.tagName === 'A' ||
          e.target.closest('input') || 
          e.target.closest('button') ||
          e.target.closest('a')) {
        return;
      }

      this.isDragging = true;
      this.draggedElement = element;
      
      const rect = element.getBoundingClientRect();
      this.offsetX = e.clientX - rect.left;
      this.offsetY = e.clientY - rect.top;
      
      element.style.transition = 'none';
      element.style.zIndex = '1000';
      element.classList.add('dragging');
      
      // Prevent text selection
      e.preventDefault();
    };

    const handleMouseMove = (e) => {
      if (!this.isDragging || !this.draggedElement) return;
      
      e.preventDefault();
      
      const newX = e.clientX - this.offsetX;
      const newY = e.clientY - this.offsetY;
      
      // Keep window within viewport bounds
      const maxX = window.innerWidth - this.draggedElement.offsetWidth;
      const maxY = window.innerHeight - this.draggedElement.offsetHeight;
      
      const clampedX = Math.max(0, Math.min(newX, maxX));
      const clampedY = Math.max(0, Math.min(newY, maxY));
      
      this.draggedElement.style.left = clampedX + 'px';
      this.draggedElement.style.top = clampedY + 'px';
    };

    const handleMouseUp = () => {
      if (!this.isDragging) return;
      
      this.isDragging = false;
      
      if (this.draggedElement) {
        this.draggedElement.style.transition = 'all 0.2s ease';
        this.draggedElement.style.zIndex = '';
        this.draggedElement.classList.remove('dragging');
        this.draggedElement = null;
      }
    };

    // Add event listeners
    element.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Prevent context menu on drag
    element.addEventListener('contextmenu', (e) => {
      if (this.isDragging) {
        e.preventDefault();
      }
    });
  }
}

// Initialize draggable windows when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new DraggableWindows();
});
