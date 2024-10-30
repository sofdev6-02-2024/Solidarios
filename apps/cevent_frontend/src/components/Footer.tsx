import React from 'react';
import styles from '@/styles/components/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div>
        <h1>Cvent</h1>
        <h2>
          Discover and organize events with ease through our events app,
          designed to connect people with unique experiences in your city and
          beyond. Our platform allows users to explore a wide variety of events,
          from concerts and exhibitions to conferences and outdoor activities.
        </h2>
      </div>
      <div>
        <h1>Contacto</h1>
        <h2>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#FFF', textDecoration: 'none' }}
          >
            Facebook
          </a>
        </h2>
        <h2>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#FFF', textDecoration: 'none' }}
          >
            Instagram
          </a>
        </h2>
        <h2>
          <a
            href="mailto:your-email@example.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#FFF', textDecoration: 'none' }}
          >
            Email
          </a>
        </h2>
      </div>
      <div>
        <h1>Información</h1>
        <h2>
          <a href="/terms" style={{ color: '#FFF', textDecoration: 'none' }}>
            Términos de Uso
          </a>
        </h2>
        <h2>
          <a href="/privacy" style={{ color: '#FFF', textDecoration: 'none' }}>
            Política de Privacidad
          </a>
        </h2>
        <h2>
          <a href="/about" style={{ color: '#FFF', textDecoration: 'none' }}>
            Sobre Nosotros
          </a>
        </h2>
      </div>
    </div>
  );
};

export default Footer;
