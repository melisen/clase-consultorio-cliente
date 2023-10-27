

//* PEDIR DATOS A UNA API u obtenerlos de forma local leyendo un archivo .json (la ruta del archivo debe estar escrita a partir de la raíz de la estructura de carpetas del proyecto):
let relativePath = "../medicosNuevo.json"  //
let urlServidorLocalMedicos = "http://localhost:8080/api/medicos"
let arrMedicos = [];

function buscarMedicos(url){
    fetch(url)
            .then( (resp) => resp.json() )
            .then( (data) => {
                console.table(data)                
                data.forEach(element =>{
                        arrMedicos.push(element);
                })                                      
            });                        
}
buscarMedicos(relativePath)
//buscarMedicos(urlServidorLocalMedicos)


//* DOM:

const divMedicos = document.getElementById("divmedicos");
const verMedicosBtn = document.getElementById("vermedicos");
const divturnos = document.getElementById("divturnos");




//*funciones:

const verTurnosFx = (id)=>{
    //console.log(id)
    mostrarAgendaMedico(id)
}

const mostrarMedicos = (arr) =>{
    divMedicos.innerHTML="";
    arr.forEach((element)=>{
        let cardMedico = document.createElement("div");
        divMedicos.appendChild(cardMedico)
        cardMedico.innerHTML =    
        `<div class="card-medico">
            <div class="nombre-apellido">
                <label  for="${element.nombre}">${element.nombre}</label>
                <label  for="${element.apellido}">${element.apellido}</label>
            </div>            
            <div class="nombre-apellido especialidad">
                 <label  for="${element.especialidad}">${element.especialidad}</label>
            <button id="verturnos" class="btn" onclick="verTurnosFx(${element.id})">Ver Turnos </button>
        </div>`        
    })    
}

const verMedicos = (arr)=>{
    verMedicosBtn.addEventListener('click',()=>{ 
        mostrarMedicos(arr)
    })
}

const mostrarAgendaMedico = (id) =>{

    const medico = arrMedicos.find((element)=> element.id == id);
    
    const agendaMedico = medico.agenda;
    //array de dias, cada element es 1 dia
    divturnos.innerHTML="";
    agendaMedico.forEach((element) =>{
        const divFecha = document.createElement("div");
        divFecha.className ="divFecha";
        divturnos.appendChild(divFecha);

      divFecha.innerHTML =    
        `<div class="div-fecha ">
            <label  for="${element.dia}">${element.dia}</label>
            <label  for="${element.fecha}">${element.fecha}</label>
            <form method="post" action="/api/medicos/jimena/modificar">
            <ul class="lista">
            <li> ${element.horario} hs  <label  for="${element.paciente}" class="paciente">${element.paciente}</label>
            <input name="pacienteanotado" id="${element.horario}" type="text">
            <button type="submit" id="" class="btn-modificar">
               Modificar
            </button>
           </li>
        </ul>        
        </form>
        </div>`        
    })
}


//*EJECUCIÓN EN HTML:
verMedicos(arrMedicos)



