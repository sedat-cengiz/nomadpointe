// Mock for Supabase client

const mockSupabaseResponse = {
  data: null,
  error: null,
};

const mockSelect = jest.fn().mockReturnValue({
  eq: jest.fn().mockReturnValue({
    order: jest.fn().mockResolvedValue(mockSupabaseResponse),
    single: jest.fn().mockResolvedValue(mockSupabaseResponse),
  }),
  order: jest.fn().mockResolvedValue(mockSupabaseResponse),
  single: jest.fn().mockResolvedValue(mockSupabaseResponse),
});

const mockInsert = jest.fn().mockReturnValue({
  select: jest.fn().mockReturnValue({
    single: jest.fn().mockResolvedValue(mockSupabaseResponse),
  }),
});

const mockUpdate = jest.fn().mockReturnValue({
  eq: jest.fn().mockReturnValue({
    select: jest.fn().mockReturnValue({
      single: jest.fn().mockResolvedValue(mockSupabaseResponse),
    }),
  }),
});

const mockDelete = jest.fn().mockReturnValue({
  eq: jest.fn().mockResolvedValue(mockSupabaseResponse),
});

const mockFrom = jest.fn().mockReturnValue({
  select: mockSelect,
  insert: mockInsert,
  update: mockUpdate,
  delete: mockDelete,
});

export const createClient = jest.fn().mockResolvedValue({
  from: mockFrom,
});

export const mockSupabaseClient = {
  from: mockFrom,
};

// Helper functions to set mock responses
export const setMockSupabaseResponse = (data: unknown, error: unknown = null) => {
  mockSupabaseResponse.data = data as null;
  mockSupabaseResponse.error = error as null;
};

export const resetMockSupabase = () => {
  mockFrom.mockClear();
  mockSelect.mockClear();
  mockInsert.mockClear();
  mockUpdate.mockClear();
  mockDelete.mockClear();
};

