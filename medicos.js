

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
const verTurnosBtn = document.getElementById("verturnos")



//*funciones:
const mostrarMedicos = (arr) =>{
    arr.forEach((element)=>{
        let cardMedico = document.createElement("div");
        divMedicos.appendChild(cardMedico)
        cardMedico.innerHTML =    
        `<div class="card-turno ">
            <div class="nombre-apellido">
                <label  for="${element.nombre}">${element.nombre}</label>
                <label  for="${element.apellido}">${element.apellido}</label>
            </div>            
            <div class="nombre-apellido">
                 <label  for="${element.especialidad}">${element.especialidad}</label>
            </div>     
            <button id="verturnos${element.id}" class="btn">Ver Turnos</button>
        </div>`        

    })
}

const verMedicos = (arr)=>{
    verMedicosBtn.addEventListener('click',()=>{ 
        mostrarMedicos(arr)
        seleccionarMedico(arr)
    })
}



const  seleccionarMedico = (arr)=>{
   arr.forEach((element) =>{
        //const elegido = document.getElementById(`checkbox${e.id}`);
        const btnElegido = document.getElementById(`verturnos${element.id}`);        
        btnElegido.addEventListener('click',()=>{ 
                mostrarAgendaMedico(arrMedicos, element.id)
            })
    })
}


const buscarAgendaMedico = (arr, id) =>{
const medico = arr.find((element)=> element.id === id);
const agendaMedico = medico.agenda;
return agendaMedico;
}

const mostrarAgendaMedico = (arr, id) =>{
    const agendaMedico = buscarAgendaMedico(arr, id)
    agendaMedico.forEach((element) =>{
        const cardTurno = document.createElement("div");
        cardTurno.className ="cardTurno";
        divturnos.appendChild(cardTurno);
        
        const arrTurnos = element.turnos;
        const listaHorarios = arrTurnos.map((item) =>
          `<li> ${item.horario} hs  <label  for="${item.paciente}" class="paciente">${item.paciente}</label>
          
            <input name="pacienteanotado" id="${item.horario}" type="text">
            <button type="submit" id="" style="color:white; background-color:rgb(92, 200, 92); margin:20px; border-radius:3px; border-width:0px; padding:8px;">
               Modificar
            </button>
           </li>`
      ).join(" ");      
        cardTurno.innerHTML =    
        `<div class="card-turno ">
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



