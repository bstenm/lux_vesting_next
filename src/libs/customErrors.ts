/* eslint-disable max-len */
/* eslint-disable max-classes-per-file */
export class LoginError extends Error {
    constructor(message?: string) {
        super();
        this.name = 'LoginError';
        if (message) {
            this.message = message;
        }
        Object.setPrototypeOf(this, LoginError.prototype);
    }
}

export class MissingPrivateKeyError extends Error {
    constructor() {
        super();
        this.name = 'MissingPrivateKeyError';
        this.message = 'Please provide a private key';
        Object.setPrototypeOf(this, MissingPrivateKeyError.prototype);
    }
}

export class MissingContractAddressError extends Error {
    constructor(contractName: string) {
        super();
        this.name = 'MissingContractAddressError';
        this.message = `Please provide the contract address for ${contractName}`;
        Object.setPrototypeOf(this, MissingContractAddressError.prototype);
    }
}

export class MissingTokenContractAddressError extends MissingContractAddressError {
    constructor() {
        super('TokenContract');
    }
}

export class MissingTokenVendorContractAddressError extends MissingContractAddressError {
    constructor() {
        super('TokenVendorContract');
    }
}

export class MissingNFTTokenContractAddressError extends MissingContractAddressError {
    constructor() {
        super('NFTTokenContract');
    }
}

export class ContractInitialisationError extends Error {
    constructor(name: string, message?: string) {
        super();
        this.name = name;
        if (message) {
            this.message = message;
        }
        Object.setPrototypeOf(this, ContractInitialisationError.prototype);
    }
}

export class TokenContractInitialisationError extends ContractInitialisationError {
    constructor(message?: string) {
        super('TokenContractInitialisationError', message);
    }
}

export class NFTTokenContractInitialisationError extends ContractInitialisationError {
    constructor(message?: string) {
        super('NFTTokenContractInitialisationError', message);
    }
}

export class SignedTokenContractInitialisationError extends Error {
    constructor(message?: string) {
        super();
        this.name = 'SignedTokenContractInitialisationError';
        if (message) {
            this.message = message;
        }
        Object.setPrototypeOf(
            this,
            SignedTokenContractInitialisationError.prototype
        );
    }
}

export class TokenPurchaseError extends Error {
    constructor(message?: string) {
        super();
        this.name = 'TokenPurchaseError';
        if (message) {
            this.message = message;
        }
        Object.setPrototypeOf(this, TokenPurchaseError.prototype);
    }
}

export class RecordNotFoundError extends Error {
    constructor(message?: string) {
        super();
        this.name = 'RecordNotFoundError';
        if (message) {
            this.message = message;
        }
        Object.setPrototypeOf(this, RecordNotFoundError.prototype);
    }
}

export class FileTooLargeError extends Error {
    constructor(message?: string) {
        super();
        this.name = 'FileTooLargeError';
        if (message) {
            this.message = message;
        }
        Object.setPrototypeOf(this, FileTooLargeError.prototype);
    }
}

export class HookActionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'HookActionError';
    }
}
