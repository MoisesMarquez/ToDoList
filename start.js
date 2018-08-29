const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');


const app = express();
function task(id,description,done){

	this.id = id;
	this.description = description;
	this.done = done;
};
const tasks = [];
tasks.push(new task(0,'Primera Tarea',1));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function(req, res) {
 
  	res.render("index",{val1:19});
});

app.get('/tasks',function(req, res){

	res.send(tasks);
});

app.post('/tasks', function(req, res) {
	console.log('Agrego la tarea: '+req.body.task+' con el id: '+tasks.length);
    tasks.push(new task(tasks.length,req.body.task,0));
    res.status(201).end();
});

app.delete('/tasks/:id',function(req, res) {
	console.log('me piden borrar la tarea con el id: '+req.params.id);
	aux = req.params.id;
	delete tasks[aux];
	res.status(200).end();
});

app.put('/tasks/:id',function (req, res) {
	
	for(var i = 0;i<tasks.length;i++){

		if(tasks[i] != null){
			if(tasks[i].id == req.params.id){
				tasks[i].done = 1;
				break;
			}
		}
		
	}
	res.status(200).end();
});


app.listen(8082, function() {
  console.log('listening on port 8082!');
});