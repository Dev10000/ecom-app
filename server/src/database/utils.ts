/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Pool } from 'pg';
import { Interface } from 'readline';
import DB from '../config/database';

export const colorLog = (status: string, info: string): void => {
    let color = '';

    if (status === 'success') color = '\x1b[32m%s\x1b[0m'; // green
    if (status === 'error') color = '\x1b[31m%s\x1b[0m'; // red
    // if (status === 'info') color = '\x1b[36m%s\x1b[0m'; // cyan

    console.log(color, info);
};

export const useDBSetup = (pool: Pool): { runSetupQuery(tableName: string, queryString: string): Promise<unknown> } => {
    const runSetupQuery = async (tableName: string, queryString: string) => {
        try {
            const ret = await pool.query(queryString);
            colorLog('success', `√ Table "${tableName}" successfully (re)created.`);
            return ret;
        } catch (error) {
            colorLog('error', `× Table "${tableName}" NOT (re)created. ${error.message}`);
            return error.stack;
        }
    };

    return { runSetupQuery };
};

export const useModel = (tableName: string) => {
    const getAll = async () => {
        try {
            const res = await DB.query(`SELECT * FROM ${tableName};`);
            return res.rows;
        } catch (err) {
            return Promise.reject(new Error('Could not fetch DB data'));
        }
    };

    const findById = async (id: number) => {
        try {
            const res = await DB.query(`SELECT * FROM ${tableName} WHERE id=$1;`, [id]);
            return res.rows[0];
        } catch (err) {
            return Promise.reject(new Error('Could not fetch DB data'));
        }
    };

    return { getAll, findById } as const;
};
