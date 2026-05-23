# Implementation Plan: portfolio-web-jeferson

## Overview

Implementação do portfolio web profissional de Jeferson Rodrigo em Next.js 14 com App Router, TypeScript strict, Tailwind CSS e Framer Motion. A implementação segue a arquitetura definida no design: Server Components por padrão, `'use client'` apenas onde há interatividade, dados estáticos centralizados em `lib/data.ts` e deploy na Vercel.

## Tasks

- [x] 1. Setup do projeto e configuração base
  - [x] 1.1 Criar `package.json` com todas as dependências e devDependencies definidas no design
    - Incluir `next@14.2.x`, `react@18.3.x`, `react-dom@18.3.x`, `framer-motion@11.x`, `clsx@2.x`, `tailwind-merge@2.x`
    - Incluir devDependencies: `typescript@5.x`, `@types/node@20.x`, `@types/react@18.x`, `@types/react-dom@18.x`, `tailwindcss@3.4.x`, `postcss@8.x`, `autoprefixer@10.x`, `vitest@1.x`, `@testing-library/react@15.x`, `@testing-library/jest-dom@6.x`, `fast-check@3.x`
    - Adicionar scripts: `dev`, `build`, `start`, `lint`, `test`
    - _Requirements: 14.1, 14.6_

  - [x] 1.2 Criar `tsconfig.json` com strict mode e path alias
    - Configurar `strict: true`, `noEmit: true`, `jsx: "preserve"`, `moduleResolution: "bundler"`
    - Configurar path alias `@/*` → `./*`
    - _Requirements: 14.6_

  - [x] 1.3 Criar `next.config.ts` com remotePatterns para ghchart.rshah.org
    - Configurar `images.remotePatterns` para `https://ghchart.rshah.org`
    - _Requirements: 14.4_

  - [x] 1.4 Criar `tailwind.config.ts` com todos os design tokens
    - Definir cores: `bg`, `surface`, `border`, `border-hover`, `text-primary`, `text-secondary`, `text-muted`, `accent`
    - Definir fontFamily: `heading`, `body`, `mono`
    - Definir keyframes e animations: `marquee`, `pulse-dot`, `cursor-blink`
    - Definir `maxWidth.content: '1100px'`
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.7_

  - [x] 1.5 Criar `postcss.config.js` com tailwindcss e autoprefixer
    - _Requirements: 13.7_

- [x] 2. Data Layer — interfaces e dados estáticos
  - [x] 2.1 Criar `lib/data.ts` com todas as interfaces TypeScript e dados exportados
    - Definir interfaces: `Project`, `Skill`, `Achievement`, `PersonalInfo`
    - Definir type `SkillCategory = 'Language' | 'Framework' | 'Databases' | 'Tools' | 'Cloud'`
    - Exportar `personalInfo`, `projects` (5 projetos, 3 com `featured: true`), `skills` (15 skills), `achievements` (5 achievements)
    - Garantir que `id` de cada projeto seja kebab-case único, `stack` tenha ao menos 1 item, `status` seja union type válido
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8_

  - [ ]* 2.2 Escrever property test para unicidade de números em projetos featured (Property 1)
    - **Property 1: Unicidade de números em projetos featured**
    - **Validates: Requirements 5.2, 11.5**
    - Usar fast-check para gerar arrays de projetos e verificar que números featured são únicos

  - [ ]* 2.3 Escrever property test para limite de projetos featured (Property 2)
    - **Property 2: Limite de projetos featured**
    - **Validates: Requirements 5.2, 11.6**
    - Verificar que `projects.filter(p => p.featured).length <= 3`

  - [ ]* 2.4 Escrever property test para categorias de skills válidas (Property 3)
    - **Property 3: Categorias de skills são sempre válidas**
    - **Validates: Requirements 6.10, 11.7**
    - Verificar que toda skill pertence ao SkillCategory union type

  - [ ]* 2.5 Escrever property test para stack de projeto com ao menos 1 item (Property 7)
    - **Property 7: Stack de projeto tem ao menos 1 item**
    - **Validates: Requirements 11.3**
    - Verificar que `projects.every(p => p.stack.length >= 1)`

