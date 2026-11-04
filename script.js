
"use strict";

// Protótipo inteiramente em memória.
// Nada é gravado no navegador.

const starterJobs = [
  {
    id: "demo1",
    title: "Atendente",
    company: "Mercado Maré (fictício)",
    location: "Saquarema – RJ",
    type: "Efetivo",
    salary: "A combinar",
    description: "Atendimento ao público, organização de produtos e suporte no caixa.",
    requirements: "Boa comunicação e ensino médio completo.",
    employerId: null
  },
  {
    id: "demo2",
    title: "Auxiliar Administrativo",
    company: "Pousada Sol (fictícia)",
    location: "Saquarema – RJ",
    type: "Efetivo",
    salary: "A combinar",
    description: "Organização de documentos e apoio administrativo.",
    requirements: "Noções de informática e organização.",
    employerId: null
  },
  {
    id: "demo3",
    title: "Recepcionista",
    company: "Hotel Praia Azul (fictício)",
    location: "Saquarema – RJ",
    type: "Temporário",
    salary: "A combinar",
    description: "Recepção de hóspedes e atendimento a visitantes.",
    requirements: "Comunicação clara e disponibilidade de horário.",
    employerId: null
  }
];

let jobs = starterJobs.map(job => ({ ...job }));
let applications = [];

let state = {
  screen: "welcome",
  role: null,
  candidate: null,
  employer: null,
  selectedJob: null,
  selectedApplication: null,
  search: "",
  filter: "Todas"
};

const app = document.getElementById("app");
const nav = document.getElementById("bottom-nav");
const logoutButton = document.getElementById("logout");
const toast = document.getElementById("toast");

// ===========================================
// FUNÇÕES AUXILIARES
// ===========================================

