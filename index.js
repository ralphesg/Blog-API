//Routes Middleware
const blogRoutes = require("./routes/blog");
const userRoutes = require("./routes/user");

const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use("/blogs", blogRoutes);
app.use("/users", userRoutes);

mongoose.connect(process.env.MONGODB_STRING) 

mongoose.connection.once('open', () => console.log("Now connected to MongoDB Atlas"))

if(require.main === module){
	app.listen(process.env.PORT || 4000, () => {
	    console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
	});
}

module.exports = {app,mongoose};