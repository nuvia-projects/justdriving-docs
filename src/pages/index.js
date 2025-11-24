import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function Hero() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className="hero hero--primary" style={{padding: '4rem 0'}}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div style={{display: 'flex', gap: '1rem', marginTop: '1.25rem'}}>
          <Link className="button button--secondary button--lg" to="/docs/intro">
            Get started
          </Link>
          <Link className="button button--outline button--lg" to="https://github.com/your/repo">
            GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}

function Features() {
  const items = [
    {
      title: 'Fast, MDX-first',
      description:
        'Write in Markdown/MDX, add React when needed, and publish polished docs quickly.',
    },
    {
      title: 'Beautiful by default',
      description:
        'Classic theme, Infima design system, and built-in dark mode keep things consistent.',
    },
    {
      title: 'Production-ready',
      description:
        'Versioning, search, i18n, and a rich plugin ecosystem for serious docs sites.',
    },
  ];

  return (
    <section className="container" style={{padding: '3rem 0'}}>
      <div className="row">
        {items.map((it, i) => (
          <div className="col col--4" key={i}>
            <div className="card" style={{height: '100%'}}>
              <div className="card__header">
                <h3>{it.title}</h3>
              </div>
              <div className="card__body">
                <p>{it.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="hero" style={{padding: '3rem 0'}}>
      <div className="container" style={{textAlign: 'center'}}>
        <h2 style={{marginBottom: '0.5rem'}}>Build your docs faster</h2>
        <p style={{marginBottom: '1rem', opacity: 0.85}}>
          Start with a great default, customize when you need, and scale as your product grows.
        </p>
        <Link className="button button--primary button--lg" to="/docs/intro">
          Read the docs
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <Hero />
      <main>
        <Features />
        <CTA />
      </main>
    </Layout>
  );
}
