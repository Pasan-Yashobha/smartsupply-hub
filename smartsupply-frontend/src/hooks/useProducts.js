import { useState, useEffect, useCallback } from 'react';
import {
  getProducts,
  getProductsBySupplier,
  getAllProductsForStats
} from '../api/inventoryApi';

const useProducts = (token) => {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    avgMargin: 0,
    supplierBreakdown: [],
    marginData: []
  });
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activityLog, setActivityLog] = useState([]);

  const addToActivityLog = useCallback((product, source) => {
    const now = new Date();
    const time = now.toTimeString().slice(0, 8);
    const entry = {
      id: `${Date.now()}-${Math.random()}`,
      time,
      productId: product.productId,
      name: product.name,
      supplier: product.supplier,
      source: source || product.source,
      color: product.source === 'SUPPLIER_A_REST'
        ? 'blue'
        : product.source === 'SUPPLIER_B_REST'
        ? 'amber'
        : 'green'
    };
    setActivityLog(prev => [entry, ...prev].slice(0, 50));
  }, []);

  const fetchProducts = useCallback(async (pageNum = 0) => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts(token, pageNum, 20);
      setProducts(data.content || []);
      setTotalPages(data.totalPages || 0);
      setPage(pageNum);

      if (data.content && data.content.length > 0) {
        data.content.slice(0, 3).forEach(p => addToActivityLog(p));
      }
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [token, addToActivityLog]);

  const fetchStats = useCallback(async () => {
    if (!token) return;
    try {
      const data = await getAllProductsForStats(token);
      const allProducts = data.content || [];

      const totalProducts = data.totalElements || 0;

      const avgMargin = allProducts.length > 0
        ? (allProducts.reduce((sum, p) => sum + p.margin, 0) / allProducts.length).toFixed(1)
        : 0;

      const supplierMap = {};
      allProducts.forEach(p => {
        supplierMap[p.supplier] = (supplierMap[p.supplier] || 0) + 1;
      });
      const supplierBreakdown = Object.entries(supplierMap).map(([name, count]) => ({
        name: name.replace('SUPPLIER_', 'Supplier '),
        count
      }));

      const marginRanges = {
        '0-50': 0,
        '51-100': 0,
        '101-150': 0,
        '151-200': 0,
        '200+': 0
      };
      allProducts.forEach(p => {
        if (p.margin <= 50) marginRanges['0-50']++;
        else if (p.margin <= 100) marginRanges['51-100']++;
        else if (p.margin <= 150) marginRanges['101-150']++;
        else if (p.margin <= 200) marginRanges['151-200']++;
        else marginRanges['200+']++;
      });
      const marginData = Object.entries(marginRanges).map(([range, count]) => ({
        range,
        count
      }));

      setStats({ totalProducts, avgMargin, supplierBreakdown, marginData });
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchProducts(0);
      fetchStats();
    }
  }, [token, fetchProducts, fetchStats]);

  useEffect(() => {
    if (!token) return;
    const interval = setInterval(() => {
      fetchStats();
      fetchProducts(page);
    }, 30000);
    return () => clearInterval(interval);
  }, [token, page, fetchProducts, fetchStats]);

  return {
    products,
    stats,
    page,
    totalPages,
    loading,
    error,
    activityLog,
    fetchProducts,
    setPage: fetchProducts
  };
};

export default useProducts;