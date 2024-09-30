import Config from '../types/config';
import LengthArg from '../types/lengthArgs';
import TextArg from '../types/textArgs';
declare class Generator {
    private readonly MAX_TIMEOUT;
    private readonly _generated;
    private _configuration;
    store: Map<string, number>;
    constructor();
    setConfig(config: Config): void;
    get config(): Config;
    private isExpired;
    verify(code: string): boolean;
    private startExpirationCheck;
    private scheduleExpiration;
    numeric({ length }: LengthArg): string;
    text({ length, capital }: TextArg): string;
}
declare const generator: Generator;
export default generator;
//# sourceMappingURL=index.d.ts.map