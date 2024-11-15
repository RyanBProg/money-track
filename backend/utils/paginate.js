async function paginate(Model, query) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const { sortBy = "name", order = "asc" } = req.query;
  const sortOrder = order === "asc" ? 1 : -1;

  const [transactions, totalItems, transTotal] = await Promise.all([
    Model.find()
      .skip((page - 1) * limit)
      .sort({ [sortBy]: sortOrder })
      .limit(limit),
    Model.countDocuments(),
    Model.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$price" },
        },
      },
    ]),
  ]);

  const total = transTotal.length > 0 ? transTotal[0].total : 0;

  return {
    transactions,
    total,
    totalItems,
    totalPages: Math.ceil(totalItems / limit),
    currentPage: page,
  };
}

module.exports = paginate;
