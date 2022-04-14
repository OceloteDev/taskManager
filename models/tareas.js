const Tarea = require("./tarea");
require('colors');


class Tareas {
     
    _listado = {};

    get listadoArr(){

        const listado = []; 
          
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];

            listado.push( tarea );
        });

        return listado; 
    }

    constructor(){

        this._listado = {};
    }

    cargarTareasFromArray ( listado =[] ){

        listado.forEach( (tarea)=>{

             
            
            this._listado[tarea.id] = tarea;
        } )
    }

    listadoCompleto(){
        
        let listadoStr = '';
   
        this.listadoArr.forEach((tarea, index )=>{
            listadoStr += `${ ( index + 1).toString().green }. ${ tarea.desc.white } ::${ tarea.completadoEn?'Completado'.green:'Pendiente'.red} \n` 
        });

        return listadoStr;
    }

    listarCompletadoPendiente( completadas = true ){
         
        let listadoStr = '';
        
        this.listadoArr.forEach((tarea, index )=>{

            if(completadas && tarea.completadoEn ){
                listadoStr += `${ ( index + 1).toString().green }. ${ tarea.desc.white } ::${ 'Completado'.green } :: ${(tarea.completadoEn).green} \n`;
            }else if (!completadas && !tarea.completadoEn ){
                listadoStr += `${ ( index + 1).toString().green }. ${ tarea.desc.white } ::${ 'Pendiente'.red } \n`;
            }
           
        });

        return listadoStr; 
    }

    borrarTarea( id= ''){

        if( this._listado[id] ){
            delete this._listado[id]
        }
    }

    crearTarea( desc = ''){
         
         const tarea = new Tarea(desc);

         this._listado[tarea.id] = tarea;
    }

    toggleCompletadas( ids = [] ){
         ids.forEach( id =>{
             const tarea = this._listado[id];

             if( !tarea.completadoEn ){
                 tarea.completadoEn = new Date().toISOString();
             }
         })

         this.listadoArr.forEach( tarea=>{
             if( !ids.includes(tarea.id) ){
                 this._listado[tarea.id].completadoEn = null;
             }
         })
    }
}

module.exports = Tareas;