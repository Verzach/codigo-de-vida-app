import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { PDFDocument, PDFImage } from "pdf-lib";
import { document } from "./PDFDocument";
import * as FileSystem from "expo-file-system";
import { SERVER_URL } from "../state";
import { createClient } from "./PocketbaseUtil";
import { Record } from "pocketbase";
const pdfbytes = document;

export async function makePDF(
  name: string,
  lastname: string,
  age: string,
  adress: string,
  id: string,
  photo: string,
  record: Record
) {
  const client = await createClient(SERVER_URL);
  const docname = nanoid();
  const uri = FileSystem.documentDirectory + docname + ".pdf";
  const pdfdoc = await PDFDocument.load(pdfbytes);
  const form = pdfdoc.getForm();
  const nameField = form.getTextField("nameField");
  const lastnameField = form.getTextField("lastnameField");
  const ageField = form.getTextField("ageField");
  const adressField = form.getTextField("adressField");
  const idField = form.getTextField("idField");
  const imageField = form.getButton("photoField");
  console.log(photo);
  let pdfImage: PDFImage | undefined = undefined;
  try {
    pdfImage = await pdfdoc.embedPng(
      client.records.getFileUrl(record, record.foto)
    );
  } catch (error) {
    console.error(error);
  }
  nameField.setText(name || "NO DEFINIDO");
  lastnameField.setText(lastname || "NO DEFINIDO");
  ageField.setText(age || "NO DEFINIDO");
  adressField.setText(adress || "NO DEFINIDO");
  idField.setText(id || "NO DEFINIDO");
  if (pdfImage !== undefined) {
    imageField.setImage(pdfImage);
  }
  console.log(uri);
  // const exportPDFBytes = await pdfdoc.saveAsBase64();
  // const bytes = await pdfdoc.save();
  

  // await FileSystem.writeAsStringAsync(uri, exportPDFBytes, {
  //   encoding: FileSystem.EncodingType.Base64,
  // });
  // await Sharing.shareAsync(uri);
}
