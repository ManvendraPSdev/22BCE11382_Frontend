import type { TrademarkResponse } from '../types';

export class TrademarkService {
  private static readonly API_URL = 'https://vit-tm-task.api.trademarkia.app/api/v3/us';

  static async fetchTrademarks(params: {
    query: string;
    selectedStatus: string[];
    selectedOwners: string[];
    selectedAttorneys: string[];
    selectedLawFirms: string[];
  }): Promise<TrademarkResponse> {
    const response = await fetch(this.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input_query: params.query || "check",
        input_query_type: "",
        sort_by: "default",
        status: params.selectedStatus,
        exact_match: false,
        date_query: false,
        owners: params.selectedOwners,
        attorneys: params.selectedAttorneys,
        law_firms: params.selectedLawFirms,
        mark_description_description: [],
        classes: [],
        page: 1,
        rows: 10,
        sort_order: "desc",
        states: [],
        counties: []
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
} 