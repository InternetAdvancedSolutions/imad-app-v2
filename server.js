var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool= require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');
var session = require('express-session');

var app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());

app.use(session(
    {   resave:true,
        saveUninitialized:false,
        rolling:true,
        secret: 'someRandomSecretValue',
        cookie: { maxAge: 1000 * 60 * 15}//session expires automatically in 15 mins
         
    }  
));         

var config={
    user:'internetadvancedsolutions',
    database:'internetadvancedsolutions',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};
var pool= new Pool(config);


app.get('/ui/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', req.params.fileName));
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send("Total visits   "+counter.toString());
});
//defining our hash function
function hash(input,salt){
     salt='random';
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
   // return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
   return(hashed.toString('hex'));
}


function createArticle(data,idd){
        //var article1=data.topic;
        //var ids =idd;
   // var htmlarticle=`<a href="/aa/archive/${ids}" class="fontcolor1">${article1}</a>`;
   var htmlarticle=`
   
    <a href="/aa/archive/13" class="fontcolor1">How to program a microcontroller</a><br>
   <a href="/aa/archive/0" class="fontcolor1">Will you build an app for me</a><br>
   <a href="/aa/archive/14" class="fontcolor1">Front-end development</a><br>
   <a href="/aa/archive/15" class="fontcolor1">google charts</a><br>
   <a href="/aa/archive/9" class="fontcolor1">Coding Tips</a><br>
   <a href="/aa/archive/7" class="fontcolor1">cyber means?</a><br>
   <a href="/aa/archive/6" class="fontcolor1">what is 404?</a><br>
   <a href="/aa/archive/8" class="fontcolor1">javaScript</a><br>
   <a href="/aa/archive/1" class="fontcolor1">what is html?</a><br>
   <a href="/aa/archive/2" class="fontcolor1">what is xml?</a><br>
   <a href="/aa/archive/3" class="fontcolor1">what is css?</a><br>
   <a href="/aa/archive/4" class="fontcolor1">java is language to program computers</a><br>
   `;
        return htmlarticle;
    }

function createTemplate(data1,data2){
    var title=data1.title;
    var heading=data1.heading;
    var username= data2;
   // var content=data.content;
     
    var htmltemplate=`
    <!doctype html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <link href="/ui/style.css" rel="stylesheet" />
        <!--<meta name="viewport" content="width-device-width, initial-scale-1">-->
    </head>
    <body>
    <div class="container" >   
        <div id="logo" class="center" >
        <table><tr><td>
        <img src="ui/SINGH_ASHUTOSH.jpg" class="img-medium" align="center" ></td>
        <td><h2 id="h1" class="center text-big bold">Internet Advanced Solutions (IAS)</h2>
        <h3 id ="h3" class ="center text-medium bold">${heading}</h3></td></tr>
        </table> 
        <hr>
        <pre class="fontcolor1">
        <a class ="hyperlinks" href="/">Home</a> | <span class="fontcolor1" align="right" id="t"></span> 
        </pre>
    </div>
       
    <div id="main" class="center text-big bold">
        Learning by Sharing
    </div>
    <p></p>
    <div id="main" class="center bold">
        Knowledge increases by giving...teaching is the best way of learning !
    </div>
    <hr>
    <a class="hyperlinks1" href="/lo/logout" align="right">Logout</a><br>
    <hr>
        <div id="feedback"><br>
         <p id="user" class="fontcolor1">Dear ${username} Welcome to IAS forum !, please create a topic and write your article below</p>
        <p class="fontcolor1">Create Topic :<textarea id="topic" cols="100" rows="1" maxlength="100"></textarea></p>
            <button id="submit" >Post</button>
            <p id="p1"></p>
            <table>
            <tr>
            <td colspan="3">     </td><td><textarea id="user_post" cols="75" rows="25" maxlength="1000"></textarea><br>
            </td><td rowspan="2"><div class="fontcolor1">Archived Posts</div><div id="content"></div><br></td>
            </tr>
            </table>
            </pre>
          </div>
       
    </div>
    <script>
    document.getElementById("t").innerHTML=Date();
    var button=document.getElementById("submit");
    var para=document.getElementById("p1");
            button.onclick=function()
            {
               var request = new XMLHttpRequest();
               
                request.onreadystatechange=function()
                {
                    if(request.readyState===XMLHttpRequest.DONE)
                    {
                        if(request.status===200)
                        {
                          para.innerHTML="Your article posted successfuly !... Will be publised soon... after approval ";
 
                        }
                        else
                        {
                          para.innerHTML="Oops ! submission failed ";
                        }
                    }
                }
              var topic=document.getElementById("topic").value;
              var user_post=document.getElementById("user_post").value;  
              var username_post= "${username}"; 
              console.log(topic);
              console.log(user_post);
              console.log(username_post);
              request.open('POST','/pa/post',true);
              request.setRequestHeader('Content-Type', 'application/json');
              //request.send(JSON.stringify({user_post:user_post, topic:topic}));
              request.send(JSON.stringify({user_post:user_post, topic:topic, username_post:username_post}));
              para.innerHTML="Posting.............";
            };
            
             window.onload= function()
    {    
      var request1= new XMLHttpRequest();
    
      request1.onreadystatechange=function()
      {
        if(request1.readyState==4 && request1.status==200 )
        { 
             var allarticles =request1.responseText;
             var div=document.getElementById("content");
             div.innerHTML=allarticles+'<br>';
            
        }
        
     };
    
    request1.open('GET',"/ga/publish",true);
    request1.send(null);
   };
   
            
    </script>
    </body>
</html>
`;
return htmltemplate;
}


