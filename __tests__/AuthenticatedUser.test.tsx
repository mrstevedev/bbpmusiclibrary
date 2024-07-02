import { screen, render } from "@testing-library/react";
import AuthenticatedUser from "@/components/AuthUser/AuthUser";

// Mock useRouter
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("Test header component", () => {
  it("Should display the username after login", () => {
    render(
      <AuthenticatedUser
        user={{
          userId: 16,
          userNiceName: "eckosneekz",
          userEmail: "stevendotpulido@gmail.com",
        }}
        setUser={() => {}}
      />
    );
    const authUser = screen.getByTestId("auth-user");
    expect(authUser).toBeInTheDocument();
  });
});
