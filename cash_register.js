function checkCashRegister(price, cash, cid) {
  const registerStatus = {
    open: "OPEN",
    closed: "CLOSED",
    insufficient: "INSUFFICIENT_FUNDS"
  };
  let change = {status: null, change: []};
  //let due = Math.abs(cash - price);
  let currentSum = 0;
  let changeArr = [];
  let cidVar = cid.map(v => [v[0], Math.round(v[1] * 100)]);
  let priceVar = Math.round(price * 100);
  let cashVar = Math.round(cash * 100);
  let dueVar = cashVar - priceVar;
  let cidVarSum = cidVar.reduce((a, b) => a + b[1], 0);

  const moneyDenomVar = [
    {curr: "ONE HUNDRED", val: 10000},
    {curr: "TWENTY", val: 2000},
    {curr: "TEN", val: 1000},
    {curr: "FIVE", val: 500},
    {curr: "ONE", val: 100},
    {curr: "QUARTER", val: 25},
    {curr: "DIME", val: 10},
    {curr: "NICKEL", val: 5},
    {curr: "PENNY", val: 1}
  ];

  if (cidVarSum === dueVar) {
    change.status = registerStatus.closed
    change.change = cid;
    return change;
    //console.log(change);
  }else if (cidVarSum < dueVar) {
    change.status = registerStatus.insufficient;
    return change;
    //console.log(change);
  }else {
    for (let i = 0; i < moneyDenomVar.length; i++) {
      while (dueVar >= moneyDenomVar[i].val && currentSum < cidVar[8-i][1]) {
        dueVar -= moneyDenomVar[i].val;
        currentSum += moneyDenomVar[i].val;
      }
      if (currentSum > 0) {
        changeArr.push([moneyDenomVar[i].curr, currentSum / 100]);
      } 
    }
    if (dueVar === 0) {
      change.status = registerStatus.open;
      change.change = changeArr;
    }else {
      change.status = registerStatus.insufficient;
    }
    return change;
    //console.log(change); 
    }
  }


checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);