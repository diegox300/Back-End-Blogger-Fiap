import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'

// Carregar variáveis de ambiente do arquivo .env
dotenv.config()

// Configurar o SDK do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Garantir conexão segura
})

export default cloudinary
