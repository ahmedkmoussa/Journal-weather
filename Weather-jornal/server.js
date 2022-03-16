// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require ('express');
const cors = require ('cors');
// Start up an instance of app
const app = express();
// setup server 
const port = process.env.PORT || 8000; // to change port from terminal but wil have error in fetch data from user becouse link's post have port
function listening(){
    console.log(`hello from server on port ${port} `)
}
const server = app.listen(port,listening)

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended : false }));
app.use(express.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// routs 
app.post('/postuser' , (req , res) => {
    console.log("done recieve data from user ")
    projectData = req.body;
    res.send(projectData)
    console.log(projectData)
})

app.get("/fromserver" , (req , res)=>{
    console.log("done send data from server")
    res.send(projectData)
})




