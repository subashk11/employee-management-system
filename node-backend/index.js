import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

const hostName = "localhost"
const port = 5000


//Creating a DB connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "ems",
});

db.connect((error)=>{
    if(error){
        console.log("Error while creating a DB Connection");
    }else{
        console.log("DB connection is successful");
    }
})


//This is used to get remove the cross-origin error in axios - cors origin resource sharing error
app.use(cors({
 origin: ["http://localhost:3000"],
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));

//use this to get the response as json from the client.
app.use(express.json());

//api for users to get the users details.
app.get("/users",(req,res)=>{
    res.status(200);

    const query = "SELECT * FROM users";

    db.query(query, (error, result) => {
        console.log(result);
        res.send(result);
      });
})

//editpage get existing data on particular id
app.get("/users/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM users WHERE userId=?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }

    res.send(result);
    //console.log(result);
  });
});

//api to post the users data into the table.
app.post("/users/createUser", (req, res) => {
    res.status(200);
    const {firstName, lastName, emailId, dateOfBirth, designation, companyId } =
    req.body;
    const insertquery =
      "INSERT INTO `ems`.`users` (`firstName`, `lastName`, `emailId`, `dateOfBirth`, `designation`, `companyId`) VALUES (?, ?, ?, ?, ?, ?)";
    //console.log(req.body);
  
    db.query(
      insertquery,
      [ firstName, lastName, emailId, dateOfBirth, designation, companyId],
      (error, result) => {
        if(error){
          console.log(error);
          return;
        }
        console.log(result);
        res.send("<h1>Account has been created!</h1>");
      }
    );
  });
  
  //api to update the existing user details
  app.put('/users/updateProfile/:id',(req,res) => {
    const { firstName, lastName, emailId, dateOfBirth, designation, companyId } = req.body;
    const {id} = req.params;
      const query = "UPDATE users SET `firstName` = ?, `lastName` = ?, `emailId` = ?, `dateOfBirth` = ?, `designation` = ?, `companyId` = ? WHERE (`userId` = ?);";

      console.log(id);

      res.setHeader('Content-Type', 'text/html');
      res.status(200);

      db.query(query, [firstName, lastName, emailId, dateOfBirth, designation, companyId, id], (err, result) => {
        if (err) {
          console.error(err);
          res.send('<h1>There was an issue in updating the profile</h1>');
          return;
        }
        console.log(result);
        res.send(`<h1>Profile was updated successfully for user with id ${id}</h1>`);
      });
  })

  //api for deleting a particular user.
  app.delete("/users/deleteUser/:id", (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200);
    
    const {id} = req.params;
    const query = "DELETE FROM users WHERE `userId` = ?;";
    
    console.log(id);
    db.query(query,id,(error,response) => {
      if(error){
        //console.log(`Error in deleting the user : ${id}`);
        res.send(`<h1> Error while deleting the user with id ${id}</h1>`);
        return;
      }
      //console.log(response);
        res.send(`<h1>Profile was deleted successfully for user with id ${id}</h1>`);
    })
  });



  //API for setting the active status to false
  app.put('/companies/inActivateUser/:id',(req,res) => {
    const {id} = req.params;

    const query = "UPDATE users SET `Active` = 'False' WHERE (`userId` = ?); ";

    db.query(query,id,(error,response) => {
      if(error){
        console.log("error while changing the user status");
      }
      res.send(`Deactivated the user ${id}`);

    })
  })

  //API for setting the active status to true
  app.put('/companies/activateUser/:id',(req,res) => {
    const {id} = req.params;

    const query = "UPDATE users SET `Active` = 'True' WHERE (`userId` = ?); ";

    db.query(query,id,(error,response) => {
      if(error){
        console.log("error while changing the user status");
      }
      res.send(`activated the user ${id}`);

    })
  })

  //getting all users from a particular company
  app.get('/companies/getUsers/:id',(req,res) => {
    res.status(200);

    const query = "select * from ems.users where companyId=?;";
    const {id} = req.params;

    db.query(query,id,(error,response) => {
      if(error){
        res.send('<h1>Error in fetching the user details</h1>');
        return;
      }
      res.send(response);
      console.log(response);
    })
  })


  //Api for getting the all company details.
  app.get('/companies',(req,res) =>{
    res.setHeader('Content-Type', 'text/html');
    res.status(200);

    const query = "SELECT * FROM companies;";

    db.query(query,(error,response)=>{
      res.send(response);
      console.log('response is ',response);
      return;
    })
  });

  //Api to get a particular company details
  app.get('/companies/get/:id',(req,res) =>{
    res.setHeader('Content-Type', 'text/html');
    res.status(200);

    const {id} = req.params;

    const query = "SELECT * FROM companies where companyId=?;";

    db.query(query,id,(error,response)=>{
      res.send(response);
      console.log('response is ',response);
      return;
    })
  });

  //api to get all users which is not from the given company
  app.get('/companies/getAllUsers/:id',(req,res) =>{
    res.setHeader('Content-Type', 'text/html');
    res.status(200);

    const {id} = req.params;

    const query = "select * from ems.users where companyId != ?;";

    db.query(query,id,(error,response)=>{
      res.send(response);
      console.log('response is ',response);
      return;
    })
  });

  //add user to a company
  app.put('/companies/addUser',(req,res) => {

    const {id, tempId} = req.body;

    const query = "UPDATE users SET `companyId` = ? WHERE `userId` = ?;";

    db.query(query,[id,tempId],(error,response) => {
      if(error){
        console.log(error);
        res.send('Error while adding the users');
        return;
      }
      res.send(response);
    })
  });

  //remove a user from a company
  app.put('/companies/removeUser',(req,res) => {

    const {id} = req.body;

    const query = "UPDATE users SET `companyId` = '0' WHERE `userId` = ?;";

    db.query(query,id,(error,response) => {
      if(error){
        console.log(error);
        res.send('Error while removing the users');
        return;
      }
      res.send('successfully removed');
    })
  });

  //Create new Company
  app.post('/companies/createCompany',(req,res)=>{
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    const {companyName, address, latitude, longitude} =
    req.body;

    const query = "INSERT INTO companies (`companyName`, `address`, `latitude`, `longitude`) VALUES (?,?,?,?);";

    db.query(query,[companyName, address, latitude, longitude],(error,response) =>{
      if(error){
        console.log("error is : ",error);
        return;
      }
      console.log(response);
      res.send('<h1>Created Successfully!</h1>');
    })
  });

  //Edit and save the details of a company
  app.put("/companies/editCompany/:id",(req,res)=>{
    res.status(200);

    const {id}= req.params;

    const {companyName, address, latitude, longitude} = req.body;

    const query = "UPDATE companies SET `companyName` = ?, `address` = ?, `latitude` = ?, `longitude` = ? WHERE (`companyId` = ?); ";

    db.query(query,[companyName, address, latitude, longitude, id],(error,response) =>{
      if(error){
        res.send('<h1>Error occured while updating</h1>')
      }
      console.log(response);
      res.send('<h1>Successfully Updated</h1>');
    })
  })

  //Delete a particular user
  app.delete('/companies/deleteCompany/:id',(req,res)=>{
    res.status(200);
    const {id} = req.params;

    const query = "DELETE FROM companies WHERE (`companyId` = ?); ";

    db.query(query,id,(error,response)=>{
      if(error){
        res.send('<h1>Error i</h1>')
      }
      console.log(response);
      res.send('<h1>Account Deleted successfully</h1>');
    })
  })

app.listen(port,hostName,()=>{
    console.log(`The server is started in http://${hostName}:${port}`)
})
