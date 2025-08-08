// Dynamic ML Training Simulation
class MLTrainingSimulation {
  constructor() {
    this.currentEpoch = 1;
    this.currentChunk = 50498;
    this.totalChunks = 500;
    this.chunksCompleted = 111;
    this.currentProgress = 0;
    this.currentLoss = 2.1203;
    this.isRunning = true;
    this.chunkNames = [
      50498, 53734, 16552, 73038, 89812, 23456, 78901, 45678, 12345, 67890,
      34567, 89012, 56789, 23456, 78901, 45678, 12345, 67890, 34567, 89012
    ];
    this.chunkIndex = 0;
    this.init();
  }

  init() {
    this.mlContent = document.querySelector('.ml-content');
    this.updateTraining();
    this.startSimulation();
  }

  startSimulation() {
    setInterval(() => {
      if (this.isRunning) {
        this.updateTraining();
      }
    }, 3000); // Update every 3 seconds
  }

  updateTraining() {
    // Clear existing content
    this.mlContent.innerHTML = '';
    
    // Generate new training output
    this.generateTrainingOutput();
    
    // Update progress
    this.updateProgress();
  }

  generateTrainingOutput() {
    const lines = [];
    
    // Current chunk training
    const chunkName = this.chunkNames[this.chunkIndex];
    const progress = Math.floor(Math.random() * 20) + 80; // 80-100%
    const timeElapsed = this.formatTime(Math.floor(Math.random() * 180) + 120); // 2-5 minutes
    const timeRemaining = this.formatTime(Math.floor(Math.random() * 60) + 30); // 30-90 seconds
    const speed = (Math.random() * 2 + 3).toFixed(2); // 3-5 s/it
    const loss = (Math.random() * 0.1 + 1.05).toFixed(4); // 1.05-1.15
    
    // Progress bar
    const progressBars = '█'.repeat(Math.floor(progress / 2)) + '▌'.repeat(progress % 2) + '░'.repeat(50 - Math.floor(progress / 2));
    
    lines.push(`Epoch ${this.currentEpoch} - chunk_${chunkName}.txt: ${progress}%|${progressBars}| 40/40 [${timeElapsed}<${timeRemaining}, ${speed}s/it, loss=${loss}]`);
    
    if (progress === 100) {
      lines.push(`INFO | Training loss (chunk_${chunkName}.txt): ${this.currentLoss.toFixed(4)}`);
      lines.push(`Training loss: ${this.currentLoss.toFixed(4)}`);
      
      // Update overall progress
      this.chunksCompleted++;
      this.chunkIndex = (this.chunkIndex + 1) % this.chunkNames.length;
      
      // Overall progress bar
      const overallProgress = Math.floor((this.chunksCompleted / this.totalChunks) * 100);
      const overallBars = '█'.repeat(Math.floor(overallProgress / 2)) + '▌'.repeat(overallProgress % 2) + '░'.repeat(50 - Math.floor(overallProgress / 2));
      const totalTime = this.formatTime(Math.floor(Math.random() * 3600) + 1800); // 30-90 minutes
      const remainingTime = this.formatTime(Math.floor(Math.random() * 3600) + 1800); // 30-90 minutes
      const avgSpeed = (Math.random() * 50 + 150).toFixed(2); // 150-200 s/it
      
      lines.push(`Epoch ${this.currentEpoch}/20 - Chunks: ${overallProgress}%|${overallBars}| ${this.chunksCompleted}/${this.totalChunks} [${totalTime}<${remainingTime}, ${avgSpeed}s/it]`);
      
      // Next chunk
      const nextChunk = this.chunkNames[this.chunkIndex];
      lines.push(`Training on chunk_${nextChunk}.txt`);
      
      // Update loss
      this.currentLoss = Math.max(0.8, this.currentLoss - (Math.random() * 0.01));
      
      // Move to next epoch occasionally
      if (this.chunksCompleted % 25 === 0) {
        this.currentEpoch++;
        lines.push(`Starting Epoch ${this.currentEpoch}...`);
      }
    } else {
      // Still training current chunk
      const nextChunk = this.chunkNames[this.chunkIndex];
      lines.push(`Training on chunk_${nextChunk}.txt`);
    }
    
    // Add some previous completed chunks for context
    for (let i = 0; i < 3; i++) {
      const prevChunk = this.chunkNames[(this.chunkIndex - i - 1 + this.chunkNames.length) % this.chunkNames.length];
      const prevLoss = (this.currentLoss + Math.random() * 0.02).toFixed(4);
      const prevTime = this.formatTime(Math.floor(Math.random() * 180) + 120);
      const prevSpeed = (Math.random() * 2 + 3).toFixed(2);
      
      lines.unshift(`Epoch ${this.currentEpoch} - chunk_${prevChunk}.txt: 100%|███████████████████████████████████████████| 40/40 [${prevTime}<00:00, ${prevSpeed}s/it, loss=${prevLoss}]`);
      lines.unshift(`INFO | Training loss (chunk_${prevChunk}.txt): ${prevLoss}`);
      lines.unshift(`Training loss: ${prevLoss}`);
    }
    
    // Display lines
    lines.forEach(line => {
      const lineDiv = document.createElement('div');
      lineDiv.className = 'ml-line';
      lineDiv.textContent = line;
      this.mlContent.appendChild(lineDiv);
    });
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  updateProgress() {
    this.currentProgress = (this.currentProgress + 1) % 100;
  }

  toggleSimulation() {
    this.isRunning = !this.isRunning;
    const statusElement = document.querySelector('.ml-status');
    if (statusElement) {
      statusElement.textContent = this.isRunning ? 'RUNNING' : 'PAUSED';
    }
  }
}

// Initialize ML simulation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.mlSimulation = new MLTrainingSimulation();
});
