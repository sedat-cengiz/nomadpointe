// Mock for next-auth/react
export const useSession = jest.fn(() => ({
  data: null,
  status: 'unauthenticated',
}));

export const signIn = jest.fn();
export const signOut = jest.fn();
export const SessionProvider = ({ children }: { children: React.ReactNode }) => children;

// Helper to mock authenticated session
export const mockAuthenticatedSession = () => {
  (useSession as jest.Mock).mockReturnValue({
    data: {
      user: {
        id: 'test-user-id',
        name: 'Test User',
        email: 'test@example.com',
        image: null,
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    },
    status: 'authenticated',
  });
};

// Helper to mock unauthenticated session
export const mockUnauthenticatedSession = () => {
  (useSession as jest.Mock).mockReturnValue({
    data: null,
    status: 'unauthenticated',
  });
};

// Helper to mock loading session
export const mockLoadingSession = () => {
  (useSession as jest.Mock).mockReturnValue({
    data: null,
    status: 'loading',
  });
};

