import DB from '../config/database';

// eslint-disable-next-line consistent-return
async function slugify(
    title: string,
    parent_id: number,
    column1: string,
    column2: string,
    table?: string,
): Promise<any> {
    let slug = title
        .normalize('NFD') // normalize()ing to NFD Unicode normal form decomposes combined graphemes into the combination of simple ones. The è of Crème ends up expressed as e +  ̀.
        .replace(/[\u0300-\u036f]/g, '') // Using a regex character class to match the U+0300 → U+036F range, it is now trivial to globally get rid of the diacritics, which the Unicode standard conveniently groups as the Combining Diacritical Marks Unicode block.
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w-]+/g, '') // removes anything not alphanumeric
        .replace(/\-\-+/g, '-'); // Replace multiple - with single -
    let selectValues: (string | number)[] = [title, parent_id];
    const selectQuery = `SELECT ${column1} FROM ${table} WHERE ${column1} = $1 AND parent_id = $2`;
    let resSelect = await DB.query(selectQuery, selectValues);
    console.log(resSelect);

    // This while loop checks if title exist in the db and adds 1 until not exist
    let i = 1;
    if (resSelect.rowCount > 0) {
        // eslint-disable-next-line no-constant-condition
        while (true) {
            i += 1;
            const newTitle = `${title}-${i}`;
            selectValues = [newTitle, parent_id];
            // eslint-disable-next-line no-await-in-loop
            resSelect = await DB.query(selectQuery, selectValues);

            if (resSelect.rowCount === 0) {
                slug = `${slug}-${i}`;
                title = `${title}-${i}`;
                break;
            }
        }
    }

    const insertValues = [parent_id, title, slug];
    const insertQuery = `INSERT INTO ${table}(${column1}, parent_id, ${column2}) VALUES($2, $1, $3) RETURNING *`;
    console.log(insertQuery);

    // async/await
    try {
        const resInsert = await DB.query(insertQuery, insertValues);
        console.log(resInsert.rows[0]);
    } catch (err) {
        console.log(err.stack);
        return console.log(err.stack);
    }
}

slugify('Test Titleäööö///and&&üÿü', 100, 'title', 'slug', 'product_categories');
