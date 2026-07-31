export type Board = {
  _id: string;

  title: string;
  description: string;
  slug: string;

  settings: {
    allowVoting: boolean;
    allowComments: boolean;
  };

  createdAt: Date;
  updatedAt: Date;
};

export type CreateBoardInput = {
  title: string;
  description: string;
  slug: string;

  settings?: {
    allowVoting?: boolean;
    allowComments?: boolean;
  };
};
