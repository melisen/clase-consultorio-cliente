//import {crearMedico} from "../../models/CRUD.js"


//*DOM
const divFormInscribirProf = document.getElementById("divforminscribirprof")
const inscribirBtn = document.getElementById("inscribirbtn")
const divNuevoProf = document.getElementById("divprueba")



    inscribirBtn.addEventListener("click", () => {
       
    //divFormInscribirProf.className = "seVe";
    })
    

//inscribirProfesional() ocurre en el click del botón #inscribirBtn ???
//se muestra divFormInscribirProf, mediante clase de css, propiedad display

//declarar el objeto de nuevo profesional
//tomar cada input por id, asignarle un event listener onchange, cuando cambia guardar el valor en el objeto
//en el submit:
//      validar que todos los campos estén completos 
//      guardar el objeto en persistencia 
//      ocultar divFormInscribirProf

    let nuevoProf = {
        nombre:"",
        apellido:"",
        especialidad:"",
        consultorio:""
    }
    //inputs:
    const especialidad = document.getElementById("especialidad");
    const username = document.getElementById("name");
    const lastname = document.getElementById("lastname");
    const office = document.getElementById("office");
    
    //validaciones + completar el objeto
    especialidad.addEventListener("change", (e) => {
        nuevoProf.especialidad = e.target.value;
        especialidad.className = "valid";
    })

    username.addEventListener("change", (e) => {
        if( (/^[A-z ]+$/.test(e.target.value)) && (e.target.value!=="") ){
            localStorage.setItem('username', JSON.stringify(e.target.value));
            username.className = "valid";
            nuevoProf.nombre = e.target.value;
        } else {
            username.className = "invalid";
            }
    })

    lastname.addEventListener("change", (e) => {
        if( (/^[A-z ]+$/.test(e.target.value)) && (e.target.value!=="") ){
            localStorage.setItem('lastname', JSON.stringify(e.target.value))
            lastname.className = "valid";
            nuevoProf.apellido = e.target.value;
            } else {
                lastname.className = "invalid";
                }
    })

    office.addEventListener("change", (e) => {
           let validation = /^\d{1,2}$/;
        if(e.target.value.match(validation)  && (e.target.value!=="") ){
            localStorage.setItem('office', JSON.stringify(e.target.value))
            office.className = "valid";
            nuevoProf.consultorio = e.target.value;
            }else {
                office.className = "invalid";
                }
    })

    const formInscripcion = document.getElementById("divforminscribirprof")
    formInscripcion.addEventListener("submit", async () => {
        //campos validados
        const { nombre, apellido, especialidad, consultorio} = nuevoProf;
        const campos = [
            { label: "Nombre", propiedad: nombre },
            { label: "Apellido", propiedad: apellido }, 
            { label: "Especialidad", propiedad: especialidad },
            { label: "Consultorio", propiedad: consultorio }
        ]
        for (let i = 0; i < 4; i++){
            if (campos[i].propiedad === "") {
                return alert(`Debe rellenar correctamente el campo ${campos[i].label} para continuar`)
            }
        }

        fetch("http://localhost:8080/api/medicos/crear", {
            method: 'POST',
            body: JSON.stringify(nuevoProf),
            headers: {
              'Content-Type': "application/json"
            },
        })
            /*
          .then(resp => {
            if (resp.status === 200) {
              resp.json({message:"Enviado con éxito"})
            };
          })
          */
        
        //* mostrarNuevoProf(nuevoProf) No se puede hacer porque no hay estados para guardar info, el div se rellena y se vacía casi al mismo tiempo, además al ser un submit no envía la info a ningún lado porque no hay server
        // guardar el objeto en persistencia no se puede porque no se puede usar node 
        //const creado = await crearMedico(nuevoProf)
        
        // ocultar divFormInscribirProf
        //divFormInscribirProf.className = "noSeVe";
    })



const mostrarNuevoProf = (objeto) => {
    divNuevoProf.innerText = objeto
}