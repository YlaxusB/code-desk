var deskTop = document.querySelector('#desktop')
var New = document.querySelector('#new')
var changeDesktop = document.querySelector('#desktopChange')
var toCreate = document.querySelector('#toCreate')
var folder = document.querySelector('#folder')
var canvas = document.querySelector('#canvas')
var textDocument = document.querySelector('textDocument')
var afterCreate = document.querySelector('#afterCreate')
var open = document.querySelector('#open')
var body = document.querySelector('#body')
var Id = 0
var arquivoDentro;
var fromLocal = JSON.parse(localStorage.getItem('desktop'))
var contentFolder = ''
var openFromContent = document.querySelector('#openFromContent')
var FromContent = document.querySelector('#fromContent')

openFromContent.style.display = 'none'
openFromContent.style.zIndex = '100000'

function tamanhos() {
    deskTop.style.background = 'url(../planets-from-space-space-planets-photos-and-wallpapers-earth-blog-uranium-on-planets-space-engineers.jpg)'
    deskTop.style.backgroundSize = `${window.innerWidth}px,${window.innerHeight}px` //tamanho do background
    deskTop.style.backgroundRepeat = 'no-repeat'

    body.style.width = window.innerWidth + 'px' //tamanho do body
    body.style.height = window.innerHeight + 'px'
}
tamanhos()

New.onmouseover = function() {
    toCreate.style.display = 'block'
}
New.onmouseleave = function() {
    toCreate.style.display = 'none'
}

toCreate.onmouseover = function() {
    toCreate.style.display = 'block'
}

toCreate.onmouseleave = function() {
    toCreate.style.display = 'none'
}

open.onmouseleave = function() {
    open.style.display = 'none'
    afterCreate.style.display = 'none'
}

function CriarEspacos() {
    var deskTopSize = {
        width: window.innerWidth,
        height: window.innerHeight - 75
    }
    var espacos = 75
    for (; espacos < deskTopSize.height; deskTopSize.height -= 75) {
        var espacosLetras = document.createElement('div')
        espacosLetras.classList.add('Letras')
        espacosLetras.style.width = window.innerHeight
        deskTop.appendChild(espacosLetras)

        espacosNumerosIteration(espacos, deskTopSize, espacosLetras)
        var deskTopSize = {
            width: window.innerWidth,
            height: deskTopSize.height,
        }
    }
}
CriarEspacos()

