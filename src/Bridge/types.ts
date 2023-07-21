export * from 'emmet.sdk/enums/environment';
export * from 'emmet.sdk/interfaces';
export * from 'emmet.sdk/types';

export type TCookie = {
    key:string,
    value:string,
    days?:number,
    hours?:number,
    minutes?:number,
    seconds?:number
}