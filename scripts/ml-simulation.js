// Dynamic ML Training Simulation with Tabs
class MLTrainingSimulation {
  constructor() {
    this.currentEpoch = 1;
    this.currentChunk = 50498;
    this.totalChunks = 500;
    this.chunksCompleted = 111;
    this.currentProgress = 0;
    this.currentLoss = 2.1203;
    this.isRunning = true;
    this.activeTab = 'training';
    this.chunkNames = [
      50498, 53734, 16552, 73038, 89812, 23456, 78901, 45678, 12345, 67890,
      34567, 89012, 56789, 23456, 78901, 45678, 12345, 67890, 34567, 89012
    ];
    this.chunkIndex = 0;
    
    // GPU monitoring data
    this.gpuTemp = 47;
    this.gpuPower = 109;
    this.gpuMemoryUsed = 9803;
    this.gpuUtil = 100;
    this.fanSpeed = 43;
    this.processId = 801640;
    
    this.init();
  }

  init() {
    this.setupTabs();
    this.mlContent = document.querySelector('.ml-content');
    if (!this.mlContent) {
      console.warn('ML content container not found');
      return;
    }
    this.updateContent();
    this.startSimulation();
  }

  setupTabs() {
    const mlWindow = document.querySelector('.ml-window');
    if (!mlWindow) return;
    
    // Create tab header
    const tabHeader = document.createElement('div');
    tabHeader.className = 'ml-tab-header';
    tabHeader.innerHTML = `
      <div class="ml-tab ${this.activeTab === 'training' ? 'active' : ''}" data-tab="training">Training</div>
      <div class="ml-tab ${this.activeTab === 'nvidia-smi' ? 'active' : ''}" data-tab="nvidia-smi">nvidia-smi</div>
    `;
    
    // Insert tab header at the beginning of ml-window
    mlWindow.insertBefore(tabHeader, mlWindow.firstChild);
    
    // Hide header and subtitle initially for cleaner look
    const subtitle = document.querySelector('.ml-subtitle');
    const header = document.querySelector('.ml-header');
    if (header) {
      header.style.display = 'none';
    }
    if (subtitle && this.activeTab === 'nvidia-smi') {
      subtitle.style.display = 'none';
    }
    
    // Add event listeners
    tabHeader.addEventListener('click', (e) => {
      if (e.target.classList.contains('ml-tab')) {
        this.switchTab(e.target.dataset.tab);
      }
    });
  }

  switchTab(tab) {
    this.activeTab = tab;
    
    // Update tab appearance
    document.querySelectorAll('.ml-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    
    // Show/hide subtitle and header based on active tab
    const subtitle = document.querySelector('.ml-subtitle');
    const header = document.querySelector('.ml-header');
    if (subtitle && header) {
      if (tab === 'nvidia-smi') {
        subtitle.style.display = 'none';
        header.style.display = 'none';
      } else {
        subtitle.style.display = 'block';
        header.style.display = 'none'; // Hide header completely for cleaner look
      }
    }
    
    // Update content
    this.updateContent();
  }

  startSimulation() {
    // Training tab updates every 3 seconds
    setInterval(() => {
      if (this.isRunning && this.activeTab === 'training') {
        this.updateContent();
      }
    }, 3000);
    
    // nvidia-smi tab updates every 0.5 seconds
    setInterval(() => {
      if (this.isRunning && this.activeTab === 'nvidia-smi') {
        this.updateContent();
      }
    }, 500);
  }

  updateContent() {
    if (!this.mlContent) return;
    
    // Clear existing content
    this.mlContent.innerHTML = '';
    
    if (this.activeTab === 'training') {
      this.generateTrainingOutput();
    } else if (this.activeTab === 'nvidia-smi') {
      this.generateNvidiaSmiOutput();
    }
    
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

  generateNvidiaSmiOutput() {
    // Update GPU stats with small random variations
    this.gpuTemp = Math.max(40, Math.min(60, this.gpuTemp + (Math.random() - 0.5) * 2));
    this.gpuPower = Math.max(100, Math.min(240, this.gpuPower + (Math.random() - 0.5) * 10));
    this.gpuMemoryUsed = Math.max(9700, Math.min(10200, this.gpuMemoryUsed + (Math.random() - 0.5) * 20));
    this.gpuUtil = Math.max(95, Math.min(100, this.gpuUtil + (Math.random() - 0.5) * 5));
    this.fanSpeed = Math.max(35, Math.min(60, this.fanSpeed + (Math.random() - 0.5) * 3));
    
    const currentTime = new Date();
    const timeStr = currentTime.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      year: 'numeric'
    });
    
    const output = `Every 0.5s: nvidia-smi                                                                  debian: ${timeStr}
${timeStr}
+---------------------------------------------------------------------------------------+
| NVIDIA-SMI 535.247.01             Driver Version: 535.247.01   CUDA Version: 12.2     |
|-----------------------------------------+----------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |         Memory-Usage | GPU-Util  Compute M. |
|                                         |                      |               MIG M. |
|=========================================+======================+======================|
|   0  NVIDIA CMP 90HX                On  | 00000000:01:00.0 Off |                  N/A |
| ${Math.floor(this.fanSpeed)}%   ${Math.floor(this.gpuTemp)}C    P0             ${Math.floor(this.gpuPower)}W / 250W |   ${Math.floor(this.gpuMemoryUsed)}MiB / 10240MiB |    ${Math.floor(this.gpuUtil)}%      Default |
|                                         |                      |                  N/A |
+-----------------------------------------+----------------------+----------------------+

+---------------------------------------------------------------------------------------+
| Processes:                                                                            |
|  GPU   GI   CI        PID   Type   Process name                            GPU Memory |
|        ID   ID                                                             Usage      |
|=======================================================================================|
|    0   N/A  N/A    ${this.processId}      C   python                                     ${Math.floor(this.gpuMemoryUsed) - 5}MiB |
+---------------------------------------------------------------------------------------+`;
    
    const preElement = document.createElement('pre');
    preElement.className = 'ml-line nvidia-smi-output';
    preElement.textContent = output;
    this.mlContent.appendChild(preElement);
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
