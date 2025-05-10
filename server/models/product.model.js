import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: Array,
      default: [],
    },
    category: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "category",
      },
    ],
    subCategory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "subCategory",
      },
    ],
    unit: {
      type: String,
      default: "",
    },
    stock: {
      type: Number,
      default: null,
    },
    price: {
      type: Number,
      defualt: null,
    },
    discount: {
      type: Number,
      default: null,
    },
    description: {
      type: String,
      default: "",
    },
    more_details: {
      type: Object,
      default: {},
    },
    publish: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// create a text index with weights
productSchema.index(
  {
    name: "text", //The "text" keyword tells MongoDB that this field is searchable.
    description: "text",
  },
  {
    weights: {
      //The weights field sets priority/importance in searches.So if a search matches both the name and description, MongoDB will rank the match in name higher because of the weight
      name: 10,
      description: 5,
    },
  }
);

const ProductModel = mongoose.model("product", productSchema);

export default ProductModel;