function createTemplate1(data1){
    var title1=data1.title;
    var heading1=data1.subject;
    var content1=data1.duration;
	var content2=data1.start_date;
	var content3=data1.content;
	var price=data1.fees;
	
    var htmltemplate1=`
    
<!doctype html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>${title1}</title>
        <link href="/ui/style.css" rel="stylesheet" />
        <!--<meta name="viewport" content="width=device-width, initial-scale=1">-->
    </head>
    <body>
    <div class="container" >   
        <div id="logo" class="center" >
        <table>
        <tr>
        <td>
        <img src="/ui/SINGH_ASHUTOSH.jpg" class="img-medium" align="center" ></td>
       
        <td><h2 id="h1" class="center text-big bold" align="center">Internet Advanced Solutions (IAS)</h2><h3 id ="h3" class ="center text-medium bold"> ${heading1}</h3></td>
        </tr>
        </table> 
        <hr>
        <pre class="fontcolor1">
        | <a class ="hyperlinks" href="/">Home</a> | <a class ="hyperlinks" href="/db/6">IAS Code Library</a><hr>
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
        <div>
        <hr>
        ${content3}
        <hr>
        </div>
           <a class ="hyperlinks1" href="/">Home</a><hr>
        <div id="feedback" class="fontcolor1">
            <pre class="text-table">
            <table   colspan="4">
                <tr><td>My IT skills</td></tr>
                <tr><th>Languages            </th><th>Frameworks      </th><th>Front-end              </th><th>Back-end             </th></tr>
                 <tr><td>C/C++</td><td>Android Studio</td><td>HTML</td><td>Node.js</td></tr>
                  <tr><td>Swift</td><td>Xcode 8</td><td>CSS</td><td>Express.js</td></tr>
                   <tr><td>java</td><td>Eclipse IDE</td><td>javaScript</td><td>PHP</td></tr>
                   <tr><td>Python</td><td>Linux</td><td>Angular JS</td><td>SQL</td></tr>
                   <tr><td>Sketch</td><td>Arduino IDE</td><td>Bootstrap</td><td>JSP</td></tr>
                   <tr><td>Embedded C</td><td>XAMPP</td><td>Ajax</td><td>Servlets</td></tr>
            </table>
           </pre>
        </div>
    </body>
</html>
`;
return htmltemplate1;
}


//function to create a new user

app.post('/rg/create-user',function(req,res){
   var usern1=req.body.username;
   var usern= usern1.trim();
    console.log(usern);
   var passw=req.body.password;
   console.log(passw); 
   var salt=crypto.randomBytes(128).toString('hex');
   var dbString=hash(passw,salt);
   console.log(dbString);
 pool.query('INSERT INTO "users" (username, password) VALUES ($1, $2)',[usern,dbString] ,function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send('User successfully created: ' + usern);
      }
   });
});  

