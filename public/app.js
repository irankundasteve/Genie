import React, { useMemo, useState } from 'https://esm.sh/react@18.3.1';
import { createRoot } from 'https://esm.sh/react-dom@18.3.1/client';

const e = React.createElement;

const navLinks = [
  ['Home', 'home'], ['Features', 'features'], ['Pricing', 'pricing'], ['Solutions', 'solutions'],
  ['Documentation', 'docs'], ['Blog', 'blog'], ['About', 'about'], ['Contact', 'contact'], ['Status', 'status']
];

const legalLinks = [['Privacy Policy', 'privacy'], ['Terms of Service', 'terms'], ['AI Ethics', 'ethics'], ['Cookie Policy', 'cookies']];
const genericDomains = ['gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com'];

const pagePurposes = [
  ['Homepage', 'Present Genie’s value proposition and drive sign-ups.'],
  ['Features', 'Explain Genie’s AI capabilities and product strengths.'],
  ['Pricing', 'Compare Free, Pro, and Enterprise plans to drive conversion.'],
  ['Solutions', 'Show industry-specific applications and measurable value.'],
  ['Documentation', 'Provide technical guides, API docs, and onboarding help.'],
  ['Blog', 'Publish AI insights, updates, and SEO content.'],
  ['About', 'Share Genie’s story, mission, vision, and team credibility.'],
  ['Contact', 'Handle enterprise and support inquiries with clear validation.'],
  ['Status', 'Display uptime, service health, and incident transparency.']
  ,['Login / Sign-Up', 'Authenticate users with email/password or social SSO.']
  ,['Dashboard Overview', 'Give users a quick snapshot of bot activity and performance.']
  ,['Chatbot Builder', 'Let users customize bot behavior, style, and AI model settings.']
  ,['Knowledge Base', 'Upload files/URLs and monitor training progress.']
  ,['Integrations Gallery', 'Connect Genie with third-party tools and platforms.']
  ,['Conversation Logs', 'Search, review, and manage chatbot conversation history.']
  ,['Advanced Analytics', 'Explore paid-tier performance insights and reports.']
  ,['Live Chat / Handoff', 'Take over AI conversations with human support in real time.']
  ,['Account Settings', 'Manage profile data, API keys, and personal preferences.']
  ,['Billing & Subscription', 'Manage plans, payment methods, and invoices.']
  ,['Legal & Compliance', 'Provide transparent policies for privacy, terms, ethics, and cookies.']
  ,['Admin Panel', 'Manage dynamic site content without technical complexity.']
];

const appNavLinks = [
  ['Dashboard', 'dashboard'],
  ['Chatbot Builder', 'builder'],
  ['Knowledge Base', 'knowledge'],
  ['Integrations', 'integrations'],
  ['Logs', 'logs'],
  ['Analytics', 'analytics'],
  ['Live Chat', 'livechat'],
  ['Account', 'account'],
  ['Billing', 'billing'],
  ['Admin Panel', 'admin']
];

function routeFromHash() { return (window.location.hash || '#home').replace('#', ''); }

function Header({ currentRoute, mobileOpen, onToggleMobile, onNavigate }) {
  return e('header', { className: 'navbar' },
    e('a', { href: '#home', className: 'logo', onClick: () => onNavigate('home') }, 'Genie'),
    e('nav', { className: `nav-links ${mobileOpen ? 'open' : ''}` },
      ...navLinks.map(([label, route]) => e('a', {
        key: route, href: `#${route}`, className: currentRoute === route ? 'active' : '', onClick: () => onNavigate(route)
      }, label)),
      e('a', { href: '#auth', className: 'login-btn' }, '👤 Access account')
    ),
    e('button', { className: 'hamburger', onClick: onToggleMobile, 'aria-label': 'Toggle menu' }, '☰')
  );
}

function Hero({ title, subtitle }) {
  return e('section', { className: 'hero' },
    e('h1', null, title),
    e('p', null, subtitle),
    e('div', { className: 'cta-row' },
      e('a', { className: 'btn btn-accent', href: '#auth' }, '🚀 Start using Genie'),
      e('a', { className: 'btn btn-primary', href: '#demo' }, '👁 Preview demo')
    ),
    e('small', null, 'No credit card required')
  );
}

function SharedComparison({ title = 'Before vs After AI Adoption', left = 'Before: slower support, fragmented tools.', right = 'After: Genie-powered automation and faster responses.' }) {
  const [comparison, setComparison] = useState(50);
  return e('section', { className: 'comparison' },
    e('h2', null, title),
    e('input', { type: 'range', min: 0, max: 100, value: comparison, onChange: (ev) => setComparison(Number(ev.target.value)) }),
    e('div', { className: 'comparison-panels' },
      e('div', { style: { width: `${100 - comparison}%` } }, left),
      e('div', { style: { width: `${comparison}%` } }, right)
    )
  );
}

function HomePage({ email, setEmail, isValidEmail, submitNewsletter, newsletterState }) {
  const [openFaq, setOpenFaq] = useState(-1);
  const faq = [
    ['What makes Genie different?', 'Genie combines deep reasoning, long context, and multimodal understanding in one assistant.'],
    ['Can I use Genie for coding and research?', 'Yes. Genie is tuned for coding, academics, and complex creative workflows.'],
    ['Is it safe for 13+ users?', 'Yes. Genie enforces stricter safety filtering with friendly assistant behavior.']
  ];

  return e('main', null,
    e(Hero, { title: 'Talk to your AI, instantly.', subtitle: 'Genie answers questions, automates tasks, and learns with you.' }),
    e('section', { className: 'live-preview' }, e('h3', null, 'Live Preview Widget'), e('p', null, 'User: Summarize this 120-page report into action items.'), e('span', null, 'Genie: Done. I identified 7 high-impact priorities and generated a weekly execution roadmap...')),
    e('section', { className: 'logos' }, e('p', null, 'Trusted by'), e('div', { className: 'carousel' }, ...['Nova', 'Orbit', 'Flux', 'Kite', 'Pixel'].map((l) => e('span', { key: l }, l)))),
    e('section', { className: 'features' }, ...[
      ['Advanced Reasoning', 'Up to 32k thinking budget for multi-step logic and precise outcomes.'],
      ['1M+ Context Window', 'Read large documents or codebases without losing context.'],
      ['Multimodal Native', 'Analyze text, images, voice, and documents together.']
    ].map(([h, p]) => e('article', { key: h, className: 'card' }, e('h3', null, h), e('p', null, p)))),
    e(SharedComparison, {}),
    e('section', { className: 'faq' }, e('h2', null, 'FAQ'), ...faq.map(([q, a], idx) => e('div', { key: q, className: 'faq-item' }, e('button', { onClick: () => setOpenFaq(openFaq === idx ? -1 : idx) }, q), openFaq === idx ? e('p', null, a) : null))),
    e('section', { className: 'newsletter' },
      e('h2', null, 'Early Access'),
      e('form', { onSubmit: submitNewsletter }, e('input', { type: 'email', value: email, onChange: (ev) => setEmail(ev.target.value), placeholder: 'Email Address', required: true }), e('button', { className: 'btn btn-primary', type: 'submit' }, '🚀 Join')),
      e('p', { className: isValidEmail ? 'valid' : 'invalid' }, email ? (isValidEmail ? '✓ Valid email format' : '✗ Invalid email format') : 'Type your email for inline validation.'),
      newsletterState === 'success' ? e('p', { className: 'valid' }, 'Success!') : null,
      newsletterState === 'error' ? e('p', { className: 'invalid' }, 'Please provide a valid non-duplicate email.') : null
    )
  );
}

function FeaturesPage() {
  const [tab, setTab] = useState('core');
  const tabData = {
    core: ['Core Tech', 'Reasoning, NLP accuracy, and multilingual response quality.'],
    integrations: ['Integrations', 'Connect Genie to workflows, data sources, and support stacks.'],
    security: ['Security', 'Guardrails, policy controls, and enterprise safety defaults.']
  };
  return e('main', null,
    e(Hero, { title: 'What Genie Can Do', subtitle: 'High-performance AI capabilities for speed, quality, and multilingual intelligence.' }),
    e('section', { className: 'tabs' },
      e('div', { className: 'tab-buttons' }, ...Object.entries(tabData).map(([id, [label]]) => e('button', { key: id, className: tab === id ? 'active-tab' : '', onClick: () => setTab(id) }, label))),
      e('div', { className: 'tab-panel fade-in' }, e('h3', null, tabData[tab][0]), e('p', null, tabData[tab][1]), e('p', { className: 'lottie' }, '✨ Lottie-style hover animation placeholder'))
    ),
    e(SharedComparison, {}),
    e('section', { className: 'features' }, ...[
      ['NLP Precision', 'Better intent understanding and context retention.'],
      ['Response Speed', 'Optimized throughput for faster user replies.'],
      ['Multi-Language', 'Natural, localized responses for global audiences.'],
      ['Automation', 'Actionable outputs for operations and support.']
    ].map(([h, p]) => e('article', { key: h, className: 'card with-hover' }, e('h3', null, h), e('p', null, p)))),
    e('section', { className: 'quotes' }, ...['“Genie reduced our response time by 63% in two weeks.”', '“The quality jump in multilingual support was immediate.”'].map((q) => e('blockquote', { key: q, className: 'card' }, q))),
    e('div', { className: 'center' }, e('a', { className: 'btn btn-accent', href: '#auth' }, '⚡ Start with Genie'))
  );
}

function PricingPage() {
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState(-1);
  const plans = [
    ['free', 'Free', yearly ? '$0' : '$0', ['Basic chatbot', 'Community support']],
    ['pro', 'Pro', yearly ? '$24/mo' : '$29/mo', ['Advanced analytics', 'Live handoff', 'Priority support']],
    ['enterprise', 'Enterprise', yearly ? 'Custom (save 20%)' : 'Custom', ['SLA', 'Security controls', 'Dedicated success manager']]
  ];

  return e('main', null,
    e(Hero, { title: 'Choose the plan that’s right for you', subtitle: 'Simple tiers for solo builders to global teams.' }),
    e('section', { className: 'toggle-row' }, e('span', null, 'Monthly'), e('button', { className: `toggle ${yearly ? 'on' : ''}`, onClick: () => setYearly(!yearly), 'aria-label': 'Toggle billing cycle' }), e('span', null, 'Yearly'), yearly ? e('strong', { className: 'discount' }, 'Save 20%') : null),
    e('section', { className: 'pricing-grid' }, ...plans.map(([id, name, price, features]) => e('article', { key: id, className: 'card pricing-card' }, e('h3', null, name), e('p', { className: 'price' }, price), e('ul', null, ...features.map((feature) => e('li', { key: feature }, `${feature} ⓘ`))), e('a', { className: 'btn btn-accent', href: `#signup?plan=${id}` }, 'Select Plan')))),
    e('section', { className: 'faq' }, e('h2', null, 'Pricing FAQ'), ...[
      ['Can I cancel anytime?', 'Yes, subscriptions can be canceled from billing settings.'],
      ['Do yearly plans include discounts?', 'Yes, yearly billing includes a discounted effective monthly rate.']
    ].map(([q, a], idx) => e('div', { key: q, className: 'faq-item' }, e('button', { onClick: () => setOpenFaq(openFaq === idx ? -1 : idx) }, q), openFaq === idx ? e('p', null, a) : null)))
  );
}

