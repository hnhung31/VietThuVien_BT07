import { useState, useMemo } from 'react';
import { Button, Card, Modal } from '../components';
import styles from './ShoppingCart.module.css';

export interface Product {
  id: number | string;
  name: string;
  price: number;
  image?: string; 
}

export interface CartItem extends Product {
  quantity: number;
}

interface ShoppingCartProps {
  availableProducts: Product[];
}

export const ShoppingCart = ({ availableProducts }: ShoppingCartProps) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const addToCart = (product: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: Product['id']) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: Product['id'], newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const totalCost = useMemo(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);


  return (
    <div>
      <div className={styles.productList}>
        <h3>Sản phẩm có sẵn</h3>
        {availableProducts.map((product) => (
          <Card key={product.id} className={styles.productCard}>
            <h4>{product.name}</h4>
            <p>Giá: {product.price.toLocaleString()}đ</p>
            <Button onClick={() => addToCart(product)}>Thêm vào giỏ</Button>
          </Card>
        ))}
      </div>

      <hr />

      <Button onClick={() => setIsModalOpen(true)}>
        🛒 Giỏ Hàng ({items.reduce((acc, item) => acc + item.quantity, 0)})
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Giỏ Hàng của bạn"
      >
        {items.length === 0 ? (
          <p>Giỏ hàng của bạn đang trống.</p>
        ) : (
          <div>
            {items.map((item) => (
              <Card key={item.id} className={styles.cartItem}>
                <div className={styles.itemInfo}>
                  <strong>{item.name}</strong>
                  <span>{item.price.toLocaleString()}đ</span>
                </div>
                <div className={styles.itemActions}>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className={styles.quantityInput}
                  />
                  <Button variant="danger" onClick={() => removeFromCart(item.id)}>
                    Xóa
                  </Button>
                </div>
              </Card>
            ))}
            <div className={styles.cartTotal}>
              <strong>Tổng cộng:</strong>
              <strong>{totalCost.toLocaleString()}đ</strong>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};