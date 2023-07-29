export * from 'emmet.sdk/enums/environment';
export * from 'emmet.sdk/interfaces';
export * from 'emmet.sdk/types';

import * as WALLET_LOGOS from 'emmet.sdk/logos/wallets'

/******************************************
 *              UI ONLY TYPES             *
 ******************************************/

export type TCookie = {
    key: string,
    value: string,
    days?: number,
    hours?: number,
    minutes?: number,
    seconds?: number
}

export enum LanguageNames {
    English = "English",
    Russian = "Русский",
}

export const supportedLanguages: LanguageNames[] = [
    LanguageNames.English,
    LanguageNames.Russian
]

export enum WalletNames {
    Metamask = "Metamask",
    TrustWallet = "TrustWallet",
    Coinbase = "Coinbase",
};

export const supportedWallets: WalletNames[] = [
    WalletNames.Metamask,
    WalletNames.TrustWallet,
    WalletNames.Coinbase
]

export const WalletLogos: { [key in keyof typeof WalletNames]: string } = {
    Metamask:WALLET_LOGOS.LOGO_METAMASK,
    TrustWallet:WALLET_LOGOS.LOGO_TRUST,
    Coinbase:WALLET_LOGOS.LOGO_COINBASE
};

