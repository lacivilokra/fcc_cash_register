function checkCashRegister(price, cash, cid) {
  //convert cid (cash-in-drawer) to whole integer
  let newCid = cid.map(v => [v[0], Math.round(v[1] * 100)]);
  //convert cash to whole integer
  let cash1 = Math.round(cash * 100);
  //convert price to whole integer
  let price1 = Math.round(price * 100);
  //cash minus price equals change due back
  let due = cash1 - price1;
  //calculate total cash amount in cid and convert to whole integer
  let total = cid.reduce((a, b) => a + b[1], 0) * 100;
  //result statement template
  let result = {status: null, change: []};

  //if total cash-in-drawer is less than amount due, register funds are insufficient
  if (due > total) {
    result.status = "INSUFFICIENT_FUNDS";
    return result;
  //if total is equal to amount due, register is closed and original cid is returned
  }else if (due === total) {
    result.status = "CLOSED";
    result.change = [...cid];
    return result;
  //calculate change for when register is open
  }else {
    let changeArr = [];
  //denomination values converted to whole integer
    const denom = [
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
    for (let i = 0; i < denom.length; i++) {
        let currentVal = 0;
  //denom and newCid are in opposite order of each other
  //largest denomination is stated first for open status
        while (due >= denom[i].val && currentVal < newCid[8 - i][1]) {
            due -= denom[i].val;
            currentVal += denom[i].val;
        }
  //calculate back to original decimal number by dividing by 100
        if (currentVal > 0) {
            changeArr.push([denom[i].curr, currentVal / 100]);
        }
    }
    if (due === 0) {
        result.status = "OPEN";
        result.change = changeArr;
    }else {
        result.status = "INSUFFICIENT_FUNDS";
    }
    return result;
  }
}


checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);