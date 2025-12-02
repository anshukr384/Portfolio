import React, { useRef, useEffect, useState } from 'react';
import LightRays from './components/LightRays';
import './App.css';

interface NavLink {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const App: React.FC = () => {
  const [currentTime, setCurrentTime] = useState('00:00 GMT+5:30');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const navLinks: NavLink[] = [
    {
      id: 'about',
      title: 'About',
      description: 'you can call me Anshu',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    },
    {
      id: 'work',
      title: 'Work',
      description: 'experiments & projects',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 3h-2V2h-4v1H8"></path>
        </svg>
      )
    },
    {
      id: 'library',
      title: 'Library',
      description: "Anshu's library",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      )
    },
    {
      id: 'contact',
      title: 'Contact',
      description: "let's connect",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      )
    },
    {
      id: 'resume',
      title: 'Resume',
      description: 'Look at my resume',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="12" y1="11" x2="12" y2="17"></line>
          <line x1="9" y1="14" x2="15" y2="14"></line>
        </svg>
      )
    }
  ];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Kolkata'
      });
      const time = formatter.format(now);
      setCurrentTime(`${time} GMT+5:30`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 60;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    if (searchInputRef.current) {
      searchInputRef.current.blur();
      searchInputRef.current.value = '';
    }
  };

  const handleResultClick = (sectionId: string) => {
    scrollToSection(sectionId);
  };

  return (
    <main className="container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Anshu Kumar</h1>

          {/* Search Navigation Component */}
          <div className="search-container">
            <input
              ref={searchInputRef}
              type="text"
              className="search-input"
              placeholder="What's up?"
              autoComplete="off"
            />

            {/* Search Results / Navigation Menu */}
            <div className="search-results">
              {navLinks.map((link) => (
                <div
                  key={link.id}
                  className="result-item"
                  onClick={() => handleResultClick(link.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleResultClick(link.id);
                    }
                  }}
                >
                  <div className="result-icon">{link.icon}</div>
                  <div className="result-content">
                    <div className="result-title">{link.title}</div>
                    <div className="result-description">{link.description}</div>
                  </div>
                </div>
              ))}

              <div className="search-footer">
                <span className="footer-text">Enjoy your Saturday!</span>
                <span className="footer-time">{currentTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="section-content">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">Pixels • Product • People • Pizza</p>
          <div className="about-text">
            <p>
              Hi! I'm Anshu, a data analyst and developer with a passion for building innovative solutions.
              I specialize in turning complex data into actionable insights and creating intuitive user experiences.
            </p>
            <p>
              Throughout my journey, I've been guided by a simple belief: technology should feel natural and intuitive.
              When not in front of a digital screen, you'll probably find me exploring new things or contributing to open-source projects.
            </p>
          </div>
          <div className="about-meta">
            <div className="meta-item">
              <span className="meta-label">Currently Based In</span>
              <span className="meta-value">India</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Education</span>
              <span className="meta-value">LPU</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Passionate About</span>
              <span className="meta-value">Data • Analytics • Problem Solving</span>
            </div>
          </div>
        </div>
      </section>

      {/* Experiments Section */}
      <section id="work" className="section experiments-section">
        <div className="section-content">
          <h2 className="section-title">Projects</h2>
          <div className="projects-grid">
            {['Data Dashboard', 'Analytics Engine', 'Portfolio Website', 'Data Insights Tool', 'Business Analytics', 'Web Application'].map((title, i) => (
              <div key={i} className="project-card">
                <div className="project-placeholder">Project {i + 1}</div>
                <h3 className="project-title">{title}</h3>
                <p className="project-description">
                  {i === 0 && 'Interactive data visualization platform with real-time analytics.'}
                  {i === 1 && 'Machine learning-powered customer behavior prediction system.'}
                  {i === 2 && 'Modern portfolio built with TypeScript and vanilla JavaScript.'}
                  {i === 3 && 'AI-powered tool for automatic insight generation from datasets.'}
                  {i === 4 && 'Comprehensive analytics solution for tracking KPIs and metrics.'}
                  {i === 5 && 'Full-stack application with data visualization and reporting.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Library Section (renamed from Achievements) */}
      <section id="library" className="section achievements-section">
        <div className="section-content">
          <h2 className="section-title">Anshu's Library</h2>
          <div className="achievements-list">
            {[
              { icon: '🏆', title: 'Hackathon Winner', desc: 'First place in Data Analytics Challenge 2024' },
              { icon: '⭐', title: 'Open Source Contributor', desc: 'Active contributor to multiple data science projects' },
              { icon: '📜', title: 'Certifications', desc: 'Advanced Data Analytics & Business Intelligence' },
              { icon: '🎓', title: 'Academic Excellence', desc: 'Dean\'s List & Merit Scholarship Recipient' }
            ].map((achievement, i) => (
              <div key={i} className="achievement-item">
                <span className="achievement-icon">{achievement.icon}</span>
                <div className="achievement-content">
                  <h3 className="achievement-title">{achievement.title}</h3>
                  <p className="achievement-description">{achievement.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="section-content">
          <h2 className="section-title">Contact</h2>
          <p className="contact-subtitle">Let's collaborate! I'm always interested in new projects and opportunities. Feel free to reach out.</p>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input 
                type="text" 
                id="name" 
                className="form-input" 
                placeholder="Your name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input 
                type="email" 
                id="email" 
                className="form-input" 
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea 
                id="message" 
                className="form-textarea" 
                placeholder="Your message here..."
                rows={6}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Anshu Kumar. Stay hydrated y'all 💧</p>
      </footer>

      {/* Vertical Social Icons Navigation Bar - Left Side */}
      <nav className="social-navbar">
        <div className="social-icons-container">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-icon" title="GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" aria-label="LeetCode" className="social-icon" title="LeetCode">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.102 17.93h2.747v-5.92h5.486v-2.202h-5.486v-5.91h-2.747v5.91h-5.488v2.202h5.488zm-6.14 0h2.747v-4.464h4.753v-2.202h-4.753v-4.464h-2.747zm-6.041 0h2.747v-11.52h-2.747z"/>
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon" title="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a href="mailto:contact@example.com" aria-label="Email" className="social-icon" title="Email">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </a>
        </div>
      </nav>
    </main>
  );
};

export default App;
