import Config from '../types/config';
import LengthArg from '../types/lengthArgs';
import TextArg from '../types/textArgs';
declare class Generator {
    constructor();
    private _generated;
    private _configuration;
    store: Map<any, any>;
    setConfig(config: Config): void;
    get config(): Config;
    private isExpired;
    verify(code: string): boolean;
    numeric({ length }: LengthArg): string;
    text({ length, capital }: TextArg): string;
}
declare const generator: Generator;
export default generator;
//# sourceMappingURL=index.d.ts.map