function traerInformacionComputer(){
    $.ajax({
        url:"http://127.0.0.1:8080/api/Computer/all",
        headers: {
            'Access-Control-Allow-Origin': '*'
            //'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            $("#resultadoComputer").empty();
            pintarRespuestaComputer(respuesta);
        }
    });
}

function pintarRespuestaComputer(items){

    let myTable="<table border = 5>";
    for(i=0;i<items.length;i++){

        let id_Computer = parseInt(items[i].id);
        let name = items[i].name;
        let brand = items[i].brand;
        let year = items[i].year;
        let description = items[i].description;
        let category = items[i].category;
        let mensajes = items[i].messages;
        let reservaciones = items[i].reservations;
        

        for (var k = 0; k<reservaciones.length; k++){
                if (JSON.stringify(reservaciones) != "[]"){
                    delete reservaciones[k] ["client"]["password"];
                    delete reservaciones[k] ["client"]["age"];

                }else{
                    console.log(JSON.stringify(mensajes));
                }
            }
            for (var j = 0; j < mensajes.length; j++){   
                if (JSON.stringify(mensajes) != "[]"){
                    delete mensajes[j] ["idMessage"];                           
                }else{
                    console.log(JSON.stringify(mensajes));
                }
            }
            if (JSON.stringify(category) != "[]"){
                delete category ["idCategory"];                           
            }
        category = JSON.stringify(category);
        mensajes = JSON.stringify(mensajes);
        reservaciones = JSON.stringify(reservaciones);
        myTable+="<tr>";
        myTable+="<td>"+name+"</td>";
        myTable+="<td>"+brand+"</td>";
        myTable+="<td>"+year+"</td>";
        myTable+="<td>"+description+"</td>";
        myTable+="<td>"+category+"</td>";
        myTable+="<td>"+mensajes+"</td>";
        myTable+="<td>"+reservaciones+"</td>";
        myTable+="<td> <button onclick='borrarElementoComputer(" + items[i].idH +")'> Borrar </button></td>";
        myTable+="<td> <button onclick='obtenerItemComputer(" + items[i].idH +")'> Cargar</button></td>";
        myTable+="<td> <button onclick='editarElementoComputer(" + items[i].idH +")'> Actualizar </button></td>";
        myTable+="</tr>";                           
    }
    myTable+="</table>";
    $("#resultadoComputer").append(myTable);
}

function guardarInformacionComputer(){
    let datos = {
        name:$("#nameH").val(),
        category:{"id":$("#categoryH").val()},
        brand:$("#brandH").val(),
        year:$("#yearH").val(),
        description:$("#descriptionH").val()
        };
    let dataToSend=JSON.stringify(datos);
    $.ajax({
        url:"http://127.0.0.1:8080/api/Computer/save",
        type:"POST",
        data: dataToSend,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",

        success:function(respuesta) {
            $("#resultadoComputer").empty();
            $("#nameH").val("");
            $("#yearH").val("");
            $("#categoryH").val("");
            $("#brandH").val("");
            $("#descriptionH").val("");                
            traerInformacionComputer();
            //console.log(response);
            //console.log("Se guardo correctamente");
            alert("Se guardo correctamente :)");
    
        }
               
    });

}
function editarElementoComputer(idH){
    let datos={
        idH:idH,
        name: $("#nameH").val(""),
        brand: $("#brandH").val(""),
        year: $("#yearH").val(""),
        description:$("#description").val("")
    };
    console.log("datos"+JSON.stringify(datos));
    $.ajax({
        url: "http://127.0.0.1:8080/api/Computer/update",
        type:"PUT",
        data:JSON.stringify(datos),
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#nameH").val("");
            $("#brandH").val(""),
            $("#yearH").val(""),
            $("#description").val("");           
            $("#resultadoComputer").empty();
            traerInformacionComputer();
            alert("Se ha actualizado con exito ;)")
        }
    })
}
function borrarElementoComputer(idElemento){
    let datos={
        id:idElemento
    };
    let dataToSend=JSON.stringify(datos);
    $.ajax({
        url:"http://127.0.0.1:8080/api/Computer/"+idElemento,
        type:"DELETE",
        datatype:"JSON",
        success:function(respuesta){
            $("resultadoComputer").empty();
            traerInformacionComputer();
            alert("Se ha eliminado con exito ;)")
        }
    });
}

function obtenerItemComputer(items){
    console.log("---- obtenerItemComputer", items);
    $.ajax({
        datatype:"json",
        url: "http://127.0.0.1:8080/api/Computer/"+items,
        type: "GET",
        success: function(response){
            var item = response;
            console.log("---- obtenerItemComputer", item);
            $("#nameH").val(item.name);
            $("#yearH").val(item.year);
            $("#categoryH").val(item.computer.id);
            $("#brandH").val(item.brand);
            $("#descriptionH").val(item.description);

        },
        error: function (jqXHR, textStatus, errorThrown) {},
    });
}

      

