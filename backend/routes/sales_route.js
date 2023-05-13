const express = require("express");
const router = express.Router();
const Sale = require("../models/sales_model");
const authMiddleware = require("../middleware/authMiddleware");

//Adding the Sales
router.post("/addsale", authMiddleware, (req, res) => {
  const { productName, quantity, amount } = req.body;

  if (!productName || !quantity || !amount) {
    return res.status(400).json({ err: "Fill all the mandatory Fields" });
  }
  //   req.user.password = undefined;
  const addSales = new Sale({
    productName: productName,
    quantity: quantity,
    amount: amount,
  });
  addSales
    .save()
    .then((newSales) => {
      res.status(201).json({ sales: newSales });
    })
    .catch((err) => {
      res.status(401).json({ err: "something went wrong" });
      console.log(err);
    });
});

//Getting top 5 sales from our MongoDB database
router.get("/top-five", (req, res) => {
  Sale.find()
    .populate("_id productName quantity amount")
    .sort({ amount: -1 }) // this is responsible for giving us sales in descending form based on the amount
    .limit(5) //give only 5 sales
    .then((topsales) => {
      res.status(200).json({ sales: topsales });
    })
    .catch((err) => {
      res.status(401).json({ err: "Somthing goes wrong" });
      console.log(err);
    });
});

//Gathering revenue
router.get("/revenue", async (req, res) => {
  try {
    const result = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" },
        },
      },
    ]);
    res.json({ totalRevenue: result[0].totalRevenue });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Some server error occured while fetching the revenue",
    });
  }
});

module.exports = router;
