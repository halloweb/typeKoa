/** Declaration file generated by dts-gen */

export = koa_session2;

declare function koa_session2(opts: any): any;

declare namespace koa_session2 {
    class Store {
        constructor(...args: any[]);

        destroy(...args: any[]): void;

        get(...args: any[]): void;

        static getID(length: number): string;

        set(...args: any[]): void;

    }

}
