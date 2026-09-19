/* =============================================
   JOURNEYX — APPLICATION ROUTER & PAGE RENDERER
   ============================================= */

Chart.defaults.color = '#6060a0';
Chart.defaults.borderColor = 'rgba(255,255,255,0.06)';
Chart.defaults.font.family = "'Inter', system-ui, sans-serif";

const PAGES = {
  home: renderHome,
  overview: renderOverview,
  'customer360': renderCustomer360,
  'journey-explorer': renderJourneyExplorer,
  dropoff: renderDropoff,
  escalation: renderEscalation,
  'repeated-contact': renderRepeatedContact,
  churn: renderChurn,
  'ai-analyst': renderAIAnalyst,
};

let currentPage = null;
let activeCharts = [];

function destroyCharts() {
  activeCharts.forEach(c => { try { c.destroy(); } catch(e) {} });
  activeCharts = [];
}

function navigate(page) {
  if (!PAGES[page]) page = 'home';
  if (currentPage === page) return;
  currentPage = page;

  // Update active link
  document.querySelectorAll('.nav-link').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });

  // Show/hide sidebar on home vs dashboard
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('main-content');
  if (page === 'home') {
    sidebar.style.display = 'none';
    mainContent.style.marginLeft = '0';
  } else {
    sidebar.style.display = 'flex';
    mainContent.style.marginLeft = '';
  }

  destroyCharts();
  const main = document.getElementById('main-content');
  main.innerHTML = PAGES[page]();
  main.scrollTo(0, 0);

  // After render, initialize charts & interactions
  setTimeout(() => {
    if (page === 'overview') initOverviewCharts();
    if (page === 'customer360') initCustomer360();
    if (page === 'journey-explorer') initJourneyExplorer();
    if (page === 'dropoff') initDropoff();
    if (page === 'escalation') initEscalation();
    if (page === 'repeated-contact') initRepeatedContact();
    if (page === 'churn') initChurn();
    if (page === 'ai-analyst') initAIAnalyst();
    if (page === 'home') initHome();

    // Animate progress bars
    document.querySelectorAll('.progress-fill[data-width]').forEach(el => {
      el.style.width = el.dataset.width;
    });
    // Animate funnel bars
    document.querySelectorAll('.funnel-fill[data-width]').forEach(el => {
      el.style.width = el.dataset.width;
    });
  }, 50);

  // Update hash
  history.pushState(null, '', '#' + page);
}

// Router
window.addEventListener('popstate', () => {
  const page = location.hash.replace('#', '') || 'home';
  navigate(page);
});

// Nav click delegation
document.addEventListener('click', e => {
  const link = e.target.closest('.nav-link');
  if (link) {
    e.preventDefault();
    const page = link.dataset.page;
    navigate(page);
    closeMobileMenu();
  }

  const btn = e.target.closest('[data-nav]');
  if (btn) {
    e.preventDefault();
    navigate(btn.dataset.nav);
    closeMobileMenu();
  }
});

// Mobile menu
const mobileBtn = document.getElementById('mobile-menu-btn');
const overlay = document.getElementById('sidebar-overlay');

mobileBtn?.addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
  overlay.classList.toggle('visible');
});

overlay?.addEventListener('click', closeMobileMenu);

function closeMobileMenu() {
  document.getElementById('sidebar').classList.remove('open');
  overlay.classList.remove('visible');
}

/* =============================================
   SAMPLE DATA
   ============================================= */
const CUSTOMERS = [
  { id: 'CUST-1001', name: 'Aarav Mehta', email: 'a***@gmail.com', phone: '+91-98***-12345', status: 'Active', frictionScore: 72, journeys: 4, issues: 2, escalations: 1, churnRisk: 'High' },
  { id: 'CUST-1002', name: 'Priya Nair', email: 'p***@yahoo.com', phone: '+91-70***-67890', status: 'Active', frictionScore: 31, journeys: 7, issues: 1, escalations: 0, churnRisk: 'Low' },
  { id: 'CUST-1003', name: 'Rohan Sharma', email: 'r***@outlook.com', phone: '+91-88***-11111', status: 'Churned', frictionScore: 94, journeys: 12, issues: 5, escalations: 3, churnRisk: 'Critical' },
  { id: 'CUST-1004', name: 'Sneha Patel', email: 's***@gmail.com', phone: '+91-77***-22222', status: 'Active', frictionScore: 45, journeys: 3, issues: 1, escalations: 0, churnRisk: 'Medium' },
  { id: 'CUST-1005', name: 'Vikram Iyer', email: 'v***@corp.com', phone: '+91-99***-33333', status: 'Active', frictionScore: 58, journeys: 6, issues: 3, escalations: 1, churnRisk: 'Medium' },
];

/* =============================================
   PAGE: HOME (LANDING)
   ============================================= */
