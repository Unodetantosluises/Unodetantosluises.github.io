import { useEffect } from 'react';

/**
 * useDocumentTitle Hook
 * 
 * Actualiza el título del documento (document.title) dinámicamente
 * al montar o cambiar el valor proporcionado en cada página/vista.
 * 
 * @param {string} title - Título deseado para la pestaña del navegador.
 */
export const useDocumentTitle = (title) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);
};

export default useDocumentTitle;
