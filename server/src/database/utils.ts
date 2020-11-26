import { QueryResult } from 'pg';
import fs from 'fs';
import { from } from 'pg-copy-streams';
import DB from '../config/database';

export const colorLog = (status: string, info: string): void => {
    let color = '';

    if (status === 'success') color = '\x1b[32m%s\x1b[0m'; // green
    if (status === 'error') color = '\x1b[31m%s\x1b[0m'; // red
    // if (status === 'info') color = '\x1b[36m%s\x1b[0m'; // cyan

    console.log(color, info);
};

export const useDBSetup = (
    seed?: boolean,
): {
    runSetupQuery(tableName: string, queryString: string): Promise<unknown>;
} => {
    const runSetupQuery = (tableName: string, queryString: string) => {
        return (
            DB.query(queryString)
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                .then((_result) => {
                    colorLog(
                        'success',
                        `√ Table "${tableName}" successfully ${seed ? 'seeded with data' : '(re)created'}.`,
                    );
                })
                .catch((error) => {
                    colorLog(
                        'error',
                        `× Table "${tableName}" NOT ${seed ? 'seeded with data' : '(re)created'}. ${
                            error.message
                        } \n Details: \n ${error.detail}`,
                    );
                })
        );
    };

    return { runSetupQuery };
};

export const removeFields = <T, K extends keyof T>(entity: T, props: K[]): Omit<T, K> => {
    // eslint-disable-next-line no-sequences
    return props.reduce((s, prop) => (delete s[prop], s), entity);
};

export const pascalToSnakeCase = (input: string): string => {
    return input
        .split(/(?=[A-Z])/)
        .join('_')
        .toLowerCase();
};

//* *SLUGIFY START* */
/**
 * Input parameters and types
 * @param query Query string
 * @param values Array of values for the query
 */
// DBQUERY function - is used for all the queries in slugify. Returns either success or error response object
async function dbQuery(query: string, values: (string | number)[]): Promise<QueryResult | ErrorEvent> {
    // async/await
    try {
        const response = await DB.query(query, values);
        return response.rows[0];
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Input parameters and types
 * @param input: string - user input string to be slugified
 * return: slugified string
 */
// SLUGIFY function
export const slugify = async (input: string): Promise<string> => {
    // Slugify the string
    const slug = input
        .normalize('NFD') // normalize()ing to NFD Unicode normal form decomposes combined graphemes into the combination of simple ones. The è of Crème ends up expressed as e +  ̀.
        .replace(/[\u0300-\u036f]/g, '') // Using a regex character class to match the U+0300 → U+036F range, it is now trivial to globally get rid of the diacritics, which the Unicode standard conveniently groups as the Combining Diacritical Marks Unicode block.
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w-]+/g, '') // Removes anything not alphanumeric
        .replace(/\-\-+/g, '-'); // Replace multiple - with single -
    return slug;
};

/**
 * Input parameters and types
 * @param input: string - user input string to be checked
 * @param parent_id: number - user input Parent Id of the category to be checked
 * @param column1: string - The name of the column in the db for the select query
 * @param table: string - The name of the table in the db for the select query
 * returns - Returns either true if exists and false if not
 */
// CHECK IF STRING EXISTS IN THE TABLE
export const checkIfStringExistsInTable = async (
    input: string,
    parent_id: number,
    column1: string,
    table: string,
): Promise<boolean> => {
    const queryValues: (string | number)[] = [input, parent_id];
    const query = `SELECT ${column1} FROM ${table} WHERE ${column1} = $1 AND parent_id = $2`;
    const response = await dbQuery(query, queryValues);

    // Checks if parent_id and title unique constrain exist in the table and returns either true or false
    if (response) {
        // [title, slug] = await postfixLoop(title, parent_id, slug, selectQuery);
        // return await postfixNumberGenerator(input, parent_id, slug, selectQuery);
        return true;
    }
    return false;
};

/**
 * Input parameters and types
 * @param input user input string to be inserted into the title column
 * @param parent_id User input Parent Id of the category
 * @param slug Autogenretated slug
 */
// Checks if the parent_id and the title unique constrain exist in the table
// and generates incrementing postfix number until not exists in the table (title-1, title-2...)
export const postfixNumberGenerator = async (
    input: string,
    parent_id: number,
    slug: string,
): Promise<Array<string>> => {
    const column1 = 'title';
    const table = 'product_categories';
    let queryValues: (string | number)[] = [input, parent_id];
    const query = `SELECT ${column1} FROM ${table} WHERE ${column1} = $1 AND parent_id = $2`;
    let newTitleSlug: string[];
    let i = 1;
    // eslint-disable-next-line no-constant-condition
    while (true) {
        i += 1;
        const newTitle = `${input}-${i}`;
        queryValues = [newTitle, parent_id];

        // eslint-disable-next-line no-await-in-loop
        const response = await dbQuery(query, queryValues);

        if (!response) {
            input = `${input}-${i}`;
            slug = `${slug}-${i}`;
            newTitleSlug = [input, slug];
            break;
        }
    }
    return newTitleSlug;
};

/**
 * Input parameters and types
 * @param parent_id: number - User input Parent Id of the category
 * @param title: string - user input string to be inserted into the column1
 * @param slug: string - user input string to be inserted into the column1
 * return - Returns promise query result object
 */
// INSERT TITLE AND SLUG INTO CATEGORIES TABLE
export const insertTitleAndSlug = async (
    parent_id: number,
    title: string,
    slug: string,
): Promise<QueryResult | ErrorEvent> => {
    const table = 'product_categories';
    const column1 = 'title';
    const column2 = 'slug';
    const queryValues = [parent_id, title, slug];
    const query = `INSERT INTO ${table}(${column1}, parent_id, ${column2}) VALUES($2, $1, $3) RETURNING *`;
    const response = await dbQuery(query, queryValues);

    return response;
};

//* *SLUGIFY END* */

/** PgAdmin CSV settings HARD CODED
// @param Encoding= UTF8
// @param Delimiter= [tab]
// @param Header = On
// @param Quote = "
// @param Escape = '
// @param NULL String = NULL
// @param Quoting is not used for data values
* */
// IMPORT CSV TO DEV_DB
export const csvImport = async (filePath: fs.ReadStream, tableName: string): Promise<unknown> => {
    return DB.connect((err, client, done) => {
        if (err) {
            console.log(`Can not connect to the DB${err}`);
        }
        const queryStream = client.query(
            from(
                `COPY ${tableName} FROM STDIN WITH (FORMAT CSV, DELIMITER '\t', HEADER, ENCODING 'UTF8', NULL 'NULL')`,
            ),
        );
        const errorCall = (error: Error): void => {
            if (error) {
                done();
                colorLog(
                    'error',
                    `× Table "${tableName}" NOT 'seeded with data' : '(re)created'}. ${error.message} \n Details: \n ${error}`,
                );
            }
            done();
            colorLog('success', `√ Table "${tableName}" successfully 'seeded with data' : '(re)created'.`);
        };
        const fileStream = filePath;
        fileStream.on('error', errorCall);
        queryStream.on('error', errorCall);
        queryStream.on('finish', errorCall);
        fileStream.pipe(queryStream).on('error', errorCall);
        // DB.end();
    });
};
