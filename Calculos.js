// ---------------------------------------------- Creación variables ------------------------------------------------
var arrayData = new Array();
var archivoTxt = new XMLHttpRequest();
var fileRuta = 'Doc.txt';
var i=0;
var j=0;
var palabra = "";
var letra="",numCola;
var maxMs, minMs, numVeces, quantum = 0;

// ---------------------------------------------- Listas Ligadas -----------------------------------------------------

function Node (value) {
    this.value = value
    this.next = null
}

function LinkedList() {
    this.head = null
}

LinkedList.prototype.append = function(value, current = this.head){
    if(this.head === null){
        return this.head = new Node(value)
    }
    if(current.next === null){
        return current.next = new Node(value)
    }
    this.append(value, current.next)
}

LinkedList.prototype.findNode = function (value, current = this.head){
    if(this.head === null) {
        return false
    }

    if (current !== null) {
        if (current.value === value){
            return true;
        } else {
            return this.findNode(value, current.next)
        }
    }
    return false
}

LinkedList.prototype.peekNode = function (value) {
    if(this.head === null) {
        return false
    }
    return this.head
}

LinkedList.prototype.returnList = function (current= this.head){
    if(this.head === null){
        return 0
    }
    if (current.next !== null){
        console.log(current.value);
        return this.returnList(current.next)
    }else{
        console.log(current.value);
    }
}

LinkedList.prototype.buscarProceso = function ( ID , queBuscar, current= this.head){
    if(this.head === null){
        return 0
    }
    if (current.next !== null){ //El penúltimo
        if(current.value.ID == ID){ //Si coincide la letra a buscar con el valor que estamos posicionados
            if(queBuscar == "tiempo"){ //Si se busca el tiempo
                return current.value.tiempo; // Se regresa el tiempo
            }else if (queBuscar == "cantidad"){ //Sino...
                return current.value.cantidadBloqueos; // Regresa la cantidad de bloqueos
            }else if (queBuscar == "letra"){
                return current.value.letra;
            }
        }
        //Está mal el return
        return this.buscarProceso(ID,queBuscar,current.next); //Si no coincide con la letra a buscar, va a seguir buscando
    }
    if(current.value.ID == ID){ // El último valor de la lista
        if(queBuscar == "tiempo"){ //Si se busca el tiempo
            return current.value.tiempo; // Se regresa el tiempo
        }else if (queBuscar == "cantidad"){ //Sino...
            return current.value.cantidadBloqueos; // Regresa la cantidad de bloqueos
        }else if (queBuscar == "letra"){
            return current.value.letra;
        }
    }
}

//Aquí se regresa la cantidad de veces en la que se realizará el bloqueo según el rango que se encuentre el proceso
LinkedList.prototype.buscarBloqueo = function ( ID,aBuscar, current= this.head){
    if(this.head === null){
        return 0
    }
    if (current.next !== null){ //El penúltimo
        if(current.value.ID == ID){ //Si coincide con el minMs a buscar con el valor que estamos posicionados
            if(aBuscar == "max"){
                return current.value.maxMs; // Se regresa el maxMs
            }
            if(aBuscar == "min"){
                return current.value.minMs; // Se regresa el minMS
            }
            if(aBuscar == "cantidad"){
                return current.value.cantidadVeces; // Se regresa la cantidad de veces que se hará el bloqueo
            }
        }
        return this.buscarBloqueo(ID, aBuscar,current.next); //Si no coincide con el minMS a buscar, va a seguir buscando
    }

    if(current.value.ID == ID){ // El último valor de la lista
        if(aBuscar == "max"){
            return current.value.maxMs; // Se regresa la cantidad de veces que se hará el bloqueo
        }
        if(aBuscar == "min"){
            return current.value.minMs; // Se regresa la cantidad de veces que se hará el bloqueo
        }
        if(aBuscar == "cantidad"){
            return current.value.cantidadVeces; // Se regresa la cantidad de veces que se hará el bloqueo
        }
    }
}