function escapeHTML(value) {
  return String(value ?? "").replace(
    /[&<>"']/g,
    character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[character]
  );
}

function id() {
  if (
    typeof crypto !== "undefined" &&
    crypto.randomUUID
  ) {
    return crypto.randomUUID();
  }

  return Date.now().toString(36) +
    Math.random().toString(36).slice(2);
}

function message(value) {
  toast.textContent = value;
  toast.classList.add("show");

  clearTimeout(message.timer);

  message.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function button(text, action, variant = "") {
  return `
    <button
      type="button"
      class="btn ${variant}"
      data-action="${action}">
      ${text}
    </button>
  `;
}

function back(screen) {
  return `
    <button
      type="button"
      class="back"
      data-screen="${screen}">
      ← Voltar
    </button>
  `;
}

function input(
  label,
  name,
  placeholder = "",
  value = "",
  required = false,
  type = "text"
) {
  return `
    <label class="field">
      ${label}
      <input
        name="${name}"
        type="${type}"
        placeholder="${escapeHTML(placeholder)}"
        value="${escapeHTML(value)}"
        ${required ? "required" : ""}
        maxlength="120">
    </label>
  `;
}

function navigate(screen) {
  state.screen = screen;
  render();
}

function candidateOnly() {
  return state.role === "candidate" &&
    state.candidate;
}

function employerOnly() {
  return state.role === "employer" &&
    state.employer;
}

function initials(name) {
  return String(name)
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(word => word[0] || "")
    .join("")
    .toUpperCase();
}

function findJob(jobId) {
  return jobs.find(job => job.id === jobId);
}

function findApplication(applicationId) {
  return applications.find(
    application => application.id === applicationId
  );
}

// ===========================================
// TELA INICIAL
// ===========================================

function welcomeScreen() {
  return `
    <section class="hero">
      <div class="hero-mark">✦</div>

      <span class="eyebrow">
        Oportunidades locais
      </span>

      <h1>Seu próximo passo começa aqui.</h1>

      <p>
        O Sconnect aproxima candidatos e empresas
        de Saquarema em uma experiência simples
        e interativa.
      </p>
    </section>

    <h2>Como deseja participar?</h2>

    ${button(
      "Sou candidato — criar conta",
      "candidateSignup"
    )}

    ${button(
      "Sou empresa — criar conta",
      "employerSignup",
      "secondary"
    )}

    <p class="notice">
      Protótipo acadêmico. O cadastro não é enviado
      nem salvo. Ao atualizar a página, tudo
      começa novamente.
    </p>
  `;
}

// ===========================================
// CADASTRO DO CANDIDATO
// ===========================================

function candidateSignupScreen() {
  return `
    ${back("welcome")}

    <span class="eyebrow">Primeiro acesso</span>

    <h1>Crie seu perfil</h1>

    <p class="muted">
      Seu nome aparecerá automaticamente no aplicativo
      após concluir o cadastro.
    </p>

    <form id="candidate-form">

      ${input(
        "Nome completo *",
        "name",
        "Digite seu nome completo",
        "",
        true
      )}

      ${input(
        "E-mail *",
        "email",
        "seuemail@exemplo.com",
        "",
        true,
        "email"
      )}

      ${input(
        "Formação",
        "education",
        "Ex.: Ensino médio completo"
      )}

      <label class="field">
        Habilidades

        <textarea
          name="skills"
          maxlength="500"
          placeholder="Ex.: Atendimento, informática, organização"></textarea>
      </label>

      <button class="btn" type="submit">
        Criar conta e continuar
      </button>

    </form>

    <p class="notice">
      Não informe senhas ou dados sensíveis.
      O cadastro é temporário e demonstrativo.
    </p>
  `;
}

// ===========================================
// CADASTRO DA EMPRESA
// ===========================================

function employerSignupScreen() {
  return `
    ${back("welcome")}

    <span class="eyebrow">Área empresarial</span>

    <h1>Cadastre sua empresa</h1>

    <p class="muted">
      Informe os dados para experimentar
      a publicação de vagas.
    </p>

    <form id="employer-form">

      ${input(
        "Nome da empresa *",
        "company",
        "Digite o nome da empresa",
        "",
        true
      )}

      ${input(
        "Nome do responsável *",
        "responsible",
        "Digite seu nome",
        "",
        true
      )}

      ${input(
        "E-mail *",
        "email",
        "contato@exemplo.com",
        "",
        true,
        "email"
      )}

      ${input(
        "Localização",
        "location",
        "Cidade",
        "Saquarema – RJ"
      )}

      <button class="btn" type="submit">
        Criar conta empresarial
      </button>

    </form>
  `;
}

// ===========================================
// LISTA DE VAGAS
// ===========================================

function jobCard(job) {
  return `
    <article class="card">

      <div class="card-row">
        <h3>${escapeHTML(job.title)}</h3>

        <span class="pill">
          ${escapeHTML(job.type)}
        </span>
      </div>

      <p>${escapeHTML(job.company)}</p>

      <p>${escapeHTML(job.location)}</p>

      <button
        class="btn small"
        type="button"
        data-action="jobDetail"
        data-id="${escapeHTML(job.id)}">
        Ver detalhes
      </button>

    </article>
  `;
}

function filteredJobsHTML() {
  const query = state.search
    .toLocaleLowerCase("pt-BR")
    .trim();

  const filtered = jobs.filter(job => {
    const matchesText = [
      job.title,
      job.company,
      job.location
    ]
      .join(" ")
      .toLocaleLowerCase("pt-BR")
      .includes(query);

    const matchesType =
      state.filter === "Todas" ||
      state.filter === job.type;

    return matchesText && matchesType;
  });

  if (!filtered.length) {
    return `
      <div class="empty">
        Nenhuma vaga encontrada.
      </div>
    `;
  }

  return filtered.map(jobCard).join("");
}

// ===========================================
// INÍCIO DO CANDIDATO
// ===========================================

function candidateHomeScreen() {
  const name = state.candidate.name;

  return `
    <span class="eyebrow">
      Área do candidato
    </span>

    <h1>Olá, ${escapeHTML(name)}!</h1>

    <p class="muted">
      Encontre uma oportunidade de trabalho
      em Saquarema.
    </p>

    <label class="field">
      Buscar vagas

      <input
        id="search"
        type="search"
        placeholder="Cargo ou empresa"
        value="${escapeHTML(state.search)}">
    </label>

    <div class="filters">
      ${[
        "Todas",
        "Efetivo",
        "Temporário"
      ].map(type => `
        <button
          class="chip ${
            type === state.filter ? "active" : ""
          }"
          data-action="filter"
          data-value="${type}">
          ${type}
        </button>
      `).join("")}
    </div>

    <h2>Oportunidades</h2>

    <section id="jobs-list">
      ${filteredJobsHTML()}
    </section>
  `;
}

// ===========================================
// DETALHES DA VAGA
// ===========================================

function detailScreen() {
  const job = findJob(state.selectedJob);

  if (!job) {
    return `
      ${back("candidateHome")}

      <div class="empty">
        Vaga não encontrada.
      </div>
    `;
  }

  const applied = applications.some(
    application =>
      application.candidateId === state.candidate.id &&
      application.jobId === job.id
  );

  return `
    ${back("candidateHome")}

    <span class="eyebrow">
      Detalhes da oportunidade
    </span>

    <h1>${escapeHTML(job.title)}</h1>

    <div class="card">

      <strong>${escapeHTML(job.company)}</strong>

      <p>${escapeHTML(job.location)}</p>

      <span class="pill">
        ${escapeHTML(job.type)}
      </span>

    </div>

    <h2>Remuneração</h2>

    <p class="muted">
      ${escapeHTML(job.salary)}
    </p>

    <h2>Atividades</h2>

    <p class="muted">
      ${escapeHTML(job.description)}
    </p>

    <h2>Requisitos</h2>

    <p class="muted">
      ${escapeHTML(job.requirements)}
    </p>

    <button
      type="button"
      class="btn"
      data-action="apply"
      ${applied ? "disabled" : ""}>
      ${
        applied
          ? "Candidatura enviada"
          : "Candidatar-se à vaga"
      }
    </button>
  `;
}

// ===========================================
// MINHAS CANDIDATURAS
// ===========================================

function applicationsScreen() {
  const myApps = applications.filter(
    application =>
      application.candidateId === state.candidate.id
  );

  return `
    <span class="eyebrow">
      Acompanhamento
    </span>

    <h1>Minhas candidaturas</h1>

    <p class="muted">
      Veja as inscrições feitas durante esta sessão.
    </p>

    ${
      myApps.length
        ? myApps.map(application => {
            const job = findJob(application.jobId);

            return `
              <article class="card">

                <h3>
                  ${escapeHTML(job?.title || "Vaga")}
                </h3>

                <p>
                  ${escapeHTML(job?.company || "Empresa")}
                </p>

                <span class="pill green">
                  ${escapeHTML(application.status)}
                </span>

              </article>
            `;
          }).join("")
        : `
          <div class="empty">
            Você ainda não se candidatou
            a nenhuma vaga.
          </div>
        `
    }

    ${button(
      "Explorar vagas",
      "goJobs",
      "secondary"
    )}
  `;
}

// ===========================================
// PERFIL DO CANDIDATO
// ===========================================

function profileScreen() {
  const candidate = state.candidate;

  return `
    <span class="eyebrow">
      Conta do candidato
    </span>

    <h1>Meu perfil</h1>

    <div class="card profile-head">

      <div class="avatar">
        ${escapeHTML(initials(candidate.name))}
      </div>

      <div>
        <h3>${escapeHTML(candidate.name)}</h3>

        <p>${escapeHTML(candidate.email)}</p>
      </div>

    </div>

    <h2>Formação</h2>

    <p class="muted">
      ${escapeHTML(
        candidate.education || "Não informada"
      )}
    </p>

    <h2>Habilidades</h2>

    <p class="muted">
      ${escapeHTML(
        candidate.skills || "Não informadas"
      )}
    </p>

    ${button(
      "Editar perfil",
      "editProfile",
      "secondary"
    )}
  `;
}

// ===========================================
// EDITAR PERFIL
// ===========================================

function editProfileScreen() {
  const candidate = state.candidate;

  return `
    ${back("profile")}

    <h1>Editar perfil</h1>

    <form id="edit-profile-form">

      ${input(
        "Nome completo *",
        "name",
        "Seu nome",
        candidate.name,
        true
      )}

      ${input(
        "Formação",
        "education",
        "Sua formação",
        candidate.education
      )}

      <label class="field">
        Habilidades

        <textarea
          name="skills"
          maxlength="500">${escapeHTML(candidate.skills)}</textarea>
      </label>

      <button
        type="submit"
        class="btn">
        Salvar alterações
      </button>

    </form>
  `;
}

// ===========================================
// INÍCIO DA EMPRESA
// ===========================================

function employerHomeScreen() {
  const employer = state.employer;

  const ownJobs = jobs.filter(
    job => job.employerId === employer.id
  );

  return `
    <span class="eyebrow">
      Painel da empresa
    </span>

    <h1>${escapeHTML(employer.company)}</h1>

    <p class="muted">
      Bem-vindo(a), ${escapeHTML(employer.responsible)}.
      Gerencie vagas e candidaturas.
    </p>

    <div class="card">
      <h3>
        ${ownJobs.length} vaga(s) publicada(s)
      </h3>

      <p>Nesta sessão de demonstração.</p>
    </div>

    ${button(
      "Publicar nova vaga",
      "publish"
    )}

    ${button(
      "Ver candidaturas",
      "employerApplicants",
      "secondary"
    )}

    <h2>Suas vagas</h2>

    ${
      ownJobs.length
        ? ownJobs.map(job => `
            <div class="card">

              <h3>${escapeHTML(job.title)}</h3>

              <p>${escapeHTML(job.location)}</p>

              <button
                class="btn small"
                data-action="applicantsForJob"
                data-id="${escapeHTML(job.id)}">
                Ver candidatos
              </button>

            </div>
          `).join("")
        : `
          <div class="empty">
            Você ainda não publicou vagas.
            Use o botão acima para criar uma.
          </div>
        `
    }
  `;
}

// ===========================================
// PUBLICAR VAGA
// ===========================================

function publishScreen() {
  const employer = state.employer;

  return `
    ${back("employerHome")}

    <h1>Publicar uma vaga</h1>

    <p class="muted">
      Esta oportunidade será visível aos candidatos
      durante a sessão.
    </p>

    <form id="publish-form">

      ${input(
        "Cargo *",
        "title",
        "Ex.: Assistente de vendas",
        "",
        true
      )}

      ${input(
        "Empresa",
        "company",
        "",
        employer.company
      )}

      ${input(
        "Localização *",
        "location",
        "Cidade",
        employer.location,
        true
      )}

      <label class="field">
        Tipo de contratação

        <select name="type">
          <option>Efetivo</option>
          <option>Temporário</option>
        </select>
      </label>

      ${input(
        "Remuneração",
        "salary",
        "Ex.: A combinar"
      )}

      <label class="field">
        Descrição da vaga *

        <textarea
          name="description"
          required
          maxlength="1200"
          placeholder="Descreva as atividades"></textarea>
      </label>

      <label class="field">
        Requisitos *

        <textarea
          name="requirements"
          required
          maxlength="800"
          placeholder="Informe os requisitos"></textarea>
      </label>

      <button
        type="submit"
        class="btn">
        Publicar vaga
      </button>

    </form>
  `;
}

// ===========================================
// CANDIDATURAS DA EMPRESA
// ===========================================

function employerApplicantsScreen() {
  const ownJobs = jobs.filter(
    job => job.employerId === state.employer.id
  );

  if (!ownJobs.length) {
    return `
      <h1>Candidaturas</h1>

      <div class="empty">
        Publique uma vaga para receber candidaturas.
      </div>

      ${button("Publicar vaga", "publish")}
    `;
  }

  const job = ownJobs.find(
    item => item.id === state.selectedJob
  ) || ownJobs[0];

  const selected = applications.filter(
    application => application.jobId === job.id
  );

  return `
    <h1>Candidaturas recebidas</h1>

    <label class="field">
      Selecionar vaga

      <select id="job-selector">
        ${ownJobs.map(item => `
          <option
            value="${escapeHTML(item.id)}"
            ${item.id === job.id ? "selected" : ""}>
            ${escapeHTML(item.title)}
          </option>
        `).join("")}
      </select>
    </label>

    <h2>Candidatos (${selected.length})</h2>

    ${
      selected.length
        ? selected.map(application => `
            <article class="card">

              <h3>
                ${escapeHTML(application.candidateName)}
              </h3>

              <p>
                ${escapeHTML(
                  application.education ||
                  "Formação não informada"
                )}
              </p>

              <span class="pill green">
                ${escapeHTML(application.status)}
              </span>

              <button
                class="btn small secondary"
                data-action="viewApplicant"
                data-id="${escapeHTML(application.id)}">
                Ver perfil
              </button>

              <label class="field">
                Situação

                <select
                  data-status-id="${escapeHTML(application.id)}">

                  ${
                    [
                      "Em análise",
                      "Entrevista",
                      "Não selecionado"
                    ].map(status => `
                      <option
                        ${application.status === status
                          ? "selected"
                          : ""}>
                        ${status}
                      </option>
                    `).join("")
                  }

                </select>
              </label>

            </article>
          `).join("")
        : `
          <div class="empty">
            Nenhuma candidatura para esta vaga.
            Experimente cadastrar um candidato
            e se inscrever.
          </div>
        `
    }
  `;
}

// ===========================================
// PERFIL DO CANDIDATO PARA EMPRESA
// ===========================================

function applicantProfileScreen() {
  const application = findApplication(
    state.selectedApplication
  );

  const job = application &&
    findJob(application.jobId);

  if (
    !application ||
    !job ||
    job.employerId !== state.employer.id
  ) {
    return `
      ${back("employerApplicants")}

      <div class="empty">
        Candidatura não encontrada.
      </div>
    `;
  }

  return `
    ${back("employerApplicants")}

    <h1>Perfil do candidato</h1>

    <div class="card">

      <h3>
        ${escapeHTML(application.candidateName)}
      </h3>

      <p>
        ${escapeHTML(
          application.education ||
          "Formação não informada"
        )}
      </p>

    </div>

    <h2>Habilidades</h2>

    <p class="muted">
      ${escapeHTML(
        application.skills || "Não informadas"
      )}
    </p>

    <h2>Situação</h2>

    <span class="pill green">
      ${escapeHTML(application.status)}
    </span>
  `;
}

// ===========================================
// CONTROLE DE TELAS
// ===========================================

const pages = {
  welcome: welcomeScreen,
  candidateSignup: candidateSignupScreen,
  employerSignup: employerSignupScreen,
  candidateHome: candidateHomeScreen,
  detail: detailScreen,
  applications: applicationsScreen,
  profile: profileScreen,
  editProfile: editProfileScreen,
  employerHome: employerHomeScreen,
  publish: publishScreen,
  employerApplicants: employerApplicantsScreen,
  applicantProfile: applicantProfileScreen
};

const candidatePages = new Set([
  "candidateHome",
  "detail",
  "applications",
  "profile",
  "editProfile"
]);

const employerPages = new Set([
  "employerHome",
  "publish",
  "employerApplicants",
  "applicantProfile"
]);

function render() {
  if (
    candidatePages.has(state.screen) &&
    !candidateOnly()
  ) {
    state.screen = "welcome";
  }

  if (
    employerPages.has(state.screen) &&
    !employerOnly()
  ) {
    state.screen = "welcome";
  }

  app.innerHTML = (
    pages[state.screen] || welcomeScreen
  )();

  const loggedIn = Boolean(
    candidateOnly() || employerOnly()
  );

  logoutButton.hidden = !loggedIn;
  nav.hidden = !loggedIn;

  if (loggedIn) {
    const items = state.role === "candidate"
      ? [
          ["candidateHome", "Vagas"],
          ["applications", "Candidaturas"],
          ["profile", "Perfil"]
        ]
      : [
          ["employerHome", "Início"],
          ["publish", "Publicar"],
          ["employerApplicants", "Candidatos"]
        ];

    nav.innerHTML = items.map(([screen, label]) => `
      <button
        type="button"
        data-screen="${screen}"
        class="${state.screen === screen ? "active" : ""}">
        ${label}
      </button>
    `).join("");
  } else {
    nav.innerHTML = "";
  }

  app.scrollTop = 0;
}

// ===========================================
// SAIR
// ===========================================

function exit() {
  state.role = null;
  state.candidate = null;
  state.employer = null;
  state.screen = "welcome";
  state.selectedJob = null;
  state.selectedApplication = null;

  render();
}

logoutButton.addEventListener("click", exit);

// ===========================================
// CLIQUES DOS BOTÕES
// ===========================================

document.addEventListener("click", event => {
  const target = event.target.closest(
    "[data-action], [data-screen]"
  );

  if (!target) return;

  if (target.dataset.screen) {
    navigate(target.dataset.screen);
    return;
  }

  const action = target.dataset.action;

  if (action === "candidateSignup") {
    navigate("candidateSignup");
  }

  if (action === "employerSignup") {
    navigate("employerSignup");
  }

  if (action === "goJobs") {
    navigate("candidateHome");
  }

  if (action === "editProfile") {
    navigate("editProfile");
  }

  if (action === "publish") {
    navigate("publish");
  }

  if (action === "employerApplicants") {
    navigate("employerApplicants");
  }

  if (action === "filter") {
    state.filter = target.dataset.value;
    render();
  }

  if (action === "jobDetail") {
    state.selectedJob = target.dataset.id;
    navigate("detail");
  }

  if (action === "applicantsForJob") {
    state.selectedJob = target.dataset.id;
    navigate("employerApplicants");
  }

  if (action === "viewApplicant") {
    state.selectedApplication = target.dataset.id;
    navigate("applicantProfile");
  }

  if (action === "apply") {
    if (!candidateOnly()) return;

    const job = findJob(state.selectedJob);

    if (!job) return;

    const alreadyApplied = applications.some(
      application =>
        application.jobId === job.id &&
        application.candidateId === state.candidate.id
    );

    if (alreadyApplied) return;

    applications.push({
      id: id(),
      jobId: job.id,
      candidateId: state.candidate.id,
      candidateName: state.candidate.name,
      education: state.candidate.education,
      skills: state.candidate.skills,
      status: "Em análise"
    });

    navigate("applications");
    message("Candidatura registrada!");
  }
});

// ===========================================
// FORMULÁRIOS
// ===========================================

document.addEventListener("submit", event => {
  const form = event.target;

  const validForms = [
    "candidate-form",
    "employer-form",
    "edit-profile-form",
    "publish-form"
  ];

  if (!validForms.includes(form.id)) return;

  event.preventDefault();

  if (!form.reportValidity()) return;

  const values = Object.fromEntries(
    new FormData(form)
  );

  // CADASTRO DO CANDIDATO
  if (form.id === "candidate-form") {
    const name = String(
      values.name || ""
    ).trim();

    if (name.length < 2) {
      message("Informe seu nome completo.");
      return;
    }

    state.candidate = {
      id: id(),
      name: name,
      email: String(values.email || "").trim(),
      education: String(values.education || "").trim(),
      skills: String(values.skills || "").trim()
    };

    state.role = "candidate";

    navigate("candidateHome");
    message("Perfil criado com seu nome!");
  }

  // CADASTRO DA EMPRESA
  if (form.id === "employer-form") {
    const company = String(
      values.company || ""
    ).trim();

    const responsible = String(
      values.responsible || ""
    ).trim();

    if (
      company.length < 2 ||
      responsible.length < 2
    ) {
      message("Preencha os dados da empresa.");
      return;
    }

    state.employer = {
      id: id(),
      company,
      responsible,
      email: String(values.email || "").trim(),
      location: String(
        values.location || "Saquarema – RJ"
      ).trim()
    };

    state.role = "employer";

    navigate("employerHome");
    message("Empresa cadastrada!");
  }

  // EDIÇÃO DO PERFIL
  if (
    form.id === "edit-profile-form" &&
    candidateOnly()
  ) {
    const name = String(
      values.name || ""
    ).trim();

    if (name.length < 2) {
      message("Informe um nome válido.");
      return;
    }

    Object.assign(state.candidate, {
      name,
      education: String(
        values.education || ""
      ).trim(),
      skills: String(
        values.skills || ""
      ).trim()
    });

    applications
      .filter(
        application =>
          application.candidateId === state.candidate.id
      )
      .forEach(application => {
        application.candidateName = state.candidate.name;
        application.education = state.candidate.education;
        application.skills = state.candidate.skills;
      });

    navigate("profile");
    message("Perfil atualizado!");
  }

  // PUBLICAÇÃO DA VAGA
  if (
    form.id === "publish-form" &&
    employerOnly()
  ) {
    const job = {
      id: id(),
      employerId: state.employer.id,
      company: state.employer.company,
      title: String(values.title || "").trim(),
      location: String(values.location || "").trim(),
      type: String(values.type || "Efetivo"),
      salary: String(
        values.salary || ""
      ).trim() || "A combinar",
      description: String(
        values.description || ""
      ).trim(),
      requirements: String(
        values.requirements || ""
      ).trim()
    };

    if (
      !job.title ||
      !job.location ||
      !job.description ||
      !job.requirements
    ) {
      return;
    }

    jobs.unshift(job);
    state.selectedJob = job.id;

    navigate("employerHome");
    message("Vaga publicada na sessão!");
  }
});

// ===========================================
// PESQUISA
// ===========================================

document.addEventListener("input", event => {
  if (event.target.id === "search") {
    state.search = event.target.value;

    const results = document.getElementById(
      "jobs-list"
    );

    if (results) {
      results.innerHTML = filteredJobsHTML();
    }
  }
});

// ===========================================
// ALTERAÇÃO DE SITUAÇÃO
// ===========================================

document.addEventListener("change", event => {
  if (event.target.id === "job-selector") {
    state.selectedJob = event.target.value;
    render();
  }

  const applicationId =
    event.target.dataset.statusId;

  if (applicationId && employerOnly()) {
    const application = findApplication(
      applicationId
    );

    const job = application &&
      findJob(application.jobId);

    const allowed = [
      "Em análise",
      "Entrevista",
      "Não selecionado"
    ];

    if (
      !application ||
      !job ||
      job.employerId !== state.employer.id ||
      !allowed.includes(event.target.value)
    ) {
      return;
    }

    application.status = event.target.value;

    render();
    message("Situação atualizada!");
  }
});

// ===========================================
// INICIAR O PROTÓTIPO
// ===========================================

render();
