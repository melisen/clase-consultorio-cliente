

//* PEDIR DATOS A UNA API:

let relativePath = "./medicos.json"
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



//*DATOS HARCODE:
/*
const arrMedicos = [
    {
    id:1,
    nombre: "Jimena",
    apellido: "Gutiérrez",
    especialidad:"Ginecología",
    consultorio: 3,
    agenda: [
        {
            mes: "septiembre",
            fecha: 25,  
            dia: "lunes",
            turnos:[
                {
                    horario: 12,
                    paciente: "disponible"
                },
                {
                    horario: 13,
                    paciente: "disponible"
                },
                {
                    horario: 14,
                    paciente: "disponible"
                },
                {
                    horario: 15,
                    paciente: "disponible"    
                }                   
            ]
            
        }
        
    ]
}
]*/

//* DOM:
const divturnos = document.getElementById("divturnos");
const divMedicos = document.getElementById("divmedicos")
const verMedicosBtn = document.getElementById("vermedicos");
const verTurnosBtn = document.getElementById("verturnos")

//*funciones:
const mostrarMedicos = (arr) =>{
    arr.forEach((element)=>{
        let cardMedico = document.createElement("div");
        divMedicos.appendChild(cardMedico)
        cardMedico.innerHTML =    
        `<div class="card-turno ">
            <label  for="${element.nombre}">${element.nombre}</label>
            <label  for="${element.apellido}">${element.apellido}</label>
            <label  for="${element.especialidad}">${element.especialidad}</label>
            <input type="checkbox" class="checkboxCuadrado"  id="checkbox${element.id}" value="${element.id}">      
            <button id="verturnos${element.id}">Ver Turnos</button>
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
          `<li> ${item.horario} hs  <label  for="${item.paciente}" class="paciente">${item.paciente}</label> </li>`
      ).join(" ");      
        cardTurno.innerHTML =    
        `<div class="card-turno ">
            <label  for="${element.dia}">${element.dia}</label>
            <label  for="${element.fecha}">${element.fecha}</label>
            <label  for="${element.mes}">${element.mes}</label>
            <ul class="lista">
           ${listaHorarios}
        </ul>        
        </div>`        
    })
}


//*EJECUCIÓN EN HTML:
verMedicos(arrMedicos)



