type TransKey = {
    textId: string;
    vars?: Record<string, unknown>;
};

type LoyaltyBenefit = {
    type: string;
    silver: TransKey;
    gold: TransKey;
    platinum: TransKey;
};

export const loyaltyBenefits: LoyaltyBenefit[] = [
    {
        type: 'transactionFees',
        silver: { textId: 'percentOff', vars: { percent: 15 } },
        gold: { textId: 'percentOff', vars: { percent: 25 } },
        platinum: { textId: 'firstFreeThenPercentageOff' }
    },
    {
        type: 'ReservedPercentageOfNewAsset',
        silver: { textId: 'percentAvailable', vars: { percent: 5 } },
        gold: { textId: 'percentAvailable', vars: { percent: 10 } },
        platinum: { textId: 'percentAvailable', vars: { percent: 12 } }
    },
    {
        type: 'extraYieldInStakingPool',
        silver: { textId: 'percentMore', vars: { percent: 0.25 } },
        gold: { textId: 'percentMore', vars: { percent: 0.5 } },
        platinum: { textId: 'percentMore', vars: { percent: 1 } }
    },
    {
        type: 'marketplaceDiscountPerYear',
        silver: { textId: 'percentUpOf', vars: { percent: 10, limit: 250 } },
        gold: { textId: 'percentOutOf', vars: { percent: 15, limit: 500 } },
        platinum: {
            textId: 'percentOutOf',
            vars: { percent: 10, limit: 1000 }
        }
    },
    {
        type: 'NFTMinting',
        silver: { textId: 'mintingPeriod', vars: { week: 1, year: 1 } },
        gold: { textId: 'yearly', vars: { year: 3 } },
        platinum: { textId: 'mintingPeriod', vars: { week: 1, year: 5 } }
    },
    {
        type: 'assetRaffle',
        silver: { textId: 'ticketPerDrawing', vars: { ticket: 1 } },
        gold: { textId: 'numberOfTicket', vars: { ticket: 2 } },
        platinum: { textId: 'numberOfTicket', vars: { ticket: 3 } }
    },
    {
        type: 'assetAirDrop',
        silver: { textId: 'entryForGoldOrSilverNFTs', vars: { entry: 1 } },
        gold: { textId: 'entriesForGoldOrSilverNFTs', vars: { entry: 2 } },
        platinum: {
            textId: 'entriesForGoldOrSilverNFTs',
            vars: { entry: 3 }
        }
    }
];
