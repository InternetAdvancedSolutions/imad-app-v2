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
        <h3 class="center text-big bold">${heading}</h3></td><td><h4 id="h2"><span id="sp"></span> </h4></td></tr>
        </table> 
        <hr>
        <pre class="fontcolor1">
        <span class="fontcolor1" align="right" id="t"></span> |  <a class="hyperlinks" href="/ui/article-one.html">Webpps</a> |  <a class ="hyperlinks" href="ui/article-two.html">Database MS</a> |  <a class ="hyperlinks" href="ui/article-three.html">Single Page Apps</a>  |  <a class ="hyperlinks" href="/counter">Counter</a> <hr> 
        </pre>
       </div>
       
        <div id="main" class="center text-big bold">
        Hi! I am Ashutosh 
        </div>
        
        <h4 id="h" class="center">Internet Consultant and App Developer</h4>
        <div id="sub" class="left">
        I help startups develop and maintain Webapps, SPAs (single page apps), Websites and Database Management Systems.
             
            My fields of expertize are:
            <ol type="i">
            <li>C, Embedded C and C++</li>
            <li>Java (J2EE)</li>
            <li>HTML and CSS</li>
            <li>PHP, javaScript and Node JS</li>
            <li>SQL and Data modelling</li>
            <li>Android Programming</li>
            </ol>
            </div>
            <div id="d" class="center">
            
              A certified programmer from IIT kharagpur and B.Tech from Kanpur.
            
            </div>
            <br>
            
        <div id="feedback">
            <p id="p1">Share your views with me :</p>
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
app.get('/ui/article-one.html', function (req, res) {
 res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
 
});

app.get('/ui/article-two.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/ui/article-three.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
