'use strict';

const getListaClases = () => {return JSON.parse(localStorage.getItem('listaClasesJSON'))}
const updateListaClases = () => {localStorage.setItem('listaClasesJSON', JSON.stringify(listaClases))}
const listaClases = getListaClases() || []

const getListaAlumnos = () => {return JSON.parse(localStorage.getItem('listaAlumnosJSON'))}
const updateListaAlumnos = () => {localStorage.setItem('listaAlumnosJSON', JSON.stringify(listaAlumnos))}
const listaAlumnos = getListaAlumnos() || []

class Clase {  // creador de alumnos
    constructor(materia) {
        this.materia = materia
        this.tareas = 0
        this.pruebas = 0
        this.promedios = []
    }
}

class Alumno {
    constructor(nombre) {
        this.nombre = nombre
        this.notasT = []
        this.notasP = []
    } 
}

class NotaT {
    constructor(mat, n, nota) {
        this.materia = mat
        this.numero = n
        this.nota = nota
    }
}

const addMateria = (materia) => {
    const cl = new Clase (materia)
    listaClases.push(cl)
    updateListaClases()
}

const addAlumno = (nom) => {
    const al = new Alumno(nom)
    listaAlumnos.push(al)
    updateListaAlumnos()
}

const addNotaT = (al, mat, n, nota) => {
    const nt = new NotaT(mat, n, nota)
    const alumno = reachAlumno(al)
    alumno.notasT.push(nt)
    updateListaAlumnos()
}

const deleteMateria = () => {
    const cl = reachClase(document.getElementById('tituloClase').innerHTML)
    const clIndex = listaClases.indexOf(listaClases.find(el => el.materia == cl.materia))
    const mainDiv = document.getElementById('accordionMain')
    const clBtn = document.getElementById(`boton${cl.materia}`)
    const titulo = document.getElementById('tituloClase')
    if(document.getElementById('tituloClase').innerHTML == 'Clase #'){
        alert('seleccione una clase valida')
        return
    }
    clBtn.remove()
    listaClases.splice(clIndex, 1)
    mainDiv.innerHTML = ''
    titulo.innerHTML = 'Clase #'
    updateListaClases()
} 

const addClaseHTML = () => {
    const btn = document.getElementById('claseInput')
    const materia = btn.value
    if (materia == '' || materia == null || materia == ' ') {return};
    btn.value = null
    addMateria(materia)
    const contenedor = document.getElementById('clasesDiv')
    const boton = document.createElement('button')
    boton.classList.add('list-group-item', 'list-group-item-action')
    boton.setAttribute('id', `boton${materia}`)
    boton.innerHTML = materia
    boton.setAttribute("onclick",`showTPHTML('${materia}')`);
    contenedor.append(boton)
}

const reachClase = (materia) => {
    const cl = listaClases[listaClases.indexOf(listaClases.find(el => el.materia == materia))]
    return cl
}

const reachAlumno = (nombre) => {
    const alumno = listaAlumnos[listaAlumnos.indexOf(listaAlumnos.find(el => el.nombre == nombre))]
    return alumno
}

const nuevaTarea = () => {
    const cl = reachClase(document.getElementById('tituloClase').innerHTML)
    if(document.getElementById('tituloClase').innerHTML == 'Clase #'){
        alert('seleccione una clase valida')
        return
    }
    cl.tareas++
    showTPHTML(cl.materia)
    updateListaClases()
}

const nuevaPrueba = () => {
    const cl = reachClase(document.getElementById('tituloClase').innerHTML)
    if(document.getElementById('tituloClase').innerHTML == 'Clase #'){
        alert('seleccione una clase valida')
        return
    }
    cl.pruebas++
    showTPHTML(cl.materia)
    updateListaClases()
}

const showNombresHTML = () => {
    const cantidadT = document.getElementsByClassName("ulNombresT").length
    const cantidadP = document.getElementsByClassName("ulNombresP").length
    for (let i = 1; i <= cantidadT; i++) {
        listaAlumnos.forEach(e => {
            const li = document.createElement('li')
            const ul = document.getElementById(`ulT${i}`)
            li.setAttribute('style', 'list-style: none;')
            li.setAttribute('class', 'liNombres')
            li.innerHTML = e.nombre
            ul.append(li)
        })
    }
    for (let i = 1; i <= cantidadP; i++) {
        listaAlumnos.forEach(e => {
            const li = document.createElement('li')
            const ul = document.getElementById(`ulP${i}`)
            li.setAttribute('style', 'list-style: none;')
            li.setAttribute('class', 'liNombres')
            li.innerHTML = e.nombre
            ul.append(li)
        })
    }
}

const showTPHTML = (mat) => {
    const boton = document.getElementById(`boton${mat}`)
    document.getElementById('tituloClase').innerHTML = boton.innerHTML

    const countT = reachClase(mat).tareas
    const countP = reachClase(mat).pruebas
    const mainDiv = document.getElementById('accordionMain')
    mainDiv.innerHTML = ''

    for (let i = 0; i < countT; i++) {
        const div = document.createElement('div')
        div.classList.add("accordion-item")
        div.innerHTML = `
        <h2 class="accordion-header" id="headingT${i+1}">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i+1}" aria-expanded="false" aria-controls="collapse${i+1}">
             Tarea #${i+1}
            </button>
        </h2>


        <div id="collapse${i+1}" class="accordion-collapse collapse" aria-labelledby="headingT${i+1}" data-bs-parent="#accordionMain">
            <div class="accordion-body container">
                <strong>Notas</strong>
                <div class="row">
                    <ul class="ulNombresT col-2" id="ulT${i+1}">
                    </ul>
                </div>
            </div>
        </div>
        `
        
        mainDiv.appendChild(div)
    }

    for (let i = 0; i < countP; i++) {
        const div = document.createElement('div')
        div.classList.add("accordion-item")
        div.innerHTML = `
        <h2 class="accordion-header" id="headingP${i+1}">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseP${i+1}" aria-expanded="false" aria-controls="collapseP${i+1}">
             Prueba #${i+1}
            </button>
        </h2>


        <div id="collapseP${i+1}" class="accordion-collapse collapse" aria-labelledby="headingP${i+1}" data-bs-parent="#accordionMain">
            <div class="accordion-body container">
                <strong>Notas</strong>
                <div class="row">
                    <ul class="ulNombresT col-2" id="ulT${i+1}">
                    </ul>
                </div>
            </div>
        </div>
        `
        
        mainDiv.appendChild(div)
    }
    showNombresHTML()
}



const loadClases = () => {
    if(getListaClases() == null) {return}
    listaClases.forEach(e => {
        const contenedor = document.getElementById('clasesDiv')
        const boton = document.createElement('button')
        boton.classList.add('list-group-item', 'list-group-item-action')
        boton.setAttribute('id', `boton${e.materia}`)
        boton.innerHTML = e.materia
        boton.setAttribute("onclick",`showTPHTML('${e.materia}')`);
        contenedor.append(boton)
    })
}

loadClases()








const btnNuevaClase = document.getElementById('btnNuevaClase')
const btnNuevaT = document.getElementById('btnNuevaT')
const btnNuevaP = document.getElementById('btnNuevaP')
const btnDelete = document.getElementById('btnDelete')

btnNuevaClase.addEventListener('click', addClaseHTML)
btnNuevaT.addEventListener('click', nuevaTarea)
btnNuevaP.addEventListener('click', nuevaPrueba)
btnDelete.addEventListener('click', deleteMateria)