- [ ] 3. Layout raiz e componentes globais
  - [ ] 3.1 Criar `app/layout.tsx` com RootLayout, fontes e metadata SEO
    - Carregar `Instrument_Serif` e `DM_Sans` via `next/font/google` com variáveis CSS `--font-heading` e `--font-body`
    - Definir `metadata` completo com `title`, `description`, `openGraph` (locale `pt_BR`) e `twitter.card: 'summary_large_image'`
    - Renderizar `<html lang="pt-BR">` com Navbar e Footer ao redor de `{children}`
    - _Requirements: 1.2, 12.1, 12.2, 12.3, 12.4, 12.5, 12.6_

  - [~] 3.2 Criar `components/Navbar.tsx` como Client Component
    - Usar `usePathname()` para detectar rota ativa e aplicar indicador visual
    - Aplicar `position: fixed`, `backdrop-filter: blur(12px)`, `background: rgba(10,10,10,0.85)`
    - Detectar scroll com `useEffect` para adicionar border-bottom sutil além de 0px
    - Implementar menu hamburguer para mobile (sm breakpoint) com estado de abertura
    - Renderizar links externos com `rel="noopener noreferrer"` e `target="_blank"`
    - _Requirements: 1.2, 1.3, 1.4, 1.5, 1.6, 1.7_

  - [~] 3.3 Criar `components/Footer.tsx` como Server Component
    - Exibir nome, handle e links de redes sociais com `rel="noopener noreferrer"` e `target="_blank"`
    - _Requirements: 1.2_

- [ ] 4. Componentes utilitários de UI
  - [~] 4.1 Criar `components/ui/FadeUpWrapper.tsx` como Client Component
    - Implementar `motion.div` com `initial="hidden"`, `whileInView="visible"`, `viewport={{ once: true, amount: 0.1 }}`
    - Definir `fadeUpVariants` com `hidden: { opacity: 0, y: 20 }` e `visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }`
    - Aceitar prop `delay?: number` para stagger incremental
    - _Requirements: 8.4, 5.7_

  - [~] 4.2 Criar `components/ui/ProjectCard.tsx` como Client Component
    - Exibir número em Instrument Serif com cor accent dourada
    - Exibir título com `hover:text-accent`, stack em pills (`bg-surface border border-border rounded-full`)
    - Exibir dot pulsante verde para `status: 'active'` e amarelo para `status: 'wip'`
    - Renderizar links GitHub/live com `rel="noopener noreferrer"` e `target="_blank"`
    - Implementar `variant="full"` que adiciona categoria em caps e data alinhada à direita
    - Aplicar `motion.div` com `initial={{ opacity: 0, y: 20 }}` e `viewport={{ once: true }}`
    - _Requirements: 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 8.2, 8.3_

