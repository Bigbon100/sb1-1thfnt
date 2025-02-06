import React, { useState } from 'react';
import { Search, Calendar, Users, DollarSign } from 'lucide-react';
import { OrderCard } from '../components/dashboard/OrderCard';
import { OrderDetails } from '../components/dashboard/OrderDetails';
import { AnalyticsCard } from '../components/dashboard/AnalyticsCard';
import { SearchBar } from '../components/dashboard/SearchBar';
import { BackButton } from '../components/navigation/BackButton';
import { useOrders } from '../hooks/useOrders';
import type { Order } from '../types/orders';

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { orders, loading, error } = useOrders();

  const filteredOrders = orders?.filter(order => 
    order.customer.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const analytics = {
    totalOrders: orders?.length || 0,
    upcomingEvents: orders?.filter(order => 
      order.delivery_date && new Date(order.delivery_date) > new Date()
    ).length || 0,
    totalRevenue: orders?.reduce((sum, order) => sum + order.gross_total, 0) || 0,
    totalNet: orders?.reduce((sum, order) => sum + order.net_total, 0) || 0
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-6 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Fehler beim Laden</h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-purple-800">Dashboard</h1>
          <BackButton />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AnalyticsCard
            title="Bestellungen Gesamt"
            value={analytics.totalOrders}
            icon={<Users className="text-purple-600" />}
          />
          <AnalyticsCard
            title="Anstehende Events"
            value={analytics.upcomingEvents}
            icon={<Calendar className="text-purple-600" />}
          />
          <AnalyticsCard
            title="Umsatz Gesamt"
            value={`€${analytics.totalRevenue.toFixed(2)}`}
            subtitle={`Netto: €${analytics.totalNet.toFixed(2)}`}
            icon={<DollarSign className="text-purple-600" />}
          />
        </div>

        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="h-4 bg-purple-100 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-purple-100 rounded w-1/2"></div>
              </div>
            ))
          ) : (
            filteredOrders?.map(order => (
              <OrderCard
                key={order.id}
                order={order}
                onClick={() => setSelectedOrder(order)}
              />
            ))
          )}
        </div>

        {selectedOrder && (
          <OrderDetails
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        )}
      </div>
    </div>
  );
}