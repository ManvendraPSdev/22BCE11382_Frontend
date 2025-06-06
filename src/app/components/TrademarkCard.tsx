import type { Hit } from '../types';

interface TrademarkCardProps {
  hit: Hit;
  formatDate: (timestamp: number) => string;
}

export const TrademarkCard = ({ hit, formatDate }: TrademarkCardProps) => {
  // Function to determine status color
  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('abandon')) return { bg: '#EF4444', text: '#B91C1C' }; // red
    if (statusLower.includes('pending')) return { bg: '#F59E0B', text: '#B45309' }; // yellow
    if (statusLower.includes('register')) return { bg: '#10B981', text: '#047857' }; // green
    return { bg: '#3B82F6', text: '#1D4ED8' }; // blue - Others
  };

  const statusColor = getStatusColor(hit._source.status_type);

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
      <div className="grid grid-cols-[1fr_1.5fr_1fr_2fr] gap-6 items-start">
        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center p-2">
          <div className="text-gray-700 text-center font-medium">{hit._source.mark_identification}</div>
        </div>
        <div>
          <div className="font-medium text-gray-800 mb-1">{hit._source.mark_identification}</div>
          <div className="text-gray-600 mb-1">{hit._source.current_owner}</div>
          <div className="text-gray-500 text-sm">{hit._source.registration_number}</div>
          <div className="text-gray-500 text-sm">{formatDate(hit._source.filing_date)}</div>
        </div>
        <div>
          <div className="flex items-center gap-2 font-medium mb-1" style={{ color: statusColor.text }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: statusColor.bg }}></span>
            {hit._source.status_type}
          </div>
          <div className="text-gray-500 text-sm">on {formatDate(hit._source.status_date)}</div>
        </div>
        <div>
          <div className="text-gray-700 mb-3 line-clamp-2">
            {hit._source.mark_description_description?.[0]}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {hit._source.class_codes.map((classNum, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
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
  );
}; 