- [ ] 5. Seções da Home — parte 1 (Hero, GitHub, About)
  - [~] 5.1 Criar `components/sections/HeroSection.tsx` como Client Component
    - Implementar `useCursorBlink()` hook com `setInterval(530ms)` e cleanup no unmount
    - Exibir headline "Jeferson Rodrigo" em Instrument Serif (`text-5xl md:text-7xl`)
    - Exibir subtítulo "Java Backend Developer" com cursor piscante
    - Renderizar dois CTAs: primário (accent dourado) e secundário (outline)
    - Implementar animação `fadeUp` com `containerVariants` (staggerChildren: 0.12, delayChildren: 0.2)
    - Exibir `hero-bg.png` via `next/image` com `object-cover` e overlay escuro
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

  - [~] 5.2 Criar `components/sections/GitHubSection.tsx` como Server Component
    - Renderizar `<img src="https://ghchart.rshah.org/c8b97a/imnotjef" alt="GitHub Activity Chart" loading="lazy" />`
    - Sem diretiva `'use client'`
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [~] 5.3 Criar `components/sections/AboutSection.tsx` como Client Component
    - Exibir nome, handle, cargo, localização e bio de `personalInfo`
    - Exibir métricas em grid de 3 colunas com label e valor
    - Exibir indicador de disponibilidade quando `personalInfo.availableForWork === true`
    - Aplicar animação de entrada com Framer Motion ao entrar no viewport
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 6. Seções da Home — parte 2 (Experience, Projects, Skills)
  - [~] 6.1 Criar `components/sections/ExperienceSection.tsx` como Client Component
    - Implementar linha vertical com 3 itens de experiência/formação com ícones japoneses
    - Aplicar animação de entrada com Framer Motion
    - _Requirements: 14.2_

  - [~] 6.2 Criar `components/sections/ProjectsPreview.tsx` como Client Component
    - Receber `projects: Project[]` (apenas featured) e renderizar usando `ProjectCard`
    - Exibir estado vazio com mensagem "Em breve" quando array estiver vazio
    - Aplicar animação de entrada com Framer Motion
    - _Requirements: 5.1, 5.2, 15.3_

  - [~] 6.3 Criar `components/sections/SkillsKeyboard.tsx` como Client Component
    - Implementar `useSkillFilter` com `useState<SkillCategory | 'All'>('All')` e `useMemo` para filtro
    - Renderizar botões de filtro para `['All', 'Language', 'Framework', 'Databases', 'Tools', 'Cloud']`
    - Renderizar grid de teclas estilo Mac com offset por `keyRow`
    - Implementar `KeyCap` com `whileHover={{ scale: 1.15, y: -4 }}` e `transition={{ type: 'spring', stiffness: 400, damping: 17 }}`
    - Aplicar `opacity: 0.3` nas teclas de categorias inativas
    - Exibir ícone e nome de cada skill dentro da tecla
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9_

  - [ ]* 6.4 Escrever property test para filtro de skills por categoria (Property 6)
    - **Property 6: Filtro de skills por categoria é um subconjunto válido**
    - **Validates: Requirements 6.3, 6.4, 11.7**
    - Usar fast-check para gerar arrays de skills e categorias, verificar que resultado é subconjunto válido

- [ ] 7. Seções da Home — parte 3 (Achievements, CTA)
  - [~] 7.1 Criar `components/sections/AchievementsSection.tsx` como Client Component
    - Implementar `useMarqueeItems` com `useMemo(() => [...items, ...items], [items])`
    - Renderizar cards com ícone, título, descrição e data
    - Aplicar `animate-marquee` (CSS `@keyframes marquee`) com `hover:[animation-play-state:paused]`
    - Exibir estado vazio sem executar marquee quando array estiver vazio
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 15.4_

  - [ ]* 7.2 Escrever property test para marquee doubled (Property 4)
    - **Property 4: Marquee doubled tem exatamente o dobro de itens**
    - **Validates: Requirements 7.2, 7.3**
    - Usar fast-check com `fc.array(fc.record(...), { minLength: 1 })` para verificar `doubled.length === items.length * 2`

  - [~] 7.3 Criar `components/sections/CTASection.tsx` como Client Component
    - Seção de chamada para ação com link para `/work` e contato
    - Aplicar animação de entrada com Framer Motion
    - _Requirements: 14.2_

- [~] 8. Checkpoint — componentes base
  - Garantir que todos os componentes compilam sem erros TypeScript (`npx tsc --noEmit`)
  - Garantir que os testes de propriedades passam (`npx vitest --run`)
  - Perguntar ao usuário se há ajustes antes de prosseguir com as páginas.