LinkedList.prototype.buscarEntorno = function ( ID,aBuscar, current= this.head){
    if(this.head === null){
        return 0
    }
    if (current.next !== null){ //El penúltimo
        if(current.value.ID == ID){ //Si coincide con el minMs a buscar con el valor que estamos posicionados
            if(aBuscar == "CPU"){
                return current.value.CPU; // Se regresa la cantidad de micros del entorno
            }
            if(aBuscar == "cambios"){
                return current.value.cambios; // Se regresa el ms de cambios
            }
            if(aBuscar == "bloqueo"){
                return current.value.bloqueo; // Se regresa la cantidad de ms del bloqueo
            }
        }
        return this.buscarEntorno(ID, aBuscar,current.next); //Si no coincide con el minMS a buscar, va a seguir buscando
    }

    if(current.value.ID == ID){ //Si coincide con el minMs a buscar con el valor que estamos posicionados
        if(aBuscar == "CPU"){
            return current.value.CPU; // Se regresa la cantidad de micros del entorno
        }
        if(aBuscar == "cambios"){
            return current.value.cambios; // Se regresa el ms de cambios
        }
        if(aBuscar == "bloqueo"){
            return current.value.bloqueo; // Se regresa la cantidad de ms del bloqueo
        }
    }
}

LinkedList.prototype.buscarCola = function ( ID,aBuscar, current= this.head){
    if(this.head === null){
        return 0
    }
    if (current.next !== null){ //El penúltimo
        if(current.value.ID == ID){ //Si coincide con el minMs a buscar con el valor que estamos posicionados
            if(aBuscar == "letra"){
                return current.value.letraCola; // Se regresa el maxMs
            }
            if(aBuscar == "ms"){
                return current.value.msMin; // Se regresa el minMS
            }
        }
        return this.buscarCola(ID, aBuscar,current.next); //Si no coincide con el minMS a buscar, va a seguir buscando
    }

    if(current.value.ID == ID){ //Si coincide con el minMs a buscar con el valor que estamos posicionados
        if(aBuscar == "letra"){
            return current.value.letraCola; // Se regresa el maxMs
        }
        if(aBuscar == "ms"){
            return current.value.msMin; // Se regresa el minMS
        }
    }
}

LinkedList.prototype.length = function (current = this.head, acum = 1) {
    if(this.head === null){
        return 0
    }
    if (current.next !== null){
        return this.length(current.next, acum = acum + 1)
    }
    return acum
}

// --------------------------------------------Creación de las listas ----------------------------------------------

var listaBloqueos = new LinkedList();
var listaProcesos = new LinkedList();
var listaMicros = new LinkedList();
var listaEntornos = new LinkedList();
var listaCola = new LinkedList();

//-------------------------------------------- Creación de los objetos ---------------------------------------------

function Proceso(ID, letra, tiempo, cantidadBloqueos) {
    this.ID = ID;
    this.letra = letra;
    this.tiempo = tiempo;
    this.cantidadBloqueos = cantidadBloqueos;
}

function Bloqueo(ID, maxMs, minMs, cantidadVeces){
    this.ID = ID;
    this.maxMs = maxMs;
    this.minMs = minMs;
    this.cantidadVeces = cantidadVeces;
}

function Entorno(ID, CPU, cambios, bloqueo){
    this.ID = ID;
    this.CPU = CPU;
    this.cambios = cambios;
    this.bloqueo = bloqueo;
}

function Cola(ID, letraCola, msMin){
    this.ID = ID;
    this.letraCola = letraCola;
    this.msMin = msMin;
}

function Micros(ID, letraMicros, TCC, TE, TVC, TB, TT, Ti, TF, IDMicro){
    this.ID = ID;
    this.letraMicros =letraMicros;
    this.TCC=TCC;
    this.TE=TE;
    this.TVC=TVC;
    this.TB=TB;
    this.TT=TT;
    this.Ti=Ti;
    this.TF=TF;
    this.IDMicro=IDMicro;
}

// ------------------------------------------------------- Procesamiento del documento de texto ----------------------------------------------------------------

