import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { restaurantApi } from '../api/api';

function MenuPage() {
  const { restaurantId } = useParams();
  const [menus, setMenus] = useState([]);
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState({});
  const [menuArticles, setMenuArticles] = useState({});
  const [newMenu, setNewMenu] = useState({});

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

  const handleCreateMenu = async () => {
    try {
      const response = await restaurantApi.post('/menus', { ID_Restaurant: restaurantId });
      setMenus([...menus, response.data]);
    } catch (error) {
      console.error('Error creating menu:', error);
    }
  };

  const handleArticleChange = (menuId, articleId) => {
    setSelectedArticle({ ...selectedArticle, [menuId]: articleId });
  };

  const handleAddArticleToMenu = async (menuId) => {
    const articleId = selectedArticle[menuId];
    if (!articleId) {
      console.error('No article selected');
      return;
    }

    try {
      await restaurantApi.post('/menuArticles', {
        ID_Menu: menuId,
        ID_Article: articleId,
      });
      fetchMenuArticles(menuId);
      console.log('Article added to menu');
    } catch (error) {
      console.error('Error adding article to menu:', error);
    }
  };

  const handleRemoveArticleFromMenu = async (menuId, articleId) => {
    try {
      await restaurantApi.delete(`/menuArticles/${menuId}/${articleId}`);
      fetchMenuArticles(menuId);
      console.log('Article removed from menu');
    } catch (error) {
      console.error('Error removing article from menu:', error);
    }
  };

  const handleDeleteMenu = async (menuId) => {
    try {
      await restaurantApi.delete(`/menus/${menuId}`);
      setMenus(menus.filter(menu => menu.ID_Menu !== menuId));
      console.log('Menu deleted successfully');
    } catch (error) {
      console.error('Error deleting menu:', error);
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
              <button onClick={() => handleAddArticleToMenu(menu.ID_Menu)}>Add Article to Menu</button>
              <button onClick={() => fetchMenuArticles(menu.ID_Menu)}>Show Articles</button>
              <button onClick={() => handleDeleteMenu(menu.ID_Menu)}>Delete Menu</button>
              {menuArticles[menu.ID_Menu] && (
                <ul>
                  {menuArticles[menu.ID_Menu].map(article => (
                    <li key={article._id}>
                      {article.article_Name}
                      <button onClick={() => handleRemoveArticleFromMenu(menu.ID_Menu, article.ID_Article)}>Delete</button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No menus found. Create a new menu below.</p>
      )}
      <button onClick={handleCreateMenu}>Create Menu</button>
    </div>
  );
}

export default MenuPage;
