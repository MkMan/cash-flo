type Profile = {
  id: string;
  name: string;
};

type UserSettings = {
  profiles: Profile[];
};

export type { Profile, UserSettings };
