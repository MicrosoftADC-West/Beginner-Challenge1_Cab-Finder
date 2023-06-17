import "./skeletonLoader.css";
interface TableSkeletonLoaderInterface {
  rowNo: number;
  columnValues: string[];
}
export const TableSkeletonLoader = (props: TableSkeletonLoaderInterface) => {
  const { rowNo, columnValues } = props;
  const renderedRows = [...Array(rowNo)].map((e, i) => (
    <div key={i}>
      <Row columnValues={columnValues} />
    </div>
  ));

  return (
    <div className="tableContainer">
      <div className="tableSkeletonrow">
        {columnValues?.map((item: string, id: number) => (
          <p key={id} className="text-start">
            {item}
          </p>
        ))}
      </div>
      {renderedRows}
    </div>
  );
};

const Row = ({ columnValues }: { columnValues: string[] }) => (
  <div className="tableSkeletonrow">
    {columnValues.map((item: string, id: number) => (
      <div key={id} className="skeleton"></div>
    ))}
  </div>
);

export default Row;
