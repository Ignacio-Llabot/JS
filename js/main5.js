'use strict';

const getListaClases = () => {return JSON.parse(localStorage.getItem('listaClasesJSON'))}
const updateListaClases = () => {localStorage.setItem('listaClasesJSON', JSON.stringify(listaClases))}
const listaClases = getListaClases() || []


class Clase {  // creador de alumnos
    constructor(materia) {
        this.materia = materia
        this.tareas = 0
        this.pruebas = 0
        this.promedios = []
    }
}

const addMateria = (materia) => {
    const cl = new Clase (materia)
    listaClases.push(cl)
    updateListaClases()
}

const addClaseHTML = () => {
    const materia = prompt('que materia desea agregar?')
    if (materia == '' || materia == null) {return};
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
        <h2 class="accordion-header" id="heading${i+1}">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i+1}" aria-expanded="false" aria-controls="collapse${i+1}">
             Tarea #${i+1}
            </button>
        </h2>


        <div id="collapse${i+1}" class="accordion-collapse collapse" aria-labelledby="heading${i+1}" data-bs-parent="#accordionMain">
            <div class="accordion-body">
          <strong>Notas</strong>
          <p>Aca irian las notas de los alumnos</p>
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
            <div class="accordion-body">
          <strong>Notas</strong>
          <p>Aca irian las notas de los alumnos</p>
            </div>
        </div>
        `
        
        mainDiv.appendChild(div)
    }
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

btnNuevaClase.addEventListener('click', addClaseHTML)
btnNuevaT.addEventListener('click', nuevaTarea)
btnNuevaP.addEventListener('click', nuevaPrueba)

