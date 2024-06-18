import React, { useState, useEffect } from 'react';
import { cartApi, orderApi, restaurantApi } from '../api/api';

function OrderPage() {
  const [cart, setCart] = useState(null);
  const [clientId, setClientId] = useState(1); // Remplacer par l'ID du client réel
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [restaurantName, setRestaurantName] = useState('');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await cartApi.get(`/carts/${clientId}`);
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    const fetchConfirmedOrder = async () => {
      try {
        const response = await orderApi.get(`/orders`);
        const confirmedOrders = response.data.filter(order => order.ID_Client === clientId && order.state !== 'order canceled by client');
        if (confirmedOrders.length > 0) {
          const confirmedOrder = confirmedOrders[0]; // Prendre la première commande confirmée
          setConfirmedOrder(confirmedOrder);
          const restaurantResponse = await restaurantApi.get(`/restaurants?search=${confirmedOrder.ID_Restaurant}`);
          setRestaurantName(restaurantResponse.data[0].nom_Restaurant);
        }
      } catch (error) {
        console.error('Error fetching confirmed orders:', error);
      }
    };

    fetchCart();
    fetchConfirmedOrder();
  }, [clientId]);

  const handleDeleteCart = async () => {
    try {
      if (cart && cart.ID_Cart) {
        await cartApi.delete(`/carts/${cart.ID_Cart}`);
        setCart(null); // Clear the cart from state
        console.log('Cart deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting cart:', error);
    }
  };

  const handleConfirmOrder = async () => {
    try {
      if (cart) {
        const orderData = {
          ID_Client: cart.ID_Client,
          ID_Restaurant: cart.ID_Restaurant,
          price: cart.price,
          articles: cart.articles,
          state: "order confirmed"
        };

        const response = await orderApi.post('/orders', orderData);
        console.log('Order confirmed successfully', response.data);
        handleDeleteCart(); // Delete the cart after confirming the order
        setConfirmedOrder(response.data); // Set the confirmed order in state
        const restaurantResponse = await restaurantApi.get(`/restaurants?search=${response.data.ID_Restaurant}`);
        setRestaurantName(restaurantResponse.data[0].nom_Restaurant);
      }
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await orderApi.put(`/orders/${orderId}`, { state: 'order canceled by client' });
      console.log('Order canceled successfully', response.data);
      // Mettre à jour l'état local pour refléter l'annulation
      setConfirmedOrder(null);
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  return (
    <div>
      <h1>Current Cart</h1>
      {cart ? (
        <div>
          <h2>Cart ID: {cart.ID_Cart}</h2>
          <h3>Restaurant ID: {cart.ID_Restaurant}</h3>
          <ul>
            {cart.articles.map((article, index) => (
              <li key={index}>{article}</li>
            ))}
          </ul>
          <p>Total Price: {cart.price}</p>
          <button onClick={handleDeleteCart}>Delete Cart</button>
          <button onClick={handleConfirmOrder}>Confirm Order</button>
        </div>
      ) : (
        <p>No cart found.</p>
      )}

      <h1>Etat de la commande</h1>
      {confirmedOrder ? (
        <div>
          <p>Restaurant: {restaurantName}</p>
          <ul>
            {confirmedOrder.articles.map((article, index) => (
              <li key={index}>{article}</li>
            ))}
          </ul>
          <p>Total Price: {confirmedOrder.price}</p>
          <p>
            {confirmedOrder.state === 'order confirmed' && `En attente de confirmation par ${restaurantName}`}
            {confirmedOrder.state === 'order accepted by restaurant' && 'En attente de livreur'}
            {confirmedOrder.state === 'order delivery accepted' && 'Livraison pris en charge par <ajouter nom du livreur>'}
            {confirmedOrder.state === 'order completed' && 'Commande livrée'}
          </p>
          {confirmedOrder.state === 'order confirmed' && (
            <button onClick={() => handleCancelOrder(confirmedOrder.ID_Order)}>Annuler la commande</button>
          )}
        </div>
      ) : (
        <p>Aucune commande en cours.</p>
      )}
    </div>
  );
}

export default OrderPage;
