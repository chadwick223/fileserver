/**
 You need to create an express HTTP server in Node.js which will handle the logic of a file server.
- Use built in Node.js `fs` module
The expected API endpoints are defined below,
1. GET /files - Returns a list of files present in `./files/` directory
Response: 200 OK with an array of file names in JSON format.
Example: GET http://localhost:3000/files
2. GET /file/:filename - Returns content of given file by name
    Description: Use the filename from the request path parameter to read the file from `./files/` directory
    Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
    Example: GET http://localhost:3000/file/example.txt
- For any other route not defined in the server return 404
Testing the server - run `npm run test-fileServer` command in terminal
*/
const { error } = require('console');
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.get('/file',function(req,res){
  //read the directory of the file and print
  fs.readdir(path.join(__dirname,'./file'), function(err,file){
    if (error) {
      console.error('error in reading directory',err);
      return res.status(500).json('internal server error');
      
    }
    else{
      res.json(file);
    }
  })
})
app.get('/file/:filename',function(req,res){
  //reading content in that specific file
  const filepath=(path.join(__dirname,'./file',req.params.filename))
  fs.readFile(filepath,'utf-8',function(err,data){
    if (err) {
      return res.status(400).json('file not found');
    }
    else{
      res.json(data);
    }
  })
})
app.listen(3004);

module.exports = app;