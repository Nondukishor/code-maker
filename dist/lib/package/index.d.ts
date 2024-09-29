interface LengthArg {
    length: number;
}
interface TextArg extends LengthArg {
    capital?: boolean;
}
declare function numeric({ length }: LengthArg): string;
declare function text({ length, capital }: TextArg): string;
export { text, numeric };
//# sourceMappingURL=index.d.ts.map