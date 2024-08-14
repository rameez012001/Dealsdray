const express = require('express')
const app = express();
const cors = require('cors')
const jwt = require('jsonwebtoken')
const {Admin,Employees} = require('./mongodb/mongose')
const { employeeValidationRules } = require('./middleware/formvalidation.js');
const { validationResult } = require('express-validator');

app.use(express.json())
app.use(cors())
 
app.post('/',(req,res)=>{
    res.send('hello')
})
app.post('/login', async (req, res) => {
    try {
      const user = await Admin.findOne({ f_userName: req.body.email });
      if (!user) {
        return res.status(401).json({ success: false, message: 'Email does not exist' });
      }
  
      const isPasswordValid = req.body.password === user.f_pwd;
      if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: 'Password is incorrect!' });
      }
  
      const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET || 'shhhh');
      return res.status(200).json({ success: true, redirect: '/dashboard', token });
      
    } catch (err) {
      console.error('Error during login:', err);
      res.status(503).json({ success: false, message: 'Server is under maintenance' });
    }
});

// Api for Adding Employee
app.post('/add_employee',employeeValidationRules(),async(req,res)=>{
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: 0, errors: errors.array() });
  }
    try{
        const product = {
            f_Image: req.body.employee_img,
            f_Name: req.body.employee_name,
            f_Email: req.body.employee_email,
            f_Mobile: req.body.employee_phone,
            f_Designation: req.body.employee_designation,
            f_gender:req.body.employee_gender,
            f_Course:req.body.employee_course,
        }
        await Employees.insertMany([product])
        res.status(201).json({ success: 1 });

    }
    catch(err){
        res.status(500).json({ success: 0, error: err.message });
    }
})

app.put('/edit_employee/:id', employeeValidationRules(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: 0, errors: errors.array() });
    }
    try{
        const employee = await Employees.updateOne({_id:req.params.userId},{$set:{        
            f_Image: req.body.employee_img,
            f_Name: req.body.employee_name,
            f_Email: req.body.employee_email,
            f_Mobile: req.body.employee_phone,
            f_Designation: req.body.employee_designation,
            f_gender:req.body.employee_gender,
            f_Course:req.body.employee_course,
        }})
        
        res.status(201).json({success:true,message:'Account Updated'})
    }
    catch(err){
        res.status(503).json({success:false,redirect:null,message:'Sorry for the inconvinience. The problem is in our end we will fix it shortly'})
    }
})

app.listen(3000,()=>{
    console.log('backend connected')
})