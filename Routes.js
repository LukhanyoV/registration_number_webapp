const Routes = (dbFunctions) => {
  const index = async (req, res) => {
    const regNumbers = await dbFunctions.getAll()
    res.render("index", {
      regNumbers
    })
  }

  const add = async (req, res) => {
    const reg = req.body.reg_number.toUpperCase()
    const code = reg.slice(0,2)
    const regex = /[A-Z]{2,3}\s[0-9]{3}(\-|\s)?[0-9]{3}/
    const validTowns = await dbFunctions.getAllTowns()
    if(regex.test(reg) && validTowns.includes(code)){
      await dbFunctions.add(reg)
      req.flash("success", "Registration number added")
    } else {
      if(reg.trim() === ""){
        req.flash("info", "Please enter registration number")
      } else if(regex.test(reg) === false){
        req.flash("error", "Invalid registration number entered")
      } else if(validTowns.includes(code) === false){
        req.flash("error", "Registration code not valid")
      } else {
        req.flash("error", "An error has occured")
      }
    }
    res.redirect("/")
  }

  const filter = async (req, res) => {
    const code = req.body.regcode
    if(code){
      res.redirect(`/filter/${code}`)
    } else {
      res.redirect("/")
    }
  }

  const filtered = async (req, res) => {
    const code = req.params.code
    const filteredNumbers = await dbFunctions.filterByCode(code)
    res.render("index", {
      regNumbers: filteredNumbers
    })
  }

  const deleteRegNumbers = async (req, res) => {
    await dbFunctions.deleteRegNumbers()
    req.flash("error", "Registration numbers deleted")
    res.redirect("/")
  }

  return {
    index,
    add,
    filter,
    filtered,
    deleteRegNumbers
  }
}

export default Routes
