
import './App.css';
import { useState } from "react";
import Axios from "axios";


function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const[newwage,setNewWage] = useState(0);
  const [employeeList,setEmployeeList] = useState([]);

  const addEmployee = () =>{
        Axios.post('http://localhost:3001/create',{
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage
        }).then(()=>{
         // console.log('datafetched..')
          //console.log("name: "+name+"  age: "+age+"  country: "+country+"  position: "+position+"  wage: "+wage)
          setEmployeeList([...employeeList,{
            name: name,
            age: age,
            country: country,
            position: position,
            wage: wage
          }])
        });
  };

const getEmployees = () =>{
        Axios.get('http://localhost:3001/employees').then((response)=>{
             setEmployeeList(response.data);
        });
};

const updateEmployeeWage = (id) =>{
  Axios.put('http://localhost:3001/update',{wage:newwage,id:id}).then((response)=>{
        setEmployeeList(employeeList.map((val)=>{
          return val.id === id ? {id:val.id,name:val.name,age:val.age,country:val.country,position:val.position,wage:newwage} : val
        }))
  });
  /*alert('updated');*/console.log("updated")
};

const deleteEmployee = (id) =>{
  Axios.delete(`http://localhost:3001/delete/${id}`).then((respose)=>{
        setEmployeeList(employeeList.filter((val)=>{
          return val.id !== id 
        }))
  });
}
  // const displayInfo= ()=>{
  //   console.log(name+" "+age+" "+country+" "+position+" "+wage)
  // }

  return (
    
    <div className="App">
      
    <div className="information">
      <label>Name:</label>
      <input type="text" onChange={(event)=>{setName(event.target.value);}}/>
      <label>Age:</label>
      <input type="number" onChange={(event)=>{setAge(event.target.value);}}/>
      <label>Country:</label>
      <input type="text" onChange={(event)=>{setCountry(event.target.value);}}/>
      <label>position:</label>
      <input type="text" onChange={(event)=>{setPosition(event.target.value);}}/>
      <label>Wage(year):</label>
      <input type="number" onChange={(event)=>{setWage(event.target.value);}}/>
      <button onClick={addEmployee}>add employee</button>
    </div>
    <div className="employees">
        <button onClick={getEmployees}>Show employees</button>
        {employeeList.map((val,key)=>{
          return <div className="employee">
                  <h3>Name: {val.name}</h3>
                  <h3>Age: {val.age}</h3>
                  <h3>Country: {val.country}</h3>
                  <h3>Position: {val.position}</h3>
                  <h3>Wage: {val.wage}</h3>
                  <div>
                    <input type='number' placeholder="wage update" onChange={(event)=>{setNewWage(event.target.value);}}/>
                    <button onClick={()=>{updateEmployeeWage(val.id)}}>update</button>
                    <button className="deletebtn" onClick={()=>{deleteEmployee(val.id)}}>delete</button>
                  </div>
            </div>
        })}
    </div>
      
  </div>
  );
}

export default App;