archivoTxt.open("GET",fileRuta,false);
archivoTxt.send(null);
var txt = archivoTxt.responseText;
for (i =0; i<txt.length ; i++){
    arrayData.push(txt[i]);
    palabra=palabra+txt[i];

    if(palabra == "Tiempos"){
        var contID = 1;
        //console.log("Aquí van los tiempos de los procesos");
        //Ya quedó, no mover nada xd
        //console.log(palabra);
        palabra="";
        j=i+6;
        //console.log(txt[j]);
        var num;
        //Aquí comienza el loop para el guardado de info
        while(txt[j] != "*"){
            palabra="";
            letra = txt[j];
            j=j+3;
            //console.log(txt[j]);
            while (txt[j]!=" "){
                palabra = palabra+txt[j];
                j++;
            }
            //console.log(palabra);
            num=parseInt(palabra);

            var encontrado = false;
            var cont = 1, maxT,minT;
            while (encontrado != true){
                maxT = listaBloqueos.buscarBloqueo(cont,"max");
                minT = listaBloqueos.buscarBloqueo(cont,"min");
                if (num >= minT && num <= maxT){
                    if(num > quantum){
                        quantum=num;
                    }
                    var procesoObjeto = new Proceso(contID,letra,num,listaBloqueos.buscarBloqueo(cont,"cantidad"));
                    listaProcesos.append(procesoObjeto);
                    contID++;
                    encontrado = true;
                }
                cont++;
            }
            j=j+5;
        }

    }else if (palabra == "Bloqueos"){
        // Ya Funciona, No mover nada de aquí xd
        // console.log("Aquí va la cantidad de bloqueos\n");
        // Desde aquí inicia el loop hasta que se terminen todos los bloqueos
        j=i+6;
        //console.log(txt[j]);
        var ID = 0;
        while (txt[j] != "*"){
            palabra="";
            while(txt[j+1]!="-"){
                palabra=palabra+txt[j];
                j++;
            }
            //console.log(palabra);
            minMs = parseInt(palabra);
            j=j+3;
            //console.log(txt[j]);
            palabra="";
            while(txt[j+1]!="m"){
                palabra=palabra+txt[j];
                j++;
            }
            //console.log(palabra);
            maxMs = parseInt(palabra);
            j=j+5;
            //console.log(txt[j]);
            palabra="";
            while(txt[j+1] != "v"){ //Mientras que el caracter "v" esté a 2 caracteres de distancia...
                palabra=palabra+txt[j]; //Se van acumulando los números que se usarán
                j++;
            }
            //console.log(palabra);
            numVeces = parseInt(palabra); // Se parsea a int el número de veces que se hará el bloqueo
            ID++;
            var bloqueoObjeto = new Bloqueo(ID,maxMs,minMs,numVeces); //Se crea el objeto
            listaBloqueos.append(bloqueoObjeto); //Se agrega el objeto a la clase
            j=j+8;
            //console.log(txt[j]);

        }
    }else if (palabra == "Entornos"){
        //console.log("Aquí va la cantidad de entornos");
        j=i+6;
        //Aquí empieza el loop

        while(txt[j] != "*"){
            palabra="";
            var IDEntorno, CPUEntorno, cambiosEntorno, bloqueoEntorno;

            while(txt[j] != ":"){
                letra=txt[j];
                j++;
            }
            //Guardando el ID el entorno
            IDEntorno=parseInt(letra);
            j=j+10;
            palabra="";
            while(txt[j] != "\n"){
                palabra=palabra+txt[j];
                j++;
            }
            //Guardando cantidad de micros del entorno
            CPUEntorno = parseInt(palabra);

            j=j+10;

            palabra="";
            while(txt[j+1]!="m"){
                palabra=palabra+txt[j];
                j++;
            }
            //Guardando el tiempo de cambio del entorno
            cambiosEntorno = parseInt(palabra);


            j=j+14;

            palabra="";
            while(txt[j+1]!="m"){
                palabra=palabra+txt[j];
                j++;
            }

            //Guardando el tiempo de bloqueo del entorno
            bloqueoEntorno = parseInt(palabra);
            //console.log(bloqueoEntorno);

            var objetoEntorno = new Entorno(IDEntorno,CPUEntorno,cambiosEntorno,bloqueoEntorno);
            listaEntornos.append(objetoEntorno);
            j=j+7;
        }

    }else if (palabra == "Cola"){
       console.log("Aquí va la cola");
       var IDCola=1, numCola=0;
        j=i+6
       //console.log(txt[j]);
        while(txt[j] != "*"){
            if(txt[j] == "+"){
                palabra="";
                j=j+9;

                while(txt[j+1] != "m"){
                    palabra=palabra+txt[j];
                    j++;
                }
                numCola=parseInt(palabra);

                j=j+5;
                //console.log(txt[j]);
                //j=j+3;
                //console.log(txt[j]);
            }else{
                var objetoCola = new Cola(IDCola,txt[j],numCola);
                listaCola.append(objetoCola);
                IDCola++;
                j=j+3;
            }
        }


    }
    if(txt[i]== "\n"){
        //console.log(palabra);
        palabra="";
    }

}
listaProcesos.returnList();
// ------------------------------------------------------------- Creación de las tablas ----------------------------------------------------------------

