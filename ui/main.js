
       
       //for textarea  for home page
  var button=document.getElementById("submit");
            var textarea=document.getElementById("comments");
            var para=document.getElementById("p1");
            button.onclick=function(){
                para.innerHTML="You posted :"+textarea.value;};
       
   // for Ajax data call of home page visitor count  and date     
 
   window.onload= function()
    {    var d = new Date();
        document.getElementById("t").innerHTML=d.toDateString();
      var request= new XMLHttpRequest();
    
      request.onreadystatechange=function()
      {
        if(request.readyState==4 && request.status==200 )
        { 
             var counter =request.responseText;
             var span=document.getElementById("sp");
             span.innerHTML=counter;
            
        }
        
     };
    
    request.open('GET',"/counter",true);
    request.send(null);
   };
   
   