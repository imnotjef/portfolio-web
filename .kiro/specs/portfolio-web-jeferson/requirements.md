# Requirements Document

## Introduction

Portfolio web profissional para Jeferson Rodrigo (@imnotjef), desenvolvedor Java Backend iniciante de São Paulo buscando primeiro estágio. A aplicação é construída em Next.js 14 com App Router, TypeScript strict, Tailwind CSS e Framer Motion, deployada na Vercel. O sistema apresenta 4 rotas públicas (Home, About, Work, Links), componentes interativos (SkillsKeyboard com spring animation, AchievementsSection com marquee infinito), dados estáticos centralizados em `lib/data.ts` e SEO completo com OpenGraph/Twitter Card em locale pt_BR.

---

## Glossary

- **Portfolio**: A aplicação web completa que representa o perfil profissional de Jeferson Rodrigo.
- **App_Router**: O sistema de roteamento do Next.js 14 baseado em sistema de arquivos dentro de `app/`.
- **Server_Component**: Componente React renderizado exclusivamente no servidor, sem bundle JS enviado ao cliente.
- **Client_Component**: Componente React com diretiva `'use client'`, hidratado no browser para interatividade.
- **Navbar**: Componente de navegação fixo presente em todas as rotas.
- **HeroSection**: Seção de abertura da Home com headline, subtítulo animado e CTAs.
- **GitHubSection**: Seção que exibe o gráfico de atividade do GitHub via embed externo.
- **AboutSection**: Seção com informações pessoais, bio e métricas do desenvolvedor.
- **ExperienceSection**: Seção com histórico de experiências e formação acadêmica.
- **ProjectsPreview**: Seção da Home que exibe os projetos com `featured: true`.
- **SkillsKeyboard**: Componente interativo que exibe skills como teclas de teclado Mac, filtráveis por categoria.
- **AchievementsSection**: Seção com conquistas exibidas em scroll marquee infinito horizontal.
- **CTASection**: Seção de chamada para ação ao final da Home.
- **ProjectCard**: Componente de card de projeto numerado, usado em ProjectsPreview e na rota /work.
- **WorkPage**: Rota `/work` que lista todos os projetos com variante `full` do ProjectCard.
- **AboutPage**: Rota `/about` com informações detalhadas sobre o desenvolvedor.
- **LinksPage**: Rota `/links` com links para redes sociais e contato.
- **Data_Layer**: Arquivo `lib/data.ts` que centraliza todos os dados estáticos tipados.
- **Project**: Interface TypeScript que representa um projeto do portfolio.
- **Skill**: Interface TypeScript que representa uma habilidade técnica.
- **Achievement**: Interface TypeScript que representa uma conquista ou certificação.
- **PersonalInfo**: Interface TypeScript que representa as informações pessoais do desenvolvedor.
- **SkillCategory**: Union type com os valores `'Language' | 'Framework' | 'Databases' | 'Tools' | 'Cloud'`.
- **FadeUpWrapper**: Componente utilitário que aplica animação fadeUp via IntersectionObserver.
- **Marquee**: Animação CSS de scroll horizontal infinito usada na AchievementsSection.
- **Design_Token**: Variável de design (cor, fonte, espaçamento) definida no `tailwind.config.ts`.
- **Accent**: Cor dourada `#c8b97a` usada como destaque visual em todo o portfolio.
- **Vercel**: Plataforma de deploy e CDN onde o portfolio é hospedado.

---

## Requirements

### Requisito 1: Estrutura de Rotas e Navegação

**User Story:** Como visitante, quero navegar entre as seções do portfolio de forma clara e intuitiva, para que eu possa encontrar as informações que procuro sem fricção.

#### Critérios de Aceitação