// Creación de la tabla de procesos
const $tablaProcesos = document.querySelector("#tablaProcesos");
// Recorrer todos los productos
for(var i=0;i<listaProcesos.length()+1;i++){
    // Crear un <tr>
    const $tr = document.createElement("tr");
    // Creamos el <td> de nombre y lo adjuntamos a tr
    let $tdLetra = document.createElement("td");
    $tdLetra.textContent = listaProcesos.buscarProceso(i,"letra"); // el textContent del td es el nombre
    $tr.appendChild($tdLetra);
    // El td de precio
    let $tdTiempo = document.createElement("td");
    $tdTiempo.textContent = listaProcesos.buscarProceso(i,"tiempo");
    $tr.appendChild($tdTiempo);
    // El td del código
    let $tdBloqueos = document.createElement("td");
    $tdBloqueos.textContent = listaProcesos.buscarProceso(i,"cantidad");
    $tr.appendChild($tdBloqueos);
    // Finalmente agregamos el <tr> al cuerpo de la tabla
    $tablaProcesos.appendChild($tr);
    // Y el ciclo se repite hasta que se termina de recorrer todo el arreglo
}

// Creación de la tabla de los bloqueos
const $tablaBloqueos = document.querySelector("#tablaBloqueos");
// Recorrer todos los productos
for(var i=1;i<listaBloqueos.length()+1;i++){
    // Crear un <tr>
    const $tr = document.createElement("tr");
    // Creamos el <td> del rango y lo adjuntamos a tr
    let $tdRango = document.createElement("td");
    $tdRango.textContent =listaBloqueos.buscarBloqueo(i,"min")+" ms a "+listaBloqueos.buscarBloqueo(i,"max")+" ms"; // el textContent del td es el nombre
    $tr.appendChild($tdRango);
    // El td de la cantidad de veces de los bloqueos
    let $tdCantidad = document.createElement("td");
    $tdCantidad.textContent = listaBloqueos.buscarBloqueo(i,"cantidad");
    $tr.appendChild($tdCantidad);
    // Finalmente agregamos el <tr> al cuerpo de la tabla
    $tablaBloqueos.appendChild($tr);
    // Y el ciclo se repite hasta que se termina de recorrer todo el arreglo
}

