const REGISTER_STATUS = {
  closed: "CLOSED",
  insufficientFunds: "INSUFFICIENT_FUNDS",
  open: "OPEN",
};

function checkCashRegister(price, cash, cid) {
  let cashRegister = { status: "", change: cid };
  const changeNeeded = parseFloat(cash - price).toFixed(2);
  console.log(changeNeeded);

  // how much change is available in our cash register drawer
  const changeAvailable = getTotalCashRegisterChange(cid);
  console.log(changeAvailable); // this is the total of money we have in the drawer

  // update the status
  cashRegister.status = getTotalCashRegisterStatus(
    changeNeeded,
    changeAvailable
  );

  console.log(cashRegister.status);

  // if insufficient
  if (cashRegister.status === REGISTER_STATUS.insufficientFunds) {
    cashRegister.change = [];
    console.log(cashRegister);
    return cashRegister;
  }

  // if not insufficient

  cashRegister.change = getCustomersChange(changeNeeded, cid);
  console.log(cashRegister);

  if (changeNeeded > getTotalCashRegisterChange(cashRegister.change)) {
    cashRegister.status = REGISTER_STATUS.insufficientFunds;
    cashRegister.change = [];
  }

  if (cashRegister.status === REGISTER_STATUS.closed) {
    cashRegister.change = [...cid];
  }

  return cashRegister;
}

// calculate the change needed to give back
function getCustomersChange(changeNeeded, changeInDrawer) {
  const change = [];

  // let the computer know by creating a dictionary - LOOKUP

  const currencyDictionary = {
    PENNY: 0.01,
    NICKEL: 0.05,
    DIME: 0.1,
    QUARTER: 0.25,
    ONE: 1.0,
    FIVE: 5.0,
    TEN: 10.0,
    TWENTY: 20.0,
    "ONE HUNDRED": 100.0,
  };
  // calculate
  for (let i = changeInDrawer.length - 1; i >= 0; i--) {
    const coinName = changeInDrawer[i][0];
    const coinTotal = changeInDrawer[i][1];
    const coinValue = currencyDictionary[coinName];

    let coinAmount = (coinTotal / coinValue).toFixed(2);
    let coinsToReturn = 0;

    while (changeNeeded >= coinValue && coinAmount > 0) {
      changeNeeded -= coinValue;
      changeNeeded = changeNeeded.toFixed(2);
      coinAmount--;
      coinsToReturn++;
    }

    if (coinsToReturn > 0) {
      change.push([coinName, coinsToReturn * coinValue]);
    }
  }

  return change;
}

// function to check the change available in the drawer
function getTotalCashRegisterChange(changeInDrawer) {
  let total = 0;

  for (let change of changeInDrawer) {
    total += change[1];
  }
  return total.toFixed(2);
}

// function to get the status
function getTotalCashRegisterStatus(changeNeeded, changeAvailable) {
  // if statements to define the status

  if (Number(changeNeeded) > Number(changeAvailable))
    return REGISTER_STATUS.insufficientFunds;

  if (Number(changeNeeded) < Number(changeAvailable))
    return REGISTER_STATUS.open;

  return REGISTER_STATUS.closed;
}

console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100],
  ])
);