1. THE App_Router SHALL disponibilizar quatro rotas públicas: `/` (Home), `/about` (About), `/work` (Work) e `/links` (Links).
2. THE Navbar SHALL ser renderizado em todas as rotas como componente fixo no topo da página.
3. WHEN o usuário acessa qualquer rota, THE Navbar SHALL exibir o link correspondente à rota atual com indicador visual de estado ativo.
4. WHEN o usuário acessa o portfolio em dispositivo móvel, THE Navbar SHALL exibir um menu hamburguer que expande os links de navegação.
5. WHILE o usuário faz scroll na página, THE Navbar SHALL aplicar `backdrop-filter: blur(12px)` e `background: rgba(10,10,10,0.85)` para manter legibilidade.
6. WHEN o usuário faz scroll além de 0px, THE Navbar SHALL adicionar uma borda inferior sutil para separação visual.
7. THE Navbar SHALL renderizar links externos com atributo `rel="noopener noreferrer"` e `target="_blank"`.

---

### Requisito 2: Home — Seção Hero

**User Story:** Como recrutador, quero ver imediatamente quem é o desenvolvedor e o que ele faz, para que eu possa avaliar rapidamente se o perfil é relevante para a vaga.

#### Critérios de Aceitação

1. THE HeroSection SHALL exibir o nome "Jeferson Rodrigo" como headline principal em fonte Instrument Serif.
2. THE HeroSection SHALL exibir o cargo "Java Backend Developer" como subtítulo com cursor piscante animado.
3. WHEN o HeroSection é montado, THE HeroSection SHALL iniciar a alternância de visibilidade do cursor a cada 530ms via `setInterval`.
4. WHEN o HeroSection é desmontado, THE HeroSection SHALL limpar o intervalo do cursor para evitar memory leak.
5. THE HeroSection SHALL exibir dois botões CTA: um primário com cor accent dourada e um secundário com estilo outline.
6. WHEN o HeroSection entra no viewport, THE HeroSection SHALL executar animação de entrada `fadeUp` com stagger de 0.12s entre elementos filhos.
7. THE HeroSection SHALL exibir imagem de background `hero-bg.png` com `object-cover` e overlay escuro.

---

### Requisito 3: Home — Seção GitHub Activity

**User Story:** Como recrutador técnico, quero ver a atividade de commits do desenvolvedor no GitHub, para que eu possa avaliar sua consistência e engajamento com projetos.

#### Critérios de Aceitação

1. THE GitHubSection SHALL renderizar o gráfico de atividade do GitHub via `<img src="https://ghchart.rshah.org/c8b97a/imnotjef" />`.
2. THE GitHubSection SHALL aplicar `loading="lazy"` na imagem do gráfico para otimização de carregamento.
3. THE GitHubSection SHALL ser implementado como Server_Component sem diretiva `'use client'`.
4. IF a imagem do gráfico não carregar, THE GitHubSection SHALL exibir o texto alternativo "GitHub Activity Chart" via atributo `alt`.

---

### Requisito 4: Home — Seção About Me

**User Story:** Como recrutador, quero conhecer o perfil pessoal e as métricas do desenvolvedor, para que eu possa ter uma visão rápida de sua experiência e disponibilidade.

#### Critérios de Aceitação

1. THE AboutSection SHALL exibir o nome, handle, cargo, localização e bio provenientes de `personalInfo` no Data_Layer.
2. THE AboutSection SHALL exibir as métricas de `personalInfo.metrics` em grid de 3 colunas com label e valor.
3. WHEN `personalInfo.availableForWork` é `true`, THE AboutSection SHALL exibir indicador visual de disponibilidade para trabalho.
4. WHEN o AboutSection entra no viewport, THE AboutSection SHALL executar animação de entrada com Framer Motion.
5. THE AboutSection SHALL ser implementado como Client_Component com diretiva `'use client'`.

---

### Requisito 5: Home — Seção Projects Preview

**User Story:** Como recrutador, quero ver os projetos em destaque do desenvolvedor na página inicial, para que eu possa avaliar rapidamente a qualidade e variedade do trabalho.

#### Critérios de Aceitação

