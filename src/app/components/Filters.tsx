import { FaSearch } from 'react-icons/fa';
import type { Aggregation } from '../types';

interface FiltersProps {
  selectedStatus: string[];
  selectedOwners: string[];
  selectedLawFirms: string[];
  selectedAttorneys: string[];
  ownerSearchQuery: string;
  lawFirmSearchQuery: string;
  attorneySearchQuery: string;
  activeTab: 'owners' | 'lawFirms' | 'attorneys';
  initialAggregations: {
    attorneys: Aggregation;
    class_codes: Aggregation;
    current_owners: Aggregation;
    law_firms: Aggregation;
  } | null;
  onStatusChange: (status: string[]) => void;
  onTabChange: (tab: 'owners' | 'lawFirms' | 'attorneys') => void;
  onSearchQueryChange: (type: 'owners' | 'lawFirms' | 'attorneys', value: string) => void;
  onOwnerChange: (owner: string) => void;
  onLawFirmChange: (firm: string) => void;
  onAttorneyChange: (attorney: string) => void;
}

const statusOptions = [
  { label: 'Registered', value: 'registered', color: 'green' },
  { label: 'Pending', value: 'pending', color: 'yellow' },
  { label: 'Abandoned', value: 'abandoned', color: 'red' },
  { label: 'Others', value: 'others', color: 'blue' }
];

export const Filters = ({
  selectedStatus,
  selectedOwners,
  selectedLawFirms,
  selectedAttorneys,
  ownerSearchQuery,
  lawFirmSearchQuery,
  attorneySearchQuery,
  activeTab,
  initialAggregations,
  onStatusChange,
  onTabChange,
  onSearchQueryChange,
  onOwnerChange,
  onLawFirmChange,
  onAttorneyChange,
}: FiltersProps) => {
  const filteredOwners = (initialAggregations?.current_owners.buckets || []).filter(owner => 
    owner.key.toLowerCase().includes(ownerSearchQuery.toLowerCase())
  );

  const filteredLawFirms = (initialAggregations?.law_firms.buckets || []).filter(firm => 
    firm.key.toLowerCase().includes(lawFirmSearchQuery.toLowerCase())
  );

  const filteredAttorneys = (initialAggregations?.attorneys.buckets || []).filter(attorney => 
    attorney.key.toLowerCase().includes(attorneySearchQuery.toLowerCase())
  );

  return (
    <div className="w-80 flex-shrink-0">
      {/* Status Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <h3 className="font-medium text-gray-800 mb-3">Status</h3>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => onStatusChange([])}
            className={`px-4 py-1.5 rounded-full font-medium ${
              selectedStatus.length === 0 
                ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                : 'text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            All
          </button>
          {statusOptions.map(status => (
            <button
              key={status.value}
              onClick={() => onStatusChange(
                selectedStatus.includes(status.value)
                  ? selectedStatus.filter(s => s !== status.value)
                  : [...selectedStatus, status.value]
              )}
              className={`px-4 py-1.5 rounded-full font-medium flex items-center ${
                selectedStatus.includes(status.value)
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-50'
              } border border-gray-200`}
            >
              <span className={`w-2.5 h-2.5 bg-${status.color}-500 rounded-full mr-2`}></span>
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-800">Filters</h3>
          <div className="flex text-sm">
            <button 
              onClick={() => onTabChange('owners')}
              className={`px-3 py-1.5 font-medium rounded-l ${
                activeTab === 'owners' 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Owners
            </button>
            <button 
              onClick={() => onTabChange('lawFirms')}
              className={`px-3 py-1.5 font-medium ${
                activeTab === 'lawFirms' 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Law Firms
            </button>
            <button 
              onClick={() => onTabChange('attorneys')}
              className={`px-3 py-1.5 font-medium rounded-r ${
                activeTab === 'attorneys' 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Attorneys
            </button>
          </div>
        </div>

        {/* Search input */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={
              activeTab === 'owners' 
                ? ownerSearchQuery 
                : activeTab === 'lawFirms' 
                  ? lawFirmSearchQuery 
                  : attorneySearchQuery
            }
            onChange={(e) => onSearchQueryChange(activeTab, e.target.value)}
            className="w-full px-4 py-2 pl-9 border rounded-lg text-gray-700"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Filter options */}
        <div className="space-y-2.5">
          {activeTab === 'owners' && filteredOwners.map((owner) => (
            <label key={owner.key} className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                className="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-300"
                checked={selectedOwners.includes(owner.key)}
                onChange={() => onOwnerChange(owner.key)}
              />
              <span className="text-gray-700">{owner.key}</span>
              <span className="text-gray-400 text-sm">({owner.doc_count})</span>
            </label>
          ))}

          {activeTab === 'lawFirms' && filteredLawFirms.map((firm) => (
            <label key={firm.key} className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                className="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-300"
                checked={selectedLawFirms.includes(firm.key)}
                onChange={() => onLawFirmChange(firm.key)}
              />
              <span className="text-gray-700">{firm.key}</span>
              <span className="text-gray-400 text-sm">({firm.doc_count})</span>
            </label>
          ))}

          {activeTab === 'attorneys' && filteredAttorneys.map((attorney) => (
            <label key={attorney.key} className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                className="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-300"
                checked={selectedAttorneys.includes(attorney.key)}
                onChange={() => onAttorneyChange(attorney.key)}
              />
              <span className="text-gray-700">{attorney.key}</span>
              <span className="text-gray-400 text-sm">({attorney.doc_count})</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}; 