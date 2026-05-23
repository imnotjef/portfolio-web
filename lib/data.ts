// lib/data.ts — Static data layer for portfolio
// All data is resolved at compile-time (no runtime fetch)

// ─── Types ────────────────────────────────────────────────────────────────────

export type SkillCategory = 'Language' | 'Framework' | 'Databases' | 'Tools' | 'Cloud'

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface Project {
  id: string                              // kebab-case unique slug
  number: number                          // sequential unique number
  title: string
  category: string
  description: string
  longDescription?: string
  stack: string[]                         // at least 1 item
  githubUrl?: string
  liveUrl?: string
  status: 'active' | 'wip' | 'archived'
  badge?: string
  date: string                            // "YYYY-MM" format
  featured: boolean                       // max 3 projects with true
}

export interface Skill {
  name: string
  category: SkillCategory
  icon?: string
  level?: 'beginner' | 'intermediate' | 'advanced'
  keyRow?: 0 | 1 | 2 | 3 | 4             // keyboard row (0 = number row, 4 = space row)
}

export interface Achievement {
  id: string
  level?: string
  title: string
  description: string
  icon: string
  date: string
  badge?: string
  category: 'community' | 'education' | 'certification' | 'project'
}

export interface PersonalInfo {
  name: string
  handle: string
  role: string
  location: string
  bio: string
  email?: string
  github: string
  linkedin?: string
  twitter?: string
  availableForWork: boolean
  metrics: {
    label: string
    value: string
  }[]
}

export interface Experience {
  date: string
  title: string
  company: string
  icon: string
  description: string
  tags: string[]
}

// ─── Personal Info ────────────────────────────────────────────────────────────

export const personalInfo: PersonalInfo = {
  name: 'Jeferson Rodrigo',
  handle: '@imnotjef',
  role: 'Java Backend Developer',
  location: 'São Paulo, Brasil',
  bio: 'Desenvolvedor Java Backend iniciante apaixonado por construir sistemas robustos e escaláveis. Buscando primeiro estágio para aplicar conhecimentos em Spring Boot, PostgreSQL e boas práticas de engenharia de software.',
  github: 'https://github.com/imnotjef',
  linkedin: 'https://linkedin.com/in/imnotjef',
  availableForWork: true,
  metrics: [
    { label: '32 semanas', value: 'Plano Java' },
    { label: '2025', value: 'FATEC São Roque' },
    { label: 'São Paulo', value: 'Disponível para estágio' },
  ],
}

// ─── Projects ─────────────────────────────────────────────────────────────────
// Constraint: max 3 projects with featured: true
// Constraint: id must be kebab-case unique
// Constraint: stack must have at least 1 item
// Constraint: number must be unique and sequential

export const projects: Project[] = [
  {
    id: 'sistema-bancario',
    number: 1,
    title: 'Sistema Bancário',
    category: 'Backend',
    description: 'Sistema bancário completo com operações de conta, transferências e extrato. Implementado com princípios de OOP e design patterns.',
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/imnotjef/sistema-bancario',
    status: 'wip',
    date: '2025-01',
    featured: true,
  },
  {
    id: 'portfolio-api',
    number: 2,
    title: 'Portfolio API',
    category: 'API',
    description: 'API REST para gerenciamento de dados do portfolio com autenticação JWT e documentação Swagger.',
    stack: ['Java', 'Spring Boot', 'Spring Security', 'PostgreSQL', 'Swagger'],
    githubUrl: 'https://github.com/imnotjef/portfolio-api',
    status: 'wip',
    date: '2025-02',
    featured: true,
  },
  {
    id: 'youtube-shorts-automator',
    number: 3,
    title: 'YouTube Shorts Automator',
    category: 'Automation',
    description: 'Automação para criação e upload de YouTube Shorts com geração de conteúdo via IA e fluxos n8n.',
    stack: ['n8n', 'IA', 'YouTube API', 'FFmpeg'],
    githubUrl: 'https://github.com/imnotjef/yt-shorts-automator',
    status: 'wip',
    date: '2025-03',
    featured: true,
    badge: 'Side Project',
  },
  {
    id: 'sampatech-hub',
    number: 4,
    title: 'sampatech-hub',
    category: 'Community',
    description: 'Hub da comunidade SampaTech para desenvolvedores de São Paulo. Repositório open source com recursos e links úteis.',
    stack: ['Markdown', 'GitHub', 'Open Source'],
    githubUrl: 'https://github.com/sampatech-hub',
    status: 'active',
    date: '2024-11',
    featured: false,
    badge: 'Fundador',
  },
  {
    id: 'github-readme',
    number: 5,
    title: 'GitHub README',
    category: 'Profile',
    description: 'README de perfil GitHub com estatísticas dinâmicas, badges e design customizado via GitHub Actions.',
    stack: ['Markdown', 'GitHub Actions', 'SVG'],
    githubUrl: 'https://github.com/imnotjef',
    status: 'active',
    date: '2024-09',
    featured: false,
  },
]

// ─── Skills ───────────────────────────────────────────────────────────────────
// Constraint: every skill must have a valid SkillCategory
// keyRow: 0 = number row, 1 = QWERTY row, 2 = ASDF row, 3 = ZXCV row, 4 = space row

