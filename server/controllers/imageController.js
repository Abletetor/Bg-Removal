import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import userModel from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();

//** Remove Background
const removeBgImage = async (req, res) => {
   try {
      const { clerkId } = req.body;
      const user = await userModel.findOne({ clerkId });

      if (!user) {
         return res.status(404).json({ success: false, message: "User not found" });
      }

      if (user.creditBalance <= 0) {
         return res.status(400).json({ success: false, message: "Insufficient credits", creditBalance: user.creditBalance });
      }

      if (!req.file) {
         return res.status(400).json({ success: false, message: "No image uploaded" });
      }

      const imagePath = req.file.path;
      const imageFile = fs.createReadStream(imagePath);

      const formdata = new FormData();
      formdata.append("image_file", imageFile);
      formdata.append("size", "auto");

      const response = await axios.post("https://api.remove.bg/v1.0/removebg", formdata, {
         headers: {
            ...formdata.getHeaders(),
            "X-Api-Key": process.env.REMOVE_BG_API_KEY,
         },
         responseType: "arraybuffer",
      });

      const base64Image = Buffer.from(response.data, "binary").toString("base64");
      const resultImage = `data:image/png;base64,${base64Image}`;

      const updatedUser = await userModel.findByIdAndUpdate(
         user._id,
         { creditBalance: user.creditBalance - 1 },
         { new: true }
      );

      res.status(200).json({
         success: true,
         resultImage,
         creditBalance: updatedUser.creditBalance,
         message: "Background removed successfully",
      });

   } catch (error) {
      const errData = error?.response?.data;
      const errMessage = errData ? Buffer.from(errData).toString("utf8") : error.message;
      console.error("Error in removeBgImage", errMessage);
      res.status(500).json({ success: false, message: "Background removal failed", details: errMessage });
   }
};

export {
   removeBgImage
};