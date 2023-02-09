/* eslint-disable import/prefer-default-export */
type TableProps = {
  tableHead: { key: string | number; value: string }[];
  tableBody: {
    key: string | number;
    entry: { key: string | number; value: string | number | JSX.Element }[];
  }[];
  darkHead?: boolean;
};

export type { TableProps };
