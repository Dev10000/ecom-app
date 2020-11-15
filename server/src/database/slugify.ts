import DB from '../config/database';

async function slugify(title: string, table: string, column1: string, column2: string): Promise<boolean> {
    let slug = title.toLowerCase().replace(/ /gi, '-');
    let selectValues: string[] = [title];
    const selectQuery = `SELECT ${column1} FROM ${table} WHERE ${column1} = $1`;
    let resSelect = await DB.query(selectQuery, selectValues);

    // This while loop checks if title exist in the db and adds 1 until not exist
    let i = 1;
    if (resSelect.rowCount > 0) {
        // eslint-disable-next-line no-constant-condition
        while (true) {
            i += 1;
            const newTitle = `${title}-${i}`;
            selectValues = [newTitle];
            // eslint-disable-next-line no-await-in-loop
            resSelect = await DB.query(selectQuery, selectValues);

            if (resSelect.rowCount === 0) {
                slug = `${slug}-${i}`;
                title = `${title}-${i}`;
                break;
            }
        }
    }

    const insertValues = [title, slug];
    const insertQuery = `INSERT INTO ${table}(${column1}, ${column2}) VALUES($1, $2) RETURNING *`;

    // async/await
    try {
        const resInsert = await DB.query(insertQuery, insertValues);
        console.log(resInsert.rows[0]);
    } catch (err) {
        console.log(err.stack);
    }
    return true;
}

slugify('Test Title', 'product_categories', 'title', 'slug');