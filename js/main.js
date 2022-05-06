const getListaClases = () => JSON.parse(localStorage.getItem('listaClasesJSON'))
const updateListaClases = () => {
    localStorage.removeItem('listaClasesJSON')
    localStorage.setItem('listaClasesJSON', JSON.stringify(listaClases))
}
const listaClases = getListaClases() || []

const getListaAlumnos = () => JSON.parse(localStorage.getItem('listaAlumnosJSON'))
const updateListaAlumnos = () => {localStorage.setItem('listaAlumnosJSON', JSON.stringify(listaAlumnos))}
const listaAlumnos = getListaAlumnos() || []

class Clase {
    constructor (mat) {
        this.materia = mat
        this.tareas = 0
        this.pruebas = 0
        }
}

const addTarea = () => {
    const titulo = document.getElementById('tituloClase').innerText
    if (titulo === 'Clase #') {
        swal({
            title: "Error",
            text: "Seleccione una clase valida",
            icon: "error",
          });
        return
    }
    const materia = reachClase(titulo).materia
    reachClase(titulo).tareas++
    listaAlumnos.forEach(e => e.tareas.push(new Nota(materia, reachClase(titulo).tareas, 0)))
    showHTML(materia)
    updateListaClases()
    updateListaAlumnos()
}

const addPrueba = () => {
    const titulo = document.getElementById('tituloClase').innerText
    if (titulo === 'Clase #') {
        swal({
            title: "Error",
            text: "Seleccione una clase valida",
            icon: "error",
          });
        return
    }
    const materia = reachClase(titulo).materia
    reachClase(titulo).pruebas++
    listaAlumnos.forEach(e => e.pruebas.push(new Nota(materia, reachClase(titulo).pruebas, 0)))
    showHTML(materia)
    updateListaClases()
    updateListaAlumnos()
}

class Alumno {
    constructor (al) {
        this.nombre = al
        this.tareas = []
        this.pruebas = []
    }
}

class Nota {
    constructor(mat, n, nota) {
        this.materia = mat
        this.numero = n
        this.nota = nota
    }
}

const reachClase = (mat) => listaClases[listaClases.indexOf(listaClases.find(e => e.materia == mat))]
const addClase = (mat) => {
    listaClases.push(new Clase(mat)); 
    updateListaClases()
}

const reachAlumno = (al) => listaAlumnos[listaAlumnos.indexOf(listaAlumnos.find(e => e.materia == al))]
const addAlumno = (al) => {
    const alumno = new Alumno(al)
    const materias = listaClases.map(e => e.materia)
    
    materias.forEach(e => {
        const clase = reachClase(e)
        const countT = clase.tareas
        for (let i = 1; i <= countT; i++) {
            const nota = new Nota(e, i, 0)
            alumno.tareas.push(nota)
        }
    })

    materias.forEach(e => {
        const clase = reachClase(e)
        const countP = clase.pruebas
        for (let i = 1; i <= countP; i++) {
            const nota = new Nota(e, i, 0)
            alumno.pruebas.push(nota)
        }
    })

    listaAlumnos.push(alumno)

    updateListaAlumnos()
}


const addClaseHTML = () => {
    const input = document.getElementById('claseInput')
    const materia = input.value
    if (materia == '' || materia == null || materia == ' ') {
        swal({
            title: "Error",
            text: "Ingrese un nombre valido",
            icon: "error",
          });
        return
    };
    input.value = null
    addClase(materia)
    const contenedor = document.getElementById('clasesDiv')
    const boton = document.createElement('button')
    boton.classList.add('list-group-item', 'list-group-item-action')
    boton.setAttribute('id', `boton${materia}`)
    boton.innerHTML = materia
    boton.setAttribute("onclick",`showHTML('${materia}')`);
    contenedor.append(boton)
}

const addAlumnoHTML = () => {
    const input = document.getElementById('alumnoInput')
    const nombre = input.value
    if (nombre == '' || nombre == null || nombre == ' ') {
        swal({
            title: "Error",
            text: "Ingrese un nombre valido",
            icon: "error",
          });
        return
    };
    input.value = null
    addAlumno(nombre)
}

const deleteMateria = () => {
    if(document.getElementById('tituloClase').innerHTML == 'Clase #'){
        swal({
            title: "Error",
            text: "Seleccione una clase valida",
            icon: "error",
          });
        return
    }
    const cl = reachClase(document.getElementById('tituloClase').innerHTML)
    const clIndex = listaClases.indexOf(listaClases.find(el => el.materia == cl.materia))
    const mainDiv = document.getElementById('accordionMain')
    const clBtn = document.getElementById(`boton${cl.materia}`)
    const titulo = document.getElementById('tituloClase')
    clBtn.remove()
    listaClases.splice(clIndex, 1)
    mainDiv.innerHTML = ''
    titulo.innerHTML = 'Clase #'
    updateListaClases()

    listaAlumnos.forEach(al => {
        const tareas = al.tareas
        const pruebas = al.pruebas
        const tareasFilter = tareas.filter(el => {
            el.materia != cl.materia
        })
        al.tareas = tareasFilter
        const pruebasFilter = pruebas.filter(el => {
            el.materia != cl.materia
        })
        al.pruebas = pruebasFilter
    })
    updateListaAlumnos()
}

