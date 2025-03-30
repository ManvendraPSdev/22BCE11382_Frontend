interface Bucket {
  doc_count: number;
  key: string;
}

interface Aggregation {
  buckets: Bucket[];
  doc_count_error_upper_bound: number;
  sum_other_doc_count: number;
}

interface MarkSource {
  registration_number: string;
  registration_date: number;
  filing_date: number;
  status_date: number;
  renewal_date: number;
  status_code: number;
  status_type: string;
  mark_identification: string;
  law_firm: string;
  attorney_name: string;
  current_owner: string;
  mark_description_code: string[];
  mark_description_description: string[];
  first_use_anywhere_date: number;
  class_codes: string[];
  country: string;
  owner_location?: {
    lat: number;
    lon: number;
  };
  mark_status_key: number;
  is_lrapc: boolean;
}

interface Hit {
  _id: string;
  _index: string;
  _score: number;
  sort: (string | number)[];
  _source: MarkSource;
}

interface TrademarkResponse {
  body: {
    aggregations: {
      attorneys: Aggregation;
      class_codes: Aggregation;
      country: Aggregation;
      current_owners: Aggregation;
      law_firms: Aggregation;
      office_actions: Aggregation;
    };
    hits: {
      hits: Hit[];
      max_score: number;
      total: {
        relation: string;
        value: number;
      };
    };
    _shards: {
      failed: number;
      skipped: number;
      successful: number;
      total: number;
    };
    timed_out: boolean;
    took: number;
  };
  msg: string;
}

export type { TrademarkResponse, Hit, MarkSource, Aggregation, Bucket }; 