const Routes = (dbFunctions) => {
  const index = async (req, res) => {
    const regNumbers = await dbFunctions.getAll()
    console.log(regNumbers)
    res.render("index", {
      regNumbers
    })
  }

  const add = async (req, res) => {
    await dbFunctions.add(req.body.reg_number)
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

  return {
    index,
    add,
    filter,
    filtered
  }
}

export default Routes
