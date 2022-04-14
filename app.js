
const { inquirerMenu, pausa, leerInput, listadoTareaBorrar, confirmar, listadoTareaChecked } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo')
require('colors');




console.clear();


const main = async()=>{

   console.log('hola mundo')

   let opt = '';

   const tareas = new Tareas();

   const tareasDB = leerDB();

   if(tareasDB){
       tareas.cargarTareasFromArray( tareasDB );
   }

   await pausa();

   do{

      opt = await inquirerMenu();
      console.log({opt});

      switch(opt){
         case '1':

           const desc = await leerInput('Descripcion');
           
           tareas.crearTarea( desc );
         break;

         case '2':

            //console.log( tareas.listadoArr);
            console.log( tareas.listadoCompleto() );
         break;
         
         case '3': 
            console.log( tareas.listarCompletadoPendiente(true));
         break; 

         case '4':
            console.log( tareas.listarCompletadoPendiente(false));
         break; 

         case '5':
            const ids = await listadoTareaChecked( tareas.listadoArr );
            tareas.toggleCompletadas( ids );
         break; 

         case '6':
            const id = await listadoTareaBorrar(tareas.listadoArr);
            if( id !== '0'){
               const ok =  await confirmar( '¿Estas seguro?' );
            
               if(ok){
                  tareas.borrarTarea( id );
                  console.log('Tarea borrada');
               }
            }
           
         break;
      }

      guardarDB( tareas.listadoArr );

      await pausa();
   

   } while( opt !== '0');

  
}


main();