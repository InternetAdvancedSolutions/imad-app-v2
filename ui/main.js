
       
       //for textarea  for home page NO MORE THERE ON PAGE
 /* var button=document.getElementById("submit");
            var textarea=document.getElementById("comments");
            var para=document.getElementById("p1");
            button.onclick=function(){
                para.innerHTML="You posted :"+textarea.value;};
*/
       
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
    
    var request2=new XMLHttpRequest();
    request2.onreadystatechange=function()
      {
        if(request2.readyState==4 && request2.status==200 )
        { 
             var counterSq =request2.responseText;
             var span2=document.getElementById("spSq");
             span2.innerHTML=counterSq;
            
        }
        
     };
    
    request2.open('GET',"/counterSquare",true);
    request2.send(null);
   };
   
   