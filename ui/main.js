//console.log('Loaded!');
var button=document.getElementById("homeB");

button.onclick=function(){
    var request= new XMLHttpRequest();
    
    request.readystatechange=function(){
        if(request.readystate==4 && request.status==200)
        {var count =request.responseText;
            var span=document.getElementById("sp");
            span.innerHTML=count.toString();
        }
    };
    
    request.open('GET',"http://internetadvancedsolutions.imad.hasura-app.io/counter",true);
    request.send(null);
}