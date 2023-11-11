# Documentación de optiGestion

### como guardar pdf en mongoDB
```javascript
import mongoose from "mongoose"

const pricesResponseSchema = mongoose.Schema({
    firstPrices,
    secondPrices,
    thirdPrices:{
        type: Buffer // El tipo de datos debe ser Buffer para almacenar archivos
    },
    comments:{
        type: String,
        default: "No comments yet"
    }
})

const PricesResponse = mongoose.model('PricesResponse', pricesResponseSchema)

// Para guardar un archivo PDF
const pdfBuffer = fs.readFileSync('ruta/al/archivo.pdf')
const pricesResponse = new PricesResponse({
    firstPrices: 100,
    secondPrices: 200,
    thirdPrices: pdfBuffer
})
pricesResponse.save()

// Para recuperar un archivo PDF
const pricesResponse = await PricesResponse.findOne({ firstPrices: 100 })
const pdfBuffer = pricesResponse.thirdPrices
fs.writeFileSync('ruta/al/archivo.pdf', pdfBuffer)
```
