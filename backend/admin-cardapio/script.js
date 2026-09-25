var counter = localStorage.getItem('counter') || 0;
var titles = ["Dia 2", "Dia 3", "Dia 4", "Dia 5", "Clique em Enviar p/ Aplicativo"];
function mudarTitulo() {
    if (counter < titles.length) {
        document.getElementById('titulo').innerText = titles[counter];
        counter++;
        localStorage.setItem('counter', counter);
    }
}
function checkFields() {
    var base = document.forms['form']['base'].value;
    var main = document.forms['form']['main'].value;
    var acompanhamento = document.forms['form']['acompanhamento'].value;
    var diaSemana = document.forms['form']['diaSemana'].value;
    if (base == '' || main == '' || acompanhamento == '' || diaSemana == '') {
        alert('All fields must be filled out');
        return false;
    }
}

function resetTitle(){
    if (document.getElementById('titulo').innerText == 'Clique em Enviar p/ o Aplicativo'){
        document.getElementById('titulo').innerText = 'Dia 1';
    }
}