function openClick(espacosNumeros, Id, criarArquivos) {
    // deskTop.appendChild(qualquer)

    /*if (localStorage.getItem('desktop')) {

    } else {}*/

    criarArquivos.style.display = 'none'
    var porcentagem = 50;
    var H50 = (window.innerHeight * 75) / 100;
    var W50 = (window.innerWidth * porcentagem) / 100;

    var IdImg = espacosNumeros.id
    var idImg = document.getElementById(IdImg)
    var fromLocal = JSON.parse(localStorage.getItem('desktop'))
    if (localStorage.getItem('desktop')) {
        for (let i = 0; i < fromLocal.length; i++) {
            if (fromLocal[i].Id == Id) { //&& idImg == Id) {
                var contentFolder = document.getElementById('contentFolder')
                console.log(contentFolder)
                if (contentFolder != null) { //existe
                    contentFolder.style.display = 'block'

                    var closeButton = document.querySelector('maximaze' + fromLocal[i].Id)
                } else if (contentFolder == null) {
                    naoExiste()
                }

            } else {
                naoExiste()
            }
        }
    } else {
        naoExiste()
    }

    function naoExiste() {
        var contentFolder = document.createElement('div')
        contentFolder.setAttribute('id', 'contentFolder')
        contentFolder.classList.add('Folder')
        contentFolder.style.width = W50 + 'px'
        contentFolder.style.height = H50 + 'px'
        contentFolder.style.backgroundColor = 'rgb(46, 46, 46)'
            // var espacosNumeros = document.getElementById(Id)
        espacosNumeros.appendChild(contentFolder)

        var topFolder = document.createElement('div')
        topFolder.classList.add(`topFolder${Id}`)
        topFolder.style.display = 'flex'
        topFolder.style.height = '40px'
        topFolder.style.width = W50 + 'px'
        topFolder.style.backgroundColor = 'rgb(25, 25, 25)'
        contentFolder.appendChild(topFolder)

        var closeButton = document.createElement('button')
        closeButton.innerHTML = 'X'
        closeButton.classList.add('closeButton')
        closeButton.classList.add('closeButton' + Id)
        topFolder.appendChild(closeButton)


        var maximaze = document.createElement('button')
        maximaze.innerHTML = '[]'
        maximaze.classList.add('maximaze')
        maximaze.classList.add('maximaze' + Id)
        topFolder.appendChild(maximaze)
    }
    var closeButton = document.querySelector(`.closeButton${Id}`)
    var topFolder = document.querySelector(`.topFolder${Id}`)
    var maximaze = document.querySelector('.maximaze')
    var contentFolder = document.querySelector('.Folder')

    closeButton.onclick = function() { closeButtonFunction() }

    function closeButtonFunction() {
        var closeButton = document.querySelector(`.closeButton${Id}`)

        contentFolder.style.display = 'none'
        criarArquivos.style.display = 'none'

        var fromLocal = JSON.parse(localStorage.getItem('desktop'))
        if (localStorage.getItem('desktop') != null) { //existe
            for (let i = 0; i < fromLocal.length; i++) {
                console.log(Id)
                if (fromLocal[i].Id == Id) {
                    var encontrado = fromLocal.findIndex(function(from) {
                        return Id == from.Id
                    })
                    console.log(encontrado)
                    delete fromLocal[encontrado]
                    console.log(espacosNumeros)
                    console.log(fromLocal)
                    var toLocal = { espacosNumeros: `${espacosNumeros.innerHTML}`, Id }
                        // var FromLocal = JSON.parse(localStorage.getItem('desktop'))
                        //var FromLocal = FromLocal.splice(i, 1)
                    if (fromLocal == ['']) {
                        var toLocalFinal = [toLocal]
                        localStorage.setItem('desktop', JSON.stringify(toLocalFinal))
                    } else if (fromLocal != ['']) {
                        var toLocalFinal = [...fromLocal, toLocal]
                        localStorage.setItem('desktop', JSON.stringify(toLocalFinal))
                    }
                }
            }
        } else if (localStorage.getItem('desktop') == null) { // não existe
            var toLocalFinal = [{ espacosNumeros: `${espacosNumeros.innerHTML}`, Id }]
            localStorage.setItem('desktop', JSON.stringify(toLocalFinal))
        }
        var qualquer = document.createElement('div')
        qualquer.setAttribute('id', Id)
        qualquer.classList.add('Numeros')
        qualquer.innerHTML = JSON.parse(localStorage.getItem('desktop'))

    }

    var maxMin = 'max'
    maximaze.onclick = function() {
        if (maxMin == 'max') {
            topFolder.style.width = window.innerWidth + 'px'
            contentFolder.style.width = window.innerWidth + 'px'
            contentFolder.style.height = window.innerHeight + 'px'
            maxMin = 'min'
        } else if (maxMin == 'min') {
            contentFolder.style.width = W50 + 'px'
            contentFolder.style.height = H50 + 'px'
            topFolder.style.height = '40px'
            topFolder.style.width = W50 + 'px'
            maxMin = 'max'
        }
    }

    contentFolder.addEventListener('contextmenu', function() {
        var X = event.clientX
        var Y = event.clientY

        var criarArquivosFolder = document.querySelector('#criarArquivosFolder');
        var toCreateFolder = document.querySelector('#toCreateFolder');
        var folderFromFolder = document.querySelector('#folderFromFolder')

        criarArquivosFolder.style.top = `${Y}px`
        criarArquivosFolder.style.left = `${X}px`
        criarArquivosFolder.style.display = 'block'
        criarArquivosFolder.style.position = 'fixed'
        criarArquivosFolder.style.zIndex = '9000'

        criarArquivosFolder.appendChild(toCreateFolder)
        toCreateFolder.style.top = `${Y}px`
        toCreateFolder.style.left = `${X}px`
        toCreateFolder.style.position = 'fixed'
        toCreateFolder.style.marginLeft = '200px'
        toCreateFolder.style.zIndex = '9000'


        var newFromFolder = document.querySelector('#newFromFolder')

        newFromFolder.onmouseover = function() {
            toCreateFolder.style.display = 'block'
        }
        newFromFolder.onmouseleave = function() {
            toCreateFolder.style.display = 'none'
        }

        toCreateFolder.onmouseover = function() {
            toCreateFolder.style.display = 'block'
        }
        toCreateFolder.onmouseleave = function() {
            toCreateFolder.style.display = 'none'
        }

        contentFolder.onclick = function() {
            criarArquivosFolder.style.display = 'none'
        }

        folderFromFolder.onclick = function() {
            var contentDiv = document.createElement('div')
            contentFolder.appendChild(contentDiv)
            contentDiv.classList.add('contentDiv')

            var FolderCreate = document.createElement('img')
            FolderCreate.setAttribute('src', '../folder.png')
            FolderCreate.classList.add('folderCreateFromFolder')
            contentDiv.appendChild(FolderCreate)

            var createInput = document.createElement('input')
            createInput.classList.add('createInput')
            contentDiv.appendChild(createInput)
            createInput.focus()

            createInput.addEventListener('keydown', function(event) {
                if (event.keyCode == 13) {
                    var h5 = document.createElement('h4')
                    h5.classList.add('h5Folder')
                    h5.innerText = createInput.value
                    contentDiv.removeChild(createInput)
                    contentDiv.appendChild(h5)
                    createInput.value = ''
                }
            })
            contentDiv.addEventListener('contextmenu', function() {
                contentDivClick()
            })


            function contentDivClick() {
                var Id = (this.id)
                var X = event.clientX
                var Y = event.clientY
                open.style.display = 'block'

                /*  afterCreate.style.display = 'block'
                  afterCreate.style.top = `${Y}px`
                  afterCreate.style.left = `${X}px`
                  afterCreate.style.display = 'block'
                  afterCreate.style.position = 'fixed'
                  afterCreate.style.zIndex = '9000'*/

                criarArquivos.style.display = 'none'
                toCreate.style.display = 'none'
            }
            //var contentDiv = document.querySelector('.contentDiv')
            contentDiv.addEventListener('dblclick', function() {
                //contentDiv.onclick = function() {
                // 
                var X = event.clientX
                var Y = event.clientY

                FromContent.style.display = 'block'
                FromContent.style.top = `${Y}px`
                FromContent.style.left = `${X}px`
                FromContent.style.display = 'block'
                FromContent.style.position = 'fixed'
                FromContent.style.zIndex = '600000'
            })
        }

        //})
        // contentDiv.addEventListener('contextmenu', function() {
        //     openClick()
        //     criarArquivosFolder.style.display = 'none'
        //  })
    })
}