function SolutionsPage() {
  return e('main', null,
    e(Hero, { title: 'Genie for Every Industry', subtitle: 'Use-case driven AI workflows for support, education, e-commerce, and SaaS.' }),
    e('section', { className: 'features' }, ...[
      ['Education', 'Automate tutoring plans and study flows.'],
      ['E-commerce', 'Deliver high-accuracy product support at scale.'],
      ['Healthcare Ops', 'Summarize documents and route patient queries responsibly.'],
      ['SaaS', 'Resolve onboarding and technical FAQs faster.']
    ].map(([h, p]) => e('article', { key: h, className: 'card with-hover' }, e('h3', null, h), e('p', null, p), e('a', { href: '#auth' }, 'Learn More')))),
    e(SharedComparison, { title: 'Case Study Impact', left: 'Before: 14h avg. first-response delay.', right: 'After: 2h avg. first-response + higher CSAT.' }),
    e('section', { className: 'quotes' }, e('blockquote', { className: 'card' }, '“Genie transformed how we manage support spikes.”'), e('blockquote', { className: 'card' }, '“Our onboarding completion rates improved by 31%.”'))
  );
}

function DocsPage() {
  const [tab, setTab] = useState('start');
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);

  const docs = {
    start: ['Getting Started', ['Create an account', 'Configure your first bot', 'Launch your first workflow']],
    api: ['API Reference', ['Authentication', 'Chat completion endpoint', 'Streaming responses']],
    tutorials: ['Tutorials', ['Build a study assistant', 'Set up live handoff', 'Deploy multilingual support']],
    faq: ['FAQs', ['Billing questions', 'Safety and moderation', 'Troubleshooting guide']]
  };

  const suggestions = useMemo(() => {
    if (!query) return [];
    return docs[tab][1].filter((item) => item.toLowerCase().includes(query.toLowerCase())).slice(0, 3);
  }, [query, tab]);

  const codeSample = `curl -X POST https://api.genie.ai/v1/chat \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"genie-pro","input":"Hello Genie"}'`;

  return e('main', null,
    e(Hero, { title: 'Everything You Need to Get Started', subtitle: 'Guides, API docs, tutorials, and FAQs to use Genie efficiently.' }),
    e('section', { className: 'search-wrap' },
      e('input', { type: 'text', placeholder: 'Search documentation / API topics', value: query, onChange: (ev) => setQuery(ev.target.value) }),
      suggestions.length ? e('div', { className: 'suggestions' }, ...suggestions.map((s) => e('p', { key: s }, s))) : null
    ),
    e('section', { className: 'tabs' },
      e('div', { className: 'tab-buttons' }, ...Object.entries({ start: 'Getting Started', api: 'API Reference', tutorials: 'Tutorials', faq: 'FAQs' }).map(([id, label]) => e('button', { key: id, className: tab === id ? 'active-tab' : '', onClick: () => setTab(id) }, label))),
      e('div', { className: 'tab-panel fade-in' }, e('h3', null, docs[tab][0]), ...docs[tab][1].map((item) => e('article', { key: item, className: 'card' }, e('h4', null, item), e('p', null, 'Read more →'))))
    ),
    e('section', { className: 'code-sample' },
      e('h2', null, 'API Example'), e('pre', null, e('code', null, codeSample)),
      e('button', { className: 'btn btn-primary', onClick: async () => { await navigator.clipboard.writeText(codeSample); setCopied(true); setTimeout(() => setCopied(false), 1200); } }, 'Copy'),
      copied ? e('span', { className: 'valid' }, 'Copied!') : null
    )
  );
}

function BlogPage() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const posts = [
    { title: 'How Genie Handles Multi-Step Reasoning', tag: 'AI News', excerpt: 'A look inside deep-think reasoning and practical outcomes.' },
    { title: 'Tutorial: Build a Study Assistant in 10 Minutes', tag: 'Tutorials', excerpt: 'Step-by-step setup using Genie prompts and workflows.' },
    { title: 'Product Update: Faster Responses in Pro Tier', tag: 'Product Updates', excerpt: 'Performance improvements for high-concurrency chats.' },
    { title: 'Prompt Patterns for Better Accuracy', tag: 'Tutorials', excerpt: 'Reusable prompt structures for coding and research tasks.' }
  ];

  const filtered = posts.filter((p) => (category === 'All' || p.tag === category) && `${p.title} ${p.excerpt}`.toLowerCase().includes(query.toLowerCase()));
  const featured = filtered[0] || posts[0];

  return e('main', null,
    e(Hero, { title: 'Insights & Updates from Genie', subtitle: 'Explore news, tutorials, and AI insights.' }),
    e('section', { className: 'card featured-card with-hover' },
      e('div', { className: 'article-image' }, 'Featured'),
      e('h3', null, featured.title),
      e('p', null, featured.excerpt),
      e('a', { href: '#', className: 'btn btn-primary' }, 'Read Full Article')
    ),
    e('section', { className: 'filter-row' },
      e('div', { className: 'tab-buttons' }, ...['All', 'AI News', 'Tutorials', 'Product Updates'].map((item) => e('button', { key: item, className: category === item ? 'active-tab' : '', onClick: () => setCategory(item) }, item))),
      e('input', { type: 'text', className: 'search-inline', value: query, placeholder: 'Search blog content', onChange: (ev) => setQuery(ev.target.value) })
    ),
    e('section', { className: 'article-grid fade-in' }, ...filtered.map((post) => e('article', { key: post.title, className: 'card with-hover' },
      e('div', { className: 'article-image small' }, post.tag), e('h3', null, post.title), e('p', null, post.excerpt), e('a', { href: '#', className: 'read-link' }, 'Read Full Article')
    ))),
    e('div', { className: 'center' }, e('a', { className: 'btn btn-accent', href: '#auth' }, '⚡ Join Genie'))
  );
}

function AboutPage() {
  return e('main', null,
    e(Hero, { title: 'Meet Genie', subtitle: 'We build high-intelligence AI tools that feel like your smartest friend.' }),
    e('section', { className: 'timeline' }, ...[
      ['2023', 'Genie concept formed around deep reasoning for students and creators.'],
      ['2024', 'Launched beta with long-context chat and multimodal support.'],
      ['2025', 'Expanded global rollout with stronger safety controls for 13+ users.']
    ].map(([year, text]) => e('article', { key: year, className: 'card with-hover' }, e('h3', null, year), e('p', null, text)))),
    e('section', { className: 'team-grid' }, ...[
      ['Alex N.', 'Founder', 'AI systems builder focused on reliability and UX.'],
      ['Maya R.', 'Product Lead', 'Designs features for real-world productivity gains.'],
      ['Jon K.', 'Safety Lead', 'Owns policy, moderation, and trust guardrails.']
    ].map(([name, role, bio]) => e('article', { key: name, className: 'card team-card' }, e('div', { className: 'avatar' }, name.split(' ').map((p) => p[0]).join('')), e('h3', null, name), e('p', null, role), e('small', null, bio), e('div', { className: 'overlay' }, 'LinkedIn • GitHub')))),
    e('section', { className: 'values-grid' }, ...[
      ['🧠', 'Intelligence', 'Advanced reasoning with practical clarity.'],
      ['🤝', 'Friendliness', 'Helpful tone without sounding robotic.'],
      ['🛡️', 'Safety', 'Strong safeguards for healthier AI interactions.']
    ].map(([icon, title, body]) => e('article', { key: title, className: 'card with-hover' }, e('h3', null, `${icon} ${title}`), e('p', null, body)))),
    e('div', { className: 'center' }, e('a', { className: 'btn btn-accent', href: '#auth' }, '⚡ Build with Genie'))
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', useCase: '', chats: '1000+', message: '' });
  const [status, setStatus] = useState('idle');

  const validations = useMemo(() => {
    const emailOk = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email);
    const domain = form.email.split('@')[1]?.toLowerCase() || '';
    const workEmail = emailOk && !genericDomains.includes(domain);
    const msgOk = !form.message || form.message.length >= 10;
    return {
      name: form.name.length > 1,
      email: workEmail,
      company: form.company.length > 1,
      useCase: !!form.useCase,
      chats: !!form.chats,
      message: msgOk,
      all: form.name.length > 1 && workEmail && form.company.length > 1 && !!form.useCase && !!form.chats && msgOk
    };
  }, [form]);

  function submit(ev) {
    ev.preventDefault();
    setStatus(validations.all ? 'success' : 'error');
  }

  function field(label, key, type = 'text', placeholder = '') {
    const ok = validations[key];
    return e('label', { className: 'field' },
      e('span', null, label),
      e('div', { className: `inline-check ${ok ? 'ok' : 'bad'}` },
        e('input', { type, value: form[key], placeholder, onChange: (ev) => setForm({ ...form, [key]: ev.target.value }) }),
        e('strong', null, ok ? '✓' : '✗')
      )
    );
  }

  return e('main', null,
    e(Hero, { title: 'Get in Touch with Genie', subtitle: 'We’re here to help you succeed with AI.' }),
    e('section', { className: 'contact-info-grid' },
      e('a', { className: 'card with-hover', href: 'mailto:irankundasteve22@gmail.com' }, e('h3', null, 'Support Email'), e('p', null, 'irankundasteve22@gmail.com')),
      e('a', { className: 'card with-hover', href: 'tel:+25767622353' }, e('h3', null, 'Phone'), e('p', null, '+25767622353'))
    ),
    e('section', { className: 'card' },
      e('h2', null, 'Enterprise Inquiry Form'),
      e('form', { className: 'contact-form', onSubmit: submit },
        field('Full Name*', 'name', 'text', 'Jane Doe'),
        field('Work Email*', 'email', 'email', 'you@company.com'),
        field('Company Name*', 'company', 'text', 'Acme Inc.'),
        e('label', { className: 'field' }, e('span', null, 'Bot Use Case*'), e('select', { value: form.useCase, onChange: (ev) => setForm({ ...form, useCase: ev.target.value }) }, e('option', { value: '' }, 'Select use case'), e('option', { value: 'support' }, 'Customer Support'), e('option', { value: 'sales' }, 'Sales Assistant'), e('option', { value: 'education' }, 'Education / Study'))),
        e('label', { className: 'field' }, e('span', null, 'Estimated Monthly Chats*'), e('select', { value: form.chats, onChange: (ev) => setForm({ ...form, chats: ev.target.value }) }, ...['1k', '5k', '10k', '50k+'].map((v) => e('option', { key: v, value: v }, v)))),
        e('label', { className: 'field' }, e('span', null, 'Message (optional, min 10 chars)'), e('textarea', { rows: 4, value: form.message, onChange: (ev) => setForm({ ...form, message: ev.target.value }) })),
        e('button', { className: 'btn btn-accent', type: 'submit' }, 'Submit Inquiry')
      ),
      status === 'success' ? e('p', { className: 'valid fade-in' }, 'Inquiry submitted successfully.') : null,
      status === 'error' ? e('p', { className: 'invalid fade-in' }, 'Please correct highlighted fields. Work email cannot be a generic domain.') : null
    ),
    e('section', { className: 'card center' }, e('h3', null, 'Map / Visual Placeholder'), e('p', null, 'Global-first support for the Genie community.')),
    e('div', { className: 'center' }, e('a', { className: 'btn btn-accent', href: '#auth' }, '⚡ Start with Genie'))
  );
}

function StatusPage() {
  const services = [
    ['API Gateway', 'Operational', '2 mins ago'],
    ['Chatbot Engine', 'Operational', '2 mins ago'],
    ['Dashboard', 'Degraded', '5 mins ago'],
    ['Integrations', 'Operational', '3 mins ago']
  ];
  const [open, setOpen] = useState(-1);
  const incidents = [
    ['2026-03-04', 'Dashboard latency spike', 'Resolved in 24 minutes after scaling worker pool.'],
    ['2026-02-27', 'Webhook retry delays', 'Resolved with queue tuning and backoff adjustment.']
  ];

  const overall = services.some(([, s]) => s === 'Outage') ? 'outage' : services.some(([, s]) => s === 'Degraded') ? 'degraded' : 'operational';
  const overallText = overall === 'operational' ? 'All systems operational' : overall === 'degraded' ? 'Some systems degraded' : 'Major outage';

  return e('main', null,
    e(Hero, { title: 'Genie System Status', subtitle: 'Monitor uptime, performance, and incident updates in real-time.' }),
    e('section', { className: `status-indicator ${overall}` }, e('span', { className: 'dot' }), e('strong', null, overallText)),
    e('section', { className: 'status-grid' }, ...services.map(([name, stat, updated]) => e('article', { key: name, className: `card service ${stat.toLowerCase()}` }, e('h3', null, name), e('p', null, stat), e('small', null, `Updated ${updated}`)))),
    e('section', { className: 'faq' },
      e('h2', null, 'Incident History'),
      ...incidents.map(([date, title, details], idx) => e('div', { key: title, className: 'faq-item' }, e('button', { onClick: () => setOpen(open === idx ? -1 : idx) }, `${date} — ${title}`), open === idx ? e('p', null, details) : null))
    ),
    e('div', { className: 'center' }, e('a', { className: 'btn btn-accent', href: '#auth' }, '⚡ Start with Genie'))
  );
}


