import multer from 'multer'
import path from 'path'
import fs from 'fs'

// Ensure the uploads directory exists
const uploadDir = './src/uploads/posts/'
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir)
}

// Configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir) // Specify the destination directory for uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname),
    ) // Generate a unique filename
  },
})

// Create the multer instance with the storage configuration
const upload = multer({ storage })

export default upload
