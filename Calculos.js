// ---------------------------------------------- Creación variables ------------------------------------------------
var arrayData = new Array();
var archivoTxt = new XMLHttpRequest();
var fileRuta = 'Doc.txt';
var i=0;
var j=0;
var palabra = "";
var letra="",numCola;
var maxMs, minMs, numVeces, quantum,click=false;

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
        if(current.value.ID === ID){ //Si coincide la letra a buscar con el valor que estamos posicionados
            if(queBuscar === "tiempo"){ //Si se busca el tiempo
                return current.value.tiempo; // Se regresa el tiempo
            }else if (queBuscar === "cantidad"){ //Sino...
                return current.value.cantidadBloqueos; // Regresa la cantidad de bloqueos
            }else if (queBuscar === "letra"){
                return current.value.letra;
            }
        }
        //Está mal el return
        return this.buscarProceso(ID,queBuscar,current.next); //Si no coincide con la letra a buscar, va a seguir buscando
    }
    if(current.value.ID === ID){ // El último valor de la lista
        if(queBuscar === "tiempo"){ //Si se busca el tiempo
            return current.value.tiempo; // Se regresa el tiempo
        }else if (queBuscar === "cantidad"){ //Sino...
            return current.value.cantidadBloqueos; // Regresa la cantidad de bloqueos
        }else if (queBuscar === "letra"){
            return current.value.letra;
        }
    }
}

