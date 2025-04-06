export interface ImmutableRatingsContracts {
  TUP: string;
  TDN: string;
  ImmutableRatings: string;
}

export const deployments: Record<number, ImmutableRatingsContracts> = {
  // Base Mainnet
  [8453]: {
    TUP: "",
    TDN: "",
    ImmutableRatings: "",
  },
  // Base Sepolia
  [84532]: {
    TUP: "0x9E8765f0958F7FafD5c15F4F24E7e0a9c03f61e1",
    TDN: "0x14932F95a27364e9d27E899EBA1f6F54C11429b4",
    ImmutableRatings: "0xa7F2e133604A663395d7E4f008faCB94c097DcB3",
  },
};

export const deployConfig = {
  // Base Sepolia
  84532: {
    receiver: "0x30e7120ce8c0ABA197f1C4EccF2F4E1e1C75ab1d", // https://app.splits.org/accounts/0x30e7120ce8c0ABA197f1C4EccF2F4E1e1C75ab1d/?chainId=84532
  },
  // Base Mainnet
  8453: {
    receiver: "",
  },
};

export const getConfig = (chainId: number) => {
  return deployConfig[chainId as keyof typeof deployConfig];
};
