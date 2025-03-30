'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import type { Hit, Aggregation } from './types';
import { TrademarkService } from './services/trademarkService';
import { SearchBar } from './components/SearchBar';
import { TrademarkCard } from './components/TrademarkCard';
import { Filters } from './components/Filters';
import { FaSearch } from 'react-icons/fa';

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
  const [initialAggregations, setInitialAggregations] = useState<{
    attorneys: Aggregation;
    class_codes: Aggregation;
    current_owners: Aggregation;
    law_firms: Aggregation;
  } | null>(null);

  const fetchTrademarks = useCallback(async () => {
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
    } catch (error) {
      console.error('Error fetching trademarks:', error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedStatus, selectedOwners, selectedAttorneys, selectedLawFirms, initialAggregations]);

  useEffect(() => {
    fetchTrademarks();
  }, [fetchTrademarks]);

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
        <div className="max-w-[1200px] mx-auto px-4 py-2">
          <div className="flex items-center">
            <Link href="/" className="mr-6">
              <Image
                src="/Logo.png"
                alt="Trademarkia Logo"
                width={140}
                height={40}
                priority
                className="object-contain"
                style={{ width: 'auto', height: 'auto' }}
              />
            </Link>
            <div className="flex-1 flex relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Trademark Here eg. Mickey Mouse"
                className="w-full border rounded-l-lg border-r-0 px-4 py-2 text-gray-700"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-8 py-2 rounded-r-lg font-medium"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <h2 className="text-gray-700 text-lg font-medium mb-6">
          About {totalResults} Trademarks found for &ldquo;{searchQuery}&rdquo;
        </h2>

        {/* Content Grid */}
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Results header */}
            <div className="flex mb-4 border-b pb-2">
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
                  <div key={hit._id} className="border rounded-lg p-4">
                    <div className="grid grid-cols-[1fr_1.5fr_1fr_2fr] gap-6 items-start">
                      <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center h-24">
                        <div className="text-center font-medium text-gray-700">
                          {hit._source.mark_identification}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 mb-1">{hit._source.mark_identification}</div>
                        <div className="text-gray-600 mb-1">{hit._source.current_owner}</div>
                        <div className="text-gray-500 text-sm">{hit._source.registration_number}</div>
                        <div className="text-gray-500 text-sm">
                          {formatDate(hit._source.filing_date)}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 font-medium mb-1">
                          <span 
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ 
                              backgroundColor: 
                                hit._source.status_type.toLowerCase().includes('abandon') ? '#EF4444' : 
                                hit._source.status_type.toLowerCase().includes('pending') ? '#F59E0B' :
                                hit._source.status_type.toLowerCase().includes('register') ? '#10B981' :
                                '#3B82F6'
                            }}
                          ></span>
                          <span 
                            style={{ 
                              color: 
                                hit._source.status_type.toLowerCase().includes('abandon') ? '#B91C1C' : 
                                hit._source.status_type.toLowerCase().includes('pending') ? '#B45309' :
                                hit._source.status_type.toLowerCase().includes('register') ? '#047857' :
                                '#1D4ED8'
                            }}
                          >
                            {hit._source.status_type}
                          </span>
                        </div>
                        <div className="text-gray-500 text-sm">
                          on {formatDate(hit._source.status_date)}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-700 mb-3 line-clamp-2">
                          {hit._source.mark_description_description?.[0]}
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {hit._source.class_codes.map((classNum, idx) => (
                            <div key={idx} className="flex items-center gap-1">
                              <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                                {classNum}
                              </span>
                              <span className="text-gray-600 text-sm">Class {classNum}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
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
