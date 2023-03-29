
import { useState, useEffect, useMemo } from "react";

function Conversions() {
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState(0);
  const [btcValue, setBtcValue] = useState(0);
  const [sortOrder, setSortOrder] = useState("desc"); // to sort the exchange rates
  const [cachedCurrencyObj, setCachedCurrencyObj] = useState(null);

  useEffect(() => {
    const getCurrency = async () => {
      const response = await fetch(
        "https://api.coindesk.com/v1/bpi/currentprice.json"
      );
      const data = await response.json();
      const currencyObj = data.bpi;
      setCachedCurrencyObj(currencyObj);
      localStorage.setItem("currencyObj", JSON.stringify(currencyObj));
    };

    const cachedData = localStorage.getItem("currencyObj");

    if (cachedData) {
      setCachedCurrencyObj(JSON.parse(cachedData));
    } else {
      getCurrency();
    }
  }, []);

  const currencyObj = useMemo(() => {
    return cachedCurrencyObj;
  }, [cachedCurrencyObj]);

  useEffect(() => {
    if (currencyObj && amount > 0) {
      const selectedCurrencyValue = currencyObj[currency].rate_float;
      setBtcValue((1 / selectedCurrencyValue).toFixed(6) * amount);
    }
  }, [currency, amount, currencyObj]);

  function handleCurrencyChange(e) {
    setCurrency(e.target.value);
  }

  function handleAmountChange(e) {
    setAmount(e.target.value);
  }

  function handleSortChange() {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  }

  function getSortedCurrencyObj() {
    const objKeys = Object.keys(currencyObj);
    const sortedObj = objKeys.sort((a, b) => {
      if (sortOrder === "asc") {
        return currencyObj[a].rate_float - currencyObj[b].rate_float;
      }
      return currencyObj[b].rate_float - currencyObj[a].rate_float;
    });

    return sortedObj.reduce((obj, key) => {
      obj[key] = currencyObj[key];
      return obj;
    }, {});
  }

  return (
    <div className="conversions">
      <form className="conversion-form">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={handleAmountChange}
        />
        <select value={currency} onChange={handleCurrencyChange}>
          {currencyObj &&
            Object.keys(currencyObj).map((key) => (
              <option key={key} value={key}>
                {currencyObj[key].code}
              </option>
            ))}
        </select>
        <p className="btc-value">{btcValue} BTC</p>
      </form>

      <div className="exchange-rates">
        <h3 className="rates-title text-blue-600"> <strong>Exchange Rates</strong> </h3>
       
        <table className="rates-table">
          <thead>
            <tr>
              <th>Currency</th>
              <th>Code</th>
              <th>Rate</th>
            </tr>
          </thead>

          <tbody>
            {currencyObj &&
              Object.entries(getSortedCurrencyObj()).map(([key, value]) => (
                <tr key={key}>
                  <td>{value.description}</td>
                  <td>{value.code}</td>
                  <td>{value.rate}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <br />
        <button className="sort-button mx-auto " onClick={handleSortChange}>
          {sortOrder === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>
    </div>
  );
}

export default Conversions;
