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
): { runSetupQuery(tableName: string, queryString: string): Promise<unknown> } => {
    const runSetupQuery = async (tableName: string, queryString: string) => {
        try {
            const ret = await DB.query(queryString);
            colorLog('success', `√ Table "${tableName}" successfully ${seed ? 'seeded with data' : '(re)created'}.`);
            return ret;
        } catch (error) {
            colorLog(
                'error',
                `× Table "${tableName}" NOT ${seed ? 'seeded with data' : '(re)created'}. ${
                    error.message
                } \n Details: \n ${error.detail}`,
            );
            // console.log({ error });
            return error.stack;
        }
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
