import { CloudClient } from "chromadb";

const client = new CloudClient({
  apiKey: process.env['CHROMA_API_KEY'],
  tenant: 'be7a024d-0ca9-492a-bf00-e0e51ffbee60',
  database: 'Test'
});

export default client;