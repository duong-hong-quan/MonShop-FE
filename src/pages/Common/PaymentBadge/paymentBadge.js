import React from 'react';
import { Badge } from 'react-bootstrap';
import { FaCheckCircle, FaExclamationCircle, FaCreditCard, FaPaypal } from 'react-icons/fa';

function PaymentBadge({ paymentMethod }) {
  let badgeVariant, icon, iconColor;

  switch (paymentMethod.toLowerCase()) {
    case 'pending':
      badgeVariant = 'primary';
      icon = null;
      break;
    case 'momo':
      badgeVariant = 'danger';
      icon = <FaCreditCard />;
      iconColor = 'white';
      break;
    case 'vnpay':
      badgeVariant = 'info';
      icon = <FaCreditCard />;
      iconColor = 'white';
      break;
    case 'paypal':
      badgeVariant = 'info';
      icon = <FaPaypal />;
      iconColor = 'white';
      break;
    default:
      badgeVariant = 'primary';
      icon = null;
  }

  const badgeStyle = {
    backgroundColor: badgeVariant === 'primary' ? '#0d6efd' : badgeVariant === 'danger' ? '#dc3545' : '#0dcaf0',
    color: iconColor || 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width:'80px'
    
  };

  return (
    <Badge style={badgeStyle}>
      {icon} 
      {paymentMethod}
    </Badge>
  );
}

export default PaymentBadge;
