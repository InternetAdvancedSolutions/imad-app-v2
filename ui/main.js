console.log("main js loaded!");
  //for textarea  for home page
  var button=document.getElementById("submit");
            var textarea=document.getElementById("comments");
            var para=document.getElementById("p1");
            button.onclick=function(){
                para.innerHTML=textarea.value;};
                
   //for textarea  for articleOne page
  var button2=document.getElementById("submit1");
            var textarea2=document.getElementById("comments1");
            var para2=document.getElementById("p2");
            button2.onclick=function(){
                para2.innerHTML=textarea2.value;};
                
    //for textarea  for articleTwo page
  var button3=document.getElementById("submit2");
            var textarea3=document.getElementById("comments2");
            var para3=document.getElementById("p3");
            button3.onclick=function(){
                para3.innerHTML=textarea3.value;};  
                
    //for textarea  for articleThree page
  var button4=document.getElementById("submit3");
            var textarea4=document.getElementById("comments3");
            var para4=document.getElementById("p4");
            button4.onclick=function(){
                para4.innerHTML=textarea4.value;};
                
   // for Ajax data call of home page visit count       
 
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
   
   