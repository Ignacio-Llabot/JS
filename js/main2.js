const listaAlumnos = []

const promediar = (lista) => {   
	const total = lista.reduce((acc, el) => acc + el, 0)
	const promedio = total / lista.length
	return promedio
}

function Alumno(nombre, notasString, promedio) {   // creador de objetos
	this.nombre = nombre;
	this.notas = notasString;
	this.promedio = promedio;
}

const solicitar = () => {   // funcion que consigue la info de los alumnos
	let nombre = prompt('Nombre del alumno')
	let notas = []
	let cantidadNotas = parseInt(prompt('Cuantas notas quiere cargar?'))
	for (let i = 0; i < cantidadNotas; i++) {
		let nota = parseInt(prompt('Nota:'))
		notas.push(nota)
	}
	const promedioAlumno = promediar(notas)
	let notasString = notas.join(' / ')
	return new Alumno(nombre, notasString, promedioAlumno)
}


const buscar = () => {
	const busqueda = prompt('Que alumno desea ver?')
	const resultado = listaAlumnos.find(el => el.nombre == busqueda)
	console.table(resultado)
	const volver = prompt('Desea buscar de nuevo? s/n')
	if (volver == 's') {
		buscar()
	} else {
		alert('Gracias por probar mi codigo! :)')
	}
}

let cantidadAlumnos = parseInt(prompt('Cuantos alumnos son?'))  // pide cuantos alumnos hay que cargar
for (let i = 0; i < cantidadAlumnos ; i++) {
	listaAlumnos.push(solicitar())
	alert('Alumno cargado!')
}
alert('Se ha finalizado la carga')

const editarHTML = () => {
	for(let i = 0; i <= listaAlumnos.length; i++) {
		console.log(i)
		let div = document.createElement('div')
		div.innerHTML = `
		<h2 style="margin-left:30px">${listaAlumnos[i].nombre}</h2>
		<p style="margin-left:30px">Las notas del alumno son: ${listaAlumnos[i].notas}</p>
		<p style="margin-left:30px">El promedio del alumno es: ${listaAlumnos[i].promedio}</p>
		`
		document.body.append(div)
	}
}



