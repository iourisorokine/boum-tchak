/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";

import { initializeApp } from "firebase-admin/app";

import { healthCheck, getAllInstruments, getInstrumentById, getInstrumentByName, getStarterPackOfInstruments, createInstrument } from './api'

initializeApp();

const app = express();

app.use(
    cors({
      origin: [
        "http://localhost:*",
        "http://127.0.0.1:5173",
        "http://localhost:5173",
        "https://under-construction-f4c12.web.app",
      ],
    })
  );

app.get("/health-check", healthCheck)

app.get("/instrument", getAllInstruments)
app.get("instrument/starter", getStarterPackOfInstruments)
app.get("/instrument/:id", getInstrumentById)
app.get("/instrument/:name", getInstrumentByName)
app.post("/instrument", createInstrument)

exports.app = functions.https.onRequest(app);
