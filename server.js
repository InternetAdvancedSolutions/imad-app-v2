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


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/SINGH_ASHUTOSH.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'SINGH_ASHUTOSH.jpg'));
});

var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter.toString());
});

var articles={
    articleOne:{
        title:'All about javaScript | IAS',
        heading:'All about javaScript',
        content:`
        <p>
        This is a forum to learn javaScript by sharing our knowledge.<br>
        So, please feel free to ask any questions/doubts in javaScript.<br>
        And give answers to questions which you know.
        </p>`
    },
    
     articleTwo:{
        title:'All about HTML and CSSS | IAS',
        heading:'All about HTML and CSS',
        content:`
        <p>
        This is a forum to learn HTML & CSS by sharing our knowledge.<br>
        So, please feel free to ask any questions/doubts in HTML & CSS.<br>
        And give answers to questions which you know.
        </p>`
    },
    
     articleThree:{
        title:'All about SQL | IAS',
        heading:'All about SQL',
        content:`
        <p>
        This is a forum to learn SQL and Data Modellin by sharing our knowledge.<br>
        So, please feel free to ask any questions/doubts in SQL.<br>
        And give answers to questions which you know.
        </p>`
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
        <h3 class="center text-big bold">${heading}</h3></td></tr>
        </table> 
        <hr>
        <pre class="fontcolor1">
        <span class="fontcolor1" align="right" id="t"></span> |  <a class="hyperlinks" href="/articleOne">javaScript</a> |  <a class ="hyperlinks" href="/articleTwo">HTML and CSS</a> |  <a class ="hyperlinks" href="/articleThree">SQL</a>  |  <a class ="hyperlinks" href="/counter">Counter</a> <hr> 
        </pre>
       </div>
       
        <div id="main" class="center text-big bold">
        Hi! I am Ashutosh 
        </div id="content">
        ${content}
        <div>
        <br>
        <div id="feedback">
            <p id="p1">Post your Q & As :</p>
            <pre>
            <textarea id="comments" cols="50" rows="10" maxlength="500"></textarea><br>
            <button id="submit" >Post</button>
            <p id="p2"></p>
           </pre>
        </div>
       
        <script src="/ui/main.js"></script>
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
/*
app.get('/ui/article-one.html', function (req, res) {
 res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
 
});

app.get('/ui/article-two.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/ui/article-three.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});

*/
var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
