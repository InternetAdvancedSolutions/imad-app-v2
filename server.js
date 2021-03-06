var express = require('express');
var morgan = require('morgan');
var path = require('path');
//var Pool= require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');
var session = require('express-session');
//var cookieParser = require('cookie-parser');

var fs = require("fs");
//var fileUpload = require('express-fileupload');
//var multer  = require('multer');


var app = express();
 
app.use(morgan('combined'));
app.use(bodyParser.json());
//app.use(cookieParser());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(multer({ dest: '/ui/'}));


app.use(session(
    {   resave:true,
        saveUninitialized:false,
        rolling:true,
        secret: 'someRandomSecretValue',
        cookie: { maxAge: 1000 * 60 * 15}//session expires automatically in 15 mins
         
    }  
));     


var Pool= require('pg').Pool;
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
  console.log("Cookies: ", req.cookies);
});


var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send("Total visits   "+counter.toString());
});

app.get('/counterSquare',function(req,res){
   // counter=counter+1;
    counter_sq= counter*counter;
    res.send("visitSquare   "+counter_sq.toString());
});

app.post('/file_upload', function (req, res) {
  
   var file = req.body.file;
   
   
   fs.readFile(file, function (err, data) {
      fs.writeFile(file, data, function (err) {
         if( err ){
            console.log( err );
            }else{
               response = {
                  message:'File uploaded successfully',
                  filename:file
               };
            }
         console.log( response );
         res.end( JSON.stringify( response ) );
      });
   });
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
   <a href="/aa/archive/58" class="fontcolor1">Hacking...</a><br>
    <a href="/aa/archive/36" class="fontcolor1">How to make a text blink in webpage</a><br>
     <a href="/aa/archive/23" class="fontcolor1">WAMP stack</a><br>
    <a href="/aa/archive/29" class="fontcolor1">How to program a microcontroller</a><br>
      <a href="/aa/archive/26" class="fontcolor1">Front-end development</a><br>
   <a href="/aa/archive/25" class="fontcolor1">google charts</a><br>
   <a href="/aa/archive/20" class="fontcolor1">Coding Tips</a><br>
   <a href="/aa/archive/19" class="fontcolor1">cyber means?</a><br>
   <a href="/aa/archive/18" class="fontcolor1">what is 404?</a><br>
   <a href="/aa/archive/21" class="fontcolor1">javaScript</a><br>
   <a href="/aa/archive/13" class="fontcolor1">what is html?</a><br>
   <a href="/aa/archive/14" class="fontcolor1">what is xml?</a><br>
   <a href="/aa/archive/15" class="fontcolor1">what is css?</a><br>
   <a href="/aa/archive/16" class="fontcolor1">java is language to program computers</a><br>
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
        <link rel="icon" href="/ui/SINGH_ASHUTOSH.jpg">
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
         <p id="user" class="fontcolor1">Dear ${username} Welcome to IAS forum !, please  post your article below</p>
        <p class="fontcolor1">Article Heading :<textarea id="topic" cols="100" rows="1" maxlength="100" autofocus required></textarea></p>
            <button id="submit" >Post</button>
            <p id="p1"></p>
            <table>
            <tr>
            <td colspan="3">     </td><td><textarea id="user_post" cols="75" rows="25" maxlength="1000" autofocus required></textarea><br>
            </td><td rowspan="2"><div id="h1" class="blink_me"> PUBLISHED ARTICLES<br>Go to these articles and ask questions/answer to questions/leave your remarks...<br></div><br><div id="content"></div><br></td>
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
              var topic1=document.getElementById("topic").value;
              var topic = topic1.trim();
              var user_post1=document.getElementById("user_post").value; 
              var user_post = user_post1.trim();
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
        <link rel="icon" href="/ui/SINGH_ASHUTOSH.jpg">
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
		<tr><td>Course & Duration :                 </td><td>
        ${content1}
		                                            </td></tr>
		<tr><td>Start Date :                        </td><td>
		${content2.toDateString()}
		                                            </td></tr>
	   <tr><td>Fees Rs :                            </td><td>
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

function createPost(data1,data2,data3,data4,data5){
    var title1='IAS Forum';
    var heading1=data3;
    var content1=data1;
    var poster=data2;
    var commenter = data4;
	var post_id = data5;
	
    var htmltemplatePost=`
    
<!doctype html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>${title1}</title>
        <link href="/ui/style.css" rel="stylesheet" />
        <link rel="icon" href="/ui/SINGH_ASHUTOSH.jpg">
        <!--<meta name="viewport" content="width=device-width, initial-scale=1">-->
    </head>
    <body>
    <div class="container" >   
        <div id="logo" class="center" >
        <table>
        <tr>
        <td>
        <img src="/ui/SINGH_ASHUTOSH.jpg" class="img-medium" align="center" ></td>
       
        <td><h2 id="h1" class="center text-big bold" align="center">Internet Advanced Solutions (IAS)</h2><h3 id ="h3" class ="center text-medium bold">Article: ${heading1}</h3></h6></td>
        </tr>
        </table> 
        <hr>
        <pre class="fontcolor1">
        | <a class ="hyperlinks" href="/">Home</a> | <a class ="hyperlinks" href="/db/6">IAS Code Library</a> | <a class="hyperlinks" href="/lo/logout" align="right">Logout</a><hr>
        </pre>
       </div>
       
        <div id="main" class="center text-big bold">
        Learning by Sharing
        </div>
         <h2>This article is contributed by <span id="blue">${poster}</apan></h2>
		<h4>
        ${content1}
		</h4>
        </div>
        <hr>
        <div id="comments"><br>
        
        <p>Dear ${commenter} add your comments/remarks/queries to this article here</p>
            
            <table>
            <tr>
            <td colspan="3">     </td>
            
            <td><textarea id="user_comments" cols="75" rows="10" maxlength="1000"></textarea></td>
            </tr>
            </table>
            
            <button id="submit" >Submit</button>
            <div id="n">
            <p id="c"></p> 
            <h3>Message Board</h3>
            <span id="d"></span>
            <hr>
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
        
        <script>
        var button=document.getElementById("submit");
        var para2=document.getElementById("c");
        
button.onclick=function(){

             
     var request = new XMLHttpRequest();
               
     request.onreadystatechange=function()
        {
                    if(request.readyState===XMLHttpRequest.DONE)
                    {
                        if(request.status===200)
                        {
                          var user_comment = document.getElementById("user_comments");
                         para2.innerHTML ='<span id="blue">'+ " ${commenter}"+'</span>'+'<br>' + user_comment.value; 
                        }
                        else
                        {
                          para2.innerHTML="Oops ! submission failed ";
                        }
                    }
        }
              var user_comment1 = document.getElementById("user_comments").value;
              var user_comment = user_comment1.trim();
              var commenter_name= "${commenter}"; 
              var post_id_ = ${post_id};
              console.log(user_comment);
              console.log(commenter_name);
              console.log(post_id_);
              request.open('POST','/com/submit-comments',true);
              request.setRequestHeader('Content-Type', 'application/json');
              request.send(JSON.stringify({user_comment:user_comment, commenter_name:commenter_name, post_id_:post_id_}));
              para2.innerHTML="submitting your comments.............thanks" +"  ${commenter}";
};
       
        window.onload= function()
    {    
      var request1= new XMLHttpRequest();
    
      request1.onreadystatechange=function()
      {
        if(request1.readyState==4 && request1.status==200 )
        { 
             var allarticles =JSON.parse(request1.responseText);
             var commentsList='<hr>';
             for(i=allarticles.length-1;i>=0;i--)
             {
                 commentsList += '<p id ="blue">'+ allarticles[i].user_name +'<br>'+ '<span id ="black">' + allarticles[i].user_comment+'</span>'+'</p>';
             }
             var para3=document.getElementById("d");
             para3.innerHTML=commentsList;
           // para3.innerHTML=allarticles;
            
        }
        
     };
     var post_id_ = ${post_id};
    request1.open('POST',"/co/get-comments",true);
    request1.setRequestHeader('Content-Type', 'application/json');
    request1.send(JSON.stringify({ post_id_:post_id_}));
    
   };
            
    </script>
    
        
    </body>
</html>
`;
return htmltemplatePost;
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
              console.log("username inputed ="  +username);
             var dbString = result.rows[0].password;
             console.log("stored hashed password ="  +dbString);
              //var salt = dbString.split('$')[2];
               var salt ='random';
              var hashedPassword = hash(password, salt); 
              console.log(" hashed password ="  +hashedPassword);
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

app.get('/:articleName',function(req,res){
    
        if (req.session && req.session.auth && req.session.auth.userId ) {
       // Load the user object
      
       pool.query('SELECT * FROM "article" WHERE id= $1', [req.params.articleName], function(err,result){
           if (err) {
              res.status(500).send(err.toString());
           } else {
                var username = req.session.auth.userId;
                console.log(" user in-session is  " + username);
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
    var match_id= req.params.ids;
     pool.query('SELECT * FROM "posts" WHERE id=$1',[match_id], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      }else{
     //  var ida = req.params.ids;
       //var art = result.rows[ida].user_post;
       //var art = JSON.stringify(result.rows[0].user_post);
       var art = result.rows[0].user_post;
       //var user= result.rows[ida].posters_name;
       var user= result.rows[0].posters_name;
       //var topic=result.rows[ida].topic;
       var topic=result.rows[0].topic;
       var commenter = req.session.auth.userId;
       //var post_id = result.rows[ida].id;
       var post_id = result.rows[0].id;
       res.send(createPost(art,user,topic,commenter,post_id));
       }
       });
}
else {
       res.status(400).send('You are not logged in....Please go to Login page and sign-in');
   }

});
var lout= `
<!doctype html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Thanks for Visiting</title>
        <link href="/ui/style.css" rel="stylesheet" />
        <link rel="icon" href="/ui/SINGH_ASHUTOSH.jpg">
        <!--<meta name="viewport" content="width-device-width, initial-scale-1">-->
    </head>
    <body>
    <div class="container" >   
        <div id="logo" class="center" >
        <table><tr><td>
        <img src="/ui/SINGH_ASHUTOSH.jpg" class="img-medium" align="center" ></td>
        <td><h2 id="h1" class="center text-big bold">Internet Advanced Solutions (IAS)</h2>
        <h3 id ="h3" class ="center text-medium bold"><pre>Logged out!  Thanks for visiting</pre></h3></td></tr>
        </table> 
        <hr>
        <pre class="fontcolor1">
        <a class ="hyperlinks" href="/">Back to Home</a>           <a class ="hyperlinks" href="/db/9" align="center">Login again</a><hr>
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
     </body>
</html>
`;
app.get('/lo/logout', function (req, res) {
    console.log(req.session.auth);
    console.log(req.session.auth.userId+ "  logged-out");
   delete req.session.auth;
   res.send(lout);
  
});

app.post('/com/submit-comments',function(req,res){
   var comment=req.body.user_comment;
   var commenter=req.body.commenter_name;
   var post_id= req.body.post_id_;
    console.log(comment);
    console.log(commenter);
    console.log(post_id);
   pool.query('INSERT INTO "comments" (user_comment,user_name,post_id) VALUES ($1,$2,$3)',[comment,commenter,post_id],function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send("posted");
      }
   });
});  

app.post('/co/get-comments', function (req, res) {
   // make a select request
   // return a response with the results
  // pool.query('SELECT * FROM comments', function (err, result) {
        var post_id= req.body.post_id_;
        //var post_id =25;
         console.log(post_id);
  pool.query("select * from comments where post_id = $1",[post_id], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
                    res.send(JSON.stringify(result.rows));
      }
   });
});

var port = 8080; 
app.listen(8080, function () {
  console.log(`IAS app listening on port ${port}!`);
});
