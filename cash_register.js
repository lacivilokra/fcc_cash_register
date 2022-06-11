function checkCashRegister(price, cash, cid) {
    let registerStatus = {
        open: "OPEN",
        closed: "CLOSED",
        insufficient: "INSUFFICIENT_FUNDS"
      };
      let change = {status: "", change: cid};
      let due = cash - price;
      let cashLeft = cid.reduce((a, b) => a + b[1], 0);
    
      if (due === cashLeft) {
        change.status = registerStatus.closed;
        change.change = cid;
      }else if (due > cashLeft) {
        change.status = registerStatus.insufficient;
        change.change = [];
      }else {
        change.status = registerStatus.open;
        change.change = calculateChange(due, cid);
      }
    
      function calculateChange(due, inDrawer) {
        let changeArr = [];
        let moneyDenomination = {
          "PENNY": 0.01, 
          "NICKEL": 0.05, 
          "DIME": 0.1, 
          "QUARTER": 0.25, 
          "ONE": 1, 
          "FIVE": 5, 
          "TEN": 10, 
          "TWENTY": 20, 
          "ONE HUNDRED": 100
        };
    
        for (let i = inDrawer.length - 1; i >= 0; i--) {
          let currencyName = inDrawer[i][0];
          let currencyTotal = inDrawer[i][1];
          let currencyValue = moneyDenomination[currencyName];
          let currencyAmount = currencyTotal / currencyValue;
          let currencyReturned = 0;
    
          while (due >= currencyValue && currencyAmount) {
            due -= currencyValue;
            currencyAmount--;
            currencyReturned++;
          }
    
          if (currencyReturned > 0) {
            changeArr.push([currencyName, currencyReturned * currencyValue]);
          }
    
          if (due === 0.0) {
            return changeArr;
          }else if (i === 0) {
            change.status = registerStatus.insufficient;
            return [];
          }else {
          }
        }
      }
      return change;
}

checkCashRegister(19.5, 20, [
    ["PENNY", 1.01], 
    ["NICKEL", 2.05], 
    ["DIME", 3.1], 
    ["QUARTER", 4.25], 
    ["ONE", 90], 
    ["FIVE", 55], 
    ["TEN", 20], 
    ["TWENTY", 60], 
    ["ONE HUNDRED", 100]
])