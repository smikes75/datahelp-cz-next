'use client';

/**
 * Pagination komponenta pro stránkování článků
 * Odpovídá designu z oldprototype
 */

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string; // např. "/clanky" nebo "/clanky?category=novinky"
}

export function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    if (currentPage > 3) {
      pages.push('ellipsis-start');
    }

    // Show pages around current
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    if (currentPage < totalPages - 2) {
      pages.push('ellipsis-end');
    }

    // Always show last page
    if (!pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const buildUrl = (page: number) => {
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}page=${page}`;
  };

  const buttonBaseClass = "flex items-center justify-center min-w-[44px] h-[44px] rounded-lg border-2 transition-all font-medium";
  const activeClass = "bg-primary text-white border-primary shadow-md";
  const inactiveClass = "bg-white text-primary border-primary hover:bg-primary/10 hover:shadow-sm";
  const disabledClass = "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed pointer-events-none";

  return (
    <div className="flex flex-col items-center gap-4 mt-12">
      {/* Desktop Navigation */}
      <div className="hidden sm:flex items-center gap-2">
        {/* Previous Button */}
        <a
          href={currentPage > 1 ? buildUrl(currentPage - 1) : undefined}
          className={`${buttonBaseClass} px-4 ${
            currentPage === 1 ? disabledClass : inactiveClass
          }`}
          aria-label="Předchozí stránka"
          aria-disabled={currentPage === 1}
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Předchozí
        </a>

        {/* Page Numbers */}
        <div className="flex gap-2">
          {pageNumbers.map((page, index) => {
            if (typeof page === 'string') {
              return (
                <span
                  key={`${page}-${index}`}
                  className="flex items-center justify-center min-w-[44px] h-[44px] text-gray-500"
                >
                  ...
                </span>
              );
            }

            return (
              <a
                key={page}
                href={buildUrl(page)}
                className={`${buttonBaseClass} ${
                  page === currentPage ? activeClass : inactiveClass
                }`}
                aria-label={`Stránka ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </a>
            );
          })}
        </div>

        {/* Next Button */}
        <a
          href={currentPage < totalPages ? buildUrl(currentPage + 1) : undefined}
          className={`${buttonBaseClass} px-4 ${
            currentPage === totalPages ? disabledClass : inactiveClass
          }`}
          aria-label="Další stránka"
          aria-disabled={currentPage === totalPages}
        >
          Další
          <ChevronRight className="w-5 h-5 ml-1" />
        </a>
      </div>

      {/* Mobile Navigation - Simplified */}
      <div className="flex sm:hidden items-center gap-3">
        {/* Previous */}
        <a
          href={currentPage > 1 ? buildUrl(currentPage - 1) : undefined}
          className={`${buttonBaseClass} ${
            currentPage === 1 ? disabledClass : inactiveClass
          }`}
          aria-label="Předchozí"
          aria-disabled={currentPage === 1}
        >
          <ChevronLeft className="w-5 h-5" />
        </a>

        {/* Current page indicator */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-primary min-w-[32px] text-center">
            {currentPage}
          </span>
          <span className="text-gray-400">/</span>
          <span className="text-lg text-gray-600 min-w-[32px] text-center">
            {totalPages}
          </span>
        </div>

        {/* Next */}
        <a
          href={currentPage < totalPages ? buildUrl(currentPage + 1) : undefined}
          className={`${buttonBaseClass} ${
            currentPage === totalPages ? disabledClass : inactiveClass
          }`}
          aria-label="Další"
          aria-disabled={currentPage === totalPages}
        >
          <ChevronRight className="w-5 h-5" />
        </a>
      </div>

      {/* Page Info - Desktop only */}
      <div className="hidden sm:block text-sm text-gray-600">
        Stránka <span className="font-semibold text-primary">{currentPage}</span> z{' '}
        <span className="font-semibold text-primary">{totalPages}</span>
      </div>
    </div>
  );
}