- [ ] 9. Páginas da aplicação
  - [~] 9.1 Criar `app/page.tsx` como Server Component (Home)
    - Importar todos os dados de `lib/data.ts` e filtrar `featuredProjects = projects.filter(p => p.featured)`
    - Renderizar seções em ordem: HeroSection, GitHubSection, AboutSection, ExperienceSection, ProjectsPreview, SkillsKeyboard, AchievementsSection, CTASection
    - Passar props corretas para cada seção
    - _Requirements: 2.1, 3.1, 4.1, 5.1, 6.1, 7.1, 14.1_

  - [~] 9.2 Criar `app/work/page.tsx` como Server Component
    - Importar `projects` de `lib/data.ts` e ordenar por `number` crescente
    - Renderizar cada projeto com `FadeUpWrapper` (delay `index * 0.08`) e `ProjectCard` com `variant="full"`
    - Definir `metadata` com title e description para a rota `/work`
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 12.1_

  - [ ]* 9.3 Escrever property test para ordenação de projetos na Work page (Property 5)
    - **Property 5: Projetos na Work page estão em ordem crescente**
    - **Validates: Requirements 8.1**
    - Usar fast-check para gerar arrays de projetos com números únicos e verificar ordenação

  - [~] 9.4 Criar `app/about/page.tsx` como Server Component
    - Exibir bio completa, localização, links de contato e histórico de formação de `personalInfo`
    - Exibir indicador de disponibilidade quando `personalInfo.availableForWork === true`
    - Definir `metadata` com title e description para a rota `/about`
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 12.1_

  - [~] 9.5 Criar `app/links/page.tsx` como Server Component
    - Exibir links para GitHub, LinkedIn e demais redes de `personalInfo` com `target="_blank" rel="noopener noreferrer"`
    - Exibir email quando `personalInfo.email` estiver definido
    - Definir `metadata` com title e description para a rota `/links`
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 12.1_

- [ ] 10. Assets públicos e tratamento de erros de imagem
  - [~] 10.1 Criar placeholder `public/hero-bg.png` e `public/profile-card.jpg`
    - Gerar imagens placeholder (pode ser 1x1 pixel ou imagem simples) para evitar erros 404
    - Garantir que `next/image` com `placeholder="blur"` e `blurDataURL` inline funciona para `profile-card.jpg`
    - _Requirements: 2.7, 15.2_

  - [ ]* 10.2 Escrever property test para links externos com atributos de segurança (Property 8)
    - **Property 8: Links externos têm atributos de segurança**
    - **Validates: Requirements 1.7, 5.8, 10.2**
    - Testar com @testing-library/react que links com `href` externo têm `rel="noopener noreferrer"` e `target="_blank"`

- [~] 11. Checkpoint final — integração e qualidade
  - Executar `npx tsc --noEmit` e garantir zero erros TypeScript
  - Executar `npx vitest --run` e garantir que todos os property tests passam
  - Verificar que `npm run build` completa sem erros
  - Perguntar ao usuário se há ajustes finais antes de considerar a implementação concluída.

## Notes

- Tarefas marcadas com `*` são opcionais e podem ser puladas para um MVP mais rápido
- Cada tarefa referencia requisitos específicos para rastreabilidade
- Os checkpoints garantem validação incremental antes de avançar
- Property tests usam `fast-check` conforme definido na Testing Strategy do design
- Unit tests usam `vitest` + `@testing-library/react`
- Todos os componentes com `motion.*` do Framer Motion devem ter `'use client'` no topo
- O projeto usa TypeScript strict — nenhum `any` explícito é permitido
- Imagens externas de `ghchart.rshah.org` já estão configuradas em `next.config.ts`

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.3"] },
    { "id": 1, "tasks": ["1.4", "1.5", "2.1"] },
    { "id": 2, "tasks": ["2.2", "2.3", "2.4", "2.5", "3.1"] },
    { "id": 3, "tasks": ["3.2", "3.3", "4.1", "4.2"] },
    { "id": 4, "tasks": ["5.1", "5.2", "5.3", "6.1"] },
    { "id": 5, "tasks": ["6.2", "6.3", "7.1", "7.3"] },
    { "id": 6, "tasks": ["6.4", "7.2", "9.1"] },
    { "id": 7, "tasks": ["9.2", "9.4", "9.5", "10.1"] },
    { "id": 8, "tasks": ["9.3", "10.2"] }
  ]
}
```
