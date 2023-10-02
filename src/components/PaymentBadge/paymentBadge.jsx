import React from 'react';
import { Badge } from 'react-bootstrap';
import { FaCheckCircle, FaExclamationCircle, FaCreditCard, FaPaypal } from 'react-icons/fa';
import './paymentBadge.scss';
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
    case 'paypal':
      badgeVariant = 'info';
      icon = paymentMethod === 'vnpay' ? <FaCreditCard /> : <FaPaypal />;
      iconColor = 'white';
      break;
    default:
      badgeVariant = 'primary';
      icon = null;
  }

  const badgeClassName = `custom-badge ${badgeVariant} ${iconColor === 'white' ? 'white-text' : ''}`;

  return (
    <Badge className={badgeClassName} style={{ margin: '0 5px', padding:'10px' }}>
      <span > {icon}</span>
      <span>{paymentMethod}</span>
    </Badge>
  );
}

export default PaymentBadge;
