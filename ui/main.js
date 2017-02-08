//console.log('Loaded!');
var button=document.getElementById("homeB");

button.onclick=function(){
    var request= new XMLHttpRequest();
    
    request.onreadystatechange=function(){
        if(request.readystate===request.DONE)
        {if(request.status===200)
           {
             var counter =request.responseText;
             var span=document.getElementById("sp");
             span.innerHTML=counter.toString();
        }
        }
    };
    
    request.open('GET',"server.js/counter",true);
    request.send(null);
}