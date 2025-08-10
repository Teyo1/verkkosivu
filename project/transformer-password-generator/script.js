// Transformer Password Generator Project Page Scripts

document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effects to code blocks
    const codeBlocks = document.querySelectorAll('.code-block');
    codeBlocks.forEach(block => {
        block.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 212, 255, 0.2)';
        });
        
        block.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Add copy functionality to code blocks
    codeBlocks.forEach(block => {
        const code = block.querySelector('code');
        if (code) {
            const copyButton = document.createElement('button');
            copyButton.textContent = 'Copy';
            copyButton.className = 'copy-button';
            copyButton.style.cssText = `
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                background: var(--primary-color);
                color: var(--bg-primary);
                border: none;
                border-radius: 4px;
                padding: 0.25rem 0.5rem;
                font-size: 0.8rem;
                cursor: pointer;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            block.style.position = 'relative';
            block.appendChild(copyButton);
            
            block.addEventListener('mouseenter', () => {
                copyButton.style.opacity = '1';
            });
            
            block.addEventListener('mouseleave', () => {
                copyButton.style.opacity = '0';
            });
            
            copyButton.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(code.textContent);
                    copyButton.textContent = 'Copied!';
                    setTimeout(() => {
                        copyButton.textContent = 'Copy';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy: ', err);
                }
            });
        }
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add typing effect to project title
    const title = document.querySelector('.project-title');
    if (title) {
        const originalText = title.textContent;
        title.textContent = '';
        title.style.borderRight = '2px solid var(--primary-color)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                title.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                title.style.borderRight = 'none';
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Add particle effect to tech tags
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
            this.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.5)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = 'none';
        });
    });

    // Add progress indicator for architecture layers
    const layers = document.querySelectorAll('.layer');
    layers.forEach((layer, index) => {
        layer.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(90deg, var(--primary-color) 0%, var(--accent-color) 100%)';
            this.style.color = 'var(--bg-primary)';
            this.style.transform = 'translateX(10px) scale(1.02)';
        });
        
        layer.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(90deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)';
            this.style.color = 'var(--text-primary)';
            this.style.transform = 'translateX(0) scale(1)';
        });
    });

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--gradient-primary);
        z-index: 1000;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K to scroll to top
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        // Ctrl/Cmd + L to scroll to bottom
        if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
            e.preventDefault();
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }
    });

    // Add console message
    console.log(`
🔐 Transformer Password Generator
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Character-level AI model for password generation
Built with PyTorch, CUDA, and modern web technologies

GitHub: https://github.com/teyo1
Portfolio: https://teyo1.github.io/verkkosivu/

Happy coding! 🚀
    `);
});
