import { useDispatch, useSelector } from "react-redux";
import { removeItem, sortData } from "../Store/items/itemsSlice";
import { useEffect, useState } from "react";
import SelceteStyle from "../ui/SelectStyle";
import { formatCurrency } from "../utils/helpers";

export default function Table() {
  const items = useSelector((s) => s.items);
  const data = items.data;
  const dispatch = useDispatch();
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState("date");
  const [isAsc, setIsAsc] = useState(true);
  const [actionFilter, setActionFilter] = useState("");
  const [income, setIncome] = useState(0);

  const handlerClick = (id) => {
    dispatch(removeItem(id));
  };

  const handelsort = (column: string) => {
    setSortBy(column);
    setIsAsc(() => !isAsc);
  };

  const handelActionFilter = (value) => {
    setActionFilter(value);
  };

  const calcuteIncom = (items) => {
    let tmpIncome = 0;
    items.forEach((item) => {
      if (item.sellorbuy === "buy") {
        console.log(item.total, "buy");
        tmpIncome = tmpIncome + item.total;
      } else {
        tmpIncome = tmpIncome - item.total;
      }
    });
    setIncome(tmpIncome);
  };

  useEffect(() => {
    if (!data) return;

    let sorted = [...data].sort((a, b) => {
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
        sorted = sorted.filter((i: Item) => i.sellorbuy === actionFilter);
      }
    }
    setSortedData(sorted);
    calcuteIncom(sorted);
  }, [data, sortBy, isAsc, actionFilter]);

  return (
    <>
      <div>
        <div>Filters</div>
        <SelceteStyle
          name="byaction"
          onChange={(e) => handelActionFilter(e.target.value)}
          className="form-select"
        >
          <option selected value="all">
            All Actions
          </option>
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
          {sortedData.map((item, index) => (
            <tr key={index} className={item.sellorbuy}>
              <td scope="row" className="d-none d-lg-block">
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
