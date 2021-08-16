const isLetter = (str) => str.length === 1 && str.match(/[a-zA-Z]/i)

function cripto() {
    const
        inputKey = document.getElementById('chave'),
        inputText = document.getElementById('texto'),
        labelOutput = document.getElementById('output'),
        labelQtde = document.getElementById('qtde');

    let key = inputKey.value.toUpperCase().replace(/\s/g, '').substr(0, 10),
        text = inputText.value.replace(/\s/g, ''),
        keyMod = '',
        num = '',
        word = '',
        ret = '@',
        sum = 0;

    labelOutput.value = '';

    if (!key || !text) {
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
            if(num.length < 5){
                num += index;
            }
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
        if (input.readOnly) {
            continue;
        }

        if (input.type === 'password') {
            input.type = 'text';
        }
        else if (input.type === 'text') {
            input.type = 'password';
        }
    };
}

const setKey = () => {
    let key = document.getElementById('chave').value,
        msg = 'Chave armazenada!';

    if (!!key) {
        msg = 'Chave criptografada e armazenada!';
        localStorage.setItem('key', btoa(key));
    } else {
        msg = 'Chave retirada do armazenamento!';
        localStorage.setItem('key', '');
    }

    alert(msg)
};

/**
 * Define o tema do app
 * @param {String} theme `dark` | `light` 
 */
const setTheme = (theme = 'dark') => {
    const
        style = document.documentElement.style,
        linkedinDiv = document.getElementsByClassName('LI-profile-badge')[0];

    if (theme == 'dark') {
        style.setProperty('--CorPrincipal', '#2f2f2f');
        style.setProperty('--CorTexto', '#fff');
        localStorage.setItem('theme', 'dark');
    } else {
        style.setProperty('--CorPrincipal', '#fff');
        style.setProperty('--CorTexto', '#000');
        localStorage.setItem('theme', 'light');
    }
}

const initial = () => {
    new ClipboardJS('.btnCopy');

    let theme = localStorage.getItem('theme'),
        inputKey = document.getElementById('chave'),
        key = localStorage.getItem('key');

    if (!!key) {
        inputKey.value = atob(key);
    }

    if (!theme) {
        (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) // Pega o tema do sistema
            ? setTheme('dark')
            : setTheme('light');
    } else {
        setTheme(theme);
    }
}

// Identifica mudança de tema do sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    e.matches
        ? setTheme('dark')
        : setTheme('light');
});

const changeTheme = () => {
    let theme = localStorage.getItem('theme');

    if (theme == 'dark') {
        setTheme('light');
    } else {
        setTheme('dark');
    }
}