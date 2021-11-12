//<script type="text/javascript" src="js/funcionesComputer.js"></script>

function traerInformacionMensaje(){
    $.ajax({
        url:"http://127.0.0.1:8080/api/Message/all",
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            $("#resultadoClient").empty();
            pintarRespuestaMessage(respuesta);
        }
    });
}

function pintarRespuestaMensaje(respuesta){

    let myTable="<table border = 5>";
    for(i=0;i<items.length;i++){

        let idMessage = items[i].idMessage;
        let mensaje = items[i].messageText;
        let client = items[i].client;
        let computer = items[i].computer;   
        
        for (i = 0; i<items.length; i++){
            
                mensaje = items[i]["messageText"];
                computer = items[i]["computer"];
                client = items[i]["client"];

                if (JSON.stringify(computer) != "[]"){
            }else{
                console.log(JSON.stringify(reservaciones));
            }
        }
        for (var j = 0; j < mensajes.length; j++){   
            if (JSON.stringify(mensajes) != "[]"){
                delete mensajes[j] ["idMessage"]; 
                delete mensajes[j] ["Client"]["id"];
                delete mensajes[j] ["Client"]["category"]["idcategory"];                          
            }else{
                console.log(JSON.stringify(mensajes));
            }
        }
    
    mensajes = JSON.stringify(mensajes);
    reservaciones = JSON.stringify(reservaciones);
    myTable+="<tr>";
    myTable+="<td>"+name+"</td>";
    myTable+="<td>"+email+"</td>";
    myTable+="<td>"+password+"</td>";
    myTable+="<td>"+age+"</td>";
    myTable+="<td>"+mensajes+"</td>";
    myTable+="<td>"+reservaciones+"</td>";
    myTable+="<td> <button onclick='borrarElementoClient(" + items[i].idCl +")'> Borrar </button></td>";
    myTable+="<td> <button onclick='obtenerItemClient(" + items[i].idCl +")'> Cargar</button></td>";
    myTable+="<td> <button onclick='editarElementoClient(" + items[i].idCl +")'> Actualizar </button></td>";
    myTable+="</tr>";
}
    myTable+="</table>";
    $("#resultadoClient").append(myTable);
}

function guardarInformacionMensaje(){
    let var5 = {
        messageText:$("#MmessageText").val(), 
        //client:$("#MidClient").val(),
        //computer:$("#MidComputer").val()
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var5),

        url:"http://localhost:8080/api/Message/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente :)");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente :(");
    
    
        }
        });

    }