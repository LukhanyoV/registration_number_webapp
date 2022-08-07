const DBFunctions = (db) => {
    const add = async (reg) => {
        let town_id = await db.oneOrNone("SELECT id FROM towns WHERE town_code = $1", [reg.slice(0,2)])
        if(town_id === null) return
        await db.none("INSERT INTO reg_numbers (reg_number, town_id) VALUES($1, $2)", [reg, town_id.id])
    }
    const getAll = async () => {
        const results = await db.any("SELECT * FROM reg_numbers;")
        return results
    }
    const filterByCode = async (code) => {
        let town_id = await db.one("SELECT id FROM towns WHERE town_code = $1", [code])
        let results = await db.any("SELECT * FROM reg_numbers WHERE town_id = $1", [town_id.id])
        return results
    }
    return {
        add,
        getAll,
        filterByCode
    }
}

export default DBFunctions