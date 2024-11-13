async function paginate(Model, page, limit) {
  const [transactions, totalItems, transTotal] = await Promise.all([
    Model.find()
      .skip((page - 1) * limit)
      .sort({ price: 1 })
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
