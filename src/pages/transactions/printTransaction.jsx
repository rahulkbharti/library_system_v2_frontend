// src/utils/printUtils.js
import React from 'react';
import ReactDOM from 'react-dom';
import { format } from 'date-fns';

// Function to print any React component
export const printComponent = (component, options = {}) => {
  const {
    title = 'Document',
    styles = '',
    onAfterPrint = () => {}
  } = options;

  // Create a container for the printable content
  const printContainer = document.createElement('div');
  printContainer.id = 'print-container';
  printContainer.style.display = 'none';
  
  // Apply print-specific styles
  const styleElement = document.createElement('style');
  styleElement.innerHTML = `
    @media print {
      body, html {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
      }
      @page {
        margin: 0.5cm;
      }
      .no-print {
        display: none !important;
      }
      .print-container {
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background: #fff;
        color: #000;
      }
      .print-header {
        text-align: center;
        margin-bottom: 20px;
        border-bottom: 2px solid #333;
        padding-bottom: 10px;
      }
      .print-logo {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .print-title {
        font-size: 20px;
        font-weight: bold;
      }
      .print-section {
        margin-bottom: 15px;
        page-break-inside: avoid;
      }
      .section-title {
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 8px;
        color: #2c3e50;
        border-bottom: 1px solid #eee;
        padding-bottom: 5px;
      }
      .detail-item {
        display: flex;
        margin-bottom: 5px;
      }
      .detail-label {
        width: 150px;
        font-weight: bold;
      }
      .detail-value {
        flex: 1;
      }
      .print-footer {
        margin-top: 30px;
        padding-top: 10px;
        border-top: 1px solid #eee;
        text-align: center;
        font-size: 12px;
        color: #666;
      }
      ${styles}
    }
  `;
  
  document.head.appendChild(styleElement);
  document.body.appendChild(printContainer);
  
  // Render the component to the print container
  ReactDOM.render(
    <div className="print-container">
      <div className="print-header">
        <div className="print-logo">LIBRARY SYSTEM</div>
        <div className="print-title">{title}</div>
      </div>
      {component}
      <div className="print-footer">
        Generated on {format(new Date(), 'MMM dd, yyyy hh:mm a')}
      </div>
    </div>,
    printContainer
  );
  
  // Open print dialog
  setTimeout(() => {
    const printWindow = window.open('', '_blank');
    const content = `
      <html>
        <head>
          <title>${title}</title>
          <style>${styleElement.innerHTML}</style>
        </head>
        <body>
          ${printContainer.innerHTML}
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() {
                window.close();
              }, 500);
            }
          </script>
        </body>
      </html>
    `;
    
    printWindow.document.write(content);
    printWindow.document.close();
    
    // Clean up
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(printContainer);
      document.body.removeChild(printContainer);
      document.head.removeChild(styleElement);
      onAfterPrint();
    }, 1000);
  }, 100);
};

// Specific print function for transactions
export const printTransaction = (transaction, book, member) => {
  // Calculate days overdue and fine
  const daysOverdue = Math.max(0, Math.floor((new Date() - new Date(transaction.dueDate)) / (1000 * 60 * 60 * 24)));
  const fineAmount = daysOverdue * 0.5; // $0.50 per day
  
  const statusBadge = (
    <span style={{
      backgroundColor: transaction.status === 'returned' ? '#4caf5020' : 
                     transaction.status === 'overdue' ? '#f4433620' : '#ff980020',
      color: transaction.status === 'returned' ? '#4caf50' : 
             transaction.status === 'overdue' ? '#f44336' : '#ff9800',
      padding: '4px 12px',
      borderRadius: '20px',
      fontWeight: 600
    }}>
      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
    </span>
  );
  
  const transactionComponent = (
    <div>
      <div className="print-section">
        <div className="section-title">Transaction Details</div>
        <div className="detail-item">
          <div className="detail-label">ID:</div>
          <div className="detail-value">#{transaction.id}</div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Status:</div>
          <div className="detail-value">{statusBadge}</div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Issue Date:</div>
          <div className="detail-value">{format(new Date(transaction.issueDate), 'MMM dd, yyyy')}</div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Due Date:</div>
          <div className="detail-value">{format(new Date(transaction.dueDate), 'MMM dd, yyyy')}</div>
        </div>
        {transaction.returnDate && (
          <div className="detail-item">
            <div className="detail-label">Return Date:</div>
            <div className="detail-value">{format(new Date(transaction.returnDate), 'MMM dd, yyyy')}</div>
          </div>
        )}
        {transaction.status === 'overdue' && (
          <>
            <div className="detail-item">
              <div className="detail-label">Days Overdue:</div>
              <div className="detail-value">{Math.round(daysOverdue)} days</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Fine Amount:</div>
              <div className="detail-value" style={{ fontWeight: 800, color: '#f44336' }}>
                ${fineAmount.toFixed(2)}
              </div>
            </div>
          </>
        )}
      </div>
      
      <div className="print-section">
        <div className="section-title">Book Information</div>
        {book ? (
          <>
            <div className="detail-item">
              <div className="detail-label">Title:</div>
              <div className="detail-value" style={{ fontWeight: 600 }}>{book.title}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Author:</div>
              <div className="detail-value">{book.author}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">ISBN:</div>
              <div className="detail-value">{book.isbn}</div>
            </div>
          </>
        ) : (
          <div className="detail-item">
            <div className="detail-value" style={{ color: '#f44336' }}>Book details not found</div>
          </div>
        )}
      </div>
      
      <div className="print-section">
        <div className="section-title">Member Information</div>
        {member ? (
          <>
            <div className="detail-item">
              <div className="detail-label">Name:</div>
              <div className="detail-value" style={{ fontWeight: 600 }}>{member.name}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Email:</div>
              <div className="detail-value">{member.email}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Membership:</div>
              <div className="detail-value">{member.membership}</div>
            </div>
          </>
        ) : (
          <div className="detail-item">
            <div className="detail-value" style={{ color: '#f44336' }}>Member details not found</div>
          </div>
        )}
      </div>
      
      <div className="print-section">
        <div className="section-title">Notes</div>
        <div className="detail-item">
          <div className="detail-value">
            Thank you for using our library services. Please keep this receipt for your records.
          </div>
        </div>
      </div>
    </div>
  );
  
  printComponent(transactionComponent, {
    title: `Transaction Receipt #${transaction.id}`,
    styles: `
      .print-container {
        border: 1px solid #ddd;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
      }
      .print-header {
        border-bottom: 2px solid #3f51b5;
      }
      .print-logo {
        color: #3f51b5;
      }
    `,
    onAfterPrint: () => console.log('Transaction printed successfully')
  });
};