export const skills: Skill[] = [
  // Languages — row 1 (QWERTY)
  { name: 'Java', category: 'Language', icon: '☕', level: 'intermediate', keyRow: 1 },
  { name: 'TypeScript', category: 'Language', icon: '🔷', level: 'beginner', keyRow: 1 },
  { name: 'Python', category: 'Language', icon: '🐍', level: 'beginner', keyRow: 1 },
  { name: 'SQL', category: 'Language', icon: '🗄️', level: 'intermediate', keyRow: 1 },

  // Frameworks — row 2 (ASDF)
  { name: 'Spring Boot', category: 'Framework', icon: '🍃', level: 'intermediate', keyRow: 2 },
  { name: 'Spring Security', category: 'Framework', icon: '🔒', level: 'beginner', keyRow: 2 },
  { name: 'Spring Data JPA', category: 'Framework', icon: '🗃️', level: 'beginner', keyRow: 2 },
  { name: 'Next.js', category: 'Framework', icon: '▲', level: 'beginner', keyRow: 2 },

  // Databases — row 3 (ZXCV)
  { name: 'PostgreSQL', category: 'Databases', icon: '🐘', level: 'intermediate', keyRow: 3 },
  { name: 'MySQL', category: 'Databases', icon: '🐬', level: 'beginner', keyRow: 3 },
  { name: 'H2', category: 'Databases', icon: '💾', level: 'beginner', keyRow: 3 },

  // Tools — row 4 (space row)
  { name: 'Git', category: 'Tools', icon: '🌿', level: 'intermediate', keyRow: 4 },
  { name: 'Docker', category: 'Tools', icon: '🐳', level: 'beginner', keyRow: 4 },
  { name: 'Maven', category: 'Tools', icon: '📦', level: 'intermediate', keyRow: 4 },
  { name: 'IntelliJ', category: 'Tools', icon: '🧠', level: 'intermediate', keyRow: 0 },

  // Cloud — row 0 (number row)
  { name: 'AWS', category: 'Cloud', icon: '☁️', level: 'beginner', keyRow: 0 },
  { name: 'Vercel', category: 'Cloud', icon: '▲', level: 'beginner', keyRow: 0 },
]

// ─── Achievements ─────────────────────────────────────────────────────────────

export const achievements: Achievement[] = [
  {
    id: 'sampatech-hub-fundador',
    level: 'Fundador',
    title: 'sampatech-hub',
    description: 'Fundador da comunidade open source de devs de São Paulo',
    icon: '🏙️',
    date: '2024-11',
    badge: 'Fundador',
    category: 'community',
  },
  {
    id: 'plano-32-semanas',
    level: 'Concluído',
    title: 'Plano 32 Semanas',
    description: 'Plano intensivo de estudos de Java Backend — 32 semanas de dedicação',
    icon: '📅',
    date: '2025-01',
    badge: 'Java',
    category: 'education',
  },
  {
    id: 'fatec-sao-roque',
    level: 'Cursando',
    title: 'FATEC São Roque',
    description: 'Análise e Desenvolvimento de Sistemas — FATEC São Roque',
    icon: '🎓',
    date: '2025-02',
    badge: 'ADS',
    category: 'education',
  },
  {
    id: 'aws-clf-c02',
    level: 'Planejado',
    title: 'AWS CLF-C02',
    description: 'AWS Certified Cloud Practitioner — em preparação',
    icon: '☁️',
    date: '2025-06',
    badge: 'AWS',
    category: 'certification',
  },
  {
    id: 'github-foundations',
    level: 'Planejado',
    title: 'GitHub Foundations',
    description: 'GitHub Foundations Certification — em preparação',
    icon: '🐙',
    date: '2025-05',
    badge: 'GitHub',
    category: 'certification',
  },
]

// ─── Experiences ──────────────────────────────────────────────────────────────
// Icons: Japanese kanji 壱 (1), 弐 (2), 参 (3)

export const experiences: Experience[] = [
  {
    date: '2025 — presente',
    title: 'Análise e Desenvolvimento de Sistemas',
    company: 'FATEC São Roque',
    icon: '壱',
    description: 'Cursando tecnólogo em ADS com foco em desenvolvimento de software, estruturas de dados e engenharia de sistemas.',
    tags: ['ADS', 'Algoritmos', 'Banco de Dados', 'Engenharia de Software'],
  },
  {
    date: '2024 — presente',
    title: 'Estudo Autodidata — Java Backend',
    company: 'Plano 32 Semanas',
    icon: '弐',
    description: 'Plano intensivo de 32 semanas cobrindo Java OOP, Spring Boot, Spring Security, PostgreSQL, Docker e boas práticas de API REST.',
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'REST API'],
  },
  {
    date: '2024 — presente',
    title: 'Fundador',
    company: 'sampatech-hub',
    icon: '参',
    description: 'Fundador e mantenedor do sampatech-hub, comunidade open source para desenvolvedores de São Paulo.',
    tags: ['Open Source', 'Comunidade', 'GitHub', 'São Paulo'],
  },
]
