  //for date and time
  function time(){document.getElementById("t").innerHTML=Date();}
            window.onload=time;
  //for textarea  
  var button=document.getElementById("submit");
            var textarea=document.getElementById("comments");
            var para=document.getElementById("p2");
            button.onclick=function(){
                para.innerHTML=textarea.value;};
   // for Ajax data call        
    var button1=document.getElementById("homeB");

    button1.onclick=function(){
    var request= new XMLHttpRequest();
    
    request.onreadystatechange=function(){
        if(request.readystate===request.DONE)
        { if(request.status===200)
           {
             var counter =request.responseText;
             var span=document.getElementById("sp");
             span.innerHTML=counter.toString();
            }
            else
            { 
            var    span1=document.getElementById("sp");
             span1.innerHTML="request not ok";
            }
        }
        else
        {
            {var span2=document.getElementById("sp");
             span2.innerHTML="request not done";
            }
        }
    };
    
    request.open('GET',"https://cloud.imad.hasura.io/code/files/server.js/counter",true);
    request.send(null);
   };
   