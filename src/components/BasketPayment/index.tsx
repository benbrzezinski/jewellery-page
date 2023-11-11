import { useState, useRef, ChangeEventHandler } from "react";
import { useSearchParams } from "react-router-dom";
import { InputRefs } from "../../types";
import ProductSelects from "../ProductSelects";
import VoucherSummary from "../VoucherSummary";
import scss from "./BasketPayment.module.scss";

const BasketPayment = () => {
  const [searchParams] = useSearchParams();
  const [values, setValues] = useState({
    code: "",
    month: "",
    year: "",
    cvc: "",
    blik1: "",
    blik2: "",
    blik3: "",
    blik4: "",
    blik5: "",
    blik6: "",
  });

  const inputRefs: InputRefs = {
    code: useRef(null),
    month: useRef(null),
    year: useRef(null),
    cvc: useRef(null),
    blik1: useRef(null),
    blik2: useRef(null),
    blik3: useRef(null),
    blik4: useRef(null),
    blik5: useRef(null),
    blik6: useRef(null),
  };

  const handleFocusNextInput = (name: keyof InputRefs) => {
    const ref = inputRefs[name];
    if (ref && ref.current) {
      ref.current.focus();
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    const { name, value, maxLength } = e.currentTarget;
    if (value !== "" && !value.match(/^[0-9]+$/)) return;
    setValues(v => ({ ...v, [name]: value }));

    if (value.length === maxLength) {
      switch (name) {
        case "code":
          handleFocusNextInput("month");
          break;
        case "month":
          handleFocusNextInput("year");
          break;
        case "year":
          handleFocusNextInput("cvc");
          break;
        case "blik1":
          handleFocusNextInput("blik2");
          break;
        case "blik2":
          handleFocusNextInput("blik3");
          break;
        case "blik3":
          handleFocusNextInput("blik4");
          break;
        case "blik4":
          handleFocusNextInput("blik5");
          break;
        case "blik5":
          handleFocusNextInput("blik6");
          break;
        default:
          return;
      }
    }
  };

  return (
    <section className={scss.paymentBox}>
      <h2 className={scss.title}>Payment method</h2>
      <ProductSelects />
      {searchParams.get("payment") ? (
        <>
          <div className={scss.paymentMethodBox}>
            <div
              className={scss.paymentMethodImg}
              style={{
                backgroundImage:
                  searchParams.get("payment") === "credit"
                    ? "url(assets/images/creditCard.png)"
                    : "url(assets/svgs/blik.svg)",
              }}
            ></div>
            <p className={scss.paymentMethodText}>
              {searchParams.get("payment") === "credit"
                ? "Visa / Mastercard"
                : "BLIK"}
            </p>
          </div>
          <form className={scss.paymentMethodForm}>
            {searchParams.get("payment") === "credit" ? (
              <>
                <input
                  type="text"
                  name="code"
                  className={scss.creditCardInput}
                  ref={inputRefs.code}
                  placeholder="Card Number"
                  maxLength={16}
                  required
                  value={values.code}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="month"
                  className={`${scss.creditCardInput} ${scss.small}`}
                  ref={inputRefs.month}
                  placeholder="MM"
                  maxLength={2}
                  required
                  value={values.month}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="year"
                  className={`${scss.creditCardInput} ${scss.small}`}
                  ref={inputRefs.year}
                  placeholder="YY"
                  maxLength={2}
                  required
                  value={values.year}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="cvc"
                  className={`${scss.creditCardInput} ${scss.small}`}
                  ref={inputRefs.cvc}
                  placeholder="CVC"
                  maxLength={3}
                  required
                  value={values.cvc}
                  onChange={handleChange}
                />
              </>
            ) : (
              <>
                <input
                  type="text"
                  name="blik1"
                  className={scss.blikInput}
                  ref={inputRefs.blik1}
                  placeholder="_"
                  maxLength={1}
                  required
                  value={values.blik1}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="blik2"
                  className={scss.blikInput}
                  ref={inputRefs.blik2}
                  placeholder="_"
                  maxLength={1}
                  required
                  value={values.blik2}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="blik3"
                  className={scss.blikInput}
                  ref={inputRefs.blik3}
                  placeholder="_"
                  maxLength={1}
                  required
                  value={values.blik3}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="blik4"
                  className={scss.blikInput}
                  ref={inputRefs.blik4}
                  placeholder="_"
                  maxLength={1}
                  required
                  value={values.blik4}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="blik5"
                  className={scss.blikInput}
                  ref={inputRefs.blik5}
                  placeholder="_"
                  maxLength={1}
                  required
                  value={values.blik5}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="blik6"
                  className={scss.blikInput}
                  ref={inputRefs.blik6}
                  placeholder="_"
                  maxLength={1}
                  required
                  value={values.blik6}
                  onChange={handleChange}
                />
              </>
            )}
            <button type="submit" className={scss.proceedBtn}>
              Proceed to payment
            </button>
          </form>
          <VoucherSummary />
        </>
      ) : null}
    </section>
  );
};

export default BasketPayment;