function renderHome() {
  return `
    <div class="hero">
      <div class="hero-bg"></div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="hero-eyebrow">
          <span>⚡</span> PS-4 · Cross-Channel Journey Stitching
        </div>
        <h1 class="hero-title">
          Unify Every Customer<br/>
          <span class="gradient-text">Journey. Intelligently.</span>
        </h1>
        <p class="hero-desc">
          JourneyX resolves fragmented identities, stitches cross-channel events, and reconstructs unified customer journeys — powered by AI and evidence-grounded analytics.
        </p>
        <div class="hero-actions">
          <button class="btn btn-primary btn-hero" data-nav="overview">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            Open Dashboard
          </button>
          <button class="btn btn-secondary btn-hero" data-nav="ai-analyst">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4"/></svg>
            Try AI Analyst
          </button>
        </div>
        <div class="hero-stats">
          <div class="text-center">
            <div class="hero-stat-value" id="stat-channels">10+</div>
            <div class="hero-stat-label">Channels Integrated</div>
          </div>
          <div class="text-center">
            <div class="hero-stat-value" id="stat-algo">3</div>
            <div class="hero-stat-label">Matching Algorithms</div>
          </div>
          <div class="text-center">
            <div class="hero-stat-value" id="stat-pages">8</div>
            <div class="hero-stat-label">Analytics Dashboards</div>
          </div>
          <div class="text-center">
            <div class="hero-stat-value" id="stat-ai">RAG</div>
            <div class="hero-stat-label">AI-Powered Insights</div>
          </div>
        </div>
      </div>
    </div>

    <!-- FEATURES -->
    <div class="features-section">
      <div class="features-header">
        <h2>End-to-End Journey Intelligence</h2>
        <p>From raw channel logs to unified, explainable customer journeys in one disciplined pipeline.</p>
      </div>
      <div class="features-grid">
        ${[
          { icon: '🔗', color: '#6366f1', bg: 'rgba(99,102,241,0.12)', title: 'Identity Resolution', desc: 'Deterministic & probabilistic matching using Levenshtein, Jaro-Winkler, TF-IDF, and sentence embeddings to merge fragmented customer records.' },
          { icon: '🧵', color: '#22d3ee', bg: 'rgba(34,211,238,0.10)', title: 'Event Stitching', desc: 'Timestamp normalization, deduplication, causal reordering, and cross-reference correlation produce one coherent event stream per customer.' },
          { icon: '🗺️', color: '#10b981', bg: 'rgba(16,185,129,0.10)', title: 'Journey Reconstruction', desc: 'Segments stitched events into goal-oriented episodes with timeline, Sankey, funnel, and channel-flow visualizations.' },
          { icon: '🔁', color: '#f59e0b', bg: 'rgba(245,158,11,0.10)', title: 'Issue Threading', desc: 'Groups cross-channel interactions about the same underlying problem into one auditable Issue Thread with lifecycle tracking.' },
          { icon: '🚨', color: '#ef4444', bg: 'rgba(239,68,68,0.10)', title: 'Escalation Detection', desc: 'Combined rule-based (keyword, channel, SLA) and AI-based (sentiment trend) escalation signals with configurable thresholds.' },
          { icon: '🧬', color: '#818cf8', bg: 'rgba(129,140,248,0.10)', title: 'Journey Fingerprint', desc: 'Compact token sequences representing journey patterns — comparable via edit distance, LCS, and embedding similarity for clustering.' },
          { icon: '📊', color: '#f59e0b', bg: 'rgba(245,158,11,0.10)', title: 'Friction Score', desc: 'A configurable composite metric (0–100) combining contact count, escalation, resolution time, and sentiment into one comparable number.' },
          { icon: '🤖', color: '#22d3ee', bg: 'rgba(34,211,238,0.10)', title: 'AI Journey Analyst', desc: 'RAG-powered natural-language interface over unified journey data — separates observed facts, statistical correlations, and hypotheses.' },
          { icon: '📉', color: '#10b981', bg: 'rgba(16,185,129,0.10)', title: 'Churn Correlation', desc: 'Evidence-labeled analysis (fact / correlation / hypothesis) using logistic regression, random forest, SHAP, and survival analysis.' },
        ].map(f => `
          <div class="feature-card">
            <div class="feature-icon" style="background:${f.bg}; color:${f.color}; font-size:26px">${f.icon}</div>
            <div class="feature-title">${f.title}</div>
            <div class="feature-desc">${f.desc}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- ARCHITECTURE -->
    <div class="arch-section">
      <div class="features-header">
        <h2>15-Layer Platform Architecture</h2>
        <p>From raw channel data to actionable AI insights — every layer documented and auditable.</p>
      </div>
      <div class="arch-layers">
        ${[
          ['Data Sources', 'Website · Mobile App · Email · Call Center · WhatsApp · Chatbot · CRM · Social · Physical · Ticketing'],
          ['Data Ingestion', 'REST API push (POST /events), webhook subscriptions, scheduled batch CSV/JSON import'],
          ['Data Normalization', 'Schema mapping, UTC timestamp normalization, validation, quarantine of invalid records'],
          ['Identity Resolution', 'Blocking → exact-key matching → fuzzy scoring → confidence-based merge decisions'],
          ['Customer Identity Graph', 'Neo4j-style graph: customer nodes + identifier edges with confidence scores and source channels'],
          ['Event Stitching', 'Deduplication, causal reordering, shared-identifier correlation → canonical event stream'],
          ['Journey Construction', 'Episode segmentation, issue threading, Journey Fingerprint computation'],
          ['AI/NLP Analysis', 'Sentiment analysis, intent classification, embedding generation, RAG index building'],
          ['Analytics Engine', 'Repeated-contact flags, escalation detection, SLA aging, drop-off %, Friction Scores'],
          ['Insight Engine', 'Churn correlation analysis + evidence classification (fact / correlation / hypothesis)'],
          ['Dashboard & API', '8-page analytics dashboard + FastAPI REST endpoints with RBAC authentication'],
        ].map(([name, desc], i) => `
          <div class="arch-layer">
            <div class="arch-layer-num">${i + 1}</div>
            <div class="arch-layer-name">${name}</div>
            <div class="arch-layer-desc">${desc}</div>
          </div>
          ${i < 10 ? '<div class="arch-arrow">↓</div>' : ''}
        `).join('')}
      </div>
      <div style="text-align:center;margin-top:48px">
        <button class="btn btn-primary btn-hero" data-nav="overview">
          Explore the Dashboard →
        </button>
      </div>
    </div>
  `;
}

function initHome() {
  // Animate hero stats count-up
  function countUp(el, target, suffix = '') {
    let current = 0;
    const duration = 1200;
    const steps = 40;
    const increment = target / steps;
    const interval = duration / steps;
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      el.textContent = (Number.isInteger(target) ? Math.round(current) : current.toFixed(1)) + suffix;
      if (current >= target) clearInterval(timer);
    }, interval);
  }
  const s1 = document.getElementById('stat-channels');
  const s2 = document.getElementById('stat-algo');
  const s3 = document.getElementById('stat-pages');
  if (s1) countUp(s1, 10, '+');
  if (s2) countUp(s2, 3);
  if (s3) countUp(s3, 8);
}

/* =============================================
   PAGE: EXECUTIVE OVERVIEW
   ============================================= */
function renderOverview() {
  return `
    <div class="page">
      <div class="flex-between mb-8">
        <div>
          <h1 class="page-title">Executive Overview</h1>
          <p class="page-subtitle">Platform-wide metrics across all channels and customers · Last updated just now</p>
        </div>
        <div class="flex gap-8">
          <select class="filter-select" id="ov-period">
            <option>Last 7 days</option><option selected>Last 30 days</option><option>Last 90 days</option>
          </select>
          <button class="btn btn-secondary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4"/></svg>
            Refresh
          </button>
        </div>
      </div>

      <!-- KPI CARDS -->
      <div class="kpi-grid">
        ${[
          { icon: '👥', label: 'Total Customers', value: '24,871', trend: '+8.3%', type: 'up', color: '#6366f1', bg: 'rgba(99,102,241,0.12)', gradient: 'linear-gradient(90deg,#6366f1,#818cf8)' },
          { icon: '🗺️', label: 'Total Journeys', value: '1,12,340', trend: '+14.1%', type: 'up', color: '#22d3ee', bg: 'rgba(34,211,238,0.12)', gradient: 'linear-gradient(90deg,#22d3ee,#67e8f9)' },
          { icon: '⚠️', label: 'Active Issues', value: '3,241', trend: '-5.2%', type: 'down', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', gradient: 'linear-gradient(90deg,#f59e0b,#fbbf24)' },
          { icon: '🔴', label: 'Unresolved Issues', value: '847', trend: '+2.1%', type: 'up', color: '#ef4444', bg: 'rgba(239,68,68,0.12)', gradient: 'linear-gradient(90deg,#ef4444,#f87171)' },
          { icon: '🚨', label: 'Escalations', value: '312', trend: '-11.4%', type: 'up', color: '#6366f1', bg: 'rgba(99,102,241,0.12)', gradient: 'linear-gradient(90deg,#6366f1,#22d3ee)' },
          { icon: '🔁', label: 'Repeat Contacts', value: '1,908', trend: '-3.7%', type: 'down', color: '#10b981', bg: 'rgba(16,185,129,0.12)', gradient: 'linear-gradient(90deg,#10b981,#34d399)' },
          { icon: '📉', label: 'Journey Drop-offs', value: '6,542', trend: '-8.9%', type: 'down', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', gradient: 'linear-gradient(90deg,#f59e0b,#10b981)' },
          { icon: '⚡', label: 'Churn Signals', value: '2,103', trend: '-1.2%', type: 'neutral', color: '#818cf8', bg: 'rgba(129,140,248,0.12)', gradient: 'linear-gradient(90deg,#818cf8,#6366f1)' },
        ].map(k => `
          <div class="kpi-card" style="--accent-gradient:${k.gradient}">
            <div class="kpi-trend trend-${k.type === 'up' && !['Unresolved Issues','Escalations','Active Issues','Churn Signals'].includes(k.label) ? 'up' : k.type === 'down' && ['Repeat Contacts','Journey Drop-offs','Escalations'].includes(k.label) ? 'up' : 'neutral'}">
              ${k.trend}
            </div>
            <div class="kpi-icon" style="background:${k.bg};color:${k.color}">${k.icon}</div>
            <div class="kpi-value" style="color:${k.color}">${k.value}</div>
            <div class="kpi-label">${k.label}</div>
          </div>
        `).join('')}
      </div>

      <!-- CHARTS ROW 1 -->
      <div class="grid-60-40 mb-20">
        <div class="card">
          <div class="section-title">Journey Volume (30 days)</div>
          <div class="chart-container"><canvas id="chart-journey-vol"></canvas></div>
        </div>
        <div class="card">
          <div class="section-title">Channel Distribution</div>
          <div class="chart-container"><canvas id="chart-channels"></canvas></div>
        </div>
      </div>

      <!-- CHARTS ROW 2 -->
      <div class="grid-3 mb-20">
        <div class="card">
          <div class="section-title">Issue Resolution Rate</div>
          <div class="chart-container-sm"><canvas id="chart-resolution"></canvas></div>
        </div>
        <div class="card">
          <div class="section-title">Escalation Trend</div>
          <div class="chart-container-sm"><canvas id="chart-escalation-trend"></canvas></div>
        </div>
        <div class="card">
          <div class="section-title">Friction Score Distribution</div>
          <div class="chart-container-sm"><canvas id="chart-friction-dist"></canvas></div>
        </div>
      </div>

      <!-- TOP ISSUE CATEGORIES -->
      <div class="grid-2">
        <div class="card">
          <div class="section-title">Top Issue Categories</div>
          ${[
            { label: 'Billing & Payment Failure', pct: '34%', w: '34%', color: '' },
            { label: 'Account Access Issues', pct: '22%', w: '22%', color: 'amber' },
            { label: 'Delivery & Logistics', pct: '19%', w: '19%', color: 'green' },
            { label: 'Technical Faults', pct: '15%', w: '15%', color: 'red' },
            { label: 'Refund Requests', pct: '10%', w: '10%', color: '' },
          ].map(r => `
            <div class="progress-bar-wrapper">
              <div class="progress-label">
                <span class="progress-label-name">${r.label}</span>
                <span class="progress-label-value">${r.pct}</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill ${r.color}" data-width="${r.w}" style="width:0"></div>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="card">
          <div class="section-title">Platform Health Snapshot</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
            ${[
              { label: 'Avg. First Response', value: '4.2h', color: 'var(--green)', icon: '⏱️' },
              { label: 'Avg. Resolution Time', value: '18.7h', color: 'var(--amber)', icon: '✅' },
              { label: 'First Contact Rate', value: '61%', color: 'var(--cyan)', icon: '📞' },
              { label: 'Identity Confidence', value: '≥0.91', color: 'var(--purple-light)', icon: '🔗' },
              { label: 'Pending Review Queue', value: '143', color: 'var(--amber)', icon: '👁️' },
              { label: 'Avg. Friction Score', value: '46.3', color: 'var(--red)', icon: '🔥' },
            ].map(m => `
              <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:14px">
                <div style="font-size:20px;margin-bottom:6px">${m.icon}</div>
                <div style="font-size:20px;font-weight:800;color:${m.color}">${m.value}</div>
                <div style="font-size:11px;color:var(--text-muted);margin-top:2px">${m.label}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function initOverviewCharts() {
  const days = Array.from({length: 30}, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - 29 + i);
    return d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  });

  // Journey Volume
  const c1 = document.getElementById('chart-journey-vol');
  if (c1) {
    activeCharts.push(new Chart(c1, {
      type: 'line',
      data: {
        labels: days,
        datasets: [
          {
            label: 'Journeys',
            data: Array.from({length: 30}, () => Math.floor(2800 + Math.random() * 1200)),
            borderColor: '#6366f1', backgroundColor: 'rgba(99,102,241,0.1)',
            fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2,
          },
          {
            label: 'Issues',
            data: Array.from({length: 30}, () => Math.floor(80 + Math.random() * 80)),
            borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.05)',
            fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2,
          }
        ]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top', labels: { boxWidth: 10, font: { size: 12 } } } }, scales: { x: { ticks: { maxTicksLimit: 8, font: { size: 11 } } }, y: { grid: { color: 'rgba(255,255,255,0.04)' } } } }
    }));
  }

  // Channel doughnut
  const c2 = document.getElementById('chart-channels');
  if (c2) {
    activeCharts.push(new Chart(c2, {
      type: 'doughnut',
      data: {
        labels: ['Website', 'Mobile App', 'Call Center', 'Email', 'WhatsApp', 'Chatbot', 'CRM', 'Social'],
        datasets: [{ data: [28, 22, 15, 12, 9, 7, 4, 3],
          backgroundColor: ['#6366f1','#22d3ee','#10b981','#f59e0b','#34d399','#ef4444','#818cf8','#fb923c'],
          borderWidth: 0, hoverOffset: 6 }]
      },
      options: { responsive: true, maintainAspectRatio: false, cutout: '68%',
        plugins: { legend: { position: 'right', labels: { boxWidth: 10, font: { size: 11 }, padding: 10 } } }
      }
    }));
  }

  // Resolution rate
  const c3 = document.getElementById('chart-resolution');
  if (c3) {
    activeCharts.push(new Chart(c3, {
      type: 'doughnut',
      data: {
        labels: ['Resolved', 'Unresolved', 'In Progress'],
        datasets: [{ data: [61, 13, 26],
          backgroundColor: ['#10b981','#ef4444','#f59e0b'], borderWidth: 0, hoverOffset: 4 }]
      },
      options: { responsive: true, maintainAspectRatio: false, cutout: '72%',
        plugins: { legend: { position: 'bottom', labels: { boxWidth: 8, font: { size: 11 }, padding: 8 } } }
      }
    }));
  }

  // Escalation trend
  const c4 = document.getElementById('chart-escalation-trend');
  if (c4) {
    activeCharts.push(new Chart(c4, {
      type: 'bar',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          { label: 'Hard', data: [42, 38, 35, 29], backgroundColor: '#ef4444' },
          { label: 'Soft', data: [87, 79, 71, 68], backgroundColor: '#f59e0b' },
          { label: 'Watch', data: [130, 115, 108, 95], backgroundColor: '#22d3ee' },
        ]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { boxWidth: 8, font: { size: 11 } } } },
        scales: { x: { stacked: true, grid: { display: false } }, y: { stacked: true, grid: { color: 'rgba(255,255,255,0.04)' } } }
      }
    }));
  }

  // Friction score histogram
  const c5 = document.getElementById('chart-friction-dist');
  if (c5) {
    activeCharts.push(new Chart(c5, {
      type: 'bar',
      data: {
        labels: ['0–20', '21–40', '41–60', '61–80', '81–100'],
        datasets: [{ label: 'Customers', data: [3200, 7400, 8100, 4200, 1970],
          backgroundColor: ['#10b981','#34d399','#f59e0b','#fb923c','#ef4444'], borderRadius: 4 }]
      },
      options: { responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(255,255,255,0.04)' } } }
      }
    }));
  }
}

/* =============================================
   PAGE: CUSTOMER 360
   ============================================= */
function renderCustomer360() {
  const c = CUSTOMERS[0];
  return `
    <div class="page">
      <div class="flex-between mb-20">
        <div>
          <h1 class="page-title">Customer 360</h1>
          <p class="page-subtitle">Complete unified profile with identity matches, journey timeline, and issue history</p>
        </div>
        <div class="flex gap-8">
          <select class="filter-select" id="c360-select">
            ${CUSTOMERS.map((cu, i) => `<option value="${i}">${cu.name} · ${cu.id}</option>`).join('')}
          </select>
        </div>
      </div>

      <div id="c360-content">
        ${renderC360Content(CUSTOMERS[0])}
      </div>
    </div>
  `;
}

function renderC360Content(c) {
  const frictionColor = c.frictionScore > 70 ? '#ef4444' : c.frictionScore > 45 ? '#f59e0b' : '#10b981';
  const frictionLabel = c.frictionScore > 70 ? 'High Friction' : c.frictionScore > 45 ? 'Moderate' : 'Low Friction';
  const riskColors = { High: '#ef4444', Critical: '#ef4444', Medium: '#f59e0b', Low: '#10b981' };
  return `
    <!-- PROFILE + IDENTITY -->
    <div class="grid-40-60 mb-20">
      <div class="card card-glass">
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px">
          <div style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,var(--purple),var(--cyan));display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:800;color:white;flex-shrink:0">
            ${c.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div style="font-size:18px;font-weight:700">${c.name}</div>
            <div style="font-size:12px;color:var(--text-muted)">${c.id}</div>
          </div>
          <span class="badge ${c.status === 'Active' ? 'badge-green' : 'badge-red'}" style="margin-left:auto">${c.status}</span>
        </div>
        <div class="separator mb-16"></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px">
          <div><div class="text-xs text-muted mb-8">Email</div><div class="font-600 text-sm">${c.email}</div></div>
          <div><div class="text-xs text-muted mb-8">Phone</div><div class="font-600 text-sm">${c.phone}</div></div>
          <div><div class="text-xs text-muted mb-8">Total Journeys</div><div class="font-600 text-sm" style="color:var(--cyan)">${c.journeys}</div></div>
          <div><div class="text-xs text-muted mb-8">Open Issues</div><div class="font-600 text-sm" style="color:var(--amber)">${c.issues}</div></div>
          <div><div class="text-xs text-muted mb-8">Escalations</div><div class="font-600 text-sm" style="color:var(--red)">${c.escalations}</div></div>
          <div><div class="text-xs text-muted mb-8">Churn Risk</div><div class="font-600 text-sm" style="color:${riskColors[c.churnRisk]}">${c.churnRisk}</div></div>
        </div>
        <div class="separator mb-16"></div>
        <div style="text-align:center">
          <div class="text-xs text-muted mb-8">Journey Friction Score</div>
          <div class="score-ring-wrapper">
            <div class="score-ring">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="8"/>
                <circle cx="50" cy="50" r="40" fill="none" stroke="${frictionColor}" stroke-width="8"
                  stroke-dasharray="${2 * Math.PI * 40}"
                  stroke-dashoffset="${2 * Math.PI * 40 * (1 - c.frictionScore / 100)}"
                  stroke-linecap="round"/>
              </svg>
              <div class="score-ring-value" style="color:${frictionColor}">
                <span>${c.frictionScore}</span>
                <span class="score-ring-label">/100</span>
              </div>
            </div>
            <span class="badge ${c.frictionScore > 70 ? 'badge-red' : c.frictionScore > 45 ? 'badge-amber' : 'badge-green'}">${frictionLabel}</span>
          </div>
        </div>
      </div>

      <!-- IDENTITY MATCHES -->
      <div class="card">
        <div class="section-title">Identity Matches</div>
        <p class="text-sm text-muted mb-16">Identifiers resolved from 5 channels using deterministic + probabilistic matching</p>
        ${[
          { type: 'Email (Primary)', value: 'a.mehta@gmail.com', conf: '1.00', channel: 'Website', icon: '📧' },
          { type: 'Phone (E.164)', value: '+919812345678', conf: '1.00', channel: 'Call Center', icon: '📞' },
          { type: 'Account ID', value: 'ACC-2024-001001', conf: '1.00', channel: 'CRM', icon: '🆔' },
          { type: 'Device ID (Fuzzy)', value: 'DEV-A8B2...', conf: '0.87', channel: 'Mobile App', icon: '📱' },
          { type: 'WhatsApp ID', value: '+919812345678 (WA)', conf: '0.94', channel: 'WhatsApp', icon: '💬' },
          { type: 'Session Embedding', value: 'Behavioral similarity match', conf: '0.73', channel: 'Website', icon: '🧬' },
        ].map(id => `
          <div class="identity-node" style="display:flex;width:100%;margin:0 0 6px 0;border-radius:var(--radius-sm)">
            <span style="font-size:18px;margin-right:10px">${id.icon}</span>
            <div style="flex:1;min-width:0">
              <div class="text-xs text-muted">${id.type} · <span class="channel-chip ch-${id.channel.toLowerCase().replace(' center','').replace(' app','')}">${id.channel}</span></div>
              <div class="font-600 text-sm font-mono" style="word-break:break-all">${id.value}</div>
            </div>
            <div style="text-align:right;flex-shrink:0;margin-left:12px">
              <div class="text-xs text-muted">Confidence</div>
              <div style="font-weight:700;font-size:14px;color:${parseFloat(id.conf)>=0.9?'var(--green)':parseFloat(id.conf)>=0.7?'var(--amber)':'var(--red)'}">${id.conf}</div>
            </div>
          </div>
        `).join('')}
        <div class="mt-16 text-xs text-muted">
          <span class="badge badge-green" style="margin-right:6px">✅ Auto-merged</span>
          All deterministic keys confirmed. No pending review queue items for this customer.
        </div>
      </div>
    </div>

    <!-- JOURNEY TIMELINE -->
    <div class="card mb-20">
      <div class="flex-between mb-16">
        <div class="section-title mb-0">Journey Timeline</div>
        <div class="chip-row">
          <span class="channel-chip ch-web">WEB</span>
          <span class="channel-chip ch-app">APP</span>
          <span class="channel-chip ch-email">EMAIL</span>
          <span class="channel-chip ch-call">CALL</span>
          <span class="channel-chip ch-chat">CHATBOT</span>
          <span class="channel-chip ch-whatsapp">WHATSAPP</span>
        </div>
      </div>
      <div class="timeline">
        ${[
          { time: '2026-03-10 09:12 UTC', title: 'Website Session Started', body: 'Customer browsed checkout for Order #ORD-8821. Added 3 items to cart.', ch: 'WEB', type: 'active', badge: 'badge-purple' },
          { time: '2026-03-10 09:47 UTC', title: 'Checkout Initiated → Payment Failure', body: 'Payment failed: card declined. Error code PAYMENT_GATEWAY_TIMEOUT. No retry attempted.', ch: 'WEB', type: 'danger', badge: 'badge-red' },
          { time: '2026-03-10 11:03 UTC', title: 'Chatbot Session — CHAT_INITIATED', body: 'Customer typed: "my payment failed, is my card charged?" Intent classified: BILLING_PAYMENT_FAILURE.', ch: 'CHATBOT', type: 'warning', badge: 'badge-amber' },
          { time: '2026-03-10 11:18 UTC', title: 'Chatbot Escalated → Ticket #4471 Opened', body: 'No resolution from chatbot. Ticket #4471 created in CRM. Status: OPEN.', ch: 'CRM', type: 'warning', badge: 'badge-amber' },
          { time: '2026-03-11 09:30 UTC', title: 'Email Sent by Support', body: 'RE: Ticket #4471 — "We are investigating your payment issue." SLA response met (within 24h).', ch: 'EMAIL', type: '', badge: 'badge-cyan' },
          { time: '2026-03-12 14:05 UTC', title: 'Inbound Call — CALL_INITIATED', body: 'Customer called support: "I\'ve already emailed twice. Same issue." Contact Count: 3. Escalation Rule triggered.', ch: 'CALL', type: 'danger', badge: 'badge-red' },
          { time: '2026-03-12 14:22 UTC', title: 'Supervisor Request Detected', body: 'Keyword "supervisor" detected in call transcript. Sentiment: Strongly Negative. HARD escalation flagged.', ch: 'CALL', type: 'danger', badge: 'badge-red' },
          { time: '2026-03-13 10:00 UTC', title: 'Ticket #4471 — RESOLVED', body: 'Refund processed. Payment gateway timeout confirmed. Issue thread closed. Customer CSAT not yet received.', ch: 'CRM', type: 'success', badge: 'badge-green' },
        ].map(ev => `
          <div class="timeline-item">
            <div class="timeline-dot ${ev.type}"></div>
            <div class="timeline-content">
              <div class="timeline-time">${ev.time}</div>
              <div class="timeline-header">
                <span class="timeline-title">${ev.title}</span>
                <span class="badge ${ev.badge}">${ev.ch}</span>
              </div>
              <div class="timeline-body">${ev.body}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- JOURNEY FINGERPRINT -->
    <div class="card mb-20">
      <div class="section-title">Journey Fingerprint</div>
      <p class="text-sm text-muted mb-12">Episode: Payment Failure Resolution · Compact token sequence for pattern comparison</p>
      <div class="fingerprint-tokens">
        <span class="fp-token fp-web">WEB:PAGE_VIEW</span>
        <span class="fp-token fp-arrow">→</span>
        <span class="fp-token fp-web">WEB:CHECKOUT</span>
        <span class="fp-token fp-arrow">→</span>
        <span class="fp-token fp-web">WEB:PAYMENT_FAIL</span>
        <span class="fp-token fp-arrow">→</span>
        <span class="fp-token fp-chat">CHAT:CONTACT</span>
        <span class="fp-token fp-arrow">→</span>
        <span class="fp-token fp-chat">CHAT:ESCALATE</span>
        <span class="fp-token fp-arrow">→</span>
        <span class="fp-token fp-email">EMAIL:SUPPORT</span>
        <span class="fp-token fp-arrow">→</span>
        <span class="fp-token fp-call">CALL:INBOUND</span>
        <span class="fp-token fp-arrow">→</span>
        <span class="fp-token fp-call">CALL:SUPERVISOR</span>
        <span class="fp-token fp-arrow">→</span>
        <span class="fp-token fp-whatsapp">CRM:RESOLVE</span>
      </div>
      <div class="mt-12 text-xs text-muted">This fingerprint matches <strong style="color:var(--amber)">847 other journeys</strong> (LCS similarity ≥ 0.78) — Cluster: <span class="badge badge-red">HIGH_FRICTION_PAYMENT</span></div>
    </div>
  `;
}

function initCustomer360() {
  const sel = document.getElementById('c360-select');
  sel?.addEventListener('change', e => {
    const c = CUSTOMERS[parseInt(e.target.value)];
    document.getElementById('c360-content').innerHTML = renderC360Content(c);
  });
}

/* =============================================
   PAGE: JOURNEY EXPLORER
   ============================================= */
function renderJourneyExplorer() {
  return `
    <div class="page">
      <h1 class="page-title">Journey Explorer</h1>
      <p class="page-subtitle">Visualize cross-channel customer journeys using timeline, Sankey flow, and channel-transition views</p>

      <div class="filter-bar">
        <input type="text" class="search-input" placeholder="Search Customer ID or Journey ID..." id="je-search" />
        <select class="filter-select"><option>All Channels</option><option>Web</option><option>Mobile App</option><option>Call Center</option></select>
        <select class="filter-select"><option>All Episodes</option><option>Purchase Funnel</option><option>Support Issue</option><option>Onboarding</option></select>
        <button class="btn btn-primary">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          Search
        </button>
      </div>

      <!-- SANKEY FLOW -->
      <div class="card mb-20">
        <div class="flex-between mb-16">
          <div class="section-title mb-0">Cross-Channel Flow — Payment Failure Episode (Sample)</div>
          <span class="badge badge-purple">1,247 customers</span>
        </div>
        <div class="sankey-wrapper">
          <div class="sankey-flow">
            <div class="sankey-col">
              <div class="sankey-node" style="background:rgba(99,102,241,0.15);color:var(--purple-light)">
                <div class="sankey-node-count">1,247</div>
                <div class="sankey-node-label">Website Visit</div>
              </div>
            </div>
            <div class="sankey-arrow">→</div>
            <div class="sankey-col">
              <div class="sankey-node" style="background:rgba(99,102,241,0.15);color:var(--purple-light)">
                <div class="sankey-node-count">984</div>
                <div class="sankey-node-label">Checkout</div>
              </div>
              <div class="sankey-node" style="background:rgba(239,68,68,0.12);color:var(--red-light);opacity:.6">
                <div class="sankey-node-count">263</div>
                <div class="sankey-node-label">Abandoned</div>
              </div>
            </div>
            <div class="sankey-arrow">→</div>
            <div class="sankey-col">
              <div class="sankey-node" style="background:rgba(239,68,68,0.15);color:var(--red-light)">
                <div class="sankey-node-count">412</div>
                <div class="sankey-node-label">Payment Fail</div>
              </div>
              <div class="sankey-node" style="background:rgba(16,185,129,0.12);color:var(--green-light)">
                <div class="sankey-node-count">572</div>
                <div class="sankey-node-label">Payment OK</div>
              </div>
            </div>
            <div class="sankey-arrow">→</div>
            <div class="sankey-col">
              <div class="sankey-node" style="background:rgba(245,158,11,0.15);color:var(--amber-light)">
                <div class="sankey-node-count">309</div>
                <div class="sankey-node-label">Support Contact</div>
              </div>
              <div class="sankey-node" style="background:rgba(239,68,68,0.12);color:var(--red-light);opacity:.6">
                <div class="sankey-node-count">103</div>
                <div class="sankey-node-label">Drop-off</div>
              </div>
            </div>
            <div class="sankey-arrow">→</div>
            <div class="sankey-col">
              <div class="sankey-node" style="background:rgba(239,68,68,0.15);color:var(--red-light)">
                <div class="sankey-node-count">87</div>
                <div class="sankey-node-label">Escalation</div>
              </div>
              <div class="sankey-node" style="background:rgba(16,185,129,0.15);color:var(--green-light)">
                <div class="sankey-node-count">222</div>
                <div class="sankey-node-label">Resolved FCR</div>
              </div>
            </div>
            <div class="sankey-arrow">→</div>
            <div class="sankey-col">
              <div class="sankey-node" style="background:rgba(16,185,129,0.15);color:var(--green-light)">
                <div class="sankey-node-count">72</div>
                <div class="sankey-node-label">Resolved</div>
              </div>
              <div class="sankey-node" style="background:rgba(245,158,11,0.15);color:var(--amber-light)">
                <div class="sankey-node-count">15</div>
                <div class="sankey-node-label">Unresolved</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CHANNEL TRANSITION MATRIX + CHART -->
      <div class="grid-2 mb-20">
        <div class="card">
          <div class="section-title">Journey Archetype Examples</div>
          ${[
            { name: 'Purchase → Issue → Resolution', channels: ['WEB','APP','CHAT','EMAIL','CRM'], count: '3,421', friction: 48, badge: 'badge-amber' },
            { name: 'High-Friction Repeat Contact', channels: ['WEB','CALL','EMAIL','CALL','CRM'], count: '1,908', friction: 79, badge: 'badge-red' },
            { name: 'Smooth Purchase Journey', channels: ['WEB','APP','CRM'], count: '8,100', friction: 12, badge: 'badge-green' },
            { name: 'Escalation Journey', channels: ['APP','CHAT','EMAIL','CALL','CRM'], count: '847', friction: 91, badge: 'badge-red' },
            { name: 'Self-Service Resolution', channels: ['WEB','CHAT'], count: '5,214', friction: 22, badge: 'badge-green' },
          ].map(a => `
            <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:14px;margin-bottom:8px">
              <div class="flex-between mb-8">
                <div class="font-600" style="font-size:13px">${a.name}</div>
                <span class="badge ${a.badge}">Friction: ${a.friction}</span>
              </div>
              <div class="chip-row mb-8">
                ${a.channels.map(ch => `<span class="channel-chip ch-${ch.toLowerCase()}">${ch}</span>`).join('<span style="color:var(--text-muted);font-size:12px">→</span>')}
              </div>
              <div class="text-xs text-muted">${a.count} customers matched this archetype</div>
            </div>
          `).join('')}
        </div>

        <div class="card">
          <div class="section-title">Journey Length Distribution</div>
          <div class="chart-container"><canvas id="chart-je-length"></canvas></div>
        </div>
      </div>

      <!-- DETAILED JOURNEY TABLE -->
      <div class="card">
        <div class="flex-between mb-16">
          <div class="section-title mb-0">Recent Journeys</div>
          <span class="badge badge-cyan">112,340 total</span>
        </div>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Customer</th><th>Episode</th><th>Channels</th><th>Events</th><th>Duration</th><th>Friction</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${[
                { name: 'Aarav Mehta', ep: 'Payment Failure Recovery', ch: ['WEB','CHAT','EMAIL','CALL'], events: 14, dur: '3d 4h', friction: 72, status: 'Resolved', sBadge: 'badge-green' },
                { name: 'Priya Nair', ep: 'Product Onboarding', ch: ['APP','EMAIL'], events: 6, dur: '1d 2h', friction: 21, status: 'Completed', sBadge: 'badge-green' },
                { name: 'Rohan Sharma', ep: 'Repeated Support Contacts', ch: ['WEB','CALL','EMAIL','CALL','CHAT'], events: 23, dur: '12d 7h', friction: 94, status: 'Escalated', sBadge: 'badge-red' },
                { name: 'Sneha Patel', ep: 'Account Access Issue', ch: ['APP','EMAIL'], events: 8, dur: '18h', friction: 38, status: 'Resolved', sBadge: 'badge-green' },
                { name: 'Vikram Iyer', ep: 'Billing Dispute', ch: ['WEB','CALL','CRM'], events: 11, dur: '5d 1h', friction: 61, status: 'In Progress', sBadge: 'badge-amber' },
              ].map(j => `
                <tr>
                  <td class="primary">${j.name}</td>
                  <td>${j.ep}</td>
                  <td><div class="chip-row">${j.ch.map(c => `<span class="channel-chip ch-${c.toLowerCase()}">${c}</span>`).join('')}</div></td>
                  <td>${j.events}</td>
                  <td class="font-mono text-sm">${j.dur}</td>
                  <td>
                    <div class="confidence-bar">
                      <div class="confidence-track"><div class="confidence-fill" style="width:${j.friction}%;background:${j.friction>70?'var(--red)':j.friction>45?'var(--amber)':'var(--green)'}"></div></div>
                      <span style="font-weight:700;color:${j.friction>70?'var(--red)':j.friction>45?'var(--amber)':'var(--green)'}">${j.friction}</span>
                    </div>
                  </td>
                  <td><span class="badge ${j.sBadge}">${j.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function initJourneyExplorer() {
  const c = document.getElementById('chart-je-length');
  if (c) {
    activeCharts.push(new Chart(c, {
      type: 'bar',
      data: {
        labels: ['1–3', '4–6', '7–10', '11–15', '16–20', '20+'],
        datasets: [{ label: 'Journeys', data: [18200, 34100, 28700, 15400, 9800, 6100],
          backgroundColor: ['#10b981','#22d3ee','#6366f1','#f59e0b','#fb923c','#ef4444'],
          borderRadius: 4, borderSkipped: false }]
      },
      options: { responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: { title: { display: true, text: 'Number of Events', color: '#6060a0', font: { size: 11 } }, grid: { display: false } }, y: { grid: { color: 'rgba(255,255,255,0.04)' } } }
      }
    }));
  }
}

/* =============================================
   PAGE: DROP-OFF ANALYSIS
   ============================================= */
function renderDropoff() {
  return `
    <div class="page">
      <div class="flex-between mb-20">
        <div>
          <h1 class="page-title">Drop-Off Analysis</h1>
          <p class="page-subtitle">Funnel analysis with per-stage drop-off rates, filterable by channel and time period</p>
        </div>
        <div class="flex gap-8">
          <select class="filter-select"><option>Purchase Funnel</option><option>Support Funnel</option><option>Onboarding Funnel</option></select>
          <select class="filter-select"><option>All Channels</option><option>Web Only</option><option>Mobile Only</option></select>
        </div>
      </div>

      <div class="grid-60-40 mb-20">
        <div class="card">
          <div class="section-title">Purchase Funnel — Stage Drop-Off</div>
          <p class="text-sm text-muted mb-20" style="margin-top:-8px">Sample data for demonstration · 12,470 customers entered this funnel</p>
          ${[
            { stage: 'Homepage Visit', count: 12470, pct: 100, drop: null },
            { stage: 'Product Page View', count: 9847, pct: 79, drop: '21%' },
            { stage: 'Add to Cart', count: 7231, pct: 58, drop: '27%' },
            { stage: 'Checkout Initiated', count: 5108, pct: 41, drop: '29%' },
            { stage: 'Payment Attempted', count: 4012, pct: 32, drop: '21%' },
            { stage: 'Order Confirmed', count: 3201, pct: 26, drop: '20%' },
          ].map((s, i) => `
            <div>
              ${i > 0 ? `<div class="funnel-connector">↓ ${s.drop} drop-off</div>` : ''}
              <div class="funnel-stage">
                <div class="funnel-label">${s.stage}</div>
                <div class="funnel-bar-area">
                  <div class="funnel-fill" data-width="${s.pct}%" style="width:0">
                    ${s.pct}%
                  </div>
                </div>
                <div class="funnel-count">${s.count.toLocaleString()}</div>
              </div>
            </div>
          `).join('')}

          <div class="separator mt-20"></div>
          <div class="text-sm text-muted">
            Largest drop-off: <strong style="color:var(--red)">Checkout → Payment (29%)</strong> · Correlates with payment gateway timeout spike detected on 2026-03-10.
          </div>
        </div>

        <div class="card">
          <div class="section-title">Channel-Specific Drop-Off Rates</div>
          <div class="chart-container mb-20"><canvas id="chart-dropoff-channel"></canvas></div>
          <div class="section-title mt-16">Failed Transition Hotspots</div>
          ${[
            { from: 'CHECKOUT', to: 'PAYMENT_FAIL', pct: '29.1%', color: 'var(--red)' },
            { from: 'PRODUCT_VIEW', to: 'SESSION_END', pct: '21.4%', color: 'var(--amber)' },
            { from: 'CART_ADD', to: 'SESSION_END', pct: '15.8%', color: 'var(--amber)' },
            { from: 'PAYMENT_FAIL', to: 'NO_RETRY', pct: '38.2%', color: 'var(--red)' },
          ].map(t => `
            <div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.04)">
              <span class="font-mono text-sm" style="color:var(--purple-light)">${t.from}</span>
              <span style="color:var(--text-muted)">→</span>
              <span class="font-mono text-sm" style="color:${t.color}">${t.to}</span>
              <span style="margin-left:auto;font-weight:700;color:${t.color}">${t.pct}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="card">
        <div class="section-title">Drop-Off Trend Over Time</div>
        <div class="chart-container-lg"><canvas id="chart-dropoff-trend"></canvas></div>
      </div>
    </div>
  `;
}

function initDropoff() {
  const c1 = document.getElementById('chart-dropoff-channel');
  if (c1) {
    activeCharts.push(new Chart(c1, {
      type: 'bar',
      data: {
        labels: ['Web', 'Mobile App', 'Email', 'Direct'],
        datasets: [
          { label: 'Cart→Checkout Drop', data: [29, 22, 35, 18], backgroundColor: '#ef4444' },
          { label: 'Checkout→Payment Drop', data: [19, 14, 28, 12], backgroundColor: '#f59e0b' },
        ]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top', labels: { boxWidth: 10, font: { size: 11 } } } },
        scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { callback: v => v + '%' } } }
      }
    }));
  }

  const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'];
  const c2 = document.getElementById('chart-dropoff-trend');
  if (c2) {
    activeCharts.push(new Chart(c2, {
      type: 'line',
      data: {
        labels: weeks,
        datasets: [
          { label: 'Overall Drop-Off %', data: [34, 31, 36, 29, 33, 28, 27, 26], borderColor: '#6366f1', backgroundColor: 'rgba(99,102,241,0.08)', tension: 0.4, fill: true, pointRadius: 4, borderWidth: 2 },
          { label: 'Payment Stage Drop', data: [42, 38, 44, 35, 38, 33, 31, 29], borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.05)', tension: 0.4, fill: true, pointRadius: 4, borderWidth: 2 },
        ]
      },
      options: { responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'top', labels: { boxWidth: 10, font: { size: 12 } } } },
        scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { callback: v => v + '%' } } }
      }
    }));
  }
}

