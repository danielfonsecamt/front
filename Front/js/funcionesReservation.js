
function traerInformacionReservation(){
    $.ajax({
        url:"http://localhost:8080/api/Message/all",
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaReservation(respuesta);
        }
    });
}

function pintarRespuestaReservation(respuesta){

    let myTable5="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable5+="<tr>";
        myTable5+="<td>"+respuesta[i].idReservation+"</td>";
        myTable5+="<td>"+respuesta[i].startDate+"</td>";
        myTable5+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable5+="<td>"+respuesta[i].client+"</td>";
        myTable5+="<td>"+respuesta[i].computer+"</td>";
        myTable5+="</tr>";
        
    }
    myTable5+="</table>";
    $("#resultado5").html(myTable5);
}

function guardarInformacionReservation(){
    let var6 = {
        startDate:$("#DstartDate").val(),
        devolutionDate:$("#DdevolutionDate").val(),
        //client:$("#MidClient").val(),
        //computer:$("#MidComputer").val()
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var6),

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