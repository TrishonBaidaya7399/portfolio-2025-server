import { Schema, model, Document } from 'mongoose';
import { ContactForm } from '../interfaces/ContactForm';

interface MessageDocument extends ContactForm, Document {}

const MessageSchema = new Schema<MessageDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<MessageDocument>('Message', MessageSchema);