
const listaClases = []
const listaAlumnos = []
const listaPromedios = []

class Alumno {  // creador de alumnos
    constructor(nombre) {
        this.nombre = nombre
        this.tareas = []
        this.pruebas = []
        this.promedios = []
    }
}

class Clase {  // creador de alumnos
    constructor(materia) {
        this.materia = materia
        this.tareas = []
        this.pruebas = []
        this.promedios = []
    }
}

const crearIgnacio = () => { // funcion para testear el creador
    const ignasio = new Alumno('igna')
    listaAlumnos.push(ignasio)
}

const promediar = (lista) => {  // promediar
	const total = lista.reduce((acc, el) => acc + el, 0)
	const promedio = total / lista.length
	return promedio
}

const addAlumno = (nombre) => { // crea alumno y lo tira a listaAlumnos
    const al = new Alumno(nombre)
    listaAlumnos.push(al)
}

const addMateria = (materia) => {
    const cl = new Clase (materia)
    listaClases.push(cl)
}

listaClases.push( // clase pre-creada para testear
    {
        materia: 'fisica',
        tareas: ['Tarea 1', 'Tarea 2', 'Tarea 3'],
        pruebas: ['Prueba 1'],
        promedios: []
    }
)


listaAlumnos.push( // alumno pre-creado para testear
    {
        nombre: 'isa',
        tareas: ['fisica Tarea 1', 9, 'mate Tarea 2', 8, 'fisica Tarea 2', 7, 'fisica Tarea 3', 2],
        pruebas: ['historia Prueba 1', 5, 'ingles Prueba 3', 7, 'fisica Prueba 1', 5],
        promedios: []
    }
)

crearIgnacio()

console.log(listaAlumnos)

const reachAlumno = (alumno) => {
    const al = listaAlumnos[listaAlumnos.indexOf(listaAlumnos.find(el => el.nombre == alumno))]
    return al
}

const reachClase = (materia) => {
    const cl = listaClases[listaClases.indexOf(listaClases.find(el => el.materia == materia))]
    return cl
}


let Tes = 0  //contador de cuantas tareas
let Pes = 0  //contador de cuantas pruebas

const notaT = () => {  // busca el alumno por el nombre y saca el index. Con el index accede a la lista de tareas y pushea un string con la materia y el n° de tarea, y un int con la nota
    const name = prompt('A que alumno desea ponerle la nota?')
    const materia = prompt('Que materia?')
    const nota = parseInt(prompt('nota:'))
    const posicion = listaAlumnos.indexOf(listaAlumnos.find(el => el.nombre == name))
    Tes++
    listaAlumnos[posicion].tareas.push(`${materia} Tarea ${Tes}`)
    listaAlumnos[posicion].tareas.push(nota)
}

const notaP = () => { // lo mismo que notaT, pero en la lista de pruebas
    const name = prompt('A que alumno desea ponerle la nota?')
    const materia = prompt('Que materia?')
    const nota = parseInt(prompt('nota:'))
    const posicion = listaAlumnos.indexOf(listaAlumnos.find(el => el.nombre == name))
    Pes++
    listaAlumnos[posicion].tareas.push(`${materia} Tarea ${Pes}`)
    listaAlumnos[posicion].tareas.push(nota)
}

const getNotaT = (alumno, materia, n) => {  // busca la lista de tareas del alumno dado, y busca el index del string con la materia y el n° que se pida en la funcion, y define a resultado como el elemento delante de eso, osea la nota
    const Tarray = reachAlumno(alumno).tareas
    const resultado = Tarray[Tarray.indexOf(Tarray.find(el => el == `${materia} Tarea ${n}`)) + 1]
    console.log(resultado)
}

const getNotaP = (alumno, materia, n) => { // lo mismo pero en las pruebas
    const Parray = reachAlumno(alumno).pruebas
    const resultado = Parray[Parray.indexOf(Parray.find(el => el == `${materia} Prueba ${n}`)) + 1]
    console.log(resultado)
}

const getNotasMateria = (alumno, materia) => {
    const Tarray = reachAlumno(alumno).tareas
    const Parray = reachAlumno(alumno).pruebas
    const notas = []
    for(let i = 1; i < Tarray.length; i += 2) {
        if(Tarray[i - 1].includes(materia)) {
            notas.push(Tarray[i])
        }
    }
    for(let i = 1; i < Parray.length; i += 2) {
        if(Parray[i - 1].includes(materia)) {
            notas.push(Parray[i])
        }
    }
    console.log(notas)
}

const setPromedio = (alumno, materia) => {
    const Tarray = reachAlumno(alumno).tareas
    const Parray = reachAlumno(alumno).pruebas
    const notas = []
    for(let i = 1; i < Tarray.length; i += 2) {
        if(Tarray[i - 1].includes(materia)) {
            notas.push(Tarray[i])
        }
    }
    for(let i = 1; i < Parray.length; i += 2) {
        if(Parray[i - 1].includes(materia)) {
            notas.push(Parray[i])
        }
    }
    const prom = promediar(notas)
    reachAlumno(alumno).promedios.push(materia, prom)
}















