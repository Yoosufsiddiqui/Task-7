function CurrentRates({ currencyData }) {
  const USD = currencyData.USD.rate_float.toFixed(3);
  const EUR = currencyData.EUR.rate_float.toFixed(3);
  const GBP = currencyData.GBP.rate_float.toFixed(3);

  return (
    <div>
      <h2>
        {USD} $ (USD) to 1 BTC , {(1 / USD).toFixed(6)} BTC to USD{" "}
      </h2>
      <h2>
        {" "}
        {EUR} € (EUR) to 1 BTC , {(1 / EUR).toFixed(6)} BTC to EUR{" "}
      </h2>
      <h2>
        {GBP} £ (GBP) to 1 BTC , {(1 / GBP).toFixed(6)} BTC to GBP
      </h2>
    </div>
  );
}

export default CurrentRates;
