import KhokhaEntryModel from "../models/KhokhaEntryModel.js";

export const khokhaHistoryController = {
  userHistory: async (req, res, _next) => {
    try {
      let { page, size } = req.query;
      if (!page) page = 1;
      if (!size) size = 10;
      const limit = parseInt(size);
      const skip = (parseInt(page) - 1) * limit;
      const history = await KhokhaEntryModel.find({ outlookEmail: req.user.outlookEmail })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      return res.status(200).send({
        page: parseInt(page),
        size: limit,
        history,
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal Server error" });
    }
  },
};