function espacosNumerosIteration(espacos, deskTopSize, espacosLetras) {
    for (; espacos < deskTopSize.width; deskTopSize.width -= 75) {
        criarEspacosNumeros(espacosLetras, deskTopSize)
    }
}

function criarEspacosNumeros(espacosLetras, deskTopSize) {
    var espacosNumeros = document.createElement('div')
    espacosNumeros.classList.add('nenhum')
    espacosNumeros.setAttribute('id', Id)
    espacosNumeros.classList.add('Numeros')
    espacosLetras.appendChild(espacosNumeros)

    espacosNumeros.addEventListener('contextmenu', function() {
        var Id = (this.id)
        var X = event.clientX
        var Y = event.clientY
        rightClick(deskTopSize, espacosNumeros, Y, X, Id)
    })
    Id += 1
}

function rightClick(deskTopSize, espacosNumeros, Y, X, Id) { //quando apertar botão direito abrir interface de criar
    console.log('pora', Id)
    var fromLocal = JSON.parse(localStorage.getItem('desktop'))
    var deskTopSize = {
        width: window.innerWidth,
        height: deskTopSize.height,
    }
    var criarArquivos = document.querySelector('#criarArquivos');

    if (localStorage.getItem('desktop')) {
        for (let i = 0; i < fromLocal.length; i++) {
            console.log(fromLocal[i].Id, Id)
            if (fromLocal[i].Id == Id) {
                var IdH = fromLocal[i].Id;
                var espacosNumeros = document.getElementById(IdH);
                //                                                         depois que a pasta ja estiver criada
                open.style.display = 'block' //                                           clicar botao direito

                var X = event.clientX
                var Y = event.clientY

                afterCreate.style.display = 'block'
                afterCreate.style.top = `${Y}px`
                afterCreate.style.left = `${X}px`
                afterCreate.style.display = 'block'
                afterCreate.style.position = 'fixed'
                afterCreate.style.zIndex = '4000'

                criarArquivos.style.display = 'none'
                toCreate.style.display = 'none'
                    //openClick(espacosNumeros, Id)
                open.onclick = function() {
                    if (localStorage.getItem('desktop')) {
                        createFolderFromLocal()
                    }
                    openClick(espacosNumeros, Id, criarArquivos)
                }


            } else {
                var espacosNumeros = document.getElementById(Id);
                toCreate.style.display = 'none';
                criarArquivos.style.top = `${Y}px`;
                criarArquivos.style.left = `${X}px`;
                criarArquivos.style.display = 'block';
                criarArquivos.style.position = 'fixed';
                criarArquivos.style.zIndex = '4000';

                criarArquivos.appendChild(toCreate);
                toCreate.style.top = `${Y}px`;
                toCreate.style.left = `${X}px`;
                toCreate.style.position = 'fixed';
                toCreate.style.marginLeft = '200px';
                toCreate.style.zIndex = '4000';
            }
        }
    } else {
        var espacosNumeros = document.getElementById(Id);
        toCreate.style.display = 'none';
        criarArquivos.style.top = `${Y}px`;
        criarArquivos.style.left = `${X}px`;
        criarArquivos.style.display = 'block';
        criarArquivos.style.position = 'fixed';
        criarArquivos.style.zIndex = '4000';

        criarArquivos.appendChild(toCreate);
        toCreate.style.top = `${Y}px`;
        toCreate.style.left = `${X}px`;
        toCreate.style.position = 'fixed';
        toCreate.style.marginLeft = '200px';
        toCreate.style.zIndex = '4000';
    }
    folder.onclick = function() { FolderClick(Id, X, Y) }
}

