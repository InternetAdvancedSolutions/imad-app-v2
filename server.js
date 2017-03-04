var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool= require('pg').Pool;
var crypto=require('crypto');
var bodyparser=require('body-parser');

var app = express();
app.use(morgan('combined'));
//app.use(bodyparser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


app.get('/ui/SINGH_ASHUTOSH.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'SINGH_ASHUTOSH.jpg'));
});

var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send("The total visits to this site so far is :"+counter.toString());
});
//defining our hash function
function hash(input,salt){
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return hashed.toString('hex');
}

//creating a password hashing end-point
app.get('/hash/:input', function(req,res){
    var hashedString=hash(req.params.input,'this ia a random string');
    res.send("This is a hash string :"+hashedString);
});

function createTemplate(data){
    var title=data.title;
    var heading=data.heading;
    var content=data.content;
    var htmltemplate=`
    <!doctype html>
<html>
    <head>
        <title>${title}</title>
        <link href="/ui/style.css" rel="stylesheet" />
        <meta name="viewport" content="width-device-width, initial-scale-1">
    </head>
    <body>
    <div class="container" >   
        <div id="logo" class="center" >
        <table><tr><td>
        <img src="ui/SINGH_ASHUTOSH.jpg" class="img-medium" aligh="center" ></td>
        <td><h2 id="h1" class="center text-big bold">Internet Advanced Solutions (IAS)</h2>
        <h3 id ="h3" class ="center text-big bold">${heading}</h3></td></tr>
        </table> 
        <hr>
        <pre class="fontcolor1">
        <span class="fontcolor1" align="right" id="t"></span> | <a class ="hyperlinks" href="/">Home</a> |  <a class="hyperlinks" href="/articleOne">javaScript</a> |  <a class ="hyperlinks" href="/articleTwo">HTML and CSS</a> |  <a class ="hyperlinks" href="/articleThree">SQL</a>   <hr> 
        </pre>
        </div>
       
        <div id="main" class="center text-big bold">
        Learning by Sharing
        </div>
        
        <div id="content">
             ${content}
        </div>
        
         <br>
            
        <div id="feedback">
            <p id="p">Ask Q & As  here :</p>
            <pre>
            <textarea id="comments" cols="100" rows="10" maxlength="500"></textarea><br>
            <button id="submit" >Post</button>
            <p id="p1"></p>
           </pre>
        </div>
       
    </div>
    <script>
    document.getElementById("t").innerHTML=Date();
    var button=document.getElementById("submit");
            var textarea=document.getElementById("comments");
            var para=document.getElementById("p1");
            button.onclick=function(){
                para.innerHTML="You posted :"+textarea.value;};
    </script>
    </body>
</html>
`;
return htmltemplate;
}

function createTemplate1(data1){
    var title1="Tutorials";
    var heading1=data1.subject;
    var content1=data1.duration;
	var content2=data1.start_date;
	var price=data1.fees;
	
    var htmltemplate1=`
    
<!doctype html>
<html>
    <head>
        <title>${title1}</title>
        <link href="/ui/style.css" rel="stylesheet" />
        <meta name="viewport" content="width-device-width, initial-scale-1">
    </head>
    <body>
    <div class="container" >   
        <div id="logo" class="center" >
        <table><tr><td>
        <img src="ui/SINGH_ASHUTOSH.jpg" class="img-medium" aligh="center" ></td>
        <td><h2 id="h1" class="center text-big bold">Internet Advanced Solutions (IAS)</h2>
        <h3 id ="h3" class ="center text-big bold">${heading1}</h3></td></tr>
        </table> 
        <hr>
        <pre class="fontcolor1">
        | <a class ="hyperlinks" href="/">Home</a> |  <a class="hyperlinks" href="/articleOne">javaScript</a> |  <a class ="hyperlinks" href="/articleTwo">HTML and CSS</a> |  <a class ="hyperlinks" href="/articleThree">SQL</a>  |  <a class ="hyperlinks" href="/counter">Counter</a> <hr> 
        </pre>
       </div>
       
        <div id="main" class="center text-big bold">
        Learning by Sharing
        </div>
        <div id="content">
		<table border="2">
		<tr><td>Course Duration :</td><td>
        ${content1}
		</td></tr>
		<tr><td>Start Date :</td><td>
		 ${content2.toDateString()}
		 </td></tr>
	   <tr><td>Fees Rs :</td><td>
		  ${price}
		  </td></tr>
		  </table>
        </div>
        <div id="feedback">
            <p id="p">Post your Q & As :</p>
            <pre>
            <textarea id="comments" cols="100" rows="10" maxlength="500"></textarea><br>
            <button id="submit" >Post</button>
            <p id="p1"></p>
           </pre>
        </div>
     </div>
	 <script>
	 document.getElementById("t").innerHTML=Date();
	 var button=document.getElementById("submit");
            var textarea=document.getElementById("comments");
            var para=document.getElementById("p1");
            button.onclick=function(){
                para.innerHTML="Your post :"+textarea.value;};
	 </script>
    </body>
</html>
`;
return htmltemplate1;
}


var config={
    user:'internetadvancedsolutions',
    database:'internetadvancedsolutions',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};
var pool= new Pool(config);

//function to create a new user
/*
app.post('create-user',function(req,res){
   var username=req.body.username;
   var password=req.body.password;
   var salt=crypto.getRandomBytes(128).toString('hex');
   var dbString=hash(password,salt);
   pool.query('INSERT INTO users(username,password)VALUES($1,$2)',[username,dbString],
   //callback function
   function(err,result){
       if(err){
           res.status.send(err.toString());
       }else
       {
           res.send('Hi'+username+'Your Registration is Sucessful ! Login to start forum');
       }
   });
});

*/

app.get('/:articleName',function(req,res){
    pool.query("SELECT * FROM article WHERE title= $1", [req.params.articleName], function(err,result){
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            
            if(result.rows.length===0)
            {  
                res.status(404).send('Article not found');
            }
            else
            {   
                var articleData=result.rows[0];
                res.send(createTemplate(articleData));
            }
            
        }
    });
});

  
  /*
app.get('/table', function(req,res){

    pool.query("SELECT * FROM course WHERE id=1",   function(err,result){
    

        if(err){
                 res.status(500).send(err.toString());
               }
               else
        {
            
            if(result.rows.length===0)
            {  
                res.status(404).send('Could not access database');
            }
            else
            {   
                var table=result.rows[0];
                res.send(createTemplate1(table));
            }
            
        }


});   
    
});
*/

var port = 8080; 
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
