const express= require('express');
const path = require('path');
const fileupload = require('express-fileupload');
const { ppid } = require('process');
const { FILE } = require('dns');

let initial_path= path.join(__dirname, "/public/uploads");

const app= express();
app.use(express.static(initial_path));
app.use(fileupload());

app.get('/',(req, res)=>{
    res.sendFile(path.join(initial_path, 'home.html'));
})

  app.get('/editor', (req, res)=> {
    res.sendFile(path.join(initial_path, "editor.html"));
  })
  

//file upload
app.post('/upload'
, (req,res) => {
    let file = req.file.image;
    let date = new Date();
    //image name
    let imagename = date.getDate() + date.getTime() + file.name;
    //image upload path
    let path = 'public/uploads/' + imagename;

    //create uplpoad
    file.mv(path, (err,result) => {
        if(err)
        {
            throw err;
        }else{
            //our image upload path
            res.json(`uploads/${imagename}`)
        }
    })
})

app.listen("3000", ()=>{
    console.log('listening.....');
})