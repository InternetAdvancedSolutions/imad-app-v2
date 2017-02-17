  //for date and time
 // function time(){document.getElementById("t").innerHTML=Date();}
           // window.onload=time;
  //for textarea  for home page
  var button=document.getElementById("submit");
            var textarea=document.getElementById("comments");
            var para=document.getElementById("p2");
            button.onclick=function(){
                para.innerHTML=textarea.value;};
                
   //for textarea  for articleOne page
  var button2=document.getElementById("submit1");
            var textarea=document.getElementById("comments1");
            var para=document.getElementById("p2");
            button2.onclick=function(){
                para.innerHTML=textarea.value;};
                
    //for textarea  for articleTwo page
  var button3=document.getElementById("submit2");
            var textarea=document.getElementById("comments2");
            var para=document.getElementById("p3");
            button3.onclick=function(){
                para.innerHTML=textarea.value;};  
                
    //for textarea  for articleThree page
  var button4=document.getElementById("submit3");
            var textarea=document.getElementById("comments3");
            var para=document.getElementById("p4");
            button4.onclick=function(){
                para.innerHTML=textarea.value;};
                
   // for Ajax data call of home page visit count       
   var button1=document.getElementById("homeB");

   // button1.onclick=function()
   window.onload= function()
    {document.getElementById("t").innerHTML=Date();
      var request= new XMLHttpRequest();
    
      request.onreadystatechange=function()
      {
        if(request.readyState==4 && request.status==200 )
        { 
             var counter =request.responseText;
             var span=document.getElementById("sp");
             span.innerHTML=" visitor count: "+counter;
            
        }
        
     };
    
    request.open('GET',"/counter",true);
    request.send(null);
   };
   
   