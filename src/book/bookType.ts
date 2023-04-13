export type BookTypeBody = {
  title: string;
  year_of_issue: string;
  edition: string;
  authors: {
    authors_name: string;
    author_surname: string;
  }[];
  genre: {
    title: string;
  }[];
};
