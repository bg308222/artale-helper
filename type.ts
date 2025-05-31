// 使用者角色資訊
interface UserCharacter {
    character_id: string;
    discord_username: string | null;
    show_discord_username: boolean;
}

// 單一交易記錄
interface ScrollTransaction {
    id: number;
    character_id: string;
    item_type: string;
    item_name: string;
    currency: string;
    amount: number;
    quantity: number;
    transaction_type: 'sell' | 'buy';
    created_at: string; // ISO 格式時間
    updated_at: string;
    additional_props_id: number | null;
    is_active: boolean;
    completed_status: string | null;
    completed_price: number | null;
    completed_currency: string | null;
    user_character_id: number;
    user_character: UserCharacter;
    additional_props: any; // 若你有詳細結構可以再補
}

// 分頁資訊
interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// 過濾條件
interface ScrollTransactionFilters {
    characterId: string | null;
    itemName: string | null;
    isActive: string | null;
    transactionType: 'sell' | 'buy' | null;
    currency: string | null;
    minAmount: number | null;
    maxAmount: number | null;
    minQuantity: number | null;
    maxQuantity: number | null;
    startDate: string | null;
    endDate: string | null;
    minHp: number | null;
    maxHp: number | null;
    minMp: number | null;
    maxMp: number | null;
    minPhysicalAttack: number | null;
    maxPhysicalAttack: number | null;
    minPhysicalDefense: number | null;
    maxPhysicalDefense: number | null;
    minMagicAttack: number | null;
    maxMagicAttack: number | null;
    minMagicDefense: number | null;
    maxMagicDefense: number | null;
    minStrength: number | null;
    maxStrength: number | null;
    minDexterity: number | null;
    maxDexterity: number | null;
    minIntelligence: number | null;
    maxIntelligence: number | null;
    minLuck: number | null;
    maxLuck: number | null;
    minAccuracy: number | null;
    maxAccuracy: number | null;
    minAvoidance: number | null;
    maxAvoidance: number | null;
    minJump: number | null;
    maxJump: number | null;
    minMovement: number | null;
    maxMovement: number | null;
    minScrollCount: number | null;
    maxScrollCount: number | null;
}

// 排序條件
interface ScrollTransactionSorting {
    sortKey: string;
    sortDirection: 'asc' | 'desc';
}

// 主回應結構
export interface ScrollTransactionResponse {
    results: ScrollTransaction[];
    pagination: Pagination;
    filters: ScrollTransactionFilters;
    sorting: ScrollTransactionSorting;
}
