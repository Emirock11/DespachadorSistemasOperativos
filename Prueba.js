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

LinkedList.prototype.buscarProceso = function ( ID, queBuscar, current= this.head){
    if(this.head === null){
        return 0
    }
    if (current.next !== null){ //El penúltimo
        if(current.value.ID == ID){ //Si coincide la letra a buscar con el valor que estamos posicionados
            if(queBuscar == "tiempo"){ //Si se busca el tiempo
                return current.value.tiempo; // Se regresa el tiempo
            }else if(queBuscar == "cantidad") { //Sino...
                return current.value.cantidadBloqueos; // Regresa la cantidad de bloqueos
            }else{
                return current.value.letra;
            }
        }
        return this.buscarProceso(ID, queBuscar, current.next); //Si no coincide con la letra a buscar, va a seguir buscando
    }
    if(current.value.ID == ID){ // El último valor de la lista
        if(queBuscar == "tiempo"){ //Si se busca el tiempo
            return current.value.tiempo; // Se regresa el tiempo
        }else if(queBuscar == "cantidad") { //Sino...
            return current.value.cantidadBloqueos; // Regresa la cantidad de bloqueos
        }else{
            return current.value.letra;
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

function proceso(ID,letra, tiempo, cantidadBloqueos) {
    this.ID = ID;
    this.letra = letra;
    this.tiempo = tiempo;
    this.cantidadBloqueos = cantidadBloqueos;
}






var lista = new LinkedList();

var proceso1 = new proceso(1,"A",400,2);
lista.append(proceso1);
var proceso2 = new proceso(2,"B",300,2);
lista.append(proceso2);
var proceso3 = new proceso(3,"C",50,2);
lista.append(proceso3);
var proceso4 = new proceso(4,"D",100,2);
lista.append(proceso4);
var proceso5 = new proceso(5,"E",1000,5);
lista.append(proceso5);
var proceso6 = new proceso(6,"F",500,3);
lista.append(proceso6);
var proceso7 = new proceso(7,"G",10,2);
lista.append(proceso7);

//console.log(lista.returnList());



// ----------------------------------------------------- Generar tabla ---------------------------------------------------------------------------------------------

// Ahora dibujamos la tabla
/*const $cuerpoTabla = document.querySelector("#cuerpoTabla");
// Recorrer todos los productos
for(var i=1;i<lista.length()+1;i++){
    // Crear un <tr>
    const $tr = document.createElement("tr");
    // Creamos el <td> de nombre y lo adjuntamos a tr
    let $tdLetra = document.createElement("td");
    $tdLetra.textContent = lista.buscarProceso(i,"letra"); // el textContent del td es el nombre
    $tr.appendChild($tdLetra);
    // El td de precio
    let $tdTiempo = document.createElement("td");
    $tdTiempo.textContent = lista.buscarProceso(i,"tiempo");
    $tr.appendChild($tdTiempo);
    // El td del código
    let $tdBloqueos = document.createElement("td");
    $tdBloqueos.textContent = lista.buscarProceso(i,"cantidad");
    $tr.appendChild($tdBloqueos);
    // Finalmente agregamos el <tr> al cuerpo de la tabla
    $cuerpoTabla.appendChild($tr);
    // Y el ciclo se repite hasta que se termina de recorrer todo el arreglo
}*/

// ---------------------------------------------------------- Generar tabla desde 0 ------------------------------------------------------------------------------

function generarTablas(cantidad) {
    const $cuerpoTabla = document.querySelector("#tablas");
    // Desde aquí inicia el loop para CREAR CADA TABLA
    for(var j=0; j<cantidad;j++){
        console.log(j);
        const $table = document.createElement("table");
        const $thead = document.createElement("thead");
        const $trHead = document.createElement("tr");
        let $thLetra = document.createElement("th");
        $thLetra.textContent = "Letra";
        $trHead.appendChild($thLetra);
        let $thTiempo = document.createElement("th");
        $thTiempo.textContent = "Tiempo";
        $trHead.appendChild($thTiempo);
        let $thCantidad = document.createElement("th");
        $thCantidad.textContent = "Cantidad de bloqueos";
        $trHead.appendChild($thCantidad);
        $thead.appendChild($trHead);
        $table.appendChild($thead);
        // Aquí acaba el encabezado e inicia el cuerpo de la tabla
        const $tbody = document.createElement("tbody");
        // Aquí va el loop para agregar la ingormación de la tabla
        for(var i=1;i<lista.length()+1;i++){
            // Crear un <tr>
            const $tr = document.createElement("tr");
            // Creamos el <td> de nombre y lo adjuntamos a tr
            let $tdLetra = document.createElement("td");
            $tdLetra.textContent = lista.buscarProceso(i,"letra"); // el textContent del td es el nombre
            $tr.appendChild($tdLetra);
            // El td de precio
            let $tdTiempo = document.createElement("td");
            $tdTiempo.textContent = lista.buscarProceso(i,"tiempo");
            $tr.appendChild($tdTiempo);
            // El td del código
            let $tdBloqueos = document.createElement("td");
            $tdBloqueos.textContent = lista.buscarProceso(i,"cantidad");
            $tr.appendChild($tdBloqueos);
            // Finalmente agregamos el <tr> al cuerpo de la tabla
            $tbody.appendChild($tr);
            // Y el ciclo se repite hasta que se termina de recorrer todo el arreglo
        }
        $table.appendChild($tbody);
        $cuerpoTabla.appendChild($table);
        const $br = document.createElement("br");
        $cuerpoTabla.appendChild($br);
    }

}

//generarTablas(4);

var TE = 300;
var quantum = 50;
var TCC = 15;
var TVC=(Math.ceil(TE/quantum)-1)*TCC;

console.log(TVC);
