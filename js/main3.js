

/* const alumnoEJ = {
    nombre: 'Java',
    notasTareas: {
        portuguesT1: 9,
        españolT1: 8,
    },
    notasPruebas: {
        matematicaP1: 10,
        fisicaP1: 9
    }
}

const claseEJ = {
    nombreClase: 'portugues',
    tareas: {
        T1: {
            igna: 9
        }
    },
    pruebas: {
        P1: {
            igna: 10
        }
    }
} */

const listaClases = []
const listaAlumnos = []

class Alumno {  // creador de alumnos
    constructor(nombre) {
        this.nombre = nombre
        this.tareas = [],
        this.pruebas = []
    }
}

const crearIgnacio = () => {
    const ignasio = new Alumno('igna')
    listaAlumnos.push(ignasio)
}

const crearAlumno = (nombre) => { // crea alumno y lo tira a listaAlumnos
    const nuevo = new Alumno(nombre)
    listaAlumnos.push(nuevo)
}


listaAlumnos.push(
    {
        nombre: 'isa',
        tareas: ['fisica Tarea 1', 9, 'mate Tarea 2', 8],
        pruebas: ['historia Prueba 1', 5, 'ingles Prueba 3', 7]
    }
)

crearIgnacio()

console.log(listaAlumnos)


const buscar = () => {  // busca alumnos
	const busqueda = prompt('Que alumno desea ver?')
	const resultado = listaAlumnos.find(el => el.nombre == busqueda)
    const posicion = listaAlumnos.indexOf(listaAlumnos.find(el => el.nombre == busqueda))
	console.log(resultado)
    console.log(posicion)
}

let Tes = 0
let Pes = 0

const notaT = () => {
    const busqueda = prompt('Que alumno desea notar?')
    const materia = prompt('materia?')
    const nota = parseInt(prompt('nota'))
    const posicion = listaAlumnos.indexOf(listaAlumnos.find(el => el.nombre == busqueda))
    Tes++
    listaAlumnos[posicion].tareas.push(`${materia} Tarea ${Tes}`)
    listaAlumnos[posicion].tareas.push(nota)
}

const notaP = () => {
    const busqueda = prompt('Que alumno desea notar?')
    const materia = prompt('materia?')
    const nota = parseInt(prompt('nota'))
    const posicion = listaAlumnos.indexOf(listaAlumnos.find(el => el.nombre == busqueda))
    Pes++
    listaAlumnos[posicion].tareas.push(`${materia} Tarea ${Pes}`)
    listaAlumnos[posicion].tareas.push(nota)
}

const getNotaT = (alumno, materia, n) => {
    const Tarray = listaAlumnos[listaAlumnos.indexOf(listaAlumnos.find(el => el.nombre == alumno))].tareas
    const resultado = Tarray[Tarray.indexOf(Tarray.find(el => el == `${materia} Tarea ${n}`)) + 1]
    console.log(resultado)
}

const getNotaP = (alumno, materia, n) => {
    const Parray = listaAlumnos[listaAlumnos.indexOf(listaAlumnos.find(el => el.nombre == alumno))].pruebas
    const resultado = Parray[Parray.indexOf(Parray.find(el => el == `${materia} Prueba ${n}`)) + 1]
    console.log(resultado)
}