1. THE ProjectsPreview SHALL exibir apenas os projetos com `featured: true` provenientes do Data_Layer.
2. THE Data_Layer SHALL garantir que no máximo 3 projetos tenham `featured: true` simultaneamente.
3. THE ProjectCard SHALL exibir o número do projeto em Instrument Serif com cor accent dourada.
4. THE ProjectCard SHALL exibir título, descrição, stack em pills e links do projeto.
5. WHEN o status do projeto é `'active'`, THE ProjectCard SHALL exibir um dot pulsante verde.
6. WHEN o status do projeto é `'wip'`, THE ProjectCard SHALL exibir um dot pulsante amarelo.
7. WHEN o ProjectCard entra no viewport, THE ProjectCard SHALL executar animação `fadeUp` com `initial={{ opacity: 0, y: 20 }}` e `viewport={{ once: true }}`.
8. THE ProjectCard SHALL renderizar links externos com atributo `rel="noopener noreferrer"` e `target="_blank"`.

---

### Requisito 6: Home — SkillsKeyboard

**User Story:** Como visitante técnico, quero explorar as habilidades do desenvolvedor de forma interativa, para que eu possa identificar rapidamente as tecnologias que ele domina.

#### Critérios de Aceitação

1. THE SkillsKeyboard SHALL renderizar todas as skills provenientes do Data_Layer como teclas estilo Mac em grid com offset por linha.
2. THE SkillsKeyboard SHALL exibir botões de filtro para as categorias: `'All'`, `'Language'`, `'Framework'`, `'Databases'`, `'Tools'`, `'Cloud'`.
3. WHEN o usuário clica em uma categoria, THE SkillsKeyboard SHALL exibir apenas as skills da categoria selecionada.
4. WHEN o usuário clica em `'All'`, THE SkillsKeyboard SHALL exibir todas as skills sem filtro.
5. WHEN o usuário passa o mouse sobre uma tecla, THE SkillsKeyboard SHALL aplicar animação spring com `scale: 1.15` e `y: -4` usando `stiffness: 400` e `damping: 17`.
6. WHEN o usuário remove o mouse de uma tecla, THE SkillsKeyboard SHALL retornar a tecla ao estado original via spring animation.
7. WHILE uma categoria está ativa, THE SkillsKeyboard SHALL exibir as teclas de outras categorias com `opacity: 0.3`.
8. THE SkillsKeyboard SHALL exibir ícone e nome de cada skill dentro da tecla correspondente.
9. THE SkillsKeyboard SHALL ser implementado como Client_Component com diretiva `'use client'`.
10. THE Data_Layer SHALL garantir que toda Skill pertença a uma das categorias válidas do SkillCategory union type.

---

### Requisito 7: Home — AchievementsSection

**User Story:** Como visitante, quero ver as conquistas e certificações do desenvolvedor de forma visualmente atraente, para que eu possa avaliar seu comprometimento com aprendizado contínuo.

#### Critérios de Aceitação

1. THE AchievementsSection SHALL exibir todos os achievements provenientes do Data_Layer em cards com ícone, título, descrição e data.
2. THE AchievementsSection SHALL duplicar o array de achievements para criar loop contínuo no marquee.
3. THE AchievementsSection SHALL animar os cards com `@keyframes marquee` de `translateX(0)` a `translateX(-50%)` em 30s linear infinite.
4. WHEN o usuário passa o mouse sobre o marquee, THE AchievementsSection SHALL pausar a animação via `animation-play-state: paused`.
5. WHEN o usuário remove o mouse do marquee, THE AchievementsSection SHALL retomar a animação.
6. THE AchievementsSection SHALL ser implementado como Client_Component com diretiva `'use client'`.
7. THE AchievementsSection SHALL implementar o marquee via CSS puro sem loops JavaScript.

---

### Requisito 8: Rota /work — Listagem Completa de Projetos

