const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://rameez012001:HtCXpIrINAyD7DHe@cluster0.9scwn.mongodb.net/<databaseName>', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>console.log('db connected'))
.catch((err)=>console.log('cant connect'))
const loginSchema = mongoose.Schema({
    f_no:{
        type: 'String',
        required: true
    },
    f_userName:{
        type:'String',
        required:true
    },
    f_pwd:{
        type:'String',
        required: true,
    }
})

const employeesSchema = mongoose.Schema({
    f_Id:{
        type:'String',
        unique: true,
    },
    f_Image:{
        type:'String',
        required: true,
    },
    f_Name:{
        type:'String',
        required: true,
    },
    f_Email:{
        type:'String',
        required: true,
    },
    f_Mobile:{
        type:'String',
        required: true,
    },
    f_Designation:{
        type:'String',
        required: true,
    },
    f_gender:{
        type:'String',
        required: true,
    },
    f_Course:{
        type:'String',
        required: true,
    },
    f_Createdate:{
        type:'String',
        default: Date.now
    },
})

// employeesSchema.pre('save', async function (next) {
//     if (!this.f_Id) {
//       const lastEmployee = await Employees.findOne().sort({ f_Id: -1 });
//       const lastId = lastEmployee ? parseInt(lastEmployee.f_Id, 10) : 0;
//       const newId = String(lastId + 1).padStart(3, '0');
//       this.f_Id = newId;
//     }
//     next();
//   });

const Admin = mongoose.model('t_login',loginSchema)
const Employees = mongoose.model('t_Employee',employeesSchema)
module.exports =  {Admin,Employees}