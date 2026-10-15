import { MongoClient } from 'mongodb'

const globalForMongo = globalThis as unknown as { mongoClient?: MongoClient }

function getClient() {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI is not configured')
  const client = globalForMongo.mongoClient ?? new MongoClient(uri)
  if (process.env.NODE_ENV !== 'production') globalForMongo.mongoClient = client
  return client
}

export async function getDatabase() {
  const client = getClient()
  await client.connect()
  return client.db('atelier_store')
}

export const fallbackProducts = [
  { name: 'Solace Ceramic Mug', category: 'Home goods', price: 28, description: 'Hand-thrown stoneware with a soft satin glaze.', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?auto=format&fit=crop&w=900&q=85', badge: 'Bestseller', rating: 4.9 },
  { name: 'Alba Linen Throw', category: 'Textiles', price: 86, description: 'A breathable linen layer in natural oat.', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=85', badge: 'New', rating: 4.8 },
  { name: 'Noma Brass Tray', category: 'Home goods', price: 64, description: 'A sculptural catch-all finished in brushed brass.', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85', rating: 4.7 },
  { name: 'Onda Glass Carafe', category: 'Kitchen', price: 42, description: 'Clear borosilicate glass for an intentional pour.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=85', rating: 4.9 },
]

export async function ensureProducts() {
  const database = await getDatabase()
  const productsCollection = database.collection('products')
  if (await productsCollection.countDocuments() === 0) await productsCollection.insertMany(fallbackProducts)
  return productsCollection.find({}).sort({ name: 1 }).toArray()
}

export async function seedProducts() { return ensureProducts() }

export type OrderInput = { customer: { name: string; email: string; address: string }; items: { productId: string; quantity: number }[]; total: number }
export async function createOrder(order: OrderInput) {
  const database = await getDatabase()
  return database.collection('orders').insertOne({ ...order, status: 'demo', createdAt: new Date() })
}