// Creación de la tabla de los entornos
const $tablaEntornos = document.querySelector("#tablaEntornos");
// Recorrer toda la lista
var posicion = 1;
var contTablaEntornos = 1;
for(var i=0;i<listaEntornos.length()*6;i++){
    if(posicion == 1) {
        const $tr = document.createElement("tr");
        // Creamos el <td> del rango y lo adjuntamos a tr
        let $tdDato = document.createElement("td");
        $tdDato.textContent = "Entorno"; // el textContent del td es el nombre
        $tr.appendChild($tdDato);
        // El td de la cantidad de veces de los bloqueos
        let $tdCantidad = document.createElement("td");
        $tdCantidad.textContent = contTablaEntornos;
        $tr.appendChild($tdCantidad);
        // Finalmente agregamos el <tr> al cuerpo de la tabla
        $tablaEntornos.appendChild($tr);
        // Y el ciclo se repite hasta que se termina de recorrer todo el arreglo
        posicion++;
    }else if(posicion == 2){

        // Crear un <tr>
        const $tr = document.createElement("tr");
        // Creamos el <td> del rango y lo adjuntamos a tr
        let $tdDato = document.createElement("td");
        $tdDato.textContent = "CPU"; // el textContent del td es el nombre
        $tr.appendChild($tdDato);
        // El td de la cantidad de veces de los bloqueos
        let $tdCantidad = document.createElement("td");
        $tdCantidad.textContent = listaEntornos.buscarEntorno(contTablaEntornos,"CPU");
        $tr.appendChild($tdCantidad);
        // Finalmente agregamos el <tr> al cuerpo de la tabla
        $tablaEntornos.appendChild($tr);
        // Y el ciclo se repite hasta que se termina de recorrer todo el arreglo
        posicion++;

    }else if(posicion == 3){
        // Crear un <tr>
        const $tr = document.createElement("tr");
        // Creamos el <td> del rango y lo adjuntamos a tr
        let $tdDato = document.createElement("td");
        $tdDato.textContent = "Cambio"; // el textContent del td es el nombre
        $tr.appendChild($tdDato);
        // El td de la cantidad de veces de los bloqueos
        let $tdCantidad = document.createElement("td");
        $tdCantidad.textContent = listaEntornos.buscarEntorno(contTablaEntornos,"cambios") + " ms";
        $tr.appendChild($tdCantidad);
        // Finalmente agregamos el <tr> al cuerpo de la tabla
        $tablaEntornos.appendChild($tr);
        // Y el ciclo se repite hasta que se termina de recorrer todo el arreglo
        posicion++;

    }else if(posicion == 4){
        // Crear un <tr>
        const $tr = document.createElement("tr");
        // Creamos el <td> del rango y lo adjuntamos a tr
        let $tdDato = document.createElement("td");
        $tdDato.textContent = "Bloqueo"; // el textContent del td es el nombre
        $tr.appendChild($tdDato);
        // El td de la cantidad de veces de los bloqueos
        let $tdCantidad = document.createElement("td");
        $tdCantidad.textContent = listaEntornos.buscarEntorno(contTablaEntornos,"bloqueo") + " ms";
        $tr.appendChild($tdCantidad);
        // Finalmente agregamos el <tr> al cuerpo de la tabla
        $tablaEntornos.appendChild($tr);
        // Y el ciclo se repite hasta que se termina de recorrer todo el arreglo
        posicion++;

    }if(posicion == 5 && contTablaEntornos<listaEntornos.length()){
        // Crear un <tr>
        const $tr = document.createElement("tr");
        // Creamos el <td> del rango y lo adjuntamos a tr
        let $tdDato = document.createElement("td");
        $tdDato.textContent = " - "; // el textContent del td es el nombre
        $tr.appendChild($tdDato);
        // El td de la cantidad de veces de los bloqueos
        let $tdCantidad = document.createElement("td");
        $tdCantidad.textContent =" - ";
        $tr.appendChild($tdCantidad);
        // Finalmente agregamos el <tr> al cuerpo de la tabla
        $tablaEntornos.appendChild($tr);
        // Y el ciclo se repite hasta que se termina de recorrer todo el arreglo
        posicion = 1;
        contTablaEntornos++;

    };
}

// Creación de la tabla de la cola
const $tablaCola = document.querySelector("#tablaCola");
// Recorrer todos los productos
for(var i=1;i<listaCola.length()+1;i++){
    // Crear un <tr>
    const $tr = document.createElement("tr");
    // Creamos el <td> del rango y lo adjuntamos a tr
    let $tdMs = document.createElement("td");
    $tdMs.textContent =listaCola.buscarCola(i,"ms")+" ms"; // el textContent del td es el nombre
    $tr.appendChild($tdMs);
    // El td de la cantidad de veces de los bloqueos
    let $tdLetra = document.createElement("td");
    $tdLetra.textContent = listaCola.buscarCola(i,"letra");
    $tr.appendChild($tdLetra);
    // Finalmente agregamos el <tr> al cuerpo de la tabla
    $tablaCola.appendChild($tr);
    // Y el ciclo se repite hasta que se termina de recorrer todo el arreglo
}

console.log(quantum);

