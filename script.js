/* ==========================================================================
   JMJ Guiao — Portfolio Script (v3)
   Data · Sound · Presets/Appearance · Grid · Render · Projects · Certs
   carousel · Terminal · Command palette · Chatbot/Voice · Card/CV · Quest
   game · Avatar · Cursor · Ambient · Observers · Misc
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    const $ = (s, c = document) => c.querySelector(s);
    const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
    const store = {
        get: (k, d) => { try { const v = localStorage.getItem('jmj_' + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
        set: (k, v) => { try { localStorage.setItem('jmj_' + k, JSON.stringify(v)); } catch { } }
    };
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const html = document.documentElement;
    let accentCss = '#fff'; // current resolved --accent (updated by refreshAccentCss)

    /* ===================== DATA ===================== */
    const CORE_SKILLS = [
        { t: 'UI/UX Design', tools: ['Figma', 'Webflow', 'Canva'], d: 'Wireframing, prototyping, and user-centered interface design in Figma and Webflow.', i: 'M4 17l4-5 3 3 5-7 4 5' },
        { t: 'Business Analysis', tools: ['ClickUp', 'MS Office', 'Google Workspace'], d: 'Requirements gathering, stakeholder needs, and translating them into buildable specs.', i: 'M4 19V9m6 10V4m6 15v-7' },
        { t: 'Requirements Documentation', tools: ['Microsoft Word', 'Google Docs'], d: 'Clear, structured documentation that development and product teams can act on.', i: 'M6 3h9l4 4v14H6zM14 3v5h5' },
        { t: 'Backlog & Product Docs', tools: ['ClickUp', 'Google Sheets'], d: 'Creating and maintaining product backlogs to support ongoing feature development.', i: 'M5 6h14M5 12h14M5 18h9' },
        { t: 'Competitive & Feature Research', tools: ['Google Sheets', 'Google Docs'], d: 'Comparison matrices that benchmark features against competitors for data-driven decisions.', i: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-3.5-3.5' },
        { t: 'Web & Layout Design', tools: ['Figma', 'Canva', 'Photoshop'], d: 'Layout proposals and publication design with consistent branding and clear hierarchy.', i: 'M4 5h16v14H4zM4 9h16' },
        { t: 'Visual Content Creation', tools: ['Canva', 'Photoshop', 'Illustrator'], d: 'Promotional and demo visuals, editorial layouts, and assets that communicate clearly.', i: 'M4 4h16v16H4zM4 16l4-5 3 3 5-7 4 6' },
        { t: 'Web Development', tools: ['HTML/CSS/JS', 'VS Code', 'Vercel', 'Supabase'], d: 'A working foundation in HTML, CSS, and JavaScript (JS), with Vercel for deployment and Supabase for backend and real-time data, to bridge design intent and implementation.', i: 'M8 8l-4 4 4 4M16 8l4 4-4 4' },
        { t: 'Quality Assurance Testing', tools: ['ClickUp', 'Microsoft Word', 'Manual Testing'], d: 'Hands-on QA testing to catch bugs early and ensure smooth, reliable releases.', i: 'M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3zM9 12l2 2 4-4' },
    ];

    const TOOLS = [
        { n: 'Figma', a: 'Fi' }, { n: 'Canva', a: 'Cv' }, { n: 'Adobe Photoshop', a: 'Ps' },
        { n: 'Adobe Illustrator', a: 'Ai' }, { n: 'Webflow', a: 'Wf' }, { n: 'MySQL', a: 'My' },
        { n: 'VS Code', a: 'VS' }, { n: 'ClickUp', a: 'Cu' }, { n: 'Microsoft Office', a: 'MO' },
        { n: 'Google Workspace', a: 'GW' }, { n: 'Vercel', a: 'Vc' }, { n: 'Supabase', a: 'Sb' },
    ];

    const COVER_ICONS = {
        signor: 'M6 3h9l4 4v14H6zM14 3v5h5M9 13l2.2 2.2L15 11.5',
        ba: 'M4 19V9m6 10V4m6 15v-7M20 19H2',
        vertify: 'M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3zM9 12l2 2 4-4',
        remindr: 'M12 4a6 6 0 0 1 6 6v3l2 3H4l2-3v-3a6 6 0 0 1 6-6zM10 19a2 2 0 0 0 4 0',
        moodmenu: 'M4 8a8 8 0 0 1 16 0v8a8 8 0 0 1-16 0V8zM9 10h.01M15 10h.01M9 15c1 1 5 1 6 0',
        goldenpups: 'M12 12a4 4 0 0 1 4 4v3H8v-3a4 4 0 0 1 4-4zM7 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM17 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM10 5a2 2 0 1 1 0 4M14 5a2 2 0 1 0 0 4',
        classiq: 'M12 4l9 4-9 4-9-4 9-4zM6 10.5V15c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5',
        portfolio: 'M4 7h16v12H4zM4 7l3-3h10l3 3M9 12h6M9 15h4'
    };

    const PROJECTS = [
        {
            key: 'signor', title: 'Signor', tag: 'Capstone · 2025', cat: ['UI/UX', 'Web'],
            role: 'UI/UX Designer, Video Editor & Document Management',
            type: 'Capstone Project · PSU CCS', year: '2025', group: 1,
            cover: 'signor', coverLabel: 'Blockchain + AI documents',
            techs: ['Figma', 'Webflow', 'Blockchain', 'AI'],
            list: [
                'Secure, web-based document management system for PSU CCS built with AI and blockchain technology.',
                'Lets students, faculty, and administrators upload, view, and retrieve academic documents like transcripts and certificates.',
                'Contributed to the UI/UX design for an intuitive, secure experience and supported the document management module.',
                'Produced promotional and demo videos for project presentations.'
            ],
            gallery: ['assets/signor-cover.jpg', 'assets/signor-signup.jpg', 'assets/signor-team.jpg', 'assets/signor-group.jpg'],
            links: [
                { label: 'Visit Website', url: 'https://signor.website/', primary: true },
                { label: 'View Design', url: 'https://www.figma.com/design/9qJUxNPPWHPf5OQzEznIEE/Signor?node-id=0-1&t=NTOaN7zy82YdWWm9-1' }
            ]
        },
        {
            key: 'vertify', title: 'Vertify', tag: 'Hackathon · 2025', cat: ['UI/UX', 'Web'],
            role: 'UI/UX Designer', type: 'PSITE-RAITE Hackathon · Fact-Checking Web App', year: '2025', group: 1,
            cover: 'vertify', coverLabel: 'Fact-checking · Base',
            techs: ['Figma', 'Web3', 'Base'],
            list: [
                'Fact-checking platform built on the Base blockchain — helps people verify what they read and earn rewards for accuracy.',
                'Designed the full UI/UX of the web app in Figma, from claim submission to the verification flow.',
                'Helped present the working concept to the judging panel under a tight competition deadline.'
            ],
            gallery: [],
            links: [{ label: 'Visit Website', url: 'https://vertify-baseminiapp.vercel.app/?fbclid=IwY2xjawS8OuVleHRuA2FlbQIxMABicmlkETFlYkFXdFhHcUwwU2FoYkVVc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHuM33jcdZtCvUnKwJxnYpd4WHrPdHL28ky9uw3OSXaJQyayowUr4pBXrZiFZ_aem_Wk3dHO6Y1IELlfg_ke0New', primary: true }]
        },
        {
            key: 'ba', title: 'Business Analysis — Twala & Doxu AI', tag: 'Ongoing · 2026', cat: ['Business Analysis'],
            role: 'Business Analyst Intern', type: 'Internship · Twala (Ohelio Inc.)', year: '2026', group: 1,
            cover: 'ba', coverLabel: 'Backlogs · Docs · Research',
            techs: ['Documentation', 'Backlog', 'Research'],
            list: [
                "Create and maintain product backlogs and structured documentation for Twala's ongoing feature development.",
                'Collaborate with the Doxu AI team to identify, evaluate, and document new feature opportunities.',
                'Contribute to the documentation of Twala Notary and Twala Sign.',
                'Prepare comparison matrices benchmarking competitor features to support data-driven decisions.'
            ],
            gallery: [],
            links: [{ label: 'Visit Twala', url: 'https://www.twala.io/', primary: true }]
        },
        {
            key: 'portfolio', title: 'Personal Portfolio', tag: 'In Progress · 2026', cat: ['UI/UX', 'Web'],
            role: 'Designer & Developer', type: 'Personal Project · Web', year: '2026', group: 2,
            cover: 'portfolio', coverLabel: 'This very website',
            techs: ['HTML/CSS/JS', 'Figma', 'Vercel', 'Supabase'],
            list: [
                'The portfolio you are looking at right now, designed and built entirely from scratch.',
                'Features a fully custom design system with theming, an interactive dotted map, a chatbot, a gamified quest layer, and a real-time Community Space.',
                'Built with hand-written HTML, CSS, and JavaScript, designed in Figma, deployed on Vercel, with Supabase powering real-time features.',
                'An ongoing project that keeps evolving as I add new ideas and refine the experience.'
            ],
            gallery: [], links: []
        },
        {
            key: 'remindr', title: 'Remindr', tag: 'Hackathon · 2025', cat: ['UI/UX'],
            role: 'UI/UX Designer', type: 'PSITE-RAITE Hackathon · Game App', year: '2025', group: 2,
            cover: 'remindr', coverLabel: 'Smart recall game',
            techs: ['Figma', 'Game Design'],
            list: [
                'A smart recall game designed to help users remember what matters most, anytime and anywhere.',
                'Built with elderly users, families, and caregivers in mind, to help them stay connected.',
                'Designed the full UI/UX of the game in Figma alongside Vertify for the same hackathon.'
            ],
            gallery: [], links: []
        },
        {
            key: 'moodmenu', title: 'MoodMenu', tag: 'HCI Project · 2025', cat: ['UI/UX'],
            role: 'UI/UX Designer', type: 'Coursework · HCI 323 Final Project', year: '2025', group: 2,
            cover: 'moodmenu', coverLabel: 'Mood-based food app',
            techs: ['Figma', 'HCI', 'Prototyping'],
            list: [
                "A concept app that recommends food based on the user's current mood, built for a Human-Computer Interaction course.",
                'Explored playful, mood-driven interaction patterns and a friendly, approachable visual language.',
                'Designed and prototyped the full experience in Figma.'
            ],
            gallery: [],
            links: [{ label: 'View Design', url: 'https://www.figma.com/design/GiiNgs7aYh83eRqMRggmj5/HCI-323---Final-Project?node-id=12-11076&t=X6JutBqj4yY9joQJ-1', primary: true }]
        },
        {
            key: 'goldenpups', title: 'Golden Pups', tag: 'ITELEC 4 · 2024', cat: ['UI/UX', 'Web'],
            role: 'UI/UX Designer', type: 'Coursework · High-Fidelity Prototype', year: '2024', group: 2,
            cover: 'goldenpups', coverLabel: 'Web + mobile prototype',
            techs: ['Figma', 'Responsive', 'Prototyping'],
            list: [
                'A high-fidelity website and mobile prototype built for an elective project.',
                'Designed responsive layouts for both desktop and mobile views.',
                'Prototyped interactive flows in Figma with a clear, warm brand direction.'
            ],
            gallery: [],
            links: [{ label: 'View Prototype', url: 'https://www.figma.com/proto/CLkhJVc1NRE0m1U9eR8hOe/Itelec-4---High-Fi--Website--Mobile-Vie?node-id=66-955&starting-point-node-id=1%3A2&t=xyMhJs4gjMjslsm1-1', primary: true }]
        },
        {
            key: 'classiq', title: 'ClassIQ', tag: '2024', cat: ['UI/UX'],
            role: 'UI/UX Designer & QA Tester', type: 'LMS Web Application', year: '2024', group: 2,
            cover: 'classiq', coverLabel: 'Unified LMS concept',
            techs: ['Figma', 'LMS', 'QA Testing'],
            list: [
                'A unified LMS web app combining the core functions of Google Classroom, Google Meet, and Google Drive.',
                'Designed the interface and experience of the application in Figma.',
                'Performed QA testing to catch bugs and ensure smooth performance before deployment.'
            ],
            gallery: [], links: []
        },
    ];

    const CERTS = [
        { y: '2026', t: 'Business Analysis Fundamentals', issuer: 'IIBA Endorsed · Udemy', d: 'Requirements gathering, stakeholder analysis, and BRD fundamentals.', i: 'M4 19V9m6 10V4m6 15v-7' },
        { y: '2026', t: 'Project Management: Beginner to Project Manager', issuer: 'Udemy', d: 'Project planning, scheduling, and delivery basics from the ground up.', i: 'M5 6h14M5 12h14M5 18h9' },
        { y: '2026', t: 'AI Learning Modules', issuer: 'AIClassASEAN.org', d: 'Practical grounding in how AI tools fit into everyday workflows.', i: 'M12 3v3M12 18v3M3 12h3M18 12h3M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' },
        { y: '2026', t: 'Business Analysis Basics', issuer: 'SimpliLearn', d: "A second pass at BA fundamentals through SimpliLearn's track.", i: 'M4 19V9m6 10V4m6 15v-7' },
        { y: '2026', t: 'Project Management Course', issuer: 'SimpliLearn', d: 'More reps on project management methods and terminology.', i: 'M5 6h14M5 12h14M5 18h9' },
        { y: '2025', t: 'UI/UX Design Certificate', issuer: 'Udemy', d: 'Design fundamentals, wireframing, and prototyping in Figma.', i: 'M4 17l4-5 3 3 5-7 4 5' },
        { y: '2025', t: 'Cloud Computing Fundamentals', issuer: 'IBM SkillsBuild', d: 'The basics of cloud infrastructure and how it supports modern apps.', i: 'M7 18a4 4 0 0 1-1-7.9 5 5 0 0 1 9.6-1.7A4.5 4.5 0 0 1 17 17.5' },
    ];

    const HONORS = [
        'Top 10 Awardee, CCS Department (3rd Year, 2nd Semester)',
        'Top 25 Awardee, CCS Department (3rd Year, 1st Semester)',
        "President's Lister, CCS Department (2nd Year)",
        "Dean's Lister, CCS Department (1st Year)",
        'With Honors, Senior High School',
        'With Honors, Junior High School',
    ];

    /* ===================== SOUND ENGINE (WebAudio, no assets) ===================== */
    let audioCtx = null;
    function ensureCtx() {
        if (!audioCtx) {
            const AC = window.AudioContext || window.webkitAudioContext;
            if (!AC) return null;
            audioCtx = new AC();
        }
        if (audioCtx.state === 'suspended') audioCtx.resume();
        return audioCtx;
    }
    function tone(freq, dur, type = 'sine', gain = 0.045, delay = 0) {
        const ctx = ensureCtx(); if (!ctx) return;
        const t0 = ctx.currentTime + delay;
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = type; o.frequency.setValueAtTime(freq, t0);
        g.gain.setValueAtTime(0, t0);
        g.gain.linearRampToValueAtTime(gain, t0 + 0.012);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
        o.connect(g); g.connect(ctx.destination);
        o.start(t0); o.stop(t0 + dur + 0.05);
    }
    function sfx(name) {
        if (!state.sound) return;
        try {
            switch (name) {
                case 'click': tone(760, 0.07, 'sine', 0.035); break;
                case 'switch': tone(520, 0.06, 'triangle', 0.04); tone(700, 0.07, 'triangle', 0.03, 0.05); break;
                case 'pop': tone(300, 0.09, 'triangle', 0.05); break;
                case 'unlock': tone(523.25, 0.12, 'sine', 0.05); tone(659.25, 0.12, 'sine', 0.05, 0.09); tone(783.99, 0.2, 'sine', 0.05, 0.18); break;
                case 'level': [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, 0.16, 'sine', 0.05, i * 0.09)); break;
                case 'deny': tone(196, 0.14, 'sawtooth', 0.03); tone(164, 0.18, 'sawtooth', 0.03, 0.1); break;
            }
        } catch { }
    }
    // Unlock audio on first interaction (browser autoplay policy)
    window.addEventListener('pointerdown', () => { if (state.sound) ensureCtx(); }, { once: true });

    /* ===================== THEME PRESETS ===================== */
    const PRESETS = [
        { id: 'mono', name: 'Minimal Mono', sw: 'linear-gradient(120deg,#0B0B0C 50%,#F6F5F2 50%)' },
        {
            id: 'barbie', name: 'Barbie', h: 325, s: 88, l: 62, ink: '#fff', mode: 'light', ambient: 'ribbon',
            gradA: 'hsl(325 95% 70%)', gradB: 'hsl(300 80% 60%)',
            sw: 'linear-gradient(120deg,#FF5FA2,#E14FD1)',
            bg: { dark: { bg: '#22091A', elev: '#31112A', elev2: '#3D1735' }, light: { bg: '#FFF1F8', elev: '#FCE3F0', elev2: '#F8D3E8' } }
        },
        {
            id: 'spiderman', name: 'Spider-Man', h: 356, s: 82, l: 56, ink: '#fff', ambient: 'web',
            gradA: 'hsl(356 82% 60%)', gradB: 'hsl(218 85% 58%)',
            sw: 'linear-gradient(120deg,#E23636,#2B6CD4)',
            bg: { dark: { bg: '#0B0F22', elev: '#131A33', elev2: '#1A2240' }, light: { bg: '#F5F7FE', elev: '#EAEEFB', elev2: '#DEE5F7' } }
        },
        {
            id: 'cyberpunk', name: 'Cyberpunk', h: 184, s: 95, l: 55, ink: '#04141A', mode: 'dark',
            gradA: 'hsl(184 95% 58%)', gradB: 'hsl(315 95% 62%)',
            sw: 'linear-gradient(120deg,#12E6E6,#F03CC3)',
            bg: { dark: { bg: '#05070F', elev: '#0B1020', elev2: '#111830' }, light: { bg: '#F2F7F8', elev: '#E5EFF1', elev2: '#D7E7EA' } }
        },
        {
            id: 'aurora', name: 'Aurora', h: 162, s: 72, l: 55, ink: '#06231A',
            gradA: 'hsl(162 80% 58%)', gradB: 'hsl(255 80% 68%)',
            sw: 'linear-gradient(120deg,#33D6A6,#8A7BFF)',
            bg: { dark: { bg: '#06110F', elev: '#0C1B18', elev2: '#122521' }, light: { bg: '#F2FAF7', elev: '#E4F3EC', elev2: '#D5EBE1' } }
        },
        {
            id: 'galaxy', name: 'Galaxy', h: 262, s: 85, l: 68, ink: '#fff', mode: 'dark',
            gradA: 'hsl(230 85% 68%)', gradB: 'hsl(300 80% 68%)',
            sw: 'linear-gradient(120deg,#5C6CFF,#C45CFF)',
            bg: { dark: { bg: '#0A0716', elev: '#130E26', elev2: '#1B1535' }, light: { bg: '#F6F4FC', elev: '#ECE8F8', elev2: '#E0DAF2' } }
        },
        {
            id: 'ocean', name: 'Ocean Breeze', h: 199, s: 88, l: 55, ink: '#04202B', mode: 'light',
            gradA: 'hsl(185 85% 55%)', gradB: 'hsl(215 90% 58%)',
            sw: 'linear-gradient(120deg,#23C3E0,#2E7DF0)',
            bg: { dark: { bg: '#051019', elev: '#0A1A27', elev2: '#102434' }, light: { bg: '#F0F8FB', elev: '#E1F0F6', elev2: '#D1E7F0' } }
        },
        {
            id: 'sakura', name: 'Sakura Blossom', h: 340, s: 72, l: 66, ink: '#3A0F1F', mode: 'light',
            gradA: 'hsl(340 85% 74%)', gradB: 'hsl(20 85% 70%)',
            sw: 'linear-gradient(120deg,#F591B2,#F5A98D)',
            bg: { dark: { bg: '#170D11', elev: '#22151B', elev2: '#2C1B23' }, light: { bg: '#FDF4F6', elev: '#F9E7EC', elev2: '#F4D9E1' } }
        },
        {
            id: 'golden', name: 'Golden Hour', h: 36, s: 92, l: 55, ink: '#241300',
            gradA: 'hsl(36 95% 58%)', gradB: 'hsl(350 80% 62%)',
            sw: 'linear-gradient(120deg,#F2A93B,#E9556D)',
            bg: { dark: { bg: '#140E05', elev: '#1F160A', elev2: '#291E0F' }, light: { bg: '#FBF5EB', elev: '#F5EAD7', elev2: '#EFDFC4' } }
        },
        {
            id: 'amoled', name: 'AMOLED Black', h: 210, s: 100, l: 62, ink: '#fff', mode: 'dark',
            gradA: 'hsl(210 100% 66%)', gradB: 'hsl(190 90% 58%)',
            sw: 'linear-gradient(120deg,#000 55%,#2E90FF)',
            bg: { dark: { bg: '#000000', elev: '#0C0C0E', elev2: '#141416' }, light: { bg: '#F6F6F6', elev: '#ECECEC', elev2: '#E0E0E0' } }
        },
        { // Secret prize theme — unlocked by finishing Explorer Quest
            id: 'legendgold', name: 'Legend Gold ✦', secret: true, h: 44, s: 90, l: 56, ink: '#241300',
            gradA: 'hsl(48 95% 62%)', gradB: 'hsl(30 90% 50%)',
            sw: 'linear-gradient(120deg,#F3C13B,#E58A2F)',
            bg: { dark: { bg: '#120D03', elev: '#1D1508', elev2: '#271D0D' }, light: { bg: '#FCF6E8', elev: '#F7EDD3', elev2: '#F1E3BE' } }
        },
    ];

    const ACCENTS = [
        { name: 'Violet', h: 244, s: 100, l: 68 }, { name: 'Indigo', h: 232, s: 90, l: 66 },
        { name: 'Fuchsia', h: 292, s: 82, l: 66 }, { name: 'Blue', h: 214, s: 95, l: 60 },
        { name: 'Teal', h: 172, s: 70, l: 50 }, { name: 'Rose', h: 342, s: 82, l: 64 },
        { name: 'Amber', h: 38, s: 95, l: 58 }, { name: 'Emerald', h: 152, s: 70, l: 48 },
    ];
    const GRADIENTS = [
        { name: 'Signature', a: 'var(--accent-hover)', b: 'var(--accent)' },
        { name: 'Aurora', a: 'hsl(292 82% 70%)', b: 'var(--accent)' },
        { name: 'Ocean', a: 'hsl(190 90% 60%)', b: 'var(--accent)' },
        { name: 'Sunset', a: 'hsl(28 95% 62%)', b: 'hsl(342 82% 64%)' },
        { name: 'Hero', a: 'hsl(356 82% 60%)', b: 'hsl(218 85% 58%)' },
        { name: 'Candy', a: 'hsl(325 95% 70%)', b: 'hsl(262 85% 68%)' },
        { name: 'Neon', a: 'hsl(184 95% 58%)', b: 'hsl(315 95% 62%)' },
        { name: 'Steel', a: 'hsl(210 12% 72%)', b: 'hsl(210 8% 45%)' },
    ];

    const state = {
        theme: store.get('theme', null),
        preset: store.get('preset', 'mono'),
        accent: store.get('accent2', null),   // null = use preset accent
        grad: store.get('grad2', null),       // null = use preset gradient
        ambient: store.get('ambient', 'off'),
        grid: store.get('grid', 'off'),
        gridSize: store.get('gridSize', 64),
        gridAlpha: store.get('gridAlpha', 0.7),
        sound: store.get('sound', true),
        font: store.get('font', 'default'),
        size: store.get('size', 'm'),
        desktop: store.get('desktop', 'off'),
        cursor: store.get('cursor', 'arrow'),
        voiceAuto: store.get('voiceAuto', false),
        voiceLang: store.get('voiceLang', 'en-US'),
    };
    // Default mode follows the time of day (06:00–17:59 light, otherwise dark)
    if (!state.theme) { const hh = new Date().getHours(); state.theme = (hh >= 6 && hh < 18) ? 'light' : 'dark'; }

    /* ---------- Fonts ---------- */
    const FONTS = [
        { id: 'default', name: 'Signature mix', sample: 'Ag', css: null },
        { id: 'spacegrotesk', name: 'Space Grotesk', sample: 'Ag', css: "'Space Grotesk'" },
        { id: 'inter', name: 'Inter', sample: 'Ag', css: "'Inter'" },
        { id: 'clash', name: 'Clash Display', sample: 'Ag', css: "'Clash Display'", src: 'https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&display=swap' },
        { id: 'general', name: 'General Sans', sample: 'Ag', css: "'General Sans'", src: 'https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&display=swap' },
        { id: 'satoshi', name: 'Satoshi', sample: 'Ag', css: "'Satoshi'", src: 'https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap' },
        { id: 'manrope', name: 'Manrope', sample: 'Ag', css: "'Manrope'", src: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700&display=swap' },
        { id: 'jakarta', name: 'Plus Jakarta Sans', sample: 'Ag', css: "'Plus Jakarta Sans'", src: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap' },
        { id: 'outfit', name: 'Outfit', sample: 'Ag', css: "'Outfit'", src: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap' },
        { id: 'monologue', name: 'Monologue', sample: 'Ag', css: "'JetBrains Mono'" },
        { id: 'sfpro', name: 'SF Pro', sample: 'Ag', css: "-apple-system, 'SF Pro Display', 'SF Pro Text'" },
    ];
    const loadedFontSrc = {};
    function ensureFont(f) {
        if (!f || !f.src || loadedFontSrc[f.id]) return;
        const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = f.src;
        document.head.appendChild(l); loadedFontSrc[f.id] = true;
    }
    function applyFont() {
        const f = FONTS.find(x => x.id === state.font) || FONTS[0];
        ensureFont(f);
        if (!f.css) {
            html.style.removeProperty('--font-body');
            html.style.removeProperty('--font-display');
        } else {
            html.style.setProperty('--font-body', `${f.css}, 'Inter', -apple-system, sans-serif`);
            html.style.setProperty('--font-display', `${f.css}, 'Space Grotesk', sans-serif`);
        }
        $$('#fontGrid .preset-btn').forEach(b => b.classList.toggle('active', b.dataset.font === state.font));
    }
    const SIZES = { s: '93.75%', m: '100%', l: '112.5%', xl: '125%' };
    function applySize() {
        html.style.fontSize = SIZES[state.size] || '100%';
        $$('[data-size]').forEach(b => b.classList.toggle('active', b.dataset.size === state.size));
    }
    function applyDesktop() {
        html.setAttribute('data-desktop', state.desktop);
        $$('[data-desktop]').forEach(b => { if (b.tagName === 'BUTTON') b.classList.toggle('active', b.dataset.desktop === state.desktop); });
    }

    /* ---------- Favorites (themes, gradients, fonts) ---------- */
    let favs = store.get('favs', {});
    function addFavStar(btn, key) {
        const star = document.createElement('span');
        star.className = 'fav-star' + (favs[key] ? ' on' : '');
        star.textContent = '★';
        star.setAttribute('aria-hidden', 'true');
        btn.style.position = 'relative';
        btn.appendChild(star);
        btn.dataset.favKey = key;
        btn.title = 'Double-tap to favorite';
        btn.addEventListener('dblclick', e => {
            e.preventDefault();
            favs[key] = !favs[key]; if (!favs[key]) delete favs[key];
            store.set('favs', favs);
            star.classList.toggle('on', !!favs[key]);
            sortFavs(btn.parentElement);
            sfx(favs[key] ? 'unlock' : 'click');
        });
    }
    function sortFavs(container) {
        if (!container) return;
        const kids = Array.from(container.children);
        kids.map((el, i) => ({ el, i }))
            .sort((a, b) => ((favs[b.el.dataset.favKey] ? 1 : 0) - (favs[a.el.dataset.favKey] ? 1 : 0)) || (a.i - b.i))
            .forEach(({ el }) => container.appendChild(el));
    }

    const THEME_VARS = ['--accent-h', '--accent-s', '--accent-l', '--grad-a', '--grad-b', '--accent-ink', '--bg', '--bg-elev', '--bg-elev-2'];

    function applyPreset() {
        const p = PRESETS.find(x => x.id === state.preset) || PRESETS[0];
        html.setAttribute('data-preset', p.id);
        THEME_VARS.forEach(v => html.style.removeProperty(v));
        if (p.id !== 'mono' && p.id !== 'custom') {
            html.style.setProperty('--accent-h', p.h);
            html.style.setProperty('--accent-s', p.s + '%');
            html.style.setProperty('--accent-l', p.l + '%');
            html.style.setProperty('--grad-a', p.gradA);
            html.style.setProperty('--grad-b', p.gradB);
            html.style.setProperty('--accent-ink', p.ink || (p.l > 62 ? '#0B0B0C' : '#FFFFFF'));
            const bg = p.bg && p.bg[state.theme];
            if (bg) {
                html.style.setProperty('--bg', bg.bg);
                html.style.setProperty('--bg-elev', bg.elev);
                html.style.setProperty('--bg-elev-2', bg.elev2);
            }
        }
        // Manual overrides (chosen after preset) still win
        if (state.accent !== null) applyAccent(false);
        if (state.grad !== null) applyGradient(false);
        $$('.preset-btn').forEach(b => b.classList.toggle('active', b.dataset.preset === p.id));
        refreshAccentCss();
    }

    function applyAccent(sync = true) {
        if (state.accent === null) { $$('.swatch').forEach(el => el.classList.remove('active')); return; }
        const a = ACCENTS[state.accent] || ACCENTS[0];
        html.style.setProperty('--accent-h', a.h);
        html.style.setProperty('--accent-s', a.s + '%');
        html.style.setProperty('--accent-l', a.l + '%');
        html.style.setProperty('--accent-ink', a.l > 62 ? '#0B0B0C' : '#FFFFFF');
        if (html.getAttribute('data-preset') === 'mono') html.setAttribute('data-preset', 'custom');
        $$('.swatch').forEach((el) => el.classList.toggle('active', +el.dataset.idx === state.accent));
        if (sync) refreshAccentCss();
    }
    function applyGradient(sync = true) {
        if (state.grad === null) { $$('.grad-swatch').forEach(el => el.classList.remove('active')); return; }
        const g = GRADIENTS[state.grad] || GRADIENTS[0];
        html.style.setProperty('--grad-a', g.a);
        html.style.setProperty('--grad-b', g.b);
        $$('.grad-swatch').forEach((el) => el.classList.toggle('active', +el.dataset.idx === state.grad));
        if (sync) refreshAccentCss();
    }
    function applyTheme() {
        html.setAttribute('data-theme', state.theme);
        const tt = $('#themeToggle');
        if (tt) {
            tt.setAttribute('aria-pressed', String(state.theme === 'light'));
            tt.setAttribute('aria-label', state.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
        }
        $$('[data-theme-choice]').forEach(b => b.classList.toggle('active', b.dataset.themeChoice === state.theme));
        applyPreset(); // refresh per-mode preset backgrounds
    }
    function applyGrid() {
        html.setAttribute('data-grid', state.grid);
        html.style.setProperty('--grid-size', state.gridSize + 'px');
        html.style.setProperty('--grid-alpha', state.gridAlpha);
        $$('[data-grid-choice]').forEach(b => b.classList.toggle('active', b.dataset.gridChoice === state.grid));
        $$('[data-grid-size]').forEach(b => b.classList.toggle('active', +b.dataset.gridSize === state.gridSize));
        $$('[data-grid-alpha]').forEach(b => b.classList.toggle('active', +b.dataset.gridAlpha === state.gridAlpha));
        $('#gridOpts')?.classList.toggle('open', state.grid === 'on');
    }
    function applySound() {
        $$('[data-sound-choice]').forEach(b => b.classList.toggle('active', b.dataset.soundChoice === (state.sound ? 'on' : 'off')));
    }

    /* ---------- Build Edit Preferences controls ---------- */
    const presetGrid = $('#presetGrid');
    let giftClaimed = store.get('gift', false);
    function addPresetBtn(p) {
        const b = document.createElement('button');
        b.className = 'preset-btn'; b.dataset.preset = p.id;
        b.innerHTML = `<span class="preset-swatch" style="background:${p.sw}"></span><span class="preset-name">${p.name}</span>`;
        b.addEventListener('click', () => selectPreset(p));
        presetGrid.appendChild(b);
    }
    function selectPreset(p) {
        state.preset = p.id; state.accent = null; state.grad = null;
        store.set('preset', p.id); store.set('accent2', null); store.set('grad2', null);
        if (p.mode) { state.theme = p.mode; store.set('theme', p.mode); }
        if (p.ambient) { state.ambient = p.ambient; store.set('ambient', state.ambient); }
        applyTheme(); applyAccent(); applyGradient(); applyAmbient(); updateAvatarMode();
        sfx('switch'); unlock('theme');
    }
    PRESETS.forEach(p => { if (!p.secret || giftClaimed) addPresetBtn(p); });
    $$('#presetGrid .preset-btn').forEach(b => addFavStar(b, 'preset:' + b.dataset.preset));
    sortFavs(presetGrid);

    // Font grid
    const fontGrid = $('#fontGrid');
    FONTS.forEach(f => {
        const b = document.createElement('button');
        b.className = 'preset-btn'; b.dataset.font = f.id;
        b.innerHTML = `<span class="font-swatch">${f.sample}</span><span class="preset-name">${f.name}</span>`;
        if (f.css) $('.font-swatch', b).style.fontFamily = f.css;
        b.addEventListener('click', () => { ensureFont(f); state.font = f.id; store.set('font', f.id); applyFont(); sfx('click'); });
        b.addEventListener('mouseenter', () => ensureFont(f), { once: true });
        fontGrid.appendChild(b);
        addFavStar(b, 'font:' + f.id);
    });
    sortFavs(fontGrid);

    $$('[data-size]').forEach(b => b.addEventListener('click', () => {
        state.size = b.dataset.size; store.set('size', state.size); applySize(); sfx('click');
    }));
    $$('#desktopSeg [data-desktop]').forEach(b => b.addEventListener('click', () => {
        state.desktop = b.dataset.desktop; store.set('desktop', state.desktop); applyDesktop(); sfx('switch');
    }));

    function buildSwatches(accRow, gradRow) {
        ACCENTS.forEach((a, i) => {
            const b = document.createElement('button');
            b.className = 'swatch'; b.dataset.idx = i;
            b.style.background = `hsl(${a.h} ${a.s}% ${a.l}%)`;
            b.setAttribute('aria-label', a.name); b.title = a.name;
            b.addEventListener('click', () => { state.accent = i; store.set('accent2', i); applyAccent(); sfx('click'); unlock('theme'); });
            accRow.appendChild(b);
        });
        GRADIENTS.forEach((g, i) => {
            const b = document.createElement('button');
            b.className = 'grad-swatch'; b.dataset.idx = i;
            const a2 = g.a.startsWith('var') ? 'hsl(244 100% 76%)' : g.a;
            const b2 = g.b.startsWith('var') ? 'hsl(244 100% 68%)' : g.b;
            b.style.background = `linear-gradient(120deg, ${a2}, ${b2})`;
            b.setAttribute('aria-label', g.name); b.title = g.name;
            b.addEventListener('click', () => { state.grad = i; store.set('grad2', i); applyGradient(); sfx('click'); });
            gradRow.appendChild(b);
            if (gradRow.id === 'gradSwatches') { addFavStar(b, 'grad:' + i); }
        });
    }
    buildSwatches($('#accentSwatches'), $('#gradSwatches'));
    sortFavs($('#gradSwatches'));

    $$('[data-theme-choice]').forEach(b => b.addEventListener('click', () => {
        state.theme = b.dataset.themeChoice; store.set('theme', state.theme);
        applyTheme(); updateAvatarMode(); sfx('switch'); unlock('theme');
    }));
    $('#themeToggle')?.addEventListener('click', () => {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
        store.set('theme', state.theme); applyTheme(); updateAvatarMode(); sfx('switch'); unlock('theme');
    });
    $$('[data-ambient]').forEach(b => b.addEventListener('click', () => {
        state.ambient = b.dataset.ambient; store.set('ambient', state.ambient); applyAmbient(); sfx('click');
    }));
    $$('[data-grid-choice]').forEach(b => b.addEventListener('click', () => {
        state.grid = b.dataset.gridChoice; store.set('grid', state.grid); applyGrid(); sfx('switch');
    }));
    $$('[data-grid-size]').forEach(b => b.addEventListener('click', () => {
        state.gridSize = +b.dataset.gridSize; store.set('gridSize', state.gridSize); applyGrid(); sfx('click');
    }));
    $$('[data-grid-alpha]').forEach(b => b.addEventListener('click', () => {
        state.gridAlpha = +b.dataset.gridAlpha; store.set('gridAlpha', state.gridAlpha); applyGrid(); sfx('click');
    }));
    $$('[data-sound-choice]').forEach(b => b.addEventListener('click', () => {
        state.sound = b.dataset.soundChoice === 'on'; store.set('sound', state.sound); applySound();
        if (state.sound) { ensureCtx(); sfx('switch'); }
    }));

    function syncAmbientButtons() { $$('[data-ambient]').forEach(b => b.classList.toggle('active', b.dataset.ambient === state.ambient)); }

    /* Panels open/close */
    const appPanel = $('#appearancePanel'), achPanel = $('#achPanel');
    const openPanel = p => { p.classList.add('open'); p.setAttribute('aria-hidden', 'false'); };
    const closePanel = p => { p.classList.remove('open'); p.setAttribute('aria-hidden', 'true'); };
    $('#appearanceBtn')?.addEventListener('click', () => { openPanel(appPanel); sfx('pop'); });
    $('#appearanceClose')?.addEventListener('click', () => closePanel(appPanel));
    appPanel?.addEventListener('click', e => { if (e.target === appPanel) closePanel(appPanel); });
    $('#appearanceReset')?.addEventListener('click', () => {
        state.preset = 'mono'; state.accent = null; state.grad = null;
        state.ambient = 'off';
        { const hh = new Date().getHours(); state.theme = (hh >= 6 && hh < 18) ? 'light' : 'dark'; }
        state.grid = 'off'; state.gridSize = 64; state.gridAlpha = 0.7; state.sound = true;
        state.font = 'default'; state.size = 'm'; state.desktop = 'off';
        ['preset', 'accent2', 'grad2', 'ambient', 'theme', 'grid', 'gridSize', 'gridAlpha', 'sound', 'font', 'size', 'desktop']
            .forEach((k, i) => store.set(k, [state.preset, state.accent, state.grad, state.ambient, state.theme, state.grid, state.gridSize, state.gridAlpha, state.sound, state.font, state.size, state.desktop][i]));
        applyTheme(); applyAccent(); applyGradient(); applyGrid(); applySound(); applyAmbient(); syncAmbientButtons();
        applyFont(); applySize(); applyDesktop(); updateAvatarMode();
        state.cursor = 'arrow'; store.set('cursor', 'arrow'); applyCursor();
        sfx('switch');
    });

    /* Mobile: theme + accent + gradient in hamburger */
    const extra = $('#navMenuExtra');
    if (extra) {
        extra.innerHTML = `
      <div class="panel-group"><span class="panel-label">Theme</span>
        <div class="seg"><button data-theme-choice="light">Light</button><button data-theme-choice="dark">Dark</button></div>
      </div>
      <div class="panel-group"><span class="panel-label">Accent</span><div class="swatch-row" id="accentSwatchesM"></div></div>
      <div class="panel-group"><span class="panel-label">Gradient</span><div class="grad-row" id="gradSwatchesM"></div></div>`;
        buildSwatches($('#accentSwatchesM'), $('#gradSwatchesM'));
        $$('#navMenuExtra [data-theme-choice]').forEach(b => b.addEventListener('click', () => {
            state.theme = b.dataset.themeChoice; store.set('theme', state.theme);
            applyTheme(); updateAvatarMode(); sfx('switch'); unlock('theme');
        }));
    }

    // Initial paint
    applyTheme(); applyAccent(); applyGradient(); applyGrid(); applySound(); syncAmbientButtons();
    applyFont(); applySize(); applyDesktop();

    /* ===================== RENDER: SKILLS / TOOLS / HONORS ===================== */
    const coreGrid = $('#coreGrid');
    CORE_SKILLS.forEach(s => {
        const el = document.createElement('button');
        el.type = 'button';
        el.className = 'core-card flip';
        el.setAttribute('aria-expanded', 'false');
        el.setAttribute('aria-label', s.t + ' — tap to flip for details');
        el.innerHTML = `
      <span class="flip-inner">
        <span class="flip-face flip-front">
          <span class="core-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="${s.i}"/></svg></span>
          <h4>${s.t}</h4>
          <span class="flip-tools">${(s.tools || []).map(t => `<span>${t}</span>`).join('')}</span>
        </span>
        <span class="flip-face flip-back">
          <span class="flip-back-title">${s.t}</span>
          <p>${s.d}</p>
        </span>
      </span>`;
        el.addEventListener('click', () => {
            const on = el.classList.toggle('flipped');
            el.setAttribute('aria-expanded', String(on));
            sfx('switch');
        });
        coreGrid.appendChild(el);
    });

    const track = $('#carouselTrack');
    const buildTool = t => `<div class="carousel-item"><span class="carousel-badge">${t.a}</span><span class="tool-name">${t.n}</span></div>`;
    track.innerHTML = TOOLS.map(buildTool).join('') + TOOLS.map(buildTool).join('');

    const honorsGrid = $('#honorsGrid');
    const trophy = 'M7 4h10v3a5 5 0 0 1-5 5 5 5 0 0 1-5-5V4zM5 5H3v2a4 4 0 0 0 4 4V9a3 3 0 0 1-2-3V5zm14 0h2v2a4 4 0 0 1-4 4V9a3 3 0 0 0 2-3V5zM9 17h6v1a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1v-1zm-1 3h8v1H8v-1z';
    const star = 'M12 2l2.4 5.1 5.6.6-4.2 3.8 1.2 5.5L12 14.9 6.9 17l1.2-5.5-4.2-3.8 5.6-.6L12 2z';
    const medal = 'M12 2a5 5 0 0 1 5 5 5 5 0 0 1-3 4.58V21l-2-1.2L10 21v-9.42A5 5 0 0 1 7 7a5 5 0 0 1 5-5z';
    HONORS.forEach((h, i) => {
        const ico = i < 2 ? trophy : (i < 4 ? star : medal);
        const el = document.createElement('div');
        el.className = 'honor-card';
        el.innerHTML = `<span class="honor-icon"><svg viewBox="0 0 24 24" width="16" height="16"><path d="${ico}"/></svg></span><p>${h}</p>`;
        honorsGrid.appendChild(el);
    });

    /* ===================== PROJECTS ===================== */
    const grid = $('#projectGrid');
    const arrow = '<svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    const coverHtml = p =>
        `<span class="device-cover"><span class="cover-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="${COVER_ICONS[p.cover]}"/></svg></span><span class="cover-label">${p.coverLabel || p.title}</span></span>`;

    PROJECTS.forEach(p => {
        const card = document.createElement('button');
        card.className = 'project-card g' + (p.group || 2);
        card.dataset.key = p.key;
        card.dataset.cat = p.cat.join('|');
        card.dataset.search = (p.title + ' ' + p.role + ' ' + p.techs.join(' ') + ' ' + p.type).toLowerCase();
        card.setAttribute('aria-haspopup', 'dialog');
        const media = p.image
            ? `<img src="${p.image}" alt="${p.alt || p.title}" loading="lazy">`
            : coverHtml(p);
        card.innerHTML = `
      <span class="device-frame"><span class="device-bar"><span></span><span></span><span></span></span>${media}<span class="device-overlay">View case study ${arrow}</span></span>
      <span class="project-info">
        <span class="project-tag">${p.tag}</span>
        <span class="project-title">${p.title}</span>
        <span class="project-role">${p.role}</span>
        <span class="project-techs">${p.techs.map(t => `<span>${t}</span>`).join('')}</span>
      </span>`;
        card.addEventListener('click', () => openProjectModal(p.key));
        grid.appendChild(card);
    });

    let activeFilter = 'all';
    const PROJ_PAGE_SIZE = 3;
    let projPage = 0;
    function renderProjPage(reset) {
        if (reset) projPage = 0;
        const matched = $$('.project-card', grid).filter(c => c.dataset.match === '1');
        const pages = Math.max(1, Math.ceil(matched.length / PROJ_PAGE_SIZE));
        projPage = Math.min(projPage, pages - 1);
        $$('.project-card', grid).forEach(c => { c.classList.add('hide'); c.classList.remove('anim-in'); });
        matched.slice(projPage * PROJ_PAGE_SIZE, (projPage + 1) * PROJ_PAGE_SIZE).forEach((c, i) => {
            c.classList.remove('hide');
            c.classList.add('in');
            void c.offsetWidth; // restart the drop-in animation
            c.style.animationDelay = (i * 0.1) + 's';
            c.classList.add('anim-in');
        });
        $('#projectEmpty').hidden = matched.length > 0;
        $('#projPager').style.display = matched.length ? '' : 'none';
        $('#projInd').textContent = `${projPage + 1} / ${pages}`;
        $('#projPrev').disabled = projPage === 0;
        $('#projNext').disabled = projPage >= pages - 1;
    }
    function applyProjectFilters() {
        const q = ($('#projectSearch').value || '').trim().toLowerCase();
        $$('.project-card', grid).forEach(card => {
            const inCat = activeFilter === 'all' || card.dataset.cat.split('|').includes(activeFilter);
            const inSearch = !q || card.dataset.search.includes(q);
            card.dataset.match = (inCat && inSearch) ? '1' : '0';
        });
        renderProjPage(true);
    }
    $('#projPrev').addEventListener('click', () => { if (projPage > 0) { projPage--; renderProjPage(false); sfx('click'); } });
    $('#projNext').addEventListener('click', () => { projPage++; renderProjPage(false); sfx('click'); });
    grid.classList.add('paged');
    applyProjectFilters();
    $$('#projectFilters .filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            $$('#projectFilters .filter-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
            btn.classList.add('active'); btn.setAttribute('aria-selected', 'true');
            activeFilter = btn.dataset.filter; applyProjectFilters(); sfx('click');
        });
    });
    $('#projectSearch').addEventListener('input', applyProjectFilters);

    /* Project modal */
    const modal = $('#projectModal');
    const mEls = {
        media: $('#modalMedia'), tag: $('#modalTag'), title: $('#modalTitle'), role: $('#modalRole'),
        meta: $('#modalMeta'), list: $('#modalList'), gallery: $('#modalGallery'), tags: $('#modalTags'), actions: $('#modalActions')
    };
    let lastFocused = null;
    function openProjectModal(key) {
        const p = PROJECTS.find(x => x.key === key); if (!p) return;
        mEls.media.className = 'modal-media'; mEls.media.innerHTML = '';
        if (p.image) { const img = new Image(); img.src = p.image; img.alt = p.alt || p.title; mEls.media.appendChild(img); }
        else mEls.media.innerHTML = coverHtml(p);
        mEls.tag.textContent = p.tag; mEls.title.textContent = p.title; mEls.role.textContent = p.role;
        mEls.meta.innerHTML = `<div><dt>Category</dt><dd>${p.cat.join(', ')}</dd></div><div><dt>Type</dt><dd>${p.type}</dd></div><div><dt>Year</dt><dd>${p.year}</dd></div>`;
        mEls.list.innerHTML = p.list.map(i => `<li>${i}</li>`).join('');
        if (p.gallery && p.gallery.length) {
            mEls.gallery.style.display = '';
            mEls.gallery.innerHTML = p.gallery.map(src => `<img src="${src}" alt="${p.title} preview" loading="lazy">`).join('');
            $$('img', mEls.gallery).forEach(img => img.addEventListener('click', () => openLightbox(img.src, img.alt)));
        } else { mEls.gallery.style.display = 'none'; mEls.gallery.innerHTML = ''; }
        mEls.tags.innerHTML = p.techs.map(t => `<span>${t}</span>`).join('');
        if (p.links && p.links.length) {
            mEls.actions.innerHTML = p.links.map(l =>
                `<a class="btn ${l.primary ? 'btn-primary' : 'btn-outline'}" href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label} ${arrow}</a>`
            ).join('');
        } else {
            mEls.actions.innerHTML = `<span class="project-role" style="align-self:center">Design files for this project aren't public.</span>`;
        }
        // Narrated walkthrough (text-to-speech)
        if (window.speechSynthesis) {
            const lb = document.createElement('button');
            lb.className = 'btn btn-ghost'; lb.id = 'modalListen';
            lb.innerHTML = '🔊 Listen to walkthrough';
            lb.addEventListener('click', () => {
                if (speechSynthesis.speaking) { speechSynthesis.cancel(); lb.innerHTML = '🔊 Listen to walkthrough'; return; }
                const u = new SpeechSynthesisUtterance(`${p.title}. ${p.role}, ${p.year}. ${p.list.join(' ')}`);
                u.rate = 1.02;
                u.onend = () => { lb.innerHTML = '🔊 Listen to walkthrough'; };
                lb.innerHTML = '⏹ Stop narration';
                speechSynthesis.speak(u);
            });
            mEls.actions.prepend(lb);
        }
        lastFocused = document.activeElement;
        modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false');
        $('#modalClose').focus(); document.body.style.overflow = 'hidden';
        sfx('pop'); unlock('projects');
    }
    function closeProjectModal() {
        if (window.speechSynthesis) speechSynthesis.cancel();
        modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; if (lastFocused) lastFocused.focus();
    }
    $('#modalClose').addEventListener('click', closeProjectModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeProjectModal(); });

    /* Lightbox */
    const lightbox = $('#lightbox'), lightboxImg = $('#lightboxImg');
    function openLightbox(src, alt) { lightboxImg.src = src; lightboxImg.alt = alt || ''; lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden', 'false'); }
    function closeLightbox() { lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden', 'true'); }
    $('#lightboxClose').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

    /* ===================== CERTIFICATIONS — infinite center-focus carousel ===================== */
    const certStage = $('#certStage'), certCarousel = $('#certCarousel');
    const certCardHtml = c =>
        `<div class="cert-card"><div class="cert-top"><span class="cert-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="${c.i}"/></svg></span><span class="cert-year">${c.y}</span></div><h3>${c.t}</h3><p class="cert-issuer">${c.issuer}</p><p class="cert-desc">${c.d}</p></div>`;
    // 3 copies for seamless wrap
    certCarousel.innerHTML = CERTS.map(certCardHtml).join('') + CERTS.map(certCardHtml).join('') + CERTS.map(certCardHtml).join('');
    const certCards = $$('.cert-card', certCarousel);
    certStage.style.touchAction = 'pan-y';

    let certOffset = 0, certSeg = 0, certPaused = false, certDragging = false, dragStartX = 0, dragStartOffset = 0;
    function measureCerts() {
        const gap = parseFloat(getComputedStyle(certCarousel).gap) || 0;
        certSeg = 0;
        for (let i = 0; i < CERTS.length; i++) certSeg += certCards[i].offsetWidth + gap;
        if (certOffset === 0) certOffset = -certSeg; // start on the middle copy
    }
    let certDotIdx = -1;
    function certFrame() {
        if (!certDragging && !certPaused && !reduceMotion) certOffset -= 0.45;
        // wrap within [-2*seg, -seg]
        if (certSeg > 0) {
            while (certOffset <= -certSeg * 2) certOffset += certSeg;
            while (certOffset > -certSeg) certOffset -= certSeg;
        }
        certCarousel.style.transform = `translate3d(${certOffset}px,0,0)`;
        // center-focus scaling
        const stageRect = certStage.getBoundingClientRect();
        const cx = stageRect.left + stageRect.width / 2;
        let best = null, bestT = -1;
        certCards.forEach(card => {
            const r = card.getBoundingClientRect();
            const d = Math.abs((r.left + r.width / 2) - cx);
            const t = Math.max(0, 1 - d / (stageRect.width * 0.55));
            card.style.transform = `scale(${(0.88 + t * 0.17).toFixed(3)})`;
            card.style.opacity = (0.42 + t * 0.58).toFixed(3);
            if (t > bestT) { bestT = t; best = card; }
        });
        certCards.forEach(c => c.classList.toggle('is-center', c === best));
        if (best) {
            const di = certCards.indexOf(best) % 3;
            if (di !== certDotIdx) {
                certDotIdx = di;
                $$('#certDots span').forEach((d, k) => d.classList.toggle('on', k === di));
            }
        }
        requestAnimationFrame(certFrame);
    }
    certStage.addEventListener('mouseenter', () => certPaused = true);
    certStage.addEventListener('mouseleave', () => { certPaused = false; certDragging = false; certStage.classList.remove('dragging'); });
    certStage.addEventListener('pointerdown', e => {
        certDragging = true; certStage.classList.add('dragging');
        dragStartX = e.clientX; dragStartOffset = certOffset;
        certStage.setPointerCapture(e.pointerId);
    });
    certStage.addEventListener('pointermove', e => {
        if (!certDragging) return;
        certOffset = dragStartOffset + (e.clientX - dragStartX);
    });
    const endDrag = () => { certDragging = false; certStage.classList.remove('dragging'); };
    certStage.addEventListener('pointerup', endDrag);
    certStage.addEventListener('pointercancel', endDrag);
    window.addEventListener('resize', measureCerts);
    measureCerts();
    requestAnimationFrame(certFrame);

    // Carousel / List view toggle
    const certListView = $('#certListView');
    certListView.innerHTML = CERTS.map(cc => `
    <div class="cert-list-row">
      <span class="cert-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="${cc.i}"/></svg></span>
      <div><h4>${cc.t}</h4><p class="cl-issuer">${cc.issuer}</p><p class="cl-desc">${cc.d}</p></div>
      <span class="cert-year">${cc.y}</span>
    </div>`).join('');
    let certView = 'carousel';
    function setCollectionsView(view) { // 'carousel' | 'list' — keeps Honors in step
        certView = view;
        $$('#certViewSeg [data-cert-view]').forEach(x => x.classList.toggle('active', x.dataset.certView === view));
        certStage.hidden = view !== 'carousel';
        certListView.hidden = view !== 'list';
        const hv = view === 'list' ? 'list' : 'cards';
        $$('#honorsViewSeg [data-honors-view]').forEach(x => x.classList.toggle('active', x.dataset.honorsView === hv));
        const hg = $('#honorsGrid'); if (hg) hg.hidden = hv !== 'cards';
        honorsListEl.hidden = hv !== 'list';
        if (view === 'carousel') measureCerts();
    }
    $$('#certViewSeg [data-cert-view]').forEach(b => b.addEventListener('click', () => {
        setCollectionsView(b.dataset.certView); sfx('click');
    }));

    // Honors: cards / list toggle
    const honorsListEl = $('#honorsList');
    honorsListEl.innerHTML = HONORS.map((hh, i) => `<div class="h-row"><span class="h-num">${String(i + 1).padStart(2, '0')}</span>${hh}</div>`).join('');
    $$('#honorsViewSeg [data-honors-view]').forEach(b => b.addEventListener('click', () => {
        setCollectionsView(b.dataset.honorsView === 'list' ? 'list' : 'carousel'); sfx('click');
    }));

    /* ===================== DOTTED PHILIPPINES MAP ===================== */
    const PH_DOTS = [[19, 0], [20, 0], [15, 4], [16, 4], [17, 4], [18, 4], [19, 4], [20, 4], [22, 4], [23, 4], [15, 5], [16, 5], [17, 5], [18, 5], [19, 5], [20, 5], [21, 5], [22, 5], [15, 6], [16, 6], [17, 6], [18, 6], [19, 6], [20, 6], [21, 6], [22, 6], [23, 6], [15, 7], [16, 7], [17, 7], [18, 7], [19, 7], [20, 7], [21, 7], [14, 8], [15, 8], [16, 8], [17, 8], [18, 8], [19, 8], [20, 8], [21, 8], [22, 8], [23, 8], [15, 9], [16, 9], [17, 9], [18, 9], [19, 9], [20, 9], [21, 9], [22, 9], [23, 9], [15, 10], [16, 10], [17, 10], [18, 10], [19, 10], [20, 10], [21, 10], [22, 10], [23, 10], [24, 10], [15, 11], [16, 11], [17, 11], [18, 11], [19, 11], [20, 11], [21, 11], [22, 11], [23, 11], [24, 11], [14, 12], [15, 12], [16, 12], [17, 12], [18, 12], [19, 12], [20, 12], [21, 12], [22, 12], [14, 13], [15, 13], [16, 13], [17, 13], [18, 13], [19, 13], [20, 13], [21, 13], [22, 13], [23, 13], [12, 14], [15, 14], [16, 14], [17, 14], [18, 14], [19, 14], [20, 14], [21, 14], [22, 14], [23, 14], [12, 15], [14, 15], [15, 15], [16, 15], [17, 15], [18, 15], [19, 15], [20, 15], [12, 16], [13, 16], [14, 16], [15, 16], [16, 16], [17, 16], [18, 16], [19, 16], [20, 16], [12, 17], [13, 17], [14, 17], [15, 17], [16, 17], [17, 17], [18, 17], [19, 17], [20, 17], [12, 18], [13, 18], [14, 18], [15, 18], [16, 18], [17, 18], [18, 18], [19, 18], [12, 19], [13, 19], [14, 19], [15, 19], [16, 19], [17, 19], [18, 19], [13, 20], [14, 20], [15, 20], [16, 20], [17, 20], [18, 20], [19, 20], [13, 21], [14, 21], [15, 21], [16, 21], [17, 21], [18, 21], [19, 21], [20, 21], [21, 21], [13, 22], [14, 22], [17, 22], [18, 22], [19, 22], [15, 23], [17, 23], [18, 23], [19, 23], [20, 23], [16, 24], [17, 24], [18, 24], [19, 24], [20, 24], [24, 24], [25, 24], [26, 24], [16, 25], [17, 25], [18, 25], [19, 25], [20, 25], [22, 25], [23, 25], [24, 25], [25, 25], [26, 25], [27, 25], [17, 26], [18, 26], [19, 26], [20, 26], [22, 26], [23, 26], [24, 26], [26, 26], [27, 26], [29, 26], [30, 26], [33, 26], [18, 27], [23, 27], [24, 27], [27, 27], [28, 27], [29, 27], [32, 27], [33, 27], [14, 28], [15, 28], [16, 28], [17, 28], [21, 28], [22, 28], [23, 28], [25, 28], [28, 28], [29, 28], [30, 28], [15, 29], [16, 29], [17, 29], [18, 29], [24, 29], [25, 29], [29, 29], [30, 29], [16, 30], [17, 30], [18, 30], [19, 30], [27, 30], [30, 30], [31, 30], [32, 30], [16, 31], [17, 31], [18, 31], [19, 31], [20, 31], [31, 31], [32, 31], [17, 32], [18, 32], [19, 32], [20, 32], [22, 32], [23, 32], [28, 32], [29, 32], [30, 32], [33, 32], [34, 32], [35, 32], [36, 32], [37, 32], [18, 33], [29, 33], [30, 33], [34, 33], [35, 33], [36, 33], [37, 33], [38, 33], [12, 34], [28, 34], [30, 34], [31, 34], [34, 34], [35, 34], [36, 34], [37, 34], [38, 34], [12, 35], [31, 35], [32, 35], [36, 35], [37, 35], [38, 35], [22, 36], [23, 36], [24, 36], [34, 36], [35, 36], [37, 36], [38, 36], [22, 37], [23, 37], [24, 37], [25, 37], [26, 37], [27, 37], [33, 37], [34, 37], [36, 37], [37, 37], [38, 37], [10, 38], [22, 38], [23, 38], [24, 38], [25, 38], [26, 38], [27, 38], [32, 38], [34, 38], [35, 38], [36, 38], [37, 38], [38, 38], [39, 38], [10, 39], [22, 39], [23, 39], [24, 39], [25, 39], [26, 39], [34, 39], [35, 39], [36, 39], [9, 40], [10, 40], [22, 40], [23, 40], [24, 40], [25, 40], [27, 40], [28, 40], [29, 40], [31, 40], [36, 40], [10, 41], [22, 41], [27, 41], [28, 41], [29, 41], [31, 41], [36, 41], [37, 41], [8, 42], [9, 42], [10, 42], [27, 42], [28, 42], [30, 42], [31, 42], [36, 42], [37, 42], [39, 42], [7, 43], [8, 43], [9, 43], [27, 43], [28, 43], [30, 43], [33, 43], [36, 43], [37, 43], [39, 43], [7, 44], [8, 44], [26, 44], [27, 44], [28, 44], [29, 44], [30, 44], [32, 44], [33, 44], [36, 44], [37, 44], [6, 45], [8, 45], [25, 45], [26, 45], [27, 45], [29, 45], [30, 45], [31, 45], [32, 45], [33, 45], [34, 45], [39, 45], [41, 45], [5, 46], [6, 46], [25, 46], [26, 46], [27, 46], [29, 46], [32, 46], [33, 46], [38, 46], [39, 46], [40, 46], [3, 47], [4, 47], [5, 47], [6, 47], [26, 47], [27, 47], [28, 47], [29, 47], [35, 47], [39, 47], [40, 47], [41, 47], [3, 48], [4, 48], [5, 48], [27, 48], [30, 48], [35, 48], [39, 48], [40, 48], [41, 48], [1, 49], [2, 49], [3, 49], [27, 49], [36, 49], [39, 49], [40, 49], [41, 49], [42, 49], [0, 50], [1, 50], [2, 50], [3, 50], [36, 50], [37, 50], [38, 50], [39, 50], [40, 50], [41, 50], [42, 50], [0, 51], [1, 51], [29, 51], [30, 51], [34, 51], [36, 51], [37, 51], [38, 51], [39, 51], [40, 51], [41, 51], [42, 51], [0, 52], [28, 52], [29, 52], [30, 52], [31, 52], [34, 52], [35, 52], [36, 52], [37, 52], [38, 52], [39, 52], [40, 52], [41, 52], [42, 52], [0, 53], [27, 53], [28, 53], [29, 53], [30, 53], [31, 53], [32, 53], [33, 53], [34, 53], [35, 53], [36, 53], [37, 53], [38, 53], [39, 53], [40, 53], [41, 53], [42, 53], [43, 53], [23, 54], [24, 54], [25, 54], [26, 54], [27, 54], [28, 54], [29, 54], [30, 54], [31, 54], [32, 54], [33, 54], [34, 54], [35, 54], [36, 54], [37, 54], [38, 54], [39, 54], [40, 54], [41, 54], [42, 54], [23, 55], [24, 55], [25, 55], [27, 55], [28, 55], [29, 55], [31, 55], [32, 55], [33, 55], [34, 55], [35, 55], [36, 55], [37, 55], [38, 55], [39, 55], [40, 55], [41, 55], [42, 55], [43, 55], [23, 56], [24, 56], [27, 56], [28, 56], [33, 56], [34, 56], [35, 56], [36, 56], [37, 56], [38, 56], [39, 56], [40, 56], [41, 56], [42, 56], [43, 56], [22, 57], [23, 57], [24, 57], [33, 57], [34, 57], [35, 57], [36, 57], [37, 57], [38, 57], [39, 57], [41, 57], [42, 57], [43, 57], [22, 58], [23, 58], [33, 58], [34, 58], [35, 58], [36, 58], [37, 58], [38, 58], [39, 58], [40, 58], [41, 58], [42, 58], [43, 58], [22, 59], [32, 59], [33, 59], [34, 59], [35, 59], [36, 59], [37, 59], [38, 59], [22, 60], [33, 60], [34, 60], [35, 60], [36, 60], [37, 60], [38, 60], [42, 60], [22, 61], [23, 61], [33, 61], [34, 61], [35, 61], [36, 61], [37, 61], [38, 61], [39, 61], [42, 61], [33, 62], [34, 62], [35, 62], [36, 62], [37, 62], [38, 62], [39, 62], [17, 63], [35, 63], [36, 63], [37, 63], [38, 63], [39, 63], [38, 64], [39, 64], [12, 67], [13, 67]]; const PH_COLS = 44, PH_ROWS = 68;
    const PH_PIN = [17, 25]; // ≈ Pampanga (Central Luzon)
    const geoCanvas = $('#geoMap'), geoWrap = $('.geo-map-wrap'), geoLabel = $('#geoPinLabel');
    const gctx = geoCanvas.getContext('2d');
    let gW = 0, gH = 0, gCell = 0, gOffX = 0, gOffY = 0, gDpr = 1;
    let gMx = -9999, gMy = -9999, geoRunning = false, gT = 0;

    function sizeGeo() {
        const w = geoWrap.clientWidth - 0;
        const maxH = 440;
        gCell = Math.min(w / PH_COLS, maxH / PH_ROWS);
        gW = PH_COLS * gCell; gH = PH_ROWS * gCell;
        gDpr = Math.min(window.devicePixelRatio || 1, 2);
        geoCanvas.width = Math.round(w * gDpr);
        geoCanvas.height = Math.round(gH * gDpr);
        geoCanvas.style.height = gH + 'px';
        gOffX = (w - gW) / 2; gOffY = 0;
        positionPin();
    }
    function dotXY(c, r) { return [gOffX + (c + 0.5) * gCell, gOffY + (r + 0.5) * gCell]; }
    function positionPin() {
        const [px, py] = dotXY(PH_PIN[0], PH_PIN[1]);
        const wrapRect = geoWrap.getBoundingClientRect();
        const canRect = geoCanvas.getBoundingClientRect();
        geoLabel.style.left = (canRect.left - wrapRect.left + px) + 'px';
        geoLabel.style.top = (canRect.top - wrapRect.top + py) + 'px';
    }
    function drawGeo() {
        if (!geoRunning) return;
        gT += 0.03;
        gctx.setTransform(gDpr, 0, 0, gDpr, 0, 0);
        gctx.clearRect(0, 0, geoCanvas.width, geoCanvas.height);
        const dim = getComputedStyle(html).getPropertyValue('--text-dim').trim() || '#888';
        const base = Math.max(1.1, gCell * 0.3);
        for (const [cIdx, rIdx] of PH_DOTS) {
            const [x, y] = dotXY(cIdx, rIdx);
            const d = Math.hypot(x - gMx, y - gMy);
            const t = Math.max(0, 1 - d / 70); // hover proximity boost
            const r = base * (1 + t * 1.2);
            if (t > 0.04) { gctx.fillStyle = accentCss; gctx.globalAlpha = 0.35 + t * 0.65; }
            else { gctx.fillStyle = dim; gctx.globalAlpha = 0.55; }
            gctx.beginPath(); gctx.arc(x, y, r, 0, Math.PI * 2); gctx.fill();
        }
        // Pampanga pin: pulsing accent dot + ring
        const [px, py] = dotXY(PH_PIN[0], PH_PIN[1]);
        const pulse = (Math.sin(gT * 2) + 1) / 2;
        gctx.globalAlpha = 0.25 * (1 - pulse);
        gctx.beginPath(); gctx.arc(px, py, base * (2.6 + pulse * 3.8), 0, Math.PI * 2);
        gctx.strokeStyle = accentCss; gctx.lineWidth = 1.4; gctx.stroke();
        gctx.globalAlpha = 1;
        gctx.fillStyle = accentCss;
        gctx.beginPath(); gctx.arc(px, py, base * 1.9, 0, Math.PI * 2); gctx.fill();
        gctx.globalAlpha = 1;
        requestAnimationFrame(drawGeo);
    }
    const geoTip = $('#geoTip');
    function phRegion(c, rr) {
        // The Philippines is divided into three island groups. Classify by grid row so
        // every dot resolves correctly. Palawan (the SW diagonal chain) belongs to the
        // Luzon island group under the standard three-way division.
        if (rr <= 35) return 'Luzon';       // Luzon + Mindoro/Palawan/Bicol
        if (rr <= 52) return 'Visayas';     // central island cluster
        return 'Mindanao';                  // southern island group
    }
    geoCanvas.addEventListener('pointermove', e => {
        const r = geoCanvas.getBoundingClientRect();
        gMx = e.clientX - r.left; gMy = e.clientY - r.top;
        // Region tooltip: show island-group info near any dot
        let nearest = 1e9, nearCol = 0, nearRow = 0;
        for (const [cIdx, rIdx] of PH_DOTS) {
            const [x, y] = dotXY(cIdx, rIdx);
            const d = Math.hypot(x - gMx, y - gMy);
            if (d < nearest) { nearest = d; nearCol = cIdx; nearRow = rIdx; }
        }
        const [ppx, ppy] = dotXY(PH_PIN[0], PH_PIN[1]);
        const nearPin = Math.hypot(ppx - gMx, ppy - gMy) < 30;
        if (nearest < 26 && !nearPin) {
            geoTip.hidden = false;
            geoTip.textContent = phRegion(nearCol, nearRow);
            geoTip.style.left = (e.clientX - r.left) + 'px';
            geoTip.style.top = (e.clientY - r.top) + 'px';
        } else geoTip.hidden = true;
    });
    geoCanvas.addEventListener('pointerleave', () => { gMx = gMy = -9999; geoTip.hidden = true; });
    const geoObserver = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (en.isIntersecting) {
                if (!geoRunning) { geoRunning = true; sizeGeo(); refreshAccentCss(); requestAnimationFrame(drawGeo); }
                setTimeout(() => geoLabel.classList.add('show'), 500);
            } else { geoRunning = false; }
        });
    }, { threshold: 0.25 });
    geoObserver.observe($('#geoCard'));
    window.addEventListener('resize', () => { if (geoRunning) sizeGeo(); });

    /* ===================== KNOWLEDGE BASE (chatbot + search) ===================== */
    const KB = {
        who: "Junica is a BS Information Technology student at Pampanga State University who works right at the intersection of business analysis and UI/UX design. In short: she turns messy user needs into clear requirements, tidy documentation, and structured backlogs — and then brings those ideas to life as wireframes and prototypes in Figma and Webflow. She's collaborative by default and loves working closely with dev, design, and product teams.",
        skills: "She covers a lot of ground! Her core skills are UI/UX Design, Business Analysis, Requirements Documentation, Backlog & Product Docs, Competitive & Feature Research, Web & Layout Design, Visual Content Creation, Web Development (HTML, CSS, and JavaScript), and QA Testing. Day to day she reaches for Figma, Canva, Photoshop, Illustrator, Webflow, MySQL, VS Code, Vercel, Supabase, ClickUp, Microsoft Office, and Google Workspace.",
        experience: "Right now she's a Business Analyst Intern at Twala (Ohelio Inc.), where she manages backlogs in ClickUp, writes product documentation, and prepares competitor comparison research. Before that she was a UI/UX Designer at Twala, led the UI/UX team at the PSITE-RAITE hackathon, and she's also a Layout Editor for COMPRESS, the PSU CCS newsletter.",
        projects: "A few favorites: Signor, her capstone — a blockchain + AI document management platform with a live site; Vertify, a fact-checking app on Base (also live); her ongoing Business Analysis work for Twala & Doxu AI; plus Remindr, MoodMenu, Golden Pups, and ClassIQ. Click any project card to open the full case study — some even have a narrated walkthrough!",
        certifications: "She holds seven certifications: Business Analysis Fundamentals (IIBA Endorsed, Udemy), two Project Management courses (Udemy & SimpliLearn), Business Analysis Basics (SimpliLearn), AI Learning Modules (AIClassASEAN.org), a UI/UX Design Certificate (Udemy), and Cloud Computing Fundamentals (IBM SkillsBuild). Ongoing learning is very much her thing.",
        tools: "Her everyday toolkit: Figma, Canva, Adobe Photoshop, Adobe Illustrator, Webflow, MySQL, Visual Studio Code, ClickUp, Microsoft Office, and Google Workspace.",
        education: "She's currently taking BS Information Technology at Pampanga State University (2022–present). Before that: Senior High (General Academic Strand) and Junior High (ICT Strand) at San Simon High School — with honors in both.",
        location: "She's based in San Simon, Pampanga, Philippines — you can spot it highlighted on the dotted map in the About section!",
        contact: "The easiest ways to reach her: email junicamarsenjemguiao@gmail.com, call +63 967-034-9038, or connect on LinkedIn (junicamarsenjem-guiao). There's also a Send a Message form at the bottom of this page — it goes straight to her inbox.",
        availability: "Yes — she's open to opportunities! Specifically Junior Business Analyst, UI/UX Designer, internships, and freelance collaborations. Feel free to send her a message.",
        honors: "She's earned quite a few: Top 10 and Top 25 Awardee in the CCS Department, President's Lister, Dean's Lister, and With Honors in both Senior and Junior High School.",
        linkedin: "Here you go: https://www.linkedin.com/in/junicamarsenjem-guiao — she'd love to connect.",
        greeting: "Hi there! 👋 I'm Junica's chatbot. Happy to tell you about her background, skills, projects, certifications, or how to get in touch — what would you like to know?",
        fallback: "Hmm, I don't have that one in my notes yet! I'm best with questions about Junica's skills, projects, experience, certifications, education, or contact details. Want to try one of those?"
    };
    const INTENTS = [
        { k: 'greeting', w: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'kumusta', 'kamusta', 'magandang'] },
        { k: 'who', w: ['who is', 'tell me about', 'about junica', 'background', 'introduce', 'summary', 'sino si', 'sino ba', 'kilala'] },
        { k: 'skills', w: ['skill', 'good at', 'strength', 'capable', 'expertise', 'do you do', 'can she do', 'kasanayan', 'magaling', 'kaya niya'] },
        { k: 'tools', w: ['tool', 'software', 'figma', 'webflow', 'canva', 'adobe', 'clickup', 'mysql', 'stack'] },
        { k: 'experience', w: ['experience', 'work', 'job', 'internship', 'twala', 'career', 'intern', 'compress', 'karanasan', 'trabaho', 'pinagtrabahuhan'] },
        { k: 'projects', w: ['project', 'signor', 'vertify', 'remindr', 'classiq', 'moodmenu', 'golden pups', 'built', 'case study', 'portfolio piece', 'work on', 'proyekto', 'ginawa', 'mga gawa'] },
        { k: 'certifications', w: ['certification', 'certificate', 'course', 'iiba', 'certified', 'training'] },
        { k: 'education', w: ['education', 'school', 'university', 'degree', 'study', 'studying', 'college', 'course of', 'pinag-aralan', 'paaralan', 'eskwela', 'nag-aaral'] },
        { k: 'location', w: ['location', 'based', 'live', 'address', 'where', 'from', 'saan', 'taga saan', 'nakatira'] },
        { k: 'contact', w: ['contact', 'email', 'phone', 'reach', 'call', 'number', 'get in touch', 'message', 'kontak', 'makipag-ugnayan', 'tawagan', 'numero'] },
        { k: 'availability', w: ['available', 'availability', 'hire', 'hiring', 'open to', 'freelance', 'roles', 'bakante', 'tumatanggap', 'pwede ba siya'] },
        { k: 'honors', w: ['honor', 'award', 'achievement', 'lister', 'top 10', 'recognition'] },
        { k: 'linkedin', w: ['linkedin'] },
    ];
    const KB_TL = {
        greeting: "Kumusta! \ud83d\udc4b Ako ang chatbot ni Junica. Pwede mo akong tanungin tungkol sa kanyang background, skills, projects, certifications, o kung paano siya makontak \u2014 ano ang gusto mong malaman?",
        fallback: "Pasensya na, wala pa ako niyan sa portfolio ni Junica. Subukan mong itanong ang kanyang skills, projects, karanasan, certifications, o kung paano siya makontak.",
        who: "Si Junica ay isang BS Information Technology student sa Pampanga State University na nagtatrabaho sa pagitan ng business analysis at UI/UX design. Inaalam niya kung ano talaga ang kailangan ng users, ginagawa niyang malinaw na requirements at backlog, at dinidisenyo niya ang wireframes at prototypes sa Figma at Webflow. Sa kasalukuyan, siya ay Business Analyst Intern sa Twala.",
        skills: "Pinakamalakas siya sa UI/UX design, business analysis, requirements documentation, at backlog management. Marunong din siya sa research, web at layout design, visual content, frontend (HTML, CSS, JavaScript), at QA testing. Mga gamit niya araw-araw: Figma, Webflow, Canva, Photoshop, Illustrator, ClickUp, MySQL, at VS Code.",
        projects: "Ilan sa mga highlight: Signor, ang kanyang capstone \u2014 isang blockchain + AI document management platform na live na sa web; Vertify, isang fact-checking app mula sa PSITE-RAITE hackathon; ang kanyang BA work para sa Twala at Doxu AI; pati na rin ang Remindr, MoodMenu, Golden Pups, at ClassIQ. I-click ang kahit anong project card para sa buong case study.",
        contact: "Pinakamadali ang email: junicamarsenjemguiao@gmail.com. Pwede ka ring tumawag sa +63 967-034-9038, kumonekta sa LinkedIn (junicamarsenjem-guiao), o gamitin ang Send a Message form sa Contact section.",
        location: "Nakatira siya sa San Simon, Pampanga, Philippines \u2014 makikita mo ang eksaktong lugar sa mapa sa About section.",
        availability: "Bukas siya sa mga oportunidad ngayon \u2014 junior Business Analyst, UI/UX Designer, internships, at freelance na collaboration. Ang contact form ang pinakamabilis na paraan para maabot siya."
    };
    const TL_RX = /\b(ano|sino|saan|paano|kumusta|kamusta|mga|po|ba|ito|iyan|salamat|proyekto|kasanayan|karanasan|magandang|pwede|puwede|nakatira|taga|niya|siya|kayo)\b/i;
    const isTagalog = t => TL_RX.test(t);
    function matchIntent(text) {
        const l = text.toLowerCase();
        let best = null, score = 0;
        for (const it of INTENTS) {
            const s = it.w.reduce((acc, w) => acc + (l.includes(w) ? w.length : 0), 0);
            if (s > score) { score = s; best = it.k; }
        }
        return best || 'fallback';
    }

    /* ===================== COMMAND PALETTE / AI SEARCH ===================== */
    const SEARCH_INDEX = [
        { g: 'Sections', t: 'About', s: 'Business analysis meets UX', ico: '01', target: '#about' },
        { g: 'Sections', t: 'Skills & Tools', s: 'Core skills and software', ico: '02', target: '#skills' },
        { g: 'Sections', t: 'Experience', s: 'Work history and timeline', ico: '03', target: '#experience' },
        { g: 'Sections', t: 'Projects', s: 'Selected case studies', ico: '04', target: '#projects' },
        { g: 'Sections', t: 'Certifications', s: 'Certifications and honors', ico: '05', target: '#certifications' },
        { g: 'Sections', t: 'Contact', s: 'Email, phone, socials', ico: '06', target: '#contact' },
        ...PROJECTS.map(p => ({ g: 'Projects', t: p.title, s: p.role, ico: '▸', project: p.key, keywords: p.techs.join(' ') + ' ' + p.type })),
        ...CORE_SKILLS.map(s => ({ g: 'Skills', t: s.t, s: s.d, ico: '✦', target: '#skills' })),
        ...CERTS.map(c => ({ g: 'Certifications', t: c.t, s: c.issuer + ' · ' + c.y, ico: '✓', target: '#certifications' })),
        { g: 'Actions', t: 'Open Digital Business Card', s: 'Save contact, QR, vCard', ico: '⊞', action: 'card' },
        { g: 'Actions', t: 'View CV', s: 'Preview and download PDF', ico: '⤓', action: 'cv' },
        { g: 'Actions', t: 'Edit Preferences', s: 'Themes, grid, sounds', ico: '◐', action: 'appearance' },
        { g: 'Actions', t: 'Community Space', s: 'Walk the office & chat', ico: '⚑', action: 'community' },
        { g: 'Actions', t: 'Quests', s: 'Visitor quests & rewards', ico: '★', action: 'quest' },
        { g: 'Actions', t: 'Gallery', s: 'Hackathon & design showcase photos', ico: '▣', action: 'gallery' },
        { g: 'Actions', t: 'Start Website Tour', s: 'Guided walk-through', ico: '➤', action: 'tour' },
        { g: 'Actions', t: 'Email Junica', s: 'junicamarsenjemguiao@gmail.com', ico: '✉', action: 'email' },
        { g: 'Actions', t: 'LinkedIn', s: 'junicamarsenjem-guiao', ico: 'in', action: 'linkedin' },
    ];
    const cmdkOverlay = $('#cmdkOverlay'), cmdkInput = $('#cmdkInput'), cmdkResults = $('#cmdkResults');
    let cmdkActive = 0, cmdkList = [];

    function openCmdk() {
        cmdkOverlay.classList.add('open'); cmdkOverlay.setAttribute('aria-hidden', 'false');
        cmdkInput.value = ''; renderCmdk(''); setTimeout(() => cmdkInput.focus(), 40);
    }
    function closeCmdk() { cmdkOverlay.classList.remove('open'); cmdkOverlay.setAttribute('aria-hidden', 'true'); }
    function renderCmdk(q) {
        q = q.trim().toLowerCase();
        const filtered = SEARCH_INDEX.filter(it =>
            !q || (it.t + ' ' + it.s + ' ' + (it.keywords || '') + ' ' + it.g).toLowerCase().includes(q));
        cmdkList = filtered; cmdkActive = 0;
        if (!filtered.length) { cmdkResults.innerHTML = `<div class="cmdk-empty">No matches for “${q}”. Try “projects”, “Figma”, “contact”, or “certifications”.</div>`; return; }
        const groups = {};
        filtered.forEach(it => { (groups[it.g] = groups[it.g] || []).push(it); });
        let out = '', idx = 0;
        for (const g in groups) {
            out += `<div class="cmdk-group-label">${g}</div>`;
            groups[g].forEach(it => {
                out += `<div class="cmdk-item${idx === 0 ? ' active' : ''}" data-idx="${idx}"><span class="cmdk-item-ico">${it.ico}</span><span class="cmdk-item-body"><span class="cmdk-item-title">${it.t}</span><span class="cmdk-item-sub">${it.s}</span></span></div>`;
                it._idx = idx; idx++;
            });
        }
        cmdkResults.innerHTML = out;
        $$('.cmdk-item', cmdkResults).forEach(el => {
            el.addEventListener('click', () => runCmdk(cmdkList[+el.dataset.idx]));
            el.addEventListener('mousemove', () => setCmdkActive(+el.dataset.idx));
        });
    }
    function setCmdkActive(i) {
        cmdkActive = i;
        $$('.cmdk-item', cmdkResults).forEach(el => el.classList.toggle('active', +el.dataset.idx === i));
    }
    function runCmdk(it) {
        if (!it) return; closeCmdk();
        if (it.project) { openProjectModal(it.project); return; }
        if (it.action) {
            if (it.action === 'card') openCard();
            else if (it.action === 'cv') openCV();
            else if (it.action === 'appearance') openPanel(appPanel);
            else if (it.action === 'quest') { openPanel(achPanel); sfx('pop'); }
            else if (it.action === 'gallery') openGallery();
            else if (it.action === 'community') openCommunity();
            else if (it.action === 'tour') setTimeout(startTour, 150);
            else if (it.action === 'email') location.href = 'mailto:junicamarsenjemguiao@gmail.com';
            else if (it.action === 'linkedin') window.open('https://www.linkedin.com/in/junicamarsenjem-guiao', '_blank');
            return;
        }
        if (it.target) { const t = $(it.target); if (t) t.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }); }
    }
    cmdkInput.addEventListener('input', () => renderCmdk(cmdkInput.value));
    cmdkInput.addEventListener('keydown', e => {
        if (e.key === 'ArrowDown') { e.preventDefault(); setCmdkActive(Math.min(cmdkActive + 1, cmdkList.length - 1)); scrollActive(); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); setCmdkActive(Math.max(cmdkActive - 1, 0)); scrollActive(); }
        else if (e.key === 'Enter') { e.preventDefault(); runCmdk(cmdkList[cmdkActive]); }
    });
    function scrollActive() { const el = $(`.cmdk-item[data-idx="${cmdkActive}"]`, cmdkResults); if (el) el.scrollIntoView({ block: 'nearest' }); }
    $('#searchTrigger')?.addEventListener('click', openCmdk);
    cmdkOverlay.addEventListener('click', e => { if (e.target === cmdkOverlay) closeCmdk(); });

    /* ===================== CHATBOT ===================== */
    const chatbotToggle = $('#chatbotToggle'), chatbotPanel = $('#chatbotPanel'), chatbotClose = $('#chatbotClose');
    const chatbotMessages = $('#chatbotMessages'), chatbotForm = $('#chatbotForm'), chatbotInput = $('#chatbotInput'), chatbotQuick = $('#chatbotQuick');

    function linkify(t) {
        return t.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>')
            .replace(/([\w.+-]+@[\w-]+\.[\w.-]+)/g, '<a href="mailto:$1">$1</a>');
    }
    function addMessage(text, sender, chips) {
        const msg = document.createElement('div');
        msg.className = `chat-msg ${sender}`;
        msg.innerHTML = sender === 'bot' ? linkify(text) : text.replace(/</g, '&lt;');
        if (chips && chips.length) {
            const wrap = document.createElement('div'); wrap.className = 'chat-chips';
            chips.forEach(c => { const b = document.createElement('button'); b.textContent = c; b.addEventListener('click', () => handleUserText(c)); wrap.appendChild(b); });
            msg.appendChild(wrap);
        }
        chatbotMessages.appendChild(msg);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        return msg;
    }
    function showTyping() {
        const t = document.createElement('div'); t.className = 'typing'; t.innerHTML = '<span></span><span></span><span></span>';
        chatbotMessages.appendChild(t); chatbotMessages.scrollTop = chatbotMessages.scrollHeight; return t;
    }
    function botReply(intent, tl) {
        const t = showTyping();
        return new Promise(res => {
            setTimeout(() => {
                t.remove();
                const answer = (tl && KB_TL[intent]) || KB[intent] || (tl ? KB_TL.fallback : KB.fallback);
                addMessage(answer, 'bot', intent === 'greeting' || intent === 'fallback'
                    ? ['Skills', 'Projects', 'Certifications', 'Contact'] : null);
                if (ttsOn) speak(answer);
                res(answer);
            }, reduceMotion ? 120 : 620);
        });
    }
    function handleUserText(text) {
        addMessage(text, 'user');
        return botReply(matchIntent(text), isTagalog(text));
    }
    let chatStarted = false;
    function openChat() {
        chatbotPanel.classList.add('open'); chatbotPanel.setAttribute('aria-hidden', 'false');
        chatbotToggle.setAttribute('aria-expanded', 'true');
        if (!chatStarted) { addMessage(KB.greeting, 'bot', ['Who is Junica?', 'Skills', 'Projects', 'Contact']); chatStarted = true; }
        chatbotInput.focus();
    }
    function closeChat() { chatbotPanel.classList.remove('open'); chatbotPanel.setAttribute('aria-hidden', 'true'); chatbotToggle.setAttribute('aria-expanded', 'false'); stopDictation(); stopChatVoice(); if (synth) synth.cancel(); }
    chatbotToggle.addEventListener('click', () => { sfx('pop'); chatbotPanel.classList.contains('open') ? closeChat() : openChat(); });
    chatbotClose.addEventListener('click', closeChat);
    chatbotQuick.addEventListener('click', e => { const b = e.target.closest('button[data-q]'); if (b) handleUserText(b.dataset.q); });
    chatbotForm.addEventListener('submit', e => {
        e.preventDefault();
        const v = chatbotInput.value.trim(); if (!v) return;
        chatbotInput.value = ''; handleUserText(v);
    });

    /* ===================== VOICE: dictation everywhere + spoken replies ===================== */
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const synth = window.speechSynthesis;
    let ttsOn = store.get('tts', false);
    const ttsBtn = $('#ttsToggle');
    function syncTts() {
        ttsBtn.classList.toggle('on', ttsOn);
        ttsBtn.setAttribute('aria-pressed', String(ttsOn));
        ttsBtn.style.color = ttsOn ? 'var(--accent)' : '';
        ttsBtn.title = ttsOn ? 'Spoken replies: on' : 'Read replies aloud';
    }
    ttsBtn.addEventListener('click', () => {
        ttsOn = !ttsOn; store.set('tts', ttsOn); syncTts(); sfx('click');
        if (!ttsOn && synth) synth.cancel();
        else if (ttsOn) speak('Spoken replies are on.');
    });
    syncTts();

    function speak(text) {
        if (!synth) return;
        synth.cancel();
        const u = new SpeechSynthesisUtterance(text.replace(/https?:\/\/[^\s]+/g, 'the link in the portfolio'));
        u.rate = 1.02; u.pitch = 1.05;
        synth.speak(u);
    }

    // One dictation session at a time, wired to any .mic-btn[data-dictate]
    let activeRec = null, activeMicBtn = null;
    function stopDictation() {
        if (activeRec) { try { activeRec.stop(); } catch { } activeRec = null; }
        if (activeMicBtn) { activeMicBtn.classList.remove('listening'); activeMicBtn = null; }
    }
    function startDictation(btn) {
        const input = document.getElementById(btn.dataset.dictate);
        if (!input) return;
        if (!SR) { input.placeholder = 'Voice search needs Chrome or Edge'; return; }
        if (activeMicBtn === btn) { stopDictation(); return; }
        stopDictation();
        const rec = new SR();
        rec.lang = 'en-US'; rec.interimResults = true; rec.continuous = false;
        activeRec = rec; activeMicBtn = btn; btn.classList.add('listening');
        rec.onresult = e => {
            let txt = '';
            for (let i = 0; i < e.results.length; i++) txt += e.results[i][0].transcript;
            input.value = txt;
            input.dispatchEvent(new Event('input', { bubbles: true }));
            if (e.results[e.results.length - 1].isFinal) {
                stopDictation();
                const formId = btn.dataset.submit;
                if (formId) { const f = document.getElementById(formId); if (f) f.requestSubmit(); }
                else input.focus();
            }
        };
        rec.onerror = stopDictation;
        rec.onend = () => { if (activeRec === rec) stopDictation(); };
        try { rec.start(); sfx('pop'); } catch { stopDictation(); }
    }
    $$('.mic-btn[data-dictate]').forEach(b => { if (b.id !== 'chatMic') b.addEventListener('click', () => startDictation(b)); });

    /* Chatbot voice input — live transcript in the input field (classic UX),
       with 2026 niceties: auto-send toggle + EN/Filipino recognition language. */
    const voiceBar = $('#voiceBar'), vbState = $('#vbState'), vbAuto = $('#vbAuto'), vbLang = $('#vbLang');
    const chatMicBtn = $('#chatMic');
    let chatRec = null;
    function syncVoicePills() {
        vbAuto.classList.toggle('on', !!state.voiceAuto);
        vbAuto.setAttribute('aria-pressed', String(!!state.voiceAuto));
        vbAuto.textContent = state.voiceAuto ? 'Auto-send on' : 'Auto-send off';
        vbLang.textContent = state.voiceLang === 'fil-PH' ? 'FIL' : 'EN';
    }
    function stopChatVoice(finalize) {
        const rec = chatRec; chatRec = null;
        if (rec) { try { rec.stop(); } catch { } }
        voiceBar.hidden = true;
        chatbotPanel.classList.remove('listening');
        chatMicBtn.classList.remove('listening');
        const inp = $('#chatbotInput');
        if (finalize === 'send') {
            const t = inp.value.trim();
            if (t) { inp.value = ''; handleUserText(t); }
        } else if (finalize === 'edit') {
            inp.focus();
        }
    }
    function startChatVoice() {
        const inp = $('#chatbotInput');
        if (!SR) { inp.placeholder = 'Voice input needs Chrome or Edge'; return; }
        if (chatRec) { stopChatVoice(state.voiceAuto ? 'send' : 'edit'); return; }
        stopDictation();
        voiceBar.hidden = false; syncVoicePills();
        chatbotPanel.classList.add('listening');
        chatMicBtn.classList.add('listening');
        vbState.textContent = 'Listening\u2026 speak now';
        inp.value = '';
        sfx('pop');
        const rec = new SR(); chatRec = rec;
        rec.lang = state.voiceLang; rec.interimResults = true; rec.continuous = true;
        rec.onresult = ev => {
            let txt = '';
            for (let k = 0; k < ev.results.length; k++) txt += ev.results[k][0].transcript;
            inp.value = txt; // live transcript, fully editable
            vbState.textContent = 'Listening\u2026 tap Stop when done';
            if (state.voiceAuto) {
                clearTimeout(rec._sendT);
                // Wait for a natural pause so pauses/"umm" don't trigger a premature send
                rec._sendT = setTimeout(() => { if (chatRec === rec) { stopChatVoice('send'); sfx('click'); } }, 1400);
            }
        };
        rec.onerror = () => { if (chatRec === rec) { vbState.textContent = 'Mic unavailable \u2014 you can type instead.'; } };
        rec.onend = () => {
            if (chatRec === rec) stopChatVoice(state.voiceAuto ? 'send' : 'edit');
        };
        try { rec.start(); } catch { stopChatVoice(); }
    }
    chatMicBtn.addEventListener('click', e => { e.preventDefault(); startChatVoice(); });
    $('#vbStop').addEventListener('click', () => stopChatVoice(state.voiceAuto ? 'send' : 'edit'));
    vbAuto.addEventListener('click', () => {
        state.voiceAuto = !state.voiceAuto; store.set('voiceAuto', state.voiceAuto); syncVoicePills(); sfx('click');
    });
    vbLang.addEventListener('click', () => {
        state.voiceLang = state.voiceLang === 'fil-PH' ? 'en-US' : 'fil-PH';
        store.set('voiceLang', state.voiceLang); syncVoicePills(); sfx('click');
        if (chatRec) { const wasAuto = state.voiceAuto; state.voiceAuto = false; stopChatVoice(); state.voiceAuto = wasAuto; startChatVoice(); }
    });

    /* ===================== DIGITAL BUSINESS CARD ===================== */
    const cardModal = $('#cardModal');
    let qrBuilt = false;
    function openCard() {
        lastFocused = document.activeElement;
        cardModal.classList.add('open'); cardModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if (!qrBuilt && window.QRCode) {
            try {
                new QRCode($('#cardQr'), { text: location.href, width: 128, height: 128, colorDark: '#111', colorLight: '#ffffff', correctLevel: QRCode.CorrectLevel.M });
                qrBuilt = true;
            } catch { }
        }
        $('#cardClose').focus(); sfx('pop');
    }
    function closeCard() { cardModal.classList.remove('open'); cardModal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; if (lastFocused) lastFocused.focus(); }
    $('#cardBtnHero')?.addEventListener('click', openCard);
    $('#cardBtnContact')?.addEventListener('click', openCard);
    $('#cardClose').addEventListener('click', closeCard);
    $('#cardGetInTouch')?.addEventListener('click', () => {
        closeCard();
        setTimeout(() => {
            const t = $('#contactForm');
            if (t) t.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
        }, 60);
    });
    cardModal.addEventListener('click', e => { if (e.target === cardModal) closeCard(); });

    async function copyText(text, el) {
        try {
            if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
            else { const t = document.createElement('textarea'); t.value = text; t.style.position = 'fixed'; t.style.opacity = '0'; document.body.appendChild(t); t.select(); document.execCommand('copy'); document.body.removeChild(t); }
            if (el) { el.classList.add('copied'); setTimeout(() => el.classList.remove('copied'), 1400); }
            sfx('click');
            return true;
        } catch { return false; }
    }
    $$('.vcard-row.copy').forEach(row => row.addEventListener('click', () => copyText(row.dataset.copy, row)));

    $('#downloadVcard').addEventListener('click', () => {
        const vcf = [
            'BEGIN:VCARD', 'VERSION:3.0',
            'N:Guiao;Junica Marsen Jem;;;', 'FN:Junica Marsen Jem Guiao',
            'TITLE:Business Analyst & UI/UX Designer',
            'EMAIL;TYPE=INTERNET:junicamarsenjemguiao@gmail.com',
            'TEL;TYPE=CELL:+639670349038',
            'ADR;TYPE=HOME:;;San Jose;San Simon, Pampanga;;;Philippines',
            'URL:' + location.href,
            'X-SOCIALPROFILE;TYPE=linkedin:https://www.linkedin.com/in/junicamarsenjem-guiao',
            'X-SOCIALPROFILE;TYPE=facebook:https://www.facebook.com/nicajem',
            'END:VCARD'
        ].join('\r\n');
        const blob = new Blob([vcf], { type: 'text/vcard' });
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
        a.download = 'Junica-Guiao.vcf'; a.click(); URL.revokeObjectURL(a.href);
        sfx('click');
    });
    $('#shareCard').addEventListener('click', async () => {
        const data = { title: 'Junica Marsen Jem Guiao', text: 'Business Analyst & UI/UX Designer — portfolio', url: location.href };
        if (navigator.share) { try { await navigator.share(data); } catch { } }
        else { const ok = await copyText(location.href); const b = $('#shareCard'); b.textContent = ok ? 'Link copied!' : 'Copy failed'; setTimeout(() => b.textContent = 'Share', 1600); }
    });

    /* ===================== GALLERY ===================== */
    const GALLERY = [
        { src: 'assets/gallery-1.jpg', cap: 'Signor — live platform homepage' },
        { src: 'assets/gallery-2.jpg', cap: 'Signor — account creation flow' },
        { src: 'assets/gallery-3.jpg', cap: 'Capstone team presenting Signor' },
        { src: 'assets/gallery-4.jpg', cap: 'PSITE-RAITE hackathon — team & mentors' },
        { src: 'assets/gallery-5.jpg', cap: 'Hackathon build in progress' },
        { src: 'assets/gallery-6.jpg', cap: 'Design showcase' },
    ];
    const galleryModal = $('#galleryModal'), galleryGrid = $('#galleryGrid');
    galleryGrid.innerHTML = GALLERY.map(g =>
        `<figure><img src="${g.src}" alt="${g.cap}" loading="lazy"><figcaption>${g.cap}</figcaption></figure>`).join('');
    $$('figure', galleryGrid).forEach((f, i) => f.addEventListener('click', () => openLightbox(GALLERY[i].src, GALLERY[i].cap)));
    function openGallery() {
        lastFocused = document.activeElement;
        galleryModal.classList.add('open'); galleryModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; $('#galleryClose').focus(); sfx('pop');
    }
    function closeGallery() { galleryModal.classList.remove('open'); galleryModal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; if (lastFocused) lastFocused.focus(); }
    $('#galleryBtn')?.addEventListener('click', openGallery);
    $('#galleryClose').addEventListener('click', closeGallery);
    galleryModal.addEventListener('click', e => { if (e.target === galleryModal) closeGallery(); });

    /* ===================== CV MODAL (password-protected) ===================== */
    const cvModal = $('#cvModal');
    const cvLock = $('#cvLock'), cvContent = $('#cvContent'), cvForm = $('#cvLockForm'), cvPass = $('#cvPass'), cvErr = $('#cvLockError');
    const CV_KEY = 'TmljYWplbTEwMTY=';
    let cvUnlocked = false;
    try { cvUnlocked = sessionStorage.getItem('jmj_cv') === '1'; } catch { }
    function syncCvView() {
        cvLock.hidden = cvUnlocked;
        cvContent.hidden = !cvUnlocked;
    }
    cvForm.addEventListener('submit', e => {
        e.preventDefault();
        let ok = false;
        try { ok = cvPass.value === atob(CV_KEY); } catch { }
        if (ok) {
            cvUnlocked = true;
            try { sessionStorage.setItem('jmj_cv', '1'); } catch { }
            cvErr.hidden = true; cvPass.value = '';
            syncCvView(); sfx('unlock');
        } else {
            cvErr.hidden = false;
            cvLock.classList.remove('shake'); void cvLock.offsetWidth; cvLock.classList.add('shake');
            sfx('deny');
            cvPass.select();
        }
    });
    function openCV() {
        lastFocused = document.activeElement; syncCvView();
        cvModal.classList.add('open'); cvModal.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
        (cvUnlocked ? $('#cvClose') : cvPass).focus(); sfx('pop');
    }
    function closeCV() { cvModal.classList.remove('open'); cvModal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; if (lastFocused) lastFocused.focus(); }
    $('#cvBtnContact')?.addEventListener('click', openCV);
    $('#cvClose').addEventListener('click', closeCV);
    cvModal.addEventListener('click', e => { if (e.target === cvModal) closeCV(); });

    /* ===================== CONTACT FORM (Formspree) ===================== */
    const cForm = $('#contactForm');
    if (cForm) {
        const note = $('#formNote'), sendBtn = $('#cfSend');
        const fields = { name: $('#cfName'), email: $('#cfEmail'), message: $('#cfMessage') };
        const setInvalid = (el, on) => el.closest('.f-field').classList.toggle('invalid', on);
        let sending = false;
        cForm.addEventListener('submit', async e => {
            e.preventDefault();
            if (sending) return;
            const name = fields.name.value.trim(), email = fields.email.value.trim(), message = fields.message.value.trim();
            const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            setInvalid(fields.name, !name);
            setInvalid(fields.email, !emailOk);
            setInvalid(fields.message, message.length < 10);
            note.className = 'form-note';
            if (!name || !emailOk) { note.classList.add('err'); note.textContent = 'Please fill in your name and a valid email address.'; sfx('deny'); return; }
            if (message.length < 10) { note.classList.add('err'); note.textContent = 'A few more words, please (10+ characters).'; sfx('deny'); return; }
            sending = true; sendBtn.disabled = true;
            const orig = sendBtn.textContent; sendBtn.textContent = 'Sending…';
            note.textContent = '';
            try {
                const res = await fetch('https://formspree.io/f/mkodwjpw', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({ name, email, message })
                });
                if (res.ok) {
                    cForm.reset();
                    note.classList.add('ok');
                    note.textContent = `Thank you, ${name.split(' ')[0]} — your message is on its way! I'll get back to you as soon as I can.`;
                    sfx('unlock');
                } else {
                    throw new Error('bad status');
                }
            } catch {
                note.classList.add('err');
                note.textContent = "Something went wrong and your message wasn't sent. Please try again in a moment, or email me directly at junicamarsenjemguiao@gmail.com.";
                sfx('deny');
            } finally {
                sending = false; sendBtn.disabled = false; sendBtn.textContent = orig;
            }
        });
    }
    // Copy actions in contact rows
    $$('.c-act[data-copy-val]').forEach(btn => btn.addEventListener('click', async () => {
        const ok = await copyText(btn.dataset.copyVal, null);
        const orig = btn.textContent;
        btn.textContent = ok ? 'Copied!' : 'Failed';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 1500);
    }));

    /* ===================== VISITOR COUNT + SESSION ===================== */
    (function () {
        const numEl = $('#visitorNum');
        fetch('https://abacus.jasoncameron.dev/hit/jmj-guiao-portfolio/site-visits')
            .then(r => r.ok ? r.json() : null)
            .then(d => {
                if (d && typeof d.value === 'number') {
                    numEl.textContent = d.value.toLocaleString();
                    const dw = $('#dwVisitors'); if (dw) dw.textContent = d.value.toLocaleString();
                }
            })
            .catch(() => { });
        const t0 = Date.now(), sess = $('#sessionTime');
        function tickSession() {
            const m = Math.floor((Date.now() - t0) / 60000);
            sess.textContent = m < 1 ? "You've been exploring for less than a minute."
                : `You've been exploring for ${m} minute${m === 1 ? '' : 's'}.`;
        }
        setInterval(tickSession, 30000); setTimeout(tickSession, 60000);
    })();

    /* ===================== DESKTOP WIDGETS ===================== */
    (function () {
        const w = document.createElement('div');
        w.className = 'desktop-widgets'; w.id = 'desktopWidgets';
        w.innerHTML = `
      <div class="dw-card"><span>Local time</span><strong id="dwClock">--:--</strong></div>
      <div class="dw-card"><span>Visitors</span><strong id="dwVisitors">—</strong></div>
      <div class="dw-card"><span>Explorer Quest</span><strong id="dwLv">Lv 1</strong></div>`;
        document.body.appendChild(w);
        function tickClock() {
            const d = new Date();
            $('#dwClock').textContent = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        tickClock(); setInterval(tickClock, 30000);
        // Enhanced interaction: subtle 3D tilt on project cards in desktop mode
        document.addEventListener('pointermove', e => {
            if (html.getAttribute('data-desktop') !== 'on') return;
            const card = e.target.closest('.project-card'); if (!card) return;
            const r = card.getBoundingClientRect();
            const rx = ((e.clientY - r.top) / r.height - 0.5) * -6;
            const ry = ((e.clientX - r.left) / r.width - 0.5) * 6;
            card.style.transform = `perspective(800px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-4px)`;
        });
        document.addEventListener('pointerout', e => {
            const card = e.target.closest('.project-card'); if (card) card.style.transform = '';
        });
    })();

    /* ===================== GUIDED TOUR ===================== */
    const TOUR_STEPS = [
        { sel: '#home', t: 'Welcome 👋', d: "This is Junica's portfolio — a quick guided walk-through of what you can do here. It takes under a minute, and you can leave any time.", act: { label: 'Open Digital Card', fn: () => openCard() } },
        { sel: '#about', t: 'About & Location', d: 'Her story, and an interactive dotted map of the Philippines. Hover the map to explore regions — Pampanga, her home, stays highlighted.' },
        { sel: '#skills', t: 'Skills & Tools', d: 'Nine core skills across business analysis and design. Tap any card to flip it and see the tools she uses for that skill.' },
        { sel: '#experience', t: 'Experience', d: 'Her journey so far — from UI/UX design to her current Business Analyst internship at Twala, plus editor work for the CCS newsletter.' },
        { sel: '#projects', t: 'Selected Projects', d: 'Filter by type, search, or open any card for the full case study. There is also a gallery of behind-the-scenes photos.', act: { label: 'Open Gallery', fn: () => openGallery() } },
        { sel: '#certifications', t: 'Certifications & Honors', d: 'Seven certifications and six academic honors. Use the Cards / List toggle to switch layouts — both sections stay in sync.' },
        { sel: '#chatbot', t: 'Ask the Chatbot', d: 'Have a question? The assistant answers in English or Tagalog, by text or voice. It knows her skills, projects, and how to get in touch.', act: { label: 'Open Chatbot', fn: () => openChat() } },
        { sel: '#communityFab', t: 'Community Space', d: 'A little interactive office you can walk around with WASD or arrow keys, plus a live community chat that updates in real time across visitors.', act: { label: 'Enter Community', fn: () => openCommunity() } },
        { sel: '#achFab', t: 'Quests', d: 'A light layer of gamification: explore the site to complete visitor quests, earn XP, and unlock a secret theme at the top rank.', act: { label: 'View Quests', fn: () => { openPanel(achPanel); } } },
        { sel: '#contactForm', t: 'Say hello', d: 'Send Junica a message right from here — it goes straight to her inbox. Thanks for taking the tour!', act: { label: 'Jump to form', fn: () => $('#contactForm').scrollIntoView({ behavior: 'smooth', block: 'center' }) } },
    ];
    let tourI = -1, tourEls = null;
    function buildTourUI() {
        if (tourEls) return;
        const ring = document.createElement('div'); ring.className = 'tour-ring';
        const tip = document.createElement('div'); tip.className = 'tour-tip';
        tip.innerHTML = `<span class="t-step" id="tourStep"></span><h4 id="tourTitle"></h4><p id="tourDesc"></p><div id="tourAct"></div>
      <div class="tour-nav">
        <button class="btn btn-outline" id="tourPrev"><svg viewBox="0 0 24 24" width="14" height="14"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> Prev</button>
        <button class="btn btn-primary" id="tourNext">Next <svg viewBox="0 0 24 24" width="14" height="14"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="tour-auto" id="tourAuto" aria-pressed="false">▶ Auto</button>
        <button class="tour-skip" id="tourSkip">Skip Tour</button>
      </div>`;
        const quit = document.createElement('button'); quit.className = 'tour-quit'; quit.id = 'tourQuit';
        quit.innerHTML = '✕ Quit Tour';
        tourEls = { ring, tip, quit };
        $('#tourPrev', tip).addEventListener('click', () => { stopTourAuto(); showTourStep(tourI - 1); });
        $('#tourNext', tip).addEventListener('click', () => { stopTourAuto(); tourI >= TOUR_STEPS.length - 1 ? endTour() : showTourStep(tourI + 1); });
        $('#tourAuto', tip).addEventListener('click', () => { tourAutoTimer ? stopTourAuto() : startTourAuto(); });
        $('#tourSkip', tip).addEventListener('click', endTour);
        quit.addEventListener('click', endTour);
    }
    function positionTour() {
        if (tourI < 0) return;
        const el = $(TOUR_STEPS[tourI].sel); if (!el) return;
        const r = el.getBoundingClientRect();
        const pad = 10;
        const { ring, tip } = tourEls;
        ring.style.top = (r.top - pad) + 'px';
        ring.style.left = (r.left - pad) + 'px';
        ring.style.width = (r.width + pad * 2) + 'px';
        ring.style.height = (r.height + pad * 2) + 'px';
        if (window.innerWidth > 640) {
            const tw = 340, th = tip.offsetHeight || 190;
            let top = r.bottom + 18;
            if (top + th > window.innerHeight - 16) top = Math.max(16, r.top - th - 18);
            let left = Math.min(Math.max(16, r.left), window.innerWidth - tw - 16);
            tip.style.top = top + 'px'; tip.style.left = left + 'px';
        }
    }
    function showTourStep(i) {
        tourI = Math.max(0, Math.min(i, TOUR_STEPS.length - 1));
        const st = TOUR_STEPS[tourI];
        const el = $(st.sel);
        $('#tourStep').textContent = `Step ${tourI + 1} of ${TOUR_STEPS.length}`;
        $('#tourTitle').textContent = st.t;
        $('#tourDesc').textContent = st.d;
        const actWrap = $('#tourAct');
        if (actWrap) {
            actWrap.innerHTML = '';
            if (st.act) {
                const ab = document.createElement('button');
                ab.className = 'tour-act'; ab.textContent = st.act.label;
                ab.addEventListener('click', () => { try { st.act.fn(); } catch { } });
                actWrap.appendChild(ab);
            }
        }
        $('#tourPrev').disabled = tourI === 0;
        $('#tourPrev').style.opacity = tourI === 0 ? .4 : 1;
        $('#tourNext').textContent = tourI === TOUR_STEPS.length - 1 ? 'Finish' : 'Next';
        if (el) el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: st.sel === '#achFab' ? 'nearest' : 'center' });
        setTimeout(positionTour, reduceMotion ? 60 : 480);
        sfx('click');
    }
    function startTour() {
        buildTourUI();
        closePanel(appPanel);
        document.body.append(tourEls.ring, tourEls.tip, tourEls.quit);
        showTourStep(0);
        window.addEventListener('scroll', positionTour, { passive: true });
        window.addEventListener('resize', positionTour);
    }
    let tourAutoTimer = null;
    function syncTourAuto() {
        const b = tourEls && $('#tourAuto', tourEls.tip); if (!b) return;
        const on = !!tourAutoTimer;
        b.classList.toggle('on', on);
        b.setAttribute('aria-pressed', String(on));
        b.innerHTML = on ? '⏸ Auto' : '▶ Auto';
    }
    function startTourAuto() {
        stopTourAuto();
        tourAutoTimer = setInterval(() => {
            if (tourI >= TOUR_STEPS.length - 1) { endTour(); return; }
            showTourStep(tourI + 1);
        }, 4600);
        syncTourAuto();
    }
    function stopTourAuto() {
        if (tourAutoTimer) { clearInterval(tourAutoTimer); tourAutoTimer = null; }
        syncTourAuto();
    }
    function endTour() {
        if (tourI < 0) return;
        stopTourAuto();
        tourI = -1;
        tourEls.ring.remove(); tourEls.tip.remove(); tourEls.quit.remove();
        window.removeEventListener('scroll', positionTour);
        window.removeEventListener('resize', positionTour);
        sfx('switch');
    }
    $('#tourBtn')?.addEventListener('click', startTour);
    $('#tourBtnHero')?.addEventListener('click', startTour);
    $('#backToTop')?.addEventListener('click', e => {
        e.preventDefault();
        try { window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }); }
        catch { window.scrollTo(0, 0); }
        document.documentElement.scrollTop = 0; document.body.scrollTop = 0; // Safari/iOS fallback
        sfx('click');
    });

    /* ===================== GLOBAL KEYS ===================== */
    document.addEventListener('keydown', e => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); cmdkOverlay.classList.contains('open') ? closeCmdk() : openCmdk(); return; }
        if (e.key === 'Escape') {
            if (communityModal.classList.contains('open')) { closeCommunity(); return; }
            if (tourI >= 0) { endTour(); return; }
            if (galleryModal.classList.contains('open')) { closeGallery(); return; }
            if (cmdkOverlay.classList.contains('open')) closeCmdk();
            else if (lightbox.classList.contains('open')) closeLightbox();
            else if (modal.classList.contains('open')) closeProjectModal();
            else if (cardModal.classList.contains('open')) closeCard();
            else if (cvModal.classList.contains('open')) closeCV();
            else if (appPanel.classList.contains('open')) closePanel(appPanel);
            else if (achPanel.classList.contains('open')) closePanel(achPanel);
        }
    });

    /* ===================== EXPLORER QUEST (mini-game) ===================== */
    const QUESTS = [
        { id: 'first', ic: ['M12 4.5a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15', 'M12 10.8a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4'], t: 'First Visit', d: 'Open the portfolio.', xp: 50 },
        { id: 'explore', ic: ['M5 7h14', 'M5 12h14', 'M5 17h8'], t: 'Full Overview', d: 'Scroll through every section of the site.', xp: 150 },
        { id: 'projects', ic: ['M5 4h9l5 5v11H5z', 'M14 4v5h5'], t: 'Project Deep Dive', d: 'Open any project case study.', xp: 100 },
        { id: 'theme', ic: ['M5 9h14', 'M5 15h14', 'M9 6.5v5', 'M15 12.5v5'], t: 'Customize the View', d: 'Adjust a setting in Edit Preferences.', xp: 75 },
        { id: 'egg', ic: ['M12 4l6.5 8-6.5 8-6.5-8z'], t: 'Hidden Detail', d: 'Find the interactive surprise on this page…', xp: 125 },
        { id: 'night', ic: ['M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z'], t: 'Evening Visit', d: 'Stop by between 6 PM and 6 AM.', xp: 75 },
        { id: 'earlybird', ic: ['M6 15.5a6 6 0 0 1 12 0', 'M12 5.5v2M6.8 8.3l1.4 1.4M17.2 8.3l-1.4 1.4', 'M3.5 15.5h17'], t: 'Morning Visit', d: 'Stop by between 6 AM and noon.', xp: 75 },
    ];
    const RANKS = [
        { xp: 0, name: 'Visitor' }, { xp: 100, name: 'Explorer' },
        { xp: 250, name: 'Insider' }, { xp: 450, name: 'Analyst' }, { xp: 650, name: 'Legend' },
    ];
    let unlocked = store.get('ach', {});
    const achList = $('#achList'), achBadge = $('#achBadge');

    function questXp() { return QUESTS.reduce((a, q) => a + (unlocked[q.id] ? q.xp : 0), 0); }
    function questLevel(xp) {
        let lv = 1;
        RANKS.forEach((r, i) => { if (xp >= r.xp) lv = i + 1; });
        return lv;
    }
    function giftReady() { return QUESTS.every(q => unlocked[q.id]); }
    function renderGift() {
        const gi = $('#giftIco');
        if (gi && !gi.dataset.mono) { gi.dataset.mono = '1'; gi.classList.add('gift-svg'); gi.textContent = ''; gi.innerHTML = qicon(GIFT_IC); }
        const qi = $('.quest-intro');
        if (qi && !qi.dataset.clean) { qi.dataset.clean = '1'; qi.innerHTML = 'Explore the site to complete quests and earn XP. Reach <b>Legend</b> to open the gift.'; }
        const g = $('#questGift'), btn = $('#giftBtn'), sub = $('#giftSub'), title = $('#giftTitle');
        const ready = giftReady();
        g.classList.toggle('claimable', ready && !giftClaimed);
        g.classList.toggle('claimed', giftClaimed);
        $('#achFab').classList.toggle('gift-ready', ready && !giftClaimed);
        if (giftClaimed) {
            title.textContent = 'Legend Gold unlocked ✦';
            sub.textContent = 'Your secret theme is live in Edit Preferences.';
            btn.hidden = true;
        } else if (ready) {
            title.textContent = 'Your gift is ready!';
            sub.textContent = 'Open it to reveal your reward.';
            btn.hidden = false;
        } else {
            const left = QUESTS.filter(q => !unlocked[q.id]).length;
            title.textContent = 'Mystery gift';
            sub.textContent = `Locked — ${left} quest${left === 1 ? '' : 's'} to go.`;
            btn.hidden = true;
        }
    }
    function claimGift() {
        if (giftClaimed || !giftReady()) return;
        giftClaimed = true; store.set('gift', true);
        const gold = PRESETS.find(p => p.id === 'legendgold');
        if (!$('.preset-btn[data-preset="legendgold"]')) addPresetBtn(gold);
        selectPreset(gold);
        sfx('level');
        // confetti storm
        for (let i = 0; i < 5; i++) {
            setTimeout(() => confettiBurst(window.innerWidth * (0.15 + Math.random() * 0.7), window.innerHeight * (0.25 + Math.random() * 0.4)), i * 180);
        }
        const toast = document.createElement('div'); toast.className = 'ach-toast';
        toast.innerHTML = `<span class="ach-ico" style="width:34px;height:34px;border-radius:10px">${qicon(['M7 21h10M12 17v4', 'M6 3h12v5a6 6 0 0 1-12 0V3z', 'M6 5H3.5a3 3 0 0 0 3 4M18 5h2.5a3 3 0 0 1-3 4'])}</span><div><strong>Gift opened!</strong> Secret theme unlocked: <span class="t-xp">Legend Gold ✦</span></div>`;
        $('#achToastWrap').appendChild(toast);
        setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity .4s'; setTimeout(() => toast.remove(), 400); }, 3200);
        renderGift();
    }
    $('#giftBtn').addEventListener('click', claimGift);

    const GIFT_IC = ['M4 10h16v10H4z', 'M4 7h16v3H4z', 'M12 7v13', 'M12 7c-3 0-4-1.6-4-2.6C8 3.3 9 3 9.7 3c1.6 0 2.3 2.1 2.3 4M12 7c3 0 4-1.6 4-2.6C16 3.3 15 3 14.3 3c-1.6 0-2.3 2.1-2.3 4'];
    const qicon = ic => `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ic.map(d => `<path d="${d}" pathLength="1"/>`).join('')}</svg>`;
    const CHECK_SVG = '<svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 12.5l5 5 10-11"/></svg>';
    function renderQuest(justId) {
        const xp = questXp();
        const lv = questLevel(xp);
        const rank = RANKS[lv - 1];
        const next = RANKS[lv]; // undefined at max
        $('#questLv').textContent = lv;
        $('#questRank').textContent = rank.name;
        $('#questXpLabel').textContent = xp + ' XP';
        achBadge.textContent = 'Lv ' + lv;
        const dwLv = $('#dwLv'); if (dwLv) dwLv.textContent = 'Lv ' + lv + ' · ' + rank.name;
        const base = rank.xp, ceil = next ? next.xp : rank.xp;
        const pct = next ? Math.round(((xp - base) / (ceil - base)) * 100) : 100;
        $('#questBarFill').style.width = pct + '%';
        $('#questNext').textContent = next
            ? `${next.xp - xp} XP to reach ${next.name}`
            : 'Max rank reached — you found everything.';
        achList.innerHTML = QUESTS.map(q => `
      <div class="ach-item ${unlocked[q.id] ? 'unlocked' : ''} ${q.id === justId ? 'just-unlocked' : ''}">
        <span class="ach-ico">${qicon(q.ic)}<span class="ach-check">${CHECK_SVG}</span></span>
        <div class="ach-item-body"><h4>${q.t}</h4><p>${unlocked[q.id] ? 'Completed' : q.d}</p></div>
        <span class="ach-xp">${unlocked[q.id] ? '+' : ''}${q.xp} XP</span>
      </div>`).join('');
        renderGift();
    }
    function confettiBurst(x, y) {
        if (reduceMotion) return;
        const colors = [getComputedStyle(html).getPropertyValue('--accent').trim() || '#fff', '#FFD86B', '#7FB8FF', '#FF7FA5'];
        for (let i = 0; i < 16; i++) {
            const c = document.createElement('span');
            c.className = 'confetti';
            c.style.left = x + 'px'; c.style.top = y + 'px';
            c.style.background = colors[i % colors.length];
            c.style.setProperty('--cx', (Math.random() * 160 - 80) + 'px');
            c.style.setProperty('--cy', (40 + Math.random() * 110) + 'px');
            document.body.appendChild(c);
            setTimeout(() => c.remove(), 950);
        }
    }
    function unlock(id) {
        if (unlocked[id]) return;
        const prevLv = questLevel(questXp());
        unlocked[id] = true; store.set('ach', unlocked);
        const q = QUESTS.find(x => x.id === id); if (!q) { renderQuest(); return; }
        renderQuest(id);
        const newLv = questLevel(questXp());
        // toast
        const toast = document.createElement('div'); toast.className = 'ach-toast';
        toast.innerHTML = `<span class="ach-ico" style="width:34px;height:34px;border-radius:10px">${qicon(q.ic)}</span><div><strong>Quest complete</strong> — ${q.t} <span class="t-xp">+${q.xp} XP</span></div>`;
        $('#achToastWrap').appendChild(toast);
        setTimeout(() => { toast.classList.add('leaving'); setTimeout(() => toast.remove(), 450); }, 2800);
        // effects
        const fab = $('#achFab').getBoundingClientRect();
        confettiBurst(fab.left + fab.width / 2, fab.top);
        sfx(newLv > prevLv ? 'level' : 'unlock');
        if (newLv > prevLv) {
            const lvToast = document.createElement('div'); lvToast.className = 'ach-toast';
            lvToast.innerHTML = `<span class="ach-ico" style="width:34px;height:34px;border-radius:10px">${qicon(['M12 3l2.2 4.9L19 9l-4 3.4 1.2 5.1L12 14.8 7.8 17.5 9 12.4 5 9l4.8-1.1L12 3z'])}</span><div><strong>Level up!</strong> You're now <span class="t-xp">${RANKS[newLv - 1].name}</span></div>`;
            setTimeout(() => {
                $('#achToastWrap').appendChild(lvToast);
                confettiBurst(window.innerWidth / 2, window.innerHeight * 0.8);
                setTimeout(() => { lvToast.classList.add('leaving'); setTimeout(() => lvToast.remove(), 450); }, 2800);
            }, 900);
        }
    }
    $('#achFab').addEventListener('click', () => { openPanel(achPanel); sfx('pop'); });
    $('#achClose').addEventListener('click', () => closePanel(achPanel));
    achPanel.addEventListener('click', e => { if (e.target === achPanel) closePanel(achPanel); });
    renderQuest();
    unlock('first');
    { const h = new Date().getHours(); if (h >= 18 || h < 6) unlock('night'); if (h >= 6 && h < 12) unlock('earlybird'); }

    /* ===================== AVATAR (computer mockup) ===================== */
    const avatar = $('#avatar'), avatarBubble = $('#avatarBubble'), avatarWrap = $('#avatarWrap');
    const BUBBLES = ['Hi there! 👋', 'Thanks for visiting!', 'Click me for the full photo!', "Let's build something amazing!", 'Feel free to explore!'];
    function updateAvatarMode() { /* single mockup portrait — nothing to swap */ }
    let bubbleTimer;
    avatarWrap.addEventListener('mouseenter', () => {
        clearTimeout(bubbleTimer);
        avatarBubble.textContent = BUBBLES[Math.floor(Math.random() * BUBBLES.length)];
        avatarBubble.classList.add('show');
        bubbleTimer = setTimeout(() => avatarBubble.classList.remove('show'), 2400);
    });
    const AVATAR_NOTE_DEFAULT = 'Click the computer to view my full photo.';
    avatar.addEventListener('click', e => {
        unlock('egg'); sfx('pop');
        const showingFull = avatar.classList.toggle('show-full');
        const note = $('.avatar-note');
        if (note) note.textContent = showingFull ? 'Click again to go back.' : AVATAR_NOTE_DEFAULT;
        if (e && e.clientX) {
            for (let i = 0; i < 6; i++) {
                const sp = document.createElement('span'); sp.className = 'sparkle';
                sp.textContent = ['✦', '✧', '⋆', '✩'][i % 4];
                sp.style.left = (e.clientX + (Math.random() * 40 - 20)) + 'px';
                sp.style.top = (e.clientY + (Math.random() * 20 - 10)) + 'px';
                document.body.appendChild(sp); setTimeout(() => sp.remove(), 700);
            }
        }
    });

    /* ===================== DYNAMIC GREETING ===================== */
    (function () {
        const h = new Date().getHours();
        const g = $('#greeting'); if (!g) return;
        const part = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
        g.textContent = `${part} — open to new opportunities`;
    })();

    /* ===================== LOADER + AVATAR BOOT ===================== */
    function bootAvatar() {
        const w = $('#avatarWrap');
        if (!w || w.classList.contains('boot') || w.classList.contains('no-anim')) return;
        w.classList.add(reduceMotion ? 'no-anim' : 'boot');
    }
    window.addEventListener('load', () => setTimeout(() => { $('#loader').classList.add('hide'); bootAvatar(); }, reduceMotion ? 100 : 950));
    setTimeout(() => { $('#loader').classList.add('hide'); bootAvatar(); }, 2600); // safety

    /* ===================== SCROLL PROGRESS ===================== */
    const progress = $('#scrollProgress');
    function onScroll() {
        const st = window.scrollY, dh = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = (dh > 0 ? (st / dh) * 100 : 0) + '%';
    }

    /* ===================== REVEAL + SECTION TRACKING ===================== */
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    $$('.reveal, .reveal-left, .reveal-right, .reveal-down, .reveal-scale, .stagger').forEach(el => revealObserver.observe(el));

    const cardObserver = new IntersectionObserver(entries => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const items = $$('.core-card', entry.target);
                items.forEach((c, i) => setTimeout(() => c.classList.add('in'), i * 60));
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    { const el = $('#skills'); if (el) cardObserver.observe(el); }

    const sectionIds = ['about', 'skills', 'experience', 'projects', 'certifications', 'contact'];
    const seenSections = new Set();
    const exploreObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                seenSections.add(entry.target.id);
                if (sectionIds.every(id => seenSections.has(id))) unlock('explore');
            }
        });
    }, { threshold: 0.4 });
    sectionIds.forEach(id => { const el = $('#' + id); if (el) exploreObserver.observe(el); });

    /* ===================== TEXT + CARD ANIMATIONS ===================== */
    // Word-by-word heading reveal
    $$('.section-inner > h2').forEach(h => {
        if (h.classList.contains('gradient-text')) return; // shimmer handles this one
        const words = h.textContent.trim().split(/\s+/);
        h.innerHTML = words.map((w, i) => `<span class="wrd" style="transition-delay:${i * 70}ms">${w}</span>`).join(' ');
        const io = new IntersectionObserver(en => {
            en.forEach(x => { if (x.isIntersecting) { h.classList.add('words-in'); io.disconnect(); } });
        }, { threshold: 0.4 });
        io.observe(h);
    });

    // Staggered card reveals (projects + honors)
    function staggerReveal(rootSel, itemSel) {
        const root = $(rootSel); if (!root) return;
        const io = new IntersectionObserver(en => {
            en.forEach(x => {
                if (x.isIntersecting) {
                    $$(itemSel, root).forEach((c, i) => setTimeout(() => c.classList.add('in'), i * 70));
                    io.disconnect();
                }
            });
        }, { threshold: 0.1 });
        io.observe(root);
    }
    staggerReveal('#projectGrid', '.project-card');
    staggerReveal('.honors', '.honor-card');

    /* ===================== SCROLLSPY ===================== */
    const navLinks = $$('.nav-link');
    const spyObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const link = $(`.nav-link[href="#${entry.target.id}"]`);
            if (link && entry.isIntersecting) { navLinks.forEach(l => l.classList.remove('active')); link.classList.add('active'); }
        });
    }, { threshold: 0.3, rootMargin: '-30% 0px -55% 0px' });
    navLinks.forEach(l => { const t = $(l.getAttribute('href')); if (t) spyObserver.observe(t); });

    /* ===================== TIMELINE PROGRESS ===================== */
    const timeline = $('#timeline'), timelineProgress = $('#timelineProgress');
    function updateTimeline() {
        if (!timeline) return;
        const rect = timeline.getBoundingClientRect();
        const mid = window.innerHeight * 0.5;
        const pct = Math.max(0, Math.min(1, (mid - rect.top) / rect.height));
        timelineProgress.style.height = (pct * 100) + '%';
    }
    const dotObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
    }, { threshold: 0.35, rootMargin: '0px 0px -15% 0px' });
    $$('.timeline-item').forEach(i => dotObserver.observe(i));

    /* ===================== STAT COUNT-UP ===================== */
    const statObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $$('.stat-num', entry.target).forEach(el => {
                    const target = +el.dataset.count; let cur = 0;
                    const step = Math.max(1, Math.ceil(target / 30));
                    const tick = () => { cur = Math.min(cur + step, target); el.textContent = cur + (cur >= target ? '+' : ''); if (cur < target) requestAnimationFrame(tick); };
                    tick();
                });
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    const aboutStats = $('#aboutStats'); if (aboutStats) statObserver.observe(aboutStats);

    /* ===================== ARROW CURSOR + MAGNETIC ===================== */
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const arrowEl = $('#cursorArrow');
    function applyCursor() {
        const mode = state.cursor;
        const canCustom = fine && !reduceMotion && mode !== 'system';
        document.body.classList.toggle('cursor-on', canCustom);
        arrowEl.classList.toggle('dot', mode === 'dot');
        arrowEl.style.display = canCustom ? '' : 'none';
        $$('#cursorSeg [data-cursor]').forEach(b => b.classList.toggle('active', b.dataset.cursor === mode));
    }
    $$('#cursorSeg [data-cursor]').forEach(b => b.addEventListener('click', () => {
        state.cursor = b.dataset.cursor; store.set('cursor', state.cursor); applyCursor(); sfx('click');
    }));
    applyCursor();
    if (fine && !reduceMotion) {
        window.addEventListener('mousemove', e => {
            arrowEl.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        }, { passive: true });
        const HOVER_SEL = 'a, button, .project-card, .core-card, .cert-card, input, .swatch, .grad-swatch, .preset-btn, .vcard-row, .edu-row';
        document.addEventListener('mouseover', e => { if (e.target.closest(HOVER_SEL)) arrowEl.classList.add('hover'); });
        document.addEventListener('mouseout', e => { if (e.target.closest(HOVER_SEL)) arrowEl.classList.remove('hover'); });
        document.addEventListener('mousedown', () => arrowEl.classList.add('down'));
        document.addEventListener('mouseup', () => arrowEl.classList.remove('down'));
        document.addEventListener('mouseleave', () => document.body.classList.remove('cursor-on'));
        document.addEventListener('mouseenter', () => { if (state.cursor !== 'system') document.body.classList.add('cursor-on'); });
        // Magnetic buttons
        $$('.magnetic').forEach(el => {
            el.addEventListener('mousemove', e => { const r = el.getBoundingClientRect(); el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px, ${(e.clientY - r.top - r.height / 2) * 0.28}px)`; });
            el.addEventListener('mouseleave', () => { el.style.transform = ''; });
        });
    }

    /* ===================== AMBIENT CANVAS ===================== */
    const canvas = $('#ambientCanvas'); const ctx2d = canvas.getContext('2d');
    let particles = [], rafId = null, W = 0, H = 0;
    function refreshAccentCss() {
        accentCss = getComputedStyle(html).getPropertyValue('--accent').trim() || '#fff';
    }
    const SYMBOLS = ['{', '}', '</>', '<>', '()', '[]', '=>'];
    function resizeCanvas() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    function initParticles() {
        const n = window.innerWidth < 640 ? 16 : 30;
        particles = Array.from({ length: n }, () => ({
            x: Math.random() * W, y: Math.random() * H,
            vx: (Math.random() - 0.5) * (state.ambient === 'web' ? 0.35 : 0.3),
            vy: state.ambient === 'web' ? (Math.random() - 0.5) * 0.35 : -(0.15 + Math.random() * 0.4),
            ph: Math.random() * Math.PI * 2, vr: (Math.random() - 0.5) * 0.02, rot: Math.random() * Math.PI,
            r: 1 + Math.random() * 2.5, o: 0.12 + Math.random() * 0.42,
            sym: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)], sz: 10 + Math.random() * 8
        }));
    }
    let ambT = 0;
    function drawAmbient() {
        ctx2d.clearRect(0, 0, W, H);
        ambT += 0.008;
        if (state.ambient === 'ribbon') {
            // Barbie — elegant ribbon bows drifting like confetti, drawn as clean bezier loops
            ctx2d.lineWidth = 1.6; ctx2d.strokeStyle = accentCss; ctx2d.fillStyle = accentCss;
            particles.forEach(p => {
                p.y += p.vy * 0.6; p.x += Math.sin(ambT * 1.2 + p.ph) * 0.4; p.rot = (p.rot || 0) + p.vr;
                if (p.y > H + 30) { p.y = -30; p.x = Math.random() * W; }
                const sc = p.sz / 16;
                ctx2d.save(); ctx2d.translate(p.x, p.y); ctx2d.rotate(Math.sin(ambT + p.ph) * 0.25 + p.rot);
                ctx2d.globalAlpha = 0.16 + p.o * 0.5;
                // two loops + knot = a tidy bow
                ctx2d.beginPath();
                ctx2d.moveTo(0, 0);
                ctx2d.bezierCurveTo(-14 * sc, -10 * sc, -14 * sc, 10 * sc, 0, 0);
                ctx2d.bezierCurveTo(14 * sc, -10 * sc, 14 * sc, 10 * sc, 0, 0);
                ctx2d.stroke();
                ctx2d.beginPath(); ctx2d.arc(0, 0, 2.2 * sc, 0, Math.PI * 2); ctx2d.fill();
                // tails
                ctx2d.beginPath();
                ctx2d.moveTo(-2 * sc, 1 * sc); ctx2d.quadraticCurveTo(-5 * sc, 10 * sc, -8 * sc, 13 * sc);
                ctx2d.moveTo(2 * sc, 1 * sc); ctx2d.quadraticCurveTo(5 * sc, 10 * sc, 8 * sc, 13 * sc);
                ctx2d.stroke();
                ctx2d.restore();
            });
        } else if (state.ambient === 'web') {
            // Spider-Man — a single refined spiderweb anchored top-right, gently breathing
            const ax = W - 8, ay = 8;               // anchor corner
            const R = Math.min(W, H) * (0.9 + 0.02 * Math.sin(ambT * 1.5));
            const spokes = 9, rings = 6;
            ctx2d.strokeStyle = accentCss;
            ctx2d.globalAlpha = 0.22; ctx2d.lineWidth = 1;
            const a0 = Math.PI * 0.5, a1 = Math.PI;  // quarter fan into the viewport
            // radial spokes
            for (let k = 0; k <= spokes; k++) {
                const a = a0 + (a1 - a0) * (k / spokes);
                ctx2d.beginPath(); ctx2d.moveTo(ax, ay);
                ctx2d.lineTo(ax + Math.cos(a) * R, ay + Math.sin(a) * R); ctx2d.stroke();
            }
            // catenary rings between spokes
            for (let r = 1; r <= rings; r++) {
                const rr0 = R * (r / rings);
                ctx2d.beginPath();
                for (let k = 0; k <= spokes; k++) {
                    const a = a0 + (a1 - a0) * (k / spokes);
                    const sag = 1 - 0.12 * Math.sin((k / spokes) * Math.PI); // subtle droop
                    const x = ax + Math.cos(a) * rr0 * sag, y = ay + Math.sin(a) * rr0 * sag;
                    k === 0 ? ctx2d.moveTo(x, y) : ctx2d.lineTo(x, y);
                }
                ctx2d.globalAlpha = 0.06 + 0.12 * (1 - r / rings);
                ctx2d.stroke();
            }
            // a couple of dew nodes
            ctx2d.globalAlpha = 0.5; ctx2d.fillStyle = accentCss;
            for (let k = 2; k <= spokes; k += 3) {
                const a = a0 + (a1 - a0) * (k / spokes), rr0 = R * 0.62;
                ctx2d.beginPath(); ctx2d.arc(ax + Math.cos(a) * rr0, ay + Math.sin(a) * rr0, 2, 0, Math.PI * 2); ctx2d.fill();
            }
        } else {
            ctx2d.fillStyle = accentCss; ctx2d.strokeStyle = accentCss;

            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.y < -20) { p.y = H + 20; p.x = Math.random() * W; }
                if (p.y > H + 20) { p.y = -20; p.x = Math.random() * W; }
                if (p.x < -20) p.x = W + 20; if (p.x > W + 20) p.x = -20;
                if (state.ambient === 'code') {
                    ctx2d.globalAlpha = p.o * (0.35 + 0.3 * Math.sin(ambT * 3 + p.ph));
                    ctx2d.font = `${p.sz}px monospace`; ctx2d.fillText(p.sym, p.x, p.y);
                } else if (state.ambient === 'bubbles') {
                    const wob = Math.sin(ambT * 2.4 + p.ph) * 2;
                    ctx2d.globalAlpha = p.o * 0.5;
                    ctx2d.lineWidth = 1;
                    ctx2d.beginPath(); ctx2d.arc(p.x + wob, p.y, p.r * 2.4, 0, Math.PI * 2); ctx2d.stroke();
                    ctx2d.globalAlpha = p.o * 0.9;
                    ctx2d.beginPath(); ctx2d.arc(p.x + wob - p.r * 0.7, p.y - p.r * 0.8, p.r * 0.5, 0, Math.PI * 2); ctx2d.stroke();
                } else { // sparkles — soft glow + twinkle
                    const tw = 0.55 + 0.45 * Math.sin(ambT * 4 + p.ph);
                    const rr = p.r * (1 + tw);
                    const g = ctx2d.createRadialGradient(p.x, p.y, 0, p.x, p.y, rr * 3.2);
                    g.addColorStop(0, accentCss); g.addColorStop(1, 'transparent');
                    ctx2d.globalAlpha = p.o * 0.55 * tw;
                    ctx2d.fillStyle = g;
                    ctx2d.beginPath(); ctx2d.arc(p.x, p.y, rr * 3.2, 0, Math.PI * 2); ctx2d.fill();
                    ctx2d.fillStyle = accentCss;
                    ctx2d.globalAlpha = p.o * (0.5 + 0.5 * tw);
                    ctx2d.beginPath(); ctx2d.arc(p.x, p.y, rr, 0, Math.PI * 2); ctx2d.fill();
                }
            });
        }
        ctx2d.globalAlpha = 1;
        rafId = requestAnimationFrame(drawAmbient);
    }
    function applyAmbient() {
        syncAmbientButtons();
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
        ctx2d && ctx2d.clearRect(0, 0, W, H);
        if (state.ambient === 'off' || reduceMotion) return;
        resizeCanvas(); refreshAccentCss(); initParticles(); drawAmbient();
    }
    window.addEventListener('resize', () => { resizeCanvas(); onScroll(); updateTimeline(); if (state.ambient !== 'off' && !reduceMotion) initParticles(); });
    applyAmbient();

    /* ===================== SCROLL LOOP ===================== */
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) { requestAnimationFrame(() => { onScroll(); updateTimeline(); ticking = false; }); ticking = true; }
    }, { passive: true });
    onScroll(); updateTimeline();

    /* ===================== MOBILE NAV ===================== */
    const navToggle = $('#navToggle'), navMenu = $('#navMenu');
    navToggle.addEventListener('click', () => { const open = navMenu.classList.toggle('open'); navToggle.setAttribute('aria-expanded', String(open)); });
    navMenu.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => { navMenu.classList.remove('open'); navToggle.setAttribute('aria-expanded', 'false'); }));

    /* ===================== COPY EMAIL (hero) ===================== */
    const copyEmailBtn = $('#copyEmailBtn'), copyEmailText = $('#copyEmailText');
    if (copyEmailBtn && copyEmailText) {
        const original = copyEmailText.textContent; let timer;
        copyEmailBtn.addEventListener('click', async () => {
            const ok = await copyText(copyEmailBtn.dataset.copy, null);
            copyEmailText.textContent = ok ? 'Copied to clipboard' : 'Copy failed — email me manually';
            copyEmailBtn.classList.add('is-copied');
            clearTimeout(timer); timer = setTimeout(() => { copyEmailText.textContent = original; copyEmailBtn.classList.remove('is-copied'); }, 2000);
        });
    }

    /* ===================== FOOTER YEAR ===================== */
    const yearEl = $('#year'); if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ===================== COMMUNITY SPACE (office + chat) =====================
       Realtime: same-device tabs sync via BroadcastChannel; across devices we use a
       lightweight public WebSocket relay so visitors online at the same time see each
       other move and chat live on the deployed site — no refresh needed. If the relay
       is unreachable, everything still works locally and degrades gracefully.
       To use your own backend, set CC_RELAY_URL below (search: CC_SYNC). */
    const CC_RELAY_URL = 'wss://ws.postman-echo.com/raw'; // CC_SYNC: swap for your own room-scoped WS/Supabase relay
    const CC_ROOM = 'jmj-office-v1';
    const communityModal = $('#communityModal');
    const officeCanvas = $('#officeCanvas');
    const octx = officeCanvas.getContext('2d');
    let commOpen = false, commRaf = null, oW = 0, oH = 0, oDpr = 1;
    const player = { x: 0.5, y: 0.72, r: 13, bob: 0 }; // unit coords
    let ccId = store.get('commId', null);
    if (!ccId) { ccId = 'v' + Math.random().toString(36).slice(2, 9); store.set('commId', ccId); }
    const peers = new Map(); // id -> {name,x,y,last}
    let lastPosTx = 0;
    const keys = new Set();

    /* Cross-device relay: broadcasts every message to all connected visitors.
       Wraps the same message shapes used by BroadcastChannel so both paths share code. */
    let ccWs = null, ccWsReady = false, ccWsRetry = 0, ccWsTimer = null;
    function ccRelaySend(obj) {
        if (ccWs && ccWsReady) {
            try { ccWs.send(JSON.stringify({ room: CC_ROOM, ...obj })); } catch { }
        }
    }
    function ccRelayConnect() {
        if (!('WebSocket' in window) || !CC_RELAY_URL) return;
        try { ccWs = new WebSocket(CC_RELAY_URL); } catch { return; }
        ccWs.onopen = () => {
            ccWsReady = true; ccWsRetry = 0;
            // announce presence so existing visitors learn about us and vice-versa
            if (ccMe && ccMe.name) ccRelaySend({ type: 'hello', id: ccId, name: ccMe.name, geo: ccMe.geo });
        };
        ccWs.onmessage = ev => {
            let m; try { m = JSON.parse(ev.data); } catch { return; }
            if (!m || m.room !== CC_ROOM || m.id === ccId) return; // ignore echoes of our own id
            ccHandleRemote(m);
        };
        ccWs.onclose = () => {
            ccWsReady = false;
            // exponential backoff reconnect (capped) so long-lived sessions stay connected
            clearTimeout(ccWsTimer);
            ccWsRetry = Math.min(ccWsRetry + 1, 6);
            ccWsTimer = setTimeout(ccRelayConnect, 1000 * Math.pow(1.6, ccWsRetry));
        };
        ccWs.onerror = () => { try { ccWs.close(); } catch { } };
    }
    const ccSeen = new Set(); // message ids already rendered — prevents echo duplicates
    function ccHandleRemote(m) {
        if (m.type === 'pos' || m.type === 'hello') {
            peers.set(m.id, { name: m.name || 'Guest', x: m.x ?? 0.5, y: m.y ?? 0.5, last: Date.now() });
            // when someone says hello, reply with our position so we appear for them too
            if (m.type === 'hello' && ccMe && ccMe.name) ccRelaySend({ type: 'pos', id: ccId, name: ccMe.name, x: player.x, y: player.y });
            return;
        }
        if (m.type === 'bye') { peers.delete(m.id); return; }
        if (m.op) { ccApplyOp(m); return; }
        if (m.text) {
            if (m.sid === ccId) return;               // ignore echoes of our own messages
            if (m.mid && ccSeen.has(m.mid)) return;   // already rendered from another channel
            if (m.mid) ccSeen.add(m.mid);
            const list = ccHistory(); list.push(m); ccSaveHistory(list);
            if (commOpen) ccRender(m);
        }
    }
    const FURN = [ // unit-space rects {x,y,w,h,type}
        { x: 0.06, y: 0.10, w: 0.30, h: 0.16, t: 'desk' },
        { x: 0.64, y: 0.10, w: 0.30, h: 0.16, t: 'desk2' },
        { x: 0.02, y: 0.40, w: 0.09, h: 0.34, t: 'shelf' },
        { x: 0.90, y: 0.46, w: 0.07, h: 0.10, t: 'plant' },
        { x: 0.42, y: 0.08, w: 0.16, h: 0.05, t: 'window' },
    ];
    const BLUSH = '#F2A9C6';
    function cssVar(n, fb) { const v = getComputedStyle(html).getPropertyValue(n).trim(); return v || fb; }
    function sizeOffice() {
        const w = officeCanvas.parentElement.clientWidth;
        const hpx = Math.max(300, Math.min(430, Math.round(w * 0.6)));
        oDpr = Math.min(window.devicePixelRatio || 1, 2);
        officeCanvas.width = Math.round(w * oDpr); officeCanvas.height = Math.round(hpx * oDpr);
        officeCanvas.style.height = hpx + 'px';
        oW = w; oH = hpx;
    }
    function rr(x, y, w, h, r) { octx.beginPath(); octx.roundRect(x, y, w, h, r); }
    function drawOffice() {
        const now = performance.now() / 1000;
        octx.setTransform(oDpr, 0, 0, oDpr, 0, 0);
        octx.clearRect(0, 0, oW, oH);
        const line = cssVar('--line-strong', '#999'), dim = cssVar('--text-dim', '#888');
        const elev = cssVar('--bg-elev-2', '#eee'), text = cssVar('--text', '#111');
        const WOOD = 'rgba(196, 164, 132, .38)', SAGE = '#8FAF8B', WARM = 'rgba(246, 214, 170, .35)';
        // floor
        rr(6, 6, oW - 12, oH - 12, 16); octx.fillStyle = cssVar('--bg-elev', '#f4f4f4'); octx.fill();
        // subtle floor grid
        octx.save(); octx.clip();
        octx.strokeStyle = line; octx.globalAlpha = 0.12; octx.lineWidth = 1;
        for (let gx = 6; gx < oW; gx += 46) { octx.beginPath(); octx.moveTo(gx, 6); octx.lineTo(gx, oH - 6); octx.stroke(); }
        for (let gy = 6; gy < oH; gy += 46) { octx.beginPath(); octx.moveTo(6, gy); octx.lineTo(oW - 6, gy); octx.stroke(); }
        octx.restore(); octx.globalAlpha = 1;
        rr(6, 6, oW - 12, oH - 12, 16); octx.strokeStyle = line; octx.lineWidth = 1.5; octx.stroke();
        // window light beam (soft, breathing)
        const win = FURN.find(f => f.t === 'window');
        if (win) {
            const wx = win.x * oW, wy = win.y * oH, ww = win.w * oW, wh = win.h * oH;
            const glow = octx.createLinearGradient(0, wy, 0, wy + oH * 0.5);
            glow.addColorStop(0, WARM); glow.addColorStop(1, 'transparent');
            octx.globalAlpha = 0.5 + 0.18 * Math.sin(now * 0.8);
            octx.fillStyle = glow;
            octx.beginPath();
            octx.moveTo(wx, wy + wh); octx.lineTo(wx + ww, wy + wh);
            octx.lineTo(wx + ww + 34, wy + oH * 0.5); octx.lineTo(wx - 34, wy + oH * 0.5);
            octx.closePath(); octx.fill();
            octx.globalAlpha = 1;
        }
        // rug — two-tone rings
        octx.globalAlpha = 0.32; octx.fillStyle = BLUSH;
        octx.beginPath(); octx.ellipse(oW * 0.5, oH * 0.62, oW * 0.17, oH * 0.14, 0, 0, Math.PI * 2); octx.fill();
        octx.globalAlpha = 0.5; octx.strokeStyle = BLUSH; octx.lineWidth = 1.5;
        octx.beginPath(); octx.ellipse(oW * 0.5, oH * 0.62, oW * 0.125, oH * 0.10, 0, 0, Math.PI * 2); octx.stroke();
        octx.globalAlpha = 1;
        // wall art
        [[0.44, 0.02, 0.05], [0.51, 0.02, 0.05]].forEach(([ax, ay, aw], idx) => {
            const x = ax * oW, y = ay * oH + 6, w = aw * oW, h = w * 1.15;
            rr(x, y, w, h, 3); octx.fillStyle = elev; octx.fill(); octx.strokeStyle = line; octx.stroke();
            octx.strokeStyle = idx ? SAGE : BLUSH; octx.lineWidth = 1.6;
            octx.beginPath();
            if (idx) { octx.arc(x + w / 2, y + h / 2, w * 0.24, 0, Math.PI * 2); }
            else { octx.moveTo(x + w * 0.2, y + h * 0.7); octx.quadraticCurveTo(x + w * 0.5, y + h * 0.2, x + w * 0.8, y + h * 0.7); }
            octx.stroke();
        });
        // furniture
        FURN.forEach(f => {
            const x = f.x * oW, y = f.y * oH, w = f.w * oW, h = f.h * oH;
            // soft shadow
            if (f.t !== 'window') {
                octx.globalAlpha = 0.10; octx.fillStyle = '#000';
                octx.beginPath(); octx.ellipse(x + w / 2, y + h + 5, w * 0.5, 5, 0, 0, Math.PI * 2); octx.fill();
                octx.globalAlpha = 1;
            }
            if (f.t === 'window') {
                rr(x, y, w, h, 4); octx.fillStyle = WARM; octx.fill(); octx.strokeStyle = line; octx.lineWidth = 1.5; octx.stroke();
                octx.beginPath(); octx.moveTo(x + w / 2, y); octx.lineTo(x + w / 2, y + h);
                octx.moveTo(x, y + h / 2); octx.lineTo(x + w, y + h / 2); octx.stroke();
            } else if (f.t === 'plant') {
                rr(x + w * 0.22, y + h * 0.52, w * 0.56, h * 0.48, 4); octx.fillStyle = 'rgba(214,178,160,.55)'; octx.fill(); octx.strokeStyle = line; octx.stroke();
                octx.strokeStyle = SAGE; octx.lineWidth = 1.7;
                const sway = Math.sin(now * 1.4) * 2.2;
                for (let k = -1; k <= 1; k++) {
                    octx.beginPath();
                    octx.moveTo(x + w / 2, y + h * 0.55);
                    octx.quadraticCurveTo(x + w / 2 + k * w * 0.55 + sway, y + h * 0.14, x + w / 2 + k * w * 0.36 + sway, y - 2);
                    octx.stroke();
                    octx.beginPath();
                    octx.ellipse(x + w / 2 + k * w * 0.36 + sway, y - 2, 2.6, 4.2, k * 0.5, 0, Math.PI * 2);
                    octx.fillStyle = SAGE; octx.globalAlpha = 0.85; octx.fill(); octx.globalAlpha = 1;
                }
            } else if (f.t === 'shelf') {
                rr(x, y, w, h, 6); octx.fillStyle = WOOD; octx.fill(); octx.strokeStyle = line; octx.lineWidth = 1.5; octx.stroke();
                octx.strokeStyle = line;
                for (let k = 1; k <= 2; k++) { octx.beginPath(); octx.moveTo(x + 4, y + (h / 3) * k); octx.lineTo(x + w - 4, y + (h / 3) * k); octx.stroke(); }
                // tiny books
                const cols = ['', BLUSH, SAGE, '', BLUSH];
                for (let k = 0; k < 3; k++) {
                    const bx = x + 7 + k * 8, by = y + 6;
                    octx.fillStyle = cols[k + 1] || dim; octx.globalAlpha = 0.8;
                    octx.fillRect(bx, by, 5, h / 3 - 12); octx.globalAlpha = 1;
                }
            } else { // desks
                rr(x, y, w, h, 9); octx.fillStyle = WOOD; octx.fill(); octx.strokeStyle = line; octx.lineWidth = 1.5; octx.stroke();
                // laptop with glowing screen
                const lx = x + w * 0.36, ly = y + h * 0.24, lw = w * 0.28, lh = h * 0.42;
                rr(lx, ly, lw, lh, 3); octx.fillStyle = text; octx.globalAlpha = 0.88; octx.fill(); octx.globalAlpha = 1;
                rr(lx + 2.5, ly + 2.5, lw - 5, lh - 5, 2);
                octx.fillStyle = accentCss || dim; octx.globalAlpha = 0.35 + 0.12 * Math.sin(now * 2 + x); octx.fill(); octx.globalAlpha = 1;
                // blush mug
                octx.beginPath(); octx.arc(x + w * 0.82, y + h * 0.5, 4, 0, Math.PI * 2);
                octx.fillStyle = BLUSH; octx.fill(); octx.strokeStyle = line; octx.lineWidth = 1; octx.stroke();
                // chair with back
                const cx = x + w * 0.5, cy = y + h + 17;
                octx.beginPath(); octx.arc(cx, cy, 11, 0, Math.PI * 2);
                octx.fillStyle = BLUSH; octx.globalAlpha = 0.92; octx.fill(); octx.globalAlpha = 1;
                octx.strokeStyle = line; octx.lineWidth = 1.4; octx.stroke();
                octx.beginPath(); octx.arc(cx, cy, 14, Math.PI * 0.15, Math.PI * 0.85); octx.stroke();
                // label
                octx.fillStyle = dim; octx.font = '10px "JetBrains Mono", monospace'; octx.textAlign = 'center';
                octx.fillText(f.t === 'desk' ? "Junica's desk" : 'Guest desk', x + w / 2, y - 8);
            }
        });
        // movement
        const sp = 0.0042;
        let dx = 0, dy = 0;
        if (keys.has('left')) dx -= 1; if (keys.has('right')) dx += 1;
        if (keys.has('up')) dy -= 1; if (keys.has('down')) dy += 1;
        if (dx || dy) {
            const m = Math.hypot(dx, dy); dx /= m; dy /= m;
            const nx = Math.min(0.96, Math.max(0.04, player.x + dx * sp));
            const ny = Math.min(0.93, Math.max(0.07, player.y + dy * sp * (oW / oH)));
            const pr = player.r;
            const hits = f => {
                const fx = f.x * oW, fy = f.y * oH, fw = f.w * oW, fh = f.h * oH;
                const px = nx * oW, py = ny * oH;
                return px + pr > fx && px - pr < fx + fw && py + pr > fy && py - pr < fy + fh;
            };
            if (!FURN.some(hits)) { player.x = nx; player.y = ny; }
            player.bob += 0.25;
        }
        // broadcast my position (throttled) so other open tabs see me live
        const nowMs = performance.now();
        if (ccChan && nowMs - lastPosTx > 120) {
            lastPosTx = nowMs;
            const msg = { type: 'pos', id: ccId, name: (ccMe.name || 'Guest'), x: player.x, y: player.y };
            ccChan.postMessage(msg);
            ccRelaySend(msg);
        }
        // ghost visitors from other tabs — keep in sync with peersHas() online window
        const cutoff = Date.now() - 12000;
        peers.forEach((g, id) => {
            if (g.last < cutoff) { peers.delete(id); return; }
            const gx = g.x * oW, gy = g.y * oH;
            octx.globalAlpha = 0.15; octx.fillStyle = '#000';
            octx.beginPath(); octx.ellipse(gx, gy + 15, 9, 3.5, 0, 0, Math.PI * 2); octx.fill();
            octx.globalAlpha = 0.75;
            octx.beginPath(); octx.arc(gx, gy, 11, 0, Math.PI * 2);
            octx.fillStyle = ccAvatarColor(g.name); octx.fill();
            octx.strokeStyle = cssVar('--bg', '#fff'); octx.lineWidth = 2; octx.stroke();
            octx.fillStyle = '#fff'; octx.font = '700 9px Inter, sans-serif'; octx.textAlign = 'center'; octx.textBaseline = 'middle';
            octx.fillText(g.name.slice(0, 2).toUpperCase(), gx, gy + 0.5);
            octx.globalAlpha = 1;
            octx.fillStyle = dim; octx.font = '9px "JetBrains Mono", monospace';
            octx.fillText(g.name.slice(0, 10), gx, gy - 18);
        });
        updatePresence();
        // me
        const px = player.x * oW, py = player.y * oH + Math.sin(player.bob) * 1.6;
        octx.beginPath(); octx.ellipse(px, py + player.r + 4, player.r * 0.85, 4, 0, 0, Math.PI * 2);
        octx.fillStyle = 'rgba(0,0,0,.18)'; octx.fill();
        octx.beginPath(); octx.arc(px, py, player.r + 3, 0, Math.PI * 2);
        octx.strokeStyle = accentCss || text; octx.globalAlpha = 0.35; octx.lineWidth = 2; octx.stroke(); octx.globalAlpha = 1;
        octx.beginPath(); octx.arc(px, py, player.r, 0, Math.PI * 2);
        octx.fillStyle = accentCss || text; octx.fill();
        octx.strokeStyle = cssVar('--bg', '#fff'); octx.lineWidth = 2; octx.stroke();
        octx.fillStyle = cssVar('--accent-ink', '#fff'); octx.font = '700 10px Inter, sans-serif'; octx.textAlign = 'center'; octx.textBaseline = 'middle';
        octx.fillText((ccMe.name || 'You').slice(0, 2).toUpperCase(), px, py + 0.5);
        if (commOpen) commRaf = requestAnimationFrame(drawOffice);
    }
    const KEYMAP = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right', w: 'up', s: 'down', a: 'left', d: 'right', W: 'up', S: 'down', A: 'left', D: 'right' };
    window.addEventListener('keydown', e => {
        if (!commOpen) return;
        const tag = (document.activeElement || {}).tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        const k = KEYMAP[e.key]; if (k) { keys.add(k); e.preventDefault(); }
    });
    window.addEventListener('keyup', e => { const k = KEYMAP[e.key]; if (k) keys.delete(k); });
    $$('#officeDpad button').forEach(b => {
        const dir = b.dataset.dir;
        const on = e => { e.preventDefault(); keys.add(dir); };
        const off = () => keys.delete(dir);
        b.addEventListener('pointerdown', on);
        b.addEventListener('pointerup', off); b.addEventListener('pointerleave', off); b.addEventListener('pointercancel', off);
    });

    /* ----- Community chat (BroadcastChannel demo realtime + local history) ----- */
    const ccMsgs = $('#ccMsgs'), ccJoin = $('#ccJoin'), ccForm = $('#ccForm');
    let ccMe = store.get('commMe', null) || {};
    let ccChan = null;
    try { ccChan = new BroadcastChannel('jmj-community'); } catch { }
    function ccHistory() { return store.get('commLog', []); }
    function ccSaveHistory(list) { store.set('commLog', list.slice(-60)); }
    let lastPresence = '';
    function updatePresence() {
        let onlinePeers = 0;
        const now = Date.now();
        peers.forEach(g => { if (now - g.last < 12000) onlinePeers++; });
        const n = onlinePeers + (ccMe && ccMe.name ? 1 : 0);
        const where = ccMe && ccMe.geo ? ' \u00b7 ' + ccMe.geo : '';
        const label = ccMe && ccMe.name
            ? `${n} online \u00b7 ${ccMe.name}${where}`
            : `${Math.max(n, 0)} online`;
        if (label !== lastPresence) { lastPresence = label; $('#ccPresence').textContent = label; }
    }
    function relTime(ts) {
        const m = Math.max(0, Math.round((Date.now() - ts) / 60000));
        if (m < 1) return 'just now';
        if (m < 60) return m + 'm ago';
        const hr = Math.round(m / 60);
        if (hr < 24) return hr + 'h ago';
        return Math.round(hr / 24) + 'd ago';
    }
    function absTime(ts) {
        // Exact local clock time, e.g. "9:10 PM"
        try { return new Date(ts).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }); }
        catch { return ''; }
    }
    function ccAvatarColor(name) {
        let hash = 0; for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) % 360;
        return `hsl(${hash} 55% 52%)`;
    }
    // Deterministic hash → stable avatar features per name
    function ccHash(name) {
        let h = 2166136261;
        for (const ch of (name || '?')) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
        return (h >>> 0);
    }
    // Procedural line-art portrait — minimalist monochrome faces (like the reference,
    // but redrawn to match the portfolio). Each name yields a unique, stable face.
    function ccAvatar(name, online, gender) {
        const h = ccHash(name);
        const pick = (shift, mod) => ((h >> shift) & 0xff) % mod;
        const face = ['M18 30c0-8 4-13 12-13s12 5 12 13-5 14-12 14-12-6-12-14z',           // oval
            'M17 29c0-7 5-12 13-12s13 5 13 12-4 15-13 15-13-8-13-15z',            // round
            'M18 28c0-7 5-11 12-11s12 4 12 11-3 16-12 16-12-9-12-16z'][pick(2, 3)]; // long
        // Gendered hairstyles — women get longer/flowing styles, men get shorter cuts.
        const womanHair = [
            'M13 30c0-12 7-18 17-18s17 6 17 18c0 8-1 12-2 20l-3-1c1-6 1-10 1-15-2 3-6 4-13 4s-11-1-13-4c0 5 0 9 1 15l-3 1c-1-8-2-12-2-20z', // long straight
            'M12 30c0-13 8-19 18-19s18 6 18 19c1 6-1 12-3 17l-3-2c1-3 2-6 1-9-2 3-3 4-5 4 1-2 1-4 0-6-2 3-8 5-14 4-4-1-7-3-8-7-1 3-1 8 0 12l-3 1c-2-6-2-11-2-18z', // wavy long
            'M14 27c0-9 7-15 16-15s16 6 16 15c0 7-1 11-2 15l-2-1c1-4 1-7 1-11-2 3-6 4-13 4s-9-1-11-4c-1 4-1 8 0 12l-3 1c-1-5-2-9-2-16z'  // shoulder bob
        ][pick(10, 3)];
        const manHair = [
            'M15 30c0-11 6-16 15-16s15 5 15 16c0-5-3-9-6-9 1 2 1 4 0 5-2-4-6-6-9-6s-7 2-9 6c-1-1-1-3 0-5-3 0-6 4-6 9z', // short
            'M16 24c2-6 7-9 14-9s12 3 14 9c-2-2-4-3-6-3 1 1 2 2 2 4-3-2-6-3-10-3s-7 1-10 3c0-2 1-3 2-4-2 0-4 1-6 3z', // buzz
            'M15 28c1-9 7-14 15-14s14 5 15 14c0-4-2-7-5-8 1 2 0 4-1 5-1-3-5-5-9-5-3 0-6 1-8 4-1-1-1-3 0-5-3 1-6 5-7 9z' // crew
        ][pick(10, 3)];
        const g = gender === 'man' ? 'man' : (gender === 'woman' ? 'woman' : (pick(30, 2) ? 'woman' : 'man'));
        const hair = g === 'woman' ? womanHair : manHair;
        const brow = pick(18, 2) ? 'M23 27h5M32 27h5' : 'M23 28q2.5-1.5 5 0M32 28q2.5-1.5 5 0';
        const mouth = ['M25 37q5 3 10 0', 'M26 37q4 2 8 0', 'M25 37h10'][pick(20, 3)];
        const glasses = pick(24, 3) === 0
            ? '<circle cx="26" cy="31" r="3.4" fill="none"/><circle cx="34" cy="31" r="3.4" fill="none"/><path d="M29.4 31h1.2M22.6 30.5l-1.6-.5M37.4 30.5l1.6-.5"/>'
            : '';
        // small accent earring for woman variants adds a subtle on-brand color pop
        const earring = g === 'woman' && pick(28, 2)
            ? '<circle cx="18.5" cy="34" r="1.4" fill="hsl(var(--accent-h, 20) 70% 55%)" stroke="none"/><circle cx="41.5" cy="34" r="1.4" fill="hsl(var(--accent-h, 20) 70% 55%)" stroke="none"/>'
            : '';
        return `<span class="cc-ava${online ? ' on' : ''}" title="${name}">
      <svg viewBox="0 0 60 60" width="34" height="34" aria-hidden="true">
        <circle cx="30" cy="30" r="29" fill="var(--bg-elev, #fff)" stroke="var(--line-strong, #bbb)" stroke-width="1"/>
        <g fill="none" stroke="var(--text, #111)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="${face}"/>
          <path d="${hair}" fill="var(--text, #111)" stroke="none"/>
          <path d="${brow}"/>
          <path d="M25.5 31.5v.01M34.5 31.5v.01" stroke-width="2.4"/>
          <path d="${mouth}"/>
          ${glasses}
          ${earring}
        </g>
      </svg>
    </span>`;
    }
    // Owner mode: append #owner or ?owner=<key> to the URL, or run jmjOwner() in console.
    const OWNER_KEY = 'jmjguiao';
    let isOwner = store.get('commOwner', false)
        || location.hash.includes('owner')
        || new URLSearchParams(location.search).get('owner') === OWNER_KEY;
    if (isOwner) store.set('commOwner', true);
    window.jmjOwner = () => { isOwner = true; store.set('commOwner', true); if (commOpen) ccRerenderAll(); return 'Owner mode on — you can now delete messages.'; };

    const REACTIONS = ['\u2764\ufe0f', '\U0001f44d', '\U0001f602', '\U0001f62e', '\U0001f389'];
    function ccRerenderAll() {
        ccMsgs.innerHTML = '';
        ccRender({ sys: true, text: 'Chat updates live \u2014 be kind and say hi \u2728' }, false);
        ccHistory().slice(-60).forEach(m => ccRender(m, false));
        ccMsgs.scrollTop = ccMsgs.scrollHeight;
    }
    function ccFindMsg(mid) { return ccHistory().find(x => x.mid === mid); }
    function ccRender(m, scroll = true) {
        const el = document.createElement('div');
        if (m.sys) {
            el.className = 'cc-msg sys';
            el.innerHTML = `<p>${m.text}</p>`;
        } else {
            const mine = m.sid === ccId;
            el.className = 'cc-msg' + (mine ? ' me' : '');
            if (m.mid) el.dataset.mid = m.mid;
            const online = mine || peersHas(m.sid);
            const devIcon = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? '\u{1F4F1}' : '\u{1F5A5}\uFE0F';
            const when = `${absTime(m.ts)} \u00b7 ${relTime(m.ts)}`;
            const loc = (m.geo || m.country || '\u{1F310}') + ' ' + (m.dev || devIcon);
            // reply quote
            let quote = '';
            if (m.replyTo) {
                const parent = ccFindMsg(m.replyTo);
                if (parent) quote = `<div class="cc-quote"><b>${parent.name}</b><span>${parent.text}</span></div>`;
            }
            // reactions summary
            let reacts = '';
            if (m.reactions && Object.keys(m.reactions).length) {
                reacts = '<div class="cc-reacts">' + Object.entries(m.reactions)
                    .filter(([, users]) => users.length)
                    .map(([emo, users]) => `<button class="cc-react-chip${users.includes(ccId) ? ' mine' : ''}" data-react="${emo}">${emo} ${users.length}</button>`)
                    .join('') + '</div>';
            }
            el.innerHTML = `
        ${ccAvatar(m.name, online, m.gender)}
        <div class="cc-body">
          <div class="cc-meta"><b>${m.name}</b><span>${loc} \u00b7 ${when}</span></div>
          ${quote}
          <div class="cc-bubble-row">
            <p>${m.text}</p>
            <div class="cc-msg-actions">
              <button class="cc-act-btn cc-reply-btn" title="Reply" aria-label="Reply">
                <svg viewBox="0 0 24 24" width="14" height="14"><path d="M9 7L4 12l5 5M4 12h11a5 5 0 0 1 5 5v1" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
              <button class="cc-act-btn cc-react-btn" title="React" aria-label="Add reaction">
                <svg viewBox="0 0 24 24" width="14" height="14"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8.5 14a4 4 0 0 0 7 0M9 9.5h.01M15 9.5h.01" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
              </button>
              ${isOwner ? `<button class="cc-act-btn cc-del-btn" title="Delete" aria-label="Delete message">
                <svg viewBox="0 0 24 24" width="14" height="14"><path d="M5 7h14M10 7V5h4v2M6 7l1 13h10l1-13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>` : ''}
            </div>
          </div>
          ${reacts}
          <div class="cc-react-pop" hidden>${REACTIONS.map(r => `<button data-emo="${r}">${r}</button>`).join('')}</div>
        </div>`;
        }
        ccMsgs.appendChild(el);
        if (scroll) ccMsgs.scrollTop = ccMsgs.scrollHeight;
    }
    const esc = t => t.replace(/[<>&"]/g, ch => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[ch]));
    // A peer counts as online only if we heard from them in the last 12s.
    function peersHas(sid) {
        const g = peers.get(sid);
        return !!(g && Date.now() - g.last < 12000);
    }
    function ccApplyOp(m) {
        // Mutations that arrive from remote or local: react toggle, delete.
        const list = ccHistory();
        if (m.op === 'react') {
            const target = list.find(x => x.mid === m.mid);
            if (target) {
                target.reactions = target.reactions || {};
                target.reactions[m.emo] = target.reactions[m.emo] || [];
                const i = target.reactions[m.emo].indexOf(m.by);
                if (i >= 0) target.reactions[m.emo].splice(i, 1); else target.reactions[m.emo].push(m.by);
                if (!target.reactions[m.emo].length) delete target.reactions[m.emo];
                ccSaveHistory(list);
                if (commOpen) ccRerenderAll();
            }
        } else if (m.op === 'delete') {
            const idx = list.findIndex(x => x.mid === m.mid);
            if (idx >= 0) { list.splice(idx, 1); ccSaveHistory(list); if (commOpen) ccRerenderAll(); }
        }
    }
    function ccPush(m, broadcast) {
        if (m.mid) ccSeen.add(m.mid); // remember so relay/broadcast echoes don't re-render
        const list = ccHistory(); list.push(m); ccSaveHistory(list);
        ccRender(m);
        if (broadcast && ccChan) ccChan.postMessage(m);
        if (broadcast) ccRelaySend(m); // cross-device realtime
    }
    function ccSendOp(op) {
        // apply locally + broadcast so everyone stays in sync
        ccApplyOp(op);
        if (ccChan) ccChan.postMessage(op);
        ccRelaySend(op);
    }
    if (ccChan) ccChan.onmessage = ev => {
        const m = ev.data; if (!m) return;
        if (m.type === 'pos') { if (m.id !== ccId) peers.set(m.id, { name: m.name || 'Guest', x: m.x, y: m.y, last: Date.now() }); return; }
        if (m.type === 'bye') { peers.delete(m.id); return; }
        if (m.op) { ccApplyOp(m); return; }
        if (m.text) {
            if (m.sid === ccId) return;
            if (m.mid && ccSeen.has(m.mid)) return;
            if (m.mid) ccSeen.add(m.mid);
            const list = ccHistory(); list.push(m); ccSaveHistory(list); if (commOpen) ccRender(m);
        }
    };
    async function ccGeo() {
        // Privacy-conscious: show only an approximate, IP-based general location
        // (city/municipality + country). No IP address is shown. Never uses GPS.
        // Queries multiple providers and prefers the most specific place name.
        async function tryIpwho() {
            const ctl = new AbortController(); setTimeout(() => ctl.abort(), 3500);
            const res = await fetch('https://ipwho.is/', { signal: ctl.signal });
            const d = await res.json();
            if (d && d.success === false) throw new Error('ipwho failed');
            return { city: d.city, region: d.region, cc: d.country_code || '' };
        }
        async function tryIpapi() {
            const ctl = new AbortController(); setTimeout(() => ctl.abort(), 3500);
            const res = await fetch('https://ipapi.co/json/', { signal: ctl.signal });
            const d = await res.json();
            return { city: d.city, region: d.region, cc: d.country_code || d.country || '' };
        }
        async function tryGeojs() {
            const ctl = new AbortController(); setTimeout(() => ctl.abort(), 3500);
            const res = await fetch('https://get.geojs.io/v1/ip/geo.json', { signal: ctl.signal });
            const d = await res.json();
            return { city: d.city, region: d.region, cc: d.country_code || '' };
        }
        // Prefer providers that resolve municipality-level names; fall back in order.
        let d = null;
        for (const fn of [tryIpwho, tryIpapi, tryGeojs]) {
            try { d = await fn(); if (d && (d.city || d.region)) break; } catch { /* next */ }
        }
        if (!d) return { label: '\u{1F310} Unknown', cc: '\u{1F310}' };
        const cc = d.cc || '';
        // "City, CC" (e.g. "Lubao, PH"); prefer the most specific place name available.
        const spot = d.city || d.region || '';
        const place = spot ? `${spot}${cc ? ', ' + cc : ''}` : (cc || '\u{1F310}');
        return { label: place, cc: cc || '\u{1F310}' };
    }
    function ccEnter() {
        ccJoin.hidden = true; ccMsgs.hidden = false; ccForm.hidden = false;
        ccRerenderAll();
        updatePresence();
    }
    // Lightweight profanity filter — masks common inappropriate words (with light
    // leet-speak normalization) so they never render in the chat.
    const BAD_WORDS = ['fuck', 'shit', 'bitch', 'asshole', 'bastard', 'cunt', 'dick', 'piss', 'slut', 'whore', 'faggot', 'nigger', 'nigga', 'retard', 'douche', 'pussy', 'cock', 'motherfucker', 'wtf', 'stfu', 'putangina', 'tangina', 'gago', 'puta', 'ulol', 'tarantado', 'lintik', 'pakyu', 'bobo', 'kupal', 'hayop ka', 'punyeta', 'peste', 'hindot', 'kantot', 'iyot', 'burat', 'titi', 'pekpek', 'tae'];
    function bwPattern(w) {
        return new RegExp('\\b' + w.split('').map(ch => {
            const map = { a: '[a@4]', e: '[e3]', i: '[i1!]', o: '[o0]', s: '[s$5]', t: '[t7]', u: '[u]' };
            return map[ch] || ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }).join('') + '\\b', 'gi');
    }
    const BW_PATTERNS = BAD_WORDS.map(bwPattern);
    function hasProfanity(text) { return BW_PATTERNS.some(p => { p.lastIndex = 0; return p.test(text); }); }
    function cleanProfanity(text) {
        let out = text;
        for (const p of BW_PATTERNS) { p.lastIndex = 0; out = out.replace(p, m => m[0] + '*'.repeat(Math.max(1, m.length - 1))); }
        return out;
    }
    let ccNoticeTimer = null;
    function ccShowNotice(msg) {
        const n = $('#ccNotice'); if (!n) return;
        n.textContent = msg; n.hidden = false; n.classList.add('show');
        clearTimeout(ccNoticeTimer);
        ccNoticeTimer = setTimeout(() => { n.classList.remove('show'); setTimeout(() => { n.hidden = true; }, 250); }, 3200);
    }

    // Reply state
    let ccReplyTo = null;
    function setReply(mid) {
        const parent = ccFindMsg(mid); if (!parent) return;
        ccReplyTo = mid;
        $('#ccReplyName').textContent = parent.name;
        $('#ccReplyText').textContent = parent.text;
        $('#ccReplyBar').hidden = false;
        $('#ccText').focus();
    }
    function clearReply() { ccReplyTo = null; $('#ccReplyBar').hidden = true; }
    $('#ccReplyCancel').addEventListener('click', clearReply);

    // Delegated actions inside the message list (reply / react / delete)
    ccMsgs.addEventListener('click', e => {
        const msgEl = e.target.closest('.cc-msg'); if (!msgEl) return;
        const mid = msgEl.dataset.mid; if (!mid) return;
        if (e.target.closest('.cc-reply-btn')) { setReply(mid); sfx('click'); return; }
        if (e.target.closest('.cc-del-btn')) {
            if (isOwner) { ccSendOp({ op: 'delete', mid }); sfx('switch'); }
            return;
        }
        if (e.target.closest('.cc-react-btn')) {
            const pop = $('.cc-react-pop', msgEl);
            if (pop) { $$('.cc-react-pop').forEach(p => { if (p !== pop) p.hidden = true; }); pop.hidden = !pop.hidden; }
            return;
        }
        const emoBtn = e.target.closest('.cc-react-pop [data-emo]');
        if (emoBtn) {
            ccSendOp({ op: 'react', mid, emo: emoBtn.dataset.emo, by: ccId });
            $('.cc-react-pop', msgEl).hidden = true; sfx('click'); return;
        }
        const chip = e.target.closest('.cc-react-chip');
        if (chip) { ccSendOp({ op: 'react', mid, emo: chip.dataset.react, by: ccId }); sfx('click'); return; }
    });

    // Gender selection on join
    let ccGender = 'woman';
    $$('.cc-gender-opt').forEach(btn => btn.addEventListener('click', () => {
        ccGender = btn.dataset.gender;
        $$('.cc-gender-opt').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
        sfx('click');
    }));

    $('#ccJoinForm').addEventListener('submit', async e => {
        e.preventDefault();
        const raw = ($('#ccName').value || '').trim();
        if (!raw) { ccShowNotice('Please enter a username to join the chat.'); $('#ccName').focus(); return; }
        if (hasProfanity(raw)) { ccShowNotice('Please choose a username without inappropriate language.'); return; }
        const name = esc(raw);
        const geo = await ccGeo();
        ccMe = { name, gender: ccGender, country: geo.cc, geo: geo.label, joined: Date.now() };
        store.set('commMe', ccMe);
        ccEnter();
        ccPush({ mid: 'm' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), sys: true, text: `${name} joined from ${geo.label}` }, true);
        ccRelaySend({ type: 'hello', id: ccId, name: ccMe.name, geo: ccMe.geo, x: player.x, y: player.y });
        sfx('unlock');
    });
    ccForm.addEventListener('submit', e => {
        e.preventDefault();
        if (!ccMe || !ccMe.name) { ccShowNotice('Please enter a username to join first.'); return; }
        const raw = ($('#ccText').value || '').trim();
        if (!raw) return;
        // Block inappropriate language in English or Filipino — do not send.
        if (hasProfanity(raw)) {
            ccShowNotice('\u26a0 Inappropriate language isn\u2019t allowed. Please rephrase your message.');
            return;
        }
        const text = esc(raw);
        const mid = 'm' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
        const dev = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? '\u{1F4F1}' : '\u{1F5A5}\uFE0F';
        ccPush({ mid, sid: ccId, name: ccMe.name, gender: ccMe.gender, country: ccMe.country, geo: ccMe.geo, dev, ts: Date.now(), text, replyTo: ccReplyTo || undefined }, true);
        $('#ccText').value = '';
        clearReply();
        sfx('click');
    });
    let ccHeartbeat = null;
    function openCommunity() {
        lastFocused = document.activeElement;
        communityModal.classList.add('open'); communityModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        commOpen = true;
        sizeOffice(); refreshAccentCss();
        if (!ccWs) ccRelayConnect(); // join the cross-device room
        cancelAnimationFrame(commRaf); commRaf = requestAnimationFrame(drawOffice);
        if (ccMe && ccMe.name) ccEnter(); else { ccJoin.hidden = false; ccMsgs.hidden = true; ccForm.hidden = true; }
        // Heartbeat: keep presence fresh + prune peers who went offline
        clearInterval(ccHeartbeat);
        ccHeartbeat = setInterval(() => {
            const now = Date.now();
            let changed = false;
            peers.forEach((g, id) => { if (now - g.last > 12000) { peers.delete(id); changed = true; } });
            if (ccMe && ccMe.name) {
                const hb = { type: 'pos', id: ccId, name: ccMe.name, x: player.x, y: player.y };
                if (ccChan) ccChan.postMessage(hb);
                ccRelaySend(hb);
            }
            updatePresence();
            if (changed && commOpen) { /* presence text already refreshed */ }
        }, 4000);
        officeCanvas.focus({ preventScroll: true });
        sfx('pop');
    }
    function closeCommunity() {
        commOpen = false; cancelAnimationFrame(commRaf);
        clearInterval(ccHeartbeat);
        const bye = { type: 'bye', id: ccId };
        if (ccChan) ccChan.postMessage(bye);
        ccRelaySend(bye);
        keys.clear();
        communityModal.classList.remove('open'); communityModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (lastFocused) lastFocused.focus();
    }
    $('#communityFab').addEventListener('click', openCommunity);
    $('#communityClose').addEventListener('click', closeCommunity);
    communityModal.addEventListener('click', e => { if (e.target === communityModal) closeCommunity(); });
    window.addEventListener('resize', () => { if (commOpen) sizeOffice(); });

    /* ---------- Edit Preferences: category quick-nav ---------- */
    (function buildPrefNav() {
        const nav = $('#prefNav'); if (!nav) return;
        $$('#appearancePanel .pref-section').forEach((g, i) => {
            const label = $('.pref-cat', g); if (!label) return;
            if (!g.id) g.id = 'pg-' + i;
            const b = document.createElement('button');
            b.type = 'button'; b.textContent = label.textContent;
            b.addEventListener('click', () => {
                g.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
                sfx('click');
            });
            nav.appendChild(b);
        });
    })();

    /* ===================== DEV CONSOLE EASTER EGG ===================== */
    console.log('%c👋 Hello, fellow developer!', 'font-size:18px;font-weight:bold;color:#8B84FF;');
    console.log("%cThanks for checking out this portfolio.\nBuilt with care by Junica Marsen Jem Guiao.\nLet's connect → https://www.linkedin.com/in/junicamarsenjem-guiao", 'font-size:13px;');
});