**User Story:** Como recrutador, quero ver todos os projetos do desenvolvedor em uma página dedicada com detalhes completos, para que eu possa fazer uma avaliação aprofundada do portfólio técnico.

#### Critérios de Aceitação

1. THE WorkPage SHALL exibir todos os projetos do Data_Layer ordenados por `number` de forma crescente.
2. THE WorkPage SHALL renderizar cada projeto usando ProjectCard com `variant="full"`.
3. WHEN `variant="full"`, THE ProjectCard SHALL exibir adicionalmente a categoria em letras maiúsculas e a data alinhada à direita.
4. WHEN cada ProjectCard entra no viewport durante scroll, THE WorkPage SHALL aplicar animação `fadeUp` com delay incremental de `index * 0.08s`.
5. THE WorkPage SHALL ser implementado como Server_Component sem diretiva `'use client'`.
6. THE Data_Layer SHALL garantir que os números dos projetos sejam únicos e sequenciais.

---

### Requisito 9: Rota /about — Página Sobre

**User Story:** Como recrutador, quero conhecer em detalhes o histórico, formação e objetivos do desenvolvedor, para que eu possa avaliar o fit cultural e técnico com a vaga.

#### Critérios de Aceitação

1. THE AboutPage SHALL exibir informações detalhadas de `personalInfo` incluindo bio completa, localização e links de contato.
2. THE AboutPage SHALL exibir o histórico de formação acadêmica e experiências relevantes.
3. THE AboutPage SHALL ser implementado como Server_Component sem diretiva `'use client'`.
4. WHEN `personalInfo.availableForWork` é `true`, THE AboutPage SHALL exibir indicador de disponibilidade para estágio.

---

### Requisito 10: Rota /links — Página de Links

**User Story:** Como visitante, quero acessar facilmente todos os canais de contato e redes sociais do desenvolvedor, para que eu possa me conectar com ele na plataforma de minha preferência.

#### Critérios de Aceitação

1. THE LinksPage SHALL exibir links para GitHub, LinkedIn e demais redes sociais definidas em `personalInfo`.
2. THE LinksPage SHALL renderizar cada link com `target="_blank"` e `rel="noopener noreferrer"`.
3. THE LinksPage SHALL ser implementado como Server_Component sem diretiva `'use client'`.
4. THE LinksPage SHALL exibir o email de contato quando `personalInfo.email` estiver definido.

---

### Requisito 11: Data Layer — Integridade dos Dados

**User Story:** Como desenvolvedor, quero que os dados estáticos do portfolio sejam consistentes e bem tipados, para que eu possa manter e atualizar o conteúdo sem introduzir erros.

#### Critérios de Aceitação

1. THE Data_Layer SHALL exportar `personalInfo`, `projects`, `skills` e `achievements` com interfaces TypeScript tipadas.
2. THE Data_Layer SHALL garantir que cada Project tenha `id` único em formato kebab-case.
3. THE Data_Layer SHALL garantir que cada Project tenha `stack` com ao menos 1 item.
4. THE Data_Layer SHALL garantir que o campo `status` de cada Project seja restrito ao union type `'active' | 'wip' | 'archived'`.
5. THE Data_Layer SHALL garantir que os números dos projetos sejam únicos entre todos os projetos.
6. THE Data_Layer SHALL garantir que no máximo 3 projetos tenham `featured: true`.
7. THE Data_Layer SHALL garantir que toda Skill tenha `category` pertencente ao SkillCategory union type.
8. THE Data_Layer SHALL ser resolvido em compile-time sem fetch em runtime.

---

### Requisito 12: SEO e Metadados

**User Story:** Como desenvolvedor, quero que o portfolio seja indexável por motores de busca e compartilhável em redes sociais, para que eu possa aumentar minha visibilidade profissional online.

#### Critérios de Aceitação

