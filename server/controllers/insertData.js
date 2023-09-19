const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const categoryData = require("../../data/cate_brand");
const productCategory = require("../models/productCategory");

const fn2 = async (cate) => {
  await productCategory.create({
    title: cate?.cate,
    brand: cate?.brand,
  });
};
const insertCategory = asyncHandler(async (req, res) => {
  const promises = [];
  console.log(categoryData);
  for (let cate of categoryData) promises.push(fn2(cate));
  await Promise.all(promises);
  return res.json("Done");
});

module.exports = {
  insertCategory,
};
