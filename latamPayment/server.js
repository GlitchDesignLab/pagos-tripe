import express from "express";
import mercadopago from "mercadopago";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_TOKEN,
});

const cupones = {
  DESCUENTOPEPITO: 10,
  DESCUENTOFACUNDO: 10,
};

app.post("/crear-preferencia", async (req, res) => {
  const { email, coupon } = req.body;

  const precioBase = 1000; // Precio base del producto
  const descuento = cupones[coupon?.toUpperCase()] || 0; // Si el cupón es válido, se aplica el descuento
  const precioFinal = Math.round(precioBase * (1 - descuento / 100)); // Precio con descuento aplicado

  const preference = {
    items: [
      {
        unit_price: precioFinal, // Precio con el descuento aplicado
        quantity: 1,
      },
    ],
    payer: {
      email,
    },
    back_urls: {
      success: "https://pasarela-de-pagos-production.up.railway.app/",
      failure: "https://pasarela-de-pagos-production.up.railway.app/",
      pending: "https://pasarela-de-pagos-production.up.railway.app/",
    },
    auto_return: "approved",
  };

  try {
    const resp = await mercadopago.preferences.create(preference);
    res.json({ init_point: resp.body.init_point });
  } catch (err) {
    res.json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
