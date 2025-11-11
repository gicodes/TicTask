export const authErrorMessages: Record<string, string> = {
  CredentialsSignin: "Invalid email or password.",
  OAuthSignin: "Error connecting to the provider.",
  OAuthCallback: "Error handling the callback from the provider.",
  OAuthCreateAccount: "Could not create your account via provider.",
  EmailCreateAccount: "Could not create your account with email.",
  Callback: "An unexpected error occurred. Please try again.",
  OAuthAccountNotLinked: "Please sign in with the same method you used to create your account.",
  EmailSignin: "Error sending sign-in email.",
  SessionRequired: "Please sign in to access this page.",
  Default: "Something went wrong. Please try again later.",
};