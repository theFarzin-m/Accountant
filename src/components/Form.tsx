import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../ui/Input";
import { useDispatch } from "react-redux";
import { addItem } from "../Store/items/itemsSlice";
import SelceteStyle from "../ui/SelectStyle";

export default function Form() {
  interface FormValues {
    name: string;
    sellorbuy: "buy" | "sell";
    price: number;
    quantity: number;
  }

  const { register, handleSubmit, reset } = useForm<FormValues>();
  const dispatch = useDispatch();

  const handeleOnSubmit: SubmitHandler<FormValues> = (data) => {
    const { name, sellorbuy, price, quantity } = data;

    const now = new Date();

    const date = now.toLocaleDateString("fa-IR");

    const time = now.toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const cleanDate = `${date} ${time}`;

    dispatch(
      addItem(sellorbuy, name, Number(price), Number(quantity), cleanDate)
    );
    reset();
  };

  const handelError = (err: unknown): void => {
    console.log(err);
  };

  return (
    <form
      className="row row- justify-content-between align-items-baseline"
      onSubmit={handleSubmit(handeleOnSubmit, handelError)}
    >
      <label className="col-6 col-lg-3">
        <SelceteStyle
          id="action"
          className="form-select"
          {...register("sellorbuy")}
        >
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </SelceteStyle>
      </label>

      <div className="col-6 col-lg-3">
        <Input label="Name">
          <input type="text" required {...register("name")} />
        </Input>
      </div>
      <div className="col-6 col-lg-3">
        <Input label="Price">
          <input type="number" required {...register("price")} />
        </Input>
      </div>
      <div className="col-6 col-lg-3">
        <Input label="Quantity">
          <input type="number" required {...register("quantity")} />
        </Input>
      </div>
      <div className="text-center mt-2">
        <button className="btn btn-outline-success">Add</button>
      </div>
    </form>
  );
}
