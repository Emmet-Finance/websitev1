import { safeToBigInt } from "./safeToBigInt";

/**
 * Calculates the amount a user will receive
 * @param amount user sent
 * @param slippage tolerance %
 * @returns estimated amount as string
 */
export function getReceiveAmount(
    amount: string | number | bigint,
    slippage: string | number | bigint,
): string{
    // Convert arguments to bigint
    const a = safeToBigInt(amount);
    const s = safeToBigInt(slippage);

    if(a && s){
        const tolerance = a / 100n * s;
        return (a - tolerance).toString()
    } else if(a){
        return a.toString()
    }
    return '';
}