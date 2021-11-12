function traerInformacionCategorias(){
    $.ajax({
        url:"http://127.0.0.1:8080/api/Category/all",
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            $("#resultadoCategory").empty();
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(items){

    let myTable="<table border = 5>";
    for(i=0;i<items.length;i++){

        let id_Category = parseInt(items[i].id);
        let name = items[i]["name"];
        let description = items[i]["description"];
        let computer = items[i]["computers"];
        for (var j = 0; j<computer.length; j++){
            if (JSON.stringify(computer) != "[]"){
                delete computer [j] ["idcomputer"];
                for (var k = 0; k < computer[j]["reservations"].length; k++){
                    delete computer [j]["reservations"][k]["client"]["password"];
                    delete computer [j]["reservations"][k]["client"]["age"];
                }
                for (var k = 0; k<computer[j]["messages"].length; k++){
                    delete computer [j]["messages"][k]["idMessage"];
                }        
            }
        }



        computer = JSON.stringify(computer);
        myTable+="<tr>";
        myTable+="<td>"+name+"</td>";
        myTable+="<td>"+description+"</td>";
        myTable+="<td>"+computer+"</td>";
        myTable+="<td> <button onclick='borrarElementoCategorias(" + items[i].id +")'> Borrar </button></td>";
        myTable+="<td> <button onclick='obtenerItemCategorias(" + items[i].id +")'> Cargar</button></td>";
        myTable+="<td> <button onclick='editarElementoCategorias(" + items[i].id +")'> Actualizar </button></td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoCategory").append(myTable);
}

function guardarInformacionCategorias(){
    let datos = {
        id:$("#id").val(),
        name:$("#name").val(),
        description:$("#description").val()
        };

    let dataToSend = JSON.stringify(datos);
      
    $.ajax({
        url:"http://127.0.0.1:8080/api/Category/save",
        type:"POST",
        data:dataToSend,
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",

        success:function(respuesta) {
            $("#resultadoCategory").empty();
            $("#name").val("");
            $("#description").val("");
            $("#machine").val("");
            traerInformacionCategorias();
            //console.log(response);
            //console.log("Se guardo correctamente");
            alert("Se guardo correctamente :)");
            //window.location.reload()
    
        },
     });
}

function editarElementoCategorias(id){
    let datos={
        id:id,
        name: $("#name").val(),
        description:$("#description").val()
    };

    let dataToSend=JSON.stringify(datos);

    $.ajax({
        url: "http://127.0.0.1:8080/api/Category/update",
        type:"PUT",
        data:JSON.stringify(datos),
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#name").val("");
            $("#description").val("");
            $("#computer").val("");
            $("#resultadoCategory").empty();
            traerInformacionCategorias();
            alert("Se ha actualizado con exito ;)")
        }
    })


}


function borrarElementoCategorias(idElemento){
    $.ajax({
        url:"http://127.0.0.1:8080/api/Category/"+idElemento,
        type:"DELETE",
        datatype:"JSON",
        success:function(respuesta){
            $("resultadoCategory").empty();
            traerInformacionCategorias();
            alert("Se ha eliminado con exito ;)")
        }
    });
}

function obtenerItemCategorias(items){
    $.ajax({
        datatype:"json",
        url: "http://127.0.0.1:8080/api/Category/"+items,
        type: "GET",
        success: function(response){
            console.log("---- obtenerItemCategorias", response);
            var item = response;
            $("#id").val(item.id);
            $("#name").val(item.name);;
            $("#description").val(item.description);

        },
        error: function (jqXHR, textStatus, errorThrown) {},
    });
}