1. THE App_Router SHALL definir `metadata` com `title` e `description` para cada rota.
2. THE App_Router SHALL definir `openGraph.title`, `openGraph.description` e `openGraph.locale: 'pt_BR'` no metadata da rota raiz.
3. THE App_Router SHALL definir `twitter.card: 'summary_large_image'` e `twitter.title` no metadata da rota raiz.
4. THE App_Router SHALL renderizar o elemento `<html>` com atributo `lang="pt-BR"`.
5. THE App_Router SHALL carregar as fontes Instrument Serif e DM Sans via `next/font/google` com zero layout shift.
6. THE App_Router SHALL aplicar as variáveis CSS `--font-heading` e `--font-body` no elemento `<body>`.

---

### Requisito 13: Design System e Tokens Visuais

**User Story:** Como desenvolvedor, quero que o portfolio tenha uma identidade visual consistente e bem definida, para que eu possa transmitir profissionalismo e atenção aos detalhes.

#### Critérios de Aceitação

1. THE Portfolio SHALL aplicar tema escuro absoluto com cor de background `#0a0a0a` em todas as rotas.
2. THE Portfolio SHALL usar a cor accent `#c8b97a` (dourado) como destaque visual em elementos interativos e numeração.
3. THE Portfolio SHALL usar Instrument Serif para headings e DM Sans para body text em todo o conteúdo.
4. THE Portfolio SHALL usar JetBrains Mono para labels técnicos, código e datas.
5. THE Portfolio SHALL limitar a largura máxima do conteúdo a `1100px` centralizado horizontalmente.
6. THE Portfolio SHALL aplicar padding horizontal de `2.5rem` em desktop e `1.25rem` em mobile.
7. THE tailwind.config.ts SHALL definir os Design_Tokens de cores, fontes e animações (`marquee`, `pulse-dot`, `cursor-blink`).

---

### Requisito 14: Performance e Arquitetura

**User Story:** Como desenvolvedor, quero que o portfolio carregue rapidamente e siga as melhores práticas do Next.js, para que eu possa demonstrar conhecimento técnico através da própria implementação.

#### Critérios de Aceitação

1. THE Portfolio SHALL usar Server_Components por padrão em todas as rotas e componentes sem interatividade.
2. THE Portfolio SHALL usar `'use client'` apenas nos componentes que requerem interatividade: Navbar, HeroSection, AboutSection, ExperienceSection, ProjectsPreview, SkillsKeyboard, AchievementsSection, CTASection e ProjectCard.
3. THE Portfolio SHALL usar `next/image` para todas as imagens com otimização automática (WebP, lazy loading).
4. THE next.config.ts SHALL configurar `remotePatterns` para permitir imagens de `ghchart.rshah.org`.
5. THE Portfolio SHALL usar `next/font` para carregamento de fontes sem layout shift.
6. THE tsconfig.json SHALL ter `strict: true` habilitado sem uso de `any` explícito no código.
7. THE Portfolio SHALL ser deployado na Vercel com CDN global.

---

### Requisito 15: Tratamento de Estados Vazios e Erros

**User Story:** Como desenvolvedor, quero que o portfolio lide graciosamente com dados ausentes ou falhas externas, para que a experiência do visitante não seja degradada por erros inesperados.

#### Critérios de Aceitação

1. IF o gráfico do GitHub (`ghchart.rshah.org`) não carregar, THE GitHubSection SHALL exibir o texto alternativo via atributo `alt` sem quebrar o layout.
2. IF a imagem de perfil não for encontrada, THE Portfolio SHALL exibir placeholder blur via `next/image` com `placeholder="blur"`.
3. IF o array `projects` estiver vazio, THE ProjectsPreview SHALL renderizar estado vazio com mensagem "Em breve".
4. IF o array `achievements` estiver vazio, THE AchievementsSection SHALL renderizar estado vazio sem executar a animação marquee.
5. THE Portfolio SHALL garantir que erros de tipo sejam detectados em compile-time via TypeScript strict, prevenindo comportamento inesperado em runtime.
