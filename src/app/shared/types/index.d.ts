export {};

declare global {
  interface Window {
    $solitics: {
      onLoginSuccess: any,
      onLogout: any,
      onPageEnter:any ,
      onClick:any,
      onPageLeave:any,
    };
  }
}