function AppHeader({ currentRoute, mobileOpen, onToggleMobile, onNavigate, userOpen, onToggleUser }) {
  return e('header', { className: 'navbar app-navbar' },
    e('a', { href: '#dashboard', className: 'logo', onClick: () => onNavigate('dashboard') }, 'Genie'),
    e('nav', { className: `nav-links ${mobileOpen ? 'open' : ''}` },
      ...appNavLinks.map(([label, route]) => e('a', {
        key: `${label}-${route}`,
        href: `#${route}`,
        className: currentRoute === route ? 'active' : '',
        onClick: () => onNavigate(route)
      }, label))
    ),
    e('div', { className: 'user-menu-wrap' },
      e('button', { className: 'user-menu-btn', onClick: onToggleUser, 'aria-label': 'Toggle user menu' }, '🙂 User ▾'),
      userOpen ? e('div', { className: 'user-dropdown fade-in' },
        e('a', { href: '#dashboard' }, 'Profile'),
        e('a', { href: '#dashboard' }, 'Billing'),
        e('a', { href: '#auth' }, 'Logout')
      ) : null
    ),
    e('button', { className: 'hamburger', onClick: onToggleMobile, 'aria-label': 'Toggle menu' }, '☰')
  );
}

function AuthPage() {
  const [tab, setTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '', remember: false });
  const [status, setStatus] = useState('idle');
  const [forgotOpen, setForgotOpen] = useState(false);

  const validation = useMemo(() => {
    const email = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email);
    const password = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/.test(form.password);
    const confirm = tab === 'login' ? true : form.confirmPassword.length > 0 && form.confirmPassword === form.password;
    return { email, password, confirm, all: email && password && confirm };
  }, [form, tab]);

  function submit(ev) {
    ev.preventDefault();
    setStatus(validation.all ? 'success' : 'error');
    if (validation.all) window.location.hash = '#dashboard';
  }

  function socialSignIn(provider) {
    setStatus('success');
    setTimeout(() => { window.location.hash = '#dashboard'; }, 150);
    console.info(`Simulated ${provider} OAuth login.`);
  }

  function field(label, formKey, validationKey, type, visible = true) {
    if (!visible) return null;
    const ok = validation[validationKey];
    return e('label', { className: 'field' },
      e('span', null, label),
      e('div', { className: `inline-check ${ok ? 'ok' : 'bad'}` },
        e('input', {
          type,
          value: form[formKey],
          onChange: (ev) => setForm({ ...form, [formKey]: ev.target.value }),
          placeholder: label
        }),
        e('strong', null, ok ? '✓' : '✗')
      )
    );
  }

  return e('main', null,
    e('section', { className: 'auth-shell fade-in' },
      e('h1', null, 'Access Genie'),
      e('p', null, 'Sign in or create an account to get started.'),
      e('div', { className: 'tab-buttons center' },
        e('button', { className: tab === 'login' ? 'active-tab' : '', onClick: () => setTab('login') }, 'Login'),
        e('button', { className: tab === 'signup' ? 'active-tab' : '', onClick: () => setTab('signup') }, 'Sign-Up')
      ),
      e('form', { className: 'auth-form fade-in', onSubmit: submit },
        field('Email', 'email', 'email', 'email'),
        e('label', { className: 'field' },
          e('span', null, 'Password'),
          e('div', { className: `inline-check ${validation.password ? 'ok' : 'bad'}` },
            e('input', {
              type: showPassword ? 'text' : 'password',
              value: form.password,
              onChange: (ev) => setForm({ ...form, password: ev.target.value }),
              placeholder: 'Password'
            }),
            e('button', {
              type: 'button',
              className: 'ghost-btn',
              onClick: () => setShowPassword(!showPassword)
            }, showPassword ? '🙈' : '👁️')
          )
        ),
        field('Confirm Password', 'confirmPassword', 'confirm', showConfirmPassword ? 'text' : 'password', tab === 'signup'),
        tab === 'signup' ? e('button', { type: 'button', className: 'mini-link', onClick: () => setShowConfirmPassword(!showConfirmPassword) }, showConfirmPassword ? 'Hide confirm password' : 'Show confirm password') : null,
        tab === 'login' ? e('label', { className: 'remember' }, e('input', { type: 'checkbox', checked: form.remember, onChange: (ev) => setForm({ ...form, remember: ev.target.checked }) }), 'Remember me') : null,
        tab === 'login' ? e('button', { type: 'button', className: 'mini-link', onClick: () => setForgotOpen(true) }, 'Forgot password?') : null,
        e('button', { className: 'btn btn-accent', type: 'submit', disabled: !validation.all }, tab === 'login' ? 'Login' : 'Create Account'),
        status === 'error' ? e('p', { className: 'invalid' }, 'Please fix highlighted fields.') : null,
        status === 'success' ? e('p', { className: 'valid' }, 'Success. Redirecting to dashboard...') : null
      ),
      e('div', { className: 'social-row' },
        e('button', { className: 'social-btn google', onClick: () => socialSignIn('Google') }, 'G Google'),
        e('button', { className: 'social-btn github', onClick: () => socialSignIn('GitHub') }, ' GitHub'),
        e('button', { className: 'social-btn microsoft', onClick: () => socialSignIn('Microsoft') }, '⊞ Microsoft')
      ),
      forgotOpen ? e('div', { className: 'modal-overlay', role: 'dialog', 'aria-modal': true },
        e('div', { className: 'modal-card fade-in' },
          e('h3', null, 'Reset Password'),
          e('p', null, 'We sent a password reset link to your email (simulated).'),
          e('button', { className: 'btn btn-primary', onClick: () => setForgotOpen(false) }, 'Close')
        )
      ) : null,
      e('div', { className: 'center' }, e('a', { className: 'btn btn-primary', href: '#demo' }, '👁 Preview demo'))
    )
  );
}

function DashboardPage() {
  const [tooltip, setTooltip] = useState('Hover a chart bar to inspect values.');
  const activity = [
    'Bot “Genie Tutor” answered 124 student chats.',
    'Knowledge sync completed for 3 files.',
    'API usage spiked 12% after campaign launch.'
  ];
  const bars = [62, 74, 58, 88, 71, 79, 66];

  return e('main', null,
    e('section', { className: 'hero dashboard-hero' },
      e('h1', null, 'Welcome back, Builder'),
      e('p', null, 'Track performance, activity, and key bot metrics in one place.')
    ),
    e('section', { className: 'stats-grid' }, ...[
      ['Total chats', '28,420'],
      ['Active bots', '7'],
      ['API usage', '1.8M tokens'],
      ['Avg response time', '1.3s']
    ].map(([k, v]) => e('article', { key: k, className: 'card stat-card with-hover' }, e('p', null, k), e('h3', null, v)))),
    e('section', { className: 'split-grid' },
      e('article', { className: 'card' },
        e('h3', null, 'Recent Activity'),
        e('ul', { className: 'activity-list' }, ...activity.map((item) => e('li', { key: item }, item)))
      ),
      e('article', { className: 'card' },
        e('h3', null, 'Quick Actions'),
        e('div', { className: 'cta-row left' },
          e('a', { className: 'btn btn-accent', href: '#builder' }, 'Create New Bot'),
          e('a', { className: 'btn btn-primary', href: '#knowledge' }, 'Upload Data')
        )
      )
    ),
    e('section', { className: 'card' },
      e('h3', null, 'Activity Trends'),
      e('div', { className: 'chart-bars' }, ...bars.map((value, idx) => e('button', {
        key: `${value}-${idx}`,
        className: 'chart-bar',
        style: { height: `${value}%` },
        onMouseEnter: () => setTooltip(`Day ${idx + 1}: ${value} chats/hour`)
      }))),
      e('p', { className: 'chart-tooltip fade-in' }, tooltip)
    ),
    e('div', { className: 'center' }, e('a', { className: 'btn btn-accent', href: '#pricing' }, '⚡ Upgrade Plan'))
  );
}

function BuilderPage() {
  const [config, setConfig] = useState({
    name: 'Genie Tutor',
    personality: 'Friendly mentor',
    color: '#22d3ee',
    model: 'Gemini 1.5',
    temp: 0.6,
    avatar: null
  });
  const [saved, setSaved] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'user', text: 'Can you explain photosynthesis?' },
    { role: 'bot', text: 'Absolutely! Let’s break it into simple steps.' }
  ]);

  function onUpload(ev) {
    const file = ev.target.files?.[0];
    if (!file) return;
    setConfig({ ...config, avatar: file.name });
  }

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  }

  function testBot() {
    const response = config.temp > 0.7
      ? `✨ Creative mode ON (${config.model}). Here are 3 imaginative answer styles.`
      : `✅ Structured mode (${config.model}). Here is a concise, reliable explanation.`;
    setMessages([...messages, { role: 'bot', text: response }]);
  }

  return e('main', null,
    e('section', { className: 'hero' }, e('h1', null, 'Build Your Genie Bot'), e('p', null, 'Customize your bot’s personality, appearance, and AI model.')),
    e('section', { className: 'builder-grid' },
      e('article', { className: 'card' },
        e('label', { className: 'field' }, e('span', null, 'Bot Name'), e('input', { value: config.name, onChange: (ev) => setConfig({ ...config, name: ev.target.value }) })),
        e('label', { className: 'field' },
          e('span', null, 'Personality'),
          e('select', { value: config.personality, onChange: (ev) => setConfig({ ...config, personality: ev.target.value }) },
            e('option', null, 'Friendly mentor'), e('option', null, 'Professional analyst'), e('option', null, 'Creative storyteller')
          )
        ),
        e('label', { className: 'field' }, e('span', null, 'Theme Color'), e('input', { type: 'color', value: config.color, onChange: (ev) => setConfig({ ...config, color: ev.target.value }) })),
        e('label', { className: 'field' },
          e('span', null, 'AI Model'),
          e('select', { value: config.model, onChange: (ev) => setConfig({ ...config, model: ev.target.value }) },
            e('option', null, 'Gemini 1.5'), e('option', null, 'GPT-4o'), e('option', null, 'Claude 3.5')
          )
        ),
        e('label', { className: 'field' },
          e('span', null, `Temperature / Creativity: ${config.temp.toFixed(1)}`),
          e('input', { type: 'range', min: 0.1, max: 1, step: 0.1, value: config.temp, onChange: (ev) => setConfig({ ...config, temp: Number(ev.target.value) }) })
        ),
        e('label', { className: 'field dropzone' },
          e('span', null, 'Avatar Upload / Drag-and-Drop'),
          e('input', { type: 'file', accept: 'image/*', onChange: onUpload }),
          e('small', null, config.avatar ? `Uploaded: ${config.avatar}` : 'Drop an image or choose a file.')
        ),
        e('div', { className: 'cta-row left' },
          e('button', { className: 'btn btn-accent', onClick: save }, 'Save Bot'),
          e('button', { className: 'btn btn-primary', onClick: testBot }, 'Test Bot')
        ),
        saved ? e('p', { className: 'valid fade-in' }, 'Bot configuration saved.') : null
      ),
      e('article', { className: 'card preview-panel' },
        e('h3', null, `${config.name} Preview`),
        e('p', null, `Personality: ${config.personality}`),
        e('div', { className: 'chat-preview' }, ...messages.slice(-4).map((m, i) => e('div', {
          key: `${m.role}-${i}`,
          className: `bubble ${m.role === 'bot' ? 'bot' : 'user'}`,
          style: m.role === 'bot' ? { background: config.color } : null
        }, m.text)))
      )
    )
  );
}

