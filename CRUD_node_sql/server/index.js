const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

app.use(cors())
app.use(express.json())


const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'Student@123',
    database:'employeesystem'
});

db.connect((err)=>{
    if(!err){
        console.log('Connected...');
    }
    else{
        console.log('Connected Failed');
    }
    
})

app.post('/create',(req,res)=>{
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage; 

    db.query('INSERT INTO EMPLOYEES (name,age,country,position,wage) VALUES (?,?,?,?,?)',[name,age,country,position,wage],
    (err,result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send('values inserted');
        }
    });

});

app.get('/employees',(req,res)=>{
    db.query('SELECT * FROM EMPLOYEES',(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});


app.put('/update',(req,res)=>{
        const id = req.body.id;
        const wage = req.body.wage;
        db.query("UPDATE EMPLOYEES SET  WAGE = ? WHERE ID = ?",[wage,id],(err,result)=>{
            if(err)
            {
                console.log(err);
            }
            else
            {
                res.send(result);
            }
        });
});

app.delete('/delete/:id',(req,res)=>{
    const id = req.params.id;
    db.query('DELETE FROM EMPLOYEES WHERE ID = ?', id,(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.send(result);
        }
    });
});


app.listen('3001',()=>{
    console.log('server running')
});