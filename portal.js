const menuToggle = document.querySelector('#menu-toggle');
const menu = document.querySelector('#menu');
const compactMenu = window.matchMedia('(max-width: 55rem)');

function setMenu(open) {
  menuToggle.setAttribute('aria-expanded', String(open));
  menu.hidden = compactMenu.matches && !open;
}

function updateMenu() {
  menuToggle.hidden = !compactMenu.matches;
  setMenu(false);
}

menuToggle.addEventListener('click', () => {
  setMenu(menuToggle.getAttribute('aria-expanded') === 'false');
});
menu.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (compactMenu.matches && link) {
    setMenu(false);
    const destination = document.querySelector(link.hash);
    destination.tabIndex = -1;
    destination.focus({ preventScroll: true });
  }
});
document.querySelector('.header').addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuToggle.focus();
  }
});
compactMenu.addEventListener('change', updateMenu);
updateMenu();

const copyButton = document.querySelector('#copiar');
const promptModel = document.querySelector('#modelo');
const copyStatus = document.querySelector('#copia-status');

copyButton.hidden = false;
copyButton.addEventListener('click', async () => {
  copyStatus.textContent = '';
  try {
    await navigator.clipboard.writeText(promptModel.textContent.trim());
    copyStatus.textContent = 'Modelo copiado.';
  } catch {
    promptModel.focus();
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(promptModel);
    selection.removeAllRanges();
    selection.addRange(range);
    try {
      if (!document.execCommand('copy')) throw new Error('Cópia indisponível');
      selection.removeAllRanges();
      copyButton.focus();
      copyStatus.textContent = 'Modelo copiado.';
    } catch {
      copyStatus.textContent = 'Texto selecionado. Use o comando Copiar do seu dispositivo.';
    }
  }
});

const checklist = document.querySelector('#checklist');
const progress = document.querySelector('#andamento');
const checkStatus = document.querySelector('#check-status');

function updateChecklist() {
  const count = checklist.querySelectorAll('input:checked').length;
  progress.value = count;
  checkStatus.textContent = `${count} de ${progress.max}`;
}
checklist.addEventListener('change', updateChecklist);
window.addEventListener('pageshow', updateChecklist);
updateChecklist();

const questions = [
  {
    prompt: 'Qual pedido tende a gerar um e-mail mais adequado?',
    options: [
      'Escreva um e-mail sobre a reunião.',
      'Redija um convite curto e cordial para a equipe revisar o cronograma na terça. Inclua o assunto e sinalize o horário a confirmar.',
      'Faça um e-mail completo e preencha todos os detalhes que faltarem.'
    ],
    answer: 1,
    explanation: 'O pedido define público, objetivo, tom e formato. Sinalizar detalhes pendentes reduz a chance de tratar uma suposição como fato.'
  },
  {
    prompt: 'A IA sugeriu uma fórmula para calcular um total. O que fazer antes de usá-la?',
    options: [
      'Usá-la se o resultado parecer razoável.',
      'Pedir à mesma ferramenta que confirme a fórmula e aceitar a resposta.',
      'Conferir o intervalo de células e testar a fórmula com valores cujo total você já conhece.'
    ],
    answer: 2,
    explanation: 'Um teste com resultado conhecido ajuda a detectar erros no cálculo, enquanto a revisão do intervalo ajuda a encontrar dados omitidos.'
  },
  {
    prompt: 'A IA apresentou uma referência que você nunca viu. Qual é o próximo passo?',
    options: [
      'Localizar a fonte original e confirmar sua existência, data e relação com a afirmação.',
      'Usar a referência se o título parecer plausível.',
      'Copiar a afirmação, pois a ferramenta incluiu uma referência.'
    ],
    answer: 0,
    explanation: 'Uma IA pode inventar uma referência convincente. Verifique se a fonte existe e se ela sustenta o que foi afirmado.'
  },
  {
    prompt: 'Você quer praticar um prompt de RH com uma lista que contém dados pessoais. Como agir?',
    options: [
      'Colar a lista e pedir à IA que remova os nomes depois.',
      'Usar dados fictícios para o exercício e consultar as políticas internas para qualquer uso real.',
      'Anexar o arquivo em uma ferramenta pública se ele tiver poucas linhas.'
    ],
    answer: 1,
    explanation: 'Dados fictícios permitem praticar sem expor informações reais. O uso de dados pessoais exige autorização e condições adequadas.'
  },
  {
    prompt: 'A IA fez um resumo claro de um procedimento. Quem responde pelo conteúdo que será usado?',
    options: [
      'A ferramenta, porque gerou a resposta.',
      'Ninguém, se o texto estiver bem escrito.',
      'A pessoa ou equipe que revisa, valida e decide utilizar o resumo.'
    ],
    answer: 2,
    explanation: 'A IA apoia o trabalho. A decisão de usar o conteúdo e a responsabilidade pela revisão continuam com as pessoas.'
  }
];

const quiz = document.querySelector('#quiz-form');
const questionList = document.querySelector('#quiz-questions');
const submitButton = document.querySelector('#corrigir');
const resetButton = document.querySelector('#refazer');
const result = document.querySelector('#quiz-result');
const score = document.querySelector('#quiz-score');
const review = document.querySelector('#quiz-review');

const fields = questions.map((question, questionIndex) => {
  const field = document.createElement('fieldset');
  field.className = 'question';
  const legend = document.createElement('legend');
  legend.textContent = `${questionIndex + 1}. ${question.prompt}`;
  field.append(legend);
  question.options.forEach((option, optionIndex) => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    const caption = document.createElement('span');
    label.className = 'option';
    input.type = 'radio';
    input.name = `pergunta-${questionIndex}`;
    input.value = optionIndex;
    input.required = true;
    caption.textContent = option;
    label.append(input, caption);
    field.append(label);
  });
  questionList.append(field);
  return field;
});

quiz.hidden = false;
quiz.addEventListener('submit', (event) => {
  event.preventDefault();
  const answers = new FormData(quiz);
  let points = 0;
  const feedback = questions.map((question, index) => {
    const selected = Number(answers.get(`pergunta-${index}`));
    const correct = selected === question.answer;
    if (correct) points += 1;

    const entry = document.createElement('li');
    const verdict = document.createElement('strong');
    verdict.textContent = correct ? 'Você acertou' : 'Você errou';
    const answer = document.createElement('p');
    answer.textContent = `Sua resposta: ${question.options[selected]}`;
    const solution = document.createElement('p');
    solution.textContent = `Resposta correta: ${question.options[question.answer]}`;
    const explanation = document.createElement('p');
    explanation.textContent = question.explanation;
    entry.append(verdict, answer, solution, explanation);
    return entry;
  });
  fields.forEach((field) => { field.disabled = true; });
  score.textContent = `Você acertou ${points} de ${questions.length}.`;
  review.replaceChildren(...feedback);
  submitButton.hidden = true;
  resetButton.hidden = false;
  result.hidden = false;
  result.focus();
});

quiz.addEventListener('reset', () => {
  fields.forEach((field) => { field.disabled = false; });
  submitButton.hidden = false;
  resetButton.hidden = true;
  result.hidden = true;
  review.replaceChildren();
  fields[0].querySelector('input').focus();
});
