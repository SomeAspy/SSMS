export interface SecureObject {
    path: string;
    hash: string;
    salt: string;
}

export interface SecureObjects {
    data: SecureObject[];
}
