export type Board = {
  title: string;
  description: string;
  slug: string;

  settings: {
    allowVoting: boolean;
    allowComments: boolean;
  };
};
