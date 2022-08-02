-- [1][1] Create a table for storing towns 
-- [1][2] and another table for storing Registration numbers. 
-- [1][3] The Registration number table should have a foreign key to the towns table. 

-- [2][1] The towns table should have a town name
-- [2][2] should control which registration numbers are valid for each town. 

-- [3]    Pre-populate(hardcode) the towns table data with a script, don't create screens for it.


-- [1][1]
-- [2][1]
-- [2][2]
CREATE TABLE IF NOT EXISTS towns (
    id SERIAL PRIMARY KEY NOT NULL,
    town_name VARCHAR(30) NOT NULL,
    town_code VARCHAR(3) NOT NULL
);

-- [3]
INSERT INTO towns (town_name, town_code) VALUES ('Cape Town', 'CA'), ('Bellville', 'CY'), ('Paarl', 'CJ'), ('Malmesburry', 'CK'), ('Stellenbosch', 'CL');

-- [1][2]
-- [1][3]
CREATE TABLE IF NOT EXISTS reg_numbers (
    id SERIAL PRIMARY KEY NOT NULL,
    reg_number VARCHAR(30) NOT NULL,
    town_id INT NOT NULL,
    FOREIGN KEY (town_id) REFERENCES towns(id)
);