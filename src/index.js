require("dotenv").config({path:"src/.env"});
const express=require("express");
const mongoose=require("mongoose");
const userRoutes=require("./routes/UserRoutes");
const cors=require("cors");
const app=express();
const PORT=process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use("/user",userRoutes);

mongoose
.connect(process.env.MONGOOSE_URI)
.then(()=>console.log("Connected to MongoDB"))
.catch((err)=>console.error("Could not connect to MongoDB",err));

app.get("/",(req,res)=>{
    res.send("Backend is running");
});


app.listen(PORT,()=>{
    console.log(`Listening to ${PORT}`)}); 