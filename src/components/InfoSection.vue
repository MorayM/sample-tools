<template>
  <div class="info-section">
    <div class="info-section__header">
      <h2 class="info-section__title">Frequently Asked Questions</h2>
      <p class="info-section__subtitle">
        Everything you need to know about these tools
      </p>
    </div>

    <div class="faq-grid">
      <div class="faq-item">
        <div class="faq-item__icon">🎯</div>
        <h3 class="faq-item__question">What does this do?</h3>
        <p class="faq-item__answer">
          This tool extracts loop points from WAV file metadata and generates
          preset files for popular sampler formats (SFZ and Decent Sampler).
          Perfect for music producers working with sample libraries!
        </p>
      </div>

      <div class="faq-item">
        <div class="faq-item__icon">🚀</div>
        <h3 class="faq-item__question">How does it work?</h3>
        <p class="faq-item__answer">
          Simply drag and drop your WAV files into the drop zone above or click
          "Choose Files". The tool will automatically detect loop points and
          generate ready-to-use preset files.
        </p>
      </div>

      <div class="faq-item">
        <div class="faq-item__icon">🔒</div>
        <h3 class="faq-item__question">Is my data safe?</h3>
        <p class="faq-item__answer">
          Absolutely! This tool runs entirely in your browser. Your samples
          never leave your computer - everything is processed locally for
          maximum privacy and security.
        </p>
      </div>

      <div class="faq-item">
        <div class="faq-item__icon">📱</div>
        <h3 class="faq-item__question">Why a browser tool?</h3>
        <p class="faq-item__answer">
          Browser tools work on any device without installation. No need to
          download software or worry about compatibility - just open and use!
        </p>
      </div>

      <div class="faq-item">
        <div class="faq-item__icon">👨‍💻</div>
        <h3 class="faq-item__question">Who made this?</h3>
        <p class="faq-item__answer">
          Hi! I'm
          <a href="https://moray.dev" target="_blank">Moray Macdonald</a>. I
          make music as
          <a href="https://cephid.world" target="_blank">Cephid</a>
          and built this tool to streamline my own workflow. Hope it helps you
          too!
        </p>
      </div>

      <div class="faq-item">
        <div class="faq-item__icon">☕</div>
        <h3 class="faq-item__question">Found this useful?</h3>
        <p class="faq-item__answer">
          That's wonderful to hear! If you'd like to support this project, you
          can
          <a href="https://paypal.me/moraymacdonald" target="_blank"
            >buy me a tea</a
          >
          or
          <a href="https://github.com/MorayM/sample-tools" target="_blank"
            >star it on GitHub</a
          >.
        </p>
      </div>
    </div>

    <div class="info-section__footer">
      <p class="info-section__footer-text">
        Need help or found a bug?
        <a href="https://github.com/MorayM/sample-tools" target="_blank">
          Report it on GitHub
        </a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// No script needed for this component
</script>

<style scoped>
.info-section {
  margin-top: 4rem;
  padding: 2rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 20px;
}

.info-section__header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 0 2rem;
}

.info-section__title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.info-section__subtitle {
  font-size: 1.1rem;
  color: #6b7280;
  margin: 0;
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  padding: 0 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.faq-item {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.faq-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.faq-item__icon {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.faq-item__question {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
}

.faq-item__answer {
  font-size: 0.95rem;
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
}

.faq-item__answer a {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.faq-item__answer a:hover {
  color: #5a67d8;
  text-decoration: underline;
}

.info-section__footer {
  text-align: center;
  margin-top: 3rem;
  padding: 0 2rem;
}

.info-section__footer-text {
  color: #6b7280;
  font-size: 0.95rem;
  margin: 0;
}

.info-section__footer-text a {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.info-section__footer-text a:hover {
  color: #5a67d8;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .faq-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0 1rem;
  }

  .info-section__header {
    padding: 0 1rem;
  }

  .faq-item {
    padding: 1.25rem;
  }

  .info-section__footer {
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .info-section {
    margin-top: 3rem;
    border-radius: 16px;
  }

  .info-section__title {
    font-size: 1.5rem;
  }

  .faq-item {
    padding: 1rem;
  }
}
</style>
