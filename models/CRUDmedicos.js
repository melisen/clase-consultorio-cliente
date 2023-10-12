//*File System para modificar el archivo de persistencia
const archivoPersistencia = "./medicosCopia.json"
//*requerimos la clase para usar sus métodos
const {Medicos} = require('./medicosFileSystem.js')
const medicosFS = new Medicos(archivoPersistencia);

//*CRUD Medicos
const crearMedico = async(nombre, apellido, especialidad, consultorio)=>{
    const medico = {nombre, apellido, especialidad, consultorio};
    const creado = medicosFS.saveNew(medico)
    if(creado){
        console.log("nuevo médico guardado")
    }
        else{
            console.log("error, no se pudo guardar")
        }
}
//crearMedico("Gabriela", "Fernández", "Traumatología", 4)

const verTodosLosMedicos = async()=>{
    const todos = await medicosFS.getAll()
    console.log(todos)
}


const buscarMedico = async(id)=>{
const medico = await medicosFS.findById(id)
return medico
}
//const medicoBuscado = buscarMedico(3)
//console.log(medicoBuscado)

const modificarConsultorioMedico = async(id, consultorio)=>{
    const modificado = await medicosFS.updateOffice(id, consultorio)
    if(modificado){
        console.log("consultorio modificado con éxito")
    }else{
        console.log("No se pudo modificar")
    }

}
//modificarConsultorioMedico(3, 6)

const eliminarMedico = async(id)=>{
const eliminado = await medicosFS.deleteById(id)
console.log(eliminado)
}
//eliminarMedico(3)



//*CRUD Turnos
const crearTurno = async(id, fecha, dia, horario, paciente)=>{
const crear = await  medicosFS.createAppointent(id, fecha, dia, horario, paciente)
}
crearTurno(3, 25, "miércoles", 16, "Juan");


const buscarTurnoFyH = async(id, fecha, horario)=>{
const turno = await medicosFS.findAppointment(id, fecha, horario)
console.log(turno)
return turno
}

const buscarTurnosPaciente = async(id, paciente)=>{
    const turnosPaciente = await medicosFS.findAppointmentByPatient(id, paciente)
    console.log(turnosPaciente) 
    return turnosPaciente
}
//buscarTurnosPaciente(3, "Juan" )


const modificarTurnoPaciente = async(id, fecha, horario, paciente)=>{
    const modificado = await medicosFS.updateAppointment(id, fecha, horario, paciente)
    console.log(modificado)
}
//modificarTurnoPaciente(1, 25, 12, "Josefina")

const eliminarTurno = async(id, fecha, horario)=>{
    const eliminado = await medicosFS.deleteAppointment(id, fecha, horario)
    console.log(eliminado)
}
//eliminarTurno(2, 25, 18)