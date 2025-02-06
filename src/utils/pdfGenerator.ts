import { jsPDF } from 'jspdf';
import type { MenuItem } from '../types';
import type { CustomerInfo } from '../types/customer';
import type { PriceCalculation } from './priceCalculator';

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export const generatePDF = async (
  items: MenuItem[], 
  calculation: PriceCalculation,
  customerInfo: CustomerInfo
) => {
  if (!items?.length || !calculation || !customerInfo) {
    console.error('Missing required data for PDF generation');
    return;
  }

  const doc = new jsPDF();
  const margin = 20;
  const contentWidth = 210 - (2 * margin);
  
  const logoUrl = 'https://image.jimcdn.com/app/cms/image/transf/dimension=400x10000:format=jpg/path/s50681800bfbfa8e4/image/i6901015a271efa6e/version/1676479330/image.jpg';
  const img = new Image();
  
  img.onerror = () => {
    console.error('Failed to load logo image');
    generatePDFContent(doc, items, calculation, customerInfo, margin);
  };
  
  img.onload = () => {
    try {
      const imgWidth = 60;
      const imgHeight = (img.height * imgWidth) / img.width;
      doc.addImage(img, 'PNG', (210 - imgWidth) / 2, margin, imgWidth, imgHeight);
      generatePDFContent(doc, items, calculation, customerInfo, margin, imgHeight);
    } catch (error) {
      console.error('Error generating PDF:', error);
      generatePDFContent(doc, items, calculation, customerInfo, margin);
    }
  };

  img.src = logoUrl;
};

function generatePDFContent(
  doc: jsPDF, 
  items: MenuItem[], 
  calculation: PriceCalculation,
  customerInfo: CustomerInfo,
  margin: number,
  logoHeight: number = 0
) {
  let yOffset = logoHeight + margin + 15;

  // Add date and customer information
  doc.setFontSize(11);
  doc.setTextColor(0);
  const currentDate = formatDate(new Date().toISOString());
  doc.text(currentDate, 210 - margin, margin, { align: 'right' });

  // Add customer information
  doc.setFontSize(11);
  doc.setTextColor(0);
  doc.setFont(undefined, 'normal');
  doc.text([
    `Name: ${customerInfo.name}`,
    `E-Mail: ${customerInfo.email}`,
    `Telefon: ${customerInfo.phone}`,
    `Lieferdatum: ${formatDate(customerInfo.date)}`
  ], margin, margin);

  // Add title
  doc.setFontSize(20);
  doc.setTextColor(102, 51, 153);
  doc.text('Ihr persönliches Menü', 105, yOffset, { align: 'center' });
  yOffset += 15;

  // Add menu items grouped by category
  doc.setFontSize(11);
  const groupedItems = items.reduce((acc, item) => {
    const key = item.category;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  Object.entries(groupedItems).forEach(([category, categoryItems]) => {
    // Check if we need a new page
    if (yOffset > 260) {
      doc.addPage();
      yOffset = margin + 10;
    }

    // Add category header
    doc.setTextColor(102, 51, 153);
    doc.setFont(undefined, 'bold');
    doc.text(category, margin, yOffset);
    yOffset += 7;

    // Add items
    doc.setTextColor(0);
    categoryItems.forEach(item => {
      // Check if we need a new page
      if (yOffset > 260) {
        doc.addPage();
        yOffset = margin + 10;
      }

      // Item name and price
      doc.setFont(undefined, 'bold');
      const nameText = `${item.name}`;
      const priceText = `${item.price} ${item.unit}${item.quantity ? ` (${item.quantity}x)` : ''}`;
      
      doc.text(nameText, margin + 5, yOffset);
      doc.text(priceText, 210 - margin, yOffset, { align: 'right' });
      yOffset += 5;

      // Item description if exists
      if (item.description) {
        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);
        doc.text(item.description, margin + 5, yOffset);
        doc.setFontSize(11);
        yOffset += 7;
      } else {
        yOffset += 4;
      }
    });
    yOffset += 5;
  });

  // Add price calculation
  if (yOffset > 240) {
    doc.addPage();
    yOffset = margin + 10;
  }

  yOffset += 5;
  doc.setDrawColor(102, 51, 153);
  doc.line(margin, yOffset, 210 - margin, yOffset);
  yOffset += 10;

  doc.setFont(undefined, 'normal');
  doc.text(`Nettobetrag: ${calculation.netTotal.toFixed(2)} €`, 210 - margin, yOffset, { align: 'right' });
  yOffset += 7;
  doc.text(`MwSt. (7%): ${calculation.vatAmount.toFixed(2)} €`, 210 - margin, yOffset, { align: 'right' });
  yOffset += 7;
  doc.setFont(undefined, 'bold');
  doc.text(`Gesamtbetrag: ${calculation.grossTotal.toFixed(2)} €`, 210 - margin, yOffset, { align: 'right' });

  // Add footer on every page
  const addFooter = (pageNumber: number) => {
    doc.setPage(pageNumber);
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(102, 51, 153);
    
    const footerY = 285;
    
    // Left column
    doc.text([
      'Lavendel Partyservice GbR',
      'N.Sevinc & I.Basak',
      'Döllbachstraße 8',
      '34127 Kassel'
    ], margin, footerY);

    // Right column
    doc.text([
      'Tel.: 0163 5903366',
      'E-Mail: info@lavendel-partyservice.de',
      'Website: lavendel-partyservice.de'
    ], 120, footerY);
  };

  // Add footer to all pages
  for (let i = 1; i <= doc.getNumberOfPages(); i++) {
    addFooter(i);
  }

  // Save the PDF
  try {
    doc.save('lavendel-menu.pdf');
  } catch (error) {
    console.error('Error saving PDF:', error);
  }
}