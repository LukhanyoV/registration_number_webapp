const DBFunctions = (db) => {
    const add = async (reg) => {
        let town_id = await db.query("SELECT id FROM towns WHERE town_code = $1", [reg.slice(0,2)])
        town_id = town_id[0].id
        await db.query("INSERT INTO reg_numbers (reg_number, town_id) VALUES($1, $2)", [reg, town_id])
    }
    const getAll = async () => {
        const results = await db.query("SELECT * FROM reg_numbers;")
        return results
    }
    const filterByCode = async (code) => {
        let town_id = await db.query("SELECT id FROM towns WHERE town_code = $1", [code])
        town_id = town_id[0].id
        let results = await db.query("SELECT * FROM reg_numbers WHERE town_id = $1", [town_id])
        return results
    }
    return {
        add,
        getAll,
        filterByCode
    }
}

export default DBFunctions