/* =============================================
   PAGE: ESCALATION CENTER
   ============================================= */
function renderEscalation() {
  const escalations = [
    { id: 'ESC-0041', customer: 'Rohan Sharma', issue: 'Billing Payment Failure', level: 'HARD', conf: 97, age: '5d 2h', contacts: 5, channels: ['CALL','EMAIL','CHAT'], reason: 'Supervisor request + 3 repeat contacts + negative sentiment trend' },
    { id: 'ESC-0038', customer: 'Vikram Iyer', issue: 'Refund Not Processed', level: 'HARD', conf: 91, age: '3d 7h', contacts: 4, channels: ['CALL','EMAIL'], reason: 'Negative sentiment escalation + SLA breach (72h)' },
    { id: 'ESC-0035', customer: 'Aarav Mehta', issue: 'Payment Gateway Timeout', level: 'SOFT', conf: 78, age: '1d 4h', contacts: 3, channels: ['CHAT','EMAIL','CALL'], reason: 'Contact count ≥ 3 + rising negative sentiment' },
    { id: 'ESC-0031', customer: 'Deepa Krishnan', issue: 'Account Login Block', level: 'SOFT', conf: 71, age: '22h', contacts: 2, channels: ['APP','EMAIL'], reason: 'SLA first-response breach + category: ACCOUNT_ACCESS' },
    { id: 'ESC-0029', customer: 'Anil Verma', issue: 'Delivery Tracking Error', level: 'WATCH', conf: 58, age: '12h', contacts: 2, channels: ['CHAT','WEB'], reason: 'Sentiment trending negative; contact_count approaching threshold' },
    { id: 'ESC-0027', customer: 'Sneha Patel', issue: 'Invoice Discrepancy', level: 'WATCH', conf: 44, age: '6h', contacts: 1, channels: ['EMAIL'], reason: 'Semantic similarity to past escalation category; watch-listed' },
  ];

  return `
    <div class="page">
      <div class="flex-between mb-20">
        <div>
          <h1 class="page-title">Escalation Center</h1>
          <p class="page-subtitle">Real-time triage — rule-based + AI-based escalation signals, sorted by confidence and age</p>
        </div>
        <div class="flex gap-8">
          <span class="badge badge-red" style="font-size:13px;padding:8px 14px">🔴 2 HARD</span>
          <span class="badge badge-amber" style="font-size:13px;padding:8px 14px">🟡 2 SOFT</span>
          <span class="badge badge-cyan" style="font-size:13px;padding:8px 14px">🔵 2 WATCH</span>
        </div>
      </div>

      <!-- METRICS -->
      <div class="kpi-grid mb-20" style="grid-template-columns:repeat(4,1fr)">
        ${[
          { label: 'Open Escalations', value: '6', color: 'var(--red)', icon: '🚨' },
          { label: 'Avg Escalation Age', value: '1d 19h', color: 'var(--amber)', icon: '⏱️' },
          { label: 'Resolved Today', value: '18', color: 'var(--green)', icon: '✅' },
          { label: 'Repeat-Escalated', value: '3', color: 'var(--red)', icon: '🔁' },
        ].map(k => `
          <div class="kpi-card">
            <div class="kpi-icon" style="background:rgba(255,255,255,0.06);font-size:20px">${k.icon}</div>
            <div class="kpi-value" style="color:${k.color}">${k.value}</div>
            <div class="kpi-label">${k.label}</div>
          </div>
        `).join('')}
      </div>

      <!-- ESCALATION TABLE -->
      <div class="card mb-20">
        <div class="flex-between mb-16">
          <div class="section-title mb-0">Active Escalations</div>
          <div class="flex gap-8">
            <select class="filter-select"><option>All Levels</option><option>HARD</option><option>SOFT</option><option>WATCH</option></select>
          </div>
        </div>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr><th>ID</th><th>Customer</th><th>Issue Category</th><th>Level</th><th>Confidence</th><th>Age</th><th>Contacts</th><th>Channels</th><th>Action</th></tr>
            </thead>
            <tbody>
              ${escalations.map(e => `
                <tr>
                  <td class="primary font-mono">${e.id}</td>
                  <td class="primary">${e.customer}</td>
                  <td>${e.issue}</td>
                  <td>
                    <div class="escalation-level esc-${e.level.toLowerCase()}">
                      ${e.level === 'HARD' ? '🔴' : e.level === 'SOFT' ? '🟡' : '🔵'}
                      ${e.level}
                    </div>
                  </td>
                  <td>
                    <div class="confidence-bar">
                      <div class="confidence-track" style="max-width:60px"><div class="confidence-fill" style="width:${e.conf}%;background:${e.conf>80?'var(--red)':e.conf>60?'var(--amber)':'var(--cyan)'}"></div></div>
                      <span style="font-weight:700;font-size:13px;color:${e.conf>80?'var(--red)':e.conf>60?'var(--amber)':'var(--cyan)'}">${e.conf}%</span>
                    </div>
                  </td>
                  <td class="font-mono text-sm text-amber">${e.age}</td>
                  <td style="text-align:center"><span style="font-weight:700;color:${e.contacts>=4?'var(--red)':'var(--text-primary)'}">${e.contacts}</span></td>
                  <td><div class="chip-row">${e.channels.map(ch => `<span class="channel-chip ch-${ch.toLowerCase()}">${ch}</span>`).join('')}</div></td>
                  <td><button class="btn btn-secondary" style="padding:6px 12px;font-size:12px">Triage</button></td>
                </tr>
                <tr>
                  <td colspan="9" style="background:rgba(99,102,241,0.04);padding:8px 16px;font-size:12px;color:var(--text-muted)">
                    <strong style="color:var(--text-secondary)">Signal:</strong> ${e.reason}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- ESCALATION CHARTS -->
      <div class="grid-2">
        <div class="card">
          <div class="section-title">Escalations by Issue Category</div>
          <div class="chart-container"><canvas id="chart-esc-cat"></canvas></div>
        </div>
        <div class="card">
          <div class="section-title">Escalation Detection Signal Mix</div>
          <div class="chart-container"><canvas id="chart-esc-signals"></canvas></div>
        </div>
      </div>
    </div>
  `;
}

function initEscalation() {
  const c1 = document.getElementById('chart-esc-cat');
  if (c1) {
    activeCharts.push(new Chart(c1, {
      type: 'bar',
      data: {
        labels: ['Billing', 'Account', 'Delivery', 'Refund', 'Technical', 'Other'],
        datasets: [{ label: 'Escalations', data: [124, 87, 61, 48, 33, 17], backgroundColor: ['#6366f1','#22d3ee','#10b981','#f59e0b','#ef4444','#818cf8'], borderRadius: 4 }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(255,255,255,0.04)' } } } }
    }));
  }
  const c2 = document.getElementById('chart-esc-signals');
  if (c2) {
    activeCharts.push(new Chart(c2, {
      type: 'radar',
      data: {
        labels: ['Contact Count', 'Negative Sentiment', 'SLA Breach', 'Supervisor Request', 'Channel Switch', 'Keyword Detection'],
        datasets: [{ label: 'Signal Contribution', data: [85, 72, 61, 48, 55, 67], backgroundColor: 'rgba(99,102,241,0.15)', borderColor: '#6366f1', pointBackgroundColor: '#6366f1', borderWidth: 2 }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { r: { grid: { color: 'rgba(255,255,255,0.07)' }, pointLabels: { font: { size: 11 }, color: '#a0a0c0' }, ticks: { display: false }, beginAtZero: true } } }
    }));
  }
}

/* =============================================
   PAGE: REPEATED CONTACT ANALYSIS
   ============================================= */
function renderRepeatedContact() {
  return `
    <div class="page">
      <h1 class="page-title">Repeated Contact Analysis</h1>
      <p class="page-subtitle">Issue threads with high contact and channel counts — revealing systematic process failures</p>

      <div class="kpi-grid mb-20" style="grid-template-columns:repeat(4,1fr)">
        ${[
          { label: 'Threads Flagged', value: '1,908', color: 'var(--red)', icon: '🔁' },
          { label: 'Avg Contact Count', value: '4.2', color: 'var(--amber)', icon: '📞' },
          { label: 'Avg Channels Used', value: '2.8', color: 'var(--cyan)', icon: '📡' },
          { label: 'FCR Rate', value: '61%', color: 'var(--green)', icon: '✅' },
        ].map(k => `
          <div class="kpi-card">
            <div class="kpi-icon" style="background:rgba(255,255,255,0.06);font-size:20px">${k.icon}</div>
            <div class="kpi-value" style="color:${k.color}">${k.value}</div>
            <div class="kpi-label">${k.label}</div>
          </div>
        `).join('')}
      </div>

      <div class="grid-60-40 mb-20">
        <div class="card">
          <div class="section-title">Repeated Contact Threads — High Priority</div>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr><th>Thread ID</th><th>Customer</th><th>Category</th><th>Contacts</th><th>Channels</th><th>Duration</th><th>Status</th></tr>
              </thead>
              <tbody>
                ${[
                  { tid: '#TH-4471', cust: 'Aarav Mehta', cat: 'BILLING_PAYMENT_FAILURE', contacts: 5, ch: ['CHAT','EMAIL','CALL'], dur: '3d', status: 'Resolved', sb: 'badge-green' },
                  { tid: '#TH-4219', cust: 'Rohan Sharma', cat: 'BILLING_PAYMENT_FAILURE', contacts: 7, ch: ['CALL','EMAIL','CALL','CHAT'], dur: '12d', status: 'Escalated', sb: 'badge-red' },
                  { tid: '#TH-3980', cust: 'Vikram Iyer', cat: 'REFUND_REQUEST', contacts: 4, ch: ['EMAIL','CALL'], dur: '5d', status: 'In Progress', sb: 'badge-amber' },
                  { tid: '#TH-3701', cust: 'Kavya Reddy', cat: 'ACCOUNT_ACCESS', contacts: 3, ch: ['APP','EMAIL'], dur: '1d', status: 'Resolved', sb: 'badge-green' },
                  { tid: '#TH-3544', cust: 'Ajay Singh', cat: 'DELIVERY_TRACKING', contacts: 5, ch: ['CHAT','WEB','CALL'], dur: '4d', status: 'Escalated', sb: 'badge-red' },
                  { tid: '#TH-3201', cust: 'Meera Joshi', cat: 'TECHNICAL_FAULT', contacts: 4, ch: ['EMAIL','CALL'], dur: '7d', status: 'Unresolved', sb: 'badge-red' },
                ].map(t => `
                  <tr>
                    <td class="primary font-mono">${t.tid}</td>
                    <td>${t.cust}</td>
                    <td><span class="badge badge-purple text-xs">${t.cat}</span></td>
                    <td style="font-weight:700;color:${t.contacts>=5?'var(--red)':'var(--amber)'}">${t.contacts}</td>
                    <td><div class="chip-row">${t.ch.map(c => `<span class="channel-chip ch-${c.toLowerCase()}">${c}</span>`).join('')}</div></td>
                    <td class="font-mono text-sm">${t.dur}</td>
                    <td><span class="badge ${t.sb}">${t.status}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="card">
          <div class="section-title">Repeat Contacts by Category</div>
          <div class="chart-container mb-20"><canvas id="chart-rc-cat"></canvas></div>
          <div class="section-title mt-8">Channel Failure Analysis</div>
          <p class="text-xs text-muted mb-12">Channels where issues most frequently require re-contact</p>
          ${[
            { ch: 'Chatbot', pct: '48%', w: '48%', note: 'Complex billing not resolved' },
            { ch: 'Email', pct: '31%', w: '31%', note: 'Slow SLA response triggers call' },
            { ch: 'Mobile App', pct: '22%', w: '22%', note: 'UI flow unclear for refunds' },
            { ch: 'Call Center', pct: '17%', w: '17%', note: 'Transfer loops detected' },
          ].map(r => `
            <div class="progress-bar-wrapper">
              <div class="progress-label">
                <span class="progress-label-name">${r.ch} <span class="text-xs text-muted">· ${r.note}</span></span>
                <span class="progress-label-value">${r.pct}</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill red" data-width="${r.w}" style="width:0"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function initRepeatedContact() {
  const c = document.getElementById('chart-rc-cat');
  if (c) {
    activeCharts.push(new Chart(c, {
      type: 'doughnut',
      data: {
        labels: ['Billing', 'Delivery', 'Account', 'Refund', 'Technical'],
        datasets: [{ data: [38, 24, 18, 12, 8], backgroundColor: ['#6366f1','#22d3ee','#f59e0b','#10b981','#ef4444'], borderWidth: 0, hoverOffset: 4 }]
      },
      options: { responsive: true, maintainAspectRatio: false, cutout: '65%', plugins: { legend: { position: 'bottom', labels: { boxWidth: 9, font: { size: 11 }, padding: 8 } } } }
    }));
  }
}

/* =============================================
   PAGE: CHURN INTELLIGENCE
   ============================================= */
function renderChurn() {
  return `
    <div class="page">
      <div class="flex-between mb-8">
        <div>
          <h1 class="page-title">Churn Intelligence</h1>
          <p class="page-subtitle">Evidence-labeled correlation analysis — fact / correlation / hypothesis, no causal claims</p>
        </div>
        <div>
          <span class="badge badge-amber">⚠️ Correlational · Not Causal</span>
        </div>
      </div>

      <!-- EVIDENCE NOTE -->
      <div style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.2);border-radius:var(--radius);padding:14px 18px;margin-bottom:24px;font-size:13px;color:var(--amber-light)">
        <strong>Evidence Discipline:</strong> All outputs below are explicitly labeled as
        <span class="badge badge-cyan" style="margin:0 4px">OBSERVED FACT</span>
        <span class="badge badge-purple" style="margin:0 4px">CORRELATION</span> or
        <span class="badge badge-amber" style="margin:0 4px">AI HYPOTHESIS</span>.
        No causal claims about churn are made without validated experimental evidence.
      </div>

      <div class="grid-2 mb-20">
        <div class="card">
          <div class="section-title">Churn Signal Correlation Strength</div>
          <p class="text-xs text-muted mb-16">Spearman correlation with historical churn label · Dataset: 24,871 customers</p>
          ${[
            { name: 'Repeated Support Contacts (≥3)', r: 0.74, color: 'var(--red)', type: 'CORRELATION', icon: '🔁' },
            { name: 'Unresolved Issues (>72h)', r: 0.68, color: 'var(--red)', type: 'CORRELATION', icon: '⚠️' },
            { name: 'Multiple Escalations (≥2)', r: 0.63, color: 'var(--amber)', type: 'CORRELATION', icon: '🚨' },
            { name: 'Negative Sentiment Trend', r: 0.59, color: 'var(--amber)', type: 'CORRELATION', icon: '😤' },
            { name: 'High Friction Score (>70)', r: 0.57, color: 'var(--amber)', type: 'CORRELATION', icon: '🔥' },
            { name: 'Frequent Channel Switching', r: 0.44, color: 'var(--cyan)', type: 'CORRELATION', icon: '🔀' },
            { name: 'Long Resolution Time (>SLA)', r: 0.41, color: 'var(--cyan)', type: 'CORRELATION', icon: '⏱️' },
            { name: 'Reduced Product Activity', r: 0.38, color: 'var(--cyan)', type: 'CORRELATION', icon: '📉' },
          ].map(s => `
            <div class="signal-row">
              <div class="signal-icon-wrap" style="background:rgba(255,255,255,0.05);font-size:16px">${s.icon}</div>
              <div style="flex:1">
                <div class="font-600 text-sm mb-8">${s.name}</div>
                <span class="badge badge-${s.type==='CORRELATION'?'purple':'amber'}" style="font-size:10px">${s.type}</span>
              </div>
              <div class="signal-bar-wrap">
                <div class="progress-track">
                  <div class="progress-fill" style="width:${s.r*100}%;background:${s.color};transition:width 1s ease"></div>
                </div>
              </div>
              <div class="signal-correlation" style="color:${s.color}">r=${s.r}</div>
            </div>
          `).join('')}
        </div>

        <div>
          <div class="card mb-20">
            <div class="section-title">Churn Risk Distribution</div>
            <div class="chart-container-sm"><canvas id="chart-churn-risk"></canvas></div>
          </div>
          <div class="card">
            <div class="section-title">Model Performance Summary</div>
            <p class="text-xs text-muted mb-12">Logistic Regression baseline · 80/20 train-test split · Sample data</p>
            ${[
              { label: 'Accuracy', value: '79.3%', color: 'var(--green)' },
              { label: 'Precision', value: '74.1%', color: 'var(--cyan)' },
              { label: 'Recall', value: '81.2%', color: 'var(--purple-light)' },
              { label: 'F1 Score', value: '77.5%', color: 'var(--amber)' },
            ].map(m => `
              <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.04)">
                <span class="text-sm text-secondary">${m.label}</span>
                <span style="font-weight:700;font-size:15px;color:${m.color}">${m.value}</span>
              </div>
            `).join('')}
            <div class="text-xs text-muted mt-12">⚠️ These are proposed test metrics, not production measurements. Actual performance would require validation on labeled production data.</div>
          </div>
        </div>
      </div>

      <div class="grid-2 mb-20">
        <div class="card">
          <div class="section-title">Churn Rate by Friction Band</div>
          <div class="chart-container"><canvas id="chart-churn-friction"></canvas></div>
        </div>
        <div class="card">
          <div class="section-title">AI-Generated Hypotheses</div>
          <p class="text-xs text-muted mb-16">Generated by AI Journey Analyst · <span class="badge badge-amber" style="font-size:10px">UNVERIFIED HYPOTHESIS</span></p>
          ${[
            { q: 'Why do BILLING category customers churn at higher rates?', a: 'Customers experiencing payment gateway failures who are not resolved within 48h show 2.3× higher historical churn rates (correlation, not causation). The chatbot\'s inability to handle billing refunds on first contact may be a contributing factor. Requires validation.' },
            { q: 'Which journey pattern clusters with highest churn?', a: 'WEB:PAYMENT_FAIL → CALL:INBOUND → CALL:SUPERVISOR fingerprint cluster shows 67% historical churn rate in the dataset. This is a correlational observation based on 847 matched journeys.' },
          ].map(h => `
            <div style="background:rgba(245,158,11,0.06);border:1px solid rgba(245,158,11,0.15);border-radius:var(--radius);padding:14px;margin-bottom:12px">
              <div class="font-600 text-sm mb-8" style="color:var(--amber-light)">❓ ${h.q}</div>
              <div class="text-sm" style="color:var(--text-secondary);line-height:1.7">${h.a}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function initChurn() {
  const c1 = document.getElementById('chart-churn-risk');
  if (c1) {
    activeCharts.push(new Chart(c1, {
      type: 'doughnut',
      data: {
        labels: ['Low', 'Medium', 'High', 'Critical'],
        datasets: [{ data: [12400, 7300, 3800, 1371], backgroundColor: ['#10b981','#f59e0b','#ef4444','#7f1d1d'], borderWidth: 0, hoverOffset: 4 }]
      },
      options: { responsive: true, maintainAspectRatio: false, cutout: '70%', plugins: { legend: { position: 'right', labels: { boxWidth: 8, font: { size: 11 }, padding: 8 } } } }
    }));
  }

  const c2 = document.getElementById('chart-churn-friction');
  if (c2) {
    activeCharts.push(new Chart(c2, {
      type: 'bar',
      data: {
        labels: ['0–20\n(Low)', '21–40', '41–60', '61–80', '81–100\n(High)'],
        datasets: [{ label: 'Historical Churn Rate %', data: [4, 9, 18, 34, 62], backgroundColor: ['#10b981','#34d399','#f59e0b','#fb923c','#ef4444'], borderRadius: 6 }]
      },
      options: { responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: { title: { display: true, text: 'Friction Score Band', color: '#6060a0', font: { size: 11 } }, grid: { display: false } }, y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { callback: v => v + '%' } } }
      }
    }));
  }
}

