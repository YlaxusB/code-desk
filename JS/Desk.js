/*Alerta*/
var body = document.getElementById('body')

function alertaF(mensagem, cor) {
    var alerta = document.createElement('div')
    alerta.setAttribute('id', 'alerta')
    alerta.style.fontWeight = 'bold'
    body.appendChild(alerta)
        //animation-name: example;
        //animation-duration: 300ms;
    alerta.style.animationName = 'subir'
    alerta.style.animationDuration = '1s'

    alerta.innerHTML = mensagem
    alerta.classList = 'expand'
    alerta.style.display = 'block'

    if (cor == 'verde') {
        alerta.style.backgroundColor = '#9bd385';
    } else if (cor == 'vermelho') {
        alerta.style.backgroundColor = 'rgb(255, 107, 107)'
    }

    setTimeout(function() {
        alerta.setAttribute('class', 'unExpand')
        setTimeout(function() {
            alerta.style.display = 'none'
            alerta.remove()
        }, 1000)
    }, 3000)
}
//alertaF('Erro, vai tomar no cu', 'verde') mensagem, cor(vermelho ou verde)

var tamanhos = {
    width: window.innerWidth,
    height: window.innerHeight
}
var desktop = document.querySelector('#desktop');
var rightVazio = document.querySelector('#rightVazio');
var New = document.querySelector('#New');
var newExt = document.querySelector('#newExtended');
var chooseBack = document.querySelector('#chooseBack');
var chooseBackDiv = document.querySelector('#chooseBackDiv');
var imgBack = document.querySelector('imgBack')
var site = document.querySelector('#site')
var folder = document.querySelector('#Folder')
var postCreate = document.querySelector('#postCreate')
postCreate.style.display = 'none'
site.style.backgroundSize = window.innerWidth + 'px'

New.onmouseover = function() {
    newExt.style.display = 'block';
}

newExt.onmouseleave = function() {
    newExt.style.display = 'none';
}

chooseBack.onmouseover = function() {
    newExt.style.display = 'none'
}

desktop.onmouseover = function() {
    newExt.style.display = 'none'
}

desktop.onclick = function() {
    rightVazio.style.display = 'none'
    postCreate.style.display = 'none'
}

if (localStorage.getItem('background')) {
    var fromLocalBackground = localStorage.getItem('background')
    site.style.backgroundImage = "url(" + fromLocalBackground + ")";
    site.style.backgroundSize = window.innerWidth + 'px'
}

var idLetras = 0;
var idNumeros = 0;


body.style.height = tamanhos.height;
body.style.width = tamanhos.width;
desktop.style.width = tamanhos.width;
desktop.style.height = tamanhos.height;

function squares() {
    var tamanhosHeight = tamanhos.height;

    //Letras

    for (var tamanhoSquare = 75; tamanhoSquare < tamanhosHeight; tamanhosHeight -= 75) {
        var letras = document.createElement('div');
        letras.setAttribute('id', idLetras);
        letras.classList.add('letras');
        letras.style.width = window.innerHeight;
        desktop.appendChild(letras);

        idLetras += 1;

        Numeros();
    }

    //Numeros

    function Numeros() {
        var tamanhosWidth = tamanhos.width
        for (var tamanhoSquare = 75; tamanhoSquare < tamanhosWidth; tamanhosWidth -= 75) {
            var numeros = document.createElement('div');
            numeros.setAttribute('id', idNumeros);
            numeros.classList.add('nenhum')
            numeros.classList.add('numeros');
            letras.appendChild(numeros);

            idNumeros += 1

            numeros.addEventListener('contextmenu', function() {
                var X = event.clientX;
                var Y = event.clientY;
                var id = this.id;
                var numeros = document.getElementById(id)
                numerosRightClick(X, Y, id, numeros);
            })
        }
    }
}

squares()

