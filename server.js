var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


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
    res.send(counter.toString());
});

var articles= {
    articleOne:{
        title:'All about javaScript | IAS',
        heading:'All about javaScript',
        
        content:`
        <p>
        At this forum you can learn javaScript by sharing our knowledge.
        So, please feel free to ask any questions/doubts in javaScript.<br>
        And give answers to questions  so that others can benefit.
        <hr>
        </p>`
    },
    
     articleTwo:{
        title:'All about HTML and CSSS | IAS',
        heading:'All about HTML and CSS',
        
        content:`
        <p>
        At this forum you can learn HTML & CSS by sharing our knowledge. 
        So, please feel free to ask any questions/doubts in HTML & CSS.<br>
        And give answers to questions  so that others can benefit.
        <hr>
        </p>`
    },
    
     articleThree:{
        title:'All about SQL | IAS',
        heading:'All about SQL',
        
        content:`
        <p>
        At this forum you can learn SQL and Data Modeling by sharing your knowledge. 
        So, please feel free to ask any questions/doubts regarding SQL.<br>
        And give answers to questions  so that others can benefit.
        </p>
        <hr>
        `
    }
};

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
         <a class ="hyperlinks" href="/">Home</a> |  <a class="hyperlinks" href="/articleOne">javaScript</a> |  <a class ="hyperlinks" href="/articleTwo">HTML and CSS</a> |  <a class ="hyperlinks" href="/articleThree">SQL</a>  |  <a class ="hyperlinks" href="/counter">Counter</a> <hr> 
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
            <p id="p">Feel free to drop your thoughts :</p>
            <pre>
            <textarea id="" cols="100" rows="10" maxlength="500"></textarea><br>
            <button id="" >Post</button>
            <p id=""></p>
           </pre>
        </div>
       
        
      
        
    </div>
    </body>
</html>
`;
return htmltemplate;
}

app.get('/:articleName',function(req,res){
    var articleName=req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

var port = 8080; 
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