/* =============================================
   PAGE: AI JOURNEY ANALYST
   ============================================= */
const AI_RESPONSES = {
  default: [
    { q: 'Why was customer CUST-1001 escalated?', a: `Based on Issue Thread #4471 (5 interactions across CHAT, EMAIL, and CALL over 3 days):

<div class="msg-citation"><div class="msg-label">📌 Observed Facts</div>The customer contacted support 3 times about the same payment-failure issue [contact_count ≥ 3, thread status ≠ RESOLVED]. A supervisor request keyword was detected in the final call transcript. Sentiment across the thread trended from Neutral → Negative → Strongly Negative.</div>

<div class="msg-citation" style="margin-top:8px"><div class="msg-label">📊 Rule Trigger</div>Rule: contact_count ≥ 3 AND channel_count ≥ 2 AND supervisor_keyword = TRUE → HARD escalation. Confidence: 97%.</div>

These are observed facts and rule triggers, not a prediction of future behavior.` },
  ],
  'repeated contact': { a: `<div class="msg-citation"><div class="msg-label">📌 Observed Facts</div>Thread #4471 has contact_count = 5 across 3 channels (CHAT, EMAIL, CALL) over 3 days. This exceeds the repeat-contact threshold (contact_count ≥ 3, channel_count ≥ 2).</div>

The root issue is a payment-gateway timeout that was not resolved by the chatbot on first contact. The chatbot lacked authorization to process billing refunds, requiring escalation to a human agent. This is an observed process gap, not a causal explanation for churn.` },
  'drop off': { a: `<div class="msg-citation"><div class="msg-label">📊 Observed Correlation</div>The largest observed drop-off in the Purchase Funnel occurs at the Checkout → Payment stage (29.1%). This coincides with a payment gateway timeout incident on 2026-03-10.</div>

<div class="msg-citation" style="margin-top:8px"><div class="msg-label">🔬 AI Hypothesis (Unverified)</div>The 38.2% of customers who experienced PAYMENT_FAIL and did not retry may not have understood that their card was not charged. Clearer error messaging could reduce re-contact rates. This is a hypothesis requiring validation.</div>` },
  'friction': { a: `<div class="msg-citation"><div class="msg-label">📌 Observed Facts</div>Customer CUST-1001 has a Journey Friction Score of 72/100 (High Friction band). Component breakdown: Repeat contacts (×5) × 0.3 + Escalation flag × 0.25 + Resolution time (72h) × 0.2 + Negative sentiment × 0.15 + Channel switches (3) × 0.1.</div>

This places them in the 81–100 historical cohort with a 62% observed historical churn rate correlation. Note: correlation, not causation.` },
  'churn': { a: `<div class="msg-citation"><div class="msg-label">📊 Statistical Correlation</div>Customers with contact_count ≥ 3 and unresolved issues > 72h show a Spearman correlation of r=0.74 with historical churn labels in this dataset. Random forest SHAP values rank "repeated contact" as the highest-importance feature.</div>

<div class="msg-citation" style="margin-top:8px"><div class="msg-label">⚠️ Important Caveat</div>These are historical correlations in training data and may not generalize. JourneyX does not assert that any signal causes churn without validated experimental evidence (e.g., A/B test).</div>` },
};