function KnowledgePage() {
  const [url, setUrl] = useState('');
  const [urlStatus, setUrlStatus] = useState('idle');
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState([
    { name: 'product-guide.pdf', size: '2.4 MB', status: 'Indexed' },
    { name: 'faq.csv', size: '340 KB', status: 'Training' }
  ]);
  const [progress, setProgress] = useState({ indexing: 68, training: 42 });
  const [deleteIndex, setDeleteIndex] = useState(-1);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => ({
        indexing: Math.min(100, p.indexing + 2),
        training: Math.min(100, p.training + 3)
      }));
    }, 900);
    return () => clearInterval(timer);
  }, []);

  function addFiles(fileList) {
    const incoming = Array.from(fileList || []).map((file) => ({
      name: file.name,
      size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
      status: 'Uploading'
    }));
    if (!incoming.length) return;
    setFiles((prev) => [...incoming, ...prev]);
    setTimeout(() => {
      setFiles((prev) => prev.map((f) => incoming.some((n) => n.name === f.name) ? { ...f, status: 'Indexed' } : f));
    }, 900);
  }

  function validateUrl(ev) {
    ev.preventDefault();
    const valid = /^https:\/\//.test(url);
    setUrlStatus(valid ? 'success' : 'error');
    if (valid) {
      setFiles((prev) => [{ name: url.replace(/^https?:\/\//, ''), size: 'URL source', status: 'Queued' }, ...prev]);
      setUrl('');
    }
  }

  return e('main', null,
    e('section', { className: 'hero' }, e('h1', null, 'Train Your Genie Bot'), e('p', null, 'Upload files, add URLs, and monitor AI training progress.')),
    e('section', { className: 'card dropzone-wrap' },
      e('h3', null, 'File Upload / Dropzone'),
      e('div', {
        className: `dropzone ${dragOver ? 'drag-over' : ''}`,
        onDragOver: (ev) => { ev.preventDefault(); setDragOver(true); },
        onDragLeave: () => setDragOver(false),
        onDrop: (ev) => { ev.preventDefault(); setDragOver(false); addFiles(ev.dataTransfer.files); }
      },
        e('p', null, 'Drag & drop PDFs/CSVs/text files here'),
        e('input', { type: 'file', multiple: true, onChange: (ev) => addFiles(ev.target.files) })
      )
    ),
    e('section', { className: 'card' },
      e('h3', null, 'URL Scraper'),
      e('form', { className: 'url-form', onSubmit: validateUrl },
        e('input', { type: 'text', value: url, onChange: (ev) => setUrl(ev.target.value), placeholder: 'https://example.com/docs' }),
        e('button', { className: 'btn btn-primary', type: 'submit' }, 'Scrape URL')
      ),
      urlStatus === 'success' ? e('p', { className: 'valid' }, 'URL accepted and queued for scraping.') : null,
      urlStatus === 'error' ? e('p', { className: 'invalid' }, 'URL must start with https://') : null
    ),
    e('section', { className: 'card' },
      e('h3', null, 'Training Progress'),
      e('div', { className: 'progress-item' }, e('span', null, `Indexing ${progress.indexing}%`), e('div', { className: 'progress' }, e('div', { style: { width: `${progress.indexing}%` } }))),
      e('div', { className: 'progress-item' }, e('span', null, `Training ${progress.training}%`), e('div', { className: 'progress' }, e('div', { style: { width: `${progress.training}%` } })))
    ),
    e('section', { className: 'card' },
      e('h3', null, 'Uploaded Files'),
      e('div', { className: 'file-list' }, ...files.map((file, idx) => e('div', { key: `${file.name}-${idx}`, className: 'file-row with-hover' },
        e('div', null, e('strong', null, file.name), e('small', null, ` ${file.size}`)),
        e('span', { className: 'chip' }, file.status),
        e('button', { className: 'danger', onClick: () => setDeleteIndex(idx) }, '🗑 Delete')
      )))
    ),
    deleteIndex >= 0 ? e('div', { className: 'modal-overlay' },
      e('div', { className: 'modal-card fade-in' },
        e('h3', null, 'Confirm Delete'),
        e('p', null, `Remove ${files[deleteIndex]?.name}?`),
        e('div', { className: 'cta-row left' },
          e('button', { className: 'btn btn-accent', onClick: () => { setFiles(files.filter((_, i) => i !== deleteIndex)); setDeleteIndex(-1); } }, 'Confirm'),
          e('button', { className: 'btn btn-primary', onClick: () => setDeleteIndex(-1) }, 'Cancel')
        )
      )
    ) : null,
    e('div', { className: 'center' }, e('a', { className: 'btn btn-accent', href: '#pricing' }, '⚡ Upgrade'))
  );
}



function IntegrationsPage() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const integrations = [
    { name: 'Salesforce', category: 'CRM', desc: 'Sync leads, cases, and AI summaries automatically.' },
    { name: 'HubSpot', category: 'CRM', desc: 'Connect Genie assistants to contact and deal pipelines.' },
    { name: 'Slack', category: 'Messaging', desc: 'Deploy Genie in channels for support and Q&A.' },
    { name: 'Discord', category: 'Messaging', desc: 'Moderation and instant answer workflows for communities.' },
    { name: 'Notion', category: 'Productivity', desc: 'Use docs and wikis as a live knowledge source.' },
    { name: 'Google Drive', category: 'Productivity', desc: 'Import files to train and refresh bot context.' },
    { name: 'Mixpanel', category: 'Analytics', desc: 'Send usage events and AI outcome metrics.' },
    { name: 'Looker Studio', category: 'Analytics', desc: 'Visualize conversation and response trends.' }
  ];

  const filtered = integrations.filter((item) => (category === 'All' || item.category === category)
    && `${item.name} ${item.desc}`.toLowerCase().includes(query.toLowerCase()));

  return e('main', null,
    e('section', { className: 'hero' },
      e('h1', null, 'Connect Genie Everywhere'),
      e('p', null, 'Integrate with your favorite platforms for seamless AI workflows.')
    ),
    e('section', { className: 'filter-row' },
      e('div', { className: 'tab-buttons' }, ...['All', 'CRM', 'Messaging', 'Productivity', 'Analytics'].map((c) => e('button', {
        key: c,
        className: category === c ? 'active-tab' : '',
        onClick: () => setCategory(c)
      }, c))),
      e('input', {
        type: 'text',
        className: 'search-inline',
        value: query,
        placeholder: 'Search integrations',
        onChange: (ev) => setQuery(ev.target.value)
      })
    ),
    e('section', { className: 'integration-grid fade-in' }, ...filtered.map((item) => e('article', { key: item.name, className: 'card with-hover' },
      e('div', { className: 'integration-logo' }, item.name.slice(0, 2).toUpperCase()),
      e('h3', null, item.name),
      e('p', null, item.desc),
      e('div', { className: 'cta-row left' },
        e('button', { className: 'btn btn-accent', onClick: () => setSelected(item) }, 'View Details'),
        e('button', { className: 'btn btn-primary', onClick: () => setSelected(item) }, 'Connect')
      )
    ))),
    selected ? e('div', { className: 'modal-overlay' },
      e('div', { className: 'modal-card fade-in' },
        e('h3', null, selected.name),
        e('p', null, selected.desc),
        e('p', null, `Category: ${selected.category}`),
        e('div', { className: 'cta-row left' },
          e('button', { className: 'btn btn-accent', onClick: () => setSelected(null) }, 'Connect'),
          e('button', { className: 'btn btn-primary', onClick: () => setSelected(null) }, 'Cancel')
        )
      )
    ) : null,
    e('div', { className: 'center' }, e('a', { className: 'btn btn-accent', href: '#pricing' }, '⚡ Upgrade'))
  );
}

function LogsPage() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [botFilter, setBotFilter] = useState('All');
  const [selected, setSelected] = useState(null);

  const rows = [
    { ts: '2026-03-06 10:20', bot: 'Genie Tutor', user: 'u_123', excerpt: 'Need help with algebra', status: 'success' },
    { ts: '2026-03-06 09:10', bot: 'Genie Support', user: 'u_884', excerpt: 'Billing issue unresolved', status: 'error' },
    { ts: '2026-03-05 17:45', bot: 'Genie Sales', user: 'u_382', excerpt: 'Can I get enterprise quote?', status: 'incomplete' },
    { ts: '2026-03-05 15:12', bot: 'Genie Tutor', user: 'u_600', excerpt: 'Explain osmosis quickly', status: 'success' }
  ];

  const filtered = rows.filter((row) => {
    const passQuery = `${row.user} ${row.excerpt}`.toLowerCase().includes(query.toLowerCase());
    const passStatus = statusFilter === 'All' || row.status === statusFilter;
    const passBot = botFilter === 'All' || row.bot === botFilter;
    return passQuery && passStatus && passBot;
  });

  function exportData(format) {
    console.info(`Exporting logs as ${format} (simulated).`);
  }

  return e('main', null,
    e('section', { className: 'hero' },
      e('h1', null, 'Conversation History'),
      e('p', null, 'Review all interactions between your bots and users.')
    ),
    e('section', { className: 'logs-filters card' },
      e('input', { type: 'text', className: 'search-inline', placeholder: 'Search keyword or user ID', value: query, onChange: (ev) => setQuery(ev.target.value) }),
      e('select', { value: botFilter, onChange: (ev) => setBotFilter(ev.target.value) },
        ...['All', 'Genie Tutor', 'Genie Support', 'Genie Sales'].map((item) => e('option', { key: item, value: item }, item))
      ),
      e('select', { value: statusFilter, onChange: (ev) => setStatusFilter(ev.target.value) },
        ...['All', 'success', 'error', 'incomplete'].map((item) => e('option', { key: item, value: item }, item))
      )
    ),
    e('section', { className: 'card' },
      e('div', { className: 'log-table' },
        e('div', { className: 'log-row log-head' },
          e('strong', null, 'Timestamp'), e('strong', null, 'Bot'), e('strong', null, 'User'), e('strong', null, 'Excerpt'), e('strong', null, 'Status')
        ),
        ...filtered.map((row, idx) => e('button', { key: `${row.user}-${idx}`, className: 'log-row with-hover', onClick: () => setSelected(row) },
          e('span', null, row.ts),
          e('span', null, row.bot),
          e('span', null, row.user),
          e('span', null, row.excerpt),
          e('span', { className: `chip ${row.status}` }, row.status)
        ))
      )
    ),
    selected ? e('div', { className: 'modal-overlay' },
      e('div', { className: 'modal-card fade-in' },
        e('h3', null, `${selected.bot} • ${selected.user}`),
        e('p', null, `Transcript preview: ${selected.excerpt} ...`),
        e('div', { className: 'cta-row left' },
          e('button', { className: 'btn btn-accent', onClick: () => exportData('CSV') }, 'Export CSV'),
          e('button', { className: 'btn btn-primary', onClick: () => exportData('PDF') }, 'Export PDF'),
          e('button', { className: 'danger', onClick: () => setSelected(null) }, 'Delete')
        )
      )
    ) : null,
    e('div', { className: 'center' }, e('a', { className: 'btn btn-accent', href: '#pricing' }, '⚡ Upgrade for advanced logs'))
  );
}

function AnalyticsPage() {
  const [range, setRange] = useState('Last 7 days');
  const [bot, setBot] = useState('All Bots');
  const [type, setType] = useState('All Types');
  const [segment, setSegment] = useState('All Users');
  const [tooltip, setTooltip] = useState('Hover charts to inspect detailed values.');

  const kpis = [
    ['Total chats', '42,180'],
    ['Avg response time', '1.1s'],
    ['Active users', '5,240'],
    ['Accuracy rate', '96.2%'],
    ['Engagement rate', '71%']
  ];
  const line = [32, 46, 52, 49, 65, 71, 68];
  const pie = [45, 30, 25];

  return e('main', null,
    e('section', { className: 'hero' },
      e('h1', null, 'Advanced Analytics'),
      e('p', null, 'Gain deep insights into bot usage and performance metrics.')
    ),
    e('section', { className: 'analytics-filters card' },
      e('select', { value: range, onChange: (ev) => setRange(ev.target.value) }, ...['Last 7 days', 'Last 30 days', 'Custom range'].map((v) => e('option', { key: v, value: v }, v))),
      e('select', { value: bot, onChange: (ev) => setBot(ev.target.value) }, ...['All Bots', 'Genie Tutor', 'Genie Support', 'Genie Sales'].map((v) => e('option', { key: v, value: v }, v))),
      e('select', { value: type, onChange: (ev) => setType(ev.target.value) }, ...['All Types', 'Q&A', 'Support', 'Lead Gen'].map((v) => e('option', { key: v, value: v }, v))),
      e('select', { value: segment, onChange: (ev) => setSegment(ev.target.value) }, ...['All Users', 'New Users', 'Returning Users'].map((v) => e('option', { key: v, value: v }, v)))
    ),
    e('p', { className: 'analytics-subtitle' }, `Range: ${range} • Bot: ${bot} • Type: ${type} • Segment: ${segment}`),
    e('section', { className: 'analytics-kpis' }, ...kpis.map(([name, value]) => e('article', { key: name, className: 'card with-hover' },
      e('h3', null, name),
      e('p', { className: 'price' }, value),
      e('div', { className: 'spark' }, ...[20, 35, 28, 42, 40, 52].map((n, idx) => e('span', { key: `${name}-${idx}`, style: { height: `${n}%` } })))
    ))),
    e('section', { className: 'analytics-charts' },
      e('article', { className: 'card' },
        e('h3', null, 'Usage Trend'),
        e('div', { className: 'line-chart' }, ...line.map((v, idx) => e('button', {
          key: `line-${idx}`,
          className: 'line-point',
          style: { bottom: `${v}%` },
          onMouseEnter: () => setTooltip(`Day ${idx + 1}: ${v * 120} chats`),
          onClick: () => { window.location.hash = '#logs'; }
        }))),
        e('small', null, 'Click a point to drill into logs')
      ),
      e('article', { className: 'card' },
        e('h3', null, 'Conversation Type Mix'),
        e('div', { className: 'pie-chart' }, ...pie.map((slice, idx) => e('button', {
          key: `pie-${idx}`,
          className: `slice s${idx}`,
          style: { flex: slice },
          onMouseEnter: () => setTooltip(`Segment ${idx + 1}: ${slice}%`),
          onClick: () => { window.location.hash = '#logs'; }
        }))),
        e('small', null, 'Click a segment to drill down')
      )
    ),
    e('p', { className: 'chart-tooltip fade-in' }, tooltip),
    e('div', { className: 'cta-row center' },
      e('button', { className: 'btn btn-accent', onClick: () => exportData('CSV') }, 'Download CSV'),
      e('button', { className: 'btn btn-primary', onClick: () => exportData('PDF') }, 'Download PDF')
    )
  );

  function exportData(format) {
    console.info(`Export analytics as ${format} (simulated).`);
  }
}

function LiveChatPage() {
  const [query, setQuery] = useState('');
  const [botFilter, setBotFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [active, setActive] = useState(null);
  const [reply, setReply] = useState('');
  const [conversations, setConversations] = useState([
    { id: 'c-101', ts: '10:11', bot: 'Genie Support', user: 'Ari', status: 'Pending', priority: 'High', messages: [{ from: 'ai', text: 'Can you share your order ID?' }, { from: 'user', text: 'It is ORD-1129 and I still need help.' }] },
    { id: 'c-102', ts: '10:03', bot: 'Genie Tutor', user: 'Mina', status: 'Active', priority: 'Medium', messages: [{ from: 'ai', text: 'Let us solve this integral step by step.' }, { from: 'user', text: 'I am stuck at substitution.' }] },
    { id: 'c-103', ts: '09:55', bot: 'Genie Sales', user: 'Luca', status: 'Resolved', priority: 'Low', messages: [{ from: 'ai', text: 'Would you like a Pro trial?' }, { from: 'user', text: 'Yes, please share details.' }] }
  ]);

  const filtered = conversations.filter((c) => {
    const passQuery = `${c.user} ${c.id}`.toLowerCase().includes(query.toLowerCase());
    const passBot = botFilter === 'All' || c.bot === botFilter;
    const passStatus = statusFilter === 'All' || c.status === statusFilter;
    return passQuery && passBot && passStatus;
  });

  function selectConversation(item) {
    setActive({ ...item });
    setReply('');
  }

  function sendReply(ev) {
    ev.preventDefault();
    if (!reply.trim() || !active) return;
    const next = { ...active, messages: [...active.messages, { from: 'human', text: reply.trim() }] };
    setActive(next);
    setReply('');
  }

  function updateStatus(nextStatus) {
    if (!active) return;
    const updated = { ...active, status: nextStatus };
    setActive(updated);
    setConversations((prev) => prev.map((c) => c.id === updated.id ? { ...c, status: nextStatus } : c));
  }

  return e('main', null,
    e('section', { className: 'hero' },
      e('h1', null, 'Live Chat Control'),
      e('p', null, 'Step in whenever your bot needs a human touch.')
    ),
    e('section', { className: 'livechat-layout' },
      e('article', { className: 'card' },
        e('div', { className: 'logs-filters' },
          e('input', { type: 'text', className: 'search-inline', placeholder: 'Search user or conversation ID', value: query, onChange: (ev) => setQuery(ev.target.value) }),
          e('select', { value: botFilter, onChange: (ev) => setBotFilter(ev.target.value) }, ...['All', 'Genie Support', 'Genie Tutor', 'Genie Sales'].map((v) => e('option', { key: v, value: v }, v))),
          e('select', { value: statusFilter, onChange: (ev) => setStatusFilter(ev.target.value) }, ...['All', 'Pending', 'Active', 'Resolved'].map((v) => e('option', { key: v, value: v }, v)))
        ),
        e('div', { className: 'log-table' },
          e('div', { className: 'log-row log-head' }, e('strong', null, 'Time'), e('strong', null, 'Bot'), e('strong', null, 'User'), e('strong', null, 'Status'), e('strong', null, 'Priority')),
          ...filtered.map((row) => e('button', { key: row.id, className: 'log-row with-hover', onClick: () => selectConversation(row) },
            e('span', null, row.ts),
            e('span', null, row.bot),
            e('span', null, row.user),
            e('span', { className: 'chip' }, row.status),
            e('span', null, row.priority)
          ))
        )
      ),
      e('article', { className: 'card live-chat-panel' },
        active ? [
          e('h3', { key: 'head' }, `${active.bot} • ${active.user}`),
          e('div', { key: 'msgs', className: 'chat-preview live' }, ...active.messages.map((m, idx) => e('div', {
            key: `${m.from}-${idx}`,
            className: `bubble ${m.from === 'ai' ? 'bot-ai' : m.from === 'human' ? 'human' : 'user'}`
          }, m.text))),
          e('form', { key: 'form', className: 'live-input', onSubmit: sendReply },
            e('input', { type: 'text', value: reply, onChange: (ev) => setReply(ev.target.value), placeholder: 'Type human reply...' }),
            e('button', { className: 'btn btn-accent', type: 'submit' }, 'Send')
          ),
          e('div', { key: 'actions', className: 'cta-row left' },
            e('button', { className: 'btn btn-primary', onClick: () => updateStatus('Active') }, 'Transfer back to AI'),
            e('button', { className: 'btn btn-accent', onClick: () => updateStatus('Resolved') }, 'Resolve'),
            e('button', { className: 'btn btn-primary', onClick: () => setReply('[Internal note] ') }, 'Note')
          )
        ] : [e('p', { key: 'empty' }, 'Select an active conversation to start human handoff.')]
      )
    ),
    e('div', { className: 'center' }, e('a', { className: 'btn btn-accent', href: '#pricing' }, '⚡ Upgrade live support seats'))
  );
}



function AccountPage() {
  const initial = {
    name: 'Genie Builder',
    email: 'builder@genie.ai',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    picture: '',
    emailNotif: true,
    smsNotif: false,
    theme: 'Light',
    language: 'English'
  };
  const [form, setForm] = useState(initial);
  const [show, setShow] = useState({ current: false, next: false, confirm: false });
  const [apiKeys, setApiKeys] = useState([
    { id: 'gk_live_1f24', perm: 'read/write', limit: '1M tokens/day' },
    { id: 'gk_test_9ab2', perm: 'read', limit: '200k tokens/day' }
  ]);
  const [revokeIndex, setRevokeIndex] = useState(-1);
  const [saved, setSaved] = useState('idle');

  const emailOk = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email);
  const strong = form.newPassword.length === 0 || /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/.test(form.newPassword);
  const match = form.newPassword.length === 0 ? true : form.newPassword === form.confirmPassword;

  function update(key, value) { setForm({ ...form, [key]: value }); }

  function createKey() {
    const suffix = Math.random().toString(16).slice(2, 6);
    setApiKeys([{ id: `gk_live_${suffix}`, perm: 'read/write', limit: '500k tokens/day' }, ...apiKeys]);
  }

  function saveChanges(ev) {
    ev.preventDefault();
    if (!emailOk || !strong || !match) return setSaved('error');
    setSaved('success');
    setTimeout(() => setSaved('idle'), 1600);
  }

  function cancelChanges() {
    setForm(initial);
    setSaved('idle');
  }

  return e('main', null,
    e('section', { className: 'hero' },
      e('h1', null, 'Account Settings'),
      e('p', null, 'Manage your profile, API keys, and personal preferences.')
    ),
    e('form', { className: 'account-layout', onSubmit: saveChanges },
      e('article', { className: 'card' },
        e('h3', null, 'Profile Information'),
        e('label', { className: 'field' }, e('span', null, 'Name'), e('input', { value: form.name, onChange: (ev) => update('name', ev.target.value) })),
        e('label', { className: 'field' },
          e('span', null, 'Email'),
          e('div', { className: `inline-check ${emailOk ? 'ok' : 'bad'}` },
            e('input', { value: form.email, onChange: (ev) => update('email', ev.target.value) }),
            e('strong', null, emailOk ? '✓' : '✗')
          )
        ),
        e('label', { className: 'field dropzone' },
          e('span', null, 'Profile Picture'),
          e('input', { type: 'file', accept: 'image/*', onChange: (ev) => update('picture', ev.target.files?.[0]?.name || '') }),
          e('small', null, form.picture ? `Uploaded: ${form.picture}` : 'Upload or drag & drop image')
        )
      ),
      e('article', { className: 'card' },
        e('h3', null, 'Password Change'),
        ...[
          ['Current Password', 'currentPassword', 'current'],
          ['New Password', 'newPassword', 'next'],
          ['Confirm Password', 'confirmPassword', 'confirm']
        ].map(([label, key, vis]) => e('label', { key, className: 'field' },
          e('span', null, label),
          e('div', { className: `inline-check ${(key === 'newPassword' ? strong : key === 'confirmPassword' ? match : true) ? 'ok' : 'bad'}` },
            e('input', { type: show[vis] ? 'text' : 'password', value: form[key], onChange: (ev) => update(key, ev.target.value) }),
            e('button', { type: 'button', className: 'ghost-btn', onClick: () => setShow({ ...show, [vis]: !show[vis] }) }, show[vis] ? '🙈' : '👁️')
          )
        )),
        !strong ? e('p', { className: 'invalid' }, 'New password must be 8+ chars with uppercase and special character.') : null,
        !match ? e('p', { className: 'invalid' }, 'Confirm password must match new password.') : null
      ),
      e('article', { className: 'card' },
        e('h3', null, 'API Keys'),
        e('button', { type: 'button', className: 'btn btn-primary', onClick: createKey }, 'Create New Key'),
        e('div', { className: 'file-list' }, ...apiKeys.map((key, idx) => e('div', { key: key.id, className: 'file-row with-hover' },
          e('div', null, e('strong', null, key.id), e('small', null, ` ${key.perm} • ${key.limit}`)),
          e('button', { type: 'button', className: 'danger', onClick: () => setRevokeIndex(idx) }, 'Revoke')
        )))
      ),
      e('article', { className: 'card' },
        e('h3', null, 'Preferences'),
        e('div', { className: 'pref-grid' },
          e('label', { className: 'toggle-line' }, 'Email Notifications', e('button', { type: 'button', className: `toggle ${form.emailNotif ? 'on' : ''}`, onClick: () => update('emailNotif', !form.emailNotif) })),
          e('label', { className: 'toggle-line' }, 'SMS Notifications', e('button', { type: 'button', className: `toggle ${form.smsNotif ? 'on' : ''}`, onClick: () => update('smsNotif', !form.smsNotif) })),
          e('label', { className: 'field' }, e('span', null, 'Theme'), e('select', { value: form.theme, onChange: (ev) => update('theme', ev.target.value) }, ...['Light', 'Dark'].map((v) => e('option', { key: v }, v)))),
          e('label', { className: 'field' }, e('span', null, 'Language'), e('select', { value: form.language, onChange: (ev) => update('language', ev.target.value) }, ...['English', 'French', 'Spanish', 'Swahili'].map((v) => e('option', { key: v }, v))))
        )
      ),
      e('div', { className: 'cta-row left' },
        e('button', { className: 'btn btn-accent', type: 'submit' }, 'Save Changes'),
        e('button', { className: 'btn btn-primary', type: 'button', onClick: cancelChanges }, 'Cancel')
      ),
      saved === 'success' ? e('p', { className: 'valid' }, 'Profile updated successfully.') : null,
      saved === 'error' ? e('p', { className: 'invalid' }, 'Please fix validation errors before saving.') : null
    ),
    revokeIndex >= 0 ? e('div', { className: 'modal-overlay' },
      e('div', { className: 'modal-card fade-in' },
        e('h3', null, 'Revoke API Key'),
        e('p', null, `Revoke ${apiKeys[revokeIndex]?.id}?`),
        e('div', { className: 'cta-row left' },
          e('button', { className: 'btn btn-accent', onClick: () => { setApiKeys(apiKeys.filter((_, i) => i != revokeIndex)); setRevokeIndex(-1); } }, 'Confirm'),
          e('button', { className: 'btn btn-primary', onClick: () => setRevokeIndex(-1) }, 'Cancel')
        )
      )
    ) : null,
    e('div', { className: 'center' }, e('a', { className: 'btn btn-accent', href: '#pricing' }, '⚡ Upgrade for advanced features'))
  );
}

function BillingPage() {
  const [plan, setPlan] = useState('Pro');
  const [paymentMethods, setPaymentMethods] = useState([
    { card: '**** **** **** 4242', exp: '12/27', name: 'Genie Builder', default: true },
    { card: '**** **** **** 1881', exp: '04/26', name: 'Genie Backup', default: false }
  ]);
  const [invoices, setInvoices] = useState([
    { date: '2026-03-01', amount: '$29.00', status: 'Paid' },
    { date: '2026-02-01', amount: '$29.00', status: 'Paid' },
    { date: '2026-01-01', amount: '$29.00', status: 'Paid' }
  ]);
  const [modal, setModal] = useState({ type: '', open: false });
  const [form, setForm] = useState({ card: '', exp: '', cvv: '', name: '' });

  const validCard = /^\d{16}$/.test(form.card.replace(/\s/g, ''));
  const validExp = /^(0[1-9]|1[0-2])\/\d{2}$/.test(form.exp);
  const validCvv = /^\d{3,4}$/.test(form.cvv);
  const formOk = validCard && validExp && validCvv && form.name.length > 2;

  function addMethod(ev) {
    ev.preventDefault();
    if (!formOk) return;
    setPaymentMethods([{ card: `**** **** **** ${form.card.slice(-4)}`, exp: form.exp, name: form.name, default: false }, ...paymentMethods]);
    setForm({ card: '', exp: '', cvv: '', name: '' });
    setModal({ type: '', open: false });
  }

  function setDefault(index) {
    setPaymentMethods(paymentMethods.map((m, i) => ({ ...m, default: i === index })));
  }

  return e('main', null,
    e('section', { className: 'hero' },
      e('h1', null, 'Billing & Subscription'),
      e('p', null, 'Manage your plan, payment methods, and billing history.')
    ),
    e('section', { className: 'card plan-card with-hover' },
      e('h3', null, `Current Plan: ${plan}`),
      e('p', null, plan === 'Free' ? 'Basic access' : plan === 'Pro' ? 'Advanced analytics + live chat controls' : 'Enterprise support + SLA'),
      e('div', { className: 'cta-row left' },
        e('button', { className: 'btn btn-accent', onClick: () => setModal({ type: 'plan', open: true }) }, 'Upgrade / Downgrade'),
        e('button', { className: 'btn btn-primary', onClick: () => setModal({ type: 'cancel', open: true }) }, 'Cancel Subscription')
      )
    ),
    e('section', { className: 'card' },
      e('h3', null, 'Payment Methods'),
      e('button', { className: 'btn btn-primary', onClick: () => setModal({ type: 'payment', open: true }) }, 'Add Payment Method'),
      e('div', { className: 'file-list' }, ...paymentMethods.map((m, idx) => e('div', { key: `${m.card}-${idx}`, className: 'file-row with-hover' },
        e('div', null, e('strong', null, m.card), e('small', null, ` ${m.exp} • ${m.name}`)),
        e('span', { className: 'chip' }, m.default ? 'Default' : 'Saved'),
        e('div', { className: 'cta-row left' },
          e('button', { className: 'btn btn-primary', onClick: () => setDefault(idx) }, 'Set Default'),
          e('button', { className: 'danger', onClick: () => setPaymentMethods(paymentMethods.filter((_, i) => i !== idx)) }, 'Delete')
        )
      )))
    ),
    e('section', { className: 'card' },
      e('h3', null, 'Invoices / Billing History'),
      e('div', { className: 'log-table' },
        e('div', { className: 'log-row log-head' }, e('strong', null, 'Date'), e('strong', null, 'Amount'), e('strong', null, 'Status'), e('strong', null, 'Download'), e('strong', null, 'Action')),
        ...invoices.map((inv, idx) => e('div', { key: idx, className: 'log-row with-hover' },
          e('span', null, inv.date), e('span', null, inv.amount), e('span', { className: 'chip success' }, inv.status), e('span', null, 'PDF'),
          e('button', { className: 'btn btn-primary', onClick: () => console.info('Download invoice simulated') }, 'Download')
        ))
      )
    ),
    modal.open ? e('div', { className: 'modal-overlay' },
      modal.type === 'payment'
        ? e('div', { className: 'modal-card fade-in' },
          e('h3', null, 'Add Payment Method'),
          e('form', { className: 'auth-form', onSubmit: addMethod },
            e('input', { placeholder: 'Card number (16 digits)', value: form.card, onChange: (ev) => setForm({ ...form, card: ev.target.value }) }),
            e('input', { placeholder: 'MM/YY', value: form.exp, onChange: (ev) => setForm({ ...form, exp: ev.target.value }) }),
            e('input', { placeholder: 'CVV', value: form.cvv, onChange: (ev) => setForm({ ...form, cvv: ev.target.value }) }),
            e('input', { placeholder: 'Name on card', value: form.name, onChange: (ev) => setForm({ ...form, name: ev.target.value }) }),
            e('p', { className: formOk ? 'valid' : 'invalid' }, formOk ? 'Payment details valid.' : 'Please complete all fields with valid values.'),
            e('div', { className: 'cta-row left' },
              e('button', { className: 'btn btn-accent', type: 'submit', disabled: !formOk }, 'Save Method'),
              e('button', { className: 'btn btn-primary', type: 'button', onClick: () => setModal({ type: '', open: false }) }, 'Cancel')
            )
          )
        )
        : e('div', { className: 'modal-card fade-in' },
          e('h3', null, modal.type === 'plan' ? 'Change Subscription Plan' : 'Cancel Subscription'),
          modal.type === 'plan'
            ? e('div', { className: 'auth-form' },
              e('select', { value: plan, onChange: (ev) => setPlan(ev.target.value) }, ...['Free', 'Pro', 'Enterprise'].map((v) => e('option', { key: v }, v))),
              e('div', { className: 'cta-row left' },
                e('button', { className: 'btn btn-accent', onClick: () => setModal({ type: '', open: false }) }, 'Confirm Plan Change'),
                e('button', { className: 'btn btn-primary', onClick: () => setModal({ type: '', open: false }) }, 'Cancel')
              )
            )
            : e('div', null,
              e('p', null, 'Are you sure you want to cancel your subscription?'),
              e('div', { className: 'cta-row left' },
                e('button', { className: 'btn btn-accent', onClick: () => { setPlan('Free'); setModal({ type: '', open: false }); } }, 'Confirm Cancel'),
                e('button', { className: 'btn btn-primary', onClick: () => setModal({ type: '', open: false }) }, 'Keep Plan')
              )
            )
        )
    ) : null,
    e('div', { className: 'center' }, e('a', { className: 'btn btn-accent', href: '#pricing' }, '⚡ Upgrade or manage enterprise'))
  );
}

function LegalPage({ type }) {
  const copy = {
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'How Genie collects, uses, and protects your information.',
      sections: [
        ['Data We Collect', ['Account details, usage logs, and support communications.']],
        ['How We Use Data', ['To deliver services, improve response quality, and secure accounts.']],
        ['Data Sharing', ['We do not sell personal data; limited sharing with service providers.']],
        ['Data Security', ['Encryption in transit/storage and strict access controls.']],
        ['Your Rights', ['Access, correction, portability, and deletion requests are supported.']]
      ]
    },
    terms: {
      title: 'Terms of Service',
      subtitle: 'Rules and responsibilities when using Genie.',
      sections: [
        ['Acceptable Use', ['No abusive, illegal, or reverse-engineering behavior.']],
        ['Account Responsibilities', ['You are responsible for credentials and account activity.']],
        ['Subscription & Billing', ['Paid plans renew automatically unless canceled.']],
        ['Service Modifications', ['Features may evolve to improve quality and safety.']],
        ['Liability & Disclaimers', ['Service provided as-is to the maximum extent permitted.']],
        ['Termination Policy', ['Accounts violating policy may be suspended or terminated.']]
      ]
    },
    ethics: {
      title: 'AI Ethics / Usage Policy',
      subtitle: 'Genie’s commitment to transparent, responsible AI.',
      sections: [
        ['Responsible Use', ['Users must avoid harmful or deceptive AI usage.']],
        ['Data for AI Improvement', ['Conversation data may be used to improve quality, not profiling.']],
        ['Content Restrictions', ['Genie restricts harmful, illegal, discriminatory outputs.']],
        ['Transparency Statement', ['Users are informed when interacting with AI systems.']]
      ]
    },
    cookies: {
      title: 'Cookie Policy',
      subtitle: 'How Genie uses cookies to improve your experience.',
      sections: [
        ['Types of Cookies', ['Necessary, analytics, and functional cookies.']],
        ['Purpose of Cookies', ['Remember settings, analyze usage, and personalize features.']],
        ['Managing Cookies', ['You can manage cookie settings in your browser.']],
        ['Third-Party Cookies', ['Some analytics providers may place cookies with consent.']]
      ]
    }
  };
  const [cookieAccepted, setCookieAccepted] = useState(false);
  const page = copy[type] || copy.privacy;

  return e('main', null,
    e('section', { className: 'hero' }, e('h1', null, page.title), e('p', null, page.subtitle)),
    e('section', { className: 'card legal-content' }, ...page.sections.map(([heading, bullets]) => e('article', { key: heading },
      e('h3', null, heading),
      e('ul', null, ...bullets.map((item) => e('li', { key: item }, item)))
    ))),
    type === 'cookies' && !cookieAccepted ? e('section', { className: 'cookie-banner fade-in' },
      e('p', null, 'This site uses cookies for analytics and preferences.'),
      e('button', { className: 'btn btn-accent', onClick: () => setCookieAccepted(true) }, 'Accept Cookies')
    ) : null
  );
}