function numerosRightClick(X, Y, id, numeros) {
    var postCreate = document.querySelector('#postCreate')
    postCreate.style.display = 'none'
    rightVazio.style.display = 'none'
    newExt.style.display = 'none'

    if (numeros.classList[0] == 'nenhum') { //se não existir nada no quadrado

        rightVazio.style.display = 'block'
        rightVazio.style.left = X + 'px';
        rightVazio.style.top = Y + 'px';

        New.onmouseover = function() {
            newExt.style.display = 'block';
            newExt.style.left = X + 180 + 'px';
            newExt.style.top = Y + 'px';
        }

        chooseBack.onclick = function() {
            newExt.style.display = 'none'
            rightVazio.style.display = 'none'

            chooseBackDiv.style.display = 'block'

            var chooseButton = document.querySelector('#choose').onclick = function() {
                var pathInput = document.querySelector('#inputBack').value
                chooseBackDiv.style.display = 'none'

                document.getElementById('inputBack').addEventListener('change', readURL(), true);

                function readURL() {
                    var file = document.getElementById("inputBack").files[0];
                    var reader = new FileReader();
                    reader.onloadend = function() {
                        localStorage.setItem('background', reader.result)
                        site.style.backgroundImage = "url(" + reader.result + ")";
                        site.style.backgroundSize = window.innerWidth + 'px'
                    }
                    if (file) {
                        reader.readAsDataURL(file);
                    } else {}
                }
            }
        }

        folder.onclick = function() {
            rightVazio.style.display = 'none'
            newExt.style.display = 'none'

            var input = document.createElement('input')
            input.classList.add('inputC')
            numeros.appendChild(input)
            input.focus()

            input.addEventListener('keydown', function(event) {
                if (event.keyCode == 13) {
                    var inputValue = input.value
                    numeros.removeChild(input)

                    var name = document.createElement('h5')
                    name.classList.add('name')
                    name.innerText = inputValue
                    numeros.appendChild(name)
                }
            })

            var imgFolder = document.createElement('img')
            imgFolder.src = '../folder.png'
            imgFolder.id = 'imgFolder'
            numeros.appendChild(imgFolder)

            var H50 = (window.innerHeight * 75) / 100;
            var W50 = (window.innerWidth * 75) / 100;

            var contentFolder = document.createElement('div')
            contentFolder.style.width = W50
            contentFolder.style.height = H50
            contentFolder.style.display = 'none'
            contentFolder.classList.add('contentFolder')
            numeros.appendChild(contentFolder)

            var contentTop = document.createElement('div')
            contentTop.classList.add('contentTop')
            contentFolder.appendChild(contentTop)

            var buttons = document.createElement('div')
            buttons.classList.add('buttons')
            contentTop.appendChild(buttons)


            var maxMin = document.createElement('button')
            maxMin.id = 'maxMin'
            maxMin.classList.add('maxMin', 'max')
            buttons.appendChild(maxMin)
            maxMin.innerHTML = '[]'
            var mm = 'max'

            maxMin.onclick = function() {
                if (mm === 'max') {
                    contentFolder.style.width = window.innerWidth + 'px'
                    contentFolder.style.height = window.innerHeight + 'px'

                    mm = 'min'
                } else if (mm === 'min') {
                    contentFolder.style.width = W50 + 'px'
                    contentFolder.style.height = H50 + 'px'

                    mm = 'max'
                }
            }

            var close = document.createElement('button')
            close.classList.add('close')
            buttons.appendChild(close)
            close.innerText = 'x'

            numeros.classList.remove('nenhum', 'numeros')
            numeros.classList.add('arquivo', 'numeros', 'folder')
        }
        console.log(numeros)
        numeros.onmouseover = function(event) {
            console.log('opa')
            event.preventDefault()
            var contentFolder = document.querySelector('.contentFolder')
            if (numeros.classList[0] == 'arquivo') {
                numeros.style.backgroundColor = 'rgba(77, 219, 221, 0.534)'
            }
        }

        numeros.onmouseleave = function() {
            numeros.style.backgroundColor = ''
        }

    } else if (numeros.classList[0] == 'arquivo') { //se exister algum arquivo dentro do quadrado
        var numeros = document.getElementById(id)
        postCreate.style.display = 'flex'
        postCreate.style.left = X + 'px';
        postCreate.style.position = 'absolute'
        postCreate.style.top = Y + 'px';
        postCreate.style.zIndex = '8000'
        postCreate.style.fontFamily = 'sans-serif'

        var name = document.querySelector('.name')
    }

    var open = document.querySelector('#open')
    numeros.addEventListener('dblclick', function() {
        openF(id)
    })
    open.onclick = function() {
        postCreate.style.display = 'none'
        openF(id)
    }
}

function openF(id) {
    var H50 = (window.innerHeight * 75) / 100;
    var W50 = (window.innerWidth * 75) / 100;
    var mm = 'max'

    var contentFolder = document.querySelector('.contentFolder')
    contentFolder.style.width = W50 + 'px'
    contentFolder.style.height = H50 + 'px'
    contentFolder.style.display = 'block'

    var close = document.querySelector('.close')
    close.onclick = function() {
        var contentFolder = document.querySelector('.contentFolder')
        contentFolder.style.display = 'none'
    }
    contentFolder.addEventListener('contextmenu', function() {
        // numeros.addEventListener('contextMenu', function() {})


    })
}

function trash() {
    var numeros = document.getElementById('0')
}