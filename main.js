function isLetter(str) {
    return str.length === 1 && str.match(/[a-zA-Z]/i);
}

function cripto() {
    const
        inputKey = document.getElementById('chave'),
        inputText = document.getElementById('texto'),
        labelOutput = document.getElementById('output'),
        labelQtde = document.getElementById('qtde');

    let key = inputKey.value.toUpperCase(),
        text = inputText.value.replace(/\s/g, ''),
        keyMod = '',
        num = '',
        word = '',
        ret = '@',
        sum = 0;

    if (!key || !text) {
        labelOutput.value = '';
        labelQtde.innerHTML = '0 caracteres';

        return;
    }

    for (const index of key) {
        keyMod = index + keyMod;
    }

    for (const index of text) {
        if (isLetter(index)) {
            word += index;
        } else {
            num += index;
        }
    }

    for (var i = 0; i < word.length; i++) {
        sum += (word.toLowerCase().charCodeAt(i) - 97);
    }

    for (const index of sum.toString()) {
        ret += String.fromCharCode(parseInt(index) + 97);
        ret += index;
    }

    ret += keyMod + num + '$';

    labelOutput.value = ret;
    labelQtde.innerHTML = `${ret.length}  caracteres`;
}

function showPassword() {
    var inputs = document.getElementsByTagName('input');

    for (let input of inputs) {
        if (input.type === 'password') {
            input.type = 'text';
        }
        else if (input.type === 'text') {
            input.type = 'password';
        }
    };
}

function copy() {
    var text = document.getElementById('output');
    text.select();
    text.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand('copy');
}

/**
 * Define o tema do app
 * @param {String} tema `dark` | `light` 
 */
const setTema = (tema = 'dark') => {
    const
        style = document.documentElement.style,
        linkedinDiv = document.getElementsByClassName('LI-profile-badge')[0];

    if (tema == 'dark') {
        style.setProperty('--CorPrincipal', '#2f2f2f');
        style.setProperty('--CorTexto', '#fff');
        localStorage.setItem('tema', 'dark');
    } else {
        style.setProperty('--CorPrincipal', '#fff');
        style.setProperty('--CorTexto', '#000');
        localStorage.setItem('tema', 'light');
    }
}

let tema = localStorage.getItem('tema');

if (!tema) {
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) // Pega o tema do sistema
        ? setTema('dark')
        : setTema('light');
} else {
    setTema(tema);
}

// Identifica mudança de tema do sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    e.matches
        ? setTema('dark')
        : setTema('light');
});