app.post('/lg/login', function (req, res) {
   var username = req.body.username;
   var password = req.body.password;
   
   console.log(username);
   console.log(password);
   pool.query('SELECT * FROM "users" WHERE username = $1', [username], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          if (result.rows.length === 0) {
              res.status(403).send('username/password is invalid');
          } else {
              // Match the password
              console.log("username inputed ="+username);
             var dbString = result.rows[0].password;
             console.log("stored hashed password ="+dbString);
              //var salt = dbString.split('$')[2];
               var salt ='random';
              var hashedPassword = hash(password, salt); 
              console.log(" hashed password ="+hashedPassword);
              if (hashedPassword === dbString) {
                
                // Set the session
               //req.session.auth = {userId: result.rows[0].id};
                req.session.auth = {userId: result.rows[0].username};
                // set cookie with a session id
                // internally, on the server side, it maps the session id to an //object
                 //{ auth: {userId }}
                
               res.send('credentials correct!');
                
              }
             else {
                res.status(403).send('username/password is invalid');
              }
          }
      }
   });
});


app.get('/lo/logout', function (req, res) {
   delete req.session.auth;
   res.send('<html><body>Logged out!<br/><br/><a href="/">Back to home</a></body></html>');
});


app.get('/:articleName',function(req,res){
    
        if (req.session && req.session.auth && req.session.auth.userId ) {
       // Load the user object
      
       pool.query('SELECT * FROM "article" WHERE id= $1', [req.params.articleName], function(err,result){
           if (err) {
              res.status(500).send(err.toString());
           } else {
                var username = req.session.auth.userId;
                console.log("session in username is" + username);
                var articleData=result.rows[0];
               // res.send(createTemplate(articleData));
                res.send(createTemplate(articleData,username));
             // res.send(result.rows[0].username);    
           }
       });
   } else {
       res.status(400).send('You are not logged in....Please go to Login page and sign-in');
   }
});

    
   
app.get('/db/:n', function(req,res){pool.query("SELECT * FROM course WHERE id=$1", [req.params.n],  function(err,result)
 {
    if(err)
    {
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
                var ta=result.rows[0];
                res.send(createTemplate1(ta));
               }
            
    }


});   
    
});


app.post('/pa/post',function(req,res){
   var text=req.body.user_post;
   var topic=req.body.topic;
   var posters_name= req.body.username_post;
    console.log(text);
    console.log(topic);
    console.log(posters_name);
   pool.query('INSERT INTO "posts" (user_post,topic,posters_name) VALUES ($1,$2,$3)',[text,topic,posters_name],function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send("posted");
      }
   });
});  

app.get('/ga/publish', function(req,res){
    
    
           pool.query('SELECT topic FROM "posts" ', function (err, result)
           {
                if (err) {
                           res.status(500).send(err.toString());
                }
                else
                {
                   // console.log(result.rows.length);
                  var ar = result.rows[1];
                    var n =1;
                     res.send(createArticle(ar,n)); 
          
                  /* 
                 for(var i=result.rows.length; i>=0;i--)
                  {   
                  var ar = result.rows[i];
                    var id = i;
                   res.send(createArticle(ar,id)); 
                    }
                     */
                 }
});
});

app.get('/aa/archive/:ids', function(req,res){
  if (req.session && req.session.auth && req.session.auth.userId ) 
{   
    
     pool.query('SELECT * FROM "posts" ', function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      }else{
       var ida = req.params.ids;
       var art = result.rows[ida].user_post;
       var user= result.rows[ida].posters_name;
       var topic=result.rows[ida].topic;
       res.send('<html>'+'<body>'+'<div bgcolor="#123456">'+ '<h1 fontcolor="white">'+"IAS Open Forum"+'</h1>'+'</div>'+ '<h2>' +topic+'</h2>' + '<h3>'+"This article was posted by  " +user+'</h3>'+'<h4>'+art+'</h4>'+'</body>'+ '</html>');   
      }
       });
}
else {
       res.status(400).send('You are not logged in....Please go to Login page and sign-in');
   }

});

var port = 8080; 
app.listen(8080, function () {
  console.log(`IAS app listening on port ${port}!`);
});
