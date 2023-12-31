const Order = require("../models/order");
const User = require("../models/user");
const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { products, status, total, address } = req.body;
  if (address) {
    await User.findByIdAndUpdate(_id, { address, cart: [] });
  }
  const data = { products, total, orderBy: _id };
  if (status) data.status = status;
  const rs = await Order.create(data);
  return res.json({
    success: rs ? true : false,
    rs: rs ? rs : "Something went wrong",
  });
});

const updateStatus = asyncHandler(async (req, res) => {
  const { oid } = req.params;
  const { status } = req.body;
  if (!status) throw new Error("Mising input");
  const response = await Order.findByIdAndUpdate(
    oid,
    { status },
    { new: true }
  );
  return res.json({
    success: response ? true : false,
    response: response ? response : "Something went wrong",
  });
});

const getUserOrder = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  const { _id } = req.user;
  // tách các trường đặc biệt ra khỏi query
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  // format lại cấu trúc operators cho giống mongoose
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (matchedEl) => `$${matchedEl}`
  );
  const formatedQueries = JSON.parse(queryString);
  let colorQueryObject = {};

  // filering
  // if (queries?.title)
  //   formatedQueries.title = { $regex: queries.title, $option: "i" };
  // if (queries?.category)
  //   formatedQueries.category = { $regex: queries.category, $options: "i" };
  // if (queries?.color) {
  //   delete formatedQueries.color;
  //   const colorArr = queries.color?.split(",");
  //   const colorQuery = colorArr.map((el) => ({
  //     color: { $regex: el, $options: "i" },
  //   }));
  //   colorQueryObject = { $or: colorQuery };
  // }

  // let queryObject = {};
  // if (queries?.q) {
  //   delete formatedQueries.q;
  //   queryObject = {
  //     $or: [
  //       { color: { $regex: queries.q, $options: "i" } },
  //       { title: { $regex: queries.q, $options: "i" } },
  //       { category: { $regex: queries.q, $options: "i" } },
  //       { brand: { $regex: queries.q, $options: "i" } },
  //       { description: { $regex: queries.q, $options: "i" } },
  //     ],
  //   };
  // }

  const qr = { ...formatedQueries, orderBy: _id };
  let queryCommand = Order.find(qr);

  // sorting
  // ex: abc,edg => [abc,edg] => abc edg
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }

  // field limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }

  // pagination (phân trang)
  // giả sử lấy được 10 object 1 2 3 4 ... 10
  // limit: số object lấy về 1 lần gọi API VD: limit = 2 => lấy 1 2
  // skip: bỏ qua số object sau mỗi lần gọi VD: skip = 2 => lấy 3 4 ... 10
  // limit = 2, skip = 2 => bỏ qua 1 2, lấy 3 4
  // string +2 = int 2 :))
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);
  // execute query
  // số lượng sản phẩm thỏa mãn !=== số lượng sản phẩm trả về 1 lần gọi API (hàm exec ko call back đc nên => then | catch)
  queryCommand
    .then(async (response) => {
      const counts = await Order.find(qr).countDocuments();
      return res.status(200).json({
        success: response ? true : false,
        counts,
        oders: response ? response : "Cannot get products",
      });
    })
    .catch((err) => {
      throw new Error(err.message);
    });
});

const getUserOrders = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  // tách các trường đặc biệt ra khỏi query
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  // format lại cấu trúc operators cho giống mongoose
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (matchedEl) => `$${matchedEl}`
  );
  const formatedQueries = JSON.parse(queryString);
  let colorQueryObject = {};

  // filering
  // if (queries?.title)
  //   formatedQueries.title = { $regex: queries.title, $option: "i" };
  // if (queries?.category)
  //   formatedQueries.category = { $regex: queries.category, $options: "i" };
  // if (queries?.color) {
  //   delete formatedQueries.color;
  //   const colorArr = queries.color?.split(",");
  //   const colorQuery = colorArr.map((el) => ({
  //     color: { $regex: el, $options: "i" },
  //   }));
  //   colorQueryObject = { $or: colorQuery };
  // }

  // let queryObject = {};
  // if (queries?.q) {
  //   delete formatedQueries.q;
  //   queryObject = {
  //     $or: [
  //       { color: { $regex: queries.q, $options: "i" } },
  //       { title: { $regex: queries.q, $options: "i" } },
  //       { category: { $regex: queries.q, $options: "i" } },
  //       { brand: { $regex: queries.q, $options: "i" } },
  //       { description: { $regex: queries.q, $options: "i" } },
  //     ],
  //   };
  // }

  const qr = { ...formatedQueries };
  let queryCommand = Order.find(qr);

  // sorting
  // ex: abc,edg => [abc,edg] => abc edg
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }

  // field limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }

  // pagination (phân trang)
  // giả sử lấy được 10 object 1 2 3 4 ... 10
  // limit: số object lấy về 1 lần gọi API VD: limit = 2 => lấy 1 2
  // skip: bỏ qua số object sau mỗi lần gọi VD: skip = 2 => lấy 3 4 ... 10
  // limit = 2, skip = 2 => bỏ qua 1 2, lấy 3 4
  // string +2 = int 2 :))
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);
  // execute query
  // số lượng sản phẩm thỏa mãn !=== số lượng sản phẩm trả về 1 lần gọi API (hàm exec ko call back đc nên => then | catch)
  queryCommand
    .then(async (response) => {
      const counts = await Order.find(qr).countDocuments();
      return res.status(200).json({
        success: response ? true : false,
        counts,
        oders: response ? response : "Cannot get products",
      });
    })
    .catch((err) => {
      throw new Error(err.message);
    });
});

const deleteOrders = asyncHandler(async (req, res) => {
  const { oid } = req.params;
  const deletedProduct = await Order.findByIdAndDelete(oid);
  return res.status(200).json({
    success: deletedProduct ? true : false,
    mes: deletedProduct ? "Deleted" : "Cannot delete order!",
  });
});

module.exports = {
  createOrder,
  updateStatus,
  getUserOrder,
  getUserOrders,
  deleteOrders,
};
