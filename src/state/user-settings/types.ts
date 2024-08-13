type Profile = {
  accountIds?: string[];
  id: string;
  name: string;
};

type Account = {
  id: string;
  name: string;
};

type UserSettings = {
  accounts: Account[];
  profiles: Profile[];
};

export type { Profile, UserSettings };
