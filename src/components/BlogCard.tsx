import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Laptop, Smartphone, TrendingUp } from 'lucide-react';
import { BlogPost } from '../data/blogs';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'MacBook & Laptop Authority':
      return <Laptop className="w-5 h-5 text-indigo-500" />;
    case 'Smartphone & iPhone Expertise':
      return <Smartphone className="w-5 h-5 text-emerald-500" />;
    case 'Trading & Local Consumer Tips':
      return <TrendingUp className="w-5 h-5 text-amber-500" />;
    default:
      return null;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'MacBook & Laptop Authority':
      return 'bg-indigo-50 text-indigo-700 border-indigo-100';
    case 'Smartphone & iPhone Expertise':
      return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    case 'Trading & Local Consumer Tips':
      return 'bg-amber-50 text-amber-700 border-amber-100';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-100';
  }
};

export const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group flex flex-col justify-between bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-300"
    >
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-slate-50 rounded-lg">
            {getCategoryIcon(post.category)}
          </div>
          <span className={`text-xs font-medium px-3 py-1 rounded-full border ${getCategoryColor(post.category)}`}>
            {post.category}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          <span className="font-medium text-slate-900">The Hook:</span> {post.hook}
        </p>
      </div>

      <div className="flex items-center text-sm font-medium text-indigo-600 group-hover:text-indigo-700 transition-colors cursor-pointer">
        Read Article
        <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.article>
  );
};