if (localStorage.getItem('desktop')) {
    createFolderFromLocal()
}

function createFolderFromLocal() {
    var fromLocal = JSON.parse(localStorage.getItem('desktop'))
    if (JSON.parse(localStorage.getItem('desktop'))) {
        for (let i = 0; i < fromLocal.length; i++) {
            //  console.log(espacosNumeros)
            //  var Id = espacosNumeros.id
            var espacosNumeros = document.getElementById(fromLocal[i].Id)
            console.log(fromLocal[i].Id, espacosNumeros)
            console.log(fromLocal[i].Id)
            espacosNumeros.innerHTML = fromLocal[i].espacosNumeros
        }
    }

}

deskTop.onclick = function() {
    criarArquivos.style.display = 'none'
    afterCreate.style.display = 'none'
}

function FolderClick(Id, X, Y) { //                          cria a pasta          
    var espacosNumeros = document.getElementById(Id) //      cria a pasta                              
    espacosNumeros.classList.remove('nenhum') //             cria a pasta                                     

    var FolderCreate = document.createElement('img')
    FolderCreate.setAttribute('id', Id)
    FolderCreate.setAttribute('src', '../folder.png')
    FolderCreate.classList.add('folderCreate')
    espacosNumeros.appendChild(FolderCreate)

    createInputFunc(espacosNumeros)

    criarArquivos.style.display = 'none'

    espacosNumeros.onmouseover = function() {
        espacosNumeros.style.backgroundColor = 'rgba(67, 255, 255, 0.445)'
    }
    espacosNumeros.onmouseleave = function() {
        espacosNumeros.style.backgroundColor = ''
    }

    espacosNumeros.addEventListener('contextmenu', function() { // depois que a pasta ja estiver criada
        open.style.display = 'block' //                                           clicar botao direito


        var X = event.clientX
        var Y = event.clientY

        afterCreate.style.display = 'block'
        afterCreate.style.top = `${Y}px`
        afterCreate.style.left = `${X}px`
        afterCreate.style.display = 'block'
        afterCreate.style.position = 'fixed'
        afterCreate.style.zIndex = '4000'
        console.log("aasadtgshd9fsdgdfg")

        criarArquivos.style.display = 'none'
        toCreate.style.display = 'none'
    })
    open.onclick = function() {
        if (localStorage.getItem('desktop')) {
            createFolderFromLocal()
        }
        openClick(espacosNumeros, Id, criarArquivos)
    }


    espacosNumeros.addEventListener('dblclick', function() { // double click pra abrir pasta
        openClick(espacosNumeros, Id, criarArquivos)
    })
}