LinkedList.prototype.buscarProcesoPorLetra = function ( letra , queBuscar, current= this.head){
    if(this.head === null){
        return 0
    }
    if (current.next !== null){ //El penúltimo
        if(current.value.letra === letra){ //Si coincide la letra a buscar con el valor que estamos posicionados
            if(queBuscar === "tiempo"){ //Si se busca el tiempo
                return current.value.tiempo; // Se regresa el tiempo
            }else if (queBuscar === "cantidad"){ //Sino...
                return current.value.cantidadBloqueos; // Regresa la cantidad de bloqueos
            }else if (queBuscar === "letra"){
                return current.value.letra;
            }
        }
        //Está mal el return
        return this.buscarProcesoPorLetra(letra,queBuscar,current.next); //Si no coincide con la letra a buscar, va a seguir buscando
    }
    if(current.value.letra === letra){ // El último valor de la lista
        if(queBuscar === "tiempo"){ //Si se busca el tiempo
            return current.value.tiempo; // Se regresa el tiempo
        }else if (queBuscar === "cantidad"){ //Sino...
            return current.value.cantidadBloqueos; // Regresa la cantidad de bloqueos
        }else if (queBuscar === "letra"){
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
        if(current.value.ID === ID){ //Si coincide con el minMs a buscar con el valor que estamos posicionados
            if(aBuscar === "max"){
                return current.value.maxMs; // Se regresa el maxMs
            }
            if(aBuscar === "min"){
                return current.value.minMs; // Se regresa el minMS
            }
            if(aBuscar === "cantidad"){
                return current.value.cantidadVeces; // Se regresa la cantidad de veces que se hará el bloqueo
            }
        }
        return this.buscarBloqueo(ID, aBuscar,current.next); //Si no coincide con el minMS a buscar, va a seguir buscando
    }

    if(current.value.ID === ID){ // El último valor de la lista
        if(aBuscar === "max"){
            return current.value.maxMs; // Se regresa la cantidad de veces que se hará el bloqueo
        }
        if(aBuscar === "min"){
            return current.value.minMs; // Se regresa la cantidad de veces que se hará el bloqueo
        }
        if(aBuscar === "cantidad"){
            return current.value.cantidadVeces; // Se regresa la cantidad de veces que se hará el bloqueo
        }
    }
}



LinkedList.prototype.buscarEntorno = function ( ID,aBuscar, current= this.head){
    if(this.head === null){
        return 0
    }
    if (current.next !== null){ //El penúltimo
        if(current.value.ID === ID){ //Si coincide con el minMs a buscar con el valor que estamos posicionados
            if(aBuscar === "CPU"){
                return current.value.CPU; // Se regresa la cantidad de micros del entorno
            }
            if(aBuscar === "cambios"){
                return current.value.cambios; // Se regresa el ms de cambios
            }
            if(aBuscar === "bloqueo"){
                return current.value.bloqueo; // Se regresa la cantidad de ms del bloqueo
            }
        }
        return this.buscarEntorno(ID, aBuscar,current.next); //Si no coincide con el minMS a buscar, va a seguir buscando
    }

    if(current.value.ID === ID){ //Si coincide con el minMs a buscar con el valor que estamos posicionados
        if(aBuscar === "CPU"){
            return current.value.CPU; // Se regresa la cantidad de micros del entorno
        }
        if(aBuscar === "cambios"){
            return current.value.cambios; // Se regresa el ms de cambios
        }
        if(aBuscar === "bloqueo"){
            return current.value.bloqueo; // Se regresa la cantidad de ms del bloqueo
        }
    }
}

LinkedList.prototype.buscarCola = function ( ID,aBuscar, current= this.head){
    if(this.head === null){
        return 0
    }
    if (current.next !== null){ //El penúltimo
        if(current.value.ID === ID){ //Si coincide con el minMs a buscar con el valor que estamos posicionados
            if(aBuscar === "letra"){
                return current.value.letraCola; // Se regresa el maxMs
            }
            if(aBuscar === "ms"){
                return current.value.msMin; // Se regresa el minMS
            }
        }
        return this.buscarCola(ID, aBuscar,current.next); //Si no coincide con el minMS a buscar, va a seguir buscando
    }

    if(current.value.ID === ID){ //Si coincide con el minMs a buscar con el valor que estamos posicionados
        if(aBuscar === "letra"){
            return current.value.letraCola; // Se regresa el maxMs
        }
        if(aBuscar === "ms"){
            return current.value.msMin; // Se regresa el minMS
        }
    }
}

LinkedList.prototype.buscarMicroRes = function ( ID, queHacer,current= this.head){
    if(this.head === null){
        return 0
    }
    if (current.next !== null){ //El penúltimo
        if(current.value.ID === ID){ //Si coincide con el minMs a buscar con el valor que estamos posicionado
            if(queHacer === "boolean"){
                return current.value.bool;
            }else if (queHacer ==="hueco"){
                return current.value.hueco;
            }else if(queHacer === "hacerHuecoTrue"){
                return current.value.hueco = true;
            }else if(queHacer === "hacerHuecoFalse"){
                return current.value.hueco = false;
            }else if(queHacer === "hacerBoolTrue"){
                return current.value.elMenor = true;
            }else if(queHacer === "hacerBoolFalse"){
                return current.value.elMenor = false;
            }else if (queHacer === "TF"){
                return current.value.TF;
            }else if(queHacer === "ultimo"){
                return current.value.ultimoElementoID;
            }else if(queHacer === "contieneDatos"){
                return current.value.contieneDatos;
            }

        }
        return this.buscarMicroRes(ID,queHacer, current.next); //Si no coincide con el minMS a buscar, va a seguir buscando
    }

    if(current.value.ID === ID){ //Si coincide con el minMs a buscar con el valor que estamos posicionados
        if(queHacer === "boolean"){
            return current.value.bool;
        }else if (queHacer ==="hueco"){
            return current.value.hueco;
        }else if(queHacer === "hacerHuecoTrue"){
            return current.value.hueco = true;
        }else if(queHacer === "hacerHuecoFalse"){
            return current.value.hueco = false;
        }else if(queHacer === "hacerBoolTrue"){
            return current.value.elMenor = true;
        }else if(queHacer === "hacerBoolFalse"){
            return current.value.elMenor = false;
        }else if (queHacer === "TF"){
            return current.value.TF;
        }else if(queHacer === "ultimo"){
            return current.value.ultimoElementoID;
        }else if(queHacer === "contieneDatos"){
            return current.value.contieneDatos;
        }
    }
}



LinkedList.prototype.menorMicroRes = function ( ID, queHacer, current= this.head){
    if(this.head === null){
        return 0
    }
    if (current.next !== null){ //El penúltimo

        if(current.value.ID === ID){ //Si coincide con el minMs a buscar con el valor que estamos posicionado

            if(queHacer === "falso"){
                current.value.bool=false;
            }else{
                current.value.bool=true;
            }
        }
    }
        return this.menorMicroRes(ID, queHacer,current.next);

    if(current.value.ID === ID){
        if(queHacer === "falso"){
            current.value.menor=false;
        }else{
            current.value.menor=true;
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

LinkedList.prototype.actualizarTF = function ( ID, TF, current= this.head){
    if(this.head === null){
        return 0
    }
    if (current.next !== null){ //El penúltimo
        if(current.value.ID === ID){ //Si coincide con el minMs a buscar con el valor que estamos posicionados
            return current.value.TF = TF;
        }
        return this.actualizarTF(ID, TF,current.next); //Si no coincide con el minMS a buscar, va a seguir buscando
    }

    if(current.value.ID === ID){ //Si coincide con el minMs a buscar con el valor que estamos posicionados
        return current.value.TF = TF;
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

LinkedList.prototype.actualizarUltimoElementoID = function ( ID, ultimoElementoID, current= this.head){
    if(this.head === null){
        return 0
    }
    if (current.next !== null){ //El penúltimo
        if(current.value.ID === ID){ //Si coincide con el minMs a buscar con el valor que estamos posicionados
            return current.value.ultimoElementoID = ultimoElementoID;
        }
        return this.actualizarUltimoElementoID(ID, ultimoElementoID,current.next); //Si no coincide con el minMS a buscar, va a seguir buscando
    }

    if(current.value.ID === ID){ //Si coincide con el minMs a buscar con el valor que estamos posicionados
        return current.value.ultimoElementoID = ultimoElementoID;
    }
}

LinkedList.prototype.ultimoElementoHueco = function ( ID, queHacer, current= this.head){
    if(this.head === null){
        return 0
    }
    if (current.next !== null){ //El penúltimo
        if(current.value.ID === ID){ //Si coincide con el minMs a buscar con el valor que estamos posicionados
            if (queHacer === "verdadero"){
                return current.value.ultimoElementoHueco = true;
            }
            if (queHacer === "falso"){
                return current.value.ultimoElementoHueco = false;
            }
            if (queHacer === "regresarValor"){
                return current.value.ultimoElementoHueco;
            }

        }
        return this.ultimoElementoHueco(ID, queHacer,current.next); //Si no coincide con el minMS a buscar, va a seguir buscando
    }

    if(current.value.ID === ID){ //Si coincide con el minMs a buscar con el valor que estamos posicionados
        if (queHacer === "verdadero"){
            return current.value.ultimoElementoHueco = true;
        }
        if (queHacer === "falso"){
            return current.value.ultimoElementoHueco = false;
        }
        if (queHacer === "regresarValor"){
            return current.value.ultimoElementoHueco;
        }
    }
}

LinkedList.prototype.buscarMicro = function ( ID, aBuscar, IDMicro, current= this.head){
    if(this.head === null){
        return 0
    }
    if (current.next !== null){
        if(current.value.ID === ID && current.value.IDMicro === IDMicro){
            if(aBuscar === "letra"){
                return current.value.letraMicros;
            }
            if(aBuscar === "TCC"){
                return current.value.TCC;
            }
            if(aBuscar === "TE"){
                return current.value.TE;
            }
            if(aBuscar === "TVC"){
                return current.value.TVC;
            }
            if(aBuscar === "TB"){
                return current.value.TB;
            }
            if(aBuscar === "TT"){
                return current.value.TT;
            }
            if(aBuscar === "Ti"){
                return current.value.Ti;
            }
            if(aBuscar === "TF"){
                return current.value.TF;
            }
            if(aBuscar === "IDMicro"){
                return current.value.IDMicro;
            }
            if(aBuscar === "ignorar"){
                return  current.value.ignorar;
            }
            if(aBuscar === "hueco"){
                return  current.value.hueco;
            }
        }
        return this.buscarMicro(ID, aBuscar, IDMicro,current.next); //Si no coincide con el minMS a buscar, va a seguir buscando
    }

    if(current.value.ID === ID && current.value.IDMicro === IDMicro){ // El último valor de la lista
        if(aBuscar === "letra"){
            return current.value.letraMicros;
        }
        if(aBuscar === "TCC"){
            return current.value.TCC;
        }
        if(aBuscar === "TE"){
            return current.value.TE;
        }
        if(aBuscar === "TVC"){
            return current.value.TVC;
        }
        if(aBuscar === "TB"){
            return current.value.TB;
        }
        if(aBuscar === "TT"){
            return current.value.TT;
        }
        if(aBuscar === "Ti"){
            return current.value.Ti;
        }
        if(aBuscar === "TF"){
            return current.value.TF;
        }
        if(aBuscar === "IDMicro"){
            return current.value.IDMicro;
        }
        if(aBuscar === "ignorar"){
            return  current.value.ignorar;
        }
        if(aBuscar === "hueco"){
            return  current.value.hueco;
        }
    }
}

LinkedList.prototype.ignorarMicro = function ( ID, aHacer, IDMicro, current= this.head){
    if(this.head === null){
        return 0
    }
    if (current.next !== null){
        if(current.value.ID === ID && current.value.IDMicro === IDMicro){
            if(aHacer === "ignorar") {
                return current.value.ignorar = true;
                console.log("Entró")
            }
        }
        return this.ignorarMicro(ID, aHacer, IDMicro,current.next); //Si no coincide con el minMS a buscar, va a seguir buscando
    }

    if(current.value.ID === ID && current.value.IDMicro === IDMicro){ // El último valor de la lista
        if(aHacer === "ignorar") {
            return current.value.ignorar = true;
        }
    }
}

LinkedList.prototype.contieneDatos = function ( ID, current= this.head){
    if(this.head === null){
        return 0
    }
    if (current.next !== null){
        if(current.value.ID === ID){
                return current.value.contieneDatos = true;
        }
        return this.contieneDatos(ID, current.next); //Si no coincide con el minMS a buscar, va a seguir buscando
    }

    if(current.value.ID === ID){ // El último valor de la lista
        return current.value.contieneDatos = true;
    }
}

// --------------------------------------------Creación de las listas ----------------------------------------------

var listaBloqueos = new LinkedList();
var listaProcesos = new LinkedList();

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

function Micros(ID, letraMicros, TCC, TE, TVC, TB, TT, Ti, TF, IDMicro, ignorar, hueco){
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
    this.ignorar = ignorar;
    this.hueco = hueco;
}

function microsResumen(ID, TF, elMenor, hueco, ultimoElementoID, contieneDatos, ultimoElementoHueco){
    this.ID = ID;
    this.TF = TF;
    this.elMenor = elMenor;
    this.hueco = hueco;
    this.ultimoElementoID = ultimoElementoID;
    this.contieneDatos = contieneDatos;
    this.ultimoElementoHueco = ultimoElementoHueco;
}

// ------------------------------------------------------- Procesamiento del documento de texto ----------------------------------------------------------------

archivoTxt.open("GET",fileRuta,false);
archivoTxt.send(null);
var txt = archivoTxt.responseText;
for (i =0; i<txt.length ; i++){
    arrayData.push(txt[i]);
    palabra=palabra+txt[i];

    if(palabra === "Tiempos"){
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

    }else if (palabra === "Bloqueos"){
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
    }else if (palabra === "Entornos"){
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

    }else if (palabra === "Cola"){
       //console.log("Aquí va la cola");
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
    if(txt[i] === "\n"){
        //console.log(palabra);
        palabra="";
    }

}
//listaProcesos.returnList();
// ------------------------------------------------------------- Creación de las tablas ----------------------------------------------------------------




// Datos de entrada
var cantidadMicros =1;//listaEntornos.buscarEntorno(IDEntorno,"CPU");
var quantum = 3000;
var TCC = 10;
var TB = 10;

// Posicionar tiempos finales a 0 para cada micro
var provi;


//listaMicrosRes.returnList();



var listaMicros = new LinkedList();
var listaMicrosRes = new LinkedList();



function calcularMicros(cantidadMicros, quantum, TCC, TB){
    listaMicros = new LinkedList();
    listaMicrosRes = new LinkedList();
    var IDMenorTFMicro;
    var letraActual;
    var TCCCalcular,TE,TVC,TBCalcular,TT,Ti,TF;
    var contHuecos = 0, cambioMs = false, IDTemp;
    for(i=1;i<=cantidadMicros;i++) {
        var objetoMicroRes = new microsResumen(i, 0, false, true, 0, false, false);
        listaMicrosRes.append(objetoMicroRes);
    }


    for(i=1;i<=listaCola.length();i++){

        if(cambioMs == true){
            IDMenorTFMicro = IDTemp;
            cambioMs = false;
            //console.log(cambioMs);
        }else{
            //Elegir el que tenga boolean == true
            IDMenorTFMicro = sortListaMicrosRes();
            //console.log("ID Menor TF: "+IDMenorTFMicro);
        }

        // Ver si puede entrar a la cola
        if(listaMicrosRes.buscarMicroRes(IDMenorTFMicro,"TF") >= listaCola.buscarCola(i,"ms")){ // Si el tiempo final es menor al tiempo final del micro

            if(listaMicrosRes.buscarMicroRes(IDMenorTFMicro,"hueco") === true){ //Si es el inicio o si hay un hueco antes...
                TCCCalcular = 0;
                listaMicrosRes.buscarMicroRes(IDMenorTFMicro,"hacerHuecoFalse");
            }else{
                TCCCalcular = TCC;
            }
            //console.log("Antes - ID. "+IDMenorTFMicro+" TF:"+listaMicrosRes.buscarMicroRes(IDMenorTFMicro,"TF"));
            // Observamos la letra actual en la que estamos posicionados
            letraActual = listaCola.buscarCola(i,"letra");
            // Sacamos el Tiempo de la letra y lo guardamos en la variable TE
            TE = listaProcesos.buscarProcesoPorLetra(letraActual,"tiempo");
            // Sacamos el TVC
            TVC = (Math.ceil(TE/quantum)-1)*TCC;//(Math.ceil(TE / quantum)-1)*TCC
            // Sacamos el tiempo de bloqueo multiplicando la cantidad de veces en las que se utilizará el bloqueo por los ms propuestos en el entorno
            TBCalcular = listaProcesos.buscarProcesoPorLetra(letraActual,"cantidad")*TB;
            // Sacamos el tiempo total
            TT = TE+TVC+TCCCalcular+TBCalcular;
            // Establecemos el tiempo inicial con el tiempo final pasado de la micro en donde estamos actualmente
            Ti = listaMicrosRes.buscarMicroRes(IDMenorTFMicro,"TF");
            TF = TT + Ti;
            var objetoMicros = new Micros(i+contHuecos,letraActual,TCCCalcular,TE,TVC,TBCalcular,TT,Ti,TF,IDMenorTFMicro,false,false);

            listaMicrosRes.actualizarTF(IDMenorTFMicro,TF);
            listaMicrosRes.actualizarUltimoElementoID(IDMenorTFMicro,i+contHuecos);
            listaMicrosRes.contieneDatos(IDMenorTFMicro);
            listaMicrosRes.ultimoElementoHueco(IDMenorTFMicro,"falso");
            listaMicros.append(objetoMicros);
        }else{
            //listaMicrosRes.returnList();
            // Nos posicionamos desde el micro 1
            for(var j=1; j<=listaMicrosRes.length();j++){
                if (listaMicrosRes.buscarMicroRes(j, "TF") < listaCola.buscarCola(i, "ms")) {
                    if(listaMicrosRes.ultimoElementoHueco(j,"regresarValor") === true){ //Si la última variable ingresada fue un hueco...
                        listaMicros.ignorarMicro(listaMicrosRes.buscarMicroRes(j,"ultimo"),"ignorar",j);

                    }
                    // Si se hace un hueco
                    TE = listaCola.buscarCola(i, "ms") - listaMicrosRes.buscarMicroRes(j, "TF");
                    listaMicrosRes.buscarMicroRes(j, "hacerHuecoTrue");
                    Ti = listaMicrosRes.buscarMicroRes(j, "TF"); // Actualizar Ti
                    TF = listaCola.buscarCola(i, "ms");
                    listaMicrosRes.actualizarTF(j, TF);
                    listaMicrosRes.actualizarUltimoElementoID(j, i + contHuecos);
                    listaMicrosRes.ultimoElementoHueco(j,"verdadero");
                    var objetoMicros = new Micros(i + contHuecos, "-", "-", TE, "-", "-", TE, Ti, TF, j,false, true);
                    listaMicros.append(objetoMicros)
                    contHuecos++;
                    //console.log("huecos: "+contHuecos);
                    i--;
                }

                cambioMs = true;
                IDTemp = sortListaMicrosRes();

            }
        }
    }
    generarTablas(cantidadMicros);
}


function sortListaMicrosRes(){
    var IDMenor = listaMicrosRes.length();

    for (var i=listaMicrosRes.length();i>1;i--){
        //console.log(i);
        // Vamos a buscar el menor de la lista
        if(listaMicrosRes.buscarMicroRes(i,"TF")>=listaMicrosRes.buscarMicroRes(i-1,"TF")){
            if(listaMicrosRes.buscarMicroRes(IDMenor,"TF")>=listaMicrosRes.buscarMicroRes(i-1,"TF")){
                listaMicrosRes.buscarMicroRes(IDMenor,"hacerBoolFalse");
                IDMenor=i-1;
                listaMicrosRes.buscarMicroRes(IDMenor,"hacerBoolTrue");
            }
        }else{
            if(listaMicrosRes.buscarMicroRes(IDMenor,"TF")>=listaMicrosRes.buscarMicroRes(i,"TF")){
                listaMicrosRes.buscarMicroRes(IDMenor,"hacerBoolFalse");
                IDMenor=i;
                listaMicrosRes.buscarMicroRes(IDMenor,"hacerBoolTrue");
            }
        }
    }
    return IDMenor;
}


function calcular() {
    if(click==true){
        //Se eliminan tablas anteriores
        document.getElementById("padre").innerHTML = "";
        document.getElementById("padre").innerHTML = "<div id=\"tablasMicros\"></div>";
    }
    click = true;
    var inputCantidadMicros = parseInt(document.getElementById("cantidadMicros").value);
    var inputQuantum = parseInt(document.getElementById("quantum").value);
    var inputTCC = parseInt(document.getElementById("TCC").value);
    var inputTB = parseInt(document.getElementById("TB").value);
    calcularMicros(inputCantidadMicros,inputQuantum,inputTCC,inputTB);
}


function generarTablas(cantidadMicros){
    console.log("Cantidad de micros: "+cantidadMicros);
    listaMicrosRes.returnList();
    const $cuerpoTabla = document.querySelector("#tablasMicros");
    // Desde aquí inicia el loop para CREAR CADA TABLA
    for(var j=1; j<=cantidadMicros;j++){
        if(listaMicrosRes.buscarMicroRes(j,"contieneDatos") === true){
            console.log("Entró al micro "+j)
            const $h2 = document.createElement("h2");
            $h2.textContent = "Micro "+j;
            $cuerpoTabla.appendChild($h2);
            //console.log(j);
            const $table = document.createElement("table");
            const $thead = document.createElement("thead");
            const $trHead = document.createElement("tr");
            let $thLetraProceso = document.createElement("th");
            $thLetraProceso.textContent = "Letra Proceso";
            $trHead.appendChild($thLetraProceso);
            let $thTCC = document.createElement("th");
            $thTCC.textContent = "TCC";
            $trHead.appendChild($thTCC);
            let $thTE = document.createElement("th");
            $thTE.textContent = "TE";
            $trHead.appendChild($thTE);
            let $thTVC = document.createElement("th");
            $thTVC.textContent = "TVC";
            $trHead.appendChild($thTVC);
            let $thTB = document.createElement("th");
            $thTB.textContent = "TB";
            $trHead.appendChild($thTB);
            let $thTT = document.createElement("th");
            $thTT.textContent = "TT";
            $trHead.appendChild($thTT);
            let $thTi = document.createElement("th");
            $thTi.textContent = "Ti";
            $trHead.appendChild($thTi);
            let $thTF = document.createElement("th");
            $thTF.textContent = "TF";
            $trHead.appendChild($thTF);
            // Se agregan headers
            $thead.appendChild($trHead);
            $table.appendChild($thead);
            // Aquí acaba el encabezado e inicia el cuerpo de la tabla
            const $tbody = document.createElement("tbody");
            var contFilas =0;
            if(listaMicrosRes.buscarMicroRes(j,"hueco") === true){
                for(var i=1;i<=listaMicros.length();i++){
                    if(listaMicros.buscarMicro(i,"IDMicro",j) === j && listaMicrosRes.buscarMicroRes(j,"ultimo") != i && listaMicros.buscarMicro(i,"ignorar",j) === false){
                        // Crear un <tr>
                        const $tr = document.createElement("tr");
                        // Creamos el <td> de nombre y lo adjuntamos a tr
                        let $tdLetraProceso = document.createElement("td");
                        $tdLetraProceso.textContent = listaMicros.buscarMicro(i,"letra",j); // el textContent del td es el nombre
                        $tr.appendChild($tdLetraProceso);
                        // El td de precio
                        let $tdTCC = document.createElement("td");
                        $tdTCC.textContent = listaMicros.buscarMicro(i,"TCC",j);
                        $tr.appendChild($tdTCC);
                        // El td del código
                        let $tdTE = document.createElement("td");
                        $tdTE.textContent = listaMicros.buscarMicro(i,"TE",j);
                        $tr.appendChild($tdTE);
                        let $tdTVC = document.createElement("td");
                        $tdTVC.textContent = listaMicros.buscarMicro(i,"TVC",j);
                        $tr.appendChild($tdTVC);
                        // El td del código
                        let $tdTB = document.createElement("td");
                        $tdTB.textContent = listaMicros.buscarMicro(i,"TB",j);
                        $tr.appendChild($tdTB);
                        let $tdTT = document.createElement("td");
                        $tdTT.textContent = listaMicros.buscarMicro(i,"TT",j);
                        $tr.appendChild($tdTT);
                        let $tdTi = document.createElement("td");
                        $tdTi.textContent = listaMicros.buscarMicro(i,"Ti",j);
                        $tr.appendChild($tdTi);
                        let $tdTF = document.createElement("td");
                        $tdTF.textContent = listaMicros.buscarMicro(i,"TF",j);
                        $tr.appendChild($tdTF);
                        // Finalmente agregamos el <tr> al cuerpo de la tabla
                        $tbody.appendChild($tr);
                        // Y el ciclo se repite hasta que se termina de recorrer toda la lista
                        contFilas++;
                    }

                }
            }else{
                for(var i=1;i<=listaMicros.length();i++){
                    if(listaMicros.buscarMicro(i,"IDMicro",j) === j){
                        // Crear un <tr>
                        const $tr = document.createElement("tr");
                        // Creamos el <td> de nombre y lo adjuntamos a tr
                        let $tdLetraProceso = document.createElement("td");
                        $tdLetraProceso.textContent = listaMicros.buscarMicro(i,"letra",j); // el textContent del td es el nombre
                        $tr.appendChild($tdLetraProceso);
                        // El td de precio
                        let $tdTCC = document.createElement("td");
                        $tdTCC.textContent = listaMicros.buscarMicro(i,"TCC",j);
                        $tr.appendChild($tdTCC);
                        // El td del código
                        let $tdTE = document.createElement("td");
                        $tdTE.textContent = listaMicros.buscarMicro(i,"TE",j);
                        $tr.appendChild($tdTE);
                        let $tdTVC = document.createElement("td");
                        $tdTVC.textContent = listaMicros.buscarMicro(i,"TVC",j);
                        $tr.appendChild($tdTVC);
                        // El td del código
                        let $tdTB = document.createElement("td");
                        $tdTB.textContent = listaMicros.buscarMicro(i,"TB",j);
                        $tr.appendChild($tdTB);
                        let $tdTT = document.createElement("td");
                        $tdTT.textContent = listaMicros.buscarMicro(i,"TT",j);
                        $tr.appendChild($tdTT);
                        let $tdTi = document.createElement("td");
                        $tdTi.textContent = listaMicros.buscarMicro(i,"Ti",j);
                        $tr.appendChild($tdTi);
                        let $tdTF = document.createElement("td");
                        $tdTF.textContent = listaMicros.buscarMicro(i,"TF",j);
                        $tr.appendChild($tdTF);
                        // Finalmente agregamos el <tr> al cuerpo de la tabla
                        $tbody.appendChild($tr);
                        // Y el ciclo se repite hasta que se termina de recorrer toda la lista
                        contFilas++;
                    }

                }
            }
            // Aquí va el loop para agregar la ingormación de la tabla


            // Se agrega el cuerpo a la tabla
            $table.appendChild($tbody);

            // Se agrega la tabla al DIV
            $cuerpoTabla.appendChild($table);

            const $br = document.createElement("br");
            $cuerpoTabla.appendChild($br);
        }


    }
}


