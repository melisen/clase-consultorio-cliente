

//* PEDIR DATOS A UNA API u obtenerlos de forma local leyendo un archivo .json (la ruta del archivo debe estar escrita a partir de la raíz de la estructura de carpetas del proyecto):
let relativePath = "./medicos.json"  //
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
    arr.forEach((element)=>{
        let cardMedico = document.createElement("div");
        divMedicos.appendChild(cardMedico)
        cardMedico.innerHTML =    
        `<div class="card-medico">
            <div class="nombre-apellido">
                <label  for="${element.nombre}">${element.nombre}</label>
                <label  for="${element.apellido}">${element.apellido}</label>
            </div>            
            <div class="nombre-apellido">
                 <label  for="${element.especialidad}">${element.especialidad}</label>
            <button id="verturnos" onclick="verTurnosFx(${element.id})">Ver turnos </>button>
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
    agendaMedico.forEach((element) =>{
        const divFecha = document.createElement("div");
        divFecha.className ="divFecha";
        divturnos.appendChild(divFecha);
        
        const arrTurnos = element.turnos;
        const listaHorarios = arrTurnos.map((item) =>
          `<li> ${item.horario} hs  <label  for="${item.paciente}" class="paciente">${item.paciente}</label>
          
            <input name="pacienteanotado" id="${item.horario}" type="text">
            <button type="submit" id="" style="color:white; background-color:rgb(92, 200, 92); margin:20px; border-radius:3px; border-width:0px; padding:8px;">
               Modificar
            </button>
           </li>`
      ).join(" ");      

      divFecha.innerHTML =    
        `<div class="div-fecha ">
            <label  for="${element.dia}">${element.dia}</label>
            <label  for="${element.fecha}">${element.fecha}</label>
            <form method="post" action="/api/medicos/jimena/modificar">
            <ul class="lista">
           ${listaHorarios}
        </ul>        
        </form>
        </div>`        
    })
}


//*EJECUCIÓN EN HTML:
verMedicos(arrMedicos)



