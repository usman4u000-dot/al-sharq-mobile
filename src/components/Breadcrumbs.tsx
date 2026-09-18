import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex mb-8 text-sm text-gray-500 dark:text-gray-400" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 flex-wrap">
        <li>
          <Link to="/" className="hover:text-brand-blue dark:hover:text-blue-400 transition-colors">Home</Link>
        </li>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li><ChevronRight className="w-4 h-4" /></li>
            <li>
              {item.path ? (
                <Link to={item.path} className="hover:text-brand-blue dark:hover:text-blue-400 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 dark:text-white font-medium" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}
