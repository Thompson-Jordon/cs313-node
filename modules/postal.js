// exports.calculateRate = getRate;

function getRate(weight, type) {
  let cost = 0;
  switch (parseInt(type)) {
    case 1:
      if (weight <= 1) {
        cost = 0.55;
      } else if (weight > 1 && weight <= 2) {
        cost = 0.7;
      } else if (weight > 2 && weight <= 3) {
        cost = 0.85;
      } else if (weight > 3 && weight <= 3.5) {
        cost = 1.0;
      } else {
        console.log("see Large Envelope pricing");
      }
      break;
    case 2:
      console.log(`weight ${weight} type ${type}`);
      if (weight <= 1) {
        cost = 0.5;
      } else if (weight > 1 && weight <= 2) {
        cost = 0.65;
      } else if (weight > 2 && weight <= 3) {
        cost = 0.8;
      } else if (weight > 3 && weight <= 3.5) {
        cost = 0.95;
      } else {
        console.log("see Large Envelope pricing");
      }
      break;
    case 3:
      if (weight <= 1) {
        cost = 1.0;
      } else if (weight > 1 && weight <= 2) {
        cost = 1.2;
      } else if (weight > 2 && weight <= 3) {
        cost = 1.4;
      } else if (weight > 3 && weight <= 4) {
        cost = 1.6;
      } else if (weight > 4 && weight <= 5) {
        cost = 1.8;
      } else if (weight > 5 && weight <= 6) {
        cost = 2.0;
      } else if (weight > 6 && weight <= 7) {
        cost = 2.2;
      } else if (weight > 7 && weight <= 8) {
        cost = 2.4;
      } else if (weight > 8 && weight <= 9) {
        cost = 2.6;
      } else if (weight > 9 && weight <= 10) {
        cost = 2.8;
      } else if (weight > 10 && weight <= 11) {
        cost = 3.0;
      } else if (weight > 11 && weight <= 12) {
        cost = 3.2;
      } else if (weight > 12 && weight <= 13) {
        cost = 3.4;
      } else {
        console.log("Error weight is too heavy for large envelopes");
      }
      break;
    case 4:
      if (weight <= 4) {
        cost = 3.8;
      } else if (weight > 4 && weight <= 8) {
        cost = 4.6;
      } else if (weight > 8 && weight <= 12) {
        cost = 5.3;
      } else if (weight > 12 && weight <= 13) {
        cost = 5.9;
      } else {
        console.log("Error weight is too heavy for Retail Parcels");
      }
      break;
    default:
      console.log("Error did not enter valid switch cases");
      break;
  }
  let dollars = "$" + cost.toFixed(2);
  return dollars;
}

exports.displayRates = (req, res) => {
  let weight = req.body.weight;
  let type = req.body.type;

  let cost = getRate(weight, type);
  console.log("The cost is: " + cost);

  let params = {
    weight: weight,
    type: type,
    cost: cost
  };

  res.render("pages/rates", params);
};
