
/**
 * Converts an input into a bigint
 * @param x an input to be converted
 * @returns a bigint representation of the input
 */
export function safeToBigInt(x: string | number | bigint): bigint {
    switch (typeof x) {
        case 'bigint':
            return x;
        case 'number':
            if (x.toString().includes('.')) {
                return safeToBigInt(x.toString())
            }
            return BigInt(x);
        case 'string':
            if (x) {
                return BigInt(x.replace(/\./g, ''));
            }
            return 0n;
        default:
            return 0n;
    }
}