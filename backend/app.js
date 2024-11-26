import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const uri = `mongodb+srv://rw_user:${process.env.DB_PASSWORD}@cluster0.xmggk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = await mongoose.connect(uri);

const app = express();

app.use((req, res, next) => {
  console.log("Requête reçue !");
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: "Votre requête a bien été reçue !" });
  next();
});

app.use((req, res, next) => {
  console.log("Réponse envoyée avec succès !");
});

export default app;
