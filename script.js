const questions = [
    {
        questions: "Quem é o pai do Carl?",
        option: ["Rick", "Shane", "Glenn", "Negan"],
        answer: 0
    },
    {
        questions: "Qual o nome da filha do Rick?",
        option: ["Carol", "Michonne", "Judith", "Maggie"],
        answer: 2
    },
    {
        questions: "Quem foi o irmão do Rick?",
        option: ["Daryl", "Shane", "Negan", "Merle"],
        answer: 1
    },
    {
        questions: "Quem foi o maior inimigo do Daryl?",
        option: ["O Governador", "Shane", "Beta", "Dwight"],
        answer: 2
    }
];

let questao = 0;
let pontuacao = 0;

function mostrarPergunta() {
    const questoesHTML = document.getElementById('question');
    const opcoesHTML = document.getElementById('options');

    questoesHTML.textContent = questions[questao].questions;
    opcoesHTML.innerHTML = "";

    for (let i = 0; i < questions[questao].option.length; i++) {
        const opcoes = document.createElement('div');
        opcoes.innerHTML = `
            <input type="radio" name="option" id="option${i}" value="${i}">
            <label for="option${i}">
                ${questions[questao].option[i]}
            </label>
        `;
        opcoesHTML.appendChild(opcoes);
    }

    const submitButton = document.getElementById('submit-btn');
    submitButton.textContent = 'Enviar';
}

function checarResposta() {
    const selecionada = document.querySelector('input[name="option"]:checked');
    if (!selecionada) return;

    const resposta = parseInt(selecionada.value);
    if (resposta === questions[questao].answer) {
        pontuacao++;
        selecionada.parentElement.classList.add('correct');
    } else {
        selecionada.parentElement.classList.add('incorrect');
    }

    const options = document.querySelectorAll('input[name="option"]');
    options.forEach(option => { option.disabled = true; });

    if (questao === questions.length - 1) {
        const quizContainer = document.getElementById('question-container');
        quizContainer.innerHTML = `<h2>Você acertou ${pontuacao} de ${questions.length} perguntas!</h2>`;
        const submit = document.getElementById('submit-btn');
        submit.textContent = "Jogar novamente?";
        submit.removeEventListener('click', checarResposta);
        submit.addEventListener('click', restartQuiz);
    } else {
        questao++;
        mostrarPergunta();
    }
}

function restartQuiz() {
    questao = 0;
    pontuacao = 0;

    document.getElementById('question-container').innerHTML = `
        <div id="question"></div>
        <div id="options"></div>
    `;
    mostrarPergunta();

    const submitButton = document.getElementById('submit-btn');
    submitButton.textContent = 'Enviar';
    submitButton.removeEventListener('click', restartQuiz);
    submitButton.addEventListener('click', checarResposta);
}

document.getElementById('submit-btn').addEventListener('click', checarResposta);
mostrarPergunta();