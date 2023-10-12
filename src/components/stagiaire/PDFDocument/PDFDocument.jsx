import React from 'react';
import { Page, Document, StyleSheet } from '@react-pdf/renderer';
import Header from '../header/Header';
import Contact from '../contact/Contact';
import Competences from '../competences/Competences';
import Experiences from '../experiences/Experiences';
import Formations from '../formation/Formations';
import Interet from '../interet/Interet';



const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 30,
    paddingBottom: 60,
    paddingHorizontal: 30,
  },
});

const PDFDocument = ({ stagiaireData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Header header={stagiaireData} />
      <Contact />
      <Competences header={stagiaireData} />
      <Experiences experiences={stagiaireData.experiences} />
      <Formations formations={stagiaireData.formations} />
      <Interet interets={stagiaireData.interets} />
    </Page>
  </Document>
);

export default PDFDocument;
