export const messageOnNextPageReloadKey = "messageOnNextPageReload";

export function showMessageOnNextPageReload(message: string) {
  sessionStorage.setItem(messageOnNextPageReloadKey, message);
}
