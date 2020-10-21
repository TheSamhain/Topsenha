function isLetter(str) {
    return str.length === 1 && str.match(/[a-zA-Z]/i);
}

function cripto() {
    var key = document.getElementById("chave").value.toUpperCase();
    var text = document.getElementById("texto").value;

    var keyMod = "";
    var num = "";
    var word = "";
    var ret = "@";
    var sum = 0;

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

    ret += keyMod + num + "$";

    document.getElementById("output").value = ret;
    document.getElementById("qtde").innerHTML = ret.length + " caracteres";
}

function showPassword() {
    var inputPass = document.getElementById("texto");
    if (inputPass.type === "password") {
        inputPass.type = "text";
    } else {
        inputPass.type = "password";
    }
}

function copy() {
    var text = document.getElementById("output");
    text.select();
    text.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand("copy");
}