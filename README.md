# Sconnect — Protótipo Interativo

**Plataforma de oportunidades de trabalho com foco em Saquarema (RJ).**

O Sconnect é um projeto acadêmico desenvolvido com a proposta de aproximar candidatos e empresas locais, facilitando a divulgação de vagas e a busca por oportunidades profissionais.

Este repositório apresenta um protótipo navegável, criado para demonstrar as funcionalidades principais da plataforma e permitir a futura avaliação de usabilidade.

**Status:** Protótipo acadêmico — não disponível para contratações reais.

## Objetivo

Demonstrar de forma interativa os processos de cadastro, busca de vagas, candidatura e publicação de oportunidades, utilizando uma interface simples e adaptada a dispositivos móveis.

## Funcionalidades

### Candidato

- Cadastro com nome, e-mail, formação e habilidades.
- Saudação personalizada com o nome informado.
- Pesquisa de oportunidades por cargo ou empresa.
- Filtros por tipo de contratação.
- Visualização dos detalhes das vagas.
- Registro e acompanhamento de candidaturas.
- Consulta e edição do perfil profissional.

### Empresa

- Cadastro empresarial.
- Painel com informações das vagas cadastradas.
- Publicação de oportunidades de trabalho.
- Consulta de candidatos inscritos.
- Visualização de perfis profissionais.
- Atualização da situação das candidaturas.

## Tecnologias utilizadas

| Tecnologia | Finalidade |
|---|---|
| HTML5 | Estrutura das páginas e formulários |
| CSS3 | Estilização, responsividade e interface |
| JavaScript | Navegação e funcionalidades interativas |

O projeto não necessita de frameworks, bibliotecas externas ou banco de dados.

## Estrutura de arquivos

```text
Sconnect/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Como executar

1. Baixe os arquivos do repositório.
2. Abra a pasta do projeto no Visual Studio Code.
3. Localize o arquivo `index.html`.
4. Abra o arquivo no navegador Chrome, Edge ou Firefox.
5. Escolha o perfil de candidato ou empresa e realize o cadastro demonstrativo.

Não é necessário instalar dependências.

## Navegação do protótipo

**Fluxo do candidato**

O usuário acessa a tela inicial, seleciona a opção de candidato e preenche o formulário de cadastro. Após concluir, é direcionado para uma página personalizada, na qual pode pesquisar oportunidades e consultar informações sobre as vagas.

Ao encontrar uma oportunidade de interesse, pode visualizar os detalhes e registrar uma candidatura. A seção de candidaturas permite acompanhar a situação da inscrição, enquanto a seção de perfil apresenta as informações cadastradas.

**Fluxo da empresa**

A empresa realiza seu cadastro e acessa um painel destinado à publicação de vagas. Nesse ambiente, pode cadastrar oportunidades, consultar as vagas publicadas e visualizar candidatos inscritos.

Também é possível consultar informações profissionais dos candidatos e modificar a situação de suas candidaturas.

## Roteiro de verificação

O protótipo permite realizar as seguintes verificações manuais:

- Criar um perfil com um nome informado pelo próprio usuário.
- Confirmar que o nome aparece corretamente na tela inicial e no perfil.
- Buscar oportunidades e aplicar filtros.
- Consultar uma vaga e registrar uma candidatura.
- Editar informações do perfil.
- Cadastrar uma empresa e publicar uma vaga.
- Consultar e atualizar candidaturas vinculadas à empresa.

Esses procedimentos são sugestões de teste, não resultados de validação com participantes externos.

## Limitações

O Sconnect está em fase de prototipação e ainda não possui autenticação real, banco de dados ou comunicação com servidores.

As informações inseridas são mantidas temporariamente na memória da página e perdidas quando ela é atualizada.

As vagas iniciais são fictícias e utilizadas exclusivamente para demonstração. O protótipo não realiza contratações nem envia informações para empresas reais.

Recomenda-se utilizar apenas dados fictícios durante os testes.

## Próximas etapas

- Realizar testes de usabilidade com representantes do público-alvo.
- Registrar dificuldades encontradas durante a navegação.
- Revisar a interface com base nos resultados.
- Aperfeiçoar requisitos e fluxos.
- Planejar a implementação do MVP com autenticação, banco de dados e controle de acesso.

## Contexto acadêmico

**Projeto:** Sconnect

**Curso:** Engenharia de Software

**Disciplina:** Práticas Extensionistas IV

**Localidade de referência:** Saquarema — RJ

**Finalidade:** Desenvolvimento e avaliação de um protótipo digital de empregabilidade.

**Autores:**  Paulo Victor da Cunha Balthar; Francisco Xavier Duarte Pereira Neto
