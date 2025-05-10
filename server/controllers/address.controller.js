import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";

export const addAddressController = async (req, res) => {
  try {
    const userId = req.userId; // middleware
    const { address_line, city, state, pincode, country, mobile } = req.body;

    const createdAddress = new AddressModel({
      address_line,
      city,
      state,
      pincode,
      country,
      mobile,
      userId: userId,
    });
    const saveAddress = await createdAddress.save();

    const addUserAddressId = await UserModel.findByIdAndUpdate(userId, {
      $push: {
        address_details: saveAddress._id,
      },
    });

    return res.json({
      message: "Address created successfully",
      error: false,
      success: true,
      data: saveAddress,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getAddressController = async (req, res) => {
  try {
    const userId = req.userId; // middleware
    const data = await AddressModel.find({ userId: userId }).sort({
      createdAt: -1,
    });

    return res.json({
      message: "List of addresses",
      error: false,
      success: true,
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const updateAddressController = async (req, res) => {
  try {
    const userId = req.userId; // middleware auth
    const { _id, address_line, city, state, country, pincode, mobile } =
      req.body;

    const updateAddress = await AddressModel.updateOne(
      { _id: _id, userId: userId },
      {
        address_line,
        city,
        state,
        country,
        mobile,
        pincode,
      }
    );

    return res.json({
      message: "Address Updated",
      error: false,
      success: true,
      data: updateAddress,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteAddressController = async (req, res) => {
  try {
    const userId = req.userId; // middleware auth
    const { _id } = req.body;

    const disableAddress = await AddressModel.updateOne(
      { _id: _id, userId },
      {
        status: false,
      }
    );
    return res.json({
      message: "Address remove",
      error: false,
      success: true,
      data: disableAddress,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
