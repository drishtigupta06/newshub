/**
 * NewsHub - Complete Frontend News Portal Application
 * Architecture: Vanilla JavaScript (ES6+), Event-Driven, LocalStorage Persistence
 * Features: Dynamic News Rendering, Search, Category Filtering, Read-More Modal,
 *           Dark/Light Mode, Bookmarks System, Newsletter Validation, Live Ticker.
 */

// Wrap in an IIFE and expose NewsApp to window for inline onclick handlers
(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Sample News Database (15 Detailed Articles Across 5 Desks)
  // --------------------------------------------------------------------------
  const NEWS_DATA = [
    {
      id: 1,
      title: "Global Clean Energy Summit Announces Unified Solar & Grid Resilience Standards",
      category: "Technology",
      description: "Delegates from 48 nations have ratified groundbreaking interoperability protocols aimed at modernizing aging energy grids with distributed renewable storage.",
      content: `
        <p class="article-lead">Delegates from 48 nations concluded a historic week in Zurich by ratifying the first comprehensive international standards for clean energy grid synchronization, marking a decisive shift toward decentralized power infrastructures.</p>
        <p>The landmark accord, known as the Trans-Continental Grid Framework (TCGF), establishes mandatory software interoperability for next-generation solar arrays, utility-scale battery energy storage systems (BESS), and microgrid controllers. Engineering consortiums estimate that adopting unified power frequency modulation could reduce grid transmission losses by up to 14% globally over the next decade.</p>
        <blockquote>"We are moving from a century of centralized vulnerability to an era of decentralized, self-healing grid resilience. Technology standards are the unsung foundation of energy security." — Dr. Elena Vance, Lead Technical Rapporteur</blockquote>
        <p>In addition to software protocols, the treaty outlines rigorous lifecycle recycling mandates for photovoltaic panels and lithium-ion cells. Manufacturers selling equipment across signatory markets will be required to provide certified open telemetry APIs, preventing proprietary lock-in by dominant energy conglomerates.</p>
        <p>Pilot implementations will commence early next quarter across municipal testing grounds in Scandinavia, Japan, and the Pacific Northwest, with full regional compliance expected by late 2028.</p>
      `,
      image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
      date: "October 25, 2026",
      author: "Sarah Jenkins, Energy & Tech Correspondent",
      readTime: "5 min read",
      featured: true,
      trendingRank: 1,
      tags: ["Renewable Energy", "Smart Grids", "Climate Tech", "Global Policy"]
    },
    {
      id: 2,
      title: "Next-Gen 2nm Microarchitecture Delivers 40% Efficiency Gains for Mobile AI",
      category: "Technology",
      description: "Semiconductor researchers unveiled radical gate-all-around transistor silicon designed to execute generative models locally with minimal battery drain.",
      content: `
        <p class="article-lead">In a breakthrough for embedded computing, leading semiconductor engineers have published benchmark metrics demonstrating full local inference of large multimodal models within a 3-watt mobile thermal envelope.</p>
        <p>The new architecture leverages nanosheet field-effect transistors (GAAFET) fabricated on advanced extreme ultraviolet (EUV) lithography scanners. By integrating dedicated neural processing arrays directly adjacent to high-bandwidth on-die cache, memory latency has been slashed by two-thirds.</p>
        <p>For everyday smartphone users, this technological leap translates into real-time voice translation, privacy-preserving contextual intelligence, and studio-grade photographic synthesis without sending personal biometric or conversational data to external cloud servers.</p>
        <p>Commercial silicon utilizing the validated wafer design is expected to enter volume trial runs by early next year, heralding a new wave of autonomous edge devices.</p>
      `,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
      date: "October 24, 2026",
      author: "David Chen, Hardware Analyst",
      readTime: "4 min read",
      featured: false,
      trendingRank: 2,
      tags: ["Hardware", "Semiconductors", "Edge AI", "Mobile"]
    },
    {
      id: 3,
      title: "Open Source Operating Systems Mark Milestone Adoption Across Municipal Services",
      category: "Technology",
      description: "Over thirty European metropolitan agencies complete their transition to hardened open platforms, citing auditability and sovereignty.",
      content: `
        <p class="article-lead">Public sector IT infrastructures are undergoing a structural shift toward verifiable, open-source technology stacks as metropolitan governments seek greater digital sovereignty.</p>
        <p>A multi-year municipal audit revealed that deploying custom Linux distributions and transparent database management tools reduced licensing expenditures by 38% while dramatically expediting security patch turnaround times. Civic services, ranging from transportation dispatch to property registries, now operate on reproducible software builds.</p>
        <p>The initiative also spurred partnerships with local university computer science departments, where students contribute audited security patches as accredited coursework, establishing a sustainable pipeline of regional technical talent.</p>
      `,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80",
      date: "October 23, 2026",
      author: "Marcus Lindqvist, Cyber Infrastructure Desk",
      readTime: "3 min read",
      featured: false,
      trendingRank: null,
      tags: ["Open Source", "Cybersecurity", "Civic Tech"]
    },
    {
      id: 4,
      title: "World Athletics Federation Approves Advanced Biometric Track Surface Standards",
      category: "Sports",
      description: "Synthetic running surfaces embedded with micro-sensors will provide real-time stride dynamics and fatigue tracking at the upcoming World Games.",
      content: `
        <p class="article-lead">The governing body of international track and field has officially ratified technical guidelines for smart athletic tracks, opening a new frontier in performance telemetry and injury prevention.</p>
        <p>Embedded beneath the vulcanized rubber upper layer is a passive piezo-electric sensor mesh capable of measuring ground contact time, force vector distribution, and lateral stride deviation with millisecond accuracy. Unlike wearable beacons, the smart surface requires no active batteries or cumbersome athlete sensors.</p>
        <blockquote>"Athletes and physiotherapists will receive immediate diagnostics on gait asymmetry before microscopic fatigue manifests as tendon strain." — Coach Liam O'Connor</blockquote>
        <p>Broadcasters are also collaborating with sports technology partners to integrate anonymized stride cadence into live overlays, granting viewers unprecedented technical depth into competitive sprint pacing.</p>
      `,
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1000&q=80",
      date: "October 25, 2026",
      author: "Amina Al-Mansoor, Sports Science Reporter",
      readTime: "4 min read",
      featured: false,
      trendingRank: 3,
      tags: ["Athletics", "Sports Tech", "Biomechanics", "World Games"]
    },
    {
      id: 5,
      title: "Historic Overtime Thriller Crowns New Continental Basketball Champions",
      category: "Sports",
      description: "An unbelievable buzzer-beating three-pointer in double overtime seals a 112-110 victory in one of the most watched tournament finals in history.",
      content: `
        <p class="article-lead">In a showdown destined for sports lore, the underdog Coastal Titans clinched their first continental title in a breathless double-overtime thriller before a sold-out crowd of 22,000 roaring fans.</p>
        <p>Down by two points with 4.1 seconds remaining on the clock, guard Mateo Silva received an inbound bounce pass, eluded a double-team with a step-back crossover, and banked in a 28-foot shot as the final horn sounded. The stadium erupted in pandemonium as confetti poured from the rafters.</p>
        <p>The match shattered global digital streaming records, with over 18 million simultaneous viewers tuning in worldwide. Analysts praised the defensive chess match that kept both perennial powerhouses within three points for the entirety of the second half.</p>
      `,
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=80",
      date: "October 24, 2026",
      author: "Jackson Reed, Senior Sports Editor",
      readTime: "3 min read",
      featured: false,
      trendingRank: 4,
      tags: ["Basketball", "Championship", "Tournament", "Buzzer Beater"]
    },
    {
      id: 6,
      title: "Grassroots Youth Academy Reforms Fuel Historic Surge in Emerging Football Talents",
      category: "Sports",
      description: "New training paradigms emphasizing spatial awareness and cognitive agility produce an unprecedented cohort of young playmakers.",
      content: `
        <p class="article-lead">A comprehensive five-year restructuring of national football youth development systems is beginning to pay handsome dividends across top European and South American domestic leagues.</p>
        <p>The revised curriculum deprioritized early physical size and endurance drills in favor of small-sided tactical scenarios that demand rapid sensory recognition and agile spatial decision-making. Scouting reports indicate that average pass-completion under pressure among under-19 players has climbed by 22% compared to historical baselines.</p>
        <p>Several major clubs have already signed teenagers directly into first-team rotations, proving that intellectual tactical maturity can successfully counteract physical deficits on the pitch.</p>
      `,
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80",
      date: "October 22, 2026",
      author: "Carlos Morales, International Football Correspondent",
      readTime: "4 min read",
      featured: false,
      trendingRank: null,
      tags: ["Football", "Soccer", "Youth Development", "Tactics"]
    },
    {
      id: 7,
      title: "Global Diplomatic Summit Yields Comprehensive Maritime Biodiversity Protection Treaty",
      category: "Politics",
      description: "Delegates finalize landmark international protections for high-seas sanctuaries, designating 30% of extraterritorial oceans as restricted conservation zones.",
      content: `
        <p class="article-lead">Following two weeks of intensive multilateral negotiations at the Palais des Nations, negotiators representing 130 countries signed a historic treaty creating legally binding maritime sanctuaries in international waters.</p>
        <p>The treaty establishes autonomous international oversight over previously unregulated open-ocean corridors that harbor fragile deep-sea coral reefs and critical pelagic migratory routes. Under the terms of the agreement, commercial seabed mining and industrial bottom-trawling are strictly barred within designated conservation sectors.</p>
        <blockquote>"The ocean belongs to no single nation, but protecting its life is the collective responsibility of all humanity." — Ambassador Maya Thorne</blockquote>
        <p>A satellite verification network will track automated identification system (AIS) transponders on commercial vessels, enforcing penalties through cooperative coastal coast guard jurisdictions.</p>
      `,
      image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1000&q=80",
      date: "October 25, 2026",
      author: "Helena Rostova, Diplomatic Bureau Chief",
      readTime: "5 min read",
      featured: false,
      trendingRank: 5,
      tags: ["Global Politics", "Treaty", "Ocean Conservation", "Diplomacy"]
    },
    {
      id: 8,
      title: "Parliamentary Committee Unveils Bipartisan Digital Privacy and Algorithmic Audit Bill",
      category: "Politics",
      description: "The proposed legislation mandates independent source code audits for automated consumer decision systems affecting credit, housing, and hiring.",
      content: `
        <p class="article-lead">Lawmakers have introduced a sweeping legislative framework intended to eliminate opaque automated discrimination in essential civic and economic sectors.</p>
        <p>The Algorithmic Transparency and Civic Due Process Act requires corporations utilizing predictive machine-learning scoring systems to maintain reproducible audit logs and undergo mandatory third-party verification for statistical bias. Citizens denied loans, job interviews, or public benefits will receive standardized explanations detailing the decisive criteria.</p>
        <p>The bill has garnered rare bipartisan co-sponsorship from both progressive consumer advocacy coalitions and privacy-minded civil liberties representatives, setting up floor debate next month.</p>
      `,
      image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1000&q=80",
      date: "October 23, 2026",
      author: "Julian Price, Congressional Correspondent",
      readTime: "4 min read",
      featured: false,
      trendingRank: null,
      tags: ["Legislation", "Privacy", "Algorithms", "Civil Rights"]
    },
    {
      id: 9,
      title: "Mayoral Coalition Launches Urban High-Speed Electric Transit Corridors",
      category: "Politics",
      description: "Eight regional mayors pool federal infrastructure bonds to connect underserved transit deserts with clean zero-emission rail.",
      content: `
        <p class="article-lead">Urban transit planners across the central manufacturing corridor have finalized financing for a 240-mile interconnected light rail system designed to bridge long-standing municipal economic divides.</p>
        <p>The initiative, spearheaded by a multi-city coalition of civic leaders, aims to reduce daily commuting times between peripheral residential suburbs and metropolitan technology districts by 45 minutes. Powered entirely by municipal wind and solar farms, the transit lines will be free for students, seniors, and low-income job seekers.</p>
        <p>Construction breaking ground in spring 2027 is projected to generate over 14,000 union engineering and transit operations positions.</p>
      `,
      image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1000&q=80",
      date: "October 21, 2026",
      author: "Nadia Sterling, Urban Policy Desk",
      readTime: "3 min read",
      featured: false,
      trendingRank: null,
      tags: ["Transit", "Infrastructure", "Urban Planning", "Civic Policy"]
    },
    {
      id: 10,
      title: "Global Supply Chain Modernization Pushes Green Logistics to Record Efficiencies",
      category: "Business",
      description: "Autonomous electric cargo fleets and container optimization algorithms slash maritime port turnaround times by 30%.",
      content: `
        <p class="article-lead">Shipping conglomerates and port authorities are reporting substantial gains in cargo throughput following the broad rollout of automated terminal electrification systems.</p>
        <p>By coordinating container ship arrival berths with intelligent freight rail scheduling, major deep-water ports have virtually eliminated idling vessel queues that previously choked coastal harbors. Battery-electric yard tractors and robotic gantry cranes have cut diesel emissions at terminal gates by 64% in the last twelve months.</p>
        <p>Financial analysts note that while capital expenditures were initially substantial, operational savings from reduced fuel overhead and predictive maintenance have yielded a return on investment two years ahead of expectations.</p>
      `,
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80",
      date: "October 25, 2026",
      author: "Robert Sterling, Global Trade Analyst",
      readTime: "4 min read",
      featured: false,
      trendingRank: null,
      tags: ["Logistics", "Trade", "Supply Chain", "Green Economy"]
    },
    {
      id: 11,
      title: "Central Banks Finalize Cross-Border Settlement Prototype for Wholesale Clearance",
      category: "Business",
      description: "A coalition of seven national monetary authorities proves real-time, low-fee foreign exchange settlement using cryptographic balance registries.",
      content: `
        <p class="article-lead">In what monetary economists are calling the most significant modernization of correspondent banking in fifty years, seven central reserve institutions have successfully concluded pilot tests for instant multi-currency wholesale settlement.</p>
        <p>Project Interlock enables international commercial payments that historically required three business days and multiple intermediary fees to clear within 1.2 seconds, with zero settlement counterparty risk. The system uses central bank money backed directly by reserve accounts rather than speculative tokens.</p>
        <p>Small and mid-sized exporters are projected to save billions annually in currency conversion margins once the protocol transitions to commercial production next autumn.</p>
      `,
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1000&q=80",
      date: "October 24, 2026",
      author: "Claire Dupont, Monetary Affairs",
      readTime: "4 min read",
      featured: false,
      trendingRank: null,
      tags: ["Banking", "Economics", "Fintech", "Central Banks"]
    },
    {
      id: 12,
      title: "Venture Investment Shifts Toward Deep Tech: Fusion, Biotechnology, and Materials",
      category: "Business",
      description: "Quarterly capital reports highlight a decisive migration of investor funds away from consumer software toward capital-intensive scientific innovation.",
      content: `
        <p class="article-lead">Private equity and venture capital allocations in the third quarter revealed a pronounced realignment toward hard science ventures addressing fundamental physical constraints.</p>
        <p>Funding rounds for synthetic biology manufacturing, compact magnet-confined fusion experiments, and carbon-negative concrete additives reached an aggregate $24 billion, eclipsing investments in social media and ad-tech by a ratio of three to one. Institutional allocators cited long-term regulatory tailwinds and intellectual property moats as key drivers.</p>
        <p>Founders with doctoral backgrounds in materials engineering and molecular pharmacology are rapidly becoming the most sought-after entrepreneurs across Silicon Valley, Boston, and Munich.</p>
      `,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
      date: "October 22, 2026",
      author: "Vikram Malhotra, Venture Capital Desk",
      readTime: "3 min read",
      featured: false,
      trendingRank: null,
      tags: ["Venture Capital", "Biotech", "Deep Tech", "Markets"]
    },
    {
      id: 13,
      title: "International Independent Film Festival Celebrates Renaissance of Practical Visual Effects",
      category: "Entertainment",
      description: "Directors and cinematographers at the Venice Autumn Showcase champion physical miniature sets and in-camera wizardry over algorithmic CGI.",
      content: `
        <p class="article-lead">Audiences at this year's Venice Autumn Film Showcase offered prolonged standing ovations to a wave of boundary-pushing independent features that eschewed pure green-screen digital rendering in favor of meticulous practical craft.</p>
        <p>The festival's top prize, the Golden Chimera, was awarded to director Ananya Sen's dystopian mystery 'Echoes of Brass', which built full-scale mechanical clockwork puppets and detailed miniature architectural models. Cinematographers highlighted that physical lighting bounces off genuine materials with a tactile authenticity that synthetic graphics still struggle to emulate.</p>
        <blockquote>"When an actor reaches out and touches a real, weathered steel bulkhead, the emotional truth in their eyes changes instantly." — Director Ananya Sen</blockquote>
        <p>Industry guilds reported a 45% increase in studio apprenticeships for miniature sculptors, mechanical riggers, and traditional animatronic engineers.</p>
      `,
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=80",
      date: "October 25, 2026",
      author: "Sophie Laurent, Arts & Culture Editor",
      readTime: "4 min read",
      featured: false,
      trendingRank: null,
      tags: ["Cinema", "Film Festival", "Practical Effects", "Arts"]
    },
    {
      id: 14,
      title: "Restored Symphonic Masterworks Discovered in Historic Archive Premiere to Global Audience",
      category: "Entertainment",
      description: "Lost 19th-century manuscripts reconstructed using multi-spectral manuscript scanning receive their world premiere in Vienna.",
      content: `
        <p class="article-lead">Musicologists and orchestral musicians gathered at the Musikverein in Vienna last night for the world premiere of three forgotten orchestral tone poems by Austrian composer Clara von Werden, whose manuscripts were lost in private archives for over 140 years.</p>
        <p>The faded, water-damaged parchment was deciphered using high-resolution multispectral ultraviolet imaging that separated overlapping ink revisions from mold residue. The resulting four-movement symphonic suite was praised by critics for its bold chromatic harmonies and soaring woodwind counterpoint.</p>
        <p>The recording has been made immediately accessible in lossless spatial audio under an open creative commons cultural license for music educators worldwide.</p>
      `,
      image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1000&q=80",
      date: "October 23, 2026",
      author: "Jonathan Meyer, Classical Music Critic",
      readTime: "3 min read",
      featured: false,
      trendingRank: null,
      tags: ["Music", "History", "Orchestra", "Culture"]
    },
    {
      id: 15,
      title: "Interactive Digital Museum Retrospective Explores 100 Years of Modernist Architecture",
      category: "Entertainment",
      description: "A free interactive web exhibition brings Bauhaus, Brutalism, and Organic Modernism to millions of global visitors in immersive 3D fidelity.",
      content: `
        <p class="article-lead">Cultural heritage preservationists have launched an unprecedented public digital portal documenting iconic modernist buildings across five continents, many of which are endangered by environmental weathering or redevelopment.</p>
        <p>Using millimeter-accurate LiDAR scans and photogrammetry, visitors can walk through restored interior spaces of Walter Gropius, Lina Bo Bardi, and Le Corbusier with full historical audio commentary narrated by resident architects. The project received support from international architectural conservancies to ensure permanent archival access.</p>
        <p>Over two million users explored the virtual galleries within its first 48 hours of launch, proving high public enthusiasm for accessible architectural education.</p>
      `,
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
      date: "October 21, 2026",
      author: "Greta Lindt, Architecture Columnist",
      readTime: "3 min read",
      featured: false,
      trendingRank: null,
      tags: ["Architecture", "Digital Museums", "Design", "Modernism"]
    }
  ];

  // --------------------------------------------------------------------------
  // 2. Application State Management
  // --------------------------------------------------------------------------
  const state = {
    articles: [...NEWS_DATA],
    activeCategory: 'all',
    searchQuery: '',
    sortBy: 'newest',
    bookmarks: JSON.parse(localStorage.getItem('newshub_bookmarks') || '[]'),
    theme: localStorage.getItem('newshub_theme') || 'light',
    tickerIndex: 0,
    tickerInterval: null,
    newsletterSubscribed: localStorage.getItem('newshub_subscribed') === 'true'
  };

  // --------------------------------------------------------------------------
  // 3. Image Fallback Helper (Ensures 100% offline functionality)
  // --------------------------------------------------------------------------
  function generateFallbackSvg(category, title) {
    const bgColors = {
      Technology: '#0284c7',
      Sports: '#16a34a',
      Politics: '#7c3aed',
      Business: '#d97706',
      Entertainment: '#db2777',
      General: '#c8102e'
    };
    const color = bgColors[category] || bgColors.General;
    const safeTitle = (title || 'NewsHub News').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const shortTitle = safeTitle.length > 35 ? safeTitle.substring(0, 32) + '...' : safeTitle;

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
        <rect width="800" height="500" fill="#181b20"/>
        <rect x="0" y="0" width="800" height="8" fill="${color}"/>
        <circle cx="400" cy="200" r="70" fill="${color}" opacity="0.15"/>
        <path d="M370 200 h60 M400 170 v60" stroke="${color}" stroke-width="6" stroke-linecap="round"/>
        <text x="400" y="310" font-family="'Merriweather', serif" font-size="28" font-weight="bold" fill="#f3f4f6" text-anchor="middle">${shortTitle}</text>
        <rect x="340" y="340" width="120" height="26" rx="4" fill="${color}"/>
        <text x="400" y="358" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="1.5">${(category || 'NEWSHUB').toUpperCase()}</text>
      </svg>
    `;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  function handleImageError(imgElement, category, title) {
    if (imgElement) {
      imgElement.onerror = null; // Prevent infinite recursion
      imgElement.src = generateFallbackSvg(category, title);
    }
  }

  // --------------------------------------------------------------------------
  // 4. DOM Element References
  // --------------------------------------------------------------------------
  const DOM = {
    currentDate: document.getElementById('current-date'),
    themeToggleBtn: document.getElementById('theme-toggle-btn'),
    savedBookmarksBtn: document.getElementById('saved-bookmarks-btn'),
    bookmarkCounter: document.getElementById('bookmark-counter'),
    homeLogoLink: document.getElementById('home-logo-link'),
    headerSearchInput: document.getElementById('header-search-input'),
    clearSearchBtn: document.getElementById('clear-search-btn'),
    mainNavLinks: document.getElementById('main-nav-links'),
    mobileMenuToggle: document.getElementById('mobile-menu-toggle'),
    mobileDrawer: document.getElementById('mobile-drawer'),
    mobileDrawerOverlay: document.getElementById('mobile-drawer-overlay'),
    closeDrawerBtn: document.getElementById('close-drawer-btn'),
    mobileNavList: document.getElementById('mobile-nav-list'),
    mobileSearchInput: document.getElementById('mobile-search-input'),
    mobileSavedBtn: document.getElementById('mobile-saved-btn'),
    mobileThemeBtn: document.getElementById('mobile-theme-btn'),
    breakingTicker: document.getElementById('breaking-ticker'),
    prevTickerBtn: document.getElementById('prev-ticker-btn'),
    nextTickerBtn: document.getElementById('next-ticker-btn'),
    filterBanner: document.getElementById('filter-banner'),
    filterBannerText: document.getElementById('filter-banner-text'),
    resetFilterBtn: document.getElementById('reset-filter-btn'),
    featuredStoryContainer: document.getElementById('featured-story-container'),
    trendingListContainer: document.getElementById('trending-list-container'),
    gridSectionHeading: document.getElementById('grid-section-heading'),
    categoryPills: document.getElementById('category-pills'),
    sortSelect: document.getElementById('sort-select'),
    latestNewsGrid: document.getElementById('latest-news-grid'),
    noResultsView: document.getElementById('no-results-view'),
    noResultsResetBtn: document.getElementById('no-results-reset-btn'),
    spotlightSection: document.getElementById('spotlight-section'),
    techSpotlightGrid: document.getElementById('tech-spotlight-grid'),
    viewTechHubBtn: document.getElementById('view-tech-hub-btn'),
    newsletterForm: document.getElementById('newsletter-form'),
    newsletterEmail: document.getElementById('newsletter-email'),
    newsletterValidationMsg: document.getElementById('newsletter-validation-msg'),
    newsletterSuccessAlert: document.getElementById('newsletter-success-alert'),
    openPolicyLink: document.getElementById('open-policy-link'),
    articleModalBackdrop: document.getElementById('article-modal-backdrop'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    modalContentContainer: document.getElementById('modal-content-container'),
    bookmarksModalBackdrop: document.getElementById('bookmarks-modal-backdrop'),
    bookmarksCloseBtn: document.getElementById('bookmarks-close-btn'),
    bookmarksListContainer: document.getElementById('bookmarks-list-container'),
    infoModalBackdrop: document.getElementById('info-modal-backdrop'),
    infoCloseBtn: document.getElementById('info-close-btn'),
    infoModalBody: document.getElementById('info-modal-body'),
    toastContainer: document.getElementById('toast-container'),
    backToTopBtn: document.getElementById('back-to-top-btn')
  };

  // --------------------------------------------------------------------------
  // 5. Toast Notification System
  // --------------------------------------------------------------------------
  function showToast(message, type = 'info') {
    if (!DOM.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const iconSvg = type === 'success' 
      ? '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'
      : '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';

    toast.innerHTML = `${iconSvg} <span>${message}</span>`;
    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // --------------------------------------------------------------------------
  // 6. Theme Toggle (Dark / Light Mode)
  // --------------------------------------------------------------------------
  function initTheme() {
    if (state.theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      updateThemeLabel('Light Mode');
    } else {
      document.documentElement.removeAttribute('data-theme');
      updateThemeLabel('Dark Mode');
    }
  }

  function updateThemeLabel(text) {
    const label = document.querySelector('.theme-btn-label');
    if (label) label.textContent = text;
  }

  function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      state.theme = 'light';
      localStorage.setItem('newshub_theme', 'light');
      updateThemeLabel('Dark Mode');
      showToast('Switched to Light Mode', 'info');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      state.theme = 'dark';
      localStorage.setItem('newshub_theme', 'dark');
      updateThemeLabel('Light Mode');
      showToast('Switched to Dark Mode', 'info');
    }
  }

  // --------------------------------------------------------------------------
  // 7. Live Date & Announcement Setup
  // --------------------------------------------------------------------------
  function renderLiveDate() {
    if (!DOM.currentDate) return;
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    DOM.currentDate.textContent = now.toLocaleDateString('en-US', options);
  }

  // --------------------------------------------------------------------------
  // 8. Breaking News Ticker
  // --------------------------------------------------------------------------
  const breakingItems = [
    { text: "Clean Energy Accord Ratified by 48 Nations in Historic Zurich Summit", id: 1 },
    { text: "Next-Gen 2nm Mobile AI Silicon Achieves 40% Thermal Efficiency Breakthrough", id: 2 },
    { text: "Double Overtime Thriller: Coastal Titans Win Continental Basketball Title", id: 5 },
    { text: "Treaty Signed to Protect 30% of High-Seas Marine Ecosystems by 2030", id: 7 }
  ];

  function renderTickerItem(index) {
    if (!DOM.breakingTicker) return;
    const item = breakingItems[index];
    DOM.breakingTicker.innerHTML = `
      <div class="ticker-item" data-id="${item.id}">
        <span class="ticker-category">Live Update</span>
        <span>${item.text}</span>
      </div>
    `;

    const el = DOM.breakingTicker.querySelector('.ticker-item');
    if (el) {
      el.addEventListener('click', () => openArticleModal(item.id));
    }
  }

  function startTicker() {
    renderTickerItem(state.tickerIndex);
    state.tickerInterval = setInterval(() => {
      state.tickerIndex = (state.tickerIndex + 1) % breakingItems.length;
      renderTickerItem(state.tickerIndex);
    }, 5500);
  }

  function prevTicker() {
    clearInterval(state.tickerInterval);
    state.tickerIndex = (state.tickerIndex - 1 + breakingItems.length) % breakingItems.length;
    renderTickerItem(state.tickerIndex);
    startTicker();
  }

  function nextTicker() {
    clearInterval(state.tickerInterval);
    state.tickerIndex = (state.tickerIndex + 1) % breakingItems.length;
    renderTickerItem(state.tickerIndex);
    startTicker();
  }

  // --------------------------------------------------------------------------
  // 9. Bookmarks System (LocalStorage)
  // --------------------------------------------------------------------------
  function updateBookmarkCounter() {
    if (DOM.bookmarkCounter) {
      DOM.bookmarkCounter.textContent = state.bookmarks.length;
    }
  }

  function isBookmarked(id) {
    return state.bookmarks.includes(Number(id));
  }

  function toggleBookmark(id) {
    const numId = Number(id);
    const index = state.bookmarks.indexOf(numId);
    let added = false;

    if (index > -1) {
      state.bookmarks.splice(index, 1);
      added = false;
      showToast('Article removed from saved bookmarks', 'info');
    } else {
      state.bookmarks.push(numId);
      added = true;
      showToast('Article saved to your reading list', 'success');
    }

    localStorage.setItem('newshub_bookmarks', JSON.stringify(state.bookmarks));
    updateBookmarkCounter();
    updateBookmarkButtonsUI(numId, added);
    renderBookmarksList();
  }

  function updateBookmarkButtonsUI(id, isSaved) {
    const buttons = document.querySelectorAll(`[data-bookmark-id="${id}"]`);
    buttons.forEach(btn => {
      if (isSaved) {
        btn.classList.add('saved');
        btn.setAttribute('title', 'Remove from Saved Articles');
      } else {
        btn.classList.remove('saved');
        btn.setAttribute('title', 'Save for Later');
      }
    });
  }

  function renderBookmarksList() {
    if (!DOM.bookmarksListContainer) return;

    if (state.bookmarks.length === 0) {
      DOM.bookmarksListContainer.innerHTML = `
        <div class="bookmarks-empty-view">
          <p>You haven't saved any articles yet.</p>
          <small>Click the bookmark icon on any news card to save it for offline reading.</small>
        </div>
      `;
      return;
    }

    const savedArticles = state.articles.filter(a => state.bookmarks.includes(a.id));
    DOM.bookmarksListContainer.innerHTML = savedArticles.map(article => `
      <div class="bookmark-item-card">
        <img class="bookmark-thumb" src="${article.image}" alt="${article.title}" onerror="window.NewsApp.handleImageError(this, '${article.category}', '${article.title.replace(/'/g, "\\'")}')">
        <div class="bookmark-details">
          <span class="category-badge category-${article.category.toLowerCase()}">${article.category}</span>
          <h4 class="bookmark-headline" data-open-article="${article.id}">${article.title}</h4>
          <span class="bookmark-meta">${article.date} • ${article.readTime}</span>
        </div>
        <button class="bookmark-remove-btn" data-remove-bookmark="${article.id}" title="Remove bookmark" aria-label="Remove bookmark">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </button>
      </div>
    `).join('');

    // Attach listeners
    DOM.bookmarksListContainer.querySelectorAll('[data-open-article]').forEach(el => {
      el.addEventListener('click', () => {
        closeBookmarksModal();
        openArticleModal(Number(el.getAttribute('data-open-article')));
      });
    });

    DOM.bookmarksListContainer.querySelectorAll('[data-remove-bookmark]').forEach(btn => {
      btn.addEventListener('click', () => {
        toggleBookmark(Number(btn.getAttribute('data-remove-bookmark')));
      });
    });
  }

  function openBookmarksModal() {
    renderBookmarksList();
    DOM.bookmarksModalBackdrop.classList.add('active');
    DOM.bookmarksModalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeBookmarksModal() {
    DOM.bookmarksModalBackdrop.classList.remove('active');
    DOM.bookmarksModalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // --------------------------------------------------------------------------
  // 10. Featured Lead Story & Trending Sidebar Rendering
  // --------------------------------------------------------------------------
  function renderFeaturedStory() {
    if (!DOM.featuredStoryContainer) return;
    const featured = state.articles.find(a => a.featured) || state.articles[0];
    const isSaved = isBookmarked(featured.id);

    DOM.featuredStoryContainer.innerHTML = `
      <div class="featured-image-container">
        <img class="featured-img" src="${featured.image}" alt="${featured.title}" onerror="window.NewsApp.handleImageError(this, '${featured.category}', '${featured.title.replace(/'/g, "\\'")}')">
        <div class="featured-badge-overlay">
          <span class="category-badge category-${featured.category.toLowerCase()}">${featured.category}</span>
        </div>
      </div>
      <div class="featured-body">
        <div class="featured-meta-row">
          <span>FEATURED DISPATCH</span>
          <span>•</span>
          <span>${featured.date}</span>
          <span>•</span>
          <span>${featured.readTime}</span>
        </div>
        <h2 class="featured-headline" data-open-id="${featured.id}">${featured.title}</h2>
        <p class="featured-summary">${featured.description}</p>
        <div class="featured-footer">
          <div class="author-info">
            <div class="author-avatar">${featured.author.charAt(0)}</div>
            <div class="author-details">
              <span class="author-name">${featured.author.split(',')[0]}</span>
              <span class="author-role">${featured.author.split(',')[1] || 'Editor'}</span>
            </div>
          </div>
          <div class="card-actions-group">
            <button class="bookmark-toggle-btn ${isSaved ? 'saved' : ''}" data-bookmark-id="${featured.id}" title="${isSaved ? 'Remove from Saved' : 'Save for Later'}" aria-label="Save Article">
              <svg viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
            </button>
            <button class="read-more-btn" data-open-id="${featured.id}">
              <span>Read Full Story</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </div>
        </div>
      </div>
    `;

    DOM.featuredStoryContainer.querySelectorAll('[data-open-id]').forEach(el => {
      el.addEventListener('click', () => openArticleModal(featured.id));
    });

    const bBtn = DOM.featuredStoryContainer.querySelector('[data-bookmark-id]');
    if (bBtn) {
      bBtn.addEventListener('click', () => toggleBookmark(featured.id));
    }
  }

  function renderTrendingSidebar() {
    if (!DOM.trendingListContainer) return;
    const trending = state.articles
      .filter(a => a.trendingRank)
      .sort((a, b) => a.trendingRank - b.trendingRank)
      .slice(0, 5);

    DOM.trendingListContainer.innerHTML = trending.map((item, index) => `
      <li class="trending-item" data-open-trending="${item.id}">
        <span class="trending-number">0${index + 1}</span>
        <div class="trending-info">
          <div class="trending-meta">
            <span class="category-badge category-${item.category.toLowerCase()}">${item.category}</span>
            <span>${item.readTime}</span>
          </div>
          <h3 class="trending-headline">${item.title}</h3>
        </div>
      </li>
    `).join('');

    DOM.trendingListContainer.querySelectorAll('[data-open-trending]').forEach(item => {
      item.addEventListener('click', () => {
        const id = Number(item.getAttribute('data-open-trending'));
        openArticleModal(id);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 11. News Grid Filtering, Sorting & Rendering
  // --------------------------------------------------------------------------
  function getFilteredArticles() {
    return state.articles.filter(article => {
      // Category filter
      const matchesCategory = state.activeCategory === 'all' || 
        article.category.toLowerCase() === state.activeCategory.toLowerCase();

      // Search query filter (matches title, description, or tags)
      const q = state.searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        article.title.toLowerCase().includes(q) || 
        article.description.toLowerCase().includes(q) ||
        (article.tags && article.tags.some(t => t.toLowerCase().includes(q))) ||
        article.author.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (state.sortBy === 'newest') return b.id - a.id;
      if (state.sortBy === 'oldest') return a.id - b.id;
      if (state.sortBy === 'popular') return (a.trendingRank || 99) - (b.trendingRank || 99);
      return 0;
    });
  }

  function renderNewsGrid() {
    if (!DOM.latestNewsGrid) return;
    const filtered = getFilteredArticles();

    // Update banner feedback
    if (state.activeCategory !== 'all' || state.searchQuery) {
      DOM.filterBanner.classList.remove('hidden');
      let msg = '';
      if (state.activeCategory !== 'all' && state.searchQuery) {
        msg = `Showing results for "<strong>${state.searchQuery}</strong>" in <strong>${state.activeCategory}</strong> (${filtered.length} found)`;
      } else if (state.searchQuery) {
        msg = `Showing search results for "<strong>${state.searchQuery}</strong>" (${filtered.length} found)`;
      } else {
        msg = `Filtered by category: <strong>${state.activeCategory}</strong> (${filtered.length} stories)`;
      }
      DOM.filterBannerText.innerHTML = msg;
    } else {
      DOM.filterBanner.classList.add('hidden');
    }

    // Toggle Empty State vs Grid
    if (filtered.length === 0) {
      DOM.latestNewsGrid.innerHTML = '';
      DOM.noResultsView.classList.remove('hidden');
      return;
    }

    DOM.noResultsView.classList.add('hidden');

    DOM.latestNewsGrid.innerHTML = filtered.map(article => {
      const isSaved = isBookmarked(article.id);
      return `
        <article class="news-card" data-article-id="${article.id}">
          <div class="card-image-box">
            <img class="card-img" src="${article.image}" alt="${article.title}" loading="lazy" onerror="window.NewsApp.handleImageError(this, '${article.category}', '${article.title.replace(/'/g, "\\'")}')">
            <div class="card-category-overlay">
              <span class="category-badge category-${article.category.toLowerCase()}">${article.category}</span>
            </div>
          </div>
          <div class="card-content">
            <div class="card-meta-line">
              <span>${article.date}</span>
              <span>${article.readTime}</span>
            </div>
            <h3 class="card-headline" data-open-card="${article.id}">${article.title}</h3>
            <p class="card-description">${article.description}</p>
            <div class="card-footer">
              <button class="card-read-link" data-open-card="${article.id}">
                Read More &rarr;
              </button>
              <button class="card-action-icon-btn ${isSaved ? 'saved' : ''}" data-bookmark-id="${article.id}" title="${isSaved ? 'Remove from Saved' : 'Save for Later'}" aria-label="Bookmark article">
                <svg viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach interaction listeners
    DOM.latestNewsGrid.querySelectorAll('[data-open-card]').forEach(el => {
      el.addEventListener('click', () => {
        const id = Number(el.getAttribute('data-open-card'));
        openArticleModal(id);
      });
    });

    DOM.latestNewsGrid.querySelectorAll('[data-bookmark-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = Number(btn.getAttribute('data-bookmark-id'));
        toggleBookmark(id);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 12. Category Spotlight Showcase (Deep Dives)
  // --------------------------------------------------------------------------
  function renderSpotlightSection() {
    if (!DOM.techSpotlightGrid) return;
    const techArticles = state.articles.filter(a => a.category === 'Technology');
    if (techArticles.length === 0) return;

    const lead = techArticles[0];
    const secondary = techArticles.slice(1, 4);

    DOM.techSpotlightGrid.innerHTML = `
      <div class="spotlight-primary" data-open-spotlight="${lead.id}">
        <div class="spotlight-img-box">
          <img src="${lead.image}" alt="${lead.title}" onerror="window.NewsApp.handleImageError(this, '${lead.category}', '${lead.title.replace(/'/g, "\\'")}')">
        </div>
        <div class="spotlight-primary-content">
          <span class="category-badge category-technology">FEATURED TECH</span>
          <h3 class="card-headline" style="margin-top: 0.6rem;">${lead.title}</h3>
          <p class="card-description">${lead.description}</p>
          <div class="card-meta-line" style="margin-bottom: 0;">
            <span>By ${lead.author.split(',')[0]}</span>
            <span>${lead.readTime}</span>
          </div>
        </div>
      </div>
      <div class="spotlight-secondary-list">
        ${secondary.map(item => `
          <div class="spotlight-mini-card" data-open-spotlight="${item.id}">
            <img class="mini-card-img" src="${item.image}" alt="${item.title}" onerror="window.NewsApp.handleImageError(this, '${item.category}', '${item.title.replace(/'/g, "\\'")}')">
            <div class="mini-card-content">
              <h4 class="mini-card-headline">${item.title}</h4>
              <span class="mini-card-meta">${item.date} • ${item.readTime}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    DOM.techSpotlightGrid.querySelectorAll('[data-open-spotlight]').forEach(card => {
      card.addEventListener('click', () => {
        const id = Number(card.getAttribute('data-open-spotlight'));
        openArticleModal(id);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 13. Category Navigation Controller
  // --------------------------------------------------------------------------
  function setCategory(category) {
    state.activeCategory = category;

    // Update Primary Nav Buttons
    const navButtons = document.querySelectorAll('#main-nav-links .nav-btn, #mobile-nav-list .mobile-nav-btn');
    navButtons.forEach(btn => {
      const cat = btn.getAttribute('data-category');
      if (cat.toLowerCase() === category.toLowerCase()) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update Pill Buttons
    const pillButtons = document.querySelectorAll('#category-pills .pill-btn');
    pillButtons.forEach(pill => {
      const cat = pill.getAttribute('data-category');
      if (cat.toLowerCase() === category.toLowerCase()) {
        pill.classList.add('active');
        pill.setAttribute('aria-selected', 'true');
      } else {
        pill.classList.remove('active');
        pill.setAttribute('aria-selected', 'false');
      }
    });

    // Update section heading
    if (DOM.gridSectionHeading) {
      DOM.gridSectionHeading.textContent = category === 'all' ? 'Latest Dispatches' : `${category} Desk`;
    }

    renderNewsGrid();

    // Smooth scroll to news section if clicked from header or footer
    const controlsSec = document.querySelector('.news-controls-section');
    if (controlsSec && window.scrollY > 400) {
      controlsSec.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // --------------------------------------------------------------------------
  // 14. Detailed Article Reader Modal
  // --------------------------------------------------------------------------
  function openArticleModal(id) {
    const article = state.articles.find(a => a.id === Number(id));
    if (!article || !DOM.modalContentContainer) return;

    const isSaved = isBookmarked(article.id);

    DOM.modalContentContainer.innerHTML = `
      <div class="modal-article-header">
        <div class="modal-category-badge">
          <span class="category-badge category-${article.category.toLowerCase()}">${article.category}</span>
        </div>
        <h1 class="modal-title">${article.title}</h1>
        <div class="modal-meta-bar">
          <div class="author-info">
            <div class="author-avatar">${article.author.charAt(0)}</div>
            <div class="author-details">
              <span class="author-name">${article.author}</span>
              <span class="author-role">${article.date} • ${article.readTime}</span>
            </div>
          </div>
          <div class="modal-actions-bar">
            <button class="modal-action-btn ${isSaved ? 'saved' : ''}" id="modal-bookmark-toggle-btn">
              <svg viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
              <span>${isSaved ? 'Saved' : 'Save Story'}</span>
            </button>
            <button class="modal-action-btn" id="modal-share-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      <div class="modal-image-box">
        <img src="${article.image}" alt="${article.title}" onerror="window.NewsApp.handleImageError(this, '${article.category}', '${article.title.replace(/'/g, "\\'")}')">
        <p class="modal-img-caption">NewsHub Photographic Archives / Editorial wire reporting.</p>
      </div>

      <div class="modal-article-body">
        ${article.content}
      </div>

      <div class="article-tags-wrapper">
        <span class="tag-label">INDEXED TOPICS:</span>
        ${(article.tags || [article.category, 'Journalism', 'NewsHub']).map(tag => `
          <span class="article-tag">#${tag}</span>
        `).join('')}
      </div>
    `;

    // Modal internal button handlers
    const modalBookmarkBtn = document.getElementById('modal-bookmark-toggle-btn');
    if (modalBookmarkBtn) {
      modalBookmarkBtn.addEventListener('click', () => {
        toggleBookmark(article.id);
        const nowSaved = isBookmarked(article.id);
        modalBookmarkBtn.classList.toggle('saved', nowSaved);
        modalBookmarkBtn.querySelector('span').textContent = nowSaved ? 'Saved' : 'Save Story';
        modalBookmarkBtn.querySelector('svg').setAttribute('fill', nowSaved ? 'currentColor' : 'none');
      });
    }

    const modalShareBtn = document.getElementById('modal-share-btn');
    if (modalShareBtn) {
      modalShareBtn.addEventListener('click', () => {
        // Fallback or Clipboard API
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href);
          showToast('Article link copied to clipboard!', 'success');
        } else {
          showToast('Article ready to share!', 'info');
        }
      });
    }

    DOM.articleModalBackdrop.classList.add('active');
    DOM.articleModalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeArticleModal() {
    DOM.articleModalBackdrop.classList.remove('active');
    DOM.articleModalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // --------------------------------------------------------------------------
  // 15. Mobile Navigation Drawer
  // --------------------------------------------------------------------------
  function openMobileDrawer() {
    DOM.mobileDrawer.classList.add('active');
    DOM.mobileDrawerOverlay.classList.add('active');
    DOM.mobileDrawer.setAttribute('aria-hidden', 'false');
    DOM.mobileMenuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    DOM.mobileDrawer.classList.remove('active');
    DOM.mobileDrawerOverlay.classList.remove('active');
    DOM.mobileDrawer.setAttribute('aria-hidden', 'true');
    DOM.mobileMenuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // --------------------------------------------------------------------------
  // 16. Search Functionality
  // --------------------------------------------------------------------------
  function handleSearch(query) {
    state.searchQuery = query;

    // Synchronize both desktop & mobile inputs
    if (DOM.headerSearchInput && DOM.headerSearchInput.value !== query) {
      DOM.headerSearchInput.value = query;
    }
    if (DOM.mobileSearchInput && DOM.mobileSearchInput.value !== query) {
      DOM.mobileSearchInput.value = query;
    }

    // Toggle clear search button
    if (DOM.clearSearchBtn) {
      DOM.clearSearchBtn.classList.toggle('hidden', !query);
    }

    renderNewsGrid();
  }

  function clearSearch() {
    handleSearch('');
    if (DOM.headerSearchInput) DOM.headerSearchInput.focus();
  }

  // --------------------------------------------------------------------------
  // 17. Newsletter Form Validation & Handling
  // --------------------------------------------------------------------------
  function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = DOM.newsletterEmail.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Reset error styling
    DOM.newsletterEmail.classList.remove('input-error');
    DOM.newsletterValidationMsg.textContent = '';

    if (!email) {
      DOM.newsletterEmail.classList.add('input-error');
      DOM.newsletterValidationMsg.textContent = 'Please enter an email address.';
      DOM.newsletterEmail.focus();
      return;
    }

    if (!emailRegex.test(email)) {
      DOM.newsletterEmail.classList.add('input-error');
      DOM.newsletterValidationMsg.textContent = 'Please enter a valid email address (e.g., student@university.edu).';
      DOM.newsletterEmail.focus();
      return;
    }

    // Success simulation
    state.newsletterSubscribed = true;
    localStorage.setItem('newshub_subscribed', 'true');
    DOM.newsletterForm.classList.add('hidden');
    DOM.newsletterSuccessAlert.classList.remove('hidden');
    showToast('Subscribed to NewsHub Morning Briefing!', 'success');
  }

  // --------------------------------------------------------------------------
  // 18. About, Contact & Policy Modals
  // --------------------------------------------------------------------------
  function openInfoModal(type) {
    if (!DOM.infoModalBody) return;

    let content = '';
    if (type === 'about') {
      content = `
        <h2>About NewsHub</h2>
        <p><strong>NewsHub</strong> is a contemporary digital news portal engineered to deliver factual, fast, and balanced coverage across global technologies, governance, athletics, economy, and the creative arts.</p>
        <p>Founded as an academic web systems project, NewsHub showcases modern frontend architecture using pure standards: semantic HTML5, CSS3 Custom Properties, and Vanilla JavaScript with zero external frameworks or backend requirements.</p>
        <p>Our mock newsroom exemplifies responsive design, accessibility landmarks, high-performance rendering, and offline resilience.</p>
      `;
    } else if (type === 'contact') {
      content = `
        <h2>Contact the Newsroom</h2>
        <p>We welcome tips, inquiries, corrections, and academic feedback.</p>
        <p><strong>Editorial Desk:</strong> editor@newshub.local<br>
        <strong>Engineering Group:</strong> dev@newshub.local<br>
        <strong>Bureau Location:</strong> University Technology Campus, Hall 4, Lab 202</p>
        <p>For urgent press dispatches or confidential tips, our encrypted drop is monitored 24/7 by senior desk editors.</p>
      `;
    } else if (type === 'ethics') {
      content = `
        <h2>Journalistic Integrity Policy</h2>
        <p>NewsHub adheres to the highest tenets of non-partisan editorial independence:</p>
        <ul style="padding-left: 1.5rem; margin-bottom: 1rem; color: var(--text-secondary);">
          <li>Multi-source verification before headline publication.</li>
          <li>Transparent disclosure of corrections with timestamped updates.</li>
          <li>Strict segregation between editorial reporting and sponsored underwriting.</li>
          <li>Respect for digital privacy and consent regarding photographic subjects.</li>
        </ul>
      `;
    } else {
      content = `
        <h2>NewsHub Reader Terms & Privacy</h2>
        <p>NewsHub respects your digital autonomy. Our client-side application does not track cross-site cookies, sell telemetric profiles, or inject invasive tracking scripts.</p>
        <p>Your saved bookmarks and theme preferences reside solely in your browser's private LocalStorage sandbox.</p>
      `;
    }

    DOM.infoModalBody.innerHTML = content;
    DOM.infoModalBackdrop.classList.add('active');
    DOM.infoModalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeInfoModal() {
    DOM.infoModalBackdrop.classList.remove('active');
    DOM.infoModalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // --------------------------------------------------------------------------
  // 19. Back to Top Scroll Controller
  // --------------------------------------------------------------------------
  function handleScroll() {
    if (!DOM.backToTopBtn) return;
    if (window.scrollY > 300) {
      DOM.backToTopBtn.classList.add('visible');
    } else {
      DOM.backToTopBtn.classList.remove('visible');
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --------------------------------------------------------------------------
  // 20. Event Listener Attachments & Bootstrapping
  // --------------------------------------------------------------------------
  function setupEventListeners() {
    // Theme toggle
    DOM.themeToggleBtn.addEventListener('click', toggleTheme);
    DOM.mobileThemeBtn.addEventListener('click', () => {
      toggleTheme();
      closeMobileDrawer();
    });

    // Bookmarks drawer triggers
    DOM.savedBookmarksBtn.addEventListener('click', openBookmarksModal);
    DOM.mobileSavedBtn.addEventListener('click', () => {
      closeMobileDrawer();
      openBookmarksModal();
    });
    DOM.bookmarksCloseBtn.addEventListener('click', closeBookmarksModal);
    DOM.bookmarksModalBackdrop.addEventListener('click', (e) => {
      if (e.target === DOM.bookmarksModalBackdrop) closeBookmarksModal();
    });

    // Logo click resets to Home
    DOM.homeLogoLink.addEventListener('click', (e) => {
      e.preventDefault();
      setCategory('all');
      clearSearch();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Navigation Category links (Header)
    DOM.mainNavLinks.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-category');
        setCategory(cat);
      });
    });

    // Navigation Category links (Mobile Drawer)
    DOM.mobileNavList.querySelectorAll('.mobile-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-category');
        setCategory(cat);
        closeMobileDrawer();
      });
    });

    // Category Pills
    DOM.categoryPills.querySelectorAll('.pill-btn').forEach(pill => {
      pill.addEventListener('click', () => {
        const cat = pill.getAttribute('data-category');
        setCategory(cat);
      });
    });

    // Reset filter button in banner
    DOM.resetFilterBtn.addEventListener('click', () => {
      setCategory('all');
      clearSearch();
    });

    // Empty state reset button
    DOM.noResultsResetBtn.addEventListener('click', () => {
      setCategory('all');
      clearSearch();
    });

    // Sorting Dropdown
    DOM.sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderNewsGrid();
    });

    // Search inputs
    DOM.headerSearchInput.addEventListener('input', (e) => {
      handleSearch(e.target.value);
    });

    DOM.mobileSearchInput.addEventListener('input', (e) => {
      handleSearch(e.target.value);
    });

    DOM.clearSearchBtn.addEventListener('click', clearSearch);

    // Mobile Drawer Controls
    DOM.mobileMenuToggle.addEventListener('click', openMobileDrawer);
    DOM.closeDrawerBtn.addEventListener('click', closeMobileDrawer);
    DOM.mobileDrawerOverlay.addEventListener('click', closeMobileDrawer);

    // Ticker controls
    DOM.prevTickerBtn.addEventListener('click', prevTicker);
    DOM.nextTickerBtn.addEventListener('click', nextTicker);

    // Spotlight quick button
    DOM.viewTechHubBtn.addEventListener('click', () => {
      setCategory('Technology');
    });

    // Article Modal Controls
    DOM.modalCloseBtn.addEventListener('click', closeArticleModal);
    DOM.articleModalBackdrop.addEventListener('click', (e) => {
      if (e.target === DOM.articleModalBackdrop) closeArticleModal();
    });

    // Info Modal Controls
    DOM.infoCloseBtn.addEventListener('click', closeInfoModal);
    DOM.infoModalBackdrop.addEventListener('click', (e) => {
      if (e.target === DOM.infoModalBackdrop) closeInfoModal();
    });

    // Newsletter form
    DOM.newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    DOM.openPolicyLink.addEventListener('click', (e) => {
      e.preventDefault();
      openInfoModal('privacy');
    });

    // Back to top
    window.addEventListener('scroll', handleScroll);
    DOM.backToTopBtn.addEventListener('click', scrollToTop);

    // Footer links
    document.querySelectorAll('.footer-nav-link[data-category]').forEach(link => {
      link.addEventListener('click', () => {
        const cat = link.getAttribute('data-category');
        setCategory(cat);
      });
    });

    document.getElementById('footer-about-btn').addEventListener('click', () => openInfoModal('about'));
    document.getElementById('footer-contact-btn').addEventListener('click', () => openInfoModal('contact'));
    document.getElementById('footer-ethics-btn').addEventListener('click', () => openInfoModal('ethics'));
    document.getElementById('footer-careers-btn').addEventListener('click', () => {
      showToast('NewsHub Student Fellowships open in November!', 'info');
    });

    document.getElementById('sub-privacy-link').addEventListener('click', (e) => {
      e.preventDefault();
      openInfoModal('privacy');
    });
    document.getElementById('sub-terms-link').addEventListener('click', (e) => {
      e.preventDefault();
      openInfoModal('privacy');
    });
    document.getElementById('sub-cookies-link').addEventListener('click', (e) => {
      e.preventDefault();
      showToast('NewsHub uses zero tracking cookies.', 'success');
    });

    // Global Keyboard Esc Listener
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeArticleModal();
        closeBookmarksModal();
        closeInfoModal();
        closeMobileDrawer();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 21. Application Initialization
  // --------------------------------------------------------------------------
  function initApp() {
    initTheme();
    renderLiveDate();
    startTicker();
    updateBookmarkCounter();
    renderFeaturedStory();
    renderTrendingSidebar();
    renderNewsGrid();
    renderSpotlightSection();
    setupEventListeners();

    // Check if user was already subscribed
    if (state.newsletterSubscribed) {
      DOM.newsletterForm.classList.add('hidden');
      DOM.newsletterSuccessAlert.classList.remove('hidden');
    }
  }

  // Expose global methods for inline HTML error handlers & inspection
  window.NewsApp = {
    handleImageError,
    openArticleModal,
    setCategory,
    showToast,
    toggleBookmark
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
