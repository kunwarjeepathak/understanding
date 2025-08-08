import React from 'react';
import { Category } from '../App';

interface CategoryItem { key: Category; label: string; }
interface SidebarProps {
  categories: CategoryItem[];
  active: Category;
  onSelect: (cat: Category) => void;
}

export default function Sidebar({ categories, active, onSelect }: SidebarProps) {
  return (
    <aside className="sidebar">
      <ul>
        {categories.map(cat => (
          <li
            key={cat.key}
            className={active === cat.key ? 'active' : ''}
            onClick={() => onSelect(cat.key)}
            data-cat={cat.key}
          >
            {cat.label}
          </li>
        ))}
      </ul>
    </aside>
  );
}