function AdminPanelPage() {
  const [tab, setTab] = useState('audit');
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState('');

  const [homeItems, setHomeItems] = useState([
    { name: 'Hero Primary CTA', status: 'Published', type: 'cta', order: 1 },
    { name: 'Live Preview Widget', status: 'Draft', type: 'widget', order: 2 }
  ]);
  const [featureItems, setFeatureItems] = useState([
    { name: 'Core Tech', status: 'Published', type: 'tab', order: 1 },
    { name: 'Testimonials', status: 'Draft', type: 'carousel', order: 2 }
  ]);
  const [pricingItems, setPricingItems] = useState([
    { name: 'Free', monthly: 0, yearly: 0, status: 'Published', order: 1 },
    { name: 'Pro', monthly: 29, yearly: 24, status: 'Published', order: 2 }
  ]);
  const [solutionsItems, setSolutionsItems] = useState([
    { name: 'Education', status: 'Published', type: 'industry-card', order: 1 },
    { name: 'Case Study Slider', status: 'Draft', type: 'slider', order: 2 }
  ]);
  const [docsItems, setDocsItems] = useState([
    { name: 'Getting Started', status: 'Published', type: 'category', order: 1 },
    { name: 'API Snippets', status: 'Published', type: 'snippet', order: 2 }
  ]);
  const [blogItems, setBlogItems] = useState([
    { name: 'Featured Article', status: 'Published', type: 'featured', order: 1 },
    { name: 'AI News Category', status: 'Draft', type: 'category', order: 2 }
  ]);
  const [aboutItems, setAboutItems] = useState([
    { name: 'About Us Story', status: 'Published', type: 'about', order: 1 },
    { name: 'Team Members', status: 'Published', type: 'team', order: 2 }
  ]);
  const [contactItems, setContactItems] = useState([
    { name: 'Primary Contact Email', status: 'Published', type: 'contact', order: 1 },
    { name: 'Lead Form Fields', status: 'Draft', type: 'form', order: 2 }
  ]);
  const [legalItems, setLegalItems] = useState([
    { name: 'Privacy Policy', status: 'Published', type: 'legal-page', order: 1 },
    { name: 'Cookie Policy', status: 'Published', type: 'legal-page', order: 2 }
  ]);
  const [dashboardItems, setDashboardItems] = useState([
    { name: 'Chatbot Builder', status: 'Published', type: 'dashboard-module', order: 1 },
    { name: 'Knowledge Base', status: 'Published', type: 'dashboard-module', order: 2 },
    { name: 'Analytics Dashboard', status: 'Draft', type: 'dashboard-module', order: 3 }
  ]);

  const [globalSettings, setGlobalSettings] = useState({
    primaryColor: '#4F46E5',
    accentColor: '#22D3EE',
    backgroundColor: '#F9FAFB',
    headingFont: 'Poppins',
    bodyFont: 'Inter',
    liveChat: true,
    analytics: true,
    kbUpload: true,
    notifications: true,
    defaultModel: 'Gemini 1.5',
    defaultBotTemplate: 'Genie Assistant',
    rateLimit: 120,
    timeoutSec: 30,
    sessionMins: 60,
    maintenanceMode: false,
    minPasswordLength: 8,
    require2fa: false,
    dataRetentionDays: 90,
    auditLogAccess: 'Admin Only'
  });

  const auditRows = [
    ['No third-party tools', 'Configuration', '🔵 N/A', 'No external admin tooling configured for this project'],
    ['SCREEN 4 — Solutions', 'Industry / Use Case Cards', '🟠 Admin Managed', 'Admin can create, edit, publish, reorder cards'],
    ['SCREEN 4 — Solutions', 'Case Study Slider', '🟠 Admin Managed', 'Before/after assets and status are editable'],
    ['SCREEN 5 — Docs', 'Categories / Tabs', '🟠 Admin Managed', 'Admin controls tab names, order, and publishing'],
    ['SCREEN 5 — Docs', 'Code Snippets', '🟠 Admin Managed', 'Admin updates snippet text/language and status'],
    ['SCREEN 6 — Blog', 'Featured Article', '🟠 Admin Managed', 'Single hero article managed from admin'],
    ['SCREEN 6 — Blog', 'Footer Links / Social', '🟠 Admin Managed', 'Global footer links and icons are managed'],
    ['SCREEN 7 — About/Contact/Legal', 'Page Content', '🟠 Admin Managed', 'Sections are editable and publishable'],
    ['SCREEN 8 — Dashboard Panels', 'Modules', '🟠 Admin Managed', 'Builder/KB/Integrations/Analytics controls are managed'],
    ['Screen chrome / menus', 'Hamburger / nav behavior', '🟢 Static', 'Core UI behavior stays static']
  ];

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(''), 1400);
  }

  function manager(scope, title, subtitle, list, setter, fields) {
    const active = selected && selected.scope === scope ? list[selected.index] : null;
    function addRow() {
      const next = { name: `New ${title} ${list.length + 1}`, status: 'Draft', type: 'content', order: list.length + 1 };
      setter([...list, next]);
      setSelected({ scope, index: list.length });
    }
    function updateRow(index, key, value) {
      setter(list.map((item, i) => i === index ? { ...item, [key]: value } : item));
    }
    function deleteRow(index) {
      setter(list.filter((_, i) => i !== index));
      setSelected(null);
      showToast('Item deleted');
    }

    return e('section', { className: 'card' },
      e('h3', null, title),
      e('p', null, subtitle),
      e('div', { className: 'cta-row left' }, e('button', { className: 'btn btn-primary', onClick: addRow }, `Create ${title}`)),
      list.length === 0 ? e('p', { className: 'invalid' }, `No ${title.toLowerCase()} yet.`) : e('div', { className: 'admin-grid' },
        e('div', { className: 'admin-list' },
          e('div', { className: 'log-row log-head' }, e('strong', null, 'Name'), e('strong', null, 'Status'), e('strong', null, 'Order'), e('strong', null, 'Type'), e('strong', null, 'Action')),
          ...list.map((item, idx) => e('button', {
            key: `${scope}-${idx}`,
            className: `log-row with-hover ${selected && selected.scope === scope && selected.index === idx ? 'admin-selected' : ''}`,
            onClick: () => setSelected({ scope, index: idx })
          },
            e('span', null, item.name || '-'),
            e('span', { className: 'chip' }, item.status || '-'),
            e('span', null, item.order ?? '-'),
            e('span', null, item.type || '-'),
            e('span', null, 'Edit')
          ))
        ),
        e('div', { className: 'admin-detail' },
          active ? [
            e('h4', { key: 'h' }, 'Detail View'),
            ...fields.map((field) => e('label', { key: `${scope}-${field.key}`, className: 'field' },
              e('span', null, field.label),
              field.type === 'select'
                ? e('select', {
                  value: active[field.key] ?? field.options[0],
                  onChange: (ev) => updateRow(selected.index, field.key, ev.target.value)
                }, ...field.options.map((opt) => e('option', { key: opt, value: opt }, opt)))
                : e('input', {
                  type: field.type || 'text',
                  value: active[field.key] ?? '',
                  onChange: (ev) => updateRow(selected.index, field.key, field.type === 'number' ? Number(ev.target.value || 0) : ev.target.value)
                })
            )),
            e('div', { key: 'a', className: 'cta-row left' },
              e('button', { className: 'btn btn-accent', onClick: () => { updateRow(selected.index, 'status', 'Published'); showToast('Published'); } }, 'Publish'),
              e('button', { className: 'btn btn-primary', onClick: () => { updateRow(selected.index, 'status', 'Draft'); showToast('Moved to draft'); } }, 'Unpublish'),
              e('button', { className: 'danger', onClick: () => deleteRow(selected.index) }, 'Delete')
            )
          ] : [e('p', { key: 'e' }, 'Select a row to edit fields and status.')]
        )
      )
    );
  }

  function settingsPanel() {
    function update(key, value) { setGlobalSettings({ ...globalSettings, [key]: value }); }
    return e('section', { className: 'card' },
      e('div', { className: 'settings-header' },
        e('div', null, e('strong', null, 'Admin → Settings')),
        e('div', { className: 'cta-row left' },
          e('button', { className: 'btn btn-accent', onClick: () => showToast('Global settings saved') }, 'Save'),
          e('button', { className: 'btn btn-primary', onClick: () => showToast('Changes reverted') }, 'Cancel')
        )
      ),
      e('h3', null, 'Phase 3 — Global Settings'),
      e('div', { className: 'settings-grid' },
        e('article', { className: 'card' },
          e('h4', null, 'Branding'),
          e('label', { className: 'field' }, e('span', null, 'Primary Color'), e('input', { type: 'color', value: globalSettings.primaryColor, onChange: (ev) => update('primaryColor', ev.target.value) })),
          e('label', { className: 'field' }, e('span', null, 'Accent Color'), e('input', { type: 'color', value: globalSettings.accentColor, onChange: (ev) => update('accentColor', ev.target.value) })),
          e('label', { className: 'field' }, e('span', null, 'Background Color'), e('input', { type: 'color', value: globalSettings.backgroundColor, onChange: (ev) => update('backgroundColor', ev.target.value) })),
          e('label', { className: 'field' }, e('span', null, 'Heading Font'), e('select', { value: globalSettings.headingFont, onChange: (ev) => update('headingFont', ev.target.value) }, ...['Poppins', 'Inter', 'Other'].map((v) => e('option', { key: v }, v)))),
          e('label', { className: 'field' }, e('span', null, 'Body Font'), e('select', { value: globalSettings.bodyFont, onChange: (ev) => update('bodyFont', ev.target.value) }, ...['Inter', 'Poppins', 'Other'].map((v) => e('option', { key: v }, v))))
        ),
        e('article', { className: 'card' },
          e('h4', null, 'Feature Toggles'),
          ...[
            ['Live Chat', 'liveChat'],
            ['Analytics', 'analytics'],
            ['Knowledge Base Upload', 'kbUpload'],
            ['Notifications', 'notifications']
          ].map(([label, key]) => e('label', { key, className: 'toggle-line' }, label,
            e('button', { className: `toggle ${globalSettings[key] ? 'on' : ''}`, onClick: () => update(key, !globalSettings[key]), type: 'button' })
          )),
          e('label', { className: 'field' }, e('span', null, 'Default AI Model'), e('select', { value: globalSettings.defaultModel, onChange: (ev) => update('defaultModel', ev.target.value) }, ...['Gemini 1.5', 'GPT-4o', 'Claude 3.5'].map((v) => e('option', { key: v }, v))))
        ),
        e('article', { className: 'card' },
          e('h4', null, 'System & API Settings'),
          e('label', { className: 'field' }, e('span', null, 'API Rate Limit (requests/min)'), e('input', { type: 'number', value: globalSettings.rateLimit, onChange: (ev) => update('rateLimit', Number(ev.target.value || 0)) })),
          e('label', { className: 'field' }, e('span', null, 'Response Timeout (sec)'), e('input', { type: 'number', value: globalSettings.timeoutSec, onChange: (ev) => update('timeoutSec', Number(ev.target.value || 0)) })),
          e('label', { className: 'field' }, e('span', null, 'Session Expiration (mins)'), e('input', { type: 'number', value: globalSettings.sessionMins, onChange: (ev) => update('sessionMins', Number(ev.target.value || 0)) })),
          e('label', { className: 'toggle-line' }, 'Maintenance Mode', e('button', { className: `toggle ${globalSettings.maintenanceMode ? 'on' : ''}`, type: 'button', onClick: () => update('maintenanceMode', !globalSettings.maintenanceMode) }))
        ),
        e('article', { className: 'card' },
          e('h4', null, 'Security & Compliance'),
          e('label', { className: 'field' }, e('span', null, 'Minimum Password Length'), e('input', { type: 'number', value: globalSettings.minPasswordLength, onChange: (ev) => update('minPasswordLength', Number(ev.target.value || 0)) })),
          e('label', { className: 'toggle-line' }, 'Require Two-Factor Authentication', e('button', { className: `toggle ${globalSettings.require2fa ? 'on' : ''}`, type: 'button', onClick: () => update('require2fa', !globalSettings.require2fa) })),
          e('label', { className: 'field' }, e('span', null, 'Data Retention (days)'), e('input', { type: 'number', value: globalSettings.dataRetentionDays, onChange: (ev) => update('dataRetentionDays', Number(ev.target.value || 0)) })),
          e('label', { className: 'field' }, e('span', null, 'Audit Log Access'), e('select', { value: globalSettings.auditLogAccess, onChange: (ev) => update('auditLogAccess', ev.target.value) }, ...['Admin Only', 'Restricted'].map((v) => e('option', { key: v }, v))))
        )
      ),
      e('p', { className: 'settings-updated' }, `Last Updated: ${new Date().toLocaleString()}`)
    );
  }

  const tabs = [
    ['audit', 'Phase 1: Classification Audit'],
    ['home', 'Homepage Controls'],
    ['features', 'Features Controls'],
    ['pricing', 'Pricing Controls'],
    ['solutions', 'Solutions Controls'],
    ['docs', 'Documentation Controls'],
    ['blog', 'Blog Controls'],
    ['aboutContactLegal', 'About / Contact / Legal'],
    ['dashboardPanels', 'Dashboard Panels'],
    ['global', 'Phase 3: Global Settings']
  ];

  return e('main', null,
    e('section', { className: 'hero' },
      e('h1', null, 'Admin Panel'),
      e('p', null, 'Simple controls for one main semi-technical admin.'),
      e('p', { className: 'valid' }, 'No third-party tools — 🔵 classification not applicable for this project.')
    ),
    e('section', { className: 'tabs' },
      e('div', { className: 'tab-buttons' }, ...tabs.map(([id, label]) => e('button', { key: id, className: tab === id ? 'active-tab' : '', onClick: () => { setTab(id); setSelected(null); } }, label)))
    ),
    toast ? e('p', { className: 'valid fade-in' }, toast) : null,

    tab === 'audit' ? e('section', { className: 'card' },
      e('h3', null, '🟠 Phase 1 — Classification Audit'),
      e('div', { className: 'log-table' },
        e('div', { className: 'log-row log-head' }, e('strong', null, 'Scope'), e('strong', null, 'Element'), e('strong', null, 'Class'), e('strong', null, 'Reason'), e('strong', null, 'Third-party')),
        ...auditRows.map((row, idx) => e('div', { key: `audit-${idx}`, className: 'log-row' }, e('span', null, row[0]), e('span', null, row[1]), e('span', null, row[2]), e('span', null, row[3]), e('span', null, row[2] === '🔵 N/A' ? 'N/A' : 'Not applicable')))
      )
    ) : null,

    tab === 'home' ? manager('home', 'Homepage Items', 'Manage CTAs, live preview widget, logo carousel, features, FAQ, and newsletter settings.', homeItems, setHomeItems, [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'type', label: 'Type', type: 'select', options: ['cta', 'widget', 'carousel', 'feature-card', 'faq', 'newsletter'] },
      { key: 'order', label: 'Order', type: 'number' },
      { key: 'status', label: 'Status', type: 'select', options: ['Published', 'Draft'] }
    ]) : null,

    tab === 'features' ? manager('features', 'Features Items', 'Manage tabs, comparison slider entries, testimonials, and contextual CTA content.', featureItems, setFeatureItems, [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'type', label: 'Type', type: 'select', options: ['tab', 'comparison', 'feature-card', 'testimonial', 'cta'] },
      { key: 'order', label: 'Order', type: 'number' },
      { key: 'status', label: 'Status', type: 'select', options: ['Published', 'Draft'] }
    ]) : null,

    tab === 'pricing' ? manager('pricing', 'Pricing Items', 'Manage plans, monthly/yearly prices, tooltips, comparison rows, FAQ and CTAs.', pricingItems, setPricingItems, [
      { key: 'name', label: 'Plan Name', type: 'text' },
      { key: 'monthly', label: 'Monthly Price', type: 'number' },
      { key: 'yearly', label: 'Yearly Price', type: 'number' },
      { key: 'order', label: 'Order', type: 'number' },
      { key: 'status', label: 'Status', type: 'select', options: ['Published', 'Draft'] }
    ]) : null,

    tab === 'solutions' ? manager('solutions', 'Solutions Items', 'Manage industry cards, case-study slider entries, testimonials, and contextual CTAs.', solutionsItems, setSolutionsItems, [
      { key: 'name', label: 'Industry / Item Name', type: 'text' },
      { key: 'type', label: 'Type', type: 'select', options: ['industry-card', 'slider', 'testimonial', 'cta'] },
      { key: 'order', label: 'Order', type: 'number' },
      { key: 'status', label: 'Status', type: 'select', options: ['Published', 'Draft'] }
    ]) : null,

    tab === 'docs' ? manager('docs', 'Documentation Items', 'Manage categories, guide cards, code snippets, FAQ items, and contextual CTAs.', docsItems, setDocsItems, [
      { key: 'name', label: 'Category / Item Name', type: 'text' },
      { key: 'type', label: 'Type', type: 'select', options: ['category', 'article', 'snippet', 'faq', 'cta'] },
      { key: 'order', label: 'Order', type: 'number' },
      { key: 'status', label: 'Status', type: 'select', options: ['Published', 'Draft'] }
    ]) : null,

    tab === 'blog' ? manager('blog', 'Blog Items', 'Manage featured article, grid posts, tags/categories, search config, CTAs, and footer links.', blogItems, setBlogItems, [
      { key: 'name', label: 'Item Name', type: 'text' },
      { key: 'type', label: 'Type', type: 'select', options: ['featured', 'article', 'category', 'search', 'cta', 'footer-link'] },
      { key: 'order', label: 'Order', type: 'number' },
      { key: 'status', label: 'Status', type: 'select', options: ['Published', 'Draft'] }
    ]) : null,

    tab === 'aboutContactLegal' ? e('section', { className: 'admin-stack' },
      manager('about', 'About Us Items', 'Manage headline/content and repeatable team member sections.', aboutItems, setAboutItems, [
        { key: 'name', label: 'Section Name', type: 'text' },
        { key: 'type', label: 'Type', type: 'select', options: ['about', 'mission', 'vision', 'team'] },
        { key: 'order', label: 'Order', type: 'number' },
        { key: 'status', label: 'Status', type: 'select', options: ['Published', 'Draft'] }
      ]),
      manager('contact', 'Contact Us Items', 'Manage contact info and dynamic form fields/validation blocks.', contactItems, setContactItems, [
        { key: 'name', label: 'Field / Item Name', type: 'text' },
        { key: 'type', label: 'Type', type: 'select', options: ['contact', 'form-field', 'validation', 'cta'] },
        { key: 'order', label: 'Order', type: 'number' },
        { key: 'status', label: 'Status', type: 'select', options: ['Published', 'Draft'] }
      ]),
      manager('legal', 'Legal & Compliance Items', 'Manage Privacy, Terms, AI Ethics, and Cookie sections with publish state.', legalItems, setLegalItems, [
        { key: 'name', label: 'Page / Section Name', type: 'text' },
        { key: 'type', label: 'Type', type: 'select', options: ['legal-page', 'section', 'footer-link'] },
        { key: 'order', label: 'Order', type: 'number' },
        { key: 'status', label: 'Status', type: 'select', options: ['Published', 'Draft'] }
      ])
    ) : null,

    tab === 'dashboardPanels' ? manager('dashboard', 'Dashboard Module Items', 'Manage Chatbot Builder, Knowledge Base, Integrations, Logs, and Analytics module visibility/content.', dashboardItems, setDashboardItems, [
      { key: 'name', label: 'Module Name', type: 'text' },
      { key: 'type', label: 'Type', type: 'select', options: ['dashboard-module', 'integration', 'training-item', 'logs', 'analytics'] },
      { key: 'order', label: 'Order', type: 'number' },
      { key: 'status', label: 'Status', type: 'select', options: ['Published', 'Draft'] }
    ]) : null,

    tab === 'global' ? settingsPanel() : null
  );
}