function createInputFunc(espacosNumeros) {
    var createInput = document.createElement('input')
    createInput.style.width = '71px'
    espacosNumeros.appendChild(createInput)
    createInput.focus()

    createInput.addEventListener('keydown', function(event) {
        if (event.keyCode == 13) {
            var input = createInput.value;
            espacosNumeros.removeChild(createInput);

            var h5 = document.createElement('h5');
            espacosNumeros.appendChild(h5);

            input = input.substring(0, 10);
            h5.innerText += input

            if (localStorage.getItem('desktop') != null) { //existe
                var Id = (espacosNumeros.id)
                console.log(Id)
                var toLocal = { espacosNumeros: `${espacosNumeros.innerHTML}`, Id }
                var FromLocal = JSON.parse(localStorage.getItem('desktop'))
                    //var FromLocal = FromLocal.splice(i, 1)

                var toLocalFinal = [...FromLocal, toLocal]
                localStorage.setItem('desktop', JSON.stringify(toLocalFinal))

            } else if (localStorage.getItem('desktop') == null) { // não existe
                var Id = (espacosNumeros.id)
                var toLocalFinal = [{ espacosNumeros: `${espacosNumeros.innerHTML}`, Id }]
                localStorage.setItem('desktop', JSON.stringify(toLocalFinal))
            }
        }
    })
}

openFromContent.onclick = function() {
    var criarArquivosOFC = document.querySelector('#fromContent')
    var espacosNumeros = document.getElementById(fromLocal[0].Id)

    var porcentagem = 50;
    var H50 = (window.innerHeight * 75) / 100;
    var W50 = (window.innerWidth * porcentagem) / 100;

    /*    var fromLocal = JSON.parse(localStorage.getItem('desktop'))
        var espacosNumeros = document.getElementById(fromLocal[0].Id)
        var Id = fromLocal[0].Id
        openFromContent.style.display = 'block'
        criarArquivos.setAttribute('id', 'criarArquivos')
        openClick(espacosNumeros, Id, criarArquivos)*/

    var contentFolder = document.createElement('div')
    contentFolder.setAttribute('id', 'contentFolder')
    contentFolder.classList.add('Folder')
    contentFolder.style.width = W50 + 'px'
    contentFolder.style.height = H50 + 'px'
    contentFolder.style.backgroundColor = 'rgb(46, 46, 46)'
        // var espacosNumeros = document.getElementById(Id)
    espacosNumeros.appendChild(contentFolder)

    var topFolder = document.createElement('div')
    topFolder.style.display = 'flex'
    topFolder.style.height = '40px'
    topFolder.style.width = W50 + 'px'
    topFolder.style.backgroundColor = 'rgb(25, 25, 25)'
    contentFolder.appendChild(topFolder)

    var closeButton = document.createElement('button')
    closeButton.innerHTML = 'X'
    closeButton.classList.add('closeButton')
    closeButton.classList.add('closeButton' + Id)
    topFolder.appendChild(closeButton)


    var maximaze = document.createElement('button')
    maximaze.innerHTML = '[]'
    maximaze.classList.add('maximaze')
    maximaze.classList.add('maximaze' + Id)
    topFolder.appendChild(maximaze)

    closeButton.onclick = function() {
        contentFolder.style.display = 'none'
    }

    var maxMin = 'max'
    maximaze.onclick = function() {
        if (maxMin == 'max') {
            topFolder.style.width = window.innerWidth + 'px'
            contentFolder.style.width = window.innerWidth + 'px'
            contentFolder.style.height = window.innerHeight + 'px'
            maxMin = 'min'
        } else if (maxMin == 'min') {
            contentFolder.style.width = W50 + 'px'
            contentFolder.style.height = H50 + 'px'
            topFolder.style.height = '40px'
            topFolder.style.width = W50 + 'px'
            maxMin = 'max'
        }
    }

    //closeButtonFunction() //closeButton, maximaze, contentFolder)
}