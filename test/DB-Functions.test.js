import assert from "assert"
import DBFunctions from "../db/DB-Functions.js"

import pgPromise from "pg-promise"
const pgp = pgPromise({})
const db = pgp("postresql://postgres:nimda@localhost:5432/registrations_test")

describe("Test my database query functions", () => {
    // clean the table before testing
    beforeEach(async () => {
        await db.none("DELETE FROM reg_numbers;")
    })

    it("should be to add new registration number", async () => {
        const dbFunction = DBFunctions(db)
        await dbFunction.add("CA 357-873")
        const rows = await dbFunction.getAll()
        assert.deepEqual([{reg_number: "CA 357-873", town_id: 1}], rows)
    })

    it("should be to get all town code", async () => {
        const dbFunction = DBFunctions(db)
        const towns = await dbFunction.getAllTowns()
        assert.deepEqual(["CA","CY","CJ","CK","CL"], towns)
    })

    it("should be able to filter by town code", async () => {
        const dbFunction = DBFunctions(db)

        // filter for paarl
        // no registration numbers added yet
        let filtered = await dbFunction.filterByCode("CJ")
        assert.deepEqual([], filtered)

        // add registration number
        await dbFunction.add("CA 357-873")
        await dbFunction.add("CK 357-873")
        await dbFunction.add("CK 444-873")

        // filter for cape town
        filtered = await dbFunction.filterByCode("CA")
        assert.deepEqual([{reg_number: "CA 357-873", town_id: 1}], filtered)

        // filter for malmesburry
        filtered = await dbFunction.filterByCode("CK")
        assert.deepEqual([{reg_number: "CK 357-873", town_id: 4},{reg_number: "CK 444-873", town_id: 4}], filtered)
    })
})