import express from "express"
import exphbs from "express-handlebars"
import bodyParser from "body-parser"
import flash from "express-flash"
import session from "express-session"
import Routes from "./Routes.js"
import DBFunctions from "./db/DB-Functions.js"
import db from "./db/db.js"
const app = express()

const dbFunctions = DBFunctions(db)

// use handlebars as layout engine
app.engine("handlebars", exphbs.engine({defaultLayout: "main"}))
app.set("view engine", "handlebars")

// setup the middleware
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// setup session for flash messages
app.use(session({
    secret: "nimdasecure",
    resave: false,
    saveUninitialized: true
}))
app.use(flash())

// my routes
const routes = Routes(dbFunctions)
app.get("/", routes.index)
app.get("/filter/:code", routes.filtered)
app.post("/reg_numbers", routes.add)
app.post("/filter", routes.filter)
app.post("/delete", routes.deleteRegNumbers)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})