const deleteAlumno = () => {
    const input = document.getElementById('alumnoInputDelete')
    const nombre = input.value
    if (nombre == '' || nombre == null || nombre == ' ') {
        swal({
            title: "Error",
            text: "Ingrese un nombre valido",
            icon: "error",
          });
        return
    };
    input.value = null
    const indexal = listaAlumnos.indexOf(listaAlumnos.find(e => e.nombre == nombre))
    console.log(indexal)
    listaAlumnos.splice(indexal, 1)
    updateListaAlumnos()
}

const loadClases = () => {
    if(getListaClases() == null) {return}
    listaClases.forEach(e => {
        const contenedor = document.getElementById('clasesDiv')
        const boton = document.createElement('button')
        boton.classList.add('list-group-item', 'list-group-item-action')
        boton.setAttribute('id', `boton${e.materia}`)
        boton.innerHTML = e.materia
        boton.setAttribute("onclick",`showHTML('${e.materia}')`);
        contenedor.append(boton)
    })
}

const showHTML = (mat) => {
    const boton = document.getElementById(`boton${mat}`)
    document.getElementById('tituloClase').innerHTML = boton.innerHTML

    const countT = reachClase(mat).tareas
    const countP = reachClase(mat).pruebas
    const mainDiv = document.getElementById('accordionMain')
    mainDiv.innerHTML = ' '

    for (let i = 1; i <= countT; i++) {
        const div = document.createElement('div')
        div.classList.add("accordion-item")
        div.innerHTML = `
        <h2 class="accordion-header" id="headingT${i}">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseT${i}" aria-expanded="false" aria-controls="collapseT${i}">
                <strong>Tarea #${i}</strong>
            </button>
        </h2>

        <div id="collapseT${i}" class="accordion-collapse collapse" aria-labelledby="headingT${i}" data-bs-parent="#accordionMain">
            <div id="divTarea${i}" class="accordion-body container-flex">

            </div>
        </div>
        `
        mainDiv.appendChild(div)

        listaAlumnos.forEach(e => {
            const divAl = document.createElement('div')
            divAl.setAttribute('id', `div${e.nombre}`)
            divAl.setAttribute('class', 'row')

            const pNombre = document.createElement('p')
            pNombre.setAttribute('class', 'col-6')
            pNombre.innerText = e.nombre

            const pNota = document.createElement('input')
            pNota.setAttribute('class', 'col-6')
            pNota.setAttribute('id', `nota-${mat}-${e.nombre}-${i}-t`)
            pNota.setAttribute('type', 'text')
            pNota.setAttribute('style', 'border: none; display: inline-block')
            const notaObj = e.tareas.find(e => e.materia == mat && e.numero == i)
            pNota.value = notaObj.nota

            pNota.addEventListener('change', () => {
                notaObj.nota = parseInt(pNota.value)
                updateListaAlumnos()
            })



            divAl.append(pNombre)
            divAl.append(pNota)

            const c = document.getElementById(`divTarea${i}`)
            c.appendChild(divAl)
        })
    }
    for (let i = 1; i <= countP; i++) {
        const div = document.createElement('div')
        div.classList.add("accordion-item")
        div.innerHTML = `
        <h2 class="accordion-header" id="headingP${i}">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseP${i}" aria-expanded="false" aria-controls="collapseP${i}">
                <strong>Prueba #${i}</strong>
            </button>
        </h2>

        <div id="collapseP${i}" class="accordion-collapse collapse" aria-labelledby="headingP${i}" data-bs-parent="#accordionMain">
            <div id="divPrueba${i}" class="accordion-body container-flex">

            </div>
        </div>
        `
        mainDiv.appendChild(div)

        listaAlumnos.forEach(e => {
            const divAl = document.createElement('div')
            divAl.setAttribute('id', `div${e.nombre}`)
            divAl.setAttribute('class', 'row')

            const pNombre = document.createElement('p')
            pNombre.setAttribute('class', 'col-6')
            pNombre.innerText = e.nombre

            const pNota = document.createElement('input')
            pNota.setAttribute('class', 'col-6')
            pNota.setAttribute('id', `nota-${mat}-${e.nombre}-${i}-p`)
            pNota.setAttribute('type', 'text')
            pNota.setAttribute('style', 'border: none; display: inline-block')
            const notaObj = e.pruebas.find(e => e.materia == mat && e.numero == i)
            pNota.value = notaObj.nota

            pNota.addEventListener('change', () => {
                notaObj.nota = parseInt(pNota.value)
                updateListaAlumnos()
            })



            divAl.append(pNombre)
            divAl.append(pNota)

            const c = document.getElementById(`divPrueba${i}`)
            c.appendChild(divAl)
        })
    }
    
}

const btnNuevaClase = document.getElementById('btnNuevaClase')
btnNuevaClase.addEventListener('click', addClaseHTML)

const btnDelete = document.getElementById('btnDelete')
btnDelete.addEventListener('click', deleteMateria)

const btnTarea = document.getElementById('btnNuevaT')
btnTarea.addEventListener('click', addTarea)

const btnPrueba = document.getElementById('btnNuevaP')
btnPrueba.addEventListener('click', addPrueba)

const btnNuevoAlumno = document.getElementById('btnNuevoAlumno')
btnNuevoAlumno.addEventListener('click', addAlumnoHTML)

const btnDeleteAlumno = document.getElementById('btnDeleteAlumno')
btnDeleteAlumno.addEventListener('click', deleteAlumno)


loadClases()