import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { restaurantApi, cartApi } from '../api/api';

function RestaurantClientPage() {
  const { restaurantId } = useParams();
  const [menus, setMenus] = useState([]);
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState({});
  const [menuArticles, setMenuArticles] = useState({});
  const [clientId, setClientId] = useState(1); // Remplacer par l'ID du client réel

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await restaurantApi.get(`/menus/${restaurantId}`);
        setMenus(response.data);
      } catch (error) {
        console.error('Error fetching menus:', error);
      }
    };

    const fetchArticles = async () => {
      try {
        const response = await restaurantApi.get('/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchMenus();
    fetchArticles();
  }, [restaurantId]);

  const fetchMenuArticles = async (menuId) => {
    try {
      const response = await restaurantApi.get(`/menuArticles/${menuId}`);
      setMenuArticles(prevState => ({ ...prevState, [menuId]: response.data }));
    } catch (error) {
      console.error('Error fetching menu articles:', error);
    }
  };

  const handleArticleChange = (menuId, articleId) => {
    setSelectedArticle({ ...selectedArticle, [menuId]: articleId });
  };

  const handleAddToCart = async (menuId, articleId) => {
    if (!articleId) {
      console.error('No article selected');
      return;
    }

    const article = articles.find(a => a.ID_Article === articleId);
    const price = article ? article.price : 0;

    try {
      await cartApi.post('/carts', {
        ID_Client: clientId,
        ID_Restaurant: parseInt(restaurantId, 10), // Assurez-vous que l'ID du restaurant est un nombre
        ID_Article: articleId,
        price: price // Assurez-vous de transmettre le prix de l'article
      });
      console.log('Article added to cart');
    } catch (error) {
      console.error('Error adding article to cart:', error);
    }
  };

  return (
    <div>
      <h1>Menus for Restaurant {restaurantId}</h1>
      {menus.length > 0 ? (
        <ul>
          {menus.map((menu) => (
            <li key={menu.ID_Menu}>
              <p>ID Menu: {menu.ID_Menu}</p>
              <select
                value={selectedArticle[menu.ID_Menu] || ''}
                onChange={(e) => handleArticleChange(menu.ID_Menu, e.target.value)}
              >
                <option value="">Select an article</option>
                {articles.map((article) => (
                  <option key={article._id} value={article.ID_Article}>
                    {article.article_Name}
                  </option>
                ))}
              </select>
              <button onClick={() => handleAddToCart(menu.ID_Menu, selectedArticle[menu.ID_Menu])}>
                Ajouter au panier
              </button>
              <button onClick={() => fetchMenuArticles(menu.ID_Menu)}>Show Articles</button>
              {menuArticles[menu.ID_Menu] && (
                <ul>
                  {menuArticles[menu.ID_Menu].map(article => (
                    <li key={article._id}>
                      {article.article_Name}
                      <button onClick={() => handleAddToCart(menu.ID_Menu, article.ID_Article)}>
                        Ajouter au panier
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No menus found for this restaurant.</p>
      )}
    </div>
  );
}

export default RestaurantClientPage;
