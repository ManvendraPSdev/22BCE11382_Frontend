'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import type { TrademarkResponse, Hit, Aggregation } from './types';
import { TrademarkService } from './services/trademarkService';
import { SearchBar } from './components/SearchBar';
import { TrademarkCard } from './components/TrademarkCard';
import { Filters } from './components/Filters';

export default function Home() {
  // Search and results state
  const [searchQuery, setSearchQuery] = useState('');
  const [trademarks, setTrademarks] = useState<Hit[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  // Filter states
  const [selectedOwners, setSelectedOwners] = useState<string[]>([]);
  const [selectedLawFirms, setSelectedLawFirms] = useState<string[]>([]);
  const [selectedAttorneys, setSelectedAttorneys] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [ownerSearchQuery, setOwnerSearchQuery] = useState('');
  const [lawFirmSearchQuery, setLawFirmSearchQuery] = useState('');
  const [attorneySearchQuery, setAttorneySearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'owners' | 'lawFirms' | 'attorneys'>('owners');

  // Aggregations state
  const [aggregations, setAggregations] = useState<{
    attorneys: Aggregation;
    class_codes: Aggregation;
    current_owners: Aggregation;
    law_firms: Aggregation;
  } | null>(null);
  const [initialAggregations, setInitialAggregations] = useState<{
    attorneys: Aggregation;
    class_codes: Aggregation;
    current_owners: Aggregation;
    law_firms: Aggregation;
  } | null>(null);

  const fetchTrademarks = async () => {
    try {
      setLoading(true);
      const data = await TrademarkService.fetchTrademarks({
        query: searchQuery,
        selectedStatus,
        selectedOwners,
        selectedAttorneys,
        selectedLawFirms,
      });
      
      setTrademarks(data.body.hits.hits);
      setTotalResults(data.body.hits.total.value);
      
      // Store initial aggregations if not already stored
      if (!initialAggregations) {
        setInitialAggregations({
          attorneys: data.body.aggregations.attorneys,
          class_codes: data.body.aggregations.class_codes,
          current_owners: data.body.aggregations.current_owners,
          law_firms: data.body.aggregations.law_firms,
        });
      }
      
      // Update current aggregations
      setAggregations({
        attorneys: data.body.aggregations.attorneys,
        class_codes: data.body.aggregations.class_codes,
        current_owners: data.body.aggregations.current_owners,
        law_firms: data.body.aggregations.law_firms,
      });
    } catch (error) {
      console.error('Error fetching trademarks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrademarks();
  }, [searchQuery, selectedOwners, selectedLawFirms, selectedAttorneys, selectedStatus]);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleSearchQueryChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearch = () => {
    fetchTrademarks();
  };

  const handleStatusChange = (status: string[]) => {
    setSelectedStatus(status);
  };

  const handleTabChange = (tab: 'owners' | 'lawFirms' | 'attorneys') => {
    setActiveTab(tab);
  };

  const handleSearchQueryChangeFilter = (type: 'owners' | 'lawFirms' | 'attorneys', value: string) => {
    switch (type) {
      case 'owners':
        setOwnerSearchQuery(value);
        break;
      case 'lawFirms':
        setLawFirmSearchQuery(value);
        break;
      case 'attorneys':
        setAttorneySearchQuery(value);
        break;
    }
  };

  const handleOwnerChange = (owner: string) => {
    setSelectedOwners(prev => 
      prev.includes(owner) 
        ? prev.filter(o => o !== owner)
        : [...prev, owner]
    );
  };

  const handleLawFirmChange = (firm: string) => {
    setSelectedLawFirms(prev => 
      prev.includes(firm) 
        ? prev.filter(f => f !== firm)
        : [...prev, firm]
    );
  };

  const handleAttorneyChange = (attorney: string) => {
    setSelectedAttorneys(prev => 
      prev.includes(attorney) 
        ? prev.filter(a => a !== attorney)
        : [...prev, attorney]
    );
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header with search */}
      <header className="border-b border-red-500">
        <div className="max-w-[1200px] mx-auto px-4 py-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/Logo.png"
                alt="Trademarkia Logo"
                width={150}
                height={40}
                className="object-contain"
              />
            </Link>
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={handleSearchQueryChange}
              onSearch={handleSearch}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <h2 className="text-gray-700 text-lg font-medium mb-4">
          About {totalResults} Trademarks found for "{searchQuery}"
        </h2>

        {/* Content Grid */}
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Results header */}
            <div className="flex items-center justify-between mb-6 border-b pb-3">
              <div className="grid grid-cols-[1fr_1.5fr_1fr_2fr] gap-6 w-full">
                <div className="font-medium text-gray-700">Mark</div>
                <div className="font-medium text-gray-700">Details</div>
                <div className="font-medium text-gray-700">Status</div>
                <div className="font-medium text-gray-700">Class/Description</div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-8 text-gray-600">Loading...</div>
              ) : (
                trademarks.map((hit) => (
                  <TrademarkCard
                    key={hit._id}
                    hit={hit}
                    formatDate={formatDate}
                  />
                ))
              )}
            </div>
          </div>

          {/* Sidebar Filters */}
          <Filters
            selectedStatus={selectedStatus}
            selectedOwners={selectedOwners}
            selectedLawFirms={selectedLawFirms}
            selectedAttorneys={selectedAttorneys}
            ownerSearchQuery={ownerSearchQuery}
            lawFirmSearchQuery={lawFirmSearchQuery}
            attorneySearchQuery={attorneySearchQuery}
            activeTab={activeTab}
            initialAggregations={initialAggregations}
            onStatusChange={handleStatusChange}
            onTabChange={handleTabChange}
            onSearchQueryChange={handleSearchQueryChangeFilter}
            onOwnerChange={handleOwnerChange}
            onLawFirmChange={handleLawFirmChange}
            onAttorneyChange={handleAttorneyChange}
          />
        </div>
      </div>
    </main>
  );
}
