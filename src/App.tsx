import React from 'react';

import { ShoppingCart, Button, Card, Modal } from './index';
import type { Product } from './index';

const SAMPLE_PRODUCTS: Product[] = [
  { id: 1, name: 'Laptop Pro 2025', price: 30000000 },
  { id: 2, name: 'Chuột không dây X', price: 500000 },
  { id: 3, name: 'Bàn phím cơ Z', price: 1200000 },
];

function App() {
  const [isTestModalOpen, setIsTestModalOpen] = React.useState(false);

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Viết thư viện Giỏ hàng</h1>
      <p>Đây là khu vực để kiểm tra các component trước khi đóng gói.</p>
      
      <hr style={{ margin: '20px 0' }} />

      <h2>1. Component Giỏ Hàng</h2>
      <ShoppingCart availableProducts={SAMPLE_PRODUCTS} />

      <hr style={{ margin: '20px 0' }} />

      <h2>2. Component UI riêng lẻ</h2>
      
      <h4>Thử Button:</h4>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button onClick={() => alert('Primary Clicked!')}>Primary Button</Button>
        <Button variant="danger" onClick={() => alert('Danger Clicked!')}>Danger Button</Button>
        <Button disabled>Disabled Button</Button>
      </div>
      
      <h4>Thử Card:</h4>
      <Card style={{ maxWidth: '300px', marginTop: '10px' }}>
        Đây là nội dung bên trong một cái Card.
      </Card>

      <h4>Thử Modal:</h4>
      <Button onClick={() => setIsTestModalOpen(true)} style={{ marginTop: '10px' }}>
        Mở Modal Test
      </Button>
      <Modal 
        isOpen={isTestModalOpen} 
        onClose={() => setIsTestModalOpen(false)}
        title="Đây là Modal Test"
      >
        <p>Nội dung của modal.</p>
        <Button onClick={() => setIsTestModalOpen(false)}>Đóng</Button>
      </Modal>

    </div>
  );
}

export default App;