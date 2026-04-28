import React, { useState } from 'react';

interface Props {
  lang: 'vi' | 'en';
  menuItems: {
    href: string;
    label: {
      vi: string;
      en: string;
    };
  }[];
}

export default function MobileMenu({ lang, menuItems }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        aria-label="Toggle Menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={isOpen ? 'hidden' : 'block'}
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={isOpen ? 'block' : 'hidden'}
        >
          <line x1="18" x2="6" y1="6" y2="18" />
          <line x1="6" x2="18" y1="6" y2="18" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-20 left-0 right-0 bg-foundation border-b border-black/10 dark:border-white/10 p-4 shadow-xl animate-fade-in z-50">
          <ul className="flex flex-col space-y-4">
            {menuItems.map((item) => {
              const href = lang === 'vi' ? item.href : `/en${item.href}`;
              return (
                <li key={item.href}>
                  <a
                    href={href}
                    className="text-lg font-semibold block py-2 hover:text-intellect transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label[lang]}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