let chatMessages = [];

function renderAIAnalyst() {
  chatMessages = [
    { role: 'ai', text: `Hello! I'm the AI Journey Analyst, powered by Retrieval-Augmented Generation (RAG) over JourneyX's unified journey data.<br/><br/>I can answer questions about customer journeys, issue threads, escalations, churn correlations, and more. My answers clearly distinguish:<br/>
<span class="badge badge-cyan" style="margin:2px">OBSERVED FACT</span>
<span class="badge badge-purple" style="margin:2px">CORRELATION</span>
<span class="badge badge-amber" style="margin:2px">AI HYPOTHESIS</span><br/><br/>
What would you like to explore?` }
  ];

  return `
    <div class="page">
      <h1 class="page-title">AI Journey Analyst</h1>
      <p class="page-subtitle">Natural-language interface over unified journey data · Evidence-grounded · RAG-powered</p>

      <div class="grid-60-40">
        <div>
          <div class="chat-container">
            <div class="chat-header">
              <div class="chat-avatar">🤖</div>
              <div class="chat-info">
                <h3>AI Journey Analyst</h3>
                <p>RAG · Sentence-BERT · Evidence-Grounded</p>
              </div>
              <div class="chat-status">
                <span class="status-dot pulse"></span>
                Online
              </div>
            </div>

            <div class="chat-messages" id="chat-messages">
              ${renderChatMessages()}
            </div>

            <div class="chat-input-area">
              <div class="quick-queries" id="quick-queries">
                <button class="quick-query-btn" data-query="Why was customer CUST-1001 escalated?">Why was CUST-1001 escalated?</button>
                <button class="quick-query-btn" data-query="Why do customers repeat contact?">Why do customers repeat contact?</button>
                <button class="quick-query-btn" data-query="Where does the journey drop off?">Where does the journey drop off?</button>
                <button class="quick-query-btn" data-query="What signals correlate with churn?">Churn correlation signals?</button>
                <button class="quick-query-btn" data-query="What is the friction score for CUST-1001?">Friction score for CUST-1001?</button>
              </div>
              <div class="chat-input-row">
                <textarea class="chat-input" id="chat-input" rows="1" placeholder="Ask about any customer journey, issue, escalation, or churn signal..."></textarea>
                <button class="chat-send-btn" id="chat-send-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="card mb-16">
            <div class="section-title">Example Questions</div>
            ${[
              'Why did this customer contact support repeatedly?',
              'Where did this journey break down?',
              'Why was the issue escalated?',
              'Which channel caused the most friction?',
              'Which issues remain unresolved?',
              'Which journey patterns correlate with historical churn?',
              'Which customer segments experience the most friction?',
              'What are the most common failure journeys?',
            ].map(q => `<div style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);font-size:13px;color:var(--text-secondary)">→ ${q}</div>`).join('')}
          </div>

          <div class="card">
            <div class="section-title">AI System Design</div>
            ${[
              { label: 'RAG Architecture', desc: 'Unified journey data indexed in vector store; retrieved by semantic similarity before answering.' },
              { label: 'Evidence Classification', desc: 'Every statement labeled as Observed Fact, Statistical Correlation, or AI Hypothesis.' },
              { label: 'Embedding Model', desc: 'Sentence-BERT (all-mpnet-base-v2) for semantic similarity matching over journey events.' },
              { label: 'Constraint', desc: 'Model constrained to journey data — no unsupported statistics or causal churn claims.' },
            ].map(m => `
              <div style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.04)">
                <div class="font-600 text-sm mb-8">${m.label}</div>
                <div class="text-xs text-secondary">${m.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderChatMessages() {
  return chatMessages.map(msg => `
    <div class="chat-msg ${msg.role}">
      <div class="msg-avatar ${msg.role}">${msg.role === 'ai' ? '🤖' : '👤'}</div>
      <div class="msg-bubble">${msg.text}</div>
    </div>
  `).join('');
}

function initAIAnalyst() {
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send-btn');
  const messagesEl = document.getElementById('chat-messages');

  function getAIResponse(question) {
    const q = question.toLowerCase();
    if (q.includes('escalat')) return AI_RESPONSES['default'][0].a;
    if (q.includes('repeat') || q.includes('multiple contact')) return AI_RESPONSES['repeated contact'].a;
    if (q.includes('drop') || q.includes('abandon')) return AI_RESPONSES['drop off'].a;
    if (q.includes('friction') || q.includes('score')) return AI_RESPONSES['friction'].a;
    if (q.includes('churn') || q.includes('correl')) return AI_RESPONSES['churn'].a;
    return `<div class="msg-citation"><div class="msg-label">📌 Query Processed</div>Searching unified journey data for: "${question}"</div><br/>Based on the current dataset of 24,871 customers across 10 channels: I found relevant journey patterns and issue threads matching your query. For a detailed analysis, please specify a customer ID (e.g., CUST-1001) or issue thread (e.g., Thread #4471).<br/><br/>Try asking: "Why was CUST-1001 escalated?" or "Where does the purchase journey drop off?"`;
  }

  function sendMessage(text) {
    if (!text.trim()) return;
    chatMessages.push({ role: 'user', text: text });
    messagesEl.innerHTML = renderChatMessages();

    // Show typing indicator
    const typingEl = document.createElement('div');
    typingEl.className = 'chat-msg ai';
    typingEl.innerHTML = `<div class="msg-avatar ai">🤖</div><div class="msg-bubble"><div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div></div>`;
    messagesEl.appendChild(typingEl);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    setTimeout(() => {
      typingEl.remove();
      chatMessages.push({ role: 'ai', text: getAIResponse(text) });
      messagesEl.innerHTML = renderChatMessages();
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }, 1200 + Math.random() * 800);

    if (input) input.value = '';
  }

  sendBtn?.addEventListener('click', () => sendMessage(input?.value || ''));

  input?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input.value);
    }
  });

  document.querySelectorAll('.quick-query-btn').forEach(btn => {
    btn.addEventListener('click', () => sendMessage(btn.dataset.query));
  });

  // Auto-resize textarea
  input?.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  });
}

/* =============================================
   INIT
   ============================================= */
const initialPage = location.hash.replace('#', '') || 'home';
navigate(initialPage);