function Footer() {
  return e('footer', null,
    e('section', { className: 'purpose-grid' }, ...pagePurposes.map(([name, purpose]) => e('p', { key: name }, e('strong', null, `${name}: `), purpose))),
    e('div', { className: 'footer-links' }, ...legalLinks.map(([label, route]) => e('a', { key: route, href: `#${route}` }, label))),
    e('a', { href: 'mailto:irankundasteve22@gmail.com' }, 'Support: irankundasteve22@gmail.com'),
    e('a', { href: 'https://www.facebook.com/profile.php?id=61551810645067' }, 'Facebook')
  );
}

function App() {
  const [route, setRoute] = useState(routeFromHash());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [newsletterState, setNewsletterState] = useState('idle');
  const isValidEmail = useMemo(() => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email), [email]);

  React.useEffect(() => {
    const onHash = () => setRoute(routeFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  async function submitNewsletter(event) {
    event.preventDefault();
    if (!isValidEmail) return setNewsletterState('error');
    const res = await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
    setNewsletterState(res.ok ? 'success' : 'error');
  }

  const page = {
    home: e(HomePage, { email, setEmail, isValidEmail, submitNewsletter, newsletterState }),
    features: e(FeaturesPage), pricing: e(PricingPage), solutions: e(SolutionsPage), docs: e(DocsPage),
    blog: e(BlogPage), about: e(AboutPage), contact: e(ContactPage), status: e(StatusPage),
    auth: e(AuthPage), dashboard: e(DashboardPage), builder: e(BuilderPage), knowledge: e(KnowledgePage),
    integrations: e(IntegrationsPage), logs: e(LogsPage), analytics: e(AnalyticsPage), livechat: e(LiveChatPage),
    account: e(AccountPage), billing: e(BillingPage), admin: e(AdminPanelPage),
    privacy: e(LegalPage, { type: 'privacy' }), terms: e(LegalPage, { type: 'terms' }),
    ethics: e(LegalPage, { type: 'ethics' }), cookies: e(LegalPage, { type: 'cookies' })
  };

  const appRoutes = ['dashboard', 'builder', 'knowledge', 'integrations', 'logs', 'analytics', 'livechat', 'account', 'billing', 'admin'];
  const [userOpen, setUserOpen] = useState(false);

  return e('div', { className: 'app' },
    appRoutes.includes(route)
      ? e(AppHeader, { currentRoute: route, mobileOpen, onToggleMobile: () => setMobileOpen(!mobileOpen), onNavigate: (next) => { setRoute(next); setMobileOpen(false); setUserOpen(false); }, userOpen, onToggleUser: () => setUserOpen(!userOpen) })
      : e(Header, { currentRoute: route, mobileOpen, onToggleMobile: () => setMobileOpen(!mobileOpen), onNavigate: (next) => { setRoute(next); setMobileOpen(false); } }),
    page[route] || page.home,
    e(Footer)
  );
}

createRoot(document.getElementById('root')).render(e(App));
