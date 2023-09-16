const mongoose = require('mongoose');
const dotenv = require('dotenv');
process.on("uncaughtException", (err) => {
    console.log(err.name, err.message);
    console.log("Shutting down....");
    process.exit(1);
});

const app = require("./app");
dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 3001;

//Connect With MongoDB

// const db_url = process.env.DATABASE_URL.replace(
//     "<password>",
//     process.env.DATABASE_PASSWORD
// );
mongoose.connect("mongodb+srv://db_job-star:Neq1T4cHZO2dI9NM@cluster0.z3gkucs.mongodb.net/job-star?retryWrites=true&w=majority").then((con) => {
    console.log("DB CONNECTED!!");
});

// *************************************
const server = app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

process.on("unhandledRejection", (err) => {
    console.log(err.name, err.message);
    console.log("Shutting down....");
    server.close(() => {
        process.exit(1);
    });
});