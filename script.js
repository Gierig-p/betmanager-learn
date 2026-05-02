let formulario = document.querySelector('form');
let inputValor = document.querySelectorAll('input')[0];
let inputOdd = document.querySelectorAll('input')[1];

let odds = [];

formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    
    let valor = parseFloat(inputValor.value);
    let odd = parseFloat(inputOdd.value);
    
    if (valor <= 0 || odd <= 0) {
        alert("valor e odd devem ser maiores que 0");
        return;
    }

    odds.push(valor, odd);

    inputValor.value = '';
    inputOdd.value = '';
    console.log("Odds adicionadas", odds);
    alert("Odds adicionadas!");

});