class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    let keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryStringCopy = { ...this.queryString };

    // Remove fields
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((field) => delete queryStringCopy[field]);

    // Convert to string
    let queryStr = JSON.stringify(queryStringCopy);

    // Add $ before gt, gte, lt, lte
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    let parsedQuery = JSON.parse(queryStr);

    // 🔥 Convert price filters to numbers
    if (parsedQuery.price) {
      if (parsedQuery.price.$gt) {
        parsedQuery.price.$gt = Number(parsedQuery.price.$gt);
      }
      if (parsedQuery.price.$gte) {
        parsedQuery.price.$gte = Number(parsedQuery.price.$gte);
      }
      if (parsedQuery.price.$lt) {
        parsedQuery.price.$lt = Number(parsedQuery.price.$lt);
      }
      if (parsedQuery.price.$lte) {
        parsedQuery.price.$lte = Number(parsedQuery.price.$lte);
      }
    }

    this.query = this.query.find(parsedQuery);

    return this;
  }

  pagination(perPage) {
    const currentPage = Number(this.queryString.page) || 1;
    const skip = perPage * (currentPage - 1);
    this.query = this.query.limit(perPage).skip(skip);
    return this;
  }
}

module.exports = APIFeatures;
