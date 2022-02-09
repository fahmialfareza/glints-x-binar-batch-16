import { Schema, model } from 'mongoose';

// Interface for book model
interface Book {
  title: string;
  author: string;
  isbn?: string;
}

// Schema
const bookSchema = new Schema<Book>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: String,
});

// Export Book Model
export default model<Book>('Book', bookSchema);
