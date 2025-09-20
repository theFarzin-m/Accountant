import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../Store/items/itemsSlice";
import { Data } from "../Store/items/itemsSlice"; // Assuming 'Item' is the correct type for a single item
import { useEffect, useState } from "react";
import SelceteStyle from "../ui/SelectStyle";
import { formatCurrency } from "../utils/helpers";
import { RootState } from "../Store/store";

function isItemsSlice(obj: unknown): obj is { data: Data[] } {
  return typeof obj === "object" && obj !== null && "data" in obj;
}

export default function Table() {
  const itemsSlice = useSelector((s: RootState) => s.items) as unknown;
  const items = isItemsSlice(itemsSlice) ? itemsSlice.data : undefined;
  const dispatch = useDispatch();
  const [sortedData, setSortedData] = useState<Data[]>(items ?? []);
  const [sortBy, setSortBy] = useState<keyof Data>("date");
  const [isAsc, setIsAsc] = useState<boolean>(true);
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [income, setIncome] = useState<number>(0);

  const handlerClick = (id: string) => {
    dispatch(removeItem(id));
  };

  const handelsort = (column: keyof Data) => {
    setSortBy(column);
    setIsAsc(() => !isAsc);
  };

  const handelActionFilter = (value: string) => {
    setActionFilter(value);
  };
  const calcuteIncom = (items: Data[]) => {
    let tmpIncome: number = 0;
    items.forEach((item: Data) => {
      if (item.sellorbuy === "buy") {
        tmpIncome = tmpIncome + item.total;
      } else {
        tmpIncome = tmpIncome - item.total;
      }
    });
    setIncome(tmpIncome);
  };

  useEffect(() => {
    if (!items) return;
    let sorted: Data[] = [...items].sort((a: Data, b: Data) => {
      const valA = a[sortBy];
      const valB = b[sortBy];

      if (typeof valA === "number" && typeof valB === "number") {
        return valB - valA;
      }

      if (typeof valA === "string" && typeof valB === "string") {
        return valA.localeCompare(valB);
      }

      return 0;
    });

    sorted = isAsc ? sorted : sorted.reverse();

    if (actionFilter !== "") {
      if (actionFilter !== "all") {
        sorted = sorted.filter((i) => i.sellorbuy === actionFilter);
      }
    }
    setSortedData(sorted);
    calcuteIncom(sorted);
  }, [items, sortBy, isAsc, actionFilter]);

  return (
    <>
      <div>
        <div>Filters</div>
        <SelceteStyle
          name="byaction"
          value={actionFilter}
          onChange={(e) => handelActionFilter(e.target.value)}
          className="form-select"
        >
          <option value="all">All Actions</option>
          <option value="sell">Sell</option>
          <option value="buy">Buy</option>
        </SelceteStyle>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col" className="d-none d-lg-table-cell">
              #
            </th>
            <th scope="col" className="d-none d-lg-table-cell">
              Sell or Buy
            </th>
            <th scope="col">
              <button className="btn" onClick={() => handelsort("name")}>
                Name
              </button>
            </th>
            <th scope="col" className="d-none d-lg-table-cell">
              <button className="btn" onClick={() => handelsort("price")}>
                Price
              </button>
            </th>
            <th scope="col" className="d-none d-lg-table-cell">
              <button className="btn" onClick={() => handelsort("quantity")}>
                Quantity
              </button>
            </th>
            <th scope="col">
              <button className="btn" onClick={() => handelsort("total")}>
                Total
              </button>
            </th>
            <th scope="col">
              <button className="btn" onClick={() => handelsort("date")}>
                Date
              </button>
            </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {sortedData[0] &&
            sortedData.map((item, index: number) => (
              <tr key={index} className={item.sellorbuy}>
                <td scope="row" className="d-none d-lg-table-cell">
                  {index + 1}
                </td>
                <td className="d-none d-lg-table-cell">{item.sellorbuy}</td>
                <td>{item.name}</td>
                <td className="d-none d-lg-table-cell">
                  {formatCurrency(item.price)}
                </td>
                <td className="d-none d-lg-table-cell">{item.quantity}</td>
                <td>{formatCurrency(item.total)}</td>
                <td>{item.date}</td>
                <td>
                  <button
                    className="btn btn-outline-danger py-0 px-1 py-md-1 px-md-2"
                    onClick={() => handlerClick(item.id)}
                  >
                    <i className="bi bi-trash" />
                  </button>
                </td>
              </tr>
            ))}
          <tr>
            <td colSpan={2}>Income:</td>
            <td colSpan={6}>{formatCurrency(income)}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
