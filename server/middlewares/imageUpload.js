import multer, { diskStorage } from "multer";
import { existsSync, mkdirSync } from "node:fs";

const fileStorage = diskStorage(
    {
        destination: (req, file, next) => {
            // console.log("diskstoreage", req.body, file)
            const { sellerId } = req.body;

            // Creating the directory for the seller to save the images
            const sellerPath = `./public/images/${sellerId}`
            try {
                if (!existsSync(sellerPath)) {
                    mkdirSync(sellerPath, { recursive: true });
                }
            }
            catch (error) {
                console.error(error);
            }

            next(null, sellerPath)
        },
        filename: (req, file, next) => {
            next(null, file.originalname)
        }
    }
)

const uploadImage = multer(
    {
        storage: fileStorage,
        limits: {
            fileSize: 1920 * 1080 * 1
        },
        fileFilter: (req, file, next) => {
            // If file is of png, jpeg, or jpg accept the file
            if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/webp") {
                next(null, true);
            }

            // Return an error if the file of different type
            else {
                next(new Error("File types allowed are .jpg .jpeg .png"));
            }
        }
    }
)

export default uploadImage;