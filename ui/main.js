//console.log('Loaded!');
var button=document.getElementById("homeB");

button.onclick=function(){
    var request= new XMLHttpRequest();
    
    request.onreadystatechange=function(){
        if(request.readystate===request.DONE && request.status===200)
        {var count =request.responseText;
            var span=document.getElementById("sp");
            span.innerHTML=count.toString();
        }
    };
    
    request.open('GET',"http://internetadvancedsolutions.imad.hasura-app.io/counter",true);
    request.send(null);
}