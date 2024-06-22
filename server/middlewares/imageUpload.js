import multer, { diskStorage } from "multer";

const fileStorage = diskStorage(
    {
        destination: (req, file, next) => {
            next(null, "public/images/")
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
            console.log("imageUpload", req.body, file)
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