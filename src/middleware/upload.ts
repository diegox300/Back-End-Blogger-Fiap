import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from '../config/cloudinary' // Importando a instância configurada do Cloudinary

// Configurar o armazenamento para o multer usando o Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'uploads', // Especificar a pasta no Cloudinary onde os arquivos serão armazenados
      format: 'png', // Opcional - especificar o formato (por exemplo, 'png', 'jpg')
      public_id:
        file.fieldname +
        '-' +
        Date.now() +
        '-' +
        Math.round(Math.random() * 1e9), // Gerar um nome de arquivo único
    }
  },
})

// Criar a instância do multer com a configuração de armazenamento do Cloudinary
const upload = multer({ storage })

export default upload
