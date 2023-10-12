const fs = require("fs");

class Medicos{
        constructor(ruta) {
            this.ruta = ruta;
          }

          async getAll() {
            try {
              const objetos = await fs.promises.readFile(this.ruta, "utf-8");
              if (!objetos.length) {
                return [];
              } else {
                const res = await JSON.parse(objetos);
                return res;
              }
            } catch (err) {
              console.log("no se pudo obtener");
            }
          }


          async saveNew(obj) {
            try {
              const objs = await this.getAll();
              let id;
              if (!objs || !objs.length) {
                id = 1;
              } else {
                objs.forEach((ob) => {
                  id = ob.id;
                });
                id = id + 1;
              }
              const agenda = [];
              const guardar = objs.length > 0 ? [...objs, { ...obj, id, agenda }] : [{ ...obj, id, agenda }];
              const guardado = await fs.promises.writeFile(
                this.ruta,
                JSON.stringify(guardar),
                { encoding: "utf-8" }
              );
              console.log( "guardado");
            } catch (error) {
              console.log("no se pudo guardar");
            }
          }

          async findById(id) {
            try {
              const todos = await this.getAll();
              const buscado = todos.find((ob) => ob.id == id);
              if (buscado) {
                return buscado;
              } else {
                console.log("no existe");
              }
            } catch (err) {
              console.log("no se pudo buscar por id");
            }
          }

          async updateOffice(id, consultorio){
            try {
                const medico = await this.findById(id);
                medico.consultorio = consultorio;
                const todos = await this.getAll();
                const quitarObj = todos.filter((item) => item.id != id);
                const newArr = [...quitarObj, medico];
                console.log(newArr)
                await fs.promises.writeFile(this.ruta, JSON.stringify(newArr), {
                  encoding: "utf-8",
                });
                return medico;
              } catch (error) {
                console.log("error");
              }
          }

          async deleteById(id) {
            try {
              const objs = await this.getAll();
              const obj = objs.find((item) => item.id == id);
              if (!obj) {
                console.log("No se encontró qué borrar");
              } else {
                const newArr = objs.filter((ob) => ob.id != id);
                const eliminar = await fs.promises.writeFile(
                  this.ruta,
                  JSON.stringify(newArr),
                  { encoding: "utf-8" }
                );
                return "eliminado";
              }
            } catch (err) {
              console.log( "no se pudo eliminar");
            }
          }

          async createAppointent(id, fecha, dia, horario, paciente){
            try{
            let nuevoTurno = {fecha, dia, horario, paciente};
            let medico = await this.findById(id)
            let agenda = medico.agenda;
            let existeTurno = agenda.find(item=> item.fecha == fecha && item.dia ==dia && item.horario == horario)
            if(existeTurno){
                console.log("el turno ya está ocupado")
            }
            agenda.push(nuevoTurno);
            medico.agenda = agenda;
            let medicos = await this.getAll();
            let quitar = medicos.filter((item)=>item.id !==id);
            medicos = [...quitar, medico];
            await fs.promises.writeFile(this.ruta, JSON.stringify(medicos), {
                encoding: "utf-8",
              });
              console.log( "turno agregado con éxito", nuevoTurno);
            } catch (error) {
              console.log("error", error);
            }

          }
    
}

module.exports = {Medicos}