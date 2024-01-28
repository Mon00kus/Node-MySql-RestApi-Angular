declare module 'promise-mysql' {
    import * as mysql from 'mysql'
    interface Pool extends mysql.Pool{
        getConnection(): Promise<mysql.PoolConnection>;
    }
    function createPool(config: mysql.PoolConfig): Pool;
    export = {
        createPool
    }
 /*    import * as mysql from 'mysql';

    interface Pool extends mysql.Pool {
        getConnection(): Promise<mysql.PoolConnection>;
    }

    function createPool(config: mysql.PoolConfig): Pool;

    export = {
        createPool
    } */
}