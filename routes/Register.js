const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(__dirname + "/src"));
app.use(bodyParser.urlencoded({extended:false}));

app.get('/Register', (req, res) => {
    res.sendFile("src/RegisterPage.html", {root: __dirname});
})

app.post('/Register', (req, res) => {
    console.log(req.body);
    res.redirect("/");
    //res.sendFile("src/RegisterPage.html", {root: __dirname});

})


app.listen(3000);
