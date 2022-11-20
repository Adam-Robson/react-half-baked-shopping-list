import { useState } from 'react';
import { useItems } from '../../hooks/useItems';
import { toggleListItem, createListItem } from '../../services/items';
import { useUserContext } from '../../context/useUserContext';
import { Redirect } from 'react-router-dom';

export default function Items() {
  const [name, setName] = useState('');
  const [qty, setQty] = useState(0);

  const { items, setItems } = useItems();

  const { user } = useUserContext();

  if (!user) {
    return <Redirect to="/auth/sign-in" />;
  }

  const handleClick = async (item) => {
    try {
      const updatedItem = await toggleListItem(item);
      setItems((prevItems) =>
        prevItems.map((prevItem) => (prevItem.id === item.id ? updatedItem : prevItem))
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e.message);
    }
  };

  const handleNewItem = async () => {
    try {
      await createListItem(name, qty);
      setItems((prev) => [...prev, { name, qty }]);
      setName('');
      setQty(0);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e.message);
    }
  };

  return (
    <section className="things">
      {items.map((item) => (
        <div key={item.id}>
          <label className="checkbox">
            <input
              className="checkbox-input"
              type="checkbox"
              checked={ item.purchased }
              readOnly
              onClick={() => handleClick(item)}
            />
            {item.qty} {item.name}
          </label>
        </div>
      ))}
      <div className="field">
        <input
          className="item-input"
          type="text"
          placeholder="new item"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="qty-input"
          type="number"
          placeholder="qty"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
        />
        <button className="addItem" onClick={handleNewItem}>
          Add
        </button>
      </div>
    </section>
  );
}
