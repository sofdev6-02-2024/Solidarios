import React from 'react';
import styles from '@/styles/components/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div>
        <h1>Cvent</h1>
        <h2>
          Descripción sobre qué es Cvent, Descripción sobre qué es Cvent,
          Descripción sobre qué es Cvent ,Descripción sobre qué es Cvent
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
        <h2>Subinfo</h2>
        <h2>Subinfo</h2>
        <h2>Subinfo</h2>
      </div>
    </div>
  );
};

export default Footer;
