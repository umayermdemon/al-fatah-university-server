import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public queryModel: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(queryModel: Query<T[], T>, query: Record<string, unknown>) {
    this.queryModel = queryModel;
    this.query = query;
  }

  // search query
  search(searchAbleFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.queryModel = this.queryModel.find({
        $or: searchAbleFields.map(
          field =>
            ({
              [field]: { $regex: searchTerm, $options: "i" },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  // filterQuery
  filter() {
    const queryObj = { ...this.query }; //copy query
    const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
    excludeFields.forEach(el => delete queryObj[el]);
    this.queryModel = this.queryModel.find(queryObj);
    return this;
  }

  // sort query
  sort() {
    const sort = this?.query?.sort || "-createdAt";
    this.queryModel = this.queryModel.sort(sort as string);
    return this;
  }
  // paginate query
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit);
    const skip = (page - 1) * limit;

    this.queryModel = this?.queryModel?.skip(skip)?.limit(limit);
    return this;
  }

  // limit query
  fields() {
    const fields =
      (this?.query?.fields as string)?.split(",")?.join(" ") || "-__v";
    this.queryModel = this.queryModel.select(fields);
    return this;
  }
}

export default QueryBuilder;
