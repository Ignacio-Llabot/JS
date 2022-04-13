
const listaClases = []
const listaAlumnos = []

class Alumno {  // creador de alumnos
    constructor(nombre) {
        this.nombre = nombre
        this.tareas = [],
        this.pruebas = []
    }
}

const crearIgnacio = () => { // funcion para testear el creador
    const ignasio = new Alumno('igna')
    listaAlumnos.push(ignasio)
}

const crearAlumno = (nombre) => { // crea alumno y lo tira a listaAlumnos
    const nuevo = new Alumno(nombre)
    listaAlumnos.push(nuevo)
}


listaAlumnos.push( // alumno pre-creado para testear
    {
        nombre: 'isa',
        tareas: ['fisica Tarea 1', 9, 'mate Tarea 2', 8],
        pruebas: ['historia Prueba 1', 5, 'ingles Prueba 3', 7]
    }
)

crearIgnacio()

console.log(listaAlumnos)


const buscar = () => {  // busca alumnos con el nombre
	const busqueda = prompt('Que alumno desea ver?')
	const resultado = listaAlumnos.find(el => el.nombre == busqueda)
    const posicion = listaAlumnos.indexOf(listaAlumnos.find(el => el.nombre == busqueda))
	console.log(resultado)
    console.log(posicion)
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
    const Tarray = listaAlumnos[listaAlumnos.indexOf(listaAlumnos.find(el => el.nombre == alumno))].tareas
    const resultado = Tarray[Tarray.indexOf(Tarray.find(el => el == `${materia} Tarea ${n}`)) + 1]
    console.log(resultado)
}

const getNotaP = (alumno, materia, n) => { // lo mismo pero en las pruebas
    const Parray = listaAlumnos[listaAlumnos.indexOf(listaAlumnos.find(el => el.nombre == alumno))].pruebas
    const resultado = Parray[Parray.indexOf(Parray.find(el => el == `${materia} Prueba ${n}`)) + 1]
    console.log(